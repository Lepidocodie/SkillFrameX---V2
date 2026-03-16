import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "destructive" | "outline" | "ghost";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({ variant = "default", children, icon, className = "", ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300";
  
  const variants = {
    default: "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
    success: "bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20",
    destructive: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    outline: "bg-transparent text-foreground border border-border hover:bg-card",
    ghost: "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
  };

  return (
    <span 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
