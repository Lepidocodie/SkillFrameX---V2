"use client";

import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "course_progress";


export function useProgress() {
  const [completedLessons, setCompletedLessons, isLoaded] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const markAsCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const isCompleted = (lessonId: string): boolean => {
    return completedLessons.includes(lessonId);
  };

  return { completedLessons, markAsCompleted, isCompleted, isLoaded };
}