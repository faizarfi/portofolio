import { SectionHeading, Reveal } from "@/components/ui";

interface TechItem {
  name: string;
  version?: string;
  desc: string;
  url?: string;
  iconSvg: React.ReactNode;
}

interface TechCategory {
  number: string;
  title: string;
  subtitle: string;
  items: TechItem[];
}

const CORE_TECH_STACK: TechCategory[] = [
  {
    number: "01",
    title: "Backend & Basis Data",
    subtitle: "Arsitektur server, relasi data & API",
    items: [
      {
        name: "Laravel",
        version: "11.x",
        desc: "Framework utama, Eloquent ORM, Scheduler & Auth",
        url: "https://laravel.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.5 8.2l-9-5.2c-.3-.2-.7-.2-1 0l-9 5.2c-.3.2-.5.5-.5.8v10.5c0 .3.2.7.5.8l9 5.2c.2.1.3.1.5.1s.3 0 .5-.1l9-5.2c.3-.2.5-.5.5-.8V9c0-.3-.2-.6-.5-.8zM12 4.2l7.4 4.3-3.2 1.9-7.4-4.3 3.2-1.9zm-8 5.4l7 4v7.7l-7-4V9.6zm9 11.7v-7.7l3-1.7v3.2c0 .3.2.6.5.8.3.1.7.1.9-.1l2.5-1.4v2.9l-6.9 4zm3.9-6.8l-3-1.7 7.2-4.1 3 1.7-7.2 4.1z" />
            </svg>
          </div>
        ),
      },
      {
        name: "PHP Modern",
        version: "8.2+",
        desc: "OOP, MVC pattern, sanitasi input & integrasi modular",
        url: "https://www.php.net",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
        ),
      },
      {
        name: "MySQL",
        version: "8.0",
        desc: "Schema relasional, query indexing & phpMyAdmin",
        url: "https://www.mysql.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm6 12c0 .66-2.13 2-6 2s-6-1.34-6-2v-2.17c1.47.74 3.61 1.17 6 1.17s4.53-.43 6-1.17V17zm0-4c0 .66-2.13 2-6 2s-6-1.34-6-2v-2.17c1.47.74 3.61 1.17 6 1.17s4.53-.43 6-1.17V13z" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    number: "02",
    title: "Frontend & Antarmuka",
    subtitle: "Desain responsif, interaktif & cepat",
    items: [
      {
        name: "Next.js & React",
        version: "16.2 / 19",
        desc: "App Router, SSR, Server Components & Dynamic State",
        url: "https://nextjs.org",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-zinc-800 dark:text-white">
            <svg className="h-4 w-4" viewBox="0 0 180 180" fill="none">
              <mask id="next-core-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
                <circle cx="90" cy="90" r="90" fill="black" />
              </mask>
              <g mask="url(#next-core-mask)">
                <circle cx="90" cy="90" r="90" fill="black" />
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                <rect x="115" y="54" width="12" height="72" fill="white" />
              </g>
            </svg>
          </div>
        ),
      },
      {
        name: "Tailwind CSS",
        version: "v4.2",
        desc: "Utility-first, tata letak mobile-first & animasi halus",
        url: "https://tailwindcss.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
            </svg>
          </div>
        ),
      },
      {
        name: "TypeScript",
        version: "5.x",
        desc: "Type safety, maintainable code & minim runtime bug",
        url: "https://www.typescriptlang.org",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-mono font-bold text-[11px]">
            TS
          </div>
        ),
      },
    ],
  },
  {
    number: "03",
    title: "Version Control & IT Support",
    subtitle: "Dukungan teknis hardware & workflow tim",
    items: [
      {
        name: "Git & GitHub",
        desc: "Version Control, branching, PR & open source repos",
        url: "https://github.com/faizarfi",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.6 10.9L13.1 2.4c-.5-.5-1.4-.5-1.9 0L9.3 4.3l2.4 2.4c.6-.2 1.3 0 1.7.4.5.5.6 1.2.4 1.8l2.3 2.3c.6-.2 1.3 0 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.7-1.3-.4-1.9L12.4 10v4.2c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.5-.4.8-.5V9.9c-.3-.1-.5-.3-.8-.5-.5-.5-.7-1.3-.4-1.9L7.5 5.1 2.4 10.2c-.5.5-.5 1.4 0 1.9l8.5 8.5c.5.5 1.4.5 1.9 0l8.8-8.8c.5-.5.5-1.4 0-1.9z" />
            </svg>
          </div>
        ),
      },
      {
        name: "REST API & Postman",
        desc: "Perancangan endpoint, validasi JSON & pengujian API",
        url: "https://www.postman.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 16l4-4-4-4" />
              <path d="M8 8l-4 4 4 4" />
              <path d="M14 4l-4 16" />
            </svg>
          </div>
        ),
      },
      {
        name: "IT Helper & Support",
        desc: "Troubleshooting PC, instalasi OS, printer & jaringan LAN",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        ),
      },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Keahlian Teknis"
            title="Tech Stack &amp; Komponen Sistem"
            subtitle="Teknologi utama yang saya gunakan sehari-hari untuk merancang aplikasi web, sistem informasi kampus, serta penyelesaian masalah teknis IT."
          />
        </Reveal>

        {/* ── Focused 3-Card Responsive Grid ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_TECH_STACK.map((cat, catIdx) => (
            <Reveal key={cat.title} delay={catIdx * 60} direction="up" className="h-full">
              <div className="neat-card flex h-full flex-col justify-between p-4 sm:p-5">
                <div>
                  {/* Category Header */}
                  <div className="mb-3.5 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                    <div>
                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">{cat.subtitle}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-zinc-500">{cat.number}</span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="group flex items-center justify-between gap-2.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/60 p-2.5 transition-colors hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="shrink-0">
                            {item.iconSvg}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {item.url ? (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold text-slate-900 dark:text-white transition-colors hover:underline truncate"
                                >
                                  {item.name}
                                </a>
                              ) : (
                                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                  {item.name}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* Version Badge */}
                        {item.version && (
                          <span className="shrink-0 rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:text-zinc-300">
                            {item.version}
                          </span>
                        )}
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


