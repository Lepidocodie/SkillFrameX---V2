"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, PlayCircle, Star, ChevronRight } from "lucide-react";
import { Course } from "@/types/schema";

interface CourseCardProps {
  course: Course & { progress?: number; totalLessons?: number };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const hasProgress = typeof course.progress === "number";
  const progress = course.progress || 0;
  const lessonCount = course.totalLessons || course.coursesDtl?.length || 0;

  return (
    <Link href={`/course/${course.id}`} className="group h-full block outline-none">
      <div className="relative bg-card backdrop-blur-2xl border border-border rounded-[2rem] overflow-hidden shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)] hover:border-primary/30 transition-all duration-700 hover:-translate-y-2 h-full flex flex-col focus-ring">

        {/* --- Image Section --- */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Advanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>

          {/* Floating Category Badge */}
          <div className="absolute top-5 left-5">
            <span className="px-4 py-1.5 rounded-full bg-background/60 backdrop-blur-xl border border-border text-[11px] font-bold text-white uppercase tracking-widest shadow-lg group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              {course.category}
            </span>
          </div>

          {/* Play/Action Overlay Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
              <PlayCircle size={32} className="text-white fill-white/20" />
            </div>
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="p-8 flex flex-col flex-1 relative z-10">
          {/* Decorative Glow */}
          <div className="absolute -top-20 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"></div>

          <h3 className="text-2xl font-display font-bold text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300 min-h-[64px]">
            {course.name}
          </h3>

          {!hasProgress && (
            <p className="text-slate-400 text-sm mb-8 line-clamp-3 flex-1 leading-relaxed">
              {course.description}
            </p>
          )}

          <div className="mt-auto pt-6 border-t border-border">
            {hasProgress ? (
              // 🟢 Progress Mode
              <div className="space-y-4">
                <div className="flex justify-between items-end text-[13px] font-semibold tracking-wide">
                  <span className="text-foreground">
                    {progress}% <span className="text-slate-500 font-normal">Mastered</span>
                  </span>
                  <span className="text-primary flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-md">
                    <BookOpen size={14} /> {lessonCount} Lessons
                  </span>
                </div>

                <div className="w-full h-2 bg-input rounded-full overflow-hidden border border-border/50 shadow-inner">
                  <div
                    className="h-full rounded-full relative transition-all duration-1000 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-purple))"
                    }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-r from-transparent to-white/30 animate-shine"></div>
                  </div>
                </div>
              </div>
            ) : (
              // ⚪ Marketplace Mode
              <div className="flex items-center justify-between text-[13px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    <BookOpen size={14} className="text-primary" />
                    <span>{lessonCount} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-secondary fill-secondary" />
                    <span className="text-white font-bold">4.8</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-primary font-bold tracking-wide group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Highlight Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent-purple to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
      </div>
    </Link>
  );
};

export default CourseCard;