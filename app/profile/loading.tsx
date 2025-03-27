import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* User Profile Header Skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24 ml-auto" />
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-full max-w-md" />

          {/* Content Skeleton */}
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-7 w-32 mb-4" />

              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-56" />
                      </div>
                      <div className="flex items-center gap-3 mt-2 sm:mt-0">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-9 w-20 rounded-md" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

