import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan | Faiz Arfian Ilhami",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-5 text-center text-slate-800">
      {/* Subtle blue ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-[120px]" />

      <div className="relative z-10 max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
        <p className="mb-2 font-mono text-xs font-bold tracking-widest text-blue-700 uppercase">
          Error 404
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Halaman <br />
          <span className="text-blue-600">
            Tidak Ditemukan
          </span>
        </h1>
        <p className="mx-auto mb-8 text-sm leading-relaxed text-slate-600">
          Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
