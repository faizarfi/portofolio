import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan | Faiz Arfian Ilhami",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-5 text-center text-slate-900 dark:text-white transition-colors duration-200">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/50 dark:bg-zinc-800/30 blur-[120px]" />

      <div className="relative z-10 max-w-md rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xl shadow-slate-900/5 dark:shadow-none sm:p-10">
        <p className="mb-2 font-mono text-xs font-bold tracking-widest text-slate-500 dark:text-zinc-400 uppercase">
          Error 404
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Halaman <br />
          <span className="text-slate-700 dark:text-zinc-300">
            Tidak Ditemukan
          </span>
        </h1>
        <p className="mx-auto mb-8 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
          Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-6 py-3 text-xs font-bold text-white dark:text-black shadow-sm transition-all hover:bg-slate-800 dark:hover:bg-zinc-200 hover:shadow-md"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
