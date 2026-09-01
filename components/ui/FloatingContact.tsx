"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowUp,
  faCommentDots,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappMessage = encodeURIComponent(
    "Halo Faiz Arfian, saya melihat website portofolio Anda dan tertarik untuk mendiskusikan peluang proyek web / bantuan teknis IT."
  );
  // Direct WhatsApp URL (without specific number it lets user open WA / select contact, or if number is provided opens directly)
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;
  const emailUrl = `mailto:faizarfianilhami020204@gmail.com?subject=${encodeURIComponent(
    "Diskusi Proyek Web / Bantuan IT — dari Portofolio"
  )}&body=${whatsappMessage}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll kembali ke atas"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-600 shadow-md backdrop-blur-md transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 active:scale-95"
        >
          <FontAwesomeIcon icon={faArrowUp} className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Expanded Quick Contact Menu */}
      {open && (
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md transition-all animate-fade-in sm:p-3.5">
          <div className="mb-1 flex items-center justify-between border-b border-slate-100 pb-2 px-1">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Hubungi Langsung
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* WhatsApp Direct Option */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3.5 py-2.5 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100 hover:scale-[1.02]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs">
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold">Chat WhatsApp</p>
              <p className="text-[10px] font-medium text-emerald-600">Pesan otomatis terisi</p>
            </div>
          </a>

          {/* Email Option */}
          <a
            href={emailUrl}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 px-3.5 py-2.5 text-xs font-bold text-blue-800 transition-all hover:bg-blue-100 hover:scale-[1.02]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="font-bold">Kirim Email</p>
              <p className="text-[10px] font-medium text-blue-600">faizarfianilhami020204@gmail.com</p>
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Tutup menu kontak cepat" : "Buka menu kontak cepat"}
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 px-4.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>

        <FontAwesomeIcon icon={open ? faXmark : faCommentDots} className="h-4 w-4" />
        <span className="hidden sm:inline">
          {open ? "Tutup" : "Tanya Proyek / Chat"}
        </span>
      </button>
    </div>
  );
}
