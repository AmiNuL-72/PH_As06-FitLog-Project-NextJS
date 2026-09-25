import Hero from '@/components/home/Hero';
import React from 'react';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Hero Section */}
      <Hero/>

    {/* Library Section */}
      <section id="library" className="pt-8 pb-16">
        <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </section>
    </main>
  );
}