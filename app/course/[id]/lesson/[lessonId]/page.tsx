"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PlayCircle, CheckCircle, ArrowLeft, Award, AlertCircle } from "lucide-react";
import { CourseService } from "@/app/service/CourseService";
import { useProgress } from "@/app/hook/useProgress";
import { LessonModel } from "@/types/LessonModel";
import { Course } from "@/types/schema";

const getYoutubeEmbedUrl = (url: string) => {
    try {
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    } catch {
        return url;
    }
};

export default function LessonPage() {
    const params = useParams();
    const courseId = Array.isArray(params.id) ? params.id[0] : params.id;
    const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { completedLessons, markAsCompleted, isCompleted } = useProgress();

    useEffect(() => {
        if (courseId) {
            CourseService.getCourseById(courseId)
                .then(setCourse)
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [courseId]);

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading lesson...</div>;
    if (!course || !courseId || !lessonId) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Lesson not found</div>;

    // Build LessonModels for the sidebar — completion state co-located with each lesson
    const lessonModels = LessonModel.fromList(course.coursesDtl ?? [], completedLessons);
    const currentModel = lessonModels.find((l) => l.id.toString() === lessonId);

    // Test video — same as before
    const videoUrl = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
    const videoType: string = "mp4";

    const handleVideoProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (video.duration && currentModel && !currentModel.isCompleted) {
            const watchedPercent = (video.currentTime / video.duration) * 100;
            if (watchedPercent >= 90) {
                markAsCompleted(currentModel.id);
            }
        }
    };

    // Sidebar progress: count how many of this course's lessons are completed
    const courseCompletedCount = lessonModels.filter((l) => l.isCompleted).length;
    const courseProgressPercent = lessonModels.length > 0
        ? Math.round((courseCompletedCount / lessonModels.length) * 100)
        : 0;

    return (
        <div className="min-h-screen font-sans flex flex-col pt-24">
            {/* Top Bar */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-6">
                    <Link
                        href={`/course/${courseId}`}
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back to Course
                    </Link>
                    <div className="h-6 w-px bg-border hidden sm:block"></div>
                    <h1 className="text-base sm:text-lg font-bold text-foreground truncate max-w-50 sm:max-w-md">
                        {course.name}
                    </h1>
                </div>

                {currentModel && (
                    <button
                        onClick={() => markAsCompleted(currentModel.id)}
                        className={`sm:hidden p-2 rounded-full transition-all ${
                            currentModel.isCompleted
                                ? "text-green-400 bg-green-500/10"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <CheckCircle size={24} />
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Left: Video Player */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {currentModel ? (
                        <div className="max-w-5xl mx-auto space-y-6">
                            {/* Video Player */}
                            <div className="aspect-video w-full bg-muted rounded-2xl overflow-hidden shadow-xl border border-border relative group">
                                {videoType === "youtube" ? (
                                    <iframe
                                        src={getYoutubeEmbedUrl(videoUrl)}
                                        title={currentModel.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : videoType === "mp4" ? (
                                    <video
                                        ref={videoRef}
                                        src={videoUrl}
                                        controls
                                        playsInline
                                        autoPlay={false}
                                        onTimeUpdate={handleVideoProgress}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            const codes: Record<number, string> = {
                                                1: "Aborted", 2: "Network Error", 3: "Decode Error", 4: "Source Not Supported"
                                            };
                                            const msg = target.error?.code ? codes[target.error.code] : "Unknown Error";
                                            alert(`Video error: ${msg}`);
                                        }}
                                        className="w-full h-full object-contain bg-black"
                                        poster={course.image}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="flex items-center justify-center h-full flex-col gap-3 text-muted-foreground">
                                        <AlertCircle size={48} />
                                        <p>No video source available</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-2xl font-bold text-foreground">{currentModel.title}</h2>

                                    <button
                                        onClick={() => markAsCompleted(currentModel.id)}
                                        className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all shadow-md transform active:scale-95 ${
                                            currentModel.isCompleted
                                                ? "bg-green-500 text-primary-foreground shadow-green-500/20"
                                                : "bg-muted hover:bg-muted/80 text-foreground"
                                        }`}
                                    >
                                        <CheckCircle size={20} />
                                        {currentModel.isCompleted ? "Completed" : "Mark as Complete"}
                                    </button>
                                </div>
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
                                    ℹ️ <strong>Debug Mode:</strong> Using test video (Sintel Trailer)<br />
                                    Play and scrub to the end to test the 90% completion system.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 text-muted-foreground">Select a lesson to start learning</div>
                    )}
                </div>

                {/* Right: Lesson Playlist Sidebar */}
                <div className="w-full lg:w-96 bg-background/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-border flex flex-col z-10">
                    <div className="p-5 border-b border-border bg-card">
                        <h3 className="font-bold text-foreground text-lg">Course Content</h3>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span>{lessonModels.length} Lessons</span>
                            <span>{courseProgressPercent}% Completed</span>
                        </div>

                        <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden shadow-inner">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out relative"
                                style={{
                                    width: `${courseProgressPercent}%`,
                                    background: "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7)"
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-card">
                        {lessonModels.map((lesson, index) => {
                            const isActive = lesson.id.toString() === lessonId;

                            return (
                                <Link
                                    key={lesson.id}
                                    href={`/course/${courseId}/lesson/${lesson.id}`}
                                    className={`flex items-start gap-4 p-4 border-b border-border hover:bg-muted transition-colors group ${isActive ? "bg-muted" : ""}`}
                                >
                                    <div className="mt-1">
                                        {lesson.isCompleted ? (
                                            <CheckCircle size={18} className="text-green-500" />
                                        ) : isActive ? (
                                            <div className="w-4 h-4 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                                <PlayCircle size={18} className="text-secondary relative" />
                                            </div>
                                        ) : (
                                            <span className="text-xs font-mono text-muted-foreground w-5 block text-center">{index + 1}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-medium line-clamp-2 ${isActive ? "text-secondary" : "text-foreground group-hover:text-primary"}`}>
                                            {lesson.title}
                                        </h4>
                                        <span className="text-[10px] text-muted-foreground">{lesson.duration}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-border bg-card shadow-md">
                        <Link
                            href={`/certificate/${courseId}`}
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-primary-foreground font-bold shadow-md shadow-yellow-500/20 transition-all transform hover:scale-[1.02] active:scale-95"
                        >
                            <Award size={20} />
                            Get Certificate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}