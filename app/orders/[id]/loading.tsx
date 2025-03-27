import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderDetailsLoading() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <Skeleton className="h-9 w-32 mb-4" />
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-6 w-24 mt-2 sm:mt-0" />
              </div>

              <div className="space-y-6">
                <Skeleton className="h-40 w-full rounded-lg" />

                <Skeleton className="h-1 w-full" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>
    </div>
  )
}

