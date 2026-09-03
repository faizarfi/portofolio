"use client";

/* eslint-disable react-hooks/immutability -- Google Translate requires writing its compatibility cookie. */

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
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
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const modalRef = useRef<HTMLDivElement>(null);

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
        className="group relative flex h-8 sm:h-8.5 items-center gap-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-100/80 dark:bg-zinc-800/80 px-2.5 sm:px-3 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-200 shadow-2xs transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white shrink-0"
      >
        <FontAwesomeIcon icon={faGlobe} className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white" />
        <span className="uppercase text-[11px] font-bold tracking-wider text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white">
          {activeLangObj.code.split("-")[0]}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="h-2 w-2 text-zinc-400 transition-transform group-hover:text-zinc-700 dark:group-hover:text-zinc-300 hidden xs:inline-block"
        />

        {isTranslating && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
        )}
      </button>

      {/* ── Language Selection Modal (Mounted via Portal to Body) ── */}
      {isOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Card (Pristine Clean White in Light Mode) */}
          <div
            ref={modalRef}
            className="relative z-10 flex h-[82vh] max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-950/10 transition-all text-zinc-900 dark:text-zinc-100"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs">
                  <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-zinc-950 dark:text-white leading-tight">
                    Pilih Bahasa / Select Language
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                    Mendukung 80+ Bahasa Dunia (Google Translate)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {currentLang !== "id" && (
                  <button
                    onClick={handleResetToOriginal}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-950"
                    title="Kembali ke Bahasa Asli (Indonesia)"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="h-2.5 w-2.5 text-zinc-500" />
                    <span>Reset (ID)</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup pilihan bahasa"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="shrink-0 border-b border-zinc-100 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400"
                />
                <input
                  type="text"
                  placeholder="Cari bahasa... (English, Arabic, Japanese, Jawa, Sunda, dll)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-zinc-950 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 focus:outline-hidden"
                />
              </div>
            </div>

            {/* ── Scrollable Language List with Strict Touch Containment ── */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5 touch-pan-y bg-zinc-50/50 dark:bg-zinc-900/50">
              {/* Popular / Fast Select Languages (Shown if not searching) */}
              {!searchQuery && (
                <div>
                  <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
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
                              ? "border-zinc-950 bg-zinc-950 text-white shadow-xs dark:border-white dark:bg-white dark:text-zinc-950 font-bold"
                              : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-lg leading-none">{lang.flag}</span>
                            <div className="truncate">
                              <p className={`text-xs font-bold truncate ${isActive ? "text-white dark:text-zinc-950" : "text-zinc-950 dark:text-white"}`}>
                                {lang.nativeName}
                              </p>
                              <p className={`font-mono text-[10px] truncate ${isActive ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}>
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
                <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  {searchQuery
                    ? `Hasil Pencarian (${filteredLanguages.length})`
                    : `Semua Bahasa Dunia (${LANGUAGES.length})`}
                </h4>

                {filteredLanguages.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-500">
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
                          className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-all ${
                            isActive
                              ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-bold"
                              : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <div className="truncate">
                              <span className={`text-xs font-semibold block truncate ${isActive ? "text-white dark:text-zinc-950" : "text-zinc-900 dark:text-white"}`}>
                                {lang.nativeName}
                              </span>
                              <span className={`font-mono text-[10px] block truncate ${isActive ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}>
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
            <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 text-center font-mono text-xs text-zinc-400">
              ⚡ Google Cloud Translation &bull; 80+ Bahasa Dunia
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
