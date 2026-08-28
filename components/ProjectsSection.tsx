"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faServer,
  faCode,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data/projects";
import { SectionHeading, Button, Reveal, ProjectCard } from "@/components/ui";

const CATEGORIES = [
  { label: "Semua Proyek", key: "all", icon: faLayerGroup },
  { label: "Laravel / PHP", key: "Laravel / PHP", icon: faServer },
  { label: "React / Next.js", key: "React / Next.js", icon: faCode },
  { label: "AI & Tools", key: "AI & Tools", icon: faRobot },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects =
    activeTab === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            tag="Portofolio"
            title="Koleksi Proyek Nyata"
            subtitle="Beberapa sistem informasi dan aplikasi web yang telah saya kembangkan untuk instansi, organisasi, dan klien."
          />
        </Reveal>

        {/* ── Category Filter Tabs ── */}
        <Reveal delay={40}>
          <div className="mb-8 flex flex-wrap items-center gap-2.5 border-b border-slate-200/80 pb-5">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-800"
                  }`}
                >
                  <FontAwesomeIcon icon={cat.icon} className="h-3 w-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── 3-Column Responsive Projects Grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 50} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* ── Full Width Footer CTA ── */}
        <Reveal delay={100}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:flex-row sm:p-8">
            <div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
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
    </section>
  );
}
