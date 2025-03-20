export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center mb-6 overflow-x-auto pb-2">
        <div className="h-4 w-16 bg-muted rounded shrink-0"></div>
        <div className="h-4 w-4 mx-2 shrink-0"></div>
        <div className="h-4 w-24 bg-muted rounded shrink-0"></div>
        <div className="h-4 w-4 mx-2 shrink-0"></div>
        <div className="h-4 w-32 bg-muted rounded shrink-0"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded"></div>
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          <div className="h-8 w-3/4 bg-muted rounded"></div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-muted rounded-full mr-1"></div>
              ))}
            </div>
            <div className="h-4 w-24 bg-muted rounded"></div>
          </div>
          <div className="h-8 w-1/4 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>

          <div className="space-y-4">
            <div className="h-6 w-16 bg-muted rounded"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 w-10 bg-muted rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 w-16 bg-muted rounded"></div>
            <div className="grid grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded"></div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-32 bg-muted rounded"></div>
            <div className="h-10 w-32 bg-muted rounded"></div>
          </div>

          <div className="h-px bg-muted"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-16">
        <div className="h-8 w-48 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

