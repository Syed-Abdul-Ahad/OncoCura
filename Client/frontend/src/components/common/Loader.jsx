const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="flex flex-row flex-wrap gap-10 p-10 w-full">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="record-item bg-white shadow-2xl w-60 h-32 rounded-xl p-4 mb-4"
        >
          <div>
            <div className="w-16 h-16 mb-2 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-row w-full h-full">
            <div className="text-sm mt-3 font-bold mb-10 w-full bg-gray-300 h-6 rounded"></div>
            <div className="h-6 w-10 text-end mt-2 ml-36 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProfileLoader = () => {
  return (
    <div className="rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SkeletonLoader, Loader, ProfileLoader };
