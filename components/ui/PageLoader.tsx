"use client";

import { useEffect, useState } from "react";

const BOOT_LOGS = [
  { threshold: 0, text: "INITIALIZING ENVIRONMENT..." },
  { threshold: 28, text: "LOADING PROJECTS & CASE STUDIES..." },
  { threshold: 65, text: "MOUNTING CORE ARCHITECTURE..." },
  { threshold: 92, text: "SYSTEM READY" },
];

export default function PageLoader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Smooth non-linear progress counter
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear increment for realistic loading feel
      let increment = 1;
      if (current < 30) {
        increment = Math.floor(Math.random() * 5) + 3;
      } else if (current < 75) {
        increment = Math.floor(Math.random() * 4) + 2;
      } else if (current < 90) {
        increment = Math.floor(Math.random() * 3) + 1;
      } else {
        increment = Math.floor(Math.random() * 4) + 2;
      }

      current += increment;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);

        // Start closing animation after brief 100% satisfaction
        setTimeout(() => setClosing(true), 250);
        setTimeout(() => setVisible(false), 750);
      } else {
        setPercent(current);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  // Determine current active boot status text
  const currentLog =
    BOOT_LOGS.slice()
      .reverse()
      .find((l) => percent >= l.threshold)?.text || BOOT_LOGS[0].text;

  return (
    <aside
      aria-label="Loading page"
      aria-busy="true"
      className="fixed inset-0 z-9999 flex flex-col justify-between bg-[#090d16] p-6 text-white transition-all duration-500 sm:p-10"
      style={{
        opacity: closing ? 0 : 1,
        transform: closing ? "translateY(-16px) scale(0.99)" : "translateY(0) scale(1)",
        pointerEvents: closing ? "none" : "all",
      }}
    >
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-200 uppercase tracking-wider">
            FAIZ ARFIAN // PORTFOLIO
          </span>
        </div>
        <div className="hidden sm:block font-medium text-slate-500">
          SURAKARTA, ID &bull; FULL STACK &amp; IT SUPPORT
        </div>
      </div>

      {/* ── Center Stage: Monogram, Counter & Progress ── */}
      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        {/* Architectural Monogram Box with Corner Accents */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-md">
          {/* Corner tick marks */}
          <span className="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-slate-300" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-slate-300" />
          <span className="absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-slate-300" />
          <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-slate-300" />

          <span className="font-mono text-3xl font-black tracking-tight text-white">
            FA
          </span>
        </div>

        {/* Large Bold Percentage Counter */}
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            {percent.toString().padStart(2, "0")}
          </span>
          <span className="text-xl font-bold text-slate-400 sm:text-2xl">%</span>
        </div>

        {/* High Precision Progress Bar */}
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800 border border-slate-700/60 p-[1px]">
          <div
            className="h-full rounded-full bg-white transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Dynamic Terminal Boot Log */}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="text-emerald-400">&gt;</span>
          <span className="tracking-wide text-slate-300">{currentLog}</span>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
        <div>STACK: LARAVEL &bull; REACT &bull; MYSQL</div>
        <div>v2026.04</div>
      </div>
    </aside>
  );
}

