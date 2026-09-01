import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faServer,
  faDatabase,
  faHeadset,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal, TechIcon } from "@/components/ui";

const SKILL_GROUPS = [
  {
    title: "Backend & Server",
    subtitle: "Arsitektur server & API",
    icon: faServer,
    iconColor: "text-blue-700 bg-blue-50 border-blue-200/80",
    badgeColor: "bg-blue-600",
    skills: [
      { name: "PHP", desc: "PHP 8+, OOP, MVC Pattern" },
      { name: "Laravel", desc: "Eloquent, Blade, REST API, Queues" },
      { name: "Python / Django", desc: "Scripting, Web Services, AI API" },
      { name: "RESTful API", desc: "JSON Endpoints, Middleware, Auth" },
    ],
  },
  {
    title: "Frontend Engineering",
    subtitle: "Antarmuka responsif & interaktif",
    icon: faCode,
    iconColor: "text-indigo-700 bg-indigo-50 border-indigo-200/80",
    badgeColor: "bg-indigo-600",
    skills: [
      { name: "React & Next.js", desc: "App Router, SSR, Server Actions" },
      { name: "TypeScript / JS", desc: "Type-safe, ESNext, Moduler" },
      { name: "Tailwind CSS", desc: "Utility-first, Responsif, Rapi" },
      { name: "HTML5 & CSS3", desc: "Struktur Semantik, Aksesibilitas" },
    ],
  },
  {
    title: "Database & Storage",
    subtitle: "Pemodelan & optimasi data",
    icon: faDatabase,
    iconColor: "text-sky-700 bg-sky-50 border-sky-200/80",
    badgeColor: "bg-sky-600",
    skills: [
      { name: "MySQL", desc: "Relasional, Foreign Keys, Indexing" },
      { name: "phpMyAdmin & Navicat", desc: "GUI Database, Hak Akses" },
      { name: "Migrations & Seeding", desc: "Skema Versi, Dummy Data" },
      { name: "Query Optimization", desc: "Normalisasi Data, Efisiensi Join" },
    ],
  },
  {
    title: "IT Helper & Support",
    subtitle: "Pemecahan masalah teknis",
    icon: faHeadset,
    iconColor: "text-cyan-700 bg-cyan-50 border-cyan-200/80",
    badgeColor: "bg-cyan-600",
    skills: [
      { name: "IT Troubleshooting", desc: "Diagnosa hardware, OS, software" },
      { name: "Networking & LAN", desc: "Setup Wi-Fi, Router, IP Address" },
      { name: "Git & GitHub", desc: "Version control, Kolaborasi tim" },
      { name: "Otomasi & Cron", desc: "Notifikasi & rekap terjadwal" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Keahlian Teknis"
            title="Tech Stack &amp; Kemampuan"
            subtitle="Teknologi dan perangkat kerja yang saya gunakan sehari-hari untuk mengembangkan aplikasi web dan memberikan dukungan IT."
          />
        </Reveal>

        {/* ── 4-Column Responsive Grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, idx) => (
            <Reveal key={group.title} delay={idx * 80} direction="up" className="h-full">
              <div className="neat-card group flex h-full flex-col justify-between p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                <div>
                  {/* Header */}
                  <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-xs transition-transform duration-300 group-hover:scale-110 ${group.iconColor}`}
                    >
                      <FontAwesomeIcon icon={group.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900">{group.title}</h3>
                      <p className="text-xs text-slate-500">{group.subtitle}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2.5">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-start justify-between gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-xs"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100">
                            <TechIcon name={skill.name} className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{skill.name}</p>
                            <p className="text-[11px] text-slate-500">{skill.desc}</p>
                          </div>
                        </div>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-blue-600 transition-transform duration-200 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
