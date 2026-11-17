"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faDatabase,
  faShieldHalved,
  faNetworkWired,
  faKey,
  faCircleCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import type { ProjectArchitecture } from "@/lib/data/projects";

interface ProjectBlueprintProps {
  architecture: ProjectArchitecture;
}

export default function ProjectBlueprint({ architecture }: ProjectBlueprintProps) {
  const [activeTab, setActiveTab] = useState<"layers" | "erd" | "highlights">("layers");
  const [expandedTable, setExpandedTable] = useState<string | null>(
    architecture.tables[0]?.name || null
  );

  return (
    <div className="rounded-2xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-2.5 py-1 text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 mb-2">
            <FontAwesomeIcon icon={faNetworkWired} aria-hidden="true" className="h-3 w-3 text-slate-700 dark:text-zinc-300" />
            <span>SYSTEM ARCHITECTURE &amp; DATA BLUEPRINT</span>
          </div>
          <h3 className="font-display text-lg font-black text-slate-950 dark:text-white sm:text-xl">
            Arsitektur Sistem &amp; Skema Database
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-zinc-300 sm:text-sm">
            {architecture.summary}
          </p>
        </div>

        <div role="tablist" aria-label="Tampilan arsitektur sistem" className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-300 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 p-1 shrink-0 font-mono text-xs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "layers"}
            onClick={() => setActiveTab("layers")}
            className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
              activeTab === "layers"
                ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-2xs"
                : "text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800"
            }`}
          >
            <FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" className="h-3 w-3" />
            <span>Alur Lapisan</span>
          </button>

          {architecture.tables.length > 0 && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "erd"}
              onClick={() => setActiveTab("erd")}
              className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                activeTab === "erd"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-2xs"
                  : "text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800"
              }`}
            >
              <FontAwesomeIcon icon={faDatabase} aria-hidden="true" className="h-3 w-3" />
              <span>ERD Database</span>
            </button>
          )}

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "highlights"}
            onClick={() => setActiveTab("highlights")}
            className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
              activeTab === "highlights"
                ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-2xs"
                : "text-slate-600 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800"
            }`}
          >
            <FontAwesomeIcon icon={faShieldHalved} aria-hidden="true" className="h-3 w-3" />
            <span>Keamanan &amp; Fitur</span>
          </button>
        </div>
      </div>

      {activeTab === "layers" && (
        <div className="space-y-4">
          <p className="font-mono text-xs text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
            {`// Alur Pemrosesan Data dan Layering Arsitektur`}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {architecture.layers.map((layer, index) => (
              <div
                key={layer.tier}
                className="relative flex flex-col justify-between rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-900/80 p-4 transition-colors hover:border-slate-400 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-zinc-400">
                      {layer.tier}
                    </span>
                    <span className="rounded bg-slate-200/80 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-700 dark:text-zinc-300">
                      STEP {index + 1}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white">
                    {layer.title}
                  </h4>
                  <p className="mt-1 font-mono text-xs font-semibold text-slate-700 dark:text-zinc-300">
                    {layer.tech}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "erd" && architecture.tables.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
              {`// Skema Tabel Basis Data Relasional (${architecture.tables.length} Tabel)`}
            </p>
            <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400">
              Relational Schema
            </span>
          </div>

          <div className="space-y-3">
            {architecture.tables.map((table) => {
              const isExpanded = expandedTable === table.name;
              return (
                <div
                  key={table.name}
                  className="overflow-hidden rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedTable(isExpanded ? null : table.name)}
                    className="flex w-full items-center justify-between gap-3 p-3.5 text-left bg-slate-50/90 dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <FontAwesomeIcon icon={faDatabase} aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-zinc-300" />
                      <span className="font-mono text-xs font-bold text-slate-950 dark:text-white shrink-0">
                        {table.name}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-zinc-400 truncate">
                        : {table.description}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-slate-600 dark:text-zinc-400">
                      <span>{table.columns.length} Kolom</span>
                      <FontAwesomeIcon
                        icon={isExpanded ? faChevronUp : faChevronDown}
                        aria-hidden="true"
                        className="h-3 w-3 text-slate-600 dark:text-zinc-400"
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 text-[10px] uppercase">
                              <th scope="col" className="pb-2 pr-3 font-bold">Kolom</th>
                              <th scope="col" className="pb-2 pr-3 font-bold">Tipe Data</th>
                              <th scope="col" className="pb-2 pr-3 font-bold">Key / Index</th>
                              <th scope="col" className="pb-2 font-bold">Deskripsi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                            {table.columns.map((col) => (
                              <tr key={col.name} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40">
                                <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">
                                  {col.name}
                                </td>
                                <td className="py-2 pr-3 text-slate-600 dark:text-zinc-300">
                                  {col.type}
                                </td>
                                <td className="py-2 pr-3">
                                  {col.key === "PK" && (
                                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 px-1.5 py-0.5 text-[9px] font-bold text-amber-900 dark:text-amber-300">
                                      <FontAwesomeIcon icon={faKey} aria-hidden="true" className="h-2 w-2" />
                                      PK
                                    </span>
                                  )}
                                  {col.key === "FK" && (
                                    <span className="inline-flex items-center gap-1 rounded bg-blue-100 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 px-1.5 py-0.5 text-[9px] font-bold text-blue-900 dark:text-blue-300">
                                      FK
                                    </span>
                                  )}
                                  {col.key === "IDX" && (
                                    <span className="inline-flex items-center gap-1 rounded bg-slate-200 dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-slate-700 dark:text-zinc-300">
                                      INDEX
                                    </span>
                                  )}
                                  {!col.key && <span className="text-slate-500 dark:text-zinc-400">-</span>}
                                </td>
                                <td className="py-2 text-slate-600 dark:text-zinc-300 font-sans text-xs">
                                  {col.desc}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {table.relations && table.relations.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono text-[10px] font-bold text-slate-600 dark:text-zinc-400 uppercase">
                            Relasi:
                          </span>
                          {table.relations.map((rel, idx) => (
                            <span
                              key={idx}
                              className="rounded border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300"
                            >
                              {rel}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "highlights" && (
        <div className="space-y-4">
          <p className="font-mono text-xs text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
            {`// Prinsip Keamanan, Integritas Data, dan Keputusan Desain`}
          </p>

          <div className="space-y-2.5">
            {architecture.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/60 p-3.5"
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400"
                />
                <span className="text-xs leading-relaxed font-medium text-slate-700 dark:text-zinc-200 sm:text-sm">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
