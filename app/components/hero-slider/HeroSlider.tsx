"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Course } from "@/types/schema";
import SliderBackground from "./SliderBackground";
import SliderContent from "./SliderContent";
import SliderControls from "./SliderControls";

interface HeroSliderProps {
  courses: Course[];
}

export default function HeroSlider({ courses }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? courses.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    if (courses.length === 0) return;
    setCurrentIndex((prevIndex) => {
      const isLastSlide = prevIndex === courses.length - 1;
      return isLastSlide ? 0 : prevIndex + 1;
    });
  }, [courses.length]);

  useEffect(() => {
    if (courses.length === 0) return;
    const timer = setInterval(nextSlide, 6000); // 6s interval
    return () => clearInterval(timer);
  }, [nextSlide, courses.length]);

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[85vh] min-h-[700px] overflow-hidden bg-background rounded-2xl md:rounded-[2rem] border border-white/5 shadow-2xl mx-auto max-w-[1920px] group/slider">
      {/* Decorative Tech Accents on Container */}
      <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-primary to-transparent z-30"></div>
      <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-primary to-transparent z-30"></div>
      <div className="absolute top-0 left-0 w-[1px] h-32 bg-gradient-to-b from-primary to-transparent z-30"></div>
      <div className="absolute bottom-0 right-0 w-[1px] h-32 bg-gradient-to-t from-primary to-transparent z-30"></div>

      {/* Main Slider Track */}
      <div
        className="w-full h-full flex transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {courses.map((course, index) => {
          const isActive = currentIndex === index;
          return (
            <div key={course.id} className="w-full h-full shrink-0 relative flex items-center group" data-active={isActive}>
              <SliderBackground course={course} isActive={isActive} isPriority={index === 0} />
              <SliderContent course={course} isActive={isActive} />
            </div>
          );
        })}
      </div>

      <SliderControls
        courses={courses}
        currentIndex={currentIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={setCurrentIndex}
      />
    </div>
  );
}
