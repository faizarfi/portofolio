import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

type RoleBadgeProps = {
  role: string;
  size?: "sm" | "md";
};

export default function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 font-semibold text-blue-800 ${
        size === "md" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[11px]"
      }`}
    >
      <FontAwesomeIcon
        icon={faBriefcase}
        aria-hidden="true"
        className={size === "md" ? "h-3 w-3 text-blue-600" : "h-2.5 w-2.5 text-blue-600"}
      />
      <span>{role}</span>
    </div>
  );
}
