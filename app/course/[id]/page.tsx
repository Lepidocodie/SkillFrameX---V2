"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, BookOpen, CheckCircle, PlayCircle, BarChart, Lock, Share2, Award } from "lucide-react";
import { CourseService } from "@/app/service/CourseService";
import { useProgress } from "@/app/hook/useProgress";
import { useEnrollment } from "@/app/hook/useEnrollment";
import { CourseModel } from "@/types/CourseModel";
import { Course } from "@/types/schema";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const { completedLessons, isCompleted } = useProgress();
  const { enrolledCourses, enrollCourse } = useEnrollment();

  useEffect(() => {
    if (id) {
      CourseService.getCourseById(id)
        .then((data) => setCourse(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-secondary rounded-full animate-bounce delay-100"></div>
      <div className="w-4 h-4 bg-accent-purple rounded-full animate-bounce delay-200"></div>
    </div>
  );

  if (!course) return <div className="min-h-screen flex items-center justify-center text-xl text-muted-foreground">Course not found</div>;

  // Single CourseModel constructed once — all derived state flows from it
  const model = new CourseModel(course, completedLessons, enrolledCourses);

  return (
    <div className="min-h-screen pb-20 pt-24">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Courses</span>
        </Link>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: Content */}
          <div className="lg:col-span-2 space-y-10 animate-fade-in-up">

            {/* Header Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider rounded-lg border border-secondary/20">
                  {model.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                  <Award size={14} /> BEST SELLER
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1]">
                {model.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {model.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  <span>{model.totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span>~4 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart size={18} className="text-primary" />
                  <span>Beginner to Pro</span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            {model.isEnrolled && (
              <div className="bg-gradient-to-r from-muted to-muted/50 p-8 rounded-3xl border border-border shadow-md relative overflow-hidden group">


                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">Course Progress</h3>
                      <p className="text-muted-foreground text-sm">You&apos;re doing great! Keep it up.</p>
                    </div>
                    <span className="text-3xl font-black text-primary">{model.progress}%</span>
                  </div>

                  <div className="w-full bg-background rounded-full h-4 overflow-hidden shadow-inner border border-border">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-accent-purple shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-1000 ease-out relative"
                      style={{ width: `${model.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-primary/30 animate-[shine_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum List */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Curriculum</h3>
              <div className="space-y-3">
                {model.lessons.map((lesson, idx) => {
                  const lessonCompleted = isCompleted(lesson.id);
                  const isLocked = !model.isEnrolled;

                  return (
                    <div key={lesson.id} className="relative group">
                      {isLocked ? (
                        <div className="flex items-center justify-between p-5 rounded-2xl border border-border bg-muted opacity-80">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-muted-foreground bg-muted border border-border">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-muted-foreground text-lg">{lesson.title}</h4>
                              <span className="text-xs text-muted-foreground font-medium tracking-wide">LOCKED CONTENT</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-full bg-muted text-muted-foreground">
                            <Lock size={20} />
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={`/course/${course.id}/lesson/${lesson.id}`}
                          className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 ${
                            lessonCompleted
                              ? "bg-green-500/10 border-green-500/20 hover:bg-green-500/15"
                              : "bg-card border-border hover:border-primary/50 hover:bg-muted hover:shadow-lg hover:-translate-y-px"
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                              lessonCompleted ? "bg-green-500 text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary-foreground group-hover:bg-primary"
                            }`}>
                              {lessonCompleted ? <CheckCircle size={24} /> : idx + 1}
                            </div>
                            <div>
                              <h4 className={`font-bold text-lg transition-colors ${lessonCompleted ? "text-green-600" : "text-foreground group-hover:text-primary"}`}>
                                {lesson.title}
                              </h4>
                              <span className="text-sm text-muted-foreground">
                                Video • {lesson.duration || "15 mins"}
                              </span>
                            </div>
                          </div>
                          <div className={`p-3 rounded-full transition-all ${
                            lessonCompleted ? "text-green-500" : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                          }`}>
                            <PlayCircle size={24} className={lessonCompleted ? "opacity-0" : ""} />
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>

              <div className="rounded-3xl overflow-hidden shadow-xl border border-border relative group bg-card">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="p-8 relative">
                  <div className="absolute -top-12 right-6 p-4 bg-background border border-border rounded-2xl shadow-md transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <span className="block text-xs font-bold text-muted-foreground uppercase">Price</span>
                    <span className="text-2xl font-black text-foreground">$Free</span>
                  </div>

                  <div className="space-y-6">
                    {model.isEnrolled ? (
                      <Link
                        href={`/course/${course.id}/lesson/${model.firstLessonId}`}
                        className="block w-full py-4 rounded-xl font-semibold text-lg text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                      >
                        {model.progress > 0 ? "Continue Learning" : "Start Learning Now"}
                      </Link>
                    ) : (
                      <button
                        onClick={() => enrollCourse(course.id)}
                        className="w-full py-4 rounded-xl font-semibold text-lg text-center transition-all duration-200 hover:-translate-y-0.5 bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] shadow-md"
                      >
                        Enroll for Free
                      </button>
                    )}

                    <p className="text-center text-xs text-muted-foreground">
                      30-Day Money-Back Guarantee
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted border border-border rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-bold text-foreground mb-4">This course includes:</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3"><Clock size={16} className="text-primary" /> Lifetime access</li>
                  <li className="flex items-center gap-3"><Share2 size={16} className="text-primary" /> Access on mobile and TV</li>
                  <li className="flex items-center gap-3"><Award size={16} className="text-primary" /> Certificate of completion</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}