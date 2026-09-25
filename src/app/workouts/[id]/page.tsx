import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Workout } from '@/types/workout';
import type { Metadata } from 'next';

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

async function getWorkoutDetail(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch workout details');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching workout detail:', error);
    return null;
  }
}

export async function generateMetadata({ params }: WorkoutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const workout = await getWorkoutDetail(resolvedParams.id);

  if (!workout) {
    return {
      title: 'Workout Not Found - FitLog',
    };
  }

  return {
    title: `${workout.name} - FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const resolvedParams = await params;
  const workout = await getWorkoutDetail(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        {/* Left Side — Visual / Media */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right Side — Workout Details */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-3 leading-tight">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-5 font-sans">
            {workout.description}
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#a3e635] text-black text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table */}
          <div className="bg-[#151620] border border-zinc-800/80 rounded-2xl p-5 sm:p-6 mb-8 divide-y divide-zinc-800/60 font-sans">
            <div className="flex items-center justify-between pb-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">EQUIPMENT</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.equipment}</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">DIFFICULTY</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.difficulty}</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">SETS</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.sets}</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">REPS</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.reps}</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">DURATION</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.duration} min</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">CALORIES</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center justify-between pt-3.5">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">RATING</span>
              <span className="text-zinc-200 text-sm font-semibold">{workout.rating}</span>
            </div>
          </div>

          {/* INSTRUCTIONS Section */}
          {workout.instructions && workout.instructions.length > 0 && (
            <div className="mb-8 font-sans">
              <h3 className="font-display text-white text-lg font-black uppercase tracking-wider mb-4">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-3 text-zinc-300 text-sm sm:text-base">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 leading-relaxed">
                    <span className="text-zinc-500 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="bg-[#a3e635] hover:bg-[#b8ff00] text-black font-black text-xs sm:text-sm px-6 py-3.5 rounded-lg transition-all flex items-center gap-2.5 shadow-lg transform hover:scale-[1.02] active:scale-[0.98]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v2h-5v5h-2v-5H7v-2h5v-5h2v5z" />
              </svg>
              <span>Add to today&apos;s plan</span>
            </button>

            <button className="border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/40 text-zinc-200 hover:text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg transition-all flex items-center gap-2.5 transform hover:scale-[1.02] active:scale-[0.98]">
              <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}