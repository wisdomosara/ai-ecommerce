"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ChevronLeft, ChevronRight, Heart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import type { Product } from "@/lib/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart()
  const { isAuthenticated, user, toggleSavedItem } = useAuth()
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  // Add a loading state to prevent flash of unsaved state
  const [isLoading, setIsLoading] = useState(true)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [inCart, setInCart] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  // Check if product is saved - add dependency on user.savedItems
  useEffect(() => {
    if (isAuthenticated && user?.savedItems) {
      const isSavedProduct = user.savedItems.includes(product.id)
      setIsSaved(isSavedProduct)
      setIsLoading(false)
      console.log(`Product ${product.id} saved status:`, isSavedProduct)
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, user, product.id])

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!inCart) {
      addToCart(product)

      // Show visual confirmation
      const cartNotification = document.createElement("div")
      cartNotification.className =
        "fixed top-20 right-4 bg-primary text-primary-foreground py-2 px-4 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-300"
      cartNotification.innerHTML = `
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${product.name} added to cart</span>
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

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAuthenticated) {
      console.log(`Toggling saved state for product ${product.id}`)
      toggleSavedItem(product.id)
      setIsSaved(!isSaved)
    } else {
      // Redirect to login
      window.location.href = `/login?redirectTo=${encodeURIComponent(`/products/${product.id}`)}`
    }
  }

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateQuantity(product.id, cartQuantity + 1)
  }

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (cartQuantity > 1) {
      updateQuantity(product.id, cartQuantity - 1)
    } else {
      removeFromCart(product.id)
    }
  }

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeFromCart(product.id)
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-border transition-all duration-300 hover:shadow-md">
        <div className="aspect-square w-full h-full overflow-hidden rounded-lg" style={{ maxHeight: "300px" }}>
          {product.images.length > 1 ? (
            <div className="relative h-full w-full overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
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
                className="h-full product-swiper"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - image ${index + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Button
                variant="ghost"
                size="icon"
                className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-opacity ${isHovered ? "opacity-100" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                ref={prevRef}
              >
                <ChevronLeft className="h-3 w-3" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-opacity ${isHovered ? "opacity-100" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                ref={nextRef}
              >
                <ChevronRight className="h-3 w-3" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
          ) : (
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>

        <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}

          {product.discount > 0 && <Badge variant="destructive">{product.discount}% OFF</Badge>}
        </div>

        <div className="p-3 space-y-1">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <p className="font-semibold">${product.price.toFixed(2)}</p>
            {product.originalPrice !== undefined && (
              <p className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>

          <div className="pt-2 flex justify-between items-center gap-2">
            {inCart ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-md rounded-r-none border-r-0"
                    onClick={handleDecreaseQuantity}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="h-8 px-2 flex items-center justify-center border-y border-input min-w-[2rem]">
                    {cartQuantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-md rounded-l-none border-l-0"
                    onClick={handleIncreaseQuantity}
                    disabled={cartQuantity >= product.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleRemoveFromCart}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button variant="secondary" size="sm" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant={isSaved ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={handleToggleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Heart className={`h-4 w-4 ${isSaved ? "fill-primary" : ""}`} />
                  )}
                  <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

