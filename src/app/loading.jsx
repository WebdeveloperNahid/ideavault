

export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 w-full">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md flex flex-col h-full"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 bg-slate-200 animate-pulse flex-shrink-0">
            {/* Category Badge Skeleton */}
            <div className="absolute top-3 left-3 h-6 w-20 bg-slate-300 rounded-full animate-pulse" />
          </div>

          {/* Body Skeleton */}
          <div className="flex flex-col flex-1 gap-3 p-5">
            {/* Title */}
            <div className="h-5 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-200 rounded-lg animate-pulse" />

            {/* Description */}
            <div className="h-3.5 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-3.5 w-5/6 bg-slate-100 rounded animate-pulse" />

            {/* Problem Box */}
            <div className="bg-sky-50 border border-sky-100 rounded-xl px-3.5 py-2.5 flex flex-col gap-2">
              <div className="h-3 w-16 bg-sky-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-sky-100 rounded animate-pulse" />
              <div className="h-3 w-4/5 bg-sky-100 rounded animate-pulse" />
            </div>

            {/* Audience */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse flex-shrink-0" />
              <div className="h-3 w-2/5 bg-slate-200 rounded animate-pulse" />
            </div>

            {/* Button */}
            <div className="mt-auto pt-3">
              <div className="h-10 w-full bg-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}