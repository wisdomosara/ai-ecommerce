import { Suspense } from "react"
import { searchProducts } from "@/lib/data"
import SearchResults from "@/components/search-results"
import { ProductsGridSkeleton } from "@/components/search-results"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams
  const query = resolvedParams.q || ""
  const products = query ? searchProducts(query) : []

  // Add a unique key to the SearchResults component based on the query
  // This will force a re-render when the query changes
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {query ? `Search results for "${query}"` : "Search Products"}
        </h1>
      </div>

      <Suspense fallback={<ProductsGridSkeleton />}>
        <SearchResults key={`search-${query}`} initialProducts={products} searchQuery={query} />
      </Suspense>
    </div>
  )
}

