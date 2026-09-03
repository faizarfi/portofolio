"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversalAccess,
  faXmark,
  faRotateLeft,
  faTextHeight,
  faEye,
  faFont,
  faUnderline,
  faPause,
  faMousePointer,
} from "@fortawesome/free-solid-svg-icons";

export interface AccessibilitySettings {
  fontSize: number; // 100, 110, 120, 130
  highContrast: boolean;
  readableText: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  bigCursor: boolean;
  grayscale: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  readableText: false,
  reduceMotion: false,
  underlineLinks: false,
  bigCursor: false,
  grayscale: false,
};

const STORAGE_KEY = "faiz_portfolio_a11y_settings";
const emptySubscribe = () => () => {};

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_SETTINGS;
  });
  const modalRef = useRef<HTMLDivElement>(null);

  // Synchronize CSS classes and styles to documentElement
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Font size scaling
    if (settings.fontSize === 100) {
      root.style.fontSize = "";
    } else {
      root.style.fontSize = `${settings.fontSize}%`;
    }

    // Toggle classes
    root.classList.toggle("a11y-high-contrast", settings.highContrast);
    root.classList.toggle("a11y-readable-text", settings.readableText);
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
    root.classList.toggle("a11y-underline-links", settings.underlineLinks);
    root.classList.toggle("a11y-big-cursor", settings.bigCursor);
    root.classList.toggle("a11y-grayscale", settings.grayscale);

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore localStorage errors
    }
  }, [settings, mounted]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [isOpen]);

  // Handle escape key and custom open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-a11y-menu", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-a11y-menu", handleOpen);
    };
  }, [isOpen]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    val: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    const root = document.documentElement;
    root.style.fontSize = "";
    root.classList.remove(
      "a11y-high-contrast",
      "a11y-readable-text",
      "a11y-reduce-motion",
      "a11y-underline-links",
      "a11y-big-cursor",
      "a11y-grayscale"
    );
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const activeCount =
    (settings.fontSize !== 100 ? 1 : 0) +
    (settings.highContrast ? 1 : 0) +
    (settings.readableText ? 1 : 0) +
    (settings.reduceMotion ? 1 : 0) +
    (settings.underlineLinks ? 1 : 0) +
    (settings.bigCursor ? 1 : 0) +
    (settings.grayscale ? 1 : 0);

  return (
    <>
      {/* ── Global Floating Accessibility Bubble (Bottom Left) ── */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        title="Menu Aksesibilitas (Ukuran font, kontras, spasi baca)"
        aria-label="Buka Menu Aksesibilitas"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 px-3.5 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-md backdrop-blur-md transition-all hover:border-zinc-900 dark:hover:border-white hover:shadow-lg hover:-translate-y-0.5 group"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-2xs group-hover:scale-105 transition-transform">
          <FontAwesomeIcon icon={faUniversalAccess} className="h-3.5 w-3.5" />
        </div>
        <span className="font-sans text-xs font-bold tracking-tight">Aksesibilitas</span>

        {activeCount > 0 && (
          <span
            className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-mono font-bold text-white shadow-xs"
            title={`${activeCount} fitur aksesibilitas aktif`}
          >
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Accessibility Modal (React Portal to document.body) ── */}
      {isOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-modal-title"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container: Clean, Crisp Pure White Card */}
          <div
            ref={modalRef}
            className="relative z-10 flex h-[85vh] max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-950/10 transition-all text-zinc-900 dark:text-zinc-100"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs">
                  <FontAwesomeIcon icon={faUniversalAccess} className="h-4 w-4" />
                </div>
                <div>
                  <h3 id="a11y-modal-title" className="font-display text-base font-bold text-zinc-950 dark:text-white leading-tight">
                    Menu Aksesibilitas
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                    Sesuaikan kenyamanan membaca &amp; tampilan visual
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-950"
                    title="Kembalikan semua setelan ke standar"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="h-2.5 w-2.5 text-zinc-500" />
                    <span>Reset</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu aksesibilitas"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 touch-pan-y bg-zinc-50/50 dark:bg-zinc-900/50">
              {/* 1. Ukuran Teks */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon icon={faTextHeight} className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
                    Ukuran Teks
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "100%", sub: "Standar", val: 100 },
                    { label: "110%", sub: "Sedang", val: 110 },
                    { label: "120%", sub: "Besar", val: 120 },
                    { label: "130%", sub: "Ekstra", val: 130 },
                  ].map((lvl) => {
                    const isSelected = settings.fontSize === lvl.val;
                    return (
                      <button
                        key={lvl.val}
                        onClick={() => updateSetting("fontSize", lvl.val)}
                        className={`flex flex-col items-center justify-center rounded-xl border py-2 px-1 text-center transition-all ${
                          isSelected
                            ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 shadow-xs font-bold"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 hover:bg-zinc-100"
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold">{lvl.label}</span>
                        <span className={`text-[10px] ${isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}>
                          {lvl.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Keterbacaan & Teks */}
              <div>
                <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Keterbacaan &amp; Struktur
                </h4>
                <div className="space-y-2">
                  {/* Spasi Ramah Disleksia */}
                  <div
                    onClick={() => updateSetting("readableText", !settings.readableText)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 transition-all hover:border-zinc-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <FontAwesomeIcon icon={faFont} className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                          Teks Ramah Disleksia &amp; Spasi Luas
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Memperlebar jarak huruf &amp; baris agar lebih nyaman dieja
                        </p>
                      </div>
                    </div>
                    {/* iOS-Style Toggle Switch */}
                    <div
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        settings.readableText ? "bg-zinc-950 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${
                          settings.readableText ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Garis Bawah Tautan */}
                  <div
                    onClick={() => updateSetting("underlineLinks", !settings.underlineLinks)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 transition-all hover:border-zinc-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <FontAwesomeIcon icon={faUnderline} className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                          Garis Bawah Seluruh Tautan
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Menonjolkan semua link agar mudah dikenali
                        </p>
                      </div>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        settings.underlineLinks ? "bg-zinc-950 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${
                          settings.underlineLinks ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Tampilan & Visual Kontras */}
              <div>
                <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Tampilan &amp; Kontras
                </h4>
                <div className="space-y-2">
                  {/* Kontras Tinggi */}
                  <div
                    onClick={() => updateSetting("highContrast", !settings.highContrast)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 transition-all hover:border-zinc-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                          Kontras Tinggi
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Mempertajam batas visual dan kontras warna konten
                        </p>
                      </div>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        settings.highContrast ? "bg-zinc-950 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${
                          settings.highContrast ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Monokrom / Grayscale */}
                  <div
                    onClick={() => updateSetting("grayscale", !settings.grayscale)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 transition-all hover:border-zinc-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <span className="text-xs font-bold font-mono">B/W</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                          Filter Monokrom (Hitam Putih)
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Menghilangkan saturasi warna untuk kenyamanan mata
                        </p>
                      </div>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        settings.grayscale ? "bg-zinc-950 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${
                          settings.grayscale ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Kenyamanan Gerakan */}
              <div>
                <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Gerakan &amp; Interaksi
                </h4>
                <div className="space-y-2">
                  {/* Kurangi Gerakan */}
                  <div
                    onClick={() => updateSetting("reduceMotion", !settings.reduceMotion)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 transition-all hover:border-zinc-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <FontAwesomeIcon icon={faPause} className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                          Hentikan Animasi &amp; Gerakan
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Mematikan efek transisi untuk pengguna sensitif gerakan
                        </p>
                      </div>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        settings.reduceMotion ? "bg-zinc-950 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${
                          settings.reduceMotion ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Kursor Besar */}
                  <div
                    onClick={() => updateSetting("bigCursor", !settings.bigCursor)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 transition-all hover:border-zinc-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <FontAwesomeIcon icon={faMousePointer} className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white">
                          Perjelas Kursor Mouse
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Menjaga pointer tetap jelas pada elemen interaktif
                        </p>
                      </div>
                    </div>
                    <div
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        settings.bigCursor ? "bg-zinc-950 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm ring-0 transition duration-200 ease-in-out ${
                          settings.bigCursor ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 sm:px-6 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>♿ Standar WCAG 2.1</span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-zinc-950 dark:bg-white px-5 py-2 font-sans font-semibold text-xs text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
