"use client";

import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "enrolled_courses";


export function useEnrollment() {
  const [enrolledCourses, setEnrolledCourses, isLoaded] = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const enrollCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const isEnrolled = (courseId: string): boolean => {
    return enrolledCourses.includes(courseId);
  };

  return { enrolledCourses, enrollCourse, isEnrolled, isLoaded };
}
