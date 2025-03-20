"use client"

import { useEffect, useState } from "react"
import { type Product, searchProducts } from "@/lib/api"
import ProductCard from "@/components/product-card"

interface SearchResultsProps {
  query: string
  category: string
  sort: string
}

export default function SearchResults({ query, category, sort }: SearchResultsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSearchResults() {
      try {
        setLoading(true)
        const results = await searchProducts(query, category)

        // Apply sorting
        let sortedResults = [...results]
        switch (sort) {
          case "newest":
            // In a real app, you'd sort by date
            sortedResults = sortedResults.sort((a, b) => Number(b.id) - Number(a.id))
            break
          case "price-low":
            sortedResults = sortedResults.sort((a, b) => a.price - b.price)
            break
          case "price-high":
            sortedResults = sortedResults.sort((a, b) => b.price - a.price)
            break
          // Other sort options would be implemented here
          default:
            // 'relevance' - no specific sorting
            break
        }

        setProducts(sortedResults)
      } catch (error) {
        console.error("Failed to search products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSearchResults()
  }, [query, category, sort])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted aspect-square rounded-lg mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

