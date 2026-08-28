import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-xl bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-600/25 hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold shadow-xs transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "rounded-xl border border-slate-200/70 bg-slate-50 text-slate-600 font-medium transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800",
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
      className={`group inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
