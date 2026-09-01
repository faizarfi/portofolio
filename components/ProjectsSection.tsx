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
    <section id="projects" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Portofolio"
            title="Koleksi Proyek Nyata"
            subtitle="Sistem informasi, aplikasi web, dan repositori open-source yang telah saya bangun dan rilis secara publik di GitHub."
          />
        </Reveal>

        {/* ── Search Bar & Filter Tabs ── */}
        <Reveal delay={50} direction="up">
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveTab(cat.key)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 sm:px-4 sm:py-2 active:scale-95 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs shadow-blue-600/30"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-800"
                    }`}
                  >
                    <FontAwesomeIcon icon={cat.icon} className="h-3 w-3" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Live Search Input */}
            <div className="relative w-full lg:w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau teknologi..."
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-9 text-xs text-slate-800 placeholder-slate-400 shadow-xs transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus kata kunci pencarian"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Results count indicator */}
          <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
            <span>
              Menampilkan <strong>{filteredProjects.length}</strong> dari {PROJECTS.length} proyek
              {searchQuery && ` untuk "${searchQuery}"`}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="font-semibold text-blue-600 hover:underline"
              >
                Reset pencarian
              </button>
            )}
          </div>
        </Reveal>

        {/* ── 3-Column Responsive Projects Grid ── */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index * 60, 300)} direction="up" className="h-full">
                <ProjectCard
                  project={project}
                  onQuickView={(p) => setSelectedProject(p)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <p className="font-display text-sm font-bold text-slate-800">Tidak ada proyek yang sesuai pencarian</p>
            <p className="mt-1 text-xs text-slate-500">Coba ubah kata kunci atau pilih tab kategori lain.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 active:scale-95"
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        )}

        {/* ── Full Width Footer CTA ── */}
        <Reveal delay={100} direction="up">
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-gradient-to-r from-blue-50/40 via-white to-indigo-50/40 p-6 shadow-xs sm:flex-row sm:p-8">
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                Ingin melihat kode sumber proyek lainnya?
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Seluruh repositori open-source dan skrip utilitas tersedia di GitHub @faizarfi.
              </p>
            </div>
            <div className="flex items-center gap-3">
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
