"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ProductImage {
  src: string
  alt: string
}

interface ProductSwiperProps {
  images: ProductImage[]
}

export default function ProductSwiper({ images }: ProductSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedThumb, setSelectedThumb] = useState(0)

  // Handle main image navigation
  const goToPrevious = () => {
    setActiveIndex((prev) => {
      const newIndex = prev > 0 ? prev - 1 : images.length - 1
      setSelectedThumb(newIndex)
      return newIndex
    })
  }

  const goToNext = () => {
    setActiveIndex((prev) => {
      const newIndex = prev < images.length - 1 ? prev + 1 : 0
      setSelectedThumb(newIndex)
      return newIndex
    })
  }

  // Handle thumbnail click
  const handleThumbClick = (index: number) => {
    setActiveIndex(index)
    setSelectedThumb(index)
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden aspect-square">
        <div className="relative h-full w-full">
          <Image
            src={images[activeIndex]?.src || "/placeholder.svg"}
            alt={images[activeIndex]?.alt || "Product image"}
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-4 right-4 z-10 bg-background/80 rounded-full p-2">
            <ZoomIn className="h-5 w-5" />
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${
              selectedThumb === index ? "border-primary" : "hover:border-primary/50"
            }`}
            onClick={() => handleThumbClick(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              width={150}
              height={150}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

