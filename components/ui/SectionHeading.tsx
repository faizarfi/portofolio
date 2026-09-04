interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-6 sm:mb-8 ${centered ? "text-center" : ""} ${className}`}>
      {/* Editorial Monospaced Tag */}
      <div className={`mb-2.5 flex items-center gap-2 ${centered ? "justify-center" : ""}`}>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          {`// ${tag}`}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="font-display text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {/* Clean Solid Divider */}
      <div
        className={`mt-2.5 h-0.5 w-10 bg-slate-900 dark:bg-white ${
          centered ? "mx-auto" : ""
        }`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-sm md:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

