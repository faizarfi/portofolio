"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function InteractivePhotoCard() {
  return (
    <div className="relative mx-auto max-w-sm lg:max-w-none">
      {/* Floating Badge Top-Left: Specialization */}
      <div className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 shadow-sm">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white">
          <FontAwesomeIcon icon={faLaptopCode} className="h-3.5 w-3.5" />
        </span>
        <div className="text-left">
          <p className="text-[10px] font-semibold text-slate-400 font-mono">STACK</p>
          <p className="text-xs font-bold text-slate-900">Laravel &amp; Next.js</p>
        </div>
      </div>

      {/* Floating Badge Bottom-Right: WhatsApp Action */}
      <a
        href="https://wa.me/6282327867328?text=Halo%20Faiz%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Faiz Arfian"
        className="absolute -bottom-3 -right-3 z-20 flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 shadow-sm transition-all duration-200 hover:bg-emerald-100 hover:scale-102"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
        </span>
        <div className="text-left">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">KONTAK</p>
          <p className="text-xs font-bold text-emerald-950">Chat WhatsApp</p>
        </div>
      </a>

      {/* Studio Photo Frame */}
      <div className="neat-card overflow-hidden p-2.5 shadow-sm">
        {/* Photo Container */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-slate-100 border border-slate-200/80">
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
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-xs">
            <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-slate-600" />
            <span>Surakarta, Jawa Tengah</span>
          </div>
        </div>

        {/* Bottom Highlight Strip */}
        <div className="mt-2.5 flex items-center justify-between px-1.5 py-1">
          <div>
            <p className="font-display text-xs font-bold text-slate-900">Faiz Arfian Ilhami</p>
            <p className="text-[11px] text-slate-500 font-mono">S1 Informatika UMS (2026)</p>
          </div>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
            PHP &bull; JS &bull; SQL
          </span>
        </div>
      </div>
    </div>
  );
}


