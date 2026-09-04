"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLocationPin,
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { SPEAKING } from "@/lib/data/speaking";
import { SectionHeading, Reveal } from "@/components/ui";

const INITIAL_SHOW = 2;

export default function SpeakingSection() {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? SPEAKING : SPEAKING.slice(0, INITIAL_SHOW);
  const hasMore = SPEAKING.length > INITIAL_SHOW;

  return (
    <section id="organizational-experience" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Pengalaman &amp; Organisasi"
            title="Kepemimpinan &amp; Kolaborasi Tim"
            subtitle="Rekam jejak kontribusi dalam organisasi kampus, kepanitiaan teknis, dan forum kolaboratif yang mengasah kemampuan komunikasi serta pemecahan masalah."
          />
        </Reveal>

        {/* ── 2-Column Responsive Grid ── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((item, index) => (
            <Reveal key={item.event} delay={index * 50} direction="up" className="h-full">
              <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-6">
                <div>
                  {/* Top Bar */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                    {item.event}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-zinc-300 sm:text-sm font-mono">
                    {item.organizer}
                  </p>

                  {/* Meta items */}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500 dark:text-zinc-400 sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faLocationPin} className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                      {item.location}
                    </span>
                    {item.audience && (
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                        {item.audience}
                      </span>
                    )}
                  </div>

                  {/* Topics Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-0.5 font-mono text-xs text-slate-600 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Documentation link */}
                {item.url && (
                  <div className="mt-6 border-t border-slate-100 dark:border-zinc-800 pt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:underline transition-colors"
                    >
                      <span>Lihat Dokumentasi Kegiatan</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <Reveal direction="up" delay={80}>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-2 text-xs font-semibold text-slate-800 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600"
              >
                {showAll ? (
                  <>
                    <span>Tampilkan Lebih Sedikit</span>
                    <FontAwesomeIcon icon={faChevronUp} className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    <span>Lihat Semua ({SPEAKING.length})</span>
                    <FontAwesomeIcon icon={faChevronDown} className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

