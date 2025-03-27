"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/data"
import type { Product } from "@/lib/types"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/product-card"

interface SavedItemsTabProps {
  savedItemIds: string[]
}

export function SavedItemsTab({ savedItemIds }: SavedItemsTabProps) {
  const [savedProducts, setSavedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSavedProducts = () => {
      try {
        // Get product details for each saved item ID
        const products = savedItemIds
          .map((id) => getProductById(id))
          .filter((product): product is Product => product !== undefined)

        setSavedProducts(products)
      } catch (error) {
        console.error("Error fetching saved products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSavedProducts()
  }, [savedItemIds])

  if (isLoading) {
    return <SavedItemsSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Items</CardTitle>
      </CardHeader>
      <CardContent>
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">You haven't saved any items yet.</p>
            <Button asChild className="mt-4">
              <Link href="/categories">Browse Products</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SavedItemsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

