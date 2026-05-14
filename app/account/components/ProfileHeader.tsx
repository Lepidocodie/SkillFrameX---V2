import React from "react";
import { BookOpen, CheckCircle, Target, Activity } from "lucide-react";
import { Avatar } from "@/app/components/ui/Avatar";
import { Badge } from "@/app/components/ui/Badge";

interface ProfileHeaderProps {
  totalLessonsDone: number;
  totalCertificates: number;
}

export function ProfileHeader({ totalLessonsDone, totalCertificates }: ProfileHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10 animate-fade-in-up">
        {/* Avatar */}
        <div className="relative">
          <Avatar name="Student User" size="xl" showProBadge={true} />
        </div>

        {/* Info */}
        <div className="text-center md:text-left flex-1 space-y-2">
          <h1 className="text-fluid-h2 font-display font-black text-foreground drop-shadow-md tracking-tight">Student User</h1>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <Badge variant="success" icon={<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse block"></span>}>
              Online
            </Badge>
            <Badge variant="outline" icon={<Activity size={12} className="text-primary" />}>
              Active Learner
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 md:flex md:gap-12 border-t border-border pt-6">
            <div className="text-center md:text-left group/stat">
              <p className="text-muted-foreground text-xs uppercase font-bold mb-1">Lessons</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary group-hover/stat:scale-110 transition-transform origin-left">
                <BookOpen size={18} /> <span className="font-bold text-foreground text-lg">{totalLessonsDone}</span>
              </div>
            </div>
            <div className="text-center md:text-left group/stat">
              <p className="text-muted-foreground text-xs uppercase font-bold mb-1">Certificates</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-green-500 group-hover/stat:scale-110 transition-transform origin-left">
                <CheckCircle size={18} /> <span className="font-bold text-foreground text-lg">{totalCertificates}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goal Widget */}
        <div className="hidden lg:block w-80 bg-background/50 backdrop-blur-xl rounded-2xl p-6 border border-border shadow-md relative overflow-hidden group/goal">

          
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <Target className="text-accent-pink" size={20} strokeWidth={2.5} />
            <span className="font-display font-bold text-foreground text-sm tracking-wide uppercase">Main Goal</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium italic leading-relaxed relative z-10">
            &quot;Become a Full Stack Developer by the end of 2024&quot;
          </p>
          <div className="mt-6 w-full bg-muted h-2.5 rounded-full overflow-hidden shadow-inner border border-border relative z-10">
            <div className="h-full bg-gradient-to-r from-accent-pink via-accent-purple to-primary w-[65%] rounded-full relative overflow-hidden shadow-[0_0_15px_rgba(0,136,255,0.3)]">
               <div className="absolute top-0 left-0 bottom-0 w-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
          </div>
          <div className="mt-2 text-right">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">65% Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
