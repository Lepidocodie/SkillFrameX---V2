"use client";

import React, { useEffect, useState, useMemo } from "react";
import { CourseService } from "@/app/service/CourseService";
import { CourseModel } from "@/types/CourseModel";
import { Course } from "@/types/schema";
import { useProgress } from "@/app/hook/useProgress";
import { useEnrollment } from "@/app/hook/useEnrollment";
import CourseCard from "@/app/components/CourseCard";
import { EmptyState } from "@/app/components/ui/EmptyState";
import { ProfileHeader } from "./components/ProfileHeader";
import { ActivityChart } from "./components/ActivityChart";
import { TopicPieChart } from "./components/TopicPieChart";

const PIE_COLORS = ["#0ea5e9", "#a855f7", "#ec4899", "#f59e0b", "#22c55e"];

export default function AccountPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"learning" | "completed">("learning");

    const { completedLessons } = useProgress();
    const { enrolledCourses } = useEnrollment();

    useEffect(() => {
        document.title = "My Account | SkillFrameX";
        CourseService.getAllCourses()
            .then(setCourses)
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    // Build models only for enrolled courses — all progress math lives in CourseModel
    const enrolledModels = useMemo(
        () =>
            courses
                .filter((c) => enrolledCourses.includes(c.id))
                .map((c) => new CourseModel(c, completedLessons, enrolledCourses)),
        [courses, completedLessons, enrolledCourses]
    );

    const inProgressModels = enrolledModels.filter((m) => m.isInProgress);
    const completedModels = enrolledModels.filter((m) => m.isCompleted);
    const totalLessonsDone = completedLessons.length;
    const totalCertificates = completedModels.length;

    // Pie chart data — specific to this page's visualisation, not domain logic
    const { pieData, totalEnrolled } = useMemo(() => {
        const categoryCounts: Record<string, number> = {};
        enrolledModels.forEach((m) => {
            categoryCounts[m.category] = (categoryCounts[m.category] || 0) + 1;
        });

        const total = enrolledModels.length;
        const keys = Object.keys(categoryCounts);
        let currentSum = 0;

        const data = keys.map((cat, index) => {
            const isLast = index === keys.length - 1;
            const value = isLast && total > 0 ? 100 - currentSum : Math.round((categoryCounts[cat] / total) * 100);
            currentSum += value;
            return { name: cat, value, color: PIE_COLORS[index % PIE_COLORS.length] };
        });

        return { pieData: data, totalEnrolled: total };
    }, [enrolledModels]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 relative font-sans">
            {/* Background accents */}


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-10 relative z-10">

                <ProfileHeader totalLessonsDone={totalLessonsDone} totalCertificates={totalCertificates} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ActivityChart totalCompleted={totalLessonsDone} />
                    <TopicPieChart pieData={pieData} totalEnrolled={totalEnrolled} />
                </div>

                {/* My Courses */}
                <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        <button
                            onClick={() => setActiveTab("learning")}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeTab === "learning" ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/30" : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-muted"}`}
                        >
                            In Progress ({inProgressModels.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("completed")}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeTab === "completed" ? "bg-green-500 text-white border-green-500 ring-2 ring-green-500/30" : "bg-muted/50 border-border text-muted-foreground hover:border-green-500/30 hover:text-foreground hover:bg-muted"}`}
                        >
                            Completed ({completedModels.length})
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {activeTab === "learning" ? (
                            inProgressModels.length > 0 ? (
                                inProgressModels.map((m) => <CourseCard key={m.id} course={m.toCardProps()} />)
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
                            completedModels.length > 0 ? (
                                completedModels.map((m) => <CourseCard key={m.id} course={m.toCardProps()} />)
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