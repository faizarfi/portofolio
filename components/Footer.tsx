import { NAV_LINKS } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-slate-900">
              Faiz <span className="text-blue-600">Arfian</span> Ilhami
            </p>
            <p className="text-xs text-slate-500">
              Full Stack Web Developer &middot; IT Helper &middot; Surakarta
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-600 sm:text-sm">
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
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 shadow-xs transition-all hover:bg-blue-50 hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faArrowUp} className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
