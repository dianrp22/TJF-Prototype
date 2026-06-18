export default function DashboardLoading() {
  return (
    <div className="px-8 py-8 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-gray-200 rounded-lg" />
          <div className="h-4 w-64 bg-gray-100 rounded-md" />
        </div>
        <div className="h-9 w-48 bg-gray-100 rounded-xl" />
      </div>

      <div className="h-10 w-full bg-blue-50 rounded-xl" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between">
              <div className="w-9 h-9 bg-gray-100 rounded-xl" />
              <div className="w-12 h-4 bg-gray-100 rounded" />
            </div>
            <div className="h-7 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-28 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
          <div className="h-[220px] bg-gray-50 rounded-xl" />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
          <div className="h-[160px] bg-gray-50 rounded-xl" />
          <div className="space-y-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 w-28 bg-gray-100 rounded" />
                <div className="h-3 w-10 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                <div className="space-y-1">
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-2 w-24 bg-gray-100 rounded" />
                </div>
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="h-4 w-20 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                    <div className="h-3 w-8 bg-gray-100 rounded" />
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1">
            <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-3 w-10 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
