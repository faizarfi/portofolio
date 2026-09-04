"use client";

import Image from "next/image";

export default function InteractivePhotoCard() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* ── Circular Portrait Frame with Subtle Tech Ring ── */}
      <div className="group relative">
        {/* Subtle Outer Dashed Ring Accent */}
        <div className="absolute -inset-2.5 rounded-full border border-dashed border-slate-300/70 dark:border-zinc-700/60 pointer-events-none transition-all duration-500 group-hover:border-slate-400 dark:group-hover:border-zinc-500 group-hover:scale-105" />

        {/* Circular Avatar Container */}
        <div className="relative h-44 w-44 sm:h-52 sm:w-52 lg:h-56 lg:w-56 overflow-hidden rounded-full border-2 border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 shadow-xl shadow-slate-900/5 dark:shadow-black/60 transition-transform duration-500 group-hover:scale-[1.02]">
          <Image
            src="/foto.jpeg"
            alt="Faiz Arfian Ilhami"
            fill
            className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 224px"
          />
        </div>
      </div>

      {/* ── Editorial Location / Collaboration Caption ── */}
      <div className="mt-4 text-center">
        <p className="font-mono text-[11px] text-slate-500 dark:text-zinc-400">
          Sekarang berkolaborasi di:
        </p>
        <p className="mt-0.5 font-display text-xs sm:text-sm font-semibold text-slate-800 dark:text-zinc-200">
          Seluruh Indonesia &bull; Terbuka untuk Remote
        </p>
      </div>
    </div>
  );
}
