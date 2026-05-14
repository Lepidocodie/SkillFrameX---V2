"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogService } from "@/app/service/BlogService";
import { BlogPost } from "@/types/schema";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Blog | SkillFrameX";
    BlogService.getAll()
      .then(setBlogs)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-fluid-h2 font-display font-black text-foreground mb-6">
            Our <span className="text-primary">Latest Articles</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends in web development, design, and career advice.
          </p>
        </div>

        {loading && <div className="text-center text-muted-foreground">Loading articles...</div>}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg group flex flex-col h-full animate-fade-in-up"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden relative shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-75 group-hover:opacity-55 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-background/80 backdrop-blur-md border border-border text-[11px] font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-primary" /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-secondary" /> {blog.author}
                  </span>
                </div>

                <h2 className="text-xl font-display font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blog/${blog.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm transition-all mt-auto group-hover:gap-3 duration-200"
                >
                  Read Article <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}