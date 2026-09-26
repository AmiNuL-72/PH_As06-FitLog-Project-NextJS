import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Loading Skeleton */}
      <div className="bg-[#151620] border border-zinc-800/60 rounded-3xl h-64 sm:h-72 mb-8 sm:mb-12 animate-pulse" />

      <div className="mb-6">
        <div className="w-48 h-8 bg-zinc-800/60 rounded-md animate-pulse mb-2" />
        <div className="w-64 h-4 bg-zinc-800/40 rounded-md animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#151620] border border-zinc-800/60 rounded-2xl h-84 animate-pulse p-4 flex flex-col justify-between"
          >
            <div className="w-full h-44 bg-zinc-800/60 rounded-xl mb-4" />
            <div className="space-y-2.5">
              <div className="w-1/3 h-4 bg-zinc-800/60 rounded-full" />
              <div className="w-3/4 h-6 bg-zinc-800/60 rounded-md" />
              <div className="w-1/2 h-4 bg-zinc-800/60 rounded-md" />
            </div>
            <div className="w-full h-8 bg-zinc-800/40 rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
