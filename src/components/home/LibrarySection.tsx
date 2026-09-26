'use client';

import React, { useState, useMemo } from 'react';
import { Workout } from '@/types/workout';
import WorkoutCard from './WorkoutCard';

interface LibrarySectionProps {
  workouts: Workout[];
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ workouts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkouts = useMemo(() => {
    if (!searchQuery.trim()) return workouts;
    const q = searchQuery.toLowerCase().trim();
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.equipment.toLowerCase().includes(q) ||
        w.muscleGroups.some((g) => g.toLowerCase().includes(q))
    );
  }, [workouts, searchQuery]);

  return (
    <section id="library" className="pt-8 pb-16 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-white text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or muscle tag..."
            className="w-full bg-[#151620] border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-zinc-600 transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3x4 Grid */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#151620] border border-zinc-800/60 rounded-3xl p-8 max-w-md mx-auto">
          <p className="text-zinc-400 text-sm font-medium">
            No workouts found matching &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-[#a3e635] hover:underline text-xs font-bold uppercase tracking-wider"
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
};

export default LibrarySection;