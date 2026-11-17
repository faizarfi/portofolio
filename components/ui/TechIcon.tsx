import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhp,
  faLaravel,
  faReact,
  faJs,
  faPython,
  faGitAlt,
  faHtml5,
  faCss3Alt,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faServer,
  faCode,
  faNetworkWired,
  faMicrochip,
  faRobot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export function getTechIconInfo(tech: string): {
  icon: IconDefinition;
  colorClass: string;
} {
  const t = tech.toLowerCase();

  if (t.includes("laravel")) {
    return { icon: faLaravel, colorClass: "text-[#FF2D20]" };
  }
  if (t.includes("phpmyadmin")) {
    return { icon: faDatabase, colorClass: "text-[#F89C0E]" };
  }
  if (t.includes("php")) {
    return { icon: faPhp, colorClass: "text-[#777BB4]" };
  }
  if (t.includes("next")) {
    return { icon: faCode, colorClass: "text-slate-900 dark:text-white" };
  }
  if (t.includes("react")) {
    return { icon: faReact, colorClass: "text-[#0891B2] dark:text-[#61DAFB]" };
  }
  if (t.includes("typescript") || t.includes("ts")) {
    return { icon: faCode, colorClass: "text-[#3178C6] dark:text-[#60A5FA]" };
  }
  if (t.includes("javascript") || t.includes("js")) {
    return { icon: faJs, colorClass: "text-[#CA8A04] dark:text-[#FACC15]" };
  }
  if (t.includes("python") || t.includes("django")) {
    return { icon: faPython, colorClass: "text-[#3776AB] dark:text-[#60A5FA]" };
  }
  if (t.includes("mysql") || t.includes("database") || t.includes("db")) {
    return { icon: faDatabase, colorClass: "text-[#00758F] dark:text-[#38BDF8]" };
  }
  if (t.includes("tailwind") || t.includes("css")) {
    return { icon: faCss3Alt, colorClass: "text-[#0284C7] dark:text-[#38BDF8]" };
  }
  if (t.includes("html")) {
    return { icon: faHtml5, colorClass: "text-[#E34F26]" };
  }
  if (t.includes("git")) {
    return { icon: faGitAlt, colorClass: "text-[#F05032]" };
  }
  if (t.includes("ai") || t.includes("bot") || t.includes("gemini")) {
    return { icon: faRobot, colorClass: "text-[#7C3AED] dark:text-[#A78BFA]" };
  }
  if (t.includes("network") || t.includes("lan") || t.includes("wi-fi")) {
    return { icon: faNetworkWired, colorClass: "text-[#0284C7] dark:text-[#38BDF8]" };
  }
  if (t.includes("troubleshoot") || t.includes("hardware")) {
    return { icon: faMicrochip, colorClass: "text-[#2563EB] dark:text-[#60A5FA]" };
  }
  if (t.includes("cron") || t.includes("automasi") || t.includes("jadwal")) {
    return { icon: faClock, colorClass: "text-[#059669] dark:text-[#34D399]" };
  }
  if (t.includes("api") || t.includes("rest")) {
    return { icon: faServer, colorClass: "text-[#2563EB] dark:text-[#60A5FA]" };
  }

  return { icon: faCode, colorClass: "text-slate-700 dark:text-zinc-300" };
}

export default function TechIcon({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  className?: string;
}) {
  const { icon, colorClass } = getTechIconInfo(name);
  return <FontAwesomeIcon icon={icon} aria-hidden="true" className={`${className} ${colorClass} shrink-0`} />;
}
