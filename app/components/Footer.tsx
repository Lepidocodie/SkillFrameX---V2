"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Github, Mail, MapPin, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t-2 border-border">
      {/* Decorative background elements - bolder and more dramatic */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-accent-purple/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* 1. Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group w-fit focus-ring p-1 rounded-lg">
              <div className="bg-gradient-to-br from-primary/20 to-accent-purple/20 p-3 rounded-2xl border border-border group-hover:border-primary/50 group-hover:bg-primary/30 transition-all duration-500 shadow-lg">
                <GraduationCap className="h-7 w-7 text-primary group-hover:scale-110 group-hover:text-white transition-all duration-300" />
              </div>
              <span className="text-3xl font-display font-black text-white tracking-tighter drop-shadow-sm">
                SkillFrame<span className="text-gradient-primary">X</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
              Elevating the standard of online education. We provide world-class courses to help you master new skills and define your future.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
            </div>
          </div>

          {/* 2. Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/blog">Blog & Articles</FooterLink></li>
              <li><FooterLink href="/account">My Learning</FooterLink></li>
              <li><FooterLink href="#">All Courses</FooterLink></li>
            </ul>
          </div>

          {/* 3. Support (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><FooterLink href="#">Help Center</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* 4. Newsletter (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-foreground font-display font-bold mb-6 text-sm uppercase tracking-widest bg-white/5 inline-block px-3 py-1 rounded-md border border-border">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Join 50,000+ relentless learners receiving our weekly transmission.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-input border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-primary focus:bg-background/80 transition-all placeholder:text-slate-500 shadow-inner"
              />
              <button className="bg-primary hover:bg-primary/90 text-white font-bold font-display px-8 py-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                Subscribe
              </button>
            </form>
            <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Mail size={16} className="text-primary" /> support@skillframex.com
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 SkillFrameX. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors cursor-default">
              <MapPin size={12} className="text-primary" /> Bangkok, Thailand
            </span>
            <span className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-default">
              Made with <Heart size={10} className="fill-current text-red-500" /> for Borntodev
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-card border border-border hover:bg-primary/20 hover:border-primary/50 hover:text-white text-slate-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_20px_rgba(14,165,233,0.2)]">
    {icon}
  </a>
)

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="flex items-center gap-2 hover:text-white transition-colors group">
    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
    <span className="group-hover:translate-x-1 transition-transform duration-300">{children}</span>
  </Link>
)