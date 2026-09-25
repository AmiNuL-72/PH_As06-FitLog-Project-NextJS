import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Library
      </Link>

      <div className="bg-[#151620] border border-zinc-800/60 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="bg-[#a3e635] text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full"
                >
                  {group}
                </span>
              ))}
              <span className="border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {workout.difficulty}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
              {workout.name}
            </h1>

            {/* Equipment */}
            <p className="text-zinc-400 text-sm mb-6">
              Equipment: <span className="text-zinc-200 font-medium">{workout.equipment}</span>
            </p>

            {/* Description */}
            <p className="text-zinc-300 text-base leading-relaxed mb-8">
              {workout.description}
            </p>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#0d0e12] border border-zinc-800 rounded-xl mb-8 text-center">
              <div>
                <span className="text-xs text-zinc-500 block uppercase font-bold">Duration</span>
                <span className="text-lg font-black text-white">{workout.duration} min</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block uppercase font-bold">Calories</span>
                <span className="text-lg font-black text-white">{workout.caloriesBurned} kcal</span>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block uppercase font-bold">Rating</span>
                <span className="text-lg font-black text-[#a3e635]">★ {workout.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            {workout.instructions && workout.instructions.length > 0 && (
              <div>
                <h3 className="font-display text-white text-lg font-bold uppercase tracking-wider mb-3">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-zinc-300 text-sm">
                  {workout.instructions.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-4">
            <button className="flex-1 bg-[#a3e635] hover:bg-[#b8ff00] text-black font-extrabold text-sm px-6 py-3.5 rounded-lg transition-all uppercase tracking-wider">
              Add to Today&apos;s Plan
            </button>
            <button className="border border-zinc-700 hover:border-zinc-500 text-white font-bold text-sm px-6 py-3.5 rounded-lg transition-all uppercase tracking-wider">
              Save Workout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
