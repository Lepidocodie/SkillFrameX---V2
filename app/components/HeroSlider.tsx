"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PlayCircle, Star, Sparkles } from "lucide-react";
import { Course } from "@/types/schema";

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
    const timer = setInterval(nextSlide, 6000); // 6s interval for better readability
    return () => clearInterval(timer);
  }, [nextSlide, courses.length]);

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[85vh] min-h-[700px] overflow-hidden bg-background rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] border border-border/50 mx-auto max-w-[1920px]">
      {/* Main Slider Track */}
      <div
        className="w-full h-full flex transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,1,0.2,1)] will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {courses.map((course, index) => (
          <div key={course.id} className="w-full h-full shrink-0 relative flex items-center">
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden bg-slate-900">
              <Image
                src={course.image}
                alt={course.name}
                fill
                className={`object-cover opacity-50 mix-blend-luminosity brightness-110 saturate-150 transition-transform duration-[15000ms] ease-out will-change-transform ${currentIndex === index ? "scale-110" : "scale-100"
                  }`}
                priority={index === 0}
              />
            </div>

            {/* Cinematic Gradient Overlays for maximum contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>

            {/* Background Texture/Noise */}
            <div className="absolute inset-0  opacity-20 mix-blend-overlay"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20">
              <div key={currentIndex} className="max-w-4xl space-y-10 group-data-[active=true]:animate-reveal">

                {/* Floating Badge */}
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/30 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-xl shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                    <Sparkles size={16} className="text-secondary" /> Featured Collection
                  </span>
                </div>

                {/* Hero Title */}
                <h1
                  className="text-fluid-h1 font-display text-white drop-shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: '200ms' }}
                >
                  {course.name}
                </h1>

                {/* Description */}
                <p
                  className="text-xl md:text-3xl text-slate-300/90 line-clamp-3 max-w-3xl animate-fade-in-up leading-relaxed font-light"
                  style={{ animationDelay: '300ms' }}
                >
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 animate-fade-in-up text-slate-400 text-sm md:text-base font-medium" style={{ animationDelay: '400ms' }}>
                  <div className="flex items-center gap-2 bg-white/5 py-1.5 px-4 rounded-full border border-white/10 backdrop-blur-md">
                    <div className="flex text-secondary gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-secondary z-10" />)}
                    </div>
                    <span className="text-white ml-1">4.9</span>
                  </div>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(14,165,233,1)]"></span>
                  <span className="tracking-wide">Updated This Week</span>
                </div>

                {/* Buttons */}
                <div className="pt-8 animate-fade-in-up flex flex-col sm:flex-row flex-wrap gap-5" style={{ animationDelay: '500ms' }}>
                  <Link
                    href={`/course/${course.id}`}
                    className="glow-effect inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-background rounded-full font-display font-bold text-lg hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                  >
                    <PlayCircle size={26} className="fill-background text-white" />
                    <span>Begin Course</span>
                  </Link>

                  <button className="inline-flex items-center justify-center px-10 py-5 bg-card border border-border text-white rounded-full font-display font-bold text-lg backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    View Syllabus
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20 hidden md:flex">
        <button
          onClick={prevSlide}
          className="p-5 rounded-full bg-background/50 hover:bg-white/10 border border-white/10 backdrop-blur-2xl text-white transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="p-5 rounded-full bg-background/50 hover:bg-white/10 border border-white/10 backdrop-blur-2xl text-white transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Modern Progress Dots (Bottom Left) */}
      <div className="absolute bottom-10 left-6 sm:left-16 flex space-x-3 z-20">
        {courses.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`cursor-pointer h-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${currentIndex === slideIndex
                ? "bg-white w-16 shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                : "bg-white/20 w-4 hover:bg-white/50"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}