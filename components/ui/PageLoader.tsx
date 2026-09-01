"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1100);
    const removeTimer = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-white/95 backdrop-blur-xl"
      style={{
        transition: "opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Background Soft Blue Ambient Aura */}
      <div className="animate-pulse-glow pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-[90px]" />

      {/* Top Blue Laser Progress Bar */}
      <div className="absolute top-0 left-0 h-1 w-full overflow-hidden bg-blue-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"
          style={{ animation: "loader-top-bar 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards" }}
        />
      </div>

      {/* Minimalist Blue & White Branding Box */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Animated Blue Monogram Logo */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/25">
          {/* Pulsing ring */}
          <div className="absolute -inset-2 rounded-3xl border border-blue-400/40 animate-ping opacity-25" />
          <span className="font-display text-2xl font-black text-white tracking-tighter">
            FA
          </span>
        </div>

        {/* Name & Title */}
        <div className="text-center">
          <h2 className="font-display text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            Faiz <span className="text-blue-600">Arfian</span> Ilhami
          </h2>
          <p className="mt-0.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Full Stack Web Developer
          </p>
        </div>

        {/* Smooth Blue Progress Line */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>

      <style>{`
        @keyframes loader-top-bar {
          0%   { width: 0%; }
          60%  { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
