import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="container py-10">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex space-x-2 overflow-auto pb-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 flex-shrink-0 rounded-md" />
              ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="mt-2 h-5 w-1/3" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>

          <Skeleton className="h-20 w-full" />

          <div>
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>

          <div>
            <Skeleton className="mb-2 h-5 w-24" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="ml-4 h-5 w-24" />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

