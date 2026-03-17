import React from "react";
import Link from "next/link";
import { Sparkles, TerminalSquare, ArrowRight } from "lucide-react";
import { Course } from "@/types/schema";

interface SliderContentProps {
  course: Course;
  isActive: boolean;
}

export default function SliderContent({ course, isActive }: SliderContentProps) {
  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-full flex items-center">
      {/* Tech Monolith Left-Aligned Container */}
      <div 
        key={`${course.id}-${isActive}`}
        className={`w-full md:w-[70%] lg:w-[60%] space-y-8 md:space-y-10 group-data-[active=true]:animate-reveal ${
          isActive ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000 border-l-4 border-primary pl-6 md:pl-10`}
      >
        {/* Terminal-style Metadata Strip */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 border border-primary/20 text-xs font-mono tracking-widest uppercase text-primary font-bold">
            <TerminalSquare size={14} className="text-secondary" />
            <span>SYS_FEATURED // 4.9 RATING</span>
            <span className="w-1.5 h-1.5 bg-accent-pink rounded-full shadow-[0_0_10px_var(--color-accent-pink)] animate-pulse"></span>
          </div>
        </div>

        {/* Hero Title (Massive, Display) */}
        <h1
          className="text-fluid-h1 font-display text-white drop-shadow-lg animate-fade-in-up leading-[1.05]"
          style={{ animationDelay: '200ms' }}
        >
          {course.name}
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-2xl text-slate-300 line-clamp-3 animate-fade-in-up leading-relaxed font-light"
          style={{ animationDelay: '300ms' }}
        >
          {course.description}
        </p>

        {/* Tech-Forward Buttons */}
        <div className="pt-4 animate-fade-in-up flex flex-col sm:flex-row flex-wrap gap-4" style={{ animationDelay: '400ms' }}>
          <Link
            href={`/course/${course.id}`}
            className="group/btn relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-background font-mono font-bold text-sm md:text-base hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 w-full sm:w-auto"
          >
            <span>[ INITIALIZE_COURSE ]</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            <div className="absolute inset-0 border border-transparent group-hover/btn:border-primary/50 pointer-events-none transition-colors"></div>
          </Link>

          <button className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/20 text-slate-300 font-mono font-bold text-sm md:text-base hover:border-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 w-full sm:w-auto">
            &gt; VIEW_SYLLABUS
          </button>
        </div>
      </div>
    </div>
  );
}
