"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faMagnifyingGlass,
  faArrowRight,
  faXmark,
  faFolderOpen,
  faUser,
  faCode,
  faEnvelope,
  faBriefcase,
  faCopy,
  faCheck,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data/projects";

interface CommandItem {
  id: string;
  category: "Navigasi" | "Proyek" | "Aksi Cepat" | "Terminal";
  title: string;
  subtitle?: string;
  icon: import("@fortawesome/fontawesome-svg-core").IconDefinition;
  action: () => void;
}

interface TerminalLog {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"search" | "terminal">("search");
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      command: "welcome",
      time: "00:00:01",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="font-bold text-white">
            Faiz Arfian Ilhami: Quick Navigation &amp; Commands
          </p>
          <p className="text-slate-400">
            Ketik <span className="text-emerald-400 font-bold">help</span> untuk melihat daftar perintah, atau gunakan pencarian untuk melompat langsung.
          </p>
        </div>
      ),
    },
  ]);

  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      if (mode === "search") {
        searchInputRef.current?.focus();
      } else {
        terminalInputRef.current?.focus();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (mode === "terminal") {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, mode]);

  const email = "faizarfianilhami020204@gmail.com";

  const navigateTo = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const commands: CommandItem[] = [
    {
      id: "mode-terminal",
      category: "Terminal",
      title: "Buka Interactive Shell / Terminal Mode",
      subtitle: "Jalankan perintah CLI langsung di browser",
      icon: faTerminal,
      action: () => setMode("terminal"),
    },
    {
      id: "nav-about",
      category: "Navigasi",
      title: "Tentang Saya & Latar Belakang",
      subtitle: "Profil, edukasi Teknik Informatika UMS, dan kapabilitas",
      icon: faUser,
      action: () => navigateTo("/#about"),
    },
    {
      id: "nav-skills",
      category: "Navigasi",
      title: "Keahlian & Tech Stack",
      subtitle: "Laravel, PHP, MySQL, React, Next.js, TypeScript, Python",
      icon: faCode,
      action: () => navigateTo("/#skills"),
    },
    {
      id: "nav-projects",
      category: "Navigasi",
      title: "Katalog Proyek & Studi Kasus",
      subtitle: "Jelajahi seluruh sistem web yang telah dibangun",
      icon: faFolderOpen,
      action: () => navigateTo("/#projects"),
    },
    {
      id: "nav-experience",
      category: "Navigasi",
      title: "Pengalaman Organisasi & Kepemimpinan",
      subtitle: "Rekam jejak organisasi BEM FKI & HIMATIF UMS",
      icon: faBriefcase,
      action: () => navigateTo("/#experience"),
    },
    {
      id: "nav-github",
      category: "Navigasi",
      title: "Aktivitas Repositori GitHub",
      subtitle: "Pantau heatmap kontribusi dan repositori aktif",
      icon: faGithub,
      action: () => navigateTo("/#github"),
    },
    {
      id: "nav-contact",
      category: "Navigasi",
      title: "Formulir Kontak & Diskusi",
      subtitle: "Kirim pesan kolaborasi atau diskusi teknis",
      icon: faEnvelope,
      action: () => navigateTo("/#contact"),
    },
    ...PROJECTS.map((p) => ({
      id: `proj-${p.slug}`,
      category: "Proyek" as const,
      title: p.name,
      subtitle: `${p.category || "Full Stack"} • ${p.tech.slice(0, 3).join(", ")}`,
      icon: faFolderOpen,
      action: () => navigateTo(`/projects/${p.slug}`),
    })),
    {
      id: "act-change-lang",
      category: "Aksi Cepat",
      title: "Pilih Bahasa / Change Language",
      subtitle: "Terjemahkan seluruh halaman ke English, العربية, 日本語, dll.",
      icon: faGlobe,
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("open-language-modal"));
      },
    },
    {
      id: "act-copy-email",
      category: "Aksi Cepat",
      title: "Salin Alamat Email",
      subtitle: email,
      icon: copied ? faCheck : faCopy,
      action: () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "act-github-profile",
      category: "Aksi Cepat",
      title: "Buka Profil GitHub @faizarfi",
      subtitle: "github.com/faizarfi",
      icon: faGithub,
      action: () => {
        window.open("https://github.com/faizarfi", "_blank", "noopener,noreferrer");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = query.trim()
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredCommands[selectedIndex] ?? filteredCommands[0];
      target?.action();
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    setTerminalHistory((prev) => [...prev, terminalInput]);
    setHistoryIndex(-1);

    const now = new Date().toTimeString().split(" ")[0];
    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white mb-1">Daftar Perintah yang Tersedia:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400 font-bold">whoami</span> : Ringkasan biodata &amp; profil</div>
              <div><span className="text-emerald-400 font-bold">skills</span> : Daftar keahlian &amp; tech stack</div>
              <div><span className="text-emerald-400 font-bold">projects</span> : Katalog proyek &amp; studi kasus</div>
              <div><span className="text-emerald-400 font-bold">experience</span> : Pengalaman organisasi</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Saluran komunikasi &amp; kontak</div>
              <div><span className="text-emerald-400 font-bold">github</span> : Buka profil GitHub resmi</div>
              <div><span className="text-emerald-400 font-bold">status</span> : Ketersediaan kerja</div>
              <div><span className="text-emerald-400 font-bold">sudo hire</span> : Menuju formulir kontak</div>
              <div><span className="text-emerald-400 font-bold">clear</span> : Bersihkan layar terminal</div>
              <div><span className="text-emerald-400 font-bold">exit</span> : Tutup terminal</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-slate-300">
            <p><span className="font-bold text-white">Nama:</span> Faiz Arfian Ilhami</p>
            <p><span className="font-bold text-white">Pendidikan:</span> S1 Teknik Informatika, Universitas Muhammadiyah Surakarta (Lulus 2026, IPK 3.3)</p>
            <p><span className="font-bold text-white">Fokus:</span> Software Engineer &amp; Full Stack Web Developer (Laravel, React, Next.js, MySQL)</p>
            <p><span className="font-bold text-white">Lokasi:</span> Indonesia (Terbuka untuk Remote &amp; On-Site)</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-slate-300">
            <div>
              <p className="font-bold text-emerald-400">Backend &amp; Database:</p>
              <p>PHP 8.2+, Laravel 11/12 (Blade, Eloquent, Authentication, Scheduler), MySQL 8.0, RESTful API</p>
            </div>
            <div>
              <p className="font-bold text-emerald-400">Frontend &amp; UI:</p>
              <p>Next.js 16 (App Router), React 19, TypeScript, JavaScript (ES6+), Tailwind CSS</p>
            </div>
            <div>
              <p className="font-bold text-emerald-400">Tooling &amp; Otomasi:</p>
              <p>Git &amp; GitHub, Postman API Testing, Python (Django &amp; Playwright), Node.js</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="font-bold text-white">Daftar Proyek Pilihan ({PROJECTS.length}):</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.slug} className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                <span>
                  {idx + 1}. <span className="font-bold text-white">{p.name}</span> ({p.category || "Full Stack"})
                </span>
                <button
                  type="button"
                  onClick={() => navigateTo(`/projects/${p.slug}`)}
                  className="text-emerald-400 hover:underline font-mono text-xs shrink-0"
                >
                  [Buka Detail]
                </button>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">Rekam Jejak Organisasi:</p>
            <p>&bull; <span className="font-bold text-white">BEM FKI UMS:</span> Kepala Departemen IPO (2025) &amp; Anggota (2023)</p>
            <p>&bull; <span className="font-bold text-white">HIMATIF UMS:</span> Penanggung Jawab Humas PARTI (2024) &amp; Anggota Sosial Masyarakat (2022 - 2024)</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-slate-300">
            <p><span className="font-bold text-white">Email:</span> {email}</p>
            <p><span className="font-bold text-white">GitHub:</span> https://github.com/faizarfi</p>
            <p><span className="font-bold text-white">LinkedIn:</span> https://www.linkedin.com/in/faizarfianilhami</p>
            <p className="mt-2 text-emerald-400">Silakan hubungi melalui email atau formulir kontak.</p>
          </div>
        );
        break;

      case "github":
        output = <p className="text-emerald-400">Membuka profil GitHub @faizarfi...</p>;
        setTimeout(() => window.open("https://github.com/faizarfi", "_blank", "noopener,noreferrer"), 400);
        break;

      case "status":
        output = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <p className="text-emerald-400 font-bold">[STATUS KETERSEDIAAN]</p>
            <p>Status: <span className="text-white font-bold">Terbuka untuk Pekerjaan &amp; Proyek Web</span></p>
            <p>Posisi: Full-time Software Engineer / Web Developer (Remote &amp; On-Site)</p>
            <p>Spesialisasi: Laravel, React, Next.js, TypeScript, MySQL</p>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        output = (
          <div className="space-y-1.5 p-3 rounded-lg border border-emerald-500/40 bg-emerald-950/30 text-emerald-300">
            <p className="font-bold text-white">Hubungi Faiz Arfian Ilhami</p>
            <p>Mengarahkan Anda ke bagian formulir kontak...</p>
          </div>
        );
        setTimeout(() => navigateTo("/#contact"), 600);
        break;

      case "clear":
        setTerminalLogs([]);
        setTerminalInput("");
        return;

      case "exit":
        setIsOpen(false);
        setTerminalInput("");
        return;

      default:
        output = (
          <p className="text-rose-400">
            Perintah &quot;{terminalInput}&quot; tidak dikenali. Ketik <span className="font-bold text-white">help</span> untuk melihat daftar perintah.
          </p>
        );
        break;
    }

    setTerminalLogs((prev) => [
      ...prev,
      {
        command: terminalInput,
        output,
        time: now,
      },
    ]);
    setTerminalInput("");
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (terminalHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? terminalHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setTerminalInput(terminalHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < terminalHistory.length) {
          setHistoryIndex(nextIdx);
          setTerminalInput(terminalHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setTerminalInput("");
        }
      }
    }
  };

  const executeChipCommand = (cmd: string) => {
    setTerminalInput(cmd);
    terminalInputRef.current?.focus();
  };

  const isOutsideDialog = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="command-palette-title"
      onClose={() => setIsOpen(false)}
      onPointerDown={(e) => {
        pressedOutsideRef.current = isOutsideDialog(e);
      }}
      onPointerUp={(e) => {
        if (pressedOutsideRef.current && isOutsideDialog(e)) {
          setIsOpen(false);
        }
        pressedOutsideRef.current = false;
      }}
      {...({ closedby: "any" } as Record<string, string>)}
      className="m-auto w-[calc(100%-1.5rem)] max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-0 text-slate-100 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs"
    >
      <h2 id="command-palette-title" className="sr-only">
        Navigasi Cepat dan Terminal Interaktif
      </h2>

      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setMode("search")}
            className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
              mode === "search"
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" className="h-3 w-3" />
            <span>Spotlight Search</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("terminal")}
            className={`flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
              mode === "terminal"
                ? "bg-slate-800 text-emerald-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FontAwesomeIcon icon={faTerminal} aria-hidden="true" className="h-3 w-3" />
            <span>CLI Terminal</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <kbd className="hidden sm:inline-block rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
            ESC untuk tutup
          </kbd>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup navigasi cepat"
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {mode === "search" && (
        <div>
          <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5">
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" className="h-4 w-4 text-slate-400" />
            <label htmlFor="command-search-input" className="sr-only">
              Cari halaman, proyek, atau aksi
            </label>
            <input
              ref={searchInputRef}
              id="command-search-input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Cari halaman, proyek, keahlian, atau aksi cepat..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-slate-300 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-800/40">
            {filteredCommands.length === 0 ? (
              <div className="py-10 text-center font-mono text-xs text-slate-400">
                Tidak ada hasil yang cocok dengan &quot;{query}&quot;.
              </div>
            ) : (
              filteredCommands.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                        <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        {item.subtitle && (
                          <p className="text-[11px] text-slate-400 truncate max-w-sm">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 ml-2">
                      <span className="font-mono text-[10px] uppercase text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                      {isSelected && (
                        <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="h-3 w-3 text-slate-300" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-slate-800 bg-slate-950 px-4 py-2.5 flex items-center justify-between font-mono text-[10px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>Panah Atas/Bawah Navigasi</span>
              <span>Enter Pilih</span>
              <span>ESC Tutup</span>
            </div>
            <div>
              Pintasan: <span className="text-emerald-400">Ctrl+K</span>
            </div>
          </div>
        </div>
      )}

      {mode === "terminal" && (
        <div className="font-mono text-xs">
          <div className="h-[340px] overflow-y-auto p-4 space-y-3.5 bg-slate-950 select-text">
            {terminalLogs.map((log, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">faiz@portfolio:~$</span>
                  <span className="text-white font-bold">{log.command}</span>
                  <span className="text-[10px] text-slate-400 ml-auto">{log.time}</span>
                </div>
                <div className="pl-4 text-slate-300 leading-relaxed border-l-2 border-slate-800">
                  {log.output}
                </div>
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          <form
            onSubmit={handleTerminalSubmit}
            className="flex items-center gap-2 border-t border-slate-800 bg-slate-900 px-4 py-3"
          >
            <label htmlFor="terminal-command-input" className="text-emerald-400 font-bold shrink-0">
              faiz@portfolio:~$
            </label>
            <input
              ref={terminalInputRef}
              id="terminal-command-input"
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleTerminalKeyDown}
              placeholder="ketik help, projects, skills, whoami, atau sudo hire..."
              className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none font-mono text-xs"
            />
          </form>

          <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-800 bg-slate-950 px-4 py-2.5">
            <span className="text-[10px] text-slate-400 mr-1">Saran:</span>
            {["help", "whoami", "skills", "projects", "status", "sudo hire", "clear"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeChipCommand(cmd)}
                className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] font-mono text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
