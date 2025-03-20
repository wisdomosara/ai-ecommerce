import { Suspense } from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import SearchResults from "@/components/search-results"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; category?: string; sort?: string }
}) {
  const query = searchParams.q || ""
  const category = searchParams.category || "all"
  const sort = searchParams.sort || "relevance"

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">{query ? `Showing results for "${query}"` : "Browse all products"}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {[
                    "All Categories",
                    "Women's Fashion",
                    "Men's Fashion",
                    "Accessories",
                    "Footwear",
                    "Beauty",
                    "Home & Living",
                  ].map((cat) => (
                    <div key={cat} className="flex items-center">
                      <input
                        type="radio"
                        id={`cat-${cat}`}
                        name="category"
                        className="mr-2"
                        defaultChecked={cat === "All Categories" && category === "all"}
                      />
                      <label htmlFor={`cat-${cat}`} className="text-sm">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2" />
                    <label htmlFor="price-1" className="text-sm">
                      Under $25
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2" />
                    <label htmlFor="price-2" className="text-sm">
                      $25 - $50
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2" />
                    <label htmlFor="price-3" className="text-sm">
                      $50 - $100
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-4" className="mr-2" />
                    <label htmlFor="price-4" className="text-sm">
                      $100 - $200
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-5" className="mr-2" />
                    <label htmlFor="price-5" className="text-sm">
                      $200 & Above
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Colors */}
              <div>
                <h3 className="font-medium mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Pink"].map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border cursor-pointer hover:ring-2 ring-primary ring-offset-2"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              {/* Ratings */}
              <div>
                <h3 className="font-medium mb-3">Ratings</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                      <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <span className="ml-1">{rating === 5 ? "& up" : "& up"}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">24</span> of <span className="font-medium">256</span> products
            </p>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="h-8 md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select defaultValue={sort}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="best-selling">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Results */}
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults query={query} category={category} sort={sort} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

