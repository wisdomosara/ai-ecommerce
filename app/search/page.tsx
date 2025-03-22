import { Suspense } from "react";
import { searchProducts } from "@/lib/data";
import SearchResults, {
  ProductsGridSkeleton,
} from "@/components/search-results";

interface SearchPageProps {
  searchParams: Promise<{
    q: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: `Search: ${q || "All Products"} - ShopHub`,
    description: `Search results for "${q || "all products"}"`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const products = query ? searchProducts(query) : [];

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {query ? `Search results for "${query}"` : "Search Products"}
      </h1>

      <Suspense fallback={<ProductsGridSkeleton />}>
        <SearchResults initialProducts={products} searchQuery={query} />
      </Suspense>
    </div>
  );
}
