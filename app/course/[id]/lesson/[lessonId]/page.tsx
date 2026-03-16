"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PlayCircle, CheckCircle, ArrowLeft, Award, AlertCircle } from "lucide-react";
import { getCourseById } from "@/app/service/api";
import { useProgress } from "@/app/hook/useProgress";
import { Course } from "@/types/schema";

// ✅ Type Definitions (Comment ไว้ก่อนแก้ Unused Error)
/*
interface LessonWithVideo {
    id: string | number;
    title?: string;
    video?: string;
    videoUrl?: string;
}
*/

// Helper function (Comment ไว้ก่อนแก้ Unused Error)
/*
const getVideoType = (url: string) => {
    if (!url) return "none";
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
    return "mp4"; 
};
*/

// Helper function for YouTube (เก็บไว้เพราะต้องใช้ใน JSX แม้ branch นั้นจะไม่ทำงานตอนนี้)
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
    
    // ใช้ Ref เพื่อเข้าถึง Video Element โดยตรง
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const { completedLessons, markAsCompleted } = useProgress();

    useEffect(() => {
        if (courseId) {
            getCourseById(courseId)
                .then(setCourse)
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [courseId]);

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading lesson...</div>;
    if (!course || !courseId || !lessonId) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Lesson not found</div>;

    const currentLesson = course.coursesDtl?.find((l) => l.id.toString() === lessonId);
    const sortedLessons = course.coursesDtl || [];

    // =========================================================
    // 🟡 ส่วนที่ 1: โค้ดสำหรับดึงข้อมูลจริงจาก DB (Comment เก็บไว้)
    // =========================================================
    /*
    const lessonData = currentLesson as unknown as LessonWithVideo;
    const dbVideoUrl = lessonData?.video || lessonData?.videoUrl;
    
    // ใช้ค่าจาก DB ถ้าไม่มีให้เป็นค่าว่าง (หรือจะใส่ Default Video ตรงนี้ก็ได้)
    const videoUrl = dbVideoUrl || ""; 
    const videoType = getVideoType(videoUrl);
    */

    // =========================================================
    // 🟢 ส่วนที่ 2: โค้ดสำหรับทดสอบ (ใช้ Link W3C ที่เสถียรกว่า)
    // =========================================================
    // Link วิดีโอมาตรฐานจาก W3C (Sintel Trailer)
    const videoUrl = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
    
    // ✅ Fix TypeScript Error: กำหนด type เป็น string เพื่อให้ TS ยอมให้เทียบกับ "youtube" ได้
    const videoType: string = "mp4"; 
    // =========================================================


    // ✅ Handle Progress Logic
    const handleVideoProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            
            // Log ดู Progress (ถ้าต้องการ)
            // console.log("Progress:", progress.toFixed(2));

            if (progress >= 90 && currentLesson && !completedLessons.includes(currentLesson.id)) {
                console.log("✅ 90% Reached! Marking as complete.");
                markAsCompleted(currentLesson.id);
            }
        }
    };

    return (
        <div className="min-h-screen font-sans flex flex-col pt-24">
            {/* --- Top Bar --- */}
            <div className="bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-6">
                    <Link
                        href={`/course/${courseId}`}
                        className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back to Course
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                    <h1 className="text-base sm:text-lg font-bold text-white truncate max-w-50 sm:max-w-md">
                        {course.name}
                    </h1>
                </div>

                {currentLesson && (
                    <button
                        onClick={() => markAsCompleted(currentLesson.id)}
                        className={`sm:hidden p-2 rounded-full transition-all ${completedLessons.includes(currentLesson.id)
                                ? "text-green-400 bg-green-500/10"
                                : "text-slate-400 hover:text-white"
                            }`}
                    >
                        <CheckCircle size={24} />
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* --- Left: Video Player Area --- */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
                    {currentLesson ? (
                        <div className="max-w-5xl mx-auto space-y-6">

                            {/* --- Video Player --- */}
                            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                                {videoType === "youtube" ? (
                                    <iframe
                                        src={getYoutubeEmbedUrl(videoUrl)}
                                        title={currentLesson.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : videoType === "mp4" ? (
                                    // ✅ HTML5 Video Player พร้อม Error Handling
                                    <video
                                        ref={videoRef}
                                        src={videoUrl}
                                        controls
                                        playsInline // ✅ สำคัญสำหรับ Mobile/iOS
                                        autoPlay={false}
                                        onTimeUpdate={handleVideoProgress} 
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            console.error("Video Error Detail:", target.error);
                                            
                                            let errorMessage = "Unknown Error";
                                            // แปลง Error Code เป็นข้อความที่เข้าใจง่าย
                                            switch (target.error?.code) {
                                                case 1: errorMessage = "Aborted (ยกเลิกการโหลด)"; break;
                                                case 2: errorMessage = "Network Error (ปัญหาอินเทอร์เน็ต)"; break;
                                                case 3: errorMessage = "Decode Error (ไฟล์เสีย/ถอดรหัสไม่ได้)"; break;
                                                case 4: errorMessage = "Source Not Supported (ไฟล์ไม่รองรับ/URL ผิด)"; break;
                                            }
                                            alert(`โหลดวิดีโอไม่ได้: ${errorMessage}`);
                                        }}
                                        className="w-full h-full object-contain bg-black"
                                        poster={course.image}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="flex items-center justify-center h-full flex-col gap-3 text-slate-500">
                                        <AlertCircle size={48} />
                                        <p>No video source available</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-2xl font-bold text-white">{currentLesson.title}</h2>

                                    <button
                                        onClick={() => markAsCompleted(currentLesson.id)}
                                        className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all shadow-lg transform active:scale-95 ${completedLessons.includes(currentLesson.id)
                                                ? "bg-green-500 text-white shadow-green-500/20"
                                                : "bg-white/10 hover:bg-white/20 text-white"
                                            }`}
                                    >
                                        <CheckCircle size={20} />
                                        {completedLessons.includes(currentLesson.id) ? "Completed" : "Mark as Complete"}
                                    </button>
                                </div>
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
                                    ℹ️ <strong>Debug Mode:</strong> กำลังใช้วิดีโอทดสอบ (Sintel Trailer) <br/>
                                    ลองกดเล่นแล้วเลื่อนไปที่นาทีสุดท้ายเพื่อทดสอบระบบ 90%
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500">Select a lesson to start learning</div>
                    )}
                </div>

                {/* --- Right: Lesson List (Playlist) --- */}
                <div className="w-full lg:w-96 bg-background/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col h-100 lg:h-auto z-10">
                    <div className="p-5 border-b border-white/10 bg-white/5">
                        <h3 className="font-bold text-white text-lg">Course Content</h3>
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                            <span>{sortedLessons.length} Lessons</span>
                            <span>{Math.round((completedLessons.filter(id => sortedLessons.some(l => l.id === id)).length / sortedLessons.length) * 100)}% Completed</span>
                        </div>
                        
                        <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden shadow-inner">
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out relative"
                                style={{ 
                                    width: `${Math.round((completedLessons.filter(id => sortedLessons.some(l => l.id === id)).length / sortedLessons.length) * 100)}%`,
                                    background: "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7)" 
                                }}
                            >
                                <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white/5">
                        {sortedLessons.map((lesson, index) => {
                            const isActive = lesson.id.toString() === lessonId;
                            const isCompleted = completedLessons.includes(lesson.id);

                            return (
                                <Link
                                    key={lesson.id}
                                    href={`/course/${courseId}/lesson/${lesson.id}`}
                                    className={`flex items-start gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors group ${isActive ? "bg-white/10" : ""
                                        }`}
                                >
                                    <div className="mt-1">
                                        {isCompleted ? (
                                            <CheckCircle size={18} className="text-green-500" />
                                        ) : isActive ? (
                                            <div className="w-4 h-4 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                                <PlayCircle size={18} className="text-secondary relative" />
                                            </div>
                                        ) : (
                                            <span className="text-xs font-mono text-slate-500 w-5 block text-center">{index + 1}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-medium line-clamp-2 ${isActive ? "text-secondary" : "text-slate-300 group-hover:text-white"}`}>
                                            {lesson.title}
                                        </h4>
                                        <span className="text-[10px] text-slate-500">10 min</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-white/10 bg-white/5 shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
                        <Link
                            href={`/certificate/${courseId}`}
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-[1.02] active:scale-95"
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