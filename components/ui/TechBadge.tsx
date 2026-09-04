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
      className={`inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-850 font-mono font-medium text-slate-700 dark:text-zinc-200 shadow-2xs transition-colors duration-150 hover:border-slate-400 dark:hover:border-zinc-600 hover:text-slate-950 dark:hover:text-white ${
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


