import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Categories - ShopHub",
  description: "Browse all product categories",
}

export default function CategoriesPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Categories</h1>

      <Suspense fallback={<CategoriesGridSkeleton />}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-lg border"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="mt-2 text-muted-foreground">{category.description}</p>
                <p className="mt-2 text-sm">{category.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  )
}

function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <Skeleton className="aspect-[16/9] w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  )
}

