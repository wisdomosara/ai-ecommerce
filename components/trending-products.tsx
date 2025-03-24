"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { getTrendingProducts } from "@/lib/data"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

interface TrendingProductsProps {
  title?: string
  navigationButtons?: boolean
}

export default function TrendingProducts({ title, navigationButtons = false }: TrendingProductsProps) {
  const products = getTrendingProducts()
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="relative">
      {title && navigationButtons && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              ref={navigationPrevRef}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              ref={navigationNextRef}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      )}

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.2}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = navigationPrevRef.current
          // @ts-ignore
          swiper.params.navigation.nextEl = navigationNextRef.current
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 4.2,
          },
        }}
        className="trending-swiper h-full"
        grabCursor={true}
        touchEventsTarget="container"
        threshold={5}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-full">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

