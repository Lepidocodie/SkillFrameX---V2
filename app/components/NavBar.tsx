"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { Avatar } from "@/app/components/ui/Avatar";

function NavBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const query = searchParams.get("search");
    if (query && query !== searchTerm) {
      setSearchTerm(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Hardening: Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("search") || "";
      if (searchTerm.trim() !== currentQuery && isSearching) {
         if (searchTerm.trim() === "") {
           router.push("/");
         } else {
           router.push(`/?search=${encodeURIComponent(searchTerm)}`);
         }
      }
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, router, isSearching]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
            ? "bg-background/80 backdrop-blur-3xl border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
            : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-10 focus-ring rounded-lg p-1 -ml-1">
              <span className="text-3xl font-display font-black tracking-tighter text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
                SkillFrame<span className="text-gradient-primary">X</span>
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Master a new skill today..."
                  className="block w-full pl-12 pr-6 py-3 border border-border rounded-full leading-5 bg-input text-foreground placeholder-slate-400 focus:outline-none focus:bg-background/80 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300 hover:bg-input/80 backdrop-blur-md shadow-inner"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-1">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/blog">Blog</NavLink>
              </div>

              <div className="h-6 w-px bg-white/10 mx-2"></div>

              <Link href="/account" className="group flex items-center gap-4 pl-2 focus-ring rounded-full md:rounded-xl">
                <div className="text-right hidden lg:block">
                  <p className="text-xs text-slate-400 font-medium">Welcome back</p>
                  <p className="text-sm text-foreground font-display font-bold group-hover:text-primary transition-colors">Student</p>
                </div>
                <Avatar name="Student User" size="md" showProBadge={true} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown & Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-sm z-50 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search courses..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="space-y-4">
            <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink href="/account" onClick={() => setIsMobileMenuOpen(false)}>My Account</MobileNavLink>
          </div>

          <div className="absolute bottom-8 left-6 right-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent-purple/10 border border-white/5">
              <div className="flex items-center gap-4 mb-3">
                <Avatar name="Student User" size="md" showProBadge={true} />
                <div>
                  <p className="text-sm font-bold text-white font-display">Student Account</p>
                  <p className="text-xs text-slate-400">View Profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group overflow-hidden"
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-lg duration-300"></span>
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between p-4 rounded-xl text-lg font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all group"
  >
    {children}
    <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
  </Link>
);

export default function NavBar() {
  return (
    <Suspense fallback={<nav className="h-24 bg-background"></nav>}>
      <NavBarContent />
    </Suspense>
  );
}