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
        <Reveal>
          <SectionHeading
            tag="Tentang Saya"
            title="Latar Belakang &amp; Pengalaman"
            subtitle="Mengenal perjalanan saya sebagai web developer di Surakarta, fokus teknologi, dan komitmen dalam membangun sistem web yang stabil."
          />
        </Reveal>

        {/* ── 2-Column Full-Width Grid ── */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Personal Narrative (7 cols) */}
          <Reveal delay={60} className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
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

                {/* Focus Badges */}
                <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                  {ABOUT_FOCUS_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
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
            <Reveal delay={100}>
              <div className="neat-card p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
                  <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4" />
                  Pendidikan Formal
                </div>

                <div className="space-y-4">
                  {ABOUT_EDUCATION.map((edu) => (
                    <div
                      key={edu.school}
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors hover:bg-blue-50/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-slate-900 sm:text-base">{edu.degree}</p>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-800">
                          {edu.year}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{edu.school}</p>
                      {edu.note && (
                        <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200/60 px-2.5 py-1 text-xs font-bold text-amber-800">
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
            <Reveal delay={140}>
              <div className="neat-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <FontAwesomeIcon icon={faCode} className="mb-2 h-4 w-4 text-blue-600" />
                    <p className="text-sm font-bold text-slate-900">Clean Code</p>
                    <p className="mt-0.5 text-xs text-slate-500">Terstruktur &amp; Mudah Dipelihara</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <FontAwesomeIcon icon={faHeadset} className="mb-2 h-4 w-4 text-indigo-600" />
                    <p className="text-sm font-bold text-slate-900">IT Helper</p>
                    <p className="mt-0.5 text-xs text-slate-500">Dukungan Teknis Siap Bantu</p>
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
