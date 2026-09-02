import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faFileCode,
  faWind,
  faServer,
  faDatabase,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faJs,
  faReact,
  faPhp,
  faPython,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons";

export interface SkillItem {
  name: string;
  experience: string;
  focus: string;
}

export interface SkillCategory {
  label: string;
  subtitle: string;
  icon: IconDefinition;
  badgeColor: string;
  iconBg: string;
  skills: SkillItem[];
}

export const SKILLS: { name: string; icon: IconDefinition }[] = [
  { name: "Laravel", icon: faServer },
  { name: "PHP", icon: faPhp },
  { name: "React", icon: faReact },
  { name: "Next.js", icon: faCode },
  { name: "TypeScript", icon: faFileCode },
  { name: "JavaScript", icon: faJs },
  { name: "Tailwind CSS", icon: faWind },
  { name: "MySQL", icon: faDatabase },
  { name: "Python", icon: faPython },
  { name: "Git & GitHub", icon: faGitAlt },
  { name: "HTML5 & CSS3", icon: faHtml5 },
  { name: "IT Support", icon: faHeadset },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Backend & Basis Data",
    subtitle: "Arsitektur data terstruktur, logika bisnis, dan API yang aman",
    icon: faServer,
    badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    iconBg: "bg-gradient-to-br from-indigo-500 to-slate-900 text-white shadow-indigo-500/20",
    skills: [
      { name: "Laravel Framework", experience: "Framework Utama", focus: "Eloquent ORM, Blade, Multi-auth, Scheduler & REST API" },
      { name: "PHP Modern", experience: "2+ Tahun Penggunaan", focus: "OOP, MVC pattern, sanitasi input, dan integrasi library" },
      { name: "MySQL Relational DB", experience: "Database Utama", focus: "Perancangan schema relasional, indexing tabel & phpMyAdmin" },
      { name: "RESTful API & Serverless", experience: "Integrasi Sistem", focus: "Endpoint JSON, handling CORS, dan deployment serverless" },
    ],
  },
  {
    label: "Frontend & Antarmuka",
    subtitle: "Tampilan responsif, navigasi intuitif, dan performa cepat di semua perangkat",
    icon: faCode,
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-500/20",
    skills: [
      { name: "React & Next.js", experience: "App Router & SSR", focus: "Server components, dynamic routing, state hooks, dan SSG" },
      { name: "JavaScript & TypeScript", experience: "Type-Safe & Clean", focus: "ES6+, DOM manipulation, struktur modul, dan async/await" },
      { name: "Tailwind CSS", experience: "Styling Utama", focus: "Utility-first, responsive breakpoint (mobile & desktop), dan dark-ready" },
      { name: "Semantic HTML & CSS", experience: "Fondasi Web", focus: "Aksesibilitas (a11y), visual layout grid/flexbox, dan SEO" },
    ],
  },
  {
    label: "IT Support & Ekosistem Tooling",
    subtitle: "Dukungan teknis hardware/software dan version control yang rapi",
    icon: faHeadset,
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20",
    skills: [
      { name: "Git & GitHub", experience: "Version Control", focus: "Branching, PR, commit history rapi, dan repositori publik" },
      { name: "Troubleshooting PC & Laptop", experience: "Hardware & Software", focus: "Diagnosa OS, instalasi driver/aplikasi, perbaikan part dasar" },
      { name: "Jaringan Lokal & Perangkat Kantor", experience: "LAN & Sharing", focus: "Setup router/switch LAN, konfigurasi IP, dan printer sharing" },
      { name: "VS Code & Tooling Pengembang", experience: "Workflow Harian", focus: "Extensions, Composer, NPM, Postman, dan terminal CLI" },
    ],
  },
];

