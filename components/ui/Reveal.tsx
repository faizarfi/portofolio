"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds */
  delay?: number;
  /** Animation direction: up (default), down, left, right, scale, fade */
  direction?: RevealDirection;
  /** Offset distance in pixels (default 24) */
  distance?: number;
  /** Duration in seconds (default 0.7) */
  duration?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.7,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInView(0.1);

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
        return "scale(0.94)";
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
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? getActiveTransform() : getInitialTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
