"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import type { Product } from "@/lib/types";

interface CategoryResultsProps {
  products: Product[];
  categorySlug?: string;
}

export default function CategoryResults({
  products,
  categorySlug,
}: CategoryResultsProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    categories: categorySlug ? [categorySlug] : [],
    ratings: [],
    sort: "relevance",
  });

  // Calculate the maximum price from products with nice rounding
  const maxProductPrice = useMemo(() => {
    if (products.length === 0) return 1000;

    const rawMax = Math.max(...products.map((product) => product.price));

    // Round up to more user-friendly values
    if (rawMax <= 50) {
      return Math.ceil(rawMax / 10) * 10; // Round up to nearest 10 for smaller amounts
    } else if (rawMax <= 200) {
      return Math.ceil(rawMax / 50) * 50; // Round up to nearest 50 for medium amounts
    } else {
      return Math.ceil(rawMax / 100) * 100; // Round up to nearest 100 for larger amounts
    }
  }, [products]);

  // Update filtered products when products prop changes
  useEffect(() => {
    setFilteredProducts(products);
    // If categorySlug is provided, pre-select it in the filters
    if (categorySlug) {
      setFilters((prev) => ({
        ...prev,
        categories: [categorySlug],
      }));
    }
  }, [products, categorySlug]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);

    // Apply filters to products
    let filtered = products.filter((product) => {
      const matchesPrice =
        product.price >= newFilters.priceRange[0] &&
        product.price <= newFilters.priceRange[1];
      const matchesCategory =
        newFilters.categories.length === 0 ||
        newFilters.categories.includes(product.categorySlug);
      const matchesRating =
        newFilters.ratings.length === 0 ||
        newFilters.ratings.includes(Math.floor(product.rating));

      return matchesPrice && matchesCategory && matchesRating;
    });

    // Apply sorting
    if (newFilters.sort === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (newFilters.sort === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (newFilters.sort === "rating") {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  };

  // Track filter visibility
  const handleFilterVisibilityChange = (visible: boolean) => {
    setShowFilters(visible);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      <ProductFilters
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        onVisibilityChange={handleFilterVisibilityChange}
        maxPriceInSearch={maxProductPrice}
      />

      <div className="flex-1 pb-24 md:pb-0">
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-6 ${
              showFilters
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            No products found with the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
