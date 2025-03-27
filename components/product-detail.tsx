"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { getTrendingProducts } from "@/lib/data"
import type { Product } from "@/lib/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import "swiper/css/free-mode"
import ProductCard from "./product-card"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart()
  const { isAuthenticated, addToLastViewed, toggleSavedItem, user } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [hasTrackedView, setHasTrackedView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [inCart, setInCart] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  // Check if product is saved
  useEffect(() => {
    if (isAuthenticated && user?.savedItems) {
      setIsSaved(user.savedItems.includes(product.id))
    } else {
      setIsSaved(false)
    }
    setIsLoading(false)
  }, [isAuthenticated, user?.savedItems, product.id])

  // Track viewed product - only once
  useEffect(() => {
    if (isAuthenticated && !hasTrackedView) {
      addToLastViewed(product.id)
      setHasTrackedView(true)
    }
  }, [isAuthenticated, product.id, addToLastViewed, hasTrackedView])

  // Get recommended products - only once on mount
  useEffect(() => {
    // Get trending products excluding current product
    const trending = getTrendingProducts().filter((p) => p.id !== product.id)

    // Get products from same category
    const sameCategory = trending.filter((p) => p.categorySlug === product.categorySlug)

    // Prioritize same category products, then fill with other trending products
    let recommended = [...sameCategory]

    // If we don't have enough same category products, add other trending products
    if (recommended.length < 4) {
      const otherTrending = trending.filter((p) => p.categorySlug !== product.categorySlug)
      recommended = [...recommended, ...otherTrending].slice(0, 4)
    } else {
      recommended = recommended.slice(0, 4)
    }

    setRecommendedProducts(recommended)
  }, [product.id, product.categorySlug]) // Only re-run if product ID or category changes

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id)
    if (cartItem) {
      setInCart(true)
      setCartQuantity(cartItem.quantity)
    } else {
      setInCart(false)
      setCartQuantity(0)
    }
  }, [cartItems, product.id])

  const handleAddToCart = () => {
    if (!inCart) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }

      // Show visual confirmation
      const cartNotification = document.createElement("div")
      cartNotification.className =
        "fixed top-20 right-4 bg-primary text-primary-foreground py-2 px-4 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-300"
      cartNotification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${quantity > 1 ? `${quantity} × ` : ""}${product.name} added to cart</span>
      </div>
    `
      document.body.appendChild(cartNotification)

      // Remove the notification after 2 seconds
      setTimeout(() => {
        cartNotification.classList.add("animate-out", "fade-out", "slide-out-to-right-5")
        cartNotification.addEventListener("animationend", () => {
          document.body.removeChild(cartNotification)
        })
      }, 2000)
    }
  }

  const handleUpdateCartQuantity = () => {
    updateQuantity(product.id, quantity)
  }

  const handleRemoveFromCart = () => {
    removeFromCart(product.id)
  }

  const handleToggleSave = () => {
    if (isAuthenticated) {
      toggleSavedItem(product.id)
      setIsSaved(!isSaved)
    } else {
      // Redirect to login
      window.location.href = `/login?redirectTo=${encodeURIComponent(`/products/${product.id}`)}`
    }
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4 overflow-hidden">
          <div className="relative overflow-hidden rounded-xl max-h-[500px] md:max-h-none">
            <div className="overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current
                }}
                pagination={{ clickable: true }}
                loop={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="product-detail-swiper rounded-xl"
                grabCursor={true}
                touchEventsTarget="container"
                threshold={5}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-square w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - image ${index + 1}`}
                        width={600}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {product.isNew && <Badge className="absolute left-4 top-4 z-10">New</Badge>}

                {product.discount > 0 && (
                  <Badge variant="destructive" className="absolute right-4 top-4 z-10">
                    {product.discount}% OFF
                  </Badge>
                )}
              </Swiper>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              ref={prevRef}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              ref={nextRef}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="overflow-hidden">
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Navigation, Thumbs]}
                spaceBetween={8}
                slidesPerView="auto"
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbs-swiper"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index} className="!w-16 !h-16">
                    <div className="h-full w-full overflow-hidden rounded-md border cursor-pointer">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)} rating</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl md:text-3xl font-bold">${product.price.toFixed(2)}</p>
            {product.originalPrice !== undefined && (
              <p className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
            )}
            {product.discount > 0 && <Badge variant="destructive">{product.discount}% OFF</Badge>}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div>
            <p className="mb-2 font-medium">Category:</p>
            <Link
              href={`/categories/${product.categorySlug}`}
              className="inline-block rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
            >
              {product.category}
            </Link>

            {product.collection && (
              <div className="mt-4">
                <p className="mb-2 font-medium">Collection:</p>
                <Link
                  href={`/collections/${product.collectionSlug}`}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm hover:bg-muted/80"
                >
                  {product.collection}
                </Link>
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 font-medium">Quantity:</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
              <span className="ml-4 text-sm text-muted-foreground">{product.stock} in stock</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {inCart ? (
              <>
                <div className="flex-1 flex items-center justify-between border rounded-md p-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">In Cart: {cartQuantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUpdateCartQuantity}
                      disabled={quantity === cartQuantity}
                    >
                      Update Quantity
                    </Button>
                    <Button variant="destructive" size="icon" onClick={handleRemoveFromCart}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="lg"
                  onClick={handleToggleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Loading...
                    </span>
                  ) : (
                    <>
                      <Heart className={`mr-2 h-5 w-5 ${isSaved ? "fill-primary" : ""}`} />
                      {isSaved ? "Saved" : "Save Item"}
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="lg"
                  onClick={handleToggleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Loading...
                    </span>
                  ) : (
                    <>
                      <Heart className={`mr-2 h-5 w-5 ${isSaved ? "fill-primary" : ""}`} />
                      {isSaved ? "Saved" : "Save Item"}
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12 md:mt-16 product-recommendations">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

