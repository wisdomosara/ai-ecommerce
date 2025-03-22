import { Skeleton } from "@/components/ui/skeleton"

export default function CollectionLoading() {
  return (
    <div className="container py-10">
      <Skeleton className="mb-2 h-10 w-1/3" />
      <Skeleton className="mb-8 h-5 w-2/3" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
    </div>
  )
}

