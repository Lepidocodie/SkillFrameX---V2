"use client";

import React, { useState, useEffect } from "react";
import { Activity, Flame } from "lucide-react";

interface ActivityChartProps {
  totalCompleted: number;
}

// ข้อมูลจำลองสำหรับกราฟรายสัปดาห์ (สามารถนำไปผูกกับ API จริงในอนาคตได้)
const weeklyData = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 5 },
  { day: "Wed", value: 3 },
  { day: "Thu", value: 8 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 1 },
  { day: "Sun", value: 6 },
];

export function ActivityChart({ totalCompleted }: ActivityChartProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // สร้าง Animation ตอนโหลดหน้าเว็บเสร็จ
  useEffect(() => {
    setMounted(true);
  }, []);

  // หาค่าสูงสุดเพื่อนำไปคำนวณอัตราส่วนความสูงของกราฟแท่ง
  const maxValue = Math.max(...weeklyData.map((d) => d.value), 10); 

  return (
    <div className="glass-panel border-white/10 bg-gradient-to-br from-card/80 to-card/40 rounded-3xl p-8 flex flex-col h-full relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,136,255,0.15)] transition-all duration-500 lg:col-span-2">
      
      {/* Enhanced Background Noise & Lighting */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-0 bg-[url('/noise.png')]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000 ease-out"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 relative z-10 gap-4">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2.5">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-primary shadow-inner">
            <Activity size={20} />
          </div>
          Learning Activity
        </h3>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20 shadow-inner">
            <Flame size={14} /> 3 Day Streak
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 shadow-inner">
            This Week
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 relative z-10">
        
        {/* --- Left Stats Area --- */}
        <div className="col-span-1 flex flex-col justify-center gap-8 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
           <div className="space-y-1.5 animate-in fade-in slide-in-from-left-4 duration-500">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
               Completed
             </span>
             <div className="flex items-baseline gap-2">
               <span className="text-5xl font-display font-black text-white drop-shadow-md tracking-tight">{totalCompleted}</span>
               <span className="text-sm text-slate-500 font-medium">Lessons</span>
             </div>
           </div>

           <div className="space-y-1.5 animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(0,136,255,0.8)]"></div>
               Time Spent
             </span>
             <div className="flex items-baseline gap-2">
               <span className="text-3xl font-display font-black text-white drop-shadow-md tracking-tight">12.5</span>
               <span className="text-sm text-slate-500 font-medium">Hours</span>
             </div>
           </div>
        </div>

        {/* --- Right Bar Chart Area --- */}
        <div className="col-span-1 md:col-span-2 flex items-end justify-between h-52 md:h-full gap-2 pt-8 relative">
          
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-6 z-0">
             <div className="border-t border-white/10 w-full border-dashed"></div>
             <div className="border-t border-white/10 w-full border-dashed"></div>
             <div className="border-t border-white/10 w-full border-dashed"></div>
          </div>

          {/* Render Bars */}
          {weeklyData.map((d, i) => {
            const heightPercentage = mounted ? Math.max((d.value / maxValue) * 100, 5) : 0;
            const isHovered = hoveredDay === d.day;
            const isOthersHovered = hoveredDay !== null && !isHovered;

            return (
              <div 
                key={i} 
                className="flex flex-col items-center gap-3 w-full h-full justify-end group/bar relative z-10 pb-1"
                onMouseEnter={() => setHoveredDay(d.day)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {/* Tooltip Popup */}
                <div className={`absolute -top-8 bg-card/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold py-1 px-2.5 rounded-lg shadow-xl transition-all duration-300 transform ${
                    isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                  }`}
                >
                  {d.value}
                </div>

                {/* Animated Bar */}
                <div 
                  className="w-full max-w-[2.5rem] rounded-t-xl rounded-b-sm cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative overflow-hidden flex-shrink-0 border border-white/5 border-b-0"
                  style={{ 
                    height: `${heightPercentage}%`,
                    opacity: isOthersHovered ? 0.3 : 1,
                    filter: isHovered ? 'brightness(1.3) drop-shadow(0 0 12px rgba(0,136,255,0.5))' : 'none',
                    transform: isHovered ? 'scaleY(1.02) translateY(-2px)' : 'scaleY(1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/60 to-primary"></div>
                  {/* Glossy top highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/30 rounded-t-xl"></div>
                </div>
                
                {/* Day Label */}
                <span className={`text-[10px] sm:text-xs font-bold transition-colors duration-300 ${
                  isHovered ? 'text-white drop-shadow-md' : 'text-slate-400'
                }`}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
