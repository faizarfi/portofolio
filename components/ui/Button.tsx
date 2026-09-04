import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-xs transition-all duration-150 hover:bg-slate-800 dark:hover:bg-slate-100 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 font-semibold shadow-2xs transition-all duration-150 hover:border-slate-400 dark:hover:border-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-950 dark:hover:text-white hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "rounded-xl border border-transparent bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-medium transition-all duration-150 hover:bg-slate-200 dark:hover:bg-zinc-700 hover:text-slate-950 dark:hover:text-white",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs sm:text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base font-semibold",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

