"use client";

import Image from "next/image";

export default function InteractivePhotoCard() {
  return (
    <div className="relative mx-auto max-w-sm lg:max-w-none">
      {/* Studio Portrait Frame */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 sm:p-2.5 shadow-lg shadow-slate-900/5 dark:shadow-none transition-all">
        {/* Photo Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-850 border border-slate-200/70 dark:border-zinc-800/80">
          <Image
            src="/foto.jpeg"
            alt="Faiz Arfian Ilhami"
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
            priority
            sizes="(max-width: 768px) 100vw, 420px"
          />

          {/* Subtle Bottom Shade for Visual Depth */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Minimalist Editorial Caption */}
        <div className="mt-2.5 flex items-center justify-between px-2 py-1">
          <div>
            <p className="font-display text-xs font-bold text-slate-900 dark:text-white">
              Faiz Arfian Ilhami
            </p>
            <p className="font-mono text-[10px] text-slate-500 dark:text-zinc-400">
              Informatika &bull; UMS
            </p>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 dark:text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Surakarta, ID</span>
          </div>
        </div>
      </div>
    </div>
  );
}



