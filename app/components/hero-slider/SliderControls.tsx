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
      {/* Nav Arrows */}
      <div className="absolute bottom-10 right-8 md:right-10 hidden md:flex gap-1 z-20">
        <button
          onClick={onPrev}
          className="p-3.5 bg-background/70 border border-border hover:border-primary/50 hover:bg-muted text-foreground rounded-lg transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onNext}
          className="p-3.5 bg-background/70 border border-border hover:border-primary/50 hover:bg-muted text-foreground rounded-lg transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-10 left-6 sm:left-10 flex items-center gap-2 z-20">
        {courses.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => onDotClick(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            className="relative h-1 cursor-pointer transition-all duration-300"
            style={{ width: currentIndex === slideIndex ? "56px" : "24px" }}
          >
            {/* Track */}
            <div className="absolute inset-0 bg-primary/20 rounded-full" />

            {/* Active fill */}
            {currentIndex === slideIndex && (
              <div
                className="absolute inset-0 bg-primary rounded-full"
                style={{ animation: "reveal 6s linear forwards", transformOrigin: "left" }}
              />
            )}

            {/* Inactive hover */}
            {currentIndex !== slideIndex && (
              <div className="absolute inset-0 bg-primary/40 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            )}
          </button>
        ))}

        <div className="ml-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground tabular-nums">
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(courses.length).padStart(2, "0")}</span>
        </div>
      </div>
    </>
  );
}
