"use client";

/* eslint-disable react-hooks/immutability -- Google Translate requires writing its compatibility cookie. */

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faMagnifyingGlass,
  faXmark,
  faCheck,
  faRotateLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { LANGUAGES } from "@/lib/data/languages";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLang, setCurrentLang] = useState<string>("id");
  const [isTranslating, setIsTranslating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Google Translate & detect existing cookie
  useEffect(() => {
    // Check existing googtrans cookie
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/auto\/([^;]+)/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    }

    // Define Google Translate callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "id",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Load Google Translate script if not present
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Suppress Google Translate banner frame & fix body top shifting
    const cleanBanner = () => {
      const frames = document.querySelectorAll(".goog-te-banner-frame, iframe.skiptranslate, iframe[id^=':']");
      frames.forEach((el) => {
        const frame = el as HTMLElement;
        frame.style.setProperty("display", "none", "important");
        frame.style.setProperty("visibility", "hidden", "important");
        frame.style.setProperty("height", "0", "important");
        frame.style.setProperty("opacity", "0", "important");
        frame.style.setProperty("pointer-events", "none", "important");
      });

      if (document.body.style.top !== "0px" && document.body.style.top !== "") {
        document.body.style.top = "0px";
      }
      if (document.body.style.position !== "static" && document.body.style.position !== "") {
        document.body.style.position = "static";
      }
    };

    const interval = setInterval(cleanBanner, 150);
    const observer = new MutationObserver(cleanBanner);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Lock background scroll on mobile & desktop when modal is open
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

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelectLanguage = (code: string) => {
    setIsTranslating(true);
    setCurrentLang(code);
    setIsOpen(false);

    const hostname = window.location.hostname;
    // Set translation cookies
    document.cookie = `googtrans=/auto/${code}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=/auto/${code}; path=/;`;

    // Try finding the Google combo element
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
      setTimeout(() => setIsTranslating(false), 500);
    } else {
      // Reload if combo not ready yet
      window.location.reload();
    }
  };

  const handleResetToOriginal = () => {
    setIsTranslating(true);
    setCurrentLang("id");
    setIsOpen(false);

    const hostname = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `googtrans=/auto/id; path=/; domain=${hostname}`;
    document.cookie = `googtrans=/auto/id; path=/;`;

    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = "id";
      combo.dispatchEvent(new Event("change"));
    }
    window.location.reload();
  };

  const filteredLanguages = LANGUAGES.filter((lang) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      lang.name.toLowerCase().includes(query) ||
      lang.nativeName.toLowerCase().includes(query) ||
      lang.code.toLowerCase().includes(query)
    );
  });

  const popularLanguages = LANGUAGES.filter((l) => l.popular);
  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
  };

  return (
    <>
      {/* ── Hidden Google Translate Mount Container ── */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* ── Navbar Trigger Button ── */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        title="Pilih Bahasa / Choose Language"
        className="group relative flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900 px-2 sm:px-2.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs transition-all hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white shrink-0"
      >
        <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white" />
        <span className="uppercase text-[11px] font-bold tracking-wider text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white">
          {activeLangObj.code.split("-")[0]}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="h-2 w-2 text-slate-400 transition-transform group-hover:text-slate-700 dark:group-hover:text-slate-300 hidden xs:inline-block"
        />

        {isTranslating && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
        )}
      </button>

      {/* ── Language Selection Modal (Mounted via Portal to Body to avoid Navbar Stacking Context) ── */}
      {isOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in"
        >
          {/* Backdrop (Prevents background click & touch propagation) */}
          <div
            onClick={() => setIsOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Card (Crisp White in Light Mode, Sleek Slate in Dark Mode) */}
          <div
            ref={modalRef}
            className="relative z-10 flex h-[82vh] max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-all"
          >
            {/* Modal Header (Always Visible at Top) */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 px-4 py-3 sm:px-6 sm:py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-2xs">
                  <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-extrabold text-slate-950 dark:text-white sm:text-base">
                    Pilih Bahasa / Select Language
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Mendukung 80+ Bahasa Dunia
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentLang !== "id" && (
                  <button
                    onClick={handleResetToOriginal}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-950"
                    title="Kembali ke Bahasa Asli (Indonesia)"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="h-2.5 w-2.5 text-slate-500" />
                    <span>Reset</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup pilihan bahasa"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Search Bar (Always Visible at Top of list) */}
            <div className="shrink-0 border-b border-slate-200 dark:border-slate-800 p-3 sm:p-4 bg-white dark:bg-slate-900">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Cari bahasa... (English, Arabic, Japanese, Jawa, Sunda, dll)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden"
                />
              </div>
            </div>

            {/* ── Scrollable Language List with Strict Touch Containment ── */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 touch-pan-y bg-white dark:bg-slate-900">
              {/* Popular / Fast Select Languages (Shown if not searching) */}
              {!searchQuery && (
                <div>
                  <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Bahasa Populer / Quick Select
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {popularLanguages.map((lang) => {
                      const isActive = currentLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`flex items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
                            isActive
                              ? "border-slate-900 bg-slate-900 text-white shadow-2xs dark:border-white dark:bg-white dark:text-slate-950"
                              : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-slate-400 hover:bg-white dark:hover:bg-slate-800 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-lg leading-none">{lang.flag}</span>
                            <div className="truncate">
                              <p className={`text-xs font-bold truncate ${isActive ? "text-white dark:text-slate-950" : "text-slate-950 dark:text-white"}`}>
                                {lang.nativeName}
                              </p>
                              <p className={`font-mono text-[10px] truncate ${isActive ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}>
                                {lang.name}
                              </p>
                            </div>
                          </div>
                          {isActive && <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-emerald-400 dark:text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All / Filtered Languages */}
              <div>
                <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {searchQuery
                    ? `Hasil Pencarian (${filteredLanguages.length})`
                    : `Semua Bahasa Dunia (${LANGUAGES.length})`}
                </h4>

                {filteredLanguages.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500">
                    Bahasa &ldquo;{searchQuery}&rdquo; tidak ditemukan. Coba ketik nama negara atau bahasa dalam bahasa Inggris.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pb-2">
                    {filteredLanguages.map((lang) => {
                      const isActive = currentLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
                            isActive
                              ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950"
                              : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <div className="truncate">
                              <span className={`text-xs font-medium block truncate ${isActive ? "text-white dark:text-slate-950" : "text-slate-900 dark:text-white"}`}>
                                {lang.nativeName}
                              </span>
                              <span className={`font-mono text-[10px] block truncate ${isActive ? "text-slate-300 dark:text-slate-600" : "text-slate-400"}`}>
                                {lang.name} ({lang.code})
                              </span>
                            </div>
                          </div>
                          {isActive && <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5 text-emerald-400 dark:text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 px-4 py-2.5 sm:px-5 sm:py-3 text-center font-mono text-[10px] sm:text-[11px] text-slate-500">
              ⚡ Google Cloud Translation &bull; 80+ Bahasa Dunia
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
