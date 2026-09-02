"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { NAV_LINKS } from "@/lib/data";
import { LanguageSelector, ThemeToggle } from "@/components/ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollActive, setScrollActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;
      const anchorLinks = NAV_LINKS.filter((l) => l.href.startsWith("/#"));
      const ids = anchorLinks.map((l) => l.href.slice(2));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setScrollActive(`/#${id}`);
          return;
        }
      }
      setScrollActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const openTerminal = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
    setOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && scrollActive === href;
    if (href === "/projects") {
      return (
        pathname === "/projects" ||
        pathname.startsWith("/projects/") ||
        (pathname === "/" && scrollActive === "/#projects")
      );
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-3.5 pt-3 pb-2 transition-all duration-300 sm:px-6 lg:px-8">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 transition-all duration-300 ${
            scrolled ? "py-1" : "py-0"
          }`}
        >
          {/* ── Brand ── */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-2xs transition-colors hover:border-slate-400 shrink-0"
          >
            <div className="relative h-6 w-6 sm:h-7 sm:w-7 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
              <Image
                src="/foto.jpeg"
                alt="Faiz Arfian Ilhami"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-xs font-bold text-slate-950 dark:text-white whitespace-nowrap leading-tight">
                Faiz Arfian
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap leading-tight hidden xs:inline">
                Web Dev &middot; IT Support
              </span>
            </div>
          </Link>

          {/* ── Navigation Links ── */}
          <nav
            className="hidden items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-2xs md:flex"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Action Buttons ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Global Multi-Language Selector */}
            <LanguageSelector />

            {/* Dark / Light / System Theme Toggle */}
            <ThemeToggle />

            {/* Terminal Quick Button */}
            <button
              onClick={openTerminal}
              aria-label="Buka Terminal / Command Palette"
              title="Buka Terminal (Ctrl+K)"
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900 px-2.5 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-2xs transition-colors hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white sm:flex shrink-0"
            >
              <FontAwesomeIcon icon={faTerminal} className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Ctrl K</span>
            </button>

            <a
              href="https://github.com/faizarfi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs transition-colors hover:border-slate-400 hover:text-slate-950 dark:hover:text-white sm:flex shrink-0"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-white border border-slate-800 dark:border-slate-200 px-3.5 py-2 text-xs font-semibold text-white dark:text-slate-950 shadow-xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100 sm:px-4 shrink-0"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
              <span>Kontak</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 md:hidden shrink-0"
            >
              <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <div
        id="mobile-drawer"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          open ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-300 ease-out border-l border-slate-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-900" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
                Menu Navigasi
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup menu samping"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {/* Mobile Terminal Trigger */}
            <button
              onClick={openTerminal}
              className="flex items-center justify-between rounded-lg border border-slate-300 bg-slate-900 px-4 py-2.5 text-xs font-mono font-bold text-white mb-2 shadow-2xs"
            >
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTerminal} className="h-3.5 w-3.5 text-emerald-400" />
                <span>Developer Terminal</span>
              </span>
              <span className="text-[10px] text-slate-400">Ctrl K</span>
            </button>


            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-slate-900 text-white font-bold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-4 space-y-2">
            <a
              href="https://wa.me/6282327867328?text=Halo%20Faiz%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
              Chat via WhatsApp
            </a>

            <a
              href="mailto:faizarfianilhami020204@gmail.com"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-slate-800"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}



