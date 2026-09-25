import { Workout } from '@/types/workout';
import React from 'react';
import WorkoutCard from './WorkoutCard';


async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch workouts data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}

const LibrarySection = async () => {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="pt-8 pb-16">
      <div className="mb-8">
        <h2 className="font-display text-white text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
          THE LIBRARY
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-sans">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3x4 Grid */}
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-500">
          No workouts available at the moment.
        </div>
      )}
    </section>
  );
};

export default LibrarySection;
