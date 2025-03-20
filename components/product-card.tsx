"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Product, addToCart } from "@/lib/api"

type ProductCardProps = Product

export default function ProductCard({ id, name, price, images, category, isNew = false, discount }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // Generate at least 2 images if only one is provided
  const productImages =
    images.length > 1
      ? images
      : [...images, { src: `/placeholder.svg?height=400&width=400&text=View+${name}`, alt: name }]

  const discountedPrice = discount ? price - (price * discount) / 100 : price

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true)
      await addToCart(id, 1)
      // Could show a success toast here
    } catch (error) {
      console.error("Failed to add to cart:", error)
      // Could show an error toast here
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Card
      className="overflow-hidden group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        {isNew && <Badge className="absolute top-3 left-3 z-10">New</Badge>}

        {discount && (
          <Badge variant="destructive" className="absolute top-3 right-3 z-10">
            {discount}% OFF
          </Badge>
        )}

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.prev-${id}`,
            nextEl: `.next-${id}`,
          }}
          loop={true}
          className="h-full w-full"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Link href={`/products/${id}`} className="block h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation arrows - only visible on hover */}
        <button
          className={`prev-${id} absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className={`next-${id} absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Quick action buttons */}
        <div
          className={`absolute bottom-3 left-0 right-0 flex justify-center gap-2 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 shadow-md">
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full shadow-md"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-grow">
        {category && <p className="text-xs text-muted-foreground mb-1">{category}</p>}
        <Link href={`/products/${id}`} className="font-medium hover:underline line-clamp-2">
          {name}
        </Link>
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
          {discount && <span className="text-sm text-muted-foreground line-through ml-2">${price.toFixed(2)}</span>}
        </div>
      </CardContent>
    </Card>
  )
}

