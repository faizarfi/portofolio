import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

type RoleBadgeProps = {
  role: string;
  size?: "sm" | "md";
};

export default function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 font-semibold text-slate-800 ${
        size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
      }`}
    >
      <FontAwesomeIcon
        icon={faBriefcase}
        aria-hidden="true"
        className={size === "md" ? "h-3 w-3 text-slate-600" : "h-2.5 w-2.5 text-slate-600"}
      />
      <span>{role}</span>
    </div>
  );
}


