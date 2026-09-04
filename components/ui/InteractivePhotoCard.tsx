"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faLaptopCode, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function InteractivePhotoCard() {
  return (
    <div className="relative mx-auto max-w-sm lg:max-w-none">
      {/* Floating Badge Top-Left: Specialization */}
      <div className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-white shadow-sm">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
          <FontAwesomeIcon icon={faLaptopCode} className="h-3.5 w-3.5" />
        </span>
        <div className="text-left">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-zinc-400 font-mono">STACK</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Laravel &amp; Next.js</p>
        </div>
      </div>

      {/* Floating Badge Bottom-Right: Contact Action */}
      <a
        href="#contact"
        aria-label="Hubungi Faiz Arfian"
        className="absolute -bottom-3 -right-3 z-20 flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:scale-102"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
          <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
        </span>
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">KONTAK</p>
          <p className="text-xs font-bold text-slate-900 dark:text-white">Hubungi Saya</p>
        </div>
      </a>

      {/* Studio Photo Frame */}
      <div className="neat-card overflow-hidden p-2.5 shadow-sm">
        {/* Photo Container */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800">
          <Image
            src="/foto.jpeg"
            alt="Faiz Arfian Ilhami"
            fill
            className="object-cover object-top transition-transform duration-500 hover:scale-103"
            priority
            sizes="(max-width: 768px) 100vw, 450px"
          />

          {/* Vignette Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

          {/* Authentic Status Chip (Top-Right) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-white shadow-xs backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Siap Kolaborasi</span>
          </div>

          {/* Location Chip (Bottom-Left) */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 px-3 py-1 text-xs font-semibold text-slate-800 dark:text-zinc-100 shadow-xs">
            <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-slate-600 dark:text-zinc-400" />
            <span>Indonesia (Remote / On-Site)</span>
          </div>

        </div>

        {/* Bottom Highlight Strip */}
        <div className="mt-2.5 flex items-center justify-between px-1.5 py-1">
          <div>
            <p className="font-display text-xs font-bold text-slate-900 dark:text-white">Faiz Arfian Ilhami</p>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">S1 Informatika UMS (2026)</p>
          </div>
          <span className="rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:text-zinc-300">
            PHP &bull; JS &bull; SQL
          </span>
        </div>
      </div>
    </div>
  );
}


