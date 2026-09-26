'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '@/types/workout';

interface Toast {
  id: number;
  message: string;
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
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

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

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const addToPlan = (workout: Workout) => {
    if (!planList.some((item) => item.id === workout.id)) {
      const updated = [...planList, workout];
      updatePlan(updated);
      showToast(`Added "${workout.name}" to today's plan!`);
    } else {
      showToast(`"${workout.name}" is already in today's plan.`);
    }
  };

  const removeFromPlan = (id: number) => {
    const name = planList.find((i) => i.id === id)?.name || 'Workout';
    const updated = planList.filter((item) => item.id !== id);
    updatePlan(updated);
    showToast(`Removed "${name}" from today's plan.`);
  };

  const addToSaved = (workout: Workout) => {
    if (!savedList.some((item) => item.id === workout.id)) {
      const updated = [...savedList, workout];
      updateSaved(updated);
      showToast(`Saved "${workout.name}" for later!`);
    } else {
      showToast(`"${workout.name}" is already saved.`);
    }
  };

  const removeFromSaved = (id: number) => {
    const name = savedList.find((i) => i.id === id)?.name || 'Workout';
    const updated = savedList.filter((item) => item.id !== id);
    updateSaved(updated);
    showToast(`Removed "${name}" from saved list.`);
  };

  const toggleDone = (id: number) => {
    if (completedIds.includes(id)) {
      const updated = completedIds.filter((item) => item !== id);
      updateDone(updated);
      showToast(`Unmarked workout as completed.`);
    } else {
      const updated = [...completedIds, id];
      updateDone(updated);
      showToast(`Marked workout as completed! Great job! 🎉`);
    }
  };

  const isInPlan = (id: number) => planList.some((item) => item.id === id);
  const isInSaved = (id: number) => savedList.some((item) => item.id === id);
  const isDone = (id: number) => completedIds.includes(id);

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
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#18260f] border border-[#a3e635]/80 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-sans transition-all duration-300"
          >
            <span className="w-5 h-5 rounded-full bg-[#a3e635] text-black font-extrabold flex items-center justify-center text-xs">
              ✓
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
        ))}
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