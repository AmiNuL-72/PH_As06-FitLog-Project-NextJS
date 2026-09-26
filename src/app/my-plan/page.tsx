'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useWorkout } from '@/context/WorkoutContext';
import { Workout } from '@/types/workout';

function MyPlanContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(initialTab);
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'name' | 'rating'>('duration');
  const [isMounted, setIsMounted] = useState(false);

  const {
    planList,
    savedList,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
    isDone,
  } = useWorkout();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'saved') setActiveTab('saved');
    else if (tabParam === 'plan') setActiveTab('plan');
  }, [searchParams]);

  // Calculate stats summary 
  const totalExercises = planList.length;
  const totalMinutes = useMemo(
    () => planList.reduce((acc, item) => acc + (item.duration || 0), 0),
    [planList]
  );
  const totalCalories = useMemo(
    () => planList.reduce((acc, item) => acc + (item.caloriesBurned || 0), 0),
    [planList]
  );

  // Active list & sorting
  const rawList = activeTab === 'plan' ? planList : savedList;

  const sortedList = useMemo(() => {
    const list = [...rawList];
    if (sortBy === 'duration') {
      list.sort((a, b) => b.duration - a.duration);
    } else if (sortBy === 'calories') {
      list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [rawList, sortBy]);

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-zinc-400 font-sans">
        Loading workouts…
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base font-sans">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="bg-[#13141d] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
        {/* Exercises */}
        <div className="sm:px-6 first:pl-0">
          <span className="text-zinc-400 text-xs font-medium block mb-1 font-sans">
            Exercises
          </span>
          <span className="font-display font-black text-4xl sm:text-5xl text-[#a3e635]">
            {totalExercises}
          </span>
        </div>

        {/* Minutes */}
        <div className="pt-4 sm:pt-0 sm:px-6">
          <span className="text-zinc-400 text-xs font-medium block mb-1 font-sans">
            Minutes
          </span>
          <span className="font-display font-black text-4xl sm:text-5xl text-white">
            {totalMinutes}
          </span>
        </div>

        {/* Calories */}
        <div className="pt-4 sm:pt-0 sm:px-6 last:pr-0">
          <span className="text-zinc-400 text-xs font-medium block mb-1 font-sans">
            Calories
          </span>
          <span className="font-display font-black text-4xl sm:text-5xl text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="bg-[#13141d] border border-zinc-800/80 p-1.5 rounded-2xl inline-flex items-center gap-1 self-start">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-[#242634] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#242634] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto font-sans">
          <span className="text-zinc-400 text-xs font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#13141d] border border-zinc-800 text-white text-xs font-medium px-3.5 py-2 rounded-xl outline-none cursor-pointer focus:border-zinc-600 transition-colors"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* List Container */}
      {sortedList.length > 0 ? (
        <div className="space-y-4">
          {sortedList.map((workout: Workout) => {
            const done = isDone(workout.id);

            return (
              <div
                key={workout.id}
                className="bg-[#13141d] border border-zinc-800/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-700/80 transition-all group"
              >
                {/* Left: Image & Info */}
                <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div className="w-28 sm:w-40 aspect-[16/10] relative rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="160px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-white text-lg sm:text-xl font-black uppercase tracking-tight truncate">
                      {workout.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-sans mt-0.5 truncate">
                      {workout.equipment}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-zinc-400 text-xs font-sans mt-3">
                      {/* Duration */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                        </svg>
                        <span>{workout.duration} min</span>
                      </div>

                      {/* Calories */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-zinc-300 font-medium">
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto pt-2 sm:pt-0">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="border border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-colors whitespace-nowrap"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => toggleDone(workout.id)}
                      className={`font-extrabold text-xs px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        done
                          ? 'bg-[#18260f] text-[#a3e635] border border-[#a3e635]/60'
                          : 'bg-[#a3e635] hover:bg-[#b8ff00] text-black shadow-md'
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current stroke-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span>{done ? 'Completed' : 'Mark as Done'}</span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === 'plan'
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="text-zinc-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <svg
                      className="w-5 h-5 stroke-current fill-none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="border border-dashed border-zinc-800/80 bg-[#13141d]/60 rounded-3xl p-12 sm:p-16 text-center my-8 flex flex-col items-center justify-center max-w-2xl mx-auto">
          <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-zinc-400 text-sm max-w-sm mb-6 font-sans leading-relaxed">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="bg-[#a3e635] hover:bg-[#b8ff00] text-black font-extrabold text-xs px-8 py-3.5 rounded-full uppercase tracking-wider transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Go to workouts
          </Link>
        </div>
      )}
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-zinc-400 font-sans">
          Loading workouts…
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}