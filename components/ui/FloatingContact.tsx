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
    "Halo Faiz Arfian, saya melihat portofolio Anda dan ingin berdiskusi mengenai proyek web / bantuan IT."
  );
  const whatsappUrl = `https://wa.me/6282327867328?text=${whatsappMessage}`;
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
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-950"
        >
          <FontAwesomeIcon icon={faArrowUp} className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Expanded Quick Contact Menu */}
      {open && (
        <div className="flex flex-col gap-2 rounded-xl border border-slate-300 bg-white p-3 shadow-lg transition-all animate-fade-in sm:p-3.5">
          <div className="mb-1 flex items-center justify-between border-b border-slate-100 pb-2 px-1">
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              Hubungi Langsung
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          {/* WhatsApp Direct Option */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 px-3.5 py-2.5 text-xs font-semibold text-emerald-950 transition-colors hover:bg-emerald-100"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-600 text-white">
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-emerald-950">Chat WhatsApp</p>
              <p className="text-[10px] font-medium text-emerald-700 font-mono">0823-2786-7328</p>
            </div>
          </a>

          {/* Email Option */}
          <a
            href={emailUrl}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-900 text-white">
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Kirim Email</p>
              <p className="text-[10px] font-medium text-slate-500 truncate max-w-[180px] font-mono">faizarfianilhami020204@gmail.com</p>
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Tutup menu kontak cepat" : "Buka menu kontak cepat"}
        className="group relative flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 py-2.5 px-3.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-slate-800"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <FontAwesomeIcon icon={open ? faXmark : faCommentDots} className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">
          {open ? "Tutup" : "Tanya Proyek / Chat"}
        </span>
      </button>
    </div>
  );
}


