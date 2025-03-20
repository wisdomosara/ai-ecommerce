export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-muted rounded mb-4"></div>
        <div className="h-4 w-2/3 bg-muted rounded"></div>
      </div>

      <div className="grid gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-6 items-center border rounded-xl p-6">
            <div className="aspect-[4/3] bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-muted rounded"></div>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(10)].map((_, j) => (
                  <div key={j} className="h-4 w-3/4 bg-muted rounded"></div>
                ))}
              </div>
              <div className="h-4 w-1/4 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

