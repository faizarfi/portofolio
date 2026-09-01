"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCode } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function InteractivePhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 10 deg tilt
    const rX = ((y - centerY) / centerY) * -9;
    const rY = ((x - centerX) / centerX) * 9;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto max-w-md cursor-pointer lg:max-w-none"
      style={{ perspective: "1000px" }}
    >
      {/* Dynamic Ambient Glowing Aura Behind */}
      <div className="animate-pulse-glow absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-400/40 via-indigo-400/30 to-sky-400/40 blur-3xl opacity-80" />

      {/* Floating Badge Top-Left: Full Stack Developer */}
      <div className="animate-float-slow absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-3.5 py-2 text-xs font-bold text-slate-800 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
        <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
          <FontAwesomeIcon icon={faCode} className="h-3 w-3" />
        </span>
        <div className="text-left">
          <p className="text-[10px] font-medium text-slate-400">Spesialis</p>
          <p className="text-xs font-bold text-slate-900">Full Stack Dev</p>
        </div>
      </div>

      {/* Floating Badge Bottom-Right: Clean WhatsApp Action */}
      <a
        href="https://wa.me/6282327867328?text=Halo%20Faiz%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Faiz Arfian"
        className="animate-float-reverse absolute -bottom-4 -right-3 z-20 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-emerald-50/60 hover:border-emerald-300 group/wa"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 transition-transform duration-300 group-hover/wa:scale-110">
          <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
          <span className="ping-slow absolute -inset-0.5 rounded-xl bg-emerald-400 opacity-60" />
        </span>
        <div className="text-left">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Fast Response</p>
          <p className="text-xs font-bold text-slate-900">Chat WhatsApp</p>
        </div>
      </a>

      {/* 3D Tilting Card Container */}
      <div
        className="neat-card relative overflow-hidden rounded-3xl p-3 shadow-2xl shadow-blue-900/10 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glowing Conic Gradient Border Frame */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/foto.jpeg"
            alt="Faiz Arfian Ilhami"
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-108"
            priority
            sizes="(max-width: 768px) 100vw, 500px"
          />

          {/* Vignette Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Dynamic Interactive Mouse Glare */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
              opacity: glarePos.opacity,
            }}
          />

          {/* Verified Profile Chip (Top-Right) */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Verified Profile</span>
          </div>

          {/* Location Chip (Bottom-Left) */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-lg backdrop-blur-md">
            <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-blue-600" />
            <span>Surakarta, Jawa Tengah</span>
          </div>
        </div>

        {/* Bottom Highlight Strip */}
        <div className="mt-3 flex items-center justify-between px-2 py-1">
          <div>
            <p className="font-display text-xs font-bold text-slate-900">Faiz Arfian Ilhami</p>
            <p className="text-[11px] text-slate-500">Full Stack &middot; Laravel &middot; React</p>
          </div>
          <span className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-[10px] font-bold text-blue-800 shadow-xs">
            PHP &bull; JS &bull; TS
          </span>
        </div>
      </div>
    </div>
  );
}
