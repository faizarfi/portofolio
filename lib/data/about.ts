export interface EducationItem {
  degree: string;
  school: string;
  year: string;
  note: string | null;
}

export const ABOUT_EDUCATION: EducationItem[] = [
  {
    degree: "S1 Teknik Informatika",
    school: "Universitas Muhammadiyah Surakarta",
    year: "Agustus 2022 - Februari 2026",
    note: "IPK 3.3 / 4.0 · Fresh Graduate",
  },
  {
    degree: "Information & Communication Technology (ICT)",
    school: "SMA Muhammadiyah 1 Karanganyar",
    year: "Juli 2019 - Mei 2022",
    note: null,
  },
];

export const ABOUT_FOCUS_TAGS: string[] = [
  "Laravel & PHP Modern",
  "React & Next.js (App Router)",
  "MySQL & Database Schema",
  "Tailwind CSS & Responsive UI",
  "REST API Integration",
  "Clean Architecture & OOP",
  "Git & GitHub Workflow",
  "Otomasi Skrip & Cron Jobs",
];
