import { NAV_LINKS } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200/80 bg-white">
      {/* Subtle Gradient Shimmer Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <p className="font-display text-sm font-bold text-slate-900">
              Faiz <span className="text-blue-600">Arfian</span> Ilhami
            </p>
            <p className="text-xs text-slate-500">
              Full Stack Web Developer &middot; IT Helper &middot; Surakarta
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600 sm:text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Faiz Arfian
            </span>
            <a
              href="#hero"
              aria-label="Kembali ke atas"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
            >
              <FontAwesomeIcon icon={faArrowUp} className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
