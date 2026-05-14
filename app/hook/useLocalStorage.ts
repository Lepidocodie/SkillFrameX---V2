"use client";

import { useState, useEffect } from "react";


export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read from storage on mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch (error) {
      console.error(`[useLocalStorage] Failed to read "${key}":`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  const persist = (next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.error(`[useLocalStorage] Failed to write "${key}":`, error);
    }
  };

  return [value, persist, isLoaded];
}
