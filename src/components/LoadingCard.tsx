export function LoadingCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-5 bg-gray-200 rounded w-12" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}
