import { Suspense } from "react"
import { notFound } from "next/navigation"
import { categories, getProductsByCategory } from "@/lib/data"
import CategoryResults from "@/components/category-results"
import { ProductsGridSkeleton } from "@/components/search-results"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    return {
      title: "Category Not Found - ShopHub",
      description: "The requested category could not be found",
    }
  }

  return {
    title: `${category.name} - ShopHub`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(slug)

  return (
    <div className="container py-10 px-4 md:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{category.name}</h1>
      <p className="mb-8 text-muted-foreground">{category.description}</p>

      <Suspense fallback={<ProductsGridSkeleton />}>
        <CategoryResults products={products} />
      </Suspense>
    </div>
  )
}

