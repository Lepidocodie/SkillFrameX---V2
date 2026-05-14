import React from "react";
import { User } from "lucide-react";

interface AvatarProps {
  image?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  showProBadge?: boolean;
}

export function Avatar({ image, name, size = "md", showProBadge = false }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-28 h-28"
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
    xl: 48
  };

  const badgeSize = {
    sm: "w-2 h-2",
    md: "text-[8px] px-1 py-[1px]",
    lg: "text-[10px] px-1.5 py-0.5",
    xl: "text-xs px-2 py-0.5"
  };



  return (
    <div className="relative inline-block">
      <div 
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-primary/30 to-primary/10 p-[1px] cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300 group border border-border`}
      >
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden relative">
          {image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={image} alt={name || "User Avatar"} className="w-full h-full object-cover" />
          ) : (
            <User size={iconSizes[size]} className="text-muted-foreground relative z-10" strokeWidth={1.5} />
          )}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
        </div>
      </div>
      
      {showProBadge && (
        <div className={`absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 md:p-1 border border-border shadow-md z-30`}>
          {size === 'sm' ? (
             <div className={`${badgeSize[size]} bg-yellow-500 rounded-full`}></div>
          ) : (
            <div className={`bg-yellow-500 text-white font-black rounded-full leading-none tracking-tighter ${badgeSize[size]}`}>
              PRO
            </div>
          )}
        </div>
      )}
    </div>
  );
}
