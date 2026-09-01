"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export default function AnimatedCounter({
  target,
  duration = 1600,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useInView(0.2);
  const textRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !textRef.current) return;
    hasAnimated.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (textRef.current) {
        textRef.current.textContent = `${prefix}${target}${suffix}`;
      }
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = Math.round(easedProgress * target);

      if (textRef.current) {
        textRef.current.textContent = `${prefix}${currentVal}${suffix}`;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, target, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      <span ref={textRef}>
        {prefix}0{suffix}
      </span>
    </span>
  );
}
