"use client";

import { useState } from "react";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types";

interface SearchResultsProps {
  initialProducts: Product[];
  searchQuery: string;
}

export default function SearchResults({
  initialProducts,
  searchQuery,
}: SearchResultsProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);

  const handleFilterChange = (filters: any) => {
    const { priceRange, categories } = filters;

    const filtered = products?.filter((product) => {
      const matchesPrice =
        product?.price >= priceRange?.[0] && product?.price <= priceRange[1];
      const matchesCategory =
        categories?.length === 0 || categories?.includes(product.categorySlug);

      return matchesPrice && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

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
          <p className="py-12 text-center text-muted-foreground">
            {searchQuery
              ? `No products found matching "${searchQuery}".`
              : "Enter a search term to find products."}
          </p>
        )}
      </div>
    </div>
  );
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
  );
}
