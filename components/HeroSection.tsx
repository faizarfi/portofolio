import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDownload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import {
  Button,
  TechBadge,
  InteractivePhotoCard,
} from "@/components/ui";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full px-4 pt-6 pb-10 sm:px-6 lg:px-8 lg:pt-10 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Headline, Summary, CTAs, Facts */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="space-y-3.5">
              <p className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-slate-600 dark:text-zinc-400">
                Software Engineer &bull; Full Stack Web Developer
              </p>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.14]">
                Faiz Arfian Ilhami
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-base">
                Merancang sistem informasi institusi, otomasi layanan, dan aplikasi web modern. Berfokus pada keandalan arsitektur basis data{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Laravel &amp; MySQL
                </strong>{" "}
                serta antarmuka reaktif{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  React &amp; Next.js
                </strong>{" "}
                yang teruji di lingkungan produksi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="#contact" size="md">
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="h-3.5 w-3.5" />
                Hubungi Saya
              </Button>

              <Button href="#projects" variant="outline" size="md">
                Lihat Proyek Pilihan
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="h-3 w-3" />
              </Button>

              <Button href="/CV_Faiz_Arfian.pdf" download="CV_Faiz_Arfian.pdf" variant="ghost" size="md">
                <FontAwesomeIcon icon={faDownload} aria-hidden="true" className="h-3.5 w-3.5 text-slate-600 dark:text-zinc-300" />
                Unduh CV
              </Button>
            </div>

            <div className="border-y border-slate-200/80 dark:border-zinc-800/80 py-4 sm:py-5">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    2+
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                    Tahun Pengalaman
                  </p>
                </div>

                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    14+
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                    Repositori Publik
                  </p>
                </div>

                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    5+
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                    Sistem Produksi
                  </p>
                </div>

                <div>
                  <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                    2026
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-medium text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                    S1 Informatika UMS
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                  Saluran:
                </span>
                <div className="flex items-center gap-2">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 shadow-2xs transition-colors duration-150 hover:border-slate-400 dark:hover:border-zinc-600 hover:text-slate-950 dark:hover:text-white"
                    >
                      <FontAwesomeIcon icon={icon} aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <TechBadge label="Laravel" size="sm" />
                <TechBadge label="PHP" size="sm" />
                <TechBadge label="React" size="sm" />
                <TechBadge label="Next.js" size="sm" />
                <TechBadge label="MySQL" size="sm" />
                <TechBadge label="Git" size="sm" />
              </div>
            </div>
          </div>

          {/* Right Column: Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractivePhotoCard />
          </div>
        </div>
      </div>
    </section>
  );
}
