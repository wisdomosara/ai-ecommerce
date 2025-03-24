import { Suspense } from "react"
import { notFound } from "next/navigation"
import { collections, getProductsByCollection } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface CollectionPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const resolvedParams = await params
  const collection = collections.find((c) => c.slug === resolvedParams.slug)

  if (!collection) {
    return {
      title: "Collection Not Found - ShopHub",
      description: "The requested collection could not be found",
    }
  }

  return {
    title: `${collection.name} - ShopHub`,
    description: collection.description,
  }
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params
  const collection = collections.find((c) => c.slug === resolvedParams.slug)

  if (!collection) {
    notFound()
  }

  const products = getProductsByCollection(resolvedParams.slug)

  return (
    <div className="container py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{collection.name}</h1>
      <p className="mb-8 text-muted-foreground">{collection.description}</p>

      <Suspense fallback={<ProductsGridSkeleton />}>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">No products found in this collection.</p>
        )}
      </Suspense>
    </div>
  )
}

