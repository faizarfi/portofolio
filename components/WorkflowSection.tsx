import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPenRuler,
  faCode,
  faShieldHalved,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";

const STEPS = [
  {
    icon: faComments,
    number: "01",
    title: "Discovery & Analisis",
    description: "Memahami kebutuhan fitur, alur proses pengguna, dan spesifikasi teknis sistem.",
  },
  {
    icon: faPenRuler,
    number: "02",
    title: "Skema DB & Wireframe",
    description: "Merancang relasi database MySQL yang terstruktur dan tata letak UI yang intuitif.",
  },
  {
    icon: faCode,
    number: "03",
    title: "Development & Coding",
    description: "Implementasi backend Laravel/PHP yang aman serta frontend reaktif React/Next.js.",
  },
  {
    icon: faShieldHalved,
    number: "04",
    title: "Testing & Validasi",
    description: "Pengujian fungsionalitas, keamanan otentikasi data, dan efisiensi beban query.",
  },
  {
    icon: faRocket,
    number: "05",
    title: "Deploy & IT Support",
    description: "Peluncuran sistem ke server dan penyediaan dukungan teknis berkelanjutan.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Metodologi Kerja"
            title="Alur Proses Pengerjaan"
            subtitle="Pendekatan 5 tahap terstruktur untuk memastikan setiap sistem web dibangun dengan standar tinggi dan handal."
          />
        </Reveal>

        {/* ── 5 Symmetrical Clean Cards with Staggered Reveals ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 90} direction="up" className="h-full">
              <div className="neat-card group relative flex h-full flex-col justify-between p-6 text-left transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                {/* Step Top Bar */}
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                      <FontAwesomeIcon icon={step.icon} className="h-4 w-4" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-800">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display mb-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Tahap {i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-blue-600" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
