import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import LibrarySection from "@/components/home/LibrarySection";


function LibrarySkeleton() {
  return (
    <div id="library" className="pt-8 pb-16">
      <div className="mb-8">
        <h2 className="font-display text-white text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-sans">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#151620] border border-zinc-800/60 rounded-2xl h-80 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Hero />
      <Suspense fallback={<LibrarySkeleton />}>
        <LibrarySection />
      </Suspense>
    </main>
  );
}