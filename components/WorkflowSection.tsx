import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faDatabase,
  faCode,
  faShieldHalved,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";

const PRINCIPLES = [
  {
    icon: faComments,
    number: "01",
    title: "Eksplorasi Kebutuhan",
    description: "Menganalisis proses bisnis pengguna dan merumuskan spesifikasi teknis yang realistis.",
  },
  {
    icon: faDatabase,
    number: "02",
    title: "Arsitektur Basis Data",
    description: "Menyusun skema database terindeks dan relasi entitas yang terstruktur untuk stabilitas jangka panjang.",
  },
  {
    icon: faCode,
    number: "03",
    title: "Pengembangan Modular",
    description: "Membangun logika inti aplikasi secara bertahap dengan struktur kode yang bersih dan mudah dirawat.",
  },
  {
    icon: faShieldHalved,
    number: "04",
    title: "Pengujian & Validasi",
    description: "Memastikan keamanan autentikasi, sanitasi input, performa responsif, dan kenyamanan pengguna.",
  },
  {
    icon: faHeadset,
    number: "05",
    title: "Implementasi & Support",
    description: "Konfigurasi server produksi, penyusunan dokumentasi teknis, serta pendampingan operasional pengguna.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Alur Kerja &amp; Metodologi"
            title="Pendekatan Rekayasa Sistem"
            subtitle="Standar proses yang saya terapkan mulai dari pemetaan kebutuhan bisnis, perancangan skema data, hingga implementasi dan pendampingan teknis."
          />
        </Reveal>

        {/* ── 5 Symmetrical Clean Cards ── */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((step, i) => (
            <Reveal key={step.number} delay={i * 60} direction="up" className="h-full">
              <div className="neat-card flex h-full flex-col justify-between p-4 sm:p-5 text-left">
                {/* Step Top Bar */}
                <div>
                  <div className="mb-3.5 flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                      <FontAwesomeIcon icon={step.icon} className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-zinc-500">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display mb-2 text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-300">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono font-medium text-slate-400 dark:text-zinc-500">
                  <span>Tahap {i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-zinc-600" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


