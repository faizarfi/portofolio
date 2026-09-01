import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDownload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
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
    <section id="hero" className="w-full px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* ── 2-Column Full-Width Hero Grid ── */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ── Left Column: Intro, Headline, CTAs, Stats (7 cols) ── */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Status Pill with Shimmer and Pulse */}
            <Reveal direction="fade" delay={50}>
              <div className="badge-shimmer inline-flex items-center gap-2.5 self-start rounded-full border border-blue-200/90 bg-blue-50/95 px-4 py-1.5 text-xs font-bold text-blue-900 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
                </span>
                <span>Tersedia untuk Proyek Web &amp; Bantuan Teknis IT</span>
              </div>
            </Reveal>

            {/* Headline with Rich Typography & Dynamic Typewriter Role */}
            <Reveal direction="up" delay={100}>
              <div>
                <h1 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-[1.15]">
                  Halo, saya{" "}
                  <span className="text-gradient-blue">Faiz Arfian Ilhami</span>. <br />
                  <TypewriterRole />
                </h1>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
                  Saya merancang dan membangun sistem informasi serta aplikasi web yang fungsional
                  menggunakan <strong className="font-semibold text-slate-900">Laravel, PHP, React / Next.js</strong>,
                  dan basis data <strong className="font-semibold text-slate-900">MySQL</strong>. Mengutamakan
                  kode yang bersih, struktur database yang rapi, dan kemudahan bagi pengguna.
                </p>
              </div>
            </Reveal>

            {/* CTAs with Direct WhatsApp Action */}
            <Reveal direction="up" delay={150}>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://wa.me/6282327867328?text=Halo%20Faiz%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs shadow-emerald-600/25 transition-all duration-200 hover:bg-emerald-500 hover:shadow-md active:scale-95"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                  <span>WhatsApp: 0823-2786-7328</span>
                </a>

                <Button href="#contact" variant="outline" size="md">
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                  Formulir Pesan
                </Button>

                <Button href="#projects" variant="ghost" size="md">
                  Lihat Proyek
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Button>

                <Button href="/CV%20_Faiz.pdf" download="CV_Faiz_Arfian.pdf" variant="ghost" size="md">
                  <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5 text-slate-500" />
                  Download CV
                </Button>
              </div>
            </Reveal>

            {/* Social Links & Tech Stack Badges */}
            <Reveal direction="up" delay={200}>
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
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
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
            </Reveal>

            {/* Symmetrical Animated Stats Ribbon */}
            <Reveal direction="up" delay={250}>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-4 sm:gap-4">
                <div className="neat-card p-4 text-center">
                  <p className="font-display text-2xl font-black text-slate-900 sm:text-3xl">
                    <AnimatedCounter target={2} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">Thn Pengalaman</p>
                </div>

                <div className="neat-card p-4 text-center">
                  <p className="font-display text-2xl font-black text-blue-600 sm:text-3xl">
                    <AnimatedCounter target={14} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">Proyek Selesai</p>
                </div>

                <div className="neat-card p-4 text-center">
                  <p className="font-display text-2xl font-black text-indigo-600 sm:text-3xl">
                    <AnimatedCounter target={12} suffix="+" />
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">Repo GitHub</p>
                </div>

                <div className="neat-card p-4 text-center">
                  <p className="font-display text-lg font-black text-slate-900 sm:text-xl">
                    Lulus 2026
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">S1 Informatika UMS</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Interactive 3D Photo Card with Floating Badges (5 cols) ── */}
          <div className="lg:col-span-5">
            <Reveal direction="scale" delay={150}>
              <InteractivePhotoCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
