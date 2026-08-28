export default function SectionHeading({
  tag,
  title,
  subtitle,
  centered = false,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-8 sm:mb-12 ${centered ? "text-center" : ""}`}>
      <div
        className={`mb-2.5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold tracking-wide text-blue-700 ${
          centered ? "mx-auto" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        <span className="uppercase tracking-widest text-[10px] font-bold">{tag}</span>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2.5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
