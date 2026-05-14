"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Github, Mail, MapPin, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t-2 border-border">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* 1. Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group w-fit focus-ring p-1 rounded-lg">
              <div className="bg-gradient-to-br from-primary/20 to-accent-purple/20 p-3 rounded-2xl border border-border group-hover:border-primary/50 group-hover:bg-primary/30 transition-all duration-500 shadow-lg">
                <GraduationCap className="h-7 w-7 text-primary transition-all duration-300" />
              </div>
              <span className="text-3xl font-display font-black text-foreground tracking-tighter drop-shadow-sm">
                SkillFrame<span className="text-primary">X</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">
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
            <h3 className="text-foreground font-bold mb-6 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/blog">Blog & Articles</FooterLink></li>
              <li><FooterLink href="/account">My Learning</FooterLink></li>
              <li><FooterLink href="#">All Courses</FooterLink></li>
            </ul>
          </div>

          {/* 3. Support (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-foreground font-bold mb-6 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><FooterLink href="#">Help Center</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* 4. Newsletter (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-foreground font-display font-bold mb-6 text-sm uppercase tracking-widest bg-muted inline-block px-3 py-1 rounded-md border border-border">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Join 50,000+ relentless learners receiving our weekly transmission.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-input border border-border rounded-xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-primary focus:bg-background transition-all placeholder:text-muted-foreground shadow-inner"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-4 rounded-xl text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98]">
                Subscribe
              </button>
            </form>
            <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <Mail size={16} className="text-primary" /> support@skillframex.com
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 SkillFrameX. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
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
  <a href="#" aria-label="Social media link" className="h-10 w-10 flex items-center justify-center rounded-xl bg-card border border-border hover:bg-muted hover:border-primary/30 hover:text-foreground text-muted-foreground transition-all duration-200 shadow-sm">
    {icon}
  </a>
)

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="flex items-center gap-2 hover:text-foreground transition-colors group">
    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
    <span className="group-hover:translate-x-1 transition-transform duration-300">{children}</span>
  </Link>
)