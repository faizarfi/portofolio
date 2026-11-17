"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
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

const LANG_EVENT = "googtrans-updated";

function subscribeLangCookie(callback: () => void) {
  window.addEventListener(LANG_EVENT, callback);
  return () => window.removeEventListener(LANG_EVENT, callback);
}

function getInitialCookieLang(): string {
  if (typeof document === "undefined") return "id";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/auto\/([^;]+)/);
  return match && match[1] ? match[1] : "id";
}

function writeTranslateCookie(code: string) {
  const hostname = window.location.hostname;
  document.cookie = `googtrans=/auto/${code}; path=/; domain=${hostname}`;
  document.cookie = `googtrans=/auto/${code}; path=/;`;
  window.dispatchEvent(new Event(LANG_EVENT));
}

function clearTranslateCookie() {
  const hostname = window.location.hostname;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.dispatchEvent(new Event(LANG_EVENT));
}

function triggerGoogleTranslateCombo(code: string, onDone?: () => void): boolean {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) return false;
  combo.value = code;
  combo.dispatchEvent(new Event("change"));
  if (onDone) {
    setTimeout(() => {
      cleanGoogleBanner();
      onDone();
    }, 400);
  }
  return true;
}

function cleanGoogleBanner() {
  const frames = document.querySelectorAll(
    ".goog-te-banner-frame, iframe.skiptranslate, iframe[id^=':']"
  );
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
}

