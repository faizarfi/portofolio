"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faServer,
  faCode,
  faRobot,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS, type Project } from "@/lib/data/projects";
import { SectionHeading, Button, Reveal, ProjectCard, ProjectModal } from "@/components/ui";

const CATEGORIES = [
  { label: "Semua Proyek", key: "all", icon: faLayerGroup },
  { label: "Laravel / PHP", key: "Laravel / PHP", icon: faServer },
  { label: "React / Next.js", key: "React / Next.js", icon: faCode },
  { label: "AI & Tools", key: "AI & Tools", icon: faRobot },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchCategory = activeTab === "all" || p.category === activeTab;
      if (!matchCategory) return false;
      if (!q) return true;
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTech = p.tech.some((t) => t.toLowerCase().includes(q));
      return matchName || matchDesc || matchTech;
    });
  }, [activeTab, searchQuery]);

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

        {/* ── Search Bar & Filter Tabs ── */}
        <Reveal delay={40} direction="up">
          <div className="mb-5 flex flex-col gap-3.5 border-b border-slate-200/80 dark:border-zinc-800 pb-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveTab(cat.key)}
                    className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xs"
                        : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-400 dark:hover:border-zinc-600 hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={cat.icon} className="h-3 w-3" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full lg:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-zinc-500">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau teknologi..."
                className="w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 pl-9 pr-9 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Results count indicator */}
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono">
            <span>
              Menampilkan <strong>{filteredProjects.length}</strong> dari {PROJECTS.length} proyek
              {searchQuery && ` untuk "${searchQuery}"`}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="font-bold text-slate-900 dark:text-white hover:underline"
              >
                Reset pencarian
              </button>
            )}
          </div>
        </Reveal>

        {/* ── 3-Column Responsive Projects Grid ── */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index * 50, 250)} direction="up" className="h-full">
                <ProjectCard
                  project={project}
                  onQuickView={(p) => setSelectedProject(p)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="neat-card p-8 text-center">
            <p className="font-display text-sm font-bold text-slate-800 dark:text-zinc-200">Tidak ada proyek yang sesuai pencarian</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">Coba ubah kata kunci atau pilih kategori lain.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-white px-4 py-1.5 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100"
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        )}

        {/* ── Clean Paper Footer CTA ── */}
        <Reveal delay={80} direction="up">
          <div className="neat-card mt-8 flex flex-col items-center justify-between gap-3.5 p-5 sm:flex-row sm:p-6">
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
                Katalog Proyek ({PROJECTS.length})
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


