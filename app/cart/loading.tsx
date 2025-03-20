export default function Loading() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col items-start mb-8">
        <div className="h-8 w-1/3 bg-muted rounded mb-4"></div>
        <div className="h-8 w-40 bg-muted rounded"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-card rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="h-6 w-32 bg-muted rounded mb-4"></div>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-[120px] h-[120px] bg-muted rounded-md"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="h-5 w-3/4 bg-muted rounded"></div>
                        <div className="space-y-1">
                          <div className="h-4 w-1/4 bg-muted rounded"></div>
                          <div className="h-4 w-1/4 bg-muted rounded"></div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-muted rounded"></div>
                            <div className="h-8 w-8 bg-muted rounded"></div>
                            <div className="h-8 w-8 bg-muted rounded"></div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="h-5 w-16 bg-muted rounded"></div>
                            <div className="h-8 w-8 bg-muted rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg shadow-sm border">
            <div className="p-6 space-y-4">
              <div className="h-6 w-32 bg-muted rounded mb-4"></div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>
                <div className="h-px bg-muted"></div>
                <div className="flex justify-between">
                  <div className="h-5 w-12 bg-muted rounded"></div>
                  <div className="h-5 w-20 bg-muted rounded"></div>
                </div>

                <div className="mt-4 flex gap-2">
                  <div className="h-10 flex-1 bg-muted rounded"></div>
                  <div className="h-10 w-20 bg-muted rounded"></div>
                </div>

                <div className="h-10 w-full bg-muted rounded mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="h-6 w-48 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

