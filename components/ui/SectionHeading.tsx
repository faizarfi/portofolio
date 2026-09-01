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
    <div className={`mb-8 sm:mb-12 ${centered ? "text-center" : ""} ${className}`}>
      {/* Animated Tag Pill */}
      <div
        className={`mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1 text-xs font-semibold tracking-wide text-blue-700 shadow-xs backdrop-blur-xs transition-transform duration-300 hover:scale-105 ${
          centered ? "mx-auto" : ""
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-800">
          {tag}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {/* Subtle Gradient Accent Bar */}
      <div
        className={`mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 ${
          centered ? "mx-auto" : ""
        }`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm md:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
