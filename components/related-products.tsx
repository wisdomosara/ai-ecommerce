"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import { type Product, searchProducts } from "@/lib/api"
import ProductCard from "@/components/product-card"

interface RelatedProductsProps {
  category: string
  excludeId?: string
}

export default function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        // In a real app, you'd have a specific API endpoint for related products
        const results = await searchProducts("", category)
        const filtered = excludeId ? results.filter((product) => product.id.toString() !== excludeId) : results

        setProducts(filtered.slice(0, 6)) // Limit to 6 products
      } catch (error) {
        console.error("Failed to load related products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRelatedProducts()
  }, [category, excludeId])

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
    <Swiper
      modules={[Navigation]}
      navigation
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
  )
}

