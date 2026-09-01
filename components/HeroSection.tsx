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
  TypewriterRole,
} from "@/components/ui";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full px-4 pt-2 pb-6 sm:px-6 lg:px-8 lg:pt-3 lg:pb-8">
      <div className="mx-auto max-w-7xl">
        {/* ── 2-Column Full-Width Hero Grid ── */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ── Left Column: Intro, Headline, CTAs, Stats (7 cols) ── */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {/* Status Pill with Shimmer and Pulse */}
            <Reveal direction="fade" delay={50}>
              <div className="badge-shimmer inline-flex items-center gap-2 self-start rounded-full border border-blue-200/90 bg-blue-50/95 px-3.5 py-1 text-xs font-bold text-blue-900 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
                <span>Tersedia untuk Proyek Web &amp; Bantuan Teknis IT</span>
              </div>
            </Reveal>

            {/* Headline with Rich Typography & Dynamic Typewriter Role */}
            <Reveal direction="up" delay={80}>
              <div>
                <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-[1.15]">
                  Halo, saya{" "}
                  <span className="text-gradient-blue">Faiz Arfian Ilhami</span>. <br />
                  <TypewriterRole />
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Saya merancang dan membangun sistem informasi serta aplikasi web yang fungsional
                  menggunakan <strong className="font-semibold text-slate-900">Laravel, PHP, React / Next.js</strong>,
                  dan basis data <strong className="font-semibold text-slate-900">MySQL</strong>. Mengutamakan
                  kode yang bersih, struktur database yang rapi, dan kemudahan bagi pengguna.
                </p>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal direction="up" delay={120}>
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <Button href="#contact" size="md">
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                  Hubungi Saya
                </Button>

                <Button href="#projects" variant="outline" size="md">
                  Lihat Portofolio
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Button>

                <Button href="/CV%20_Faiz.pdf" download="CV_Faiz_Arfian.pdf" variant="ghost" size="md">
                  <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5 text-slate-500" />
                  Download CV
                </Button>
              </div>
            </Reveal>

            {/* Social Links & Tech Stack Badges */}
            <Reveal direction="up" delay={160}>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
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
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
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
            </Reveal>

            {/* Symmetrical Animated Stats Ribbon */}
            <Reveal direction="up" delay={200}>
              <div className="mt-2 grid grid-cols-2 gap-2.5 border-t border-slate-200/80 pt-4 sm:grid-cols-4 sm:gap-3">
                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-xl font-black text-slate-900 sm:text-2xl">
                    <AnimatedCounter target={2} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">Thn Pengalaman</p>
                </div>

                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-xl font-black text-blue-600 sm:text-2xl">
                    <AnimatedCounter target={14} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">Proyek Selesai</p>
                </div>

                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-xl font-black text-indigo-600 sm:text-2xl">
                    <AnimatedCounter target={12} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">Repo GitHub</p>
                </div>

                <div className="neat-card p-3 text-center sm:p-3.5">
                  <p className="font-display text-base font-black text-slate-900 sm:text-lg">
                    Lulus 2026
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-500">S1 Informatika UMS</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Interactive 3D Photo Card with Floating Badges (5 cols) ── */}
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
