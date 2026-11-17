"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLocationPin,
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronUp,
  faBriefcase,
  faCircleCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { SPEAKING, WORK_EXPERIENCE } from "@/lib/data/speaking";
import { SectionHeading, Reveal, TechBadge } from "@/components/ui";

const INITIAL_SHOW = 2;

export default function SpeakingSection() {
  const [showAllOrg, setShowAllOrg] = useState(false);

  const visibleOrg = showAllOrg ? SPEAKING : SPEAKING.slice(0, INITIAL_SHOW);
  const hasMoreOrg = SPEAKING.length > INITIAL_SHOW;

  return (
    <section id="experience" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Pengalaman &amp; Kepemimpinan"
            title="Pengalaman Kerja &amp; Organisasi"
            subtitle="Rekam jejak magang pengembangan web di instansi, proyek freelance, serta kontribusi kepemimpinan organisasi."
          />
        </Reveal>

        {/* Pengalaman Kerja & Magang */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-zinc-400 uppercase">
            <FontAwesomeIcon icon={faBriefcase} aria-hidden="true" className="h-3.5 w-3.5 text-slate-700 dark:text-zinc-300" />
            <span>Pengalaman Kerja &amp; Magang</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {WORK_EXPERIENCE.map((job, idx) => (
              <Reveal key={`${job.role}-${job.organization}`} delay={idx * 60} direction="up" className="h-full">
                <article className="neat-card flex h-full flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-900 dark:bg-white px-2.5 py-0.5 text-[11px] font-bold text-white dark:text-slate-950">
                        {job.type}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        {job.period}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-slate-950 dark:text-white sm:text-lg">
                      {job.role}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-600 dark:text-zinc-300">
                      <span className="font-semibold text-slate-800 dark:text-zinc-200">
                        {job.organization}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-600 dark:text-zinc-400">
                        <FontAwesomeIcon icon={faLocationPin} aria-hidden="true" className="h-3 w-3" />
                        {job.location}
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-sm">
                      {job.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {job.highlights.map((hl) => (
                        <li key={hl} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700 dark:text-zinc-300">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-zinc-300"
                          />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <TechBadge key={tech} label={tech} size="sm" />
                      ))}
                    </div>
                  </div>

                  {job.projectHref && (
                    <div className="mt-5 border-t border-slate-100 dark:border-zinc-800 pt-4">
                      <Link
                        href={job.projectHref}
                        className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:underline transition-colors"
                      >
                        <span>{job.projectLabel || "Lihat Proyek Terkait"}</span>
                        <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Pengalaman Organisasi & Kepanitiaan */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-600 dark:text-zinc-400 uppercase">
            <FontAwesomeIcon icon={faUsers} aria-hidden="true" className="h-3.5 w-3.5 text-slate-700 dark:text-zinc-300" />
            <span>Kepemimpinan &amp; Organisasi Kampus</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {visibleOrg.map((item, index) => (
              <Reveal key={`${item.event}-${item.date}`} delay={index * 50} direction="up" className="h-full">
                <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                        {item.title}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-600 dark:text-zinc-400">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                      {item.event}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-zinc-300 sm:text-sm font-mono">
                      {item.organizer}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-600 dark:text-zinc-400 sm:text-sm">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faLocationPin} aria-hidden="true" className="h-3.5 w-3.5 text-slate-600 dark:text-zinc-400" />
                        {item.location}
                      </span>
                      {item.audience && (
                        <span className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faUsers} aria-hidden="true" className="h-3.5 w-3.5 text-slate-600 dark:text-zinc-400" />
                          {item.audience}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-0.5 font-mono text-xs text-slate-700 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {item.url && (
                    <div className="mt-6 border-t border-slate-100 dark:border-zinc-800 pt-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:underline transition-colors"
                      >
                        <span>Lihat Dokumentasi Kegiatan</span>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {hasMoreOrg && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllOrg((v) => !v)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-slate-800 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600"
              >
                {showAllOrg ? (
                  <>
                    Tampilkan Lebih Sedikit
                    <FontAwesomeIcon icon={faChevronUp} aria-hidden="true" className="h-3 w-3 text-slate-600 dark:text-zinc-400" />
                  </>
                ) : (
                  <>
                    Lihat Semua Pengalaman Organisasi ({SPEAKING.length})
                    <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" className="h-3 w-3 text-slate-600 dark:text-zinc-400" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
