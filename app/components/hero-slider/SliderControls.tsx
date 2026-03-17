import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Course } from "@/types/schema";

interface SliderControlsProps {
  courses: Course[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export default function SliderControls({
  courses,
  currentIndex,
  onPrev,
  onNext,
  onDotClick,
}: SliderControlsProps) {
  return (
    <>
      {/* Navigation Controls (Tech Aesthetic) */}
      <div className="absolute bottom-10 right-10 flex gap-1 z-20 hidden md:flex">
        <button
          onClick={onPrev}
          className="p-4 bg-background/80 border border-white/10 hover:border-primary/50 text-white transition-all hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} className="group-hover/btn:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={onNext}
          className="p-4 bg-background/80 border border-white/10 hover:border-primary/50 text-white transition-all hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Modern Progress Bars instead of standard dots */}
      <div className="absolute bottom-10 left-6 sm:left-10 flex space-x-2 z-20">
        {courses.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => onDotClick(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            className="group relative h-1 cursor-pointer transition-all duration-300"
            style={{ width: currentIndex === slideIndex ? '60px' : '30px' }}
          >
            {/* Background Track */}
            <div className="absolute inset-0 bg-white/20"></div>
            
            {/* Active Indicator */}
            {currentIndex === slideIndex && (
              <div 
                className="absolute inset-0 bg-primary shadow-[0_0_10px_var(--color-primary)]"
                style={{
                  animation: 'reveal 6s linear forwards',
                  transformOrigin: 'left'
                }}
              ></div>
            )}
            
            {/* Hover Indicator */}
            {currentIndex !== slideIndex && (
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </button>
        ))}
        <div className="ml-4 flex items-center text-xs font-mono text-white/50 space-x-2">
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(courses.length).padStart(2, '0')}</span>
        </div>
      </div>
    </>
  );
}
