import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function OrdersLoading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-10 w-64 mb-8" />

      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="space-y-2">
                    {Array(2)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex justify-between">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-36 rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

