import TechIcon from "./TechIcon";

type TechBadgeProps = {
  label: string;
  size?: "sm" | "md";
  showIcon?: boolean;
};

export default function TechBadge({
  label,
  size = "sm",
  showIcon = true,
}: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white font-mono font-medium text-slate-700 shadow-2xs transition-colors duration-150 hover:border-slate-400 hover:text-slate-950 ${
        size === "md"
          ? "px-2.5 py-1 text-xs"
          : "px-2 py-0.5 text-[11px]"
      }`}
    >
      {showIcon && <TechIcon name={label} className={size === "md" ? "h-3.5 w-3.5" : "h-3 w-3"} />}
      <span>{label}</span>
    </span>
  );
}


