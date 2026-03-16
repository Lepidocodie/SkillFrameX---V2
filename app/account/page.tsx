"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getAllCourses } from "@/app/service/api";
import { Course } from "@/types/schema";
import { useProgress } from "@/app/hook/useProgress";
import CourseCard from "@/app/components/CourseCard";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { ProfileHeader } from "./components/ProfileHeader";
import { ActivityChart } from "./components/ActivityChart";
import { TopicPieChart } from "./components/TopicPieChart";

export default function AccountPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"learning" | "completed">("learning");

    const { completedLessons, enrolledCourses } = useProgress();

    useEffect(() => {
        document.title = "My Account | SkillFrameX";
        getAllCourses()
            .then(setCourses)
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const myEnrolledCourses = courses.filter(course => enrolledCourses.includes(course.id));

    // Memoize Pie Chart data calculation to prevent incorrect values on re-render.
    // This MUST be called before any conditional returns to follow the Rules of Hooks.
    const { pieData, totalEnrolled } = useMemo(() => {
        const categoryCounts: Record<string, number> = {};
        myEnrolledCourses.forEach(c => {
            categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
        });

        const total = myEnrolledCourses.length;
        const pieColors = ["#0ea5e9", "#a855f7", "#ec4899", "#f59e0b", "#22c55e"];
        const categories = Object.keys(categoryCounts);
        let currentSum = 0;

        const data = categories.map((cat, index) => {
            const isLast = index === categories.length - 1;
            // Ensure the last slice fills the remainder to always sum to 100.
            const value = isLast && total > 0 ? 100 - currentSum : Math.round((categoryCounts[cat] / total) * 100);
            currentSum += value;
            return { name: cat, value, color: pieColors[index % pieColors.length] };
        });

        return { pieData: data, totalEnrolled: total };
    }, [myEnrolledCourses]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    const processedCourses = myEnrolledCourses.map((course) => {
        const totalLessons = course.coursesDtl?.length || 0;
        const completedCount = course.coursesDtl?.filter((l) => completedLessons.includes(l.id)).length || 0;
        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        return { ...course, progress, completedCount, totalLessons };
    });

    const inProgressCourses = processedCourses.filter(c => c.progress < 100);
    const completedCoursesList = processedCourses.filter(c => c.progress === 100);
    const totalCertificates = completedCoursesList.length;
    const totalLessonsDone = completedLessons.length;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 relative font-sans">

            {/* Premium Background Accent */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>
            <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen -translate-y-1/2 -translate-x-1/4 z-0"></div>
            <div className="absolute top-1/3 right-0 w-[40vw] h-[60vh] bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen translate-x-1/4 z-0"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-10 relative z-10">

                {/* --- Profile Header Card --- */}
                <ProfileHeader 
                  totalLessonsDone={totalLessonsDone} 
                  totalCertificates={totalCertificates} 
                />

                {/* --- Charts Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Chart */}
                    <ActivityChart totalCompleted={totalLessonsDone} />

                    {/* Pie Chart */}
                    <TopicPieChart pieData={pieData} totalEnrolled={totalEnrolled} />
                </div>

                {/* --- My Courses --- */}
                <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                        <button
                            onClick={() => setActiveTab("learning")}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md ${activeTab === "learning" ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(0,136,255,0.3)] scale-105" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white hover:bg-white/10"}`}
                        >
                            In Progress ({inProgressCourses.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("completed")}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-md ${activeTab === "completed" ? "bg-green-500 text-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-105" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white hover:bg-white/10"}`}
                        >
                            Completed ({completedCoursesList.length})
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {activeTab === "learning" ? (
                            inProgressCourses.length > 0 ? (
                                inProgressCourses.map(course => <CourseCard key={course.id} course={course} />)
                            ) : (
                                <div className="col-span-full">
                                    <EmptyState 
                                        iconType="learning"
                                        title="Ready to Start Your Journey?"
                                        description="You haven't enrolled in any courses yet. Browse our catalog of meticulously crafted masterclasses."
                                        actionText="Browse Courses"
                                        actionHref="/"
                                        variant="glass"
                                    />
                                </div>
                            )
                        ) : (
                            completedCoursesList.length > 0 ? (
                                completedCoursesList.map(course => <CourseCard key={course.id} course={course} />)
                            ) : (
                                <div className="col-span-full">
                                    <EmptyState 
                                        iconType="inbox"
                                        title="No Completed Courses... Yet"
                                        description="Your completed masterclasses and earned certificates will appear here. Keep pushing forward!"
                                        variant="bordered"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}