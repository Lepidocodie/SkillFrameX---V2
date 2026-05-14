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
      <div className="relative bg-card border border-border rounded-[1.5rem] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg h-full flex flex-col focus-ring">

        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[11px] font-semibold text-foreground uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200">
              {course.category}
            </span>
          </div>

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="p-3 bg-background/50 backdrop-blur-md rounded-full border border-border scale-75 group-hover:scale-100 transition-transform duration-300">
              <PlayCircle size={28} className="text-foreground fill-background/50" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 relative z-10">
          <h3 className="text-xl font-display font-bold text-foreground mb-2.5 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200 min-h-[56px]">
            {course.name}
          </h3>

          {!hasProgress && (
            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
              {course.description}
            </p>
          )}

          <div className="mt-auto pt-5 border-t border-border">
            {hasProgress ? (
              // Progress Mode
              <div className="space-y-3">
                <div className="flex justify-between items-end text-[13px] font-semibold">
                  <span className="text-foreground">
                    {progress}% <span className="text-muted-foreground font-normal">Mastered</span>
                  </span>
                  <span className="text-primary flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-md text-xs">
                    <BookOpen size={13} /> {lessonCount} Lessons
                  </span>
                </div>
                <div className="w-full h-1.5 bg-input rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, var(--color-primary), var(--color-accent-purple))",
                    }}
                  />
                </div>
              </div>
            ) : (
              // Marketplace Mode
              <div className="flex items-center justify-between text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={13} className="text-primary" />
                    <span>{lessonCount} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={13} className="text-secondary fill-secondary" />
                    <span className="text-foreground font-bold">4.8</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary font-semibold group-hover:translate-x-0.5 transition-transform duration-200">
                  <span>Explore</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            )}
          </div>

          {/* Bottom accent line — reveals on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;