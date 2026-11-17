"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faLaptop, faCheck } from "@fortawesome/free-solid-svg-icons";

type ThemeMode = "system" | "dark" | "light";
const emptySubscribe = () => () => {};

function getStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // Ignore storage restriction
  }
  return "system";
}

function resolveMode(mode: ThemeMode): "dark" | "light" {
  if (mode === "dark" || mode === "light") return mode;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() =>
    resolveMode(getStoredMode())
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const apply = (currentMode: ThemeMode) => {
      const next = resolveMode(currentMode);
      setResolvedTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };

    apply(mode);

    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const changeTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    setIsOpen(false);
    try {
      if (newMode === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", newMode);
      }
    } catch {
      // Ignore storage restriction
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Pilih tema tampilan"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 shadow-2xs shrink-0"
      >
        <FontAwesomeIcon icon={faMoon} aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        title={`Tema: ${mode === "system" ? "Mengikuti Sistem" : mode === "dark" ? "Mode Gelap" : "Mode Terang"}`}
        aria-label="Pilih tema tampilan"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 dark:border-zinc-700/80 bg-slate-100/80 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 shadow-2xs transition-colors hover:border-slate-400 dark:hover:border-zinc-500 hover:bg-white dark:hover:bg-zinc-700 hover:text-slate-950 dark:hover:text-white shrink-0"
      >
        {resolvedTheme === "dark" ? (
          <FontAwesomeIcon icon={faMoon} aria-hidden="true" className="h-3.5 w-3.5 text-sky-400" />
        ) : (
          <FontAwesomeIcon icon={faSun} aria-hidden="true" className="h-3.5 w-3.5 text-amber-600" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
            aria-hidden="true"
          />

          <div
            role="menu"
            aria-label="Opsi tema tampilan"
            className="absolute right-0 top-full mt-2 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1.5 shadow-xl font-mono text-xs animate-fade-in"
          >
            <button
              type="button"
              role="menuitemradio"
              aria-checked={mode === "system"}
              onClick={() => changeTheme("system")}
              className={`flex min-h-[38px] w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                mode === "system"
                  ? "bg-slate-100 dark:bg-zinc-800 text-slate-950 dark:text-white font-bold"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLaptop} aria-hidden="true" className="h-3.5 w-3.5 text-slate-600 dark:text-zinc-400" />
                <span>Ikuti Sistem</span>
              </span>
              {mode === "system" && <FontAwesomeIcon icon={faCheck} aria-hidden="true" className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
            </button>

            <button
              type="button"
              role="menuitemradio"
              aria-checked={mode === "light"}
              onClick={() => changeTheme("light")}
              className={`flex min-h-[38px] w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                mode === "light"
                  ? "bg-slate-100 dark:bg-zinc-800 text-slate-950 dark:text-white font-bold"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSun} aria-hidden="true" className="h-3.5 w-3.5 text-amber-600" />
                <span>Mode Terang</span>
              </span>
              {mode === "light" && <FontAwesomeIcon icon={faCheck} aria-hidden="true" className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
            </button>

            <button
              type="button"
              role="menuitemradio"
              aria-checked={mode === "dark"}
              onClick={() => changeTheme("dark")}
              className={`flex min-h-[38px] w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                mode === "dark"
                  ? "bg-slate-100 dark:bg-zinc-800 text-slate-950 dark:text-white font-bold"
                  : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMoon} aria-hidden="true" className="h-3.5 w-3.5 text-sky-500" />
                <span>Mode Gelap</span>
              </span>
              {mode === "dark" && <FontAwesomeIcon icon={faCheck} aria-hidden="true" className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
