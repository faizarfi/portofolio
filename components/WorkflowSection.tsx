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
        <Reveal>
          <SectionHeading
            tag="Metodologi Kerja"
            title="Alur Proses Pengerjaan"
            subtitle="Pendekatan 5 tahap terstruktur untuk memastikan setiap sistem web dibangun dengan standar tinggi dan handal."
          />
        </Reveal>

        {/* ── 5 Symmetrical Clean Cards ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 50} className="h-full">
              <div className="neat-card flex h-full flex-col justify-between p-6 text-left">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <FontAwesomeIcon icon={step.icon} className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-2 text-sm font-bold text-slate-900 sm:text-base">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
