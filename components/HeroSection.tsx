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
  AnimatedCounter,
  Reveal,
  InteractivePhotoCard,
} from "@/components/ui";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-6 lg:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* ── 2-Column Full-Width Hero Grid ── */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── Left Column: Intro, Headline, CTAs, Stats (7 cols) ── */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Headline with Clean Executive Typography */}
            <Reveal direction="up" delay={80}>
              <div className="space-y-3.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 px-3 py-1 font-mono text-[11px] font-medium text-slate-600 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Surakarta, Indonesia &bull; Terbuka untuk Proyek &amp; IT Support</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.14]">
                  Faiz Arfian Ilhami
                </h1>

                <p className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-slate-600 dark:text-zinc-400">
                  Software Engineer &bull; Full Stack Web Developer
                </p>

                <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-base">
                  Berpengalaman merancang sistem informasi institusi, dashboard operasional, serta aplikasi web modern. Berfokus pada keandalan arsitektur basis data <strong className="font-semibold text-slate-900 dark:text-white">Laravel &amp; MySQL</strong> serta antarmuka reaktif <strong className="font-semibold text-slate-900 dark:text-white">React &amp; Next.js</strong> dengan standar kode yang terstruktur.
                </p>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal direction="up" delay={120}>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="#contact" size="md">
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                  Hubungi Saya
                </Button>

                <Button href="#projects" variant="outline" size="md">
                  Lihat Portofolio
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Button>

                <Button href="/CV%20_Faiz.pdf" download="CV_Faiz_Arfian.pdf" variant="ghost" size="md">
                  <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5 text-slate-500 dark:text-zinc-400" />
                  Download CV
                </Button>
              </div>
            </Reveal>

            {/* Minimalist Seamless Stat Strip (Menyatu dengan Latar Belakang) */}
            <Reveal direction="up" delay={160}>
              <div className="border-y border-slate-200/80 dark:border-zinc-800/80 py-4 sm:py-5">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      <AnimatedCounter target={2} suffix="+" />
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      Tahun Pengalaman
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      <AnimatedCounter target={14} suffix="+" />
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      Proyek &amp; Repo
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      <AnimatedCounter target={5} suffix="+" />
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      Sistem Produksi
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      2026
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      S1 Informatika UMS
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Social Links & Tech Stack Badges */}
            <Reveal direction="up" delay={200}>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Saluran:</span>
                  <div className="flex items-center gap-1.5">
                    {SOCIALS.map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 shadow-2xs transition-all duration-150 hover:border-slate-400 dark:hover:border-zinc-600 hover:text-slate-950 dark:hover:text-white"
                      >
                        <FontAwesomeIcon icon={icon} className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Tech Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <TechBadge label="Laravel" size="sm" />
                  <TechBadge label="PHP" size="sm" />
                  <TechBadge label="React" size="sm" />
                  <TechBadge label="Next.js" size="sm" />
                  <TechBadge label="MySQL" size="sm" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Studio Photo Frame (5 cols) ── */}
          <div className="lg:col-span-5">
            <Reveal direction="scale" delay={120}>
              <InteractivePhotoCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

