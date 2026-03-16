"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getAllBlogs } from "@/app/service/api";
import { BlogPost } from "@/types/schema";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Blog | SkillFrameX";
    getAllBlogs()
      .then(setBlogs)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-fluid-h2 font-display font-black text-white mb-6">
            Our <span className="text-gradient-primary">Latest Articles</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends in web development, design, and career advice.
          </p>
        </div>

        {/* Loading */}
        {loading && <div className="text-center text-white">Loading articles...</div>}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="glass-panel rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.3)] group flex flex-col h-full animate-fade-in-up">
              {/* Image */}
              <div className="h-56 overflow-hidden relative">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {blog.tags.map(tag => (
                    <span key={tag} className="bg-background/60 backdrop-blur-xl border border-white/10 text-[11px] font-bold uppercase tracking-widest text-primary px-3 py-1.5 rounded-full shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 relative">
                <div className="absolute -top-10 right-0 w-24 h-24 bg-primary/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"></div>
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} className="text-secondary" /> {blog.author}</span>
                </div>
                
                <h2 className="text-2xl font-display font-bold text-foreground mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">
                  {blog.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>

                <Link 
                  href={`/blog/${blog.id}`} 
                  className="inline-flex items-center text-primary font-bold text-sm tracking-wide transition-all mt-auto"
                >
                  <span className="group-hover:mr-2 transition-all">Read Article</span> <ArrowRight size={16} className="transform origin-left scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-purple to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}