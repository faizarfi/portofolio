"use client";

import { useEffect } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { Project } from "@/lib/data/projects";
import TechBadge from "./TechBadge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Detail Ringkas Proyek
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal proyek"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Project Screenshot / Fallback */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <span className="text-6xl font-black text-blue-300/80 select-none">
                  {project.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Badges on preview */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md">
                <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3 text-blue-600" />
                {project.details.role}
              </span>
              {project.details.metric && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/95 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                  <FontAwesomeIcon icon={faChartLine} className="h-3 w-3" />
                  {project.details.metric}
                </span>
              )}
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-bold text-blue-800">
                {project.category || "Full Stack"}
              </span>
              {project.details.year && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3 text-slate-400" />
                  {project.details.year}
                </span>
              )}
            </div>

            <h2
              id="modal-project-title"
              className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl"
            >
              {project.name}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Overview */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <h3 className="text-xs font-bold tracking-wider text-blue-700 uppercase">
              Gambaran Sistem
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
              {project.details.overview}
            </p>
          </div>

          {/* Key Contributions */}
          <div className="mt-6">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Poin Implementasi &amp; Kontribusi
            </h3>
            <div className="mt-3 space-y-2.5">
              {project.details.contributions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-xs"
                >
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600"
                  />
                  <span className="text-xs leading-relaxed text-slate-700 sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Teknologi Digunakan
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <TechBadge key={t} label={t} size="sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4">
          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition-colors hover:text-blue-800"
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
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50"
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
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-500"
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
