import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-5 text-center text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-md rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm sm:p-10">
        <p className="mb-2 font-mono text-xs font-bold tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
          Error 404
        </p>
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mx-auto mb-8 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
          Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-6 py-3 text-xs font-bold text-white dark:text-black shadow-xs transition-colors hover:bg-slate-800 dark:hover:bg-zinc-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
