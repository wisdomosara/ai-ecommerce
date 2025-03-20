"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Thumbs, Zoom } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/zoom"

interface ProductImage {
  src: string
  alt: string
}

interface ProductSwiperProps {
  images: ProductImage[]
}

export default function ProductSwiper({ images }: ProductSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Swiper
          modules={[Navigation, Thumbs, Zoom]}
          navigation={{
            prevEl: ".product-swiper-prev",
            nextEl: ".product-swiper-next",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          zoom={true}
          loop={true}
          className="rounded-lg overflow-hidden aspect-square"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-zoom-in">
              <div className="swiper-zoom-container">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-4 right-4 z-10 bg-background/80 rounded-full p-2">
                <ZoomIn className="h-5 w-5" />
              </div>
            </SwiperSlide>
          ))}

          <button className="product-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center shadow-md">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="product-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center shadow-md">
            <ChevronRight className="h-6 w-6" />
          </button>
        </Swiper>
      </div>

      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        className="thumbs-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div className="aspect-square rounded-md overflow-hidden border hover:border-primary transition-colors">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

