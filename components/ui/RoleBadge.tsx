import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

type RoleBadgeProps = {
  role: string;
  size?: "sm" | "md";
};

export default function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-800 dark:text-zinc-200 ${
        size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
      }`}
    >
      <FontAwesomeIcon
        icon={faBriefcase}
        aria-hidden="true"
        className={size === "md" ? "h-3 w-3 text-slate-600 dark:text-zinc-400" : "h-2.5 w-2.5 text-slate-600 dark:text-zinc-400"}
      />
      <span>{role}</span>
    </div>
  );
}


