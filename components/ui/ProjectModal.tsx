"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUpRightFromSquare,
  faCircleCheck,
  faBriefcase,
  faCalendarDays,
  faChartLine,
  faArrowRight,
  faLayerGroup,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { Project } from "@/lib/data/projects";
import TechBadge from "./TechBadge";
import ProjectBlueprint from "./ProjectBlueprint";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture">("overview");

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200 animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3.5 bg-slate-50/70">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                activeTab === "overview"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60"
              }`}
            >
              <FontAwesomeIcon icon={faFileLines} className="h-3 w-3" />
              <span>Ringkasan Kasus</span>
            </button>

            {project.details.architecture && (
              <button
                onClick={() => setActiveTab("architecture")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                  activeTab === "architecture"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60"
                }`}
              >
                <FontAwesomeIcon icon={faLayerGroup} className="h-3 w-3" />
                <span>Arsitektur &amp; ERD</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal proyek"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === "overview" ? (
            <>
              {/* Project Screenshot / Fallback */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-50">
                    <span className="text-6xl font-black text-slate-300 select-none">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Badges on preview */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-xs">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3 text-slate-600" />
                    {project.details.role}
                  </span>
                  {project.details.metric && (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/90 px-2.5 py-1 text-xs font-mono font-medium text-white shadow-xs">
                      <FontAwesomeIcon icon={faChartLine} className="h-3 w-3 text-emerald-400" />
                      {project.details.metric}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-700">
                    {project.category || "Full Stack"}
                  </span>
                  {project.details.year && (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                      <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3 text-slate-400" />
                      {project.details.year}
                    </span>
                  )}
                </div>

                <h2
                  id="modal-project-title"
                  className="mt-2 text-xl font-extrabold text-slate-950 sm:text-2xl"
                >
                  {project.name}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Overview */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
                  Gambaran Sistem &amp; Masalah yang Diselesaikan
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                  {project.details.overview}
                </p>
              </div>

              {/* Key Contributions */}
              <div className="mt-6">
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
                  Poin Implementasi &amp; Kontribusi
                </h3>
                <div className="mt-3 space-y-2">
                  {project.details.contributions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs"
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-800"
                      />
                      <span className="text-xs leading-relaxed text-slate-700 sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
                  Teknologi Digunakan
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <TechBadge key={t} label={t} size="sm" />
                  ))}
                </div>
              </div>
            </>
          ) : (
            project.details.architecture && (
              <ProjectBlueprint architecture={project.details.architecture} />
            )
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/80 px-6 py-4">
          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 transition-colors hover:underline"
          >
            <span>Buka Halaman Studi Kasus Lengkap</span>
            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </Link>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-950"
              >
                <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.url && project.url !== "/" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-slate-800"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                <span>Kunjungi Web</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


