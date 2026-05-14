import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Course } from "@/types/schema";

interface SliderContentProps {
  course: Course;
  isActive: boolean;
}

export default function SliderContent({ course, isActive }: SliderContentProps) {
  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-full flex items-center">
      <div 
        key={`${course.id}-${isActive}`}
        className={`w-full md:w-[70%] lg:w-[60%] space-y-6 md:space-y-8 ${
          isActive ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700`}
      >
        {/* Category Badge */}
        <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-wider text-primary rounded-full">
            {course.category} · Featured
          </span>
        </div>

        {/* Hero Title */}
        <h1
          className="text-fluid-h1 font-display text-foreground drop-shadow-sm animate-fade-in-up leading-[1.05]"
          style={{ animationDelay: '100ms' }}
        >
          {course.name}
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-muted-foreground line-clamp-3 animate-fade-in-up leading-relaxed max-w-xl"
          style={{ animationDelay: '150ms' }}
        >
          {course.description}
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 animate-fade-in-up flex flex-col sm:flex-row flex-wrap gap-3" style={{ animationDelay: '200ms' }}>
          <Link
            href={`/course/${course.id}`}
            className="group/btn inline-flex items-center justify-center gap-2.5 px-8 md:px-10 py-4 bg-foreground text-background font-semibold text-sm md:text-base rounded-xl hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 shadow-md w-full sm:w-auto"
          >
            <span>Start Course</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </Link>

          <button className="inline-flex items-center justify-center px-8 md:px-10 py-4 bg-muted border border-border text-foreground font-semibold text-sm md:text-base rounded-xl hover:border-primary/50 hover:bg-muted/80 hover:text-primary transition-all duration-200 w-full sm:w-auto">
            View Syllabus
          </button>
        </div>
      </div>
    </div>
  );
}
