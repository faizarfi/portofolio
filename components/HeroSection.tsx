import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDownload,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import { Button, TechBadge } from "@/components/ui";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* ── 2-Column Full-Width Hero Grid ── */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ── Left Column: Intro, Headline, CTAs, Stats (7 cols) ── */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1.5 text-xs font-bold text-blue-800 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span>Tersedia untuk Proyek Web &amp; Bantuan Teknis IT</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-[1.15]">
                Halo, saya <span className="text-blue-600">Faiz Arfian Ilhami</span>. <br />
                Web Developer &amp; IT Helper di Surakarta.
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                Saya merancang dan membangun sistem informasi serta aplikasi web yang fungsional
                menggunakan <strong className="font-semibold text-slate-900">Laravel, PHP, React / Next.js</strong>,
                dan basis data <strong className="font-semibold text-slate-900">MySQL</strong>. Mengutamakan
                kode yang bersih, struktur database yang rapi, dan kemudahan bagi pengguna.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="#contact" size="md">
                <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                Hubungi Saya
              </Button>
              <Button href="#projects" variant="outline" size="md">
                Lihat Portofolio Proyek
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </Button>
              <Button href="/CV%20_Faiz.pdf" download="CV_Faiz_Arfian.pdf" variant="ghost" size="md">
                <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5 text-slate-500" />
                Download CV
              </Button>
            </div>

            {/* Social Links & Tech Stack Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Media Sosial:</span>
                <div className="flex items-center gap-1.5">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Tech Icons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <TechBadge label="Laravel" size="sm" />
                <TechBadge label="PHP" size="sm" />
                <TechBadge label="React" size="sm" />
                <TechBadge label="Next.js" size="sm" />
                <TechBadge label="MySQL" size="sm" />
              </div>
            </div>

            {/* Symmetrical Stats Ribbon */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <p className="text-2xl font-black text-slate-900 sm:text-3xl">2+</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">Thn Pengalaman</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <p className="text-2xl font-black text-blue-600 sm:text-3xl">14+</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">Proyek Selesai</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <p className="text-2xl font-black text-indigo-600 sm:text-3xl">12+</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">Repo GitHub</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs">
                <p className="text-lg font-black text-slate-900 sm:text-xl">Lulus 2026</p>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-500">S1 Informatika UMS</p>
              </div>
            </div>
          </div>

          {/* ── Right Column: Portrait Card with Info Overlays (5 cols) ── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft Blue Ambient Aura */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-200/60 to-indigo-200/40 blur-2xl opacity-70" />

              {/* Main Photo Card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-3 shadow-xl shadow-blue-900/5">
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/foto.jpeg"
                    alt="Faiz Arfian Ilhami"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Location Chip */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md">
                    <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 text-blue-600" />
                    <span>Surakarta, Jawa Tengah</span>
                  </div>
                </div>

                {/* Bottom Highlight Strip */}
                <div className="mt-3 flex items-center justify-between px-2 py-1">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Faiz Arfian Ilhami</p>
                    <p className="text-[11px] text-slate-500">Full Stack &middot; Laravel &middot; React</p>
                  </div>
                  <span className="rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 font-mono text-[10px] font-bold text-blue-800">
                    PHP &bull; JS &bull; TS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
