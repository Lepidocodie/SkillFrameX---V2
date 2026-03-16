"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Rocket } from "lucide-react";

export function OnboardingBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("skillframex_visited");
    
    // Slight delay so the user sees it animate in over the home page
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("skillframex_visited", "true");
  };

  const handleAction = () => {
    handleClose();
    // Scroll to courses or focus search
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 inset-x-4 md:bottom-8 md:right-8 md:left-auto md:w-[450px] z-[100] animate-fade-in-up hover-lift">
      <div className="relative overflow-hidden bg-card/90 backdrop-blur-3xl border border-primary/30 rounded-3xl p-6 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.5)]">
        
        {/* Background Effects */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[30px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-purple/20 blur-[30px] rounded-full pointer-events-none mix-blend-screen"></div>
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all focus-ring"
          aria-label="Close welcome banner"
        >
          <X size={16} />
        </button>

        <div className="flex gap-4 relative z-10">
          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent-purple to-accent-pink shadow-lg">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-display font-bold text-foreground text-lg leading-tight">
              Welcome to SkillFrame<span className="text-gradient-primary">X</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-[90%]">
              Ready to accelerate your career? Explore our library of premium courses designed for relentless learners.
            </p>
            
            <button 
              onClick={handleAction}
              className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors group"
            >
              Start Exploring <Rocket size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
