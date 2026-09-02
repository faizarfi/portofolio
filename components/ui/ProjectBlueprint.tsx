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
import { ProjectArchitecture } from "@/lib/data/projects";

interface ProjectBlueprintProps {
  architecture: ProjectArchitecture;
}

export default function ProjectBlueprint({ architecture }: ProjectBlueprintProps) {
  const [activeTab, setActiveTab] = useState<"layers" | "erd" | "highlights">("layers");
  const [expandedTable, setExpandedTable] = useState<string | null>(
    architecture.tables[0]?.name || null
  );

  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-7 shadow-xs">
      {/* ── Blueprint Header ── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-mono font-bold text-slate-800 mb-2">
            <FontAwesomeIcon icon={faNetworkWired} className="h-3 w-3 text-slate-700" />
            <span>SYSTEM ARCHITECTURE &amp; DATA BLUEPRINT</span>
          </div>
          <h3 className="font-display text-lg font-black text-slate-950 sm:text-xl">
            Arsitektur Sistem &amp; Skema Database
          </h3>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            {architecture.summary}
          </p>
        </div>

        {/* ── View Toggle Tabs ── */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 p-1 shrink-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab("layers")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
              activeTab === "layers"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60"
            }`}
          >
            <FontAwesomeIcon icon={faLayerGroup} className="h-3 w-3" />
            <span>Alur Lapisan</span>
          </button>

          {architecture.tables.length > 0 && (
            <button
              onClick={() => setActiveTab("erd")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                activeTab === "erd"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60"
              }`}
            >
              <FontAwesomeIcon icon={faDatabase} className="h-3 w-3" />
              <span>ERD Database</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("highlights")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
              activeTab === "highlights"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/60"
            }`}
          >
            <FontAwesomeIcon icon={faShieldHalved} className="h-3 w-3" />
            <span>Keamanan &amp; Fitur</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: System Layers Flow ── */}
      {activeTab === "layers" && (
        <div className="space-y-4">
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
            // Alur Pemrosesan Data &amp; Layering Arsitektur
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {architecture.layers.map((layer, index) => (
              <div
                key={layer.tier}
                className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-slate-400 hover:bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] font-bold text-slate-500">
                      {layer.tier}
                    </span>
                    <span className="rounded bg-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-700">
                      STEP {index + 1}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-slate-950">
                    {layer.title}
                  </h4>
                  <p className="mt-1 font-mono text-xs font-semibold text-slate-700">
                    {layer.tech}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: Relational Database Schema / ERD ── */}
      {activeTab === "erd" && architecture.tables.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              // Skema Tabel Basis Data Relasional ({architecture.tables.length} Tabel)
            </p>
            <span className="font-mono text-[11px] text-slate-500">
              MySQL 8.0 &bull; InnoDB Engine
            </span>
          </div>

          <div className="space-y-3">
            {architecture.tables.map((table) => {
              const isExpanded = expandedTable === table.name;
              return (
                <div
                  key={table.name}
                  className="overflow-hidden rounded-xl border border-slate-300 bg-white transition-all shadow-2xs"
                >
                  {/* Table header bar */}
                  <div
                    onClick={() => setExpandedTable(isExpanded ? null : table.name)}
                    className="flex items-center justify-between p-3.5 bg-slate-50/90 cursor-pointer select-none hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FontAwesomeIcon icon={faDatabase} className="h-3.5 w-3.5 text-slate-700" />
                      <span className="font-mono text-xs font-bold text-slate-950">
                        {table.name}
                      </span>
                      <span className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                        &mdash; {table.description}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                      <span>{table.columns.length} Kolom</span>
                      <FontAwesomeIcon
                        icon={isExpanded ? faChevronUp : faChevronDown}
                        className="h-3 w-3 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Expanded Columns Table */}
                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-mono text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase">
                              <th className="pb-2 font-bold">Kolom</th>
                              <th className="pb-2 font-bold">Tipe Data</th>
                              <th className="pb-2 font-bold">Key / Index</th>
                              <th className="pb-2 font-bold">Deskripsi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {table.columns.map((col) => (
                              <tr key={col.name} className="hover:bg-slate-50">
                                <td className="py-2 pr-3 font-bold text-slate-900">
                                  {col.name}
                                </td>
                                <td className="py-2 pr-3 text-slate-600">
                                  {col.type}
                                </td>
                                <td className="py-2 pr-3">
                                  {col.key === "PK" && (
                                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 border border-amber-300 px-1.5 py-0.5 text-[9px] font-bold text-amber-900">
                                      <FontAwesomeIcon icon={faKey} className="h-2 w-2" />
                                      PK
                                    </span>
                                  )}
                                  {col.key === "FK" && (
                                    <span className="inline-flex items-center gap-1 rounded bg-blue-100 border border-blue-300 px-1.5 py-0.5 text-[9px] font-bold text-blue-900">
                                      FK
                                    </span>
                                  )}
                                  {col.key === "IDX" && (
                                    <span className="inline-flex items-center gap-1 rounded bg-slate-200 px-1.5 py-0.5 text-[9px] font-bold text-slate-700">
                                      INDEX
                                    </span>
                                  )}
                                  {!col.key && <span className="text-slate-400">&mdash;</span>}
                                </td>
                                <td className="py-2 text-slate-600 font-sans text-xs">
                                  {col.desc}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Relationships list */}
                      {table.relations && table.relations.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                            Relasi:
                          </span>
                          {table.relations.map((rel, idx) => (
                            <span
                              key={idx}
                              className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-700"
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

      {/* ── TAB 3: Engineering Highlights & Security ── */}
      {activeTab === "highlights" && (
        <div className="space-y-4">
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2">
            // Prinsip Keamanan, Integritas Data, &amp; Keputusan Desain
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {architecture.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-800"
                />
                <span className="text-xs leading-relaxed text-slate-700 sm:text-sm font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
