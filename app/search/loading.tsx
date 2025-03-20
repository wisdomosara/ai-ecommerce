export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-muted rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-muted rounded"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-16 bg-muted rounded"></div>
              <div className="h-5 w-16 bg-muted rounded"></div>
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <div className="h-5 w-24 bg-muted rounded mb-3"></div>
                <div className="space-y-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-4 w-4 bg-muted rounded mr-2"></div>
                      <div className="h-4 w-28 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted"></div>

              {/* Price Range */}
              <div>
                <div className="h-5 w-24 bg-muted rounded mb-3"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-4 w-4 bg-muted rounded mr-2"></div>
                      <div className="h-4 w-20 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted"></div>

              {/* Colors */}
              <div>
                <div className="h-5 w-16 bg-muted rounded mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-muted"></div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted"></div>

              {/* Ratings */}
              <div>
                <div className="h-5 w-20 bg-muted rounded mb-3"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-4 w-4 bg-muted rounded mr-2"></div>
                      <div className="h-4 w-24 bg-muted rounded"></div>
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
            <div className="h-4 w-48 bg-muted rounded"></div>

            <div className="flex items-center gap-4">
              <div className="h-8 w-20 bg-muted rounded"></div>
              <div className="h-8 w-32 bg-muted rounded"></div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="h-4 w-3/4 bg-muted rounded"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

