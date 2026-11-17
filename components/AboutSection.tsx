import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faStar,
  faCode,
  faDatabase,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";
import { ABOUT_EDUCATION, ABOUT_FOCUS_TAGS } from "@/lib/data/about";

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Profil &amp; Filosofi"
            title="Latar Belakang &amp; Rekam Jejak"
            subtitle="Perjalanan saya dalam rekayasa perangkat lunak, dedikasi terhadap arsitektur kode yang terstruktur, integrasi API, serta perancangan basis data yang teruji."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={40} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-6 lg:p-8">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                  <FontAwesomeIcon icon={faLaptopCode} aria-hidden="true" className="h-3.5 w-3.5 text-slate-700 dark:text-zinc-300" />
                  <span>Filosofi &amp; Pendekatan Kerja</span>
                </div>

                <h3 className="font-display text-lg font-black tracking-tight text-slate-950 dark:text-white sm:text-xl">
                  Menghubungkan Logika Sistem yang Kokoh dengan Antarmuka yang Nyaman Digunakan
                </h3>

                <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-sm">
                  <p>
                    Saya adalah <strong className="text-slate-900 dark:text-white font-semibold">Fresh Graduate S1 Teknik Informatika</strong> dari <strong className="text-slate-900 dark:text-white font-semibold">Universitas Muhammadiyah Surakarta</strong> (angkatan 2022, lulus tahun 2026, IPK 3.3). Perjalanan saya di dunia software berakar dari ketertarikan menyusun struktur data terindeks dan menyelesaikan kebutuhan sistematis di instansi maupun organisasi.
                  </p>
                  <p>
                    Dalam rekayasa web, saya fokus pada arsitektur backend <strong className="text-slate-900 dark:text-white font-semibold">Laravel &amp; PHP</strong> serta pemodelan basis data <strong className="text-slate-900 dark:text-white font-semibold">MySQL</strong> agar data terlindungi secara konsisten dan query tetap cepat saat menangani banyak data. Di sisi pengguna, saya memanfaatkan <strong className="text-slate-900 dark:text-white font-semibold">React &amp; Next.js</strong> untuk menyajikan interaksi responsif, navigasi intuitif, dan performa yang optimal.
                  </p>
                  <p>
                    Saya terbiasa membangun fitur secara menyeluruh, mulai dari perancangan skema relasional, logika bisnis di service layer, integrasi REST API, hingga validasi fungsional untuk memastikan reliabilitas aplikasi sebelum digunakan oleh pengguna akhir.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-zinc-800 pt-4">
                  {ABOUT_FOCUS_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/80 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <Reveal delay={80} direction="right">
              <div className="neat-card p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-zinc-400 uppercase">
                  <FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" className="h-3.5 w-3.5 text-slate-700 dark:text-zinc-300" />
                  <span>Pendidikan Formal</span>
                </div>

                <div className="space-y-3">
                  {ABOUT_EDUCATION.map((edu) => (
                    <div
                      key={edu.school}
                      className="rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/60 p-3.5 transition-colors hover:border-slate-300 dark:hover:border-zinc-700"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                          {edu.degree}
                        </p>
                        <span className="shrink-0 rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700 dark:text-zinc-300 shadow-2xs">
                          {edu.year}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-600 dark:text-zinc-400 sm:text-xs font-mono">
                        {edu.school}
                      </p>
                      {edu.note && (
                        <p className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-zinc-200">
                          <FontAwesomeIcon icon={faStar} aria-hidden="true" className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
                          {edu.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} direction="right">
              <div className="neat-card p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/60 p-3.5 transition-colors hover:border-slate-300 dark:hover:border-zinc-700">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                      <FontAwesomeIcon icon={faCode} aria-hidden="true" className="h-3.5 w-3.5" />
                    </div>
                    <p className="font-display text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                      Clean Architecture
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                      Struktur rapi &amp; teruji
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/60 p-3.5 transition-colors hover:border-slate-300 dark:hover:border-zinc-700">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                      <FontAwesomeIcon icon={faDatabase} aria-hidden="true" className="h-3.5 w-3.5" />
                    </div>
                    <p className="font-display text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                      Database &amp; API
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                      Skema relasi &amp; query cepat
                    </p>
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
