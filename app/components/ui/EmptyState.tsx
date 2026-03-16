import React from "react";
import Link from "next/link";
import { SearchX, Inbox, BookOpen, AlertCircle } from "lucide-react";

type IconType = "search" | "inbox" | "learning" | "error";

interface EmptyStateProps {
  iconType?: IconType;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  actionOnClick?: () => void;
  variant?: "glass" | "bordered" | "clean";
}

export function EmptyState({ 
  iconType = "learning", 
  title, 
  description, 
  actionText, 
  actionHref, 
  actionOnClick,
  variant = "glass"
}: EmptyStateProps) {

  const getIcon = () => {
    switch (iconType) {
      case "search": return <SearchX className="w-16 h-16 opacity-50 text-slate-400 group-hover:text-primary transition-colors duration-500" />;
      case "inbox": return <Inbox className="w-16 h-16 opacity-50 text-slate-400 group-hover:text-primary transition-colors duration-500" />;
      case "error": return <AlertCircle className="w-16 h-16 opacity-50 text-red-400 group-hover:text-red-500 transition-colors duration-500" />;
      case "learning": 
      default: return <BookOpen className="w-16 h-16 opacity-50 text-slate-400 group-hover:text-primary transition-colors duration-500" />;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "glass": return "bg-card backdrop-blur-3xl border border-border shadow-2xl";
      case "bordered": return "bg-transparent border border-dashed border-border hover:border-primary/50 transition-colors duration-500";
      case "clean": return "bg-transparent";
      default: return "";
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-24 px-6 text-center rounded-[2.5rem] w-full max-w-2xl mx-auto group ${getVariantClasses()}`}>
      <div className="p-6 bg-white/5 rounded-full mb-8 relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative z-10">{getIcon()}</div>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 drop-shadow-sm">{title}</h3>
      <p className="text-slate-400 text-base md:text-lg mb-8 max-w-md leading-relaxed">{description}</p>
      
      {actionText && (actionHref || actionOnClick) && (
        actionHref ? (
          <Link 
            href={actionHref}
            className="glow-effect px-8 py-3 bg-white text-background rounded-full font-display font-bold hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
          >
            {actionText}
          </Link>
        ) : (
          <button 
            onClick={actionOnClick}
            className="glow-effect px-8 py-3 bg-white text-background rounded-full font-display font-bold hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
}
