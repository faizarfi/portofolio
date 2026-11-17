"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  duration = 0.55,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInView(0.08);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      case "scale":
        return "scale(0.96)";
      case "fade":
      default:
        return "none";
    }
  };

  const getActiveTransform = () => {
    switch (direction) {
      case "scale":
        return "scale(1)";
      case "fade":
        return "none";
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      className={`min-w-0 max-w-full motion-reduce:transform-none! motion-reduce:opacity-100! motion-reduce:transition-none! ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? getActiveTransform() : getInitialTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
