import { SectionHeading, Reveal } from "@/components/ui";

interface TechItem {
  name: string;
  version?: string;
  desc: string;
  url?: string;
  iconSvg: React.ReactNode;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    title: "Bingkai Kerja JavaScript",
    items: [
      {
        name: "GSAP",
        desc: "GreenSock High-Performance Animation",
        url: "https://gsap.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5v-9l6 4.5-6 4.5zm-8-4.5l6-4.5v9l-6-4.5z" />
            </svg>
          </div>
        ),
      },
      {
        name: "Next.js",
        version: "16.2.2",
        desc: "App Router, SSR & Server Actions",
        url: "https://nextjs.org",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-xs">
            <svg className="h-4 w-4" viewBox="0 0 180 180" fill="none">
              <mask id="next-mask-js" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
                <circle cx="90" cy="90" r="90" fill="black" />
              </mask>
              <g mask="url(#next-mask-js)">
                <circle cx="90" cy="90" r="90" fill="black" />
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                <rect x="115" y="54" width="12" height="72" fill="white" />
              </g>
            </svg>
          </div>
        ),
      },
      {
        name: "React",
        version: "19.2.4",
        desc: "Component UI Architecture & Hooks",
        url: "https://react.dev",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#61DAFB]/15 text-[#087ea4]">
            <svg className="h-4.5 w-4.5" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
              <circle cx="0" cy="0" r="2.05" fill="#087ea4" />
              <g stroke="#087ea4" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    title: "Alat Pengembangan",
    items: [
      {
        name: "Turbopack",
        desc: "High-Speed Rust Bundler for Next.js",
        url: "https://turbo.build",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm1 15h-2v-4H7l6-8v5h4l-6 7z" />
            </svg>
          </div>
        ),
      },
      {
        name: "Git & GitHub",
        desc: "Version Control, Pull Requests & CI",
        url: "https://github.com/faizarfi",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#F05032]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.6 10.9L13.1 2.4c-.5-.5-1.4-.5-1.9 0L9.3 4.3l2.4 2.4c.6-.2 1.3 0 1.7.4.5.5.6 1.2.4 1.8l2.3 2.3c.6-.2 1.3 0 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.7-1.3-.4-1.9L12.4 10v4.2c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.5-.4.8-.5V9.9c-.3-.1-.5-.3-.8-.5-.5-.5-.7-1.3-.4-1.9L7.5 5.1 2.4 10.2c-.5.5-.5 1.4 0 1.9l8.5 8.5c.5.5 1.4.5 1.9 0l8.8-8.8c.5-.5.5-1.4 0-1.9z" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    title: "Skrip font",
    items: [
      {
        name: "Lucide",
        version: "v1.7",
        desc: "Koleksi Ikon & Font Vektor Elegan",
        url: "https://lucide.dev",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 shadow-2xs">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12" />
              <path d="M12 6a6 6 0 0 1 6 6c0 3.314-2.686 6-6 6s-6-2.686-6-6" />
              <path d="M12 10a2 2 0 0 1 2 2" />
            </svg>
          </div>
        ),
      },
      {
        name: "FontAwesome",
        version: "v7.2",
        desc: "Sistem Ikon Web & Brand",
        url: "https://fontawesome.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    title: "JavaScript Libraries",
    items: [
      {
        name: "Lenis",
        version: "1.3.25",
        desc: "Smooth Inertia Momentum Scrolling",
        url: "https://lenis.darkroom.engineering",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-serif font-black text-xs">
            L
          </div>
        ),
      },
      {
        name: "Framer Motion",
        desc: "Spring Physics & Stagger Animation",
        url: "https://motion.dev",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    title: "PaaS",
    items: [
      {
        name: "Vercel",
        desc: "Platform Deployment & Global Edge",
        url: "https://vercel.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-xs">
            <svg className="h-3.5 w-3.5" viewBox="0 0 1155 1000" fill="currentColor">
              <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
            </svg>
          </div>
        ),
      },
      {
        name: "cPanel / Apache",
        desc: "Production Web Hosting & PHP Server",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    title: "UI Frameworks",
    items: [
      {
        name: "Tailwind CSS",
        version: "v4.2.2",
        desc: "Utility-First CSS & Design System",
        url: "https://tailwindcss.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-[#06B6D4]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
            </svg>
          </div>
        ),
      },
      {
        name: "TypeScript",
        version: "5.x",
        desc: "Type Safety & Enterprise Scalability",
        url: "https://www.typescriptlang.org",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3178C6]/15 text-[#3178C6] font-mono font-bold text-[11px]">
            TS
          </div>
        ),
      },
    ],
  },
  {
    title: "Bingkai Kerja Backend",
    items: [
      {
        name: "Laravel",
        version: "11.x",
        desc: "Eloquent ORM, Routing & Blade",
        url: "https://laravel.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-[#FF2D20]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.5 8.2l-9-5.2c-.3-.2-.7-.2-1 0l-9 5.2c-.3.2-.5.5-.5.8v10.5c0 .3.2.7.5.8l9 5.2c.2.1.3.1.5.1s.3 0 .5-.1l9-5.2c.3-.2.5-.5.5-.8V9c0-.3-.2-.6-.5-.8zM12 4.2l7.4 4.3-3.2 1.9-7.4-4.3 3.2-1.9zm-8 5.4l7 4v7.7l-7-4V9.6zm9 11.7v-7.7l3-1.7v3.2c0 .3.2.6.5.8.3.1.7.1.9-.1l2.5-1.4v2.9l-6.9 4zm3.9-6.8l-3-1.7 7.2-4.1 3 1.7-7.2 4.1z" />
            </svg>
          </div>
        ),
      },
      {
        name: "PHP",
        version: "8.2+",
        desc: "Modern Server-Side Language",
        url: "https://www.php.net",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-[#777BB4]">
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    title: "Basis Data & Penyimpanan",
    items: [
      {
        name: "MySQL",
        version: "8.0",
        desc: "Relational DB, Foreign Keys & Indexes",
        url: "https://www.mysql.com",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-[#00758F]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm6 12c0 .66-2.13 2-6 2s-6-1.34-6-2v-2.17c1.47.74 3.61 1.17 6 1.17s4.53-.43 6-1.17V17zm0-4c0 .66-2.13 2-6 2s-6-1.34-6-2v-2.17c1.47.74 3.61 1.17 6 1.17s4.53-.43 6-1.17V13z" />
            </svg>
          </div>
        ),
      },
      {
        name: "phpMyAdmin",
        version: "5.x",
        desc: "GUI Database Management Tool",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600 font-bold text-xs">
            PMA
          </div>
        ),
      },
    ],
  },
  {
    title: "Serba Serbi",
    items: [
      {
        name: "Open Graph",
        desc: "Social Media Metadata & Cards",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-700">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
        ),
      },
      {
        name: "IT Helper & LAN",
        desc: "Hardware Diagnostik & Jaringan Wi-Fi",
        iconSvg: (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
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
    <section id="skills" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Keahlian &amp; Ekosistem"
            title="Tech Stack &amp; Komponen Teknologi"
            subtitle="Daftar lengkap teknologi, framework, libraries, font ikon Lucide, dan PaaS yang digunakan secara nyata dalam pengembangan web ini."
          />
        </Reveal>

        {/* ── Categorized Tech Stack Grid (3x3 on Desktop, 2 on Tablet, 1 on Mobile) ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK_CATEGORIES.map((cat, catIdx) => (
            <Reveal key={cat.title} delay={catIdx * 45} direction="up" className="h-full">
              <div className="neat-card flex h-full flex-col justify-between p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                <div>
                  {/* Category Header exactly like the screenshot */}
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-display text-xs font-bold text-slate-500 tracking-wide">
                      {cat.title}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600/40" />
                  </div>

                  {/* Items List */}
                  <div className="space-y-2.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="group flex items-center justify-between gap-2.5 rounded-xl border border-transparent p-1.5 transition-all duration-200 hover:border-slate-200/80 hover:bg-slate-50/70"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                            {item.iconSvg}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {item.url ? (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold text-blue-700 transition-colors hover:text-blue-900 hover:underline truncate"
                                >
                                  {item.name}
                                </a>
                              ) : (
                                <span className="text-xs font-bold text-slate-800 truncate">
                                  {item.name}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* Version or Spec Badge */}
                        {item.version && (
                          <span className="shrink-0 rounded-md border border-slate-200/80 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600 shadow-2xs">
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
