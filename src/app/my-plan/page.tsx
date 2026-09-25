'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Workout } from '@/types/workout';
import { useWorkout } from '@/context/WorkoutContext';

function MyPlanContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(initialTab);

  const { planList, savedList, removeFromPlan, removeFromSaved } = useWorkout();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'saved') setActiveTab('saved');
    else if (tabParam === 'plan') setActiveTab('plan');
  }, [searchParams]);

  const currentList = activeTab === 'plan' ? planList : savedList;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
            MY WORKOUT PLAN
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans">
            Manage your daily lifts and saved exercises for upcoming sessions.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-[#151620] border border-zinc-800/80 p-1.5 rounded-full inline-flex items-center gap-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-[#a3e635] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan ({planList.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#a3e635] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>
      </div>

      {/* Workout Grid */}
      {currentList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((workout: Workout) => (
            <div
              key={workout.id}
              className="bg-[#151620] border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="relative w-full aspect-[16/10] bg-zinc-900">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {workout.muscleGroups.map((g) => (
                      <span
                        key={g}
                        className="bg-[#a3e635] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-white text-lg font-black uppercase tracking-tight">
                    {workout.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1 font-sans">
                    {workout.equipment} • {workout.duration} min • {workout.caloriesBurned} kcal
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="flex-1 bg-zinc-800 hover:bg-[#a3e635] text-white hover:text-black font-extrabold text-xs py-2.5 px-4 rounded-lg text-center transition-all uppercase tracking-wide"
                >
                  View Details
                </Link>
                <button
                  onClick={() =>
                    activeTab === 'plan'
                      ? removeFromPlan(workout.id)
                      : removeFromSaved(workout.id)
                  }
                  className="text-zinc-500 hover:text-red-400 p-2 text-xs transition-colors cursor-pointer"
                  title="Remove"
                >
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#151620] border border-zinc-800/60 rounded-3xl p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4 text-xl">
            💪
          </div>
          <h3 className="font-display text-white text-xl font-bold uppercase mb-2">
            No Workouts {activeTab === 'plan' ? "in Today's Plan" : 'Saved'}
          </h3>
          <p className="text-zinc-400 text-sm mb-6">
            {activeTab === 'plan'
              ? "You haven't added any exercises to today's plan yet."
              : "You haven't saved any exercises for later yet."}
          </p>
          <Link
            href="/#library"
            className="inline-flex items-center gap-2 bg-[#a3e635] hover:bg-[#b8ff00] text-black font-extrabold text-xs px-6 py-3 rounded-lg uppercase tracking-wider transition-all"
          >
            Browse Workouts
          </Link>
        </div>
      )}
    </main>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}
