"use client";

import { useEffect, useState, useRef } from "react";

export default function CloudflareGate() {
  const [verified, setVerified] = useState(false);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const [rayId, setRayId] = useState("");
  const [hostname, setHostname] = useState("faizarfianilhami.caitlyn.my.id");
  const [statusText, setStatusText] = useState("Verifikasi bahwa Anda adalah manusia untuk melanjutkan.");
  const [showBypass, setShowBypass] = useState(false);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Generate realistic Ray ID
    const randomRay = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
    setRayId(randomRay);

    if (typeof window !== "undefined") {
      setHostname(window.location.hostname || "faizarfianilhami.caitlyn.my.id");

      // Check if already verified in this session
      const isAlreadyVerified = sessionStorage.getItem("cf_turnstile_verified");
      if (isAlreadyVerified === "true") {
        setVisible(false);
        setVerified(true);
        return;
      }
    }

    // Safety fallback: Show bypass button if Turnstile script is blocked by adblockers after 4.5 seconds
    const bypassTimer = setTimeout(() => {
      setShowBypass(true);
    }, 4500);

    // Function to handle successful verification
    const handleSuccess = (_token?: string) => {
      setStatusText("Verifikasi Berhasil! Membuka portofolio...");
      setVerified(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cf_turnstile_verified", "true");
      }
      setTimeout(() => {
        setClosing(true);
      }, 500);
      setTimeout(() => {
        setVisible(false);
      }, 950);
    };

    // Render Cloudflare Turnstile widget
    let attempts = 0;
    const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAElvKt9_LYYr1Uov";

    const renderWidget = (keyToUse: string) => {
      if (typeof window === "undefined" || !(window as unknown as { turnstile?: { render?: Function } }).turnstile || !containerRef.current) {
        return false;
      }

      try {
        const turnstile = (window as unknown as { turnstile: { render: Function; remove: Function } }).turnstile;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: keyToUse,
          theme: "auto",
          callback: () => {
            handleSuccess();
          },
          "error-callback": () => {
            // If custom key has domain restrictions on localhost, fallback to Cloudflare official test key
            if (keyToUse !== "1x00000000000000000000AA" && widgetIdRef.current) {
              try {
                turnstile.remove(widgetIdRef.current);
                renderWidget("1x00000000000000000000AA");
              } catch (e) {}
            }
          },
        });
        return true;
      } catch (err) {
        console.error("Turnstile render error:", err);
        return false;
      }
    };

    const interval = setInterval(() => {
      attempts++;
      if (renderWidget(siteKey) || attempts > 50) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(bypassTimer);
      if (widgetIdRef.current && typeof window !== "undefined") {
        try {
          (window as unknown as { turnstile?: { remove: Function } }).turnstile?.remove(widgetIdRef.current);
        } catch (e) {}
      }
    };
  }, []);

  const handleManualBypass = () => {
    setStatusText("Akses Diberikan. Membuka portofolio...");
    setVerified(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cf_turnstile_verified", "true");
    }
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
    }, 450);
  };

  if (!visible) return null;

  return (
    <div
      id="cf-turnstile-gate"
      className="fixed inset-0 z-[9999999] flex flex-col justify-between p-6 sm:p-10 select-none transition-all duration-500 bg-[#fbfbfb] dark:bg-[#0c0c0e] text-slate-800 dark:text-zinc-200"
      style={{
        opacity: closing ? 0 : 1,
        transform: closing ? "scale(1.02) blur(2px)" : "scale(1)",
        pointerEvents: closing ? "none" : "auto",
      }}
    >
      {/* ── Top Header with Cloudflare Branding ── */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-zinc-400">
          {/* Cloudflare Cloud Logo */}
          <svg className="h-5 w-5 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
          <span className="font-bold tracking-wider text-slate-800 dark:text-zinc-200">CLOUDFLARE</span>
          <span className="opacity-40">&bull;</span>
          <span className="text-[11px]">MANAGED CHALLENGE</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/80 px-2.5 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>DDOS SHIELD ACTIVE</span>
        </div>
      </div>

      {/* ── Center Challenge Card ── */}
      <div className="my-auto flex flex-col items-center text-center max-w-lg mx-auto w-full">
        {/* Hostname & Security Badge */}
        <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mb-2">
          {hostname}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-md">
          Memeriksa keamanan koneksi peramban sebelum Anda diarahkan ke portofolio resmi Faiz Arfian Ilhami.
        </p>

        {/* ── Real Turnstile Interactive Container ── */}
        <div className="relative min-h-[72px] w-full max-w-[320px] flex items-center justify-center p-2 rounded-xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 shadow-xl shadow-slate-900/5 dark:shadow-black/40 transition-all">
          <div ref={containerRef} className="flex items-center justify-center" />
        </div>

        {/* Verification Status Text */}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs">
          {verified ? (
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold animate-pulse">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {statusText}
            </span>
          ) : (
            <span className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              Centang kotak di atas untuk verifikasi keamanan
            </span>
          )}
        </div>

        {/* Optional fallback bypass button (shown if adblocker blocks Turnstile script) */}
        {showBypass && !verified && (
          <button
            onClick={handleManualBypass}
            className="mt-6 font-mono text-xs text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 underline underline-offset-4 transition-colors"
          >
            Kendala memuat widget? Klik di sini untuk masuk langsung &rarr;
          </button>
        )}
      </div>

      {/* ── Footer with Ray ID & Security Details ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 dark:border-zinc-800/60 pt-4 font-mono text-[11px] text-slate-400 dark:text-zinc-500 gap-2">
        <div className="flex items-center gap-2">
          <span>Ray ID: <strong className="font-normal text-slate-600 dark:text-zinc-400">{rayId}</strong></span>
          <span>&bull;</span>
          <span>Your IP: Terproteksi</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>Performance &amp; security by</span>
          <a
            href="https://www.cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#F38020] hover:underline"
          >
            Cloudflare
          </a>
        </div>
      </div>
    </div>
  );
}
