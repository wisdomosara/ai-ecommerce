import { Skeleton } from "@/components/ui/skeleton"
export default function LoginLoading() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />

          <div className="flex items-center">
            <Skeleton className="h-px flex-1" />
            <Skeleton className="mx-4 h-4 w-8" />
            <Skeleton className="h-px flex-1" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    </div>
  )
}

