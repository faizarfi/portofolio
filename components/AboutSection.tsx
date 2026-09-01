import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faStar,
  faCode,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";
import { ABOUT_EDUCATION, ABOUT_FOCUS_TAGS } from "@/lib/data/about";

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Tentang Saya"
            title="Latar Belakang &amp; Pengalaman"
            subtitle="Mengenal perjalanan saya sebagai web developer di Surakarta, fokus teknologi, dan komitmen dalam membangun sistem web yang stabil."
          />
        </Reveal>

        {/* ── 2-Column Full-Width Grid ── */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Personal Narrative (7 cols) */}
          <Reveal delay={80} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <h3 className="font-display text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  Membangun Solusi Berbasis Kode yang Bersih dan Fungsional
                </h3>

                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  <p>
                    Saya adalah <strong className="text-slate-900 font-semibold">Fresh Graduate S1 Teknik Informatika</strong> dari <strong className="text-slate-900 font-semibold">Universitas Muhammadiyah Surakarta</strong> (angkatan 2022, lulus tahun 2026) dengan IPK 3.3, berfokus pada rekayasa sistem informasi web dan pemecahan masalah teknologi informasi.
                  </p>
                  <p>
                    Selama lebih dari 2 tahun berkecimpung dalam pengembangan web, saya terbiasa membangun backend dengan <strong className="text-blue-700 font-semibold">Laravel &amp; PHP</strong>, merancang relasi tabel dan optimasi query di <strong className="text-blue-700 font-semibold">MySQL</strong>, serta menyusun antarmuka yang cepat dan responsif menggunakan <strong className="text-blue-700 font-semibold">React &amp; Next.js</strong>.
                  </p>
                  <p>
                    Sebagai <strong className="text-slate-900 font-semibold">IT Helper</strong>, saya juga berpengalaman menangani instalasi software, perbaikan hardware dasar, konfigurasi jaringan lokal, serta pembuatan skrip otomasi untuk mempermudah pekerjaan sehari-hari.
                  </p>
                </div>

                {/* Focus Badges with interactive hover */}
                <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                  {ABOUT_FOCUS_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Formal Education & Mindset (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Education Card */}
            <Reveal delay={120} direction="right">
              <div className="neat-card p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FontAwesomeIcon icon={faGraduationCap} className="h-3.5 w-3.5" />
                  </div>
                  <span>Pendidikan Formal</span>
                </div>

                <div className="space-y-4">
                  {ABOUT_EDUCATION.map((edu) => (
                    <div
                      key={edu.school}
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-sm font-bold text-slate-900 sm:text-base">{edu.degree}</p>
                        <span className="rounded-full bg-blue-100/90 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-800 shadow-xs">
                          {edu.year}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{edu.school}</p>
                      {edu.note && (
                        <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-amber-200/80 bg-amber-50/90 px-2.5 py-1 text-xs font-bold text-amber-800">
                          <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-amber-500" />
                          {edu.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Mindset Card */}
            <Reveal delay={160} direction="right">
              <div className="neat-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40">
                    <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100/80 text-blue-600 transition-transform duration-200 group-hover:scale-110">
                      <FontAwesomeIcon icon={faCode} className="h-4 w-4" />
                    </div>
                    <p className="font-display text-sm font-bold text-slate-900">Clean Code</p>
                    <p className="mt-0.5 text-xs text-slate-500">Terstruktur &amp; Rapi</p>
                  </div>
                  <div className="group rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/40">
                    <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100/80 text-indigo-600 transition-transform duration-200 group-hover:scale-110">
                      <FontAwesomeIcon icon={faHeadset} className="h-4 w-4" />
                    </div>
                    <p className="font-display text-sm font-bold text-slate-900">IT Helper</p>
                    <p className="mt-0.5 text-xs text-slate-500">Dukungan Cepat</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
