export type TechIconKey =
  | "laravel"
  | "php"
  | "mysql"
  | "nextjs"
  | "tailwind"
  | "typescript"
  | "git"
  | "api"
  | "python";

export interface TechStackItem {
  name: string;
  version?: string;
  desc: string;
  url?: string;
  iconKey: TechIconKey;
}

export interface TechStackCategory {
  number: string;
  title: string;
  subtitle: string;
  items: TechStackItem[];
}

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    number: "01",
    title: "Backend & Basis Data",
    subtitle: "Arsitektur server, relasi data & API",
    items: [
      {
        name: "Laravel",
        version: "12.x",
        desc: "Framework utama, Eloquent ORM, Scheduler & Auth",
        url: "https://laravel.com",
        iconKey: "laravel",
      },
      {
        name: "PHP Modern",
        version: "8.2+",
        desc: "OOP, MVC pattern, sanitasi input & integrasi modular",
        url: "https://www.php.net",
        iconKey: "php",
      },
      {
        name: "MySQL",
        version: "8.0",
        desc: "Skema relasional, query indexing & migrasi terstruktur",
        url: "https://www.mysql.com",
        iconKey: "mysql",
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
        iconKey: "nextjs",
      },
      {
        name: "Tailwind CSS",
        version: "v4.2",
        desc: "Utility-first, tata letak responsif & aksesibilitas",
        url: "https://tailwindcss.com",
        iconKey: "tailwind",
      },
      {
        name: "TypeScript",
        version: "5.x",
        desc: "Type safety, maintainable code & minim runtime bug",
        url: "https://www.typescriptlang.org",
        iconKey: "typescript",
      },
    ],
  },
  {
    number: "03",
    title: "Tooling, Otomasi & Environment",
    subtitle: "Version control rapi & otomasi pengujian",
    items: [
      {
        name: "Git & GitHub",
        desc: "Version control, branching, PR & repositori terbuka",
        url: "https://github.com/faizarfi",
        iconKey: "git",
      },
      {
        name: "REST API & Postman",
        desc: "Perancangan endpoint, validasi JSON & pengujian API",
        url: "https://www.postman.com",
        iconKey: "api",
      },
      {
        name: "Python & Scripting",
        desc: "Playwright scraping, Django & otomasi pengolahan data",
        url: "https://www.python.org",
        iconKey: "python",
      },
    ],
  },
];
