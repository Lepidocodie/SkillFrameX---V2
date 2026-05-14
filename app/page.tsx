"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "./components/CourseCard";
import HeroSlider from "./components/hero-slider/HeroSlider";
import { CourseService } from "@/app/service/CourseService";
import { CourseModel } from "@/types/CourseModel";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { useProgress } from "@/app/hook/useProgress";
import { useEnrollment } from "@/app/hook/useEnrollment";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { Course } from "@/types/schema";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { completedLessons } = useProgress();
  const { enrolledCourses } = useEnrollment();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesData, categoriesData] = await Promise.all([
          CourseService.getAllCourses(),
          CourseService.getCategories(),
        ]);
        setCourses(coursesData);
        setCategories(["All", ...categoriesData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Build CourseModels once; all filtering/progress is computed via the model
  const courseModels = courses.map(
    (c) => new CourseModel(c, completedLessons, enrolledCourses)
  );

  const filteredModels = courseModels.filter(
    (m) => m.matchesCategory(selectedCategory) && m.matchesSearch(searchTerm)
  );

  // Featured logic: first 5 raw courses for the hero slider
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
            <h1 className="text-fluid-h2 font-display text-foreground tracking-tighter drop-shadow-sm">
              Results for <br />
              <span className="text-primary leading-none">&quot;{searchTerm}&quot;</span>
            </h1>
            <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto">
              Found {filteredModels.length} courses matching your search.
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
              <h2 className="text-fluid-h2 font-display text-foreground mb-6 leading-[1.05]">
                {selectedCategory === "All" ? "Explore Courses" : `${selectedCategory} Courses`}
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
                Master new skills with our expert-led curriculum designed to push your boundaries.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/30"
                      : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-muted"
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
            <p className="text-muted-foreground animate-pulse">Loading amazing content...</p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {filteredModels.map((model) => (
              <div key={model.id} className="h-full">
                <CourseCard course={model.toCardProps()} />
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
                if (searchTerm) window.location.href = '/';
              }}
              variant="bordered"
            />
          )
        )}

        {/* CTA Section */}
        {!loading && !searchTerm && (
          <div className="mt-40 mb-32 relative rounded-3xl overflow-hidden bg-card border border-border animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-purple/5 pointer-events-none" />
            <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-fluid-h2 font-display text-foreground leading-tight">
                  Ready to redefine your trajectory?
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Join a community of relentless learners. Start acquiring the skills that matter today.
                </p>
              </div>
              <div className="flex w-full md:w-auto shrink-0">
                <button className="w-full md:w-auto px-10 py-5 bg-foreground text-background font-semibold text-lg rounded-xl hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-2.5">
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
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  );
}