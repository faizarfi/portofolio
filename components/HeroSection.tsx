import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDownload,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import {
  Button,
  TechBadge,
  AnimatedCounter,
  Reveal,
  InteractivePhotoCard,
  TypewriterRole,
} from "@/components/ui";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pt-6 lg:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* ── 2-Column Full-Width Hero Grid ── */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── Left Column: Intro, Headline, CTAs, Stats (7 cols) ── */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {/* Status Tag */}
            <Reveal direction="fade" delay={50}>
              <div className="inline-flex items-center gap-2 self-start rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-mono font-medium text-slate-700 dark:text-zinc-200 shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="inline-flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faLocationDot} className="h-2.5 w-2.5 text-slate-500 dark:text-zinc-400" />
                  <span>Indonesia &mdash; Terbuka untuk Kerja Sama Proyek &amp; IT Support (Remote / On-Site)</span>
                </span>
              </div>
            </Reveal>

            {/* Headline with Clean Bold Typography */}
            <Reveal direction="up" delay={80}>
              <div>
                <h1 className="font-display text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-[1.12]">
                  Halo, saya <span className="text-slate-900 dark:text-white underline decoration-slate-300 dark:decoration-zinc-600 decoration-2 underline-offset-4">Faiz Arfian Ilhami</span>. <br />
                  <TypewriterRole />
                </h1>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-base">
                  Saya membantu <strong className="font-semibold text-slate-900 dark:text-white">kampus, instansi, dan UMKM</strong>
                  membangun sistem informasi, dashboard operasional, dan aplikasi web yang lebih mudah digunakan.
                  Fokus utama saya adalah <strong className="font-semibold text-slate-900 dark:text-white">Laravel, React / Next.js, dan MySQL</strong>;
                  dukungan teknis IT tersedia sebagai layanan tambahan, baik remote maupun on-site.
                </p>
              </div>
            </Reveal>


            {/* CTAs */}
            <Reveal direction="up" delay={120}>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
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

            {/* Social Links & Tech Stack Badges */}
            <Reveal direction="up" delay={160}>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200/80 dark:border-zinc-800/80 mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 uppercase">Saluran:</span>
                  <div className="flex items-center gap-1.5">
                    {SOCIALS.map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 shadow-2xs transition-all duration-150 hover:border-slate-400 dark:hover:border-zinc-600 hover:text-slate-950 dark:hover:text-white"
                      >
                        <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
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

            {/* Symmetrical Clean Stats Ribbon */}
            <Reveal direction="up" delay={200}>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                    <AnimatedCounter target={2} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-zinc-400 font-mono">Thn Pengalaman</p>
                </div>

                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                    <AnimatedCounter target={14} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-zinc-400 font-mono">Proyek &amp; Repo</p>
                </div>

                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                    <AnimatedCounter target={5} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-zinc-400 font-mono">Sistem Produksi</p>
                </div>

                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-base font-black text-slate-900 dark:text-white sm:text-lg">
                    Lulus 2026
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-zinc-400 font-mono">S1 Informatika UMS</p>
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

