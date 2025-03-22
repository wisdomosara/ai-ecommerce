"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import type { Product } from "@/lib/types"

interface CategoryResultsProps {
  products: Product[]
}

export default function CategoryResults({ products }: CategoryResultsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const handleFilterChange = (filters: any) => {
    const { priceRange, categories } = filters

    const filtered = products.filter((product) => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesPrice
    })

    setFilteredProducts(filtered)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ProductFilters onFilterChange={handleFilterChange} />

      <div className="flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">No products found with the selected filters.</p>
        )}
      </div>
    </div>
  )
}

