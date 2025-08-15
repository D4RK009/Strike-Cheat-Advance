import { Card, CardContent } from "@/components/ui/card";

export function ServiceCardSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-700 animate-pulse">
      <div className="w-full h-48 bg-slate-700 rounded-t-lg"></div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="h-6 bg-slate-700 rounded w-3/4"></div>
          <div className="h-5 bg-slate-700 rounded w-16"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
        <div className="space-y-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="h-4 w-4 bg-slate-700 rounded-full mr-2"></div>
              <div className="h-4 bg-slate-700 rounded w-32"></div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-slate-700 rounded w-20"></div>
          <div className="h-10 bg-slate-700 rounded w-24"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation Skeleton */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="h-6 w-32 bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-slate-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-16 w-16 bg-slate-700 rounded-full mx-auto mb-8 animate-pulse"></div>
          <div className="h-12 bg-slate-700 rounded w-96 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-slate-700 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-12 w-32 bg-slate-700 rounded animate-pulse"></div>
            <div className="h-12 w-36 bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-slate-700 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-700 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}