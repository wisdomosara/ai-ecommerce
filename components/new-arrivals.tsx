"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import { type Product, getNewArrivals } from "@/lib/api"
import ProductCard from "@/components/product-card"

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const newArrivals = await getNewArrivals()
        setProducts(newArrivals)
      } catch (error) {
        console.error("Failed to load new arrivals:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-muted rounded-lg aspect-square"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
        <div className="flex items-center gap-2">
          <button className="new-arrivals-prev w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="new-arrivals-next w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".new-arrivals-prev",
          nextEl: ".new-arrivals-next",
        }}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

