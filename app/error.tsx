"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black px-5 text-center text-slate-900 dark:text-white">
      <div className="max-w-md rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
          Terjadi Kendala
        </p>
        <h1 className="font-display mt-2 text-2xl font-black text-slate-950 dark:text-white">
          Halaman Tidak Dapat Dimuat
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
          Terjadi kesalahan saat merender tampilan. Anda dapat mencoba memuat ulang halaman ini atau kembali ke beranda.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-slate-900 dark:bg-white px-5 py-2 text-xs font-semibold text-white dark:text-slate-950 transition-colors hover:bg-slate-800 dark:hover:bg-zinc-200"
          >
            Muat Ulang Bagian Ini
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

