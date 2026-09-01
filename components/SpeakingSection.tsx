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
    <section id="organizational-experience" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Organisasi &amp; Kepemimpinan"
            title="Pengalaman Organisasi"
            subtitle="Rekam jejak kontribusi aktif dalam manajemen organisasi, kepemimpinan departemen, dan hubungan masyarakat di Universitas Muhammadiyah Surakarta."
          />
        </Reveal>

        {/* ── 2-Column Responsive Grid ── */}
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((item, index) => (
            <Reveal key={item.event} delay={index * 50} direction="up" className="h-full">
              <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                <div>
                  {/* Top Bar */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-xs font-bold text-blue-800 shadow-xs">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                    {item.event}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-blue-700 sm:text-sm">
                    {item.organizer}
                  </p>

                  {/* Meta items */}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500 sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faLocationPin} className="h-3.5 w-3.5 text-slate-400" />
                      {item.location}
                    </span>
                    {item.audience && (
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5 text-slate-400" />
                        {item.audience}
                      </span>
                    )}
                  </div>

                  {/* Topics Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Documentation link */}
                {item.url && (
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
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
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
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
