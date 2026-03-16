"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "./components/CourseCard";
import HeroSlider from "./components/HeroSlider";
import { Course } from "@/types/schema";
import { getAllCourses, getCategories } from "@/app/service/api";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { useProgress } from "@/app/hook/useProgress";
import { EmptyState } from "@/app/components/ui/EmptyState";

type CourseWithProgress = Course & { progress?: number; totalLessons?: number };

function HomeContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { completedLessons, enrolledCourses } = useProgress();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, categoriesData] = await Promise.all([
          getAllCourses(),
          getCategories()
        ]);

        setCourses(coursesData || []);
        setCategories(["All", ...(categoriesData || [])]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const coursesWithProgress: CourseWithProgress[] = courses.map((course) => {
    const isEnrolled = enrolledCourses.includes(course.id);

    if (isEnrolled) {
      const totalLessons = course.coursesDtl?.length || 0;
      const completedCount = course.coursesDtl?.filter((l) => completedLessons.includes(l.id)).length || 0;
      const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return { ...course, progress, totalLessons };
    }

    return course;
  });

  const filteredCourses = coursesWithProgress.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      (course.name && course.name.toLowerCase().includes(searchTerm)) ||
      (course.description && course.description.toLowerCase().includes(searchTerm)) ||
      (course.category && course.category.toLowerCase().includes(searchTerm)) ||
      (course.coursesDtl && course.coursesDtl.some(lesson => lesson.title && lesson.title.toLowerCase().includes(searchTerm)));

    return matchesCategory && matchesSearch;
  });

  // Featured logic: Just take the first 5 for now
  const featuredCourses = courses.slice(0, 5);

  return (
    <div className="min-h-screen pb-20">

      {/* Hero Section */}
      {!loading && featuredCourses.length > 0 && !searchTerm && (
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto animate-fade-in-up">
          <HeroSlider courses={featuredCourses} />
        </section>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search Results Header */}
        {searchTerm && (
          <div className="text-center mb-16 space-y-6 animate-fade-in-up pt-24">
            <h1 className="text-fluid-h2 font-display text-white tracking-tighter mix-blend-screen drop-shadow-md">
              Results for <br />
              <span className="text-gradient-primary leading-none">&quot;{searchTerm}&quot;</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">
              Found {filteredCourses.length} transformative courses matching your search.
            </p>
          </div>
        )}

        {/* Section Header & Filters */}
        {!searchTerm && (
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm tracking-widest uppercase mb-6 border border-secondary/20">
                <Zap className="w-4 h-4" /> Expand Your Mastery
              </div>
              <h2 className="text-fluid-h2 font-display text-white mb-6 leading-[1.05]">
                {selectedCategory === "All" ? "Explore Courses" : `${selectedCategory} Courses`}
              </h2>
              <p className="text-slate-300 text-xl leading-relaxed max-w-xl">
                Master new skills with our expert-led curriculum designed to push your boundaries.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md ${selectedCategory === category
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                    : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}


        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-slate-500 animate-pulse">Loading amazing content...</p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="h-full">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <EmptyState 
              iconType="search"
              title="No Masterclasses Found"
              description="We couldn't find any courses matching your criteria. Try adjusting your filters or search terms."
              actionText="Clear Filters"
              actionOnClick={() => { 
                setSelectedCategory("All"); 
                // Need a way to clear search params, for now just pushing to home
                if (searchTerm) window.location.href = '/';
              }}
              variant="bordered"
            />
          )
        )}

        {/* Newsletter / CTA Section (New) */}
        {!loading && !searchTerm && (
          <div className="mt-40 mb-32 relative rounded-[3rem] overflow-hidden bg-background border border-border shadow-[0_20px_80px_-20px_rgba(14,165,233,0.3)] hover:shadow-[0_20px_100px_-20px_rgba(14,165,233,0.5)] transition-shadow duration-700 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="absolute inset-0 opacity-30 mix-blend-overlay"></div>
            
            {/* Extremely Bold Abstract Shapes */}
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-float"></div>
            <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-accent-pink/10 rounded-full blur-[120px] mix-blend-screen animate-float-fast"></div>
            
            <div className="relative z-10 px-8 py-24 md:px-20 md:py-32 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-16 backdrop-blur-3xl">
              <div className="max-w-2xl space-y-8">
                <h2 className="text-fluid-h2 font-display text-white leading-tight">
                  Ready to redefine your <span className="text-gradient">trajectory?</span>
                </h2>
                <p className="text-slate-300 text-xl md:text-2xl font-medium leading-relaxed opacity-90">
                  Join a community of relentless learners. Start acquiring the skills that matter today.
                </p>
              </div>
              <div className="flex w-full md:w-auto shrink-0">
                <button className="w-full md:w-auto px-12 py-6 bg-white text-background font-display font-bold text-xl rounded-full glow-effect hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3">
                  Begin Journey <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <HomeContent />
    </Suspense>
  );
}