"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faServer,
  faCode,
  faRobot,
  faNetworkWired,
  faMagnifyingGlass,
  faXmark,
  faChevronDown,
  faChevronUp,
  faTableCellsLarge,
  faListUl,
  faArrowUpRightFromSquare,
  faBookOpen,
  faEye,
  faSliders,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS, type Project } from "@/lib/data/projects";
import {
  SectionHeading,
  Button,
  Reveal,
  ProjectCard,
  ProjectModal,
  RoleBadge,
  TechBadge,
} from "@/components/ui";

const CATEGORIES = [
  { label: "Semua Proyek", key: "all", icon: faLayerGroup },
  { label: "Laravel / PHP", key: "Laravel / PHP", icon: faServer },
  { label: "React / Next.js", key: "React / Next.js", icon: faCode },
  { label: "Backend & API", key: "Backend & API", icon: faNetworkWired },
  { label: "AI & Otomasi", key: "AI & Otomasi", icon: faRobot },
];

const POPULAR_TECHS = [
  "Semua Stack",
  "Laravel",
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
];

const INITIAL_DISPLAY_COUNT = 6;

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTech, setSelectedTech] = useState("Semua Stack");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Compute category item counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Filter projects by category, tech stack, and search query
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      // Category filter
      const matchCategory = activeTab === "all" || p.category === activeTab;
      if (!matchCategory) return false;

      // Tech chip filter
      if (selectedTech !== "Semua Stack") {
        const matchTechFilter = p.tech.some((t) =>
          t.toLowerCase().includes(selectedTech.toLowerCase())
        );
        if (!matchTechFilter) return false;
      }

      // Keyword search
      if (!q) return true;
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTech = p.tech.some((t) => t.toLowerCase().includes(q));
      return matchName || matchDesc || matchTech;
    });
  }, [activeTab, selectedTech, searchQuery]);

  // Paginated/limited projects to prevent excessive vertical stacking
  const displayedProjects = useMemo(() => {
    if (showAll || filteredProjects.length <= INITIAL_DISPLAY_COUNT) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredProjects, showAll]);

  const hasActiveFilter =
    activeTab !== "all" || selectedTech !== "Semua Stack" || searchQuery !== "";

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedTech("Semua Stack");
    setSearchQuery("");
    setShowAll(false);
  };

  return (
    <section id="projects" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Koleksi Karya"
            title="Proyek Pilihan &amp; Studi Kasus"
            subtitle="Sistem informasi terintegrasi, antarmuka web modern, asisten AI, dan utilitas perangkat lunak yang dirancang untuk keandalan dan efisiensi pengguna."
          />
        </Reveal>

        {/* ── Filter Controls & Search Bar ── */}
        <Reveal delay={40} direction="up">
          <div className="mb-6 space-y-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/40 p-3.5 sm:p-5">
            {/* Top Row: Category Tabs & View Switcher */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Filter Tabs with Count Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat.key;
                  const count = categoryCounts[cat.key] ?? 0;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setActiveTab(cat.key);
                        setShowAll(false);
                      }}
                      className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xs"
                          : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-400 dark:hover:border-zinc-600 hover:text-slate-950 dark:hover:text-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={cat.icon} className="h-3 w-3" />
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                          isActive
                            ? "bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-900"
                            : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 group-hover:bg-slate-200 dark:group-hover:bg-zinc-700"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* View Switcher (Grid vs List) */}
              <div className="flex items-center gap-1 self-start sm:self-auto rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Tampilan Kotak (Grid View)"
                  title="Tampilan Kotak"
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faTableCellsLarge} className="h-3 w-3" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="Tampilan Ringkas (List View)"
                  title="Tampilan Ringkas"
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewMode === "list"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faListUl} className="h-3 w-3" />
                  <span className="hidden sm:inline">Ringkas</span>
                </button>
              </div>
            </div>

            {/* Bottom Row: Search Box & Quick Tech Chips */}
            <div className="flex flex-col gap-3 pt-2 border-t border-slate-200/60 dark:border-zinc-800/80 md:flex-row md:items-center md:justify-between">
              {/* Quick Tech Stack Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="shrink-0 font-mono text-[11px] font-semibold text-slate-400 dark:text-zinc-500 flex items-center gap-1 mr-1">
                  <FontAwesomeIcon icon={faSliders} className="h-2.5 w-2.5" />
                  Stack:
                </span>
                {POPULAR_TECHS.map((tech) => {
                  const isTechActive = selectedTech === tech;
                  return (
                    <button
                      key={tech}
                      onClick={() => {
                        setSelectedTech(tech);
                        setShowAll(false);
                      }}
                      className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                        isTechActive
                          ? "bg-slate-800 text-white dark:bg-white dark:text-slate-950 font-bold"
                          : "bg-white dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>

              {/* Live Search Input */}
              <div className="relative w-full md:w-64 shrink-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-zinc-500">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowAll(false);
                  }}
                  placeholder="Cari proyek..."
                  className="w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 pl-8 pr-8 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Hapus pencarian"
                    className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-300"
                  >
                    <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span>
              Menampilkan{" "}
              <strong className="text-slate-900 dark:text-white">
                {displayedProjects.length}
              </strong>{" "}
              dari {filteredProjects.length} proyek yang cocok ({PROJECTS.length} total karya)
              {searchQuery && ` • pencarian "${searchQuery}"`}
              {selectedTech !== "Semua Stack" && ` • stack "${selectedTech}"`}
            </span>
            {hasActiveFilter && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-zinc-200 hover:underline"
              >
                <FontAwesomeIcon icon={faRotateRight} className="h-2.5 w-2.5" />
                Reset Filter
              </button>
            )}
          </div>
        </Reveal>

        {/* ── Projects Display: Grid or Compact List View ── */}
        {filteredProjects.length > 0 ? (
          viewMode === "grid" ? (
            /* Grid View */
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProjects.map((project, index) => (
                <Reveal
                  key={project.slug}
                  delay={Math.min(index * 50, 250)}
                  direction="up"
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    onQuickView={(p) => setSelectedProject(p)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            /* Compact List View — takes minimal vertical space */
            <div className="space-y-3">
              {displayedProjects.map((project, index) => (
                <Reveal
                  key={project.slug}
                  delay={Math.min(index * 40, 200)}
                  direction="up"
                >
                  <div className="neat-card group flex flex-col gap-3 p-4 transition-all duration-200 hover:border-slate-400 dark:hover:border-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:p-4.5">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <RoleBadge role={project.details.role} />
                        {project.category && (
                          <span className="rounded border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-850 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:text-zinc-300">
                            {project.category}
                          </span>
                        )}
                        {project.details.metric && (
                          <span className="rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                            {project.details.metric}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:underline hover:text-slate-700 dark:hover:text-zinc-200"
                        >
                          {project.name}
                        </Link>
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-zinc-400">
                        {project.description}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {project.tech.map((t) => (
                          <TechBadge key={t} label={t} size="sm" />
                        ))}
                      </div>
                    </div>

                    {/* Quick Action Links on Right */}
                    <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-800">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEye} className="h-3 w-3" />
                        <span>Quick View</span>
                      </button>

                      {project.url && project.url !== "/" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-3 py-1.5 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                        >
                          <span>Live Demo</span>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repository ${project.name}`}
                          title="Lihat Source Code di GitHub"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-zinc-700 hover:text-slate-950 dark:hover:text-white transition-colors"
                        >
                          <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )
        ) : (
          /* Empty Search / Filter State */
          <div className="neat-card p-8 text-center">
            <p className="font-display text-sm font-bold text-slate-800 dark:text-zinc-200">
              Tidak ada proyek yang sesuai dengan kriteria
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Coba ubah kata kunci pencarian, reset filter stack, atau pilih kategori lain.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <FontAwesomeIcon icon={faRotateRight} className="h-3 w-3" />
              Tampilkan Semua Proyek
            </button>
          </div>
        )}

        {/* ── Expand/Collapse Button: Prevents Excessive Downward Piling ── */}
        {filteredProjects.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  const el = document.getElementById("projects");
                  el?.scrollIntoView({ behavior: "smooth" });
                } else {
                  setShowAll(true);
                }
              }}
              className="group inline-flex items-center gap-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-xs font-bold text-slate-800 dark:text-zinc-200 shadow-sm transition-all duration-200 hover:border-slate-500 dark:hover:border-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:shadow-md active:scale-98"
            >
              <span>
                {showAll
                  ? "Tampilkan Lebih Sedikit (Ciutkan)"
                  : `Tampilkan Semua Proyek (${filteredProjects.length})`}
              </span>
              {!showAll && (
                <span className="rounded-full bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:text-zinc-300">
                  +{filteredProjects.length - INITIAL_DISPLAY_COUNT} Lainnya
                </span>
              )}
              <FontAwesomeIcon
                icon={showAll ? faChevronUp : faChevronDown}
                className="h-3 w-3 text-slate-500 dark:text-zinc-400 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </button>
          </div>
        )}

        {/* ── Clean Paper Footer CTA ── */}
        <Reveal delay={80} direction="up">
          <div className="neat-card mt-10 flex flex-col items-center justify-between gap-3.5 p-5 sm:flex-row sm:p-6">
            <div>
              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                Ingin melihat kode sumber proyek lainnya?
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
                Seluruh repositori open-source dan skrip utilitas tersedia di GitHub @faizarfi.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <Button href="/projects" variant="outline" size="sm">
                Katalog Lengkap ({PROJECTS.length})
              </Button>
              <Button
                href="https://github.com/faizarfi"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
                GitHub @faizarfi
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Interactive Quick-View Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
