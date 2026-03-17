import React from "react";
import Image from "next/image";
import { Course } from "@/types/schema";

interface SliderBackgroundProps {
  course: Course;
  isActive: boolean;
  isPriority: boolean;
}

export default function SliderBackground({ course, isActive, isPriority }: SliderBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-background">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className={`object-cover opacity-20 mix-blend-screen grayscale transition-transform duration-[12000ms] ease-out will-change-transform ${
            isActive ? "scale-105" : "scale-100"
          }`}
          priority={isPriority}
        />
      </div>

      {/* Heavy gradient for left-aligned content */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/70 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

      {/* Dot Matrix Pattern (Tech Monolith aesthetic) */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-50 z-10"
        style={{
          backgroundImage: 'radial-gradient(circle at center, oklch(0.98 0.01 260 / 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>
      
      {/* Dynamic Glow behind text area */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
    </>
  );
}
