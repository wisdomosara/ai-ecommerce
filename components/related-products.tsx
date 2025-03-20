"use client"

import { useEffect, useState } from "react"
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

        setProducts(filtered.slice(0, 4)) // Limit to 4 products
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

