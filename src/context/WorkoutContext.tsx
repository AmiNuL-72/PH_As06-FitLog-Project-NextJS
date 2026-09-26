'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '@/types/workout';

export type ToastType = 'success' | 'remove' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface WorkoutContextType {
  planList: Workout[];
  savedList: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isPlanFull: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('fitlog_plan');
      const savedSaved = localStorage.getItem('fitlog_saved');
      const savedDone = localStorage.getItem('fitlog_done');
      if (savedPlan) setPlanList(JSON.parse(savedPlan));
      if (savedSaved) setSavedList(JSON.parse(savedSaved));
      if (savedDone) setCompletedIds(JSON.parse(savedDone));
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
  }, []);

  const updatePlan = (newList: Workout[]) => {
    setPlanList(newList);
    try {
      localStorage.setItem('fitlog_plan', JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const updateSaved = (newList: Workout[]) => {
    setSavedList(newList);
    try {
      localStorage.setItem('fitlog_saved', JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const updateDone = (newDone: number[]) => {
    setCompletedIds(newDone);
    try {
      localStorage.setItem('fitlog_done', JSON.stringify(newDone));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToPlan = (workout: Workout) => {
    if (planList.some((item) => item.id === workout.id)) {
      showToast(`"${workout.name}" is already in today's plan.`, 'info');
      return;
    }

    if (planList.length >= 5) {
      showToast(`Today's plan is capped at 5 lifts. Finish them first!`, 'warning');
      return;
    }

    const updated = [...planList, workout];
    updatePlan(updated);
    showToast(`Added "${workout.name}" to today's plan!`, 'success');
  };

  const removeFromPlan = (id: number) => {
    const name = planList.find((i) => i.id === id)?.name || 'Workout';
    const updated = planList.filter((item) => item.id !== id);
    updatePlan(updated);
    showToast(`Removed "${name}" from today's plan.`, 'remove');
  };

  const addToSaved = (workout: Workout) => {
    if (!savedList.some((item) => item.id === workout.id)) {
      const updated = [...savedList, workout];
      updateSaved(updated);
      showToast(`Saved "${workout.name}" for later!`, 'success');
    } else {
      showToast(`"${workout.name}" is already saved.`, 'info');
    }
  };

  const removeFromSaved = (id: number) => {
    const name = savedList.find((i) => i.id === id)?.name || 'Workout';
    const updated = savedList.filter((item) => item.id !== id);
    updateSaved(updated);
    showToast(`Removed "${name}" from saved list.`, 'remove');
  };

  const toggleDone = (id: number) => {
    if (completedIds.includes(id)) {
      const updated = completedIds.filter((item) => item !== id);
      updateDone(updated);
      showToast(`Unmarked workout as completed.`, 'info');
    } else {
      const updated = [...completedIds, id];
      updateDone(updated);
      showToast(`Marked workout as completed! Great job! 🎉`, 'success');
    }
  };

  const isInPlan = (id: number) => planList.some((item) => item.id === id);
  const isInSaved = (id: number) => savedList.some((item) => item.id === id);
  const isDone = (id: number) => completedIds.includes(id);
  const isPlanFull = planList.length >= 5;

  return (
    <WorkoutContext.Provider
      value={{
        planList,
        savedList,
        completedIds,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleDone,
        isInPlan,
        isInSaved,
        isDone,
        isPlanFull,
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((toast) => {
          let bgStyle = 'bg-[#18260f] border-[#a3e635]/80 text-white';
          let iconBg = 'bg-[#a3e635] text-black';
          let iconSymbol = '✓';

          if (toast.type === 'remove') {
            bgStyle = 'bg-[#2a1315] border-red-500/80 text-white';
            iconBg = 'bg-red-500 text-white';
            iconSymbol = '✕';
          } else if (toast.type === 'warning') {
            bgStyle = 'bg-[#2a200d] border-amber-500/80 text-white';
            iconBg = 'bg-amber-500 text-black';
            iconSymbol = '⚠️';
          } else if (toast.type === 'info') {
            bgStyle = 'bg-[#121c2b] border-blue-500/80 text-white';
            iconBg = 'bg-blue-500 text-white';
            iconSymbol = 'ℹ';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto border ${bgStyle} px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-sans transition-all duration-300 animate-slide-up`}
            >
              <span className={`w-5 h-5 rounded-full ${iconBg} font-extrabold flex items-center justify-center text-xs shrink-0`}>
                {iconSymbol}
              </span>
              <span className="font-medium">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};