"use client";

import { useEffect, useRef, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { Project } from "@/lib/data/projects";
import TechBadge from "./TechBadge";
import ProjectBlueprint from "./ProjectBlueprint";
import ProjectPreviewDiagram from "./ProjectPreviewDiagram";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture">("overview");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedOutsideRef = useRef(false);

  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  if ((project?.slug ?? null) !== prevSlug) {
    setPrevSlug(project?.slug ?? null);
    setActiveTab("overview");
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [project]);

  const isOutsideDialog = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  const hasLiveSite =
    Boolean(project?.url) && project?.url !== "/" && !project?.url.includes("github.com");

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-project-title"
      onClose={onClose}
      onPointerDown={(e) => {
        pressedOutsideRef.current = isOutsideDialog(e);
      }}
      onPointerUp={(e) => {
        if (pressedOutsideRef.current && isOutsideDialog(e)) {
          onClose();
        }
        pressedOutsideRef.current = false;
      }}
      {...({ closedby: "any" } as Record<string, string>)}
      className="m-auto max-h-[88vh] w-[calc(100%-1.5rem)] max-w-4xl overflow-hidden rounded-2xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-0 text-slate-900 dark:text-zinc-100 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs open:flex open:flex-col"
    >
      {project && (
        <>
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 dark:border-zinc-800 px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-50 dark:bg-zinc-950">
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                  activeTab === "overview"
                    ? "bg-slate-900 text-white shadow-2xs dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                }`}
              >
                <FontAwesomeIcon icon={faFileLines} aria-hidden="true" className="h-3 w-3" />
                <span>Ringkasan &amp; Fitur</span>
              </button>

              {project.details.architecture && (
                <button
                  type="button"
                  onClick={() => setActiveTab("architecture")}
                  className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                    activeTab === "architecture"
                      ? "bg-slate-900 text-white shadow-2xs dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                  }`}
                >
                  <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" className="h-3 w-3" />
                  <span>Arsitektur &amp; ERD</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup modal proyek"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-8 touch-pan-y">
            {activeTab === "overview" ? (
              <>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Tampilan antarmuka ${project.name}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 900px"
                    />
                  ) : (
                    <ProjectPreviewDiagram project={project} variant="hero" />
                  )}

                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/95 dark:bg-zinc-900/95 px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-zinc-200 shadow-xs">
                      <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" className="h-3 w-3 text-slate-600 dark:text-zinc-400" />
                      {project.details.role}
                    </span>
                    {project.details.metric && (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/90 dark:bg-black/90 px-2.5 py-1 text-xs font-mono font-medium text-white shadow-xs">
                        <FontAwesomeIcon icon={faChartLine} aria-hidden="true" className="h-3 w-3 text-emerald-400" />
                        {project.details.metric}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <span className="inline-block rounded border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-700 dark:text-zinc-300">
                    {project.category || "Full Stack"}
                  </span>

                  <h2
                    id="modal-project-title"
                    className="font-display mt-2 text-xl font-extrabold text-slate-950 dark:text-white sm:text-2xl"
                  >
                    {project.name}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-base">
                    {project.details.overview}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-zinc-400 uppercase">
                    Poin Implementasi Teknis &amp; Kontribusi
                  </h3>
                  <div className="mt-3 space-y-2">
                    {project.details.contributions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 shadow-2xs"
                      >
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-800 dark:text-zinc-200"
                        />
                        <span className="text-xs leading-relaxed text-slate-700 dark:text-zinc-300 sm:text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-zinc-400 uppercase">
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

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href={`/projects/${project.slug}`}
              onClick={onClose}
              className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white transition-colors hover:underline"
            >
              <span>Buka Halaman Studi Kasus Lengkap</span>
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="h-3 w-3" />
            </Link>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-700 hover:text-slate-950 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faGithub} aria-hidden="true" className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {hasLiveSite && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-3.5 py-2 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" className="h-3 w-3" />
                  <span>Kunjungi Web</span>
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
