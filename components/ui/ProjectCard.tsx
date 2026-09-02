"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBookOpen,
  faEye,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import type { Project } from "@/lib/data/projects";
import RoleBadge from "./RoleBadge";
import TechBadge from "./TechBadge";

interface ProjectCardProps {
  project: Project;
  onQuickView?: (project: Project) => void;
}

export default function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  return (
    <div className="neat-card flex h-full flex-col overflow-hidden">
      {/* ── Screenshot / Preview ── */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 border-b border-slate-200/80">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot ${project.name}`}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out hover:scale-103"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-50">
            <span className="font-display text-4xl font-black text-slate-300 select-none">
              {project.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Quick View Hover Overlay Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(project)}
            aria-label={`Lihat ringkasan proyek ${project.name}`}
            className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 backdrop-blur-[1px] transition-all duration-200 hover:opacity-100"
          >
            <span className="inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
              <FontAwesomeIcon icon={faEye} className="h-3 w-3 text-slate-600" />
              Quick View
            </span>
          </button>
        )}

        {/* Metric badge top-right */}
        {project.details.metric && (
          <div className="absolute top-2.5 right-2.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono font-medium text-white shadow-2xs">
              <FontAwesomeIcon icon={faChartLine} className="h-2.5 w-2.5 text-emerald-400" />
              {project.details.metric}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <RoleBadge role={project.details.role} />
          {project.category && (
            <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
              {project.category}
            </span>
          )}
        </div>

        <h3 className="font-display mb-1.5 line-clamp-1 text-base font-bold text-slate-900 transition-colors hover:text-slate-700">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-600">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <TechBadge key={t} label={t} size="sm" />
          ))}
          {project.tech.length > 4 && (
            <span className="inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4">
          {onQuickView ? (
            <button
              onClick={() => onQuickView(project)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:bg-slate-50"
            >
              <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3 text-slate-500" />
              Detail
            </button>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:bg-slate-50"
            >
              <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3 text-slate-500" />
              Detail
            </Link>
          )}

          {project.url && project.url !== "/" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-slate-800"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
              Live Demo
            </a>
          )}

          {project.github && !project.url?.includes("vercel") && !project.url?.includes("pribumics") && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-950"
            >
              <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


