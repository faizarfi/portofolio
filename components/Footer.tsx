import { NAV_LINKS } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <p className="font-display text-sm font-bold text-slate-950 dark:text-white">
              Faiz Arfian Ilhami
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              Full Stack Web Developer &middot; IT Support &middot; Indonesia
            </p>

          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600 dark:text-zinc-400 sm:text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-slate-950 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
              &copy; {new Date().getFullYear()} Faiz Arfian
            </span>
            <a
              href="#hero"
              aria-label="Kembali ke atas"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-950 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowUp} className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


