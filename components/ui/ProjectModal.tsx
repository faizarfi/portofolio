"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUpRightFromSquare,
  faCircleCheck,
  faBriefcase,
  faChartLine,
  faArrowRight,
  faLayerGroup,
  faFileLines,
  faClock,
  faUsers,
  faTriangleExclamation,
  faSquareCheck,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in"
    >
      {/* Backdrop (Prevents background scroll) */}
      <div
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[88vh] h-[88vh] sm:h-auto sm:max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-50/80 dark:bg-slate-950/80">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                activeTab === "overview"
                  ? "bg-slate-900 text-white shadow-2xs dark:bg-white dark:text-slate-950"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={faFileLines} className="h-3 w-3" />
              <span>Dampak &amp; Kasus</span>
            </button>

            {project.details.architecture && (
              <button
                onClick={() => setActiveTab("architecture")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                  activeTab === "architecture"
                    ? "bg-slate-900 text-white shadow-2xs dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white"
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
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Modal Scrollable Body with strict touch containment */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-8 touch-pan-y">
          {activeTab === "overview" ? (
            <>
              {/* Project Screenshot / Fallback */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-slate-800">
                    <span className="text-6xl font-black text-slate-300 dark:text-slate-600 select-none">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Badges on preview */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 dark:bg-slate-900/95 px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                    {project.details.role}
                  </span>
                  {project.details.metric && (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/90 dark:bg-black/90 px-2.5 py-1 text-xs font-mono font-medium text-white shadow-xs">
                      <FontAwesomeIcon icon={faChartLine} className="h-3 w-3 text-emerald-400" />
                      {project.details.metric}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {project.category || "Full Stack"}
                  </span>
                  {project.details.duration && (
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-600 dark:text-slate-300">
                      <FontAwesomeIcon icon={faClock} className="h-2.5 w-2.5 text-slate-400" />
                      {project.details.duration}
                    </span>
                  )}
                  {project.details.usersCount && (
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-600 dark:text-slate-300">
                      <FontAwesomeIcon icon={faUsers} className="h-2.5 w-2.5 text-slate-400" />
                      {project.details.usersCount}
                    </span>
                  )}
                </div>

                <h2
                  id="modal-project-title"
                  className="mt-2 text-xl font-extrabold text-slate-950 dark:text-white sm:text-2xl"
                >
                  {project.name}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Impact Metrics Ribbon */}
              {project.details.impactMetrics && project.details.impactMetrics.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {project.details.impactMetrics.map((im, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-center"
                    >
                      <p className="font-display text-lg font-black text-emerald-950 dark:text-emerald-300 sm:text-xl">
                        {im.value}
                      </p>
                      <p className="mt-0.5 text-[10px] font-mono font-medium text-emerald-800 dark:text-emerald-400">
                        {im.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem Before vs Solution After */}
              {(project.details.problemBefore || project.details.solutionAfter) && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.details.problemBefore && (
                    <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 p-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-900 dark:text-amber-300 uppercase">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="h-3.5 w-3.5 text-amber-600" />
                        <span>Masalah Awal</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-amber-950 dark:text-amber-200 sm:text-sm">
                        {project.details.problemBefore}
                      </p>
                    </div>
                  )}

                  {project.details.solutionAfter && (
                    <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase">
                        <FontAwesomeIcon icon={faSquareCheck} className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Hasil Setelah Implementasi</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-emerald-950 dark:text-emerald-200 sm:text-sm">
                        {project.details.solutionAfter}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Implementation Contributions */}
              <div className="mt-6">
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                  Poin Implementasi Teknis &amp; Kontribusi
                </h3>
                <div className="mt-3 space-y-2">
                  {project.details.contributions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-2xs"
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-slate-200"
                      />
                      <span className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
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
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white transition-colors hover:underline"
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
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-950"
              >
                <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {project.url && project.url !== "/" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-3.5 py-2 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                <span>Kunjungi Web</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
