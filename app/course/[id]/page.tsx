"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, BookOpen, CheckCircle, PlayCircle, BarChart, Lock, Share2, Award } from "lucide-react";
import { getCourseById } from "@/app/service/api";
import { useProgress } from "@/app/hook/useProgress";
import { Course } from "@/types/schema";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const { completedLessons, enrolledCourses, enrollCourse } = useProgress();

  useEffect(() => {
    if (id) {
      getCourseById(id)
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

  if (!course) return <div className="min-h-screen flex items-center justify-center text-xl text-slate-400">Course not found</div>;

  const totalLessons = course.coursesDtl.length;
  const completedCount = course.coursesDtl.filter(l => completedLessons.includes(l.id)).length;
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isEnrolled = enrolledCourses.includes(course.id);

  const handleEnroll = () => {
    enrollCourse(course.id);
  };

  return (
    <div className="min-h-screen pb-20 pt-24">
      {/* Background Decoration */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
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
                  {course.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                  <Award size={14} /> BEST SELLER
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
                {course.name}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl border-l-4 border-primary/50 pl-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-slate-400 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  <span>{totalLessons} Lessons</span>
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

            {/* Progress Section (Authenticated) */}
            {isEnrolled && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-primary/20"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Course Progress</h3>
                      <p className="text-slate-400 text-sm">You&apos;re doing great! Keep it up.</p>
                    </div>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">
                      {progress}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden shadow-inner border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-accent-purple shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-1000 ease-out relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-[shine_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum List */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Curriculum</h3>
              <div className="space-y-3">
                {course.coursesDtl.map((lesson, idx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = !isEnrolled;

                  return (
                    <div key={lesson.id} className="relative group">
                      {isLocked ? (
                        <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/5 opacity-60">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-slate-500 bg-white/5 border border-white/5">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-400 text-lg">{lesson.title}</h4>
                              <span className="text-xs text-slate-600 font-medium tracking-wide">LOCKED CONTENT</span>
                            </div>
                          </div>
                          <div className="p-3 rounded-full bg-white/5 text-slate-600">
                            <Lock size={20} />
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={`/course/${course.id}/lesson/${lesson.id}`}
                          className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${isCompleted
                              ? "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
                              : "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                            }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${isCompleted ? "bg-green-500 text-slate-900" : "bg-white/10 text-slate-400 group-hover:text-white group-hover:bg-primary"
                              }`}>
                              {isCompleted ? <CheckCircle size={24} /> : idx + 1}
                            </div>
                            <div>
                              <h4 className={`font-bold text-lg transition-colors ${isCompleted ? "text-green-400" : "text-slate-200 group-hover:text-white"}`}>
                                {lesson.title}
                              </h4>
                              <span className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                                Video • {lesson.duration || "15 mins"}
                              </span>
                            </div>
                          </div>
                          <div className={`p-3 rounded-full transition-all ${isCompleted ? "text-green-500" : "bg-white/5 text-slate-400 group-hover:bg-primary group-hover:text-white"
                            }`}>
                            <PlayCircle size={24} className={isCompleted ? "opacity-0" : ""} />
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

              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group bg-slate-900">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="p-8 relative">
                  <div className="absolute -top-12 right-6 p-4 bg-white rounded-2xl shadow-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                    <span className="block text-xs font-bold text-slate-500 uppercase">Price</span>
                    <span className="text-2xl font-black text-slate-900">$Free</span>
                  </div>

                  <div className="space-y-6">
                    {isEnrolled ? (
                      <Link
                        href={`/course/${course.id}/lesson/${course.coursesDtl[0]?.id}`}
                        className="block w-full py-4 rounded-xl font-bold text-lg text-center shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] bg-gradient-to-r from-primary to-blue-600 text-white"
                      >
                        {progress > 0 ? "Continue Learning" : "Start Learning Now"}
                      </Link>
                    ) : (
                      <button
                        onClick={handleEnroll}
                        className="w-full py-4 rounded-xl font-bold text-lg text-center shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-white text-slate-950 hover:bg-slate-100"
                      >
                        Enroll for Free
                      </button>
                    )}

                    <p className="text-center text-xs text-slate-500">
                      30-Day Money-Back Guarantee
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <h4 className="font-bold text-white mb-4">This course includes:</h4>
                <ul className="space-y-3 text-sm text-slate-300">
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