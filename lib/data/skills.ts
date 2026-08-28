import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faFileCode,
  faWind,
  faServer,
  faDatabase,
  faGears,
  faHeadset,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faPhp,
  faPython,
  faGitAlt,
  faBootstrap,
} from "@fortawesome/free-brands-svg-icons";

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

export const SKILL_CATEGORIES: {
  label: string;
  subtitle: string;
  icon: IconDefinition;
  badgeColor: string;
  iconBg: string;
  skills: { name: string; pct: number }[];
}[] = [
  {
    label: "Frontend Development",
    subtitle: "Modern, reactive, and responsive user interfaces",
    icon: faCode,
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20",
    skills: [
      { name: "React & Next.js", pct: 88 },
      { name: "JavaScript / TypeScript", pct: 85 },
      { name: "Tailwind CSS", pct: 92 },
      { name: "HTML5 & Modern CSS3", pct: 94 },
    ],
  },
  {
    label: "Backend & Systems",
    subtitle: "Robust application logic, routing, and APIs",
    icon: faServer,
    badgeColor: "text-teal-700 bg-teal-50 border-teal-200",
    iconBg: "bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-teal-500/20",
    skills: [
      { name: "PHP & Laravel Framework", pct: 90 },
      { name: "RESTful API Design", pct: 86 },
      { name: "Python & Django", pct: 75 },
      { name: "Authentication & Security", pct: 84 },
    ],
  },
  {
    label: "Database & Storage",
    subtitle: "Structured schema design and query optimization",
    icon: faDatabase,
    badgeColor: "text-sky-700 bg-sky-50 border-sky-200",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/20",
    skills: [
      { name: "MySQL Relational Database", pct: 88 },
      { name: "SQL Query Optimization", pct: 85 },
      { name: "phpMyAdmin & DB Management", pct: 90 },
      { name: "Database Migrations & Seeding", pct: 88 },
    ],
  },
  {
    label: "Tools & IT Support",
    subtitle: "Workflow efficiency, version control, and support",
    icon: faHeadset,
    badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    iconBg: "bg-gradient-to-br from-amber-500 to-emerald-600 text-white shadow-amber-500/20",
    skills: [
      { name: "Git & GitHub Version Control", pct: 90 },
      { name: "VS Code & Development Tools", pct: 95 },
      { name: "IT Hardware/Software Troubleshooting", pct: 88 },
      { name: "Figma UI Prototyping", pct: 78 },
    ],
  },
];
