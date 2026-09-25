import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Workout } from '@/types/workout';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group bg-[#151620] border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col hover:border-[#a3e635]/50 hover:shadow-xl hover:shadow-[#a3e635]/5 transition-all duration-300"
    >
      {/* Card Image */}
      <div className="relative w-full aspect-[16/10] bg-zinc-900 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Category Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#a3e635] text-black text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="font-display text-white text-lg sm:text-xl font-black uppercase tracking-tight leading-tight group-hover:text-[#a3e635] transition-colors">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-zinc-400 text-xs mt-1 font-sans">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-5 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400 text-xs font-sans">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
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
            <span className="text-zinc-300 font-medium">{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
