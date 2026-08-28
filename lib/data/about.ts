import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faBriefcase,
  faGraduationCap,
  faSchool,
  faCode,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export const ABOUT_META: { icon: IconDefinition; text: string }[] = [
  { icon: faLocationDot, text: "Surakarta, Jawa Tengah" },
  { icon: faBriefcase, text: "2+ Tahun Pengalaman" },
  { icon: faCode, text: "Laravel & React/Next.js" },
  { icon: faHeadset, text: "IT Support & Helper" },
];

export const ABOUT_EDUCATION: {
  icon: IconDefinition;
  degree: string;
  school: string;
  year: string;
  note: string | null;
}[] = [
  {
    icon: faGraduationCap,
    degree: "S1 Teknik Informatika",
    school: "Universitas Muhammadiyah Surakarta",
    year: "2022 - 2026",
    note: "IPK 3.3 · Fresh Graduate",
  },
  {
    icon: faSchool,
    degree: "Information & Communication Technology",
    school: "SMA Muhammadiyah 1 Karanganyar",
    year: "2022",
    note: null,
  },
];

export const ABOUT_HIGHLIGHTS: { value: string; label: string }[] = [
  { value: "2+", label: "Tahun\nPengalaman" },
  { value: "14+", label: "Proyek\nSelesai" },
  { value: "12+", label: "Repository\nGitHub" },
  { value: "100%", label: "Komitmen\nKualitas" },
];

export const ABOUT_FOCUS_TAGS: string[] = [
  "Laravel & PHP",
  "React / Next.js",
  "TypeScript & JavaScript",
  "MySQL & Relational DB",
  "Tailwind CSS",
  "Python & Django",
  "IT Support & Problem Solving",
  "RESTful API Development",
];
