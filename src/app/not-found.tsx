import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="bg-[#151620] border border-zinc-800/80 rounded-3xl p-8 sm:p-14 max-w-lg w-full shadow-2xl">
        <span className="font-display font-black text-6xl sm:text-8xl text-[#a3e635] block mb-2 tracking-tight">
          404
        </span>
        <h1 className="font-display text-white text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
          PAGE NOT FOUND
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base font-sans mb-8 leading-relaxed">
          The workout or page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#a3e635] hover:bg-[#b8ff00] text-black font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full uppercase tracking-wider transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
