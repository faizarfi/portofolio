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
    title: "Pahami Kebutuhan Nyata",
    description: "Mendiskusikan alur kerja asli dan kendala pengguna secara langsung sebelum mulai menulis kode.",
  },
  {
    icon: faDatabase,
    number: "02",
    title: "Skema Database Rapi",
    description: "Menata struktur tabel MySQL dan relasi Eloquent yang bersih agar sistem efisien dan mudah dirawat.",
  },
  {
    icon: faCode,
    number: "03",
    title: "Bangun Cepat & Iteratif",
    description: "Implementasi fitur utama dengan Laravel / Next.js agar prototype sistem bisa segera diuji coba.",
  },
  {
    icon: faShieldHalved,
    number: "04",
    title: "Validasi & Uji Responsif",
    description: "Memastikan keamanan autentikasi, sanitasi input, dan tampilan nyaman digunakan di layar HP maupun laptop.",
  },
  {
    icon: faHeadset,
    number: "05",
    title: "Dukungan IT & Support",
    description: "Membantu setup server, panduan penggunaan sistem, dan siap mendampingi jika ada kendala teknis.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Prinsip &amp; Alur Kerja"
            title="Pendekatan Kerja &amp; Kolaborasi"
            subtitle="Cara saya bekerja untuk memastikan setiap sistem yang dibangun benar-benar solutif, mudah dipahami pengguna, dan siap digunakan jangka panjang."
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


