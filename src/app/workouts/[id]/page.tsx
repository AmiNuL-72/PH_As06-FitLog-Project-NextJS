import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Workout } from '@/types/workout';
import type { Metadata } from 'next';
import WorkoutActionButtons from '@/components/workout/WorkoutActionButtons';

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
        {/* Left Side — Visual */}
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

          {/* Subtitle */}
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
          <WorkoutActionButtons workout={workout} />
        </div>
      </div>
    </main>
  );
}