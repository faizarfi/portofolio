import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faStar,
  faCode,
  faHeadset,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";
import { ABOUT_EDUCATION, ABOUT_FOCUS_TAGS } from "@/lib/data/about";

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Tentang Saya"
            title="Latar Belakang &amp; Rekam Jejak"
            subtitle="Mengenal perjalanan saya sebagai web developer di Surakarta, dedikasi pada kode yang rapi, dan komitmen memberikan dukungan teknis IT yang solutif."
          />
        </Reveal>

        {/* ── 2-Column Full-Width Grid ── */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Left Column: Personal Narrative (7 cols) */}
          <Reveal delay={60} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-6 lg:p-8">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  <FontAwesomeIcon icon={faLaptopCode} className="h-3.5 w-3.5 text-slate-700" />
                  <span>Filosofi &amp; Pendekatan Kerja</span>
                </div>

                <h3 className="font-display text-lg font-black tracking-tight text-slate-950 sm:text-xl">
                  Menghubungkan Logika Sistem yang Kokoh dengan Antarmuka yang Nyaman Digunakan
                </h3>

                <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  <p>
                    Saya adalah <strong className="text-slate-900 font-semibold">Fresh Graduate S1 Teknik Informatika</strong> dari <strong className="text-slate-900 font-semibold">Universitas Muhammadiyah Surakarta</strong> (angkatan 2022, lulus tahun 2026, IPK 3.3). Perjalanan saya di dunia software dimulai dari ketertarikan menyusun struktur data dan memecahkan kebutuhan administrasi nyata di lingkungan kampus.
                  </p>
                  <p>
                    Dalam pengembangan web, saya fokus pada arsitektur backend <strong className="text-slate-900 font-semibold">Laravel &amp; PHP</strong> serta optimasi basis data <strong className="text-slate-900 font-semibold">MySQL</strong> agar data tetap aman dan query berjalan cepat saat beban bertambah. Di sisi antarmuka, saya menggunakan <strong className="text-slate-900 font-semibold">React &amp; Next.js</strong> untuk menyajikan interaksi responsif yang ringan diakses pengguna.
                  </p>
                  <p>
                    Selain coding sistem, peran saya sebagai <strong className="text-slate-900 font-semibold">IT Support &amp; Helper</strong> membuat saya terbiasa turun langsung menangani perbaikan hardware/software, setup jaringan LAN, hingga mendampingi pengguna agar aplikasi yang dibangun dapat beroperasi dengan lancar.
                  </p>
                </div>

                {/* Focus Badges */}
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
                  {ABOUT_FOCUS_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Formal Education & Mindset (5 cols) */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* Education Card */}
            <Reveal delay={100} direction="right">
              <div className="neat-card p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                  <FontAwesomeIcon icon={faGraduationCap} className="h-3.5 w-3.5 text-slate-700" />
                  <span>Pendidikan Formal</span>
                </div>

                <div className="space-y-3">
                  {ABOUT_EDUCATION.map((edu) => (
                    <div
                      key={edu.school}
                      className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-300"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-xs font-bold text-slate-900 sm:text-sm">{edu.degree}</p>
                        <span className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700 shadow-2xs">
                          {edu.year}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs font-mono">{edu.school}</p>
                      {edu.note && (
                        <p className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-800">
                          <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5 text-amber-500" />
                          {edu.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Mindset Card */}
            <Reveal delay={140} direction="right">
              <div className="neat-card p-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-300">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <FontAwesomeIcon icon={faCode} className="h-3.5 w-3.5" />
                    </div>
                    <p className="font-display text-xs font-bold text-slate-900 sm:text-sm">Clean Architecture</p>
                    <p className="mt-0.5 text-[11px] text-slate-500 font-mono">Struktur rapi &amp; teruji</p>
                  </div>
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition-colors hover:border-slate-300">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <FontAwesomeIcon icon={faHeadset} className="h-3.5 w-3.5" />
                    </div>
                    <p className="font-display text-xs font-bold text-slate-900 sm:text-sm">Dukungan IT Tanggap</p>
                    <p className="mt-0.5 text-[11px] text-slate-500 font-mono">Solutif &amp; komunikatif</p>
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


