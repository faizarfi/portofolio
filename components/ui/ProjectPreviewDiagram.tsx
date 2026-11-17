import type { Project } from "@/lib/data/projects";

interface ProjectPreviewDiagramProps {
  project: Project;
  variant?: "card" | "hero";
}

export default function ProjectPreviewDiagram({
  project,
  variant = "card",
}: ProjectPreviewDiagramProps) {
  const arch = project.details.architecture;
  const layers = arch?.layers?.slice(0, variant === "hero" ? 4 : 3) ?? [];
  const tables = arch?.tables?.slice(0, variant === "hero" ? 4 : 3) ?? [];
  const repoShort = project.github
    ? project.github.replace("https://github.com/", "github.com/")
    : project.slug;

  return (
    <div
      className={`flex h-full w-full flex-col justify-between bg-slate-50 dark:bg-zinc-900 select-none ${
        variant === "hero" ? "p-5 sm:p-8" : "p-3.5 sm:p-4"
      }`}
    >
      {/* Top Blueprint Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 dark:border-zinc-800 pb-2">
        <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider truncate">
          {project.category || "Arsitektur Sistem"}
        </span>
        <span className="font-mono text-[10px] text-slate-600 dark:text-zinc-400 truncate max-w-[55%]">
          {repoShort}
        </span>
      </div>

      {/* Middle Architectural Modules / Schema Preview */}
      <div
        className={`my-auto flex flex-col justify-center ${
          variant === "hero" ? "gap-4 py-3" : "gap-2 py-1.5"
        }`}
      >
        {layers.length > 0 && (
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
            {layers.slice(0, 3).map((item, idx) => (
              <div
                key={`${item.tier}-${item.title}`}
                className="rounded-lg border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-950/70 px-2.5 py-2 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[9px] font-bold text-slate-500 dark:text-zinc-400">
                    0{idx + 1} &middot; {item.tier}
                  </span>
                  <span className="font-mono text-[9px] font-semibold text-slate-600 dark:text-zinc-400 truncate max-w-[55%]">
                    {item.tech}
                  </span>
                </div>
                <p
                  className={`mt-0.5 font-display font-bold text-slate-900 dark:text-white truncate ${
                    variant === "hero" ? "text-xs sm:text-sm" : "text-[11px]"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        )}

        {tables.length > 0 && (
          <div
            className={`flex flex-wrap items-center gap-1.5 ${
              variant === "hero" ? "" : "hidden sm:flex"
            }`}
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mr-1">
              Schema:
            </span>
            {tables.map((t) => (
              <span
                key={t.name}
                className="rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-700 dark:text-zinc-300"
              >
                {t.name} ({t.columns.length})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Stack Strip */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-200/80 dark:border-zinc-800 pt-2">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {project.tech.slice(0, variant === "hero" ? 5 : 3).map((tech) => (
            <span
              key={tech}
              className="rounded border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-slate-700 dark:text-zinc-300 shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="font-mono text-[9px] font-bold text-slate-500 dark:text-zinc-400 shrink-0">
          {arch ? `${arch.tables.length} Tabel` : project.slug}
        </span>
      </div>
    </div>
  );
}
