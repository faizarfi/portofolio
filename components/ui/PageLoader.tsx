"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STATUS_STEPS = [
  { threshold: 0, text: "Memuat profil & keahlian..." },
  { threshold: 30, text: "Menyiapkan katalog proyek..." },
  { threshold: 65, text: "Menghubungkan data arsitektur..." },
  { threshold: 90, text: "Portofolio siap ditampilkan..." },
];

export default function PageLoader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      let increment = 1;
      if (current < 35) {
        increment = Math.floor(Math.random() * 5) + 3;
      } else if (current < 75) {
        increment = Math.floor(Math.random() * 4) + 2;
      } else if (current < 90) {
        increment = Math.floor(Math.random() * 3) + 1;
      } else {
        increment = Math.floor(Math.random() * 5) + 2;
      }

      current += increment;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);

        // Smooth closing sequence after hitting 100%
        setTimeout(() => setClosing(true), 250);
        setTimeout(() => setVisible(false), 700);
      } else {
        setPercent(current);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const currentStatus =
    STATUS_STEPS.slice()
      .reverse()
      .find((s) => percent >= s.threshold)?.text || STATUS_STEPS[0].text;

  return (
    <div
      id="site-preloader"
      aria-label="Memuat portofolio"
      aria-busy="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/45 backdrop-blur-xl transition-all duration-500 ease-out font-sans p-4"
      style={{
        opacity: closing ? 0 : 1,
        transform: closing ? "scale(1.03)" : "scale(1)",
        pointerEvents: closing ? "none" : "all",
      }}
    >
      {/* ── Ambient Lighting Orbs ── */}
      <div className="absolute w-80 h-80 rounded-full bg-slate-400/10 blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute w-72 h-72 rounded-full bg-slate-300/15 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute w-64 h-64 rounded-full bg-slate-500/10 blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      {/* ── Center Card Modal ── */}
      <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 border border-white/90 shadow-2xl shadow-slate-950/25 max-w-xs sm:max-w-sm w-[92%] text-center flex flex-col items-center transform transition-all duration-300">
        
        {/* ── Logo with Double Orbit Spinning Rings ── */}
        <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
          {/* Outer Spinning Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-slate-900 border-r-slate-700 animate-spin"
            style={{ animationDuration: "1.2s" }}
          />

          {/* Inner Reverse Spinning Accent Ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-slate-400 border-l-slate-300 animate-spin"
            style={{ animationDuration: "1.8s", animationDirection: "reverse" }}
          />

          {/* Subtle Pulse Glow */}
          <div className="absolute inset-3 rounded-full bg-slate-100 animate-ping opacity-30" />

          {/* Center Portrait Badge */}
          <div className="relative w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border border-slate-200 overflow-hidden">
            <Image
              src="/foto.jpeg"
              alt="Faiz Arfian Ilhami"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>

        {/* ── Title & Role ── */}
        <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight leading-tight">
          Faiz Arfian Ilhami
        </h3>
        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-600 tracking-widest uppercase mt-1 mb-4">
          Full Stack Web Developer &bull; IT Support
        </span>

        {/* ── Linear Progress Bar ── */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative shadow-inner mb-2 border border-slate-200/80 p-[1px]">
          <div
            className="h-full bg-slate-900 rounded-full transition-all duration-75 ease-out shadow-xs"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* ── Percentage & Status Caption ── */}
        <div className="w-full flex items-center justify-between font-mono text-[11px] text-slate-500 mb-1">
          <div className="flex items-center gap-1.5 text-left truncate max-w-[200px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate text-slate-600">{currentStatus}</span>
          </div>
          <span className="font-bold text-slate-900 shrink-0">{percent}%</span>
        </div>
      </div>
    </div>
  );
}


