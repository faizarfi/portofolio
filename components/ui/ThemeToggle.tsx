"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faLaptop, faCheck } from "@fortawesome/free-solid-svg-icons";

type ThemeMode = "system" | "dark" | "light";

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read initial preference & set up system media query listener
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    const initialMode: ThemeMode = stored === "dark" || stored === "light" ? stored : "system";
    setMode(initialMode);

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (currentMode: ThemeMode) => {
      let isDark = false;
      if (currentMode === "dark") {
        isDark = true;
      } else if (currentMode === "light") {
        isDark = false;
      } else {
        // "system" -> follow user phone/OS preference
        isDark = media.matches;
      }

      setResolvedTheme(isDark ? "dark" : "light");

      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme(initialMode);

    // Listen for real-time phone theme changes (e.g. sunset automatic switch)
    const handleSystemChange = () => {
      const currentStored = localStorage.getItem("theme") as ThemeMode | null;
      if (!currentStored || currentStored === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, []);

  const changeTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    setIsOpen(false);

    if (newMode === "system") {
      localStorage.removeItem("theme");
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      localStorage.setItem("theme", newMode);
      setResolvedTheme(newMode);
      if (newMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Pilih Tema"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs"
      >
        <FontAwesomeIcon icon={faMoon} className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <div className="relative">
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={`Tema: ${mode === "system" ? "Mengikuti HP (Otomatis)" : mode === "dark" ? "Mode Gelap" : "Mode Terang"}`}
        aria-label="Pilih Tema Tampilan"
        className="group flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs transition-all hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white"
      >
        {resolvedTheme === "dark" ? (
          <FontAwesomeIcon icon={faMoon} className="h-3.5 w-3.5 text-blue-400" />
        ) : (
          <FontAwesomeIcon icon={faSun} className="h-3.5 w-3.5 text-amber-500" />
        )}
      </button>

      {/* ── Dropdown Menu ── */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
            aria-hidden="true"
          />

          <div className="absolute right-0 top-full mt-2 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl font-mono text-xs animate-fade-in">
            <button
              onClick={() => changeTheme("system")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                mode === "system"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLaptop} className="h-3.5 w-3.5 text-slate-500" />
                <span>Ikuti HP / Sistem</span>
              </div>
              {mode === "system" && <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-emerald-500" />}
            </button>

            <button
              onClick={() => changeTheme("light")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                mode === "light"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSun} className="h-3.5 w-3.5 text-amber-500" />
                <span>Mode Terang (Light)</span>
              </div>
              {mode === "light" && <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-emerald-500" />}
            </button>

            <button
              onClick={() => changeTheme("dark")}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                mode === "dark"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMoon} className="h-3.5 w-3.5 text-blue-400" />
                <span>Mode Gelap (Dark)</span>
              </div>
              {mode === "dark" && <FontAwesomeIcon icon={faCheck} className="h-3 w-3 text-emerald-500" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
