import React from "react";
import Image from "next/image";
import { Course } from "@/types/schema";

interface SliderBackgroundProps {
  course: Course;
  isActive: boolean;
  isPriority: boolean;
}

export default function SliderBackground({ course, isActive, isPriority }: SliderBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-background">
        <Image
          src={course.image}
          alt={course.name}
          fill
          className={`object-cover opacity-20 grayscale transition-transform duration-[12000ms] ease-out will-change-transform ${
            isActive ? "scale-105" : "scale-100"
          }`}
          priority={isPriority}
        />
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 md:via-background/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />


    </>
  );
}
