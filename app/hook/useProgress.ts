"use client";

import { useState, useEffect } from 'react';

export function useProgress() {
  // 1. State สำหรับ Progress เดิม
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  // 2. ✅ เพิ่ม State สำหรับคอร์สที่ลงทะเบียน (Enroll)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]); 
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // โหลด Progress เดิม
    const savedProgress = localStorage.getItem('course_progress');
    if (savedProgress) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompletedLessons(JSON.parse(savedProgress));
      } catch (error) {
        console.error("Error parsing progress:", error);
      }
    }

    // ✅ โหลดข้อมูล Enrollment จาก LocalStorage
    const savedEnrollments = localStorage.getItem('enrolled_courses');
    if (savedEnrollments) {
      try {
         
        setEnrolledCourses(JSON.parse(savedEnrollments));
      } catch (error) {
        console.error("Error parsing enrollments:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  const markAsCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem('course_progress', JSON.stringify(updated));
    }
  };

  const enrollCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      const updated = [...enrolledCourses, courseId];
      setEnrolledCourses(updated);
      localStorage.setItem('enrolled_courses', JSON.stringify(updated));
    }
  };

  return { completedLessons, enrolledCourses, markAsCompleted, enrollCourse, isLoaded };
}