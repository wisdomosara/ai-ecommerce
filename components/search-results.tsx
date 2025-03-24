"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/lib/types"

interface SearchResultsProps {
  initialProducts: Product[]
  searchQuery: string
}

export default function SearchResults({ initialProducts, searchQuery }: SearchResultsProps) {
  const [products] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    categories: [] as string[],
    ratings: [] as number[],
    sort: "relevance",
  })
  const [showFilters, setShowFilters] = useState(true)

  // Add this useEffect to update products when searchQuery changes
  useEffect(() => {
    if (searchQuery !== "") {
      // Reset filters when search query changes
      setFilters({
        priceRange: [0, 200],
        categories: [],
        ratings: [],
        sort: "relevance",
      })
      setFilteredProducts(initialProducts)
    }
  }, [searchQuery, initialProducts])

  // Handle filter changes from the ProductFilters component
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)

    // Apply filters to products
    let filtered = products.filter((product) => {
      const matchesPrice = product.price >= newFilters.priceRange[0] && product.price <= newFilters.priceRange[1]
      const matchesCategory = newFilters.categories.length === 0 || newFilters.categories.includes(product.categorySlug)
      const matchesRating = newFilters.ratings.length === 0 || newFilters.ratings.includes(Math.floor(product.rating))

      return matchesPrice && matchesCategory && matchesRating
    })

    // Apply sorting
    if (newFilters.sort === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (newFilters.sort === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (newFilters.sort === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }

  // Track filter visibility
  const handleFilterVisibilityChange = (visible: boolean) => {
    setShowFilters(visible)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ProductFilters
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        onVisibilityChange={handleFilterVisibilityChange}
      />

      <div className="flex-1">
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-6 ${
              showFilters ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            {searchQuery ? `No products found matching "${searchQuery}".` : "Enter a search term to find products."}
          </p>
        )}
      </div>
    </div>
  )
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}

