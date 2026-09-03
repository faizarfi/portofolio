"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
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
        if (el && el.getBoundingClientRect().top <= 140) {
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
      <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border px-4 py-2 pointer-events-auto transition-all duration-300 ${
            scrolled
              ? "bg-white/95 dark:bg-zinc-900/95 border-slate-300/80 dark:border-zinc-700/80 shadow-md backdrop-blur-md"
              : "bg-white/85 dark:bg-zinc-900/85 border-slate-200/90 dark:border-zinc-800/90 shadow-xs backdrop-blur-md"
          }`}
        >
          {/* ── Brand ── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-slate-200/80 dark:ring-zinc-700/80 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/foto.jpeg"
                alt="Faiz Arfian Ilhami"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-sm font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                Faiz Arfian
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 font-medium leading-tight hidden xs:inline">
                Sistem Informasi
              </span>
            </div>
          </Link>

          {/* ── Center Navigation Links ── */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    active
                      ? "bg-slate-950 text-white shadow-2xs dark:bg-white dark:text-slate-950 font-bold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Action Buttons ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Multi-Language Selector */}
            <LanguageSelector />

            {/* Dark / Light / System Theme Toggle */}
            <ThemeToggle />

            {/* GitHub */}
            <a
              href="https://github.com/faizarfi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            </a>

            {/* Kontak Button */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-slate-950 dark:bg-white px-3.5 py-1.5 text-xs font-bold text-white dark:text-slate-950 shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-105 shrink-0"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3" />
              <span>Kontak</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 md:hidden shrink-0"
            >
              <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-3.5 w-3.5" />
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
          className={`absolute top-0 right-0 flex h-full w-72 max-w-[85vw] flex-col bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out border-l border-slate-200 dark:border-zinc-800 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-zinc-800 px-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
                Menu Navigasi
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup menu samping"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-slate-900 text-white font-bold dark:bg-white dark:text-slate-950"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 dark:border-zinc-800 p-4">
            <a
              href="mailto:faizarfianilhami020204@gmail.com"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-white py-2.5 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
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
