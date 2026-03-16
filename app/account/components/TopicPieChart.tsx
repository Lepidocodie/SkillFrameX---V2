"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PieChart, TrendingUp } from "lucide-react";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface TopicPieChartProps {
  pieData: PieChartData[];
  totalEnrolled: number;
}

export function TopicPieChart({ pieData, totalEnrolled }: TopicPieChartProps) {
  const [hoveredSlice, setHoveredSlice] = useState<PieChartData | null>(null);
  const [mounted, setMounted] = useState(false);

  // สร้าง Animation ตอนโหลดหน้าเว็บเสร็จ
  useEffect(() => {
    setMounted(true);
  }, []);

  // SVG parameters for a donut chart
  const radius = 15.91549430918954;
  const circumference = 100;

  // Calculate offsets in a memoized way to avoid re-computation and fix immutability lint error.
  const slices = useMemo(() => {
    let cumulativeValue = 0;
    return pieData.map(d => {
      const offset = 100 - cumulativeValue;
      cumulativeValue += d.value;
      return { ...d, dashoffset: offset };
    });
  }, [pieData]);

  return (
    <div className="glass-panel border-white/10 bg-gradient-to-br from-card/80 to-card/40 rounded-3xl p-8 flex flex-col h-full relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] transition-all duration-500">
      {/* Enhanced Background Noise & Lighting */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-0 bg-[url('/noise.png')]"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-purple/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000 ease-out"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2.5">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-accent-purple shadow-inner">
            <PieChart size={20} />
          </div>
          Focus Areas
        </h3>
        {totalEnrolled > 0 && (
           <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
             <TrendingUp size={14} /> Active
           </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        {/* SVG Pie Chart Container */}
        <div className="relative w-56 h-56 mb-10 flex items-center justify-center">
          
          <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90 overflow-visible">
            {/* Background/Base Circle */}
            <circle
              r={radius}
              cx="16"
              cy="16"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="3"
              className="text-white/5"
            />
            
            {/* Slices */}
            {slices.map((d, i) => {
              const isHovered = hoveredSlice?.name === d.name;
              const isOthersHovered = hoveredSlice !== null && !isHovered;
              
              // เว้นระยะห่างของขอบ (Gap) เล็กน้อยเพื่อให้กราฟดูสวยงาม ยกเว้นกรณีที่เป็น 100%
              const gap = d.value === 100 ? 0 : 1.5;
              const visibleValue = Math.max(0, d.value - gap);
              
              // เพื่อให้ dashoffset ทำงานได้ถูกต้อง ผลรวมของ dash และ gap ต้องเท่ากับ circumference (100) พอดีเสมอ
              const dashLength = mounted ? visibleValue : 0;
              const gapLength = circumference - dashLength;
              
              return (
                <circle
                  key={i}
                  r={radius}
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke={d.color}
                  strokeWidth={isHovered ? "4" : "3"}
                  strokeDasharray={`${dashLength} ${gapLength}`}
                  strokeDashoffset={d.dashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer focus:outline-none"
                  onMouseEnter={() => setHoveredSlice(d)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  style={{
                    opacity: isOthersHovered ? 0.3 : 1,
                    filter: isHovered ? `drop-shadow(0px 0px 8px ${d.color}80)` : 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))',
                  }}
                />
              );
            })}
          </svg>

          {/* Center Info Hole (Dynamic on hover) */}
          <div className="absolute inset-0 m-7 rounded-full bg-card/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center flex-col pointer-events-none transition-all duration-300">
             {hoveredSlice ? (
               <div className="text-center animate-in zoom-in-95 duration-200">
                 <div className="text-3xl font-display font-black tracking-tight drop-shadow-md" style={{ color: hoveredSlice.color }}>
                   {hoveredSlice.value}%
                 </div>
                 <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest max-w-[85px] truncate px-2 mt-0.5 opacity-80">
                   {hoveredSlice.name}
                 </div>
               </div>
             ) : (
               <div className="text-center animate-in fade-in duration-300 flex flex-col items-center">
                 <span className="text-3xl font-display font-black text-white drop-shadow-lg leading-none">{totalEnrolled}</span>
                 <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Courses</span>
               </div>
             )}
          </div>
        </div>

        {/* Redesigned Legend */}
        <div className="w-full grid grid-cols-2 gap-3">
          {pieData.map((d, i) => {
            const isHovered = hoveredSlice?.name === d.name;
            const isOthersHovered = hoveredSlice !== null && !isHovered;
            
            return (
              <div 
                key={i} 
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isHovered 
                    ? 'border-white/20 bg-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.2)] scale-[1.02]' 
                    : 'border-transparent bg-white/5 hover:bg-white/10'
                }`}
                style={{ opacity: isOthersHovered ? 0.5 : 1 }}
                onMouseEnter={() => setHoveredSlice(d)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div 
                  className="w-3.5 h-3.5 rounded-full shadow-[inset_0px_2px_4px_rgba(255,255,255,0.4)]" 
                  style={{ 
                    background: `linear-gradient(135deg, ${d.color}, ${d.color}aa)`,
                    boxShadow: isHovered ? `0 0 10px ${d.color}80, inset 0px 2px 4px rgba(255,255,255,0.4)` : ''
                  }}
                ></div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[11px] font-bold text-slate-200 truncate leading-tight">{d.name}</span>
                  <span className="text-[10px] font-medium text-slate-500 leading-tight">{d.value}%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
