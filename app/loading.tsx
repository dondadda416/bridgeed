export default function Loading() {
  return (
    <div className="pt-nav min-h-screen bg-bg">
      <div className="max-w-[1100px] mx-auto px-5 py-8 animate-pulse">

        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-3 w-24 bg-surface2 rounded-full mb-3" />
          <div className="h-8 w-64 bg-surface2 rounded-full" />
        </div>

        {/* Card row skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface border border-border rounded-lg p-5 space-y-3">
              <div className="w-10 h-10 bg-surface2 rounded-sm" />
              <div className="h-4 w-32 bg-surface2 rounded-full" />
              <div className="h-3 w-48 bg-surface2 rounded-full" />
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4 flex gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 bg-surface2 rounded-full" />
                  <div className="h-3 w-full bg-surface2 rounded-full" />
                  <div className="h-1.5 w-full bg-surface2 rounded-full" />
                </div>
                <div className="h-8 w-12 bg-surface2 rounded-full flex-shrink-0" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-lg p-5 space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-24 bg-surface2 rounded-full" />
                  <div className="h-3 w-20 bg-surface2 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
