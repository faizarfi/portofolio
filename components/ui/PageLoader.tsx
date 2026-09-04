"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faCircleCheck,
  faMicrochip,
  faShieldHalved,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";

interface DiagnosticStep {
  threshold: number;
  tag: string;
  message: string;
  code: string;
}

const DIAGNOSTIC_STEPS: DiagnosticStep[] = [
  { threshold: 0, tag: "BOOT", message: "Inisialisasi Faiz Arfian Portfolio Kernel...", code: "SYS_INIT_OK" },
  { threshold: 20, tag: "CORE", message: "Memuat modul Next.js 16 & React 19...", code: "MOD_LOADED" },
  { threshold: 45, tag: "DATA", message: "Menghubungkan arsitektur sistem & skema ERD...", code: "DB_SYNC_200" },
  { threshold: 68, tag: "UI", message: "Menyiapkan tata letak & antarmuka responsif...", code: "UI_HYDRATED" },
  { threshold: 88, tag: "SEC", message: "Memverifikasi Cloudflare Turnstile & API gateway...", code: "SEC_SHIELD_OK" },
  { threshold: 97, tag: "READY", message: "Sistem siap. Selamat datang di portofolio!", code: "ACCESS_GRANTED" },
];

export default function PageLoader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [activeStep, setActiveStep] = useState<DiagnosticStep>(DIAGNOSTIC_STEPS[0]);

  const finishAndClose = useCallback(() => {
    setPercent(100);
    setActiveStep(DIAGNOSTIC_STEPS[DIAGNOSTIC_STEPS.length - 1]);
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
    }, 450);
  }, []);

  useEffect(() => {
    // Press ESC to quickly skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    let current = 0;
    const interval = setInterval(() => {
      let increment = 1;
      if (current < 25) {
        increment = Math.floor(Math.random() * 4) + 3;
      } else if (current < 65) {
        increment = Math.floor(Math.random() * 5) + 3;
      } else if (current < 88) {
        increment = Math.floor(Math.random() * 3) + 2;
      } else {
        increment = Math.floor(Math.random() * 4) + 2;
      }

      current += increment;

      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);
        setTimeout(() => setClosing(true), 200);
        setTimeout(() => setVisible(false), 650);
      } else {
        setPercent(current);
        const match = DIAGNOSTIC_STEPS.slice()
          .reverse()
          .find((s) => current >= s.threshold);
        if (match) setActiveStep(match);
      }
    }, 24);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishAndClose]);

  if (!visible) return null;

  const formattedPercent = String(percent).padStart(3, "0");

  return (
    <div
      id="site-preloader"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Memuat portofolio Faiz Arfian Ilhami"
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-500 ease-out p-4"
      style={{
        opacity: closing ? 0 : 1,
        transform: closing ? "scale(1.04) filter(blur(4px))" : "scale(1)",
        pointerEvents: closing ? "none" : "auto",
      }}
    >
      {/* ── Bright, Pristine Canvas (Cerah & Bersih) ── */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl transition-colors" />

      {/* Decorative Architectural Light Grid */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Luminous Ambient Glow Orbs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-[130px] pointer-events-none animate-pulse" />
      <div
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-400/25 blur-[130px] pointer-events-none animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-indigo-300/15 blur-[120px] pointer-events-none"
      />

      {/* ── Center Modern Glass Card HUD (Pristine White) ── */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 text-slate-900 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl">
        
        {/* Top HUD Status Bar */}
        <div className="mb-6 flex w-full items-center justify-between border-b border-slate-100 pb-3.5 font-mono text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wider text-slate-900">FAIZ_OS // KERNEL v2.6</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
              60 FPS
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">UMS &bull; ID</span>
          </div>
        </div>

        {/* ── Central Holographic Gyroscope Orbit ── */}
        <div className="relative mb-5 flex h-28 w-28 items-center justify-center">
          {/* Outer Rotating Gear Ring */}
          <svg
            className="absolute inset-0 h-full w-full animate-spin text-slate-300"
            style={{ animationDuration: "8s" }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Middle Fast Laser Ring with Progress Track */}
          <svg
            className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="3"
            />
            {/* Dynamic progress circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#brightLoaderGradient)"
              strokeWidth="3.5"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * percent) / 100}
              strokeLinecap="round"
              className="transition-all duration-100 ease-out"
            />
            <defs>
              <linearGradient id="brightLoaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Counter-Rotating Reticle Ring */}
          <div
            className="absolute inset-4 rounded-full border border-slate-200 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          />

          {/* Center Avatar with Scanline Laser Effect */}
          <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-white bg-slate-100 shadow-md">
            <Image
              src="/foto.jpeg"
              alt="Faiz Arfian Ilhami"
              fill
              className="object-cover"
              priority
            />

            {/* Glowing Holographic Vertical Scanline */}
            <div
              className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-85"
              style={{
                animation: "brightScanline 1.6s ease-in-out infinite alternate",
              }}
            />
          </div>

          {/* Four Corner Crosshair Brackets */}
          <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-slate-800" />
          <div className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-slate-800" />
          <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-slate-800" />
          <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-slate-800" />
        </div>

        {/* ── Name & Role ── */}
        <h2 className="font-display text-lg sm:text-xl font-black tracking-tight text-slate-950">
          Faiz Arfian Ilhami
        </h2>
        <div className="mt-1 mb-4 flex items-center gap-1.5 font-mono text-xs text-slate-600">
          <FontAwesomeIcon icon={faMicrochip} className="h-3 w-3 text-emerald-600" />
          <span>Full Stack Web Developer &bull; IT Support</span>
        </div>

        {/* ── Dual-Layer Laser Progress Bar (Cerah & Kontras) ── */}
        <div className="relative mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-[1px] border border-slate-200/90 shadow-inner">
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-slate-900 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(14,165,233,0.4)]"
            style={{ width: `${percent}%` }}
          >
            {/* Shimmer Light Moving Across Bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Progress Value & Percentage Counter */}
        <div className="mb-4 flex w-full items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <FontAwesomeIcon icon={faShieldHalved} className="h-3 w-3 text-slate-400" />
            <span>Memeriksa Integritas Sistem</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl font-black tracking-wider text-slate-950">
              {formattedPercent}
            </span>
            <span className="text-[11px] font-bold text-emerald-600">%</span>
          </div>
        </div>

        {/* ── Live Terminal Diagnostics Stream Box ── */}
        <div className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/90 px-3.5 py-2.5 font-mono text-[11px] text-slate-800 shadow-xs">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-100 text-emerald-700">
            <FontAwesomeIcon icon={faTerminal} className="h-2.5 w-2.5" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col text-left">
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span className="text-emerald-700 font-bold">[{activeStep.tag}]</span>
              <span className="font-mono text-slate-400">{activeStep.code}</span>
            </div>
            <span className="truncate text-xs font-semibold text-slate-800">
              {activeStep.message}
            </span>
          </div>

          {percent >= 100 && (
            <FontAwesomeIcon icon={faCircleCheck} className="h-3.5 w-3.5 text-emerald-600 animate-bounce shrink-0" />
          )}
        </div>

        {/* ── Bottom Skip Action & Hotkey Helper ── */}
        <div className="mt-5 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-mono text-slate-500">
          <span>Tekan ESC kapan saja</span>

          <button
            type="button"
            onClick={finishAndClose}
            aria-label="Lewati loading portofolio"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-200 hover:text-slate-950 font-semibold"
          >
            <span>Lewati</span>
            <FontAwesomeIcon
              icon={faForwardStep}
              className="h-2.5 w-2.5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-900"
            />
          </button>
        </div>
      </div>

      {/* Embedded CSS for Scanline Animation */}
      <style jsx>{`
        @keyframes brightScanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }
      `}</style>
    </div>
  );
}
