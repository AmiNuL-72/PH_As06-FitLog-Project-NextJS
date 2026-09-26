'use client';

import React from 'react';
import { Workout } from '@/types/workout';
import { useWorkout } from '@/context/WorkoutContext';

interface WorkoutActionButtonsProps {
  workout: Workout;
}

const WorkoutActionButtons: React.FC<WorkoutActionButtonsProps> = ({ workout }) => {
  const { addToPlan, addToSaved, isInPlan, isInSaved, isPlanFull } = useWorkout();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);

  return (
    <div className="flex flex-wrap items-center gap-4 pt-2 font-sans">
      <button
        onClick={() => addToPlan(workout)}
        disabled={isPlanFull && !inPlan}
        className={`font-black text-xs sm:text-sm px-6 py-3.5 rounded-lg transition-all flex items-center gap-2.5 shadow-lg transform active:scale-[0.98] ${
          inPlan
            ? 'bg-[#18260f] text-[#a3e635] border border-[#a3e635]/60 cursor-pointer'
            : isPlanFull
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
            : 'bg-[#a3e635] hover:bg-[#b8ff00] text-black hover:scale-[1.02] cursor-pointer'
        }`}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v2h-5v5h-2v-5H7v-2h5v-5h2v5z" />
        </svg>
        <span>
          {inPlan
            ? "Added to today's plan"
            : isPlanFull
            ? "Plan Limit Reached (5/5)"
            : "Add to today's plan"}
        </span>
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className={`font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg transition-all flex items-center gap-2.5 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
          inSaved
            ? 'bg-zinc-800 text-[#a3e635] border border-[#a3e635]/40'
            : 'border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/40 text-zinc-200 hover:text-white'
        }`}
      >
        <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span>{inSaved ? 'Saved for later' : 'Save for later'}</span>
      </button>
    </div>
  );
};

export default WorkoutActionButtons;