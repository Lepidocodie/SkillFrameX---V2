"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getBlogById } from "@/app/service/api";
import { BlogPost } from "@/types/schema";

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getBlogById(params.id as string)
        .then((data) => {
           setBlog(data);
           if (data) document.title = `${data.title} | SkillFrameX`;
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
  );
  if (!blog) return <div className="text-center text-white mt-40 font-display text-2xl">Article not found</div>;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-accent-purple/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/2 -translate-x-1/4"></div>

      <main className="max-w-4xl mx-auto px-4 pt-32 pb-10 relative z-10 animate-fade-in-up">
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-white font-bold tracking-widest text-sm uppercase mb-8 transition-colors group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Journal
        </Link>

        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-border group">
          <Image 
            src={blog.image} 
            alt={blog.title} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
          
          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 bg-background/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-primary shadow-lg">
                  <Tag size={12} /> {tag}
                </span>
              ))}
            </div>
            <h1 className="text-fluid-h2 font-display font-black text-white leading-[1.1] drop-shadow-md">
                {blog.title}
            </h1>
          </div>
        </div>

        {/* Meta Data */}
        <div className="flex flex-wrap items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-400 mb-12 border-b border-border pb-8">
          <span className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> {blog.date}</span>
          <span className="flex items-center gap-2"><User size={18} className="text-secondary" /> {blog.author}</span>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-primary">
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-10 font-medium border-l-4 border-primary pl-6">
            {blog.excerpt}
          </p>
          <div className="text-slate-300 leading-relaxed space-y-6">
             {/* Mock Content */}
             <p>{blog.content}</p>
             <p>As we navigate through the complexities of modern web development, it becomes increasingly apparent that mastering these core fundamentals isn&apos;t just an advantage—it&apos;s a necessity. The landscape is shifting rapidly, abandoning bloated frameworks in favor of leaner, more intentional design systems and architectures.</p>
             <p>Our approach emphasizes absolute clarity. By focusing on semantic structure, precise CSS methodologies, and mindful JavaScript implementation, we strip away the unnecessary overhead that plagues most enterprise applications today.</p>
          </div>
        </article>

        {/* Call to Action (Tie-in Course) */}
        <div className="mt-24 relative rounded-[2rem] overflow-hidden bg-background border border-border shadow-[0_20px_80px_-20px_rgba(14,165,233,0.2)] p-10 text-center flex flex-col items-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/20 blur-[40px] rounded-full mix-blend-screen pointer-events-none"></div>
          
          <div className="relative z-10 max-w-xl">
              <h3 className="text-3xl font-display font-bold text-white mb-4">Master this discipline.</h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">Go beyond articles. Check out our comprehensive masterclasses designed to take you from beginner to seasoned professional.</p>
              <Link href="/" className="inline-flex items-center px-10 py-5 bg-white text-background rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                Explore Masterclasses
              </Link>
          </div>
        </div>

      </main>
    </div>
  );
}