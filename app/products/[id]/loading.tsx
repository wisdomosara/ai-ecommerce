import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images Skeleton - LEFT SIDE */}
        <div className="space-y-4 overflow-hidden">
          <div className="relative overflow-hidden rounded-xl max-h-[500px] md:max-h-none">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div className="flex space-x-2 overflow-auto">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 flex-shrink-0 rounded-md" />
              ))}
          </div>
        </div>

        {/* Product Info Skeleton - RIGHT SIDE */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded-full mr-1" />
                  ))}
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <Skeleton className="h-20 w-full" />

          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>

          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>

      {/* Recommended Products Skeleton */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between">
                  <Skeleton className="h-9 w-2/3" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