function loadTranslateScript(onReady?: () => void) {
  window.googleTranslateElementInit = () => {
    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        { pageLanguage: "id", autoDisplay: false },
        "google_translate_element"
      );
      cleanGoogleBanner();
      onReady?.();
    }
  };

  if (document.getElementById("google-translate-script")) {
    if (window.google?.translate?.TranslateElement) {
      onReady?.();
    }
    return;
  }

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentLang = useSyncExternalStore(
    subscribeLangCookie,
    getInitialCookieLang,
    () => "id"
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pressedOutsideRef = useRef(false);

  // Only load Google Translate on mount if a non-Indonesian translation cookie is already active
  useEffect(() => {
    if (currentLang === "id") return;
    loadTranslateScript();
    const observer = new MutationObserver(cleanGoogleBanner);
    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, [currentLang]);

  useEffect(() => {
    const onOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-language-modal", onOpenEvent);
    return () => window.removeEventListener("open-language-modal", onOpenEvent);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      searchInputRef.current?.focus();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const applyLanguageSelection = (code: string) => {
    setIsTranslating(true);
    setIsOpen(false);
    writeTranslateCookie(code);

    if (triggerGoogleTranslateCombo(code, () => setIsTranslating(false))) {
      return;
    }

    loadTranslateScript(() => {
      setTimeout(() => {
        if (!triggerGoogleTranslateCombo(code, () => setIsTranslating(false))) {
          window.location.reload();
        }
      }, 250);
    });
  };

  const handleResetToOriginal = () => {
    setIsTranslating(true);
    setIsOpen(false);
    clearTranslateCookie();
    writeTranslateCookie("id");
    triggerGoogleTranslateCombo("id");
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

  const isOutsideDialog = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  return (
    <>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      <button
        onClick={() => setIsOpen(true)}
        type="button"
        title="Pilih Bahasa / Choose Language"
        aria-label={`Pilih bahasa (aktif: ${activeLangObj.name})`}
        className="group relative flex h-9 items-center gap-1.5 rounded-full border border-zinc-200/90 dark:border-zinc-700/80 bg-zinc-100/80 dark:bg-zinc-800 px-2.5 sm:px-3 font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-200 shadow-2xs transition-colors hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-white shrink-0"
      >
        <FontAwesomeIcon
          icon={faGlobe}
          aria-hidden="true"
          className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white"
        />
        <span className="uppercase text-[11px] font-bold tracking-wider text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white">
          {activeLangObj.code.split("-")[0]}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          aria-hidden="true"
          className="h-2.5 w-2.5 text-zinc-600 dark:text-zinc-400 hidden sm:inline-block"
        />

        {isTranslating && (
          <span className="sr-only">Sedang menerjemahkan halaman...</span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="language-modal-title"
        onClose={() => setIsOpen(false)}
        onPointerDown={(e) => {
          pressedOutsideRef.current = isOutsideDialog(e);
        }}
        onPointerUp={(e) => {
          if (pressedOutsideRef.current && isOutsideDialog(e)) {
            setIsOpen(false);
          }
          pressedOutsideRef.current = false;
        }}
        {...({ closedby: "any" } as Record<string, string>)}
        className="m-auto h-[82vh] max-h-[82vh] w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-0 text-zinc-900 dark:text-zinc-100 shadow-2xl backdrop:bg-zinc-950/50 backdrop:backdrop-blur-xs open:flex open:flex-col"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs">
              <FontAwesomeIcon icon={faGlobe} aria-hidden="true" className="h-4 w-4" />
            </div>
            <div>
              <h2 id="language-modal-title" className="font-display text-base font-bold text-zinc-950 dark:text-white leading-tight">
                Pilih Bahasa / Select Language
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                Terjemahan otomatis 80+ bahasa dunia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentLang !== "id" && (
              <button
                type="button"
                onClick={handleResetToOriginal}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
                title="Kembali ke Bahasa Asli (Indonesia)"
              >
                <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" className="h-2.5 w-2.5 text-zinc-600 dark:text-zinc-300" />
                <span>Reset (ID)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup pilihan bahasa"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="shrink-0 border-b border-zinc-100 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <label htmlFor="language-search-input" className="sr-only">
            Cari bahasa
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400"
            />
            <input
              ref={searchInputRef}
              id="language-search-input"
              type="text"
              placeholder="Cari bahasa... (English, Arabic, Japanese, Jawa, Sunda, dll)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-800/70 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-zinc-950 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800"
            />
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5 touch-pan-y bg-zinc-50/50 dark:bg-zinc-900/50">
          {!searchQuery && (
            <div>
              <h3 className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2.5">
                Bahasa Populer
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {popularLanguages.map((lang) => {
                  const isActive = currentLang === lang.code;
                  return (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => applyLanguageSelection(lang.code)}
                      className={`flex min-h-[44px] items-center justify-between rounded-xl border p-2.5 text-left transition-colors ${
                        isActive
                          ? "border-zinc-950 bg-zinc-950 text-white shadow-xs dark:border-white dark:bg-white dark:text-zinc-950 font-bold"
                          : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-lg leading-none" aria-hidden="true">{lang.flag}</span>
                        <div className="truncate">
                          <p className={`text-xs font-bold truncate ${isActive ? "text-white dark:text-zinc-950" : "text-zinc-950 dark:text-white"}`}>
                            {lang.nativeName}
                          </p>
                          <p className={`font-mono text-[10px] truncate ${isActive ? "text-zinc-200 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {lang.name}
                          </p>
                        </div>
                      </div>
                      {isActive && <FontAwesomeIcon icon={faCheck} aria-hidden="true" className="h-3 w-3 text-emerald-400 dark:text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2.5">
              {searchQuery
                ? `Hasil Pencarian (${filteredLanguages.length})`
                : `Semua Bahasa Dunia (${LANGUAGES.length})`}
            </h3>

            {filteredLanguages.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-600 dark:text-zinc-400">
                Bahasa &ldquo;{searchQuery}&rdquo; tidak ditemukan. Coba ketik nama bahasa dalam bahasa Inggris.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pb-2">
                {filteredLanguages.map((lang) => {
                  const isActive = currentLang === lang.code;
                  return (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => applyLanguageSelection(lang.code)}
                      className={`flex min-h-[44px] items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors ${
                        isActive
                          ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-bold"
                          : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-base leading-none" aria-hidden="true">{lang.flag}</span>
                        <div className="truncate">
                          <span className={`text-xs font-semibold block truncate ${isActive ? "text-white dark:text-zinc-950" : "text-zinc-900 dark:text-white"}`}>
                            {lang.nativeName}
                          </span>
                          <span className={`font-mono text-[10px] block truncate ${isActive ? "text-zinc-200 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {lang.name} ({lang.code})
                          </span>
                        </div>
                      </div>
                      {isActive && <FontAwesomeIcon icon={faCheck} aria-hidden="true" className="h-2.5 w-2.5 text-emerald-400 dark:text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 text-center font-mono text-xs text-zinc-600 dark:text-zinc-400">
          Google Translate Engine &bull; {LANGUAGES.length} Bahasa
        </div>
      </dialog>
    </>
  );
}
