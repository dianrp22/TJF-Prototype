export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[380px] bg-gradient-to-br from-gray-200 to-gray-300" />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-72 bg-gray-200 rounded-lg" />
          <div className="h-4 w-96 bg-gray-100 rounded" />
          <div className="h-4 w-80 bg-gray-100 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <div className="h-44 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-1/2 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
