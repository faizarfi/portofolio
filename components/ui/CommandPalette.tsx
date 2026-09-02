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
  faDiagramProject,
  faCopy,
  faCheck,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data/projects";

interface CommandItem {
  id: string;
  category: "Navigasi" | "Proyek" | "Aksi Cepat" | "Terminal";
  title: string;
  subtitle?: string;
  icon: import("@fortawesome/fontawesome-svg-core").IconDefinition;
  action: () => void;
  shortcut?: string;
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
  
  // Terminal state
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
            Faiz Arfian Ilhami — Developer Interactive Shell [v2026.04]
          </p>
          <p className="text-slate-400">
            Ketik <span className="text-emerald-400 font-bold">help</span> untuk melihat daftar perintah, atau klik chip saran di bawah.
          </p>
        </div>
      ),
    },
  ]);

  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Global hotkeys listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Escape to close
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (mode === "search") {
          searchInputRef.current?.focus();
        } else {
          terminalInputRef.current?.focus();
        }
      }, 60);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, mode]);

  // Auto-scroll terminal
  useEffect(() => {
    if (mode === "terminal") {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, mode]);

  const email = "faizarfianilhami020204@gmail.com";
  const whatsappUrl = "https://wa.me/6282327867328?text=Halo%20Faiz%20Arfian%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web";

  // Navigation helper
  const navigateTo = (path: string) => {
    setIsOpen(false);
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(path);
    }
  };

  // Commands definition
  const commands: CommandItem[] = [
    {
      id: "mode-terminal",
      category: "Terminal",
      title: "Buka Interactive Shell / Terminal Mode",
      subtitle: "Jalankan perintah CLI langsung di browser",
      icon: faTerminal,
      shortcut: "CLI",
      action: () => setMode("terminal"),
    },
    {
      id: "nav-about",
      category: "Navigasi",
      title: "Tentang Saya & Latar Belakang",
      subtitle: "Profil, edukasi Teknik Informatika UMS, & kapabilitas",
      icon: faUser,
      action: () => navigateTo("/#about"),
    },
    {
      id: "nav-skills",
      category: "Navigasi",
      title: "Keahlian & Tech Stack",
      subtitle: "Laravel, Next.js, MySQL, Networking, & IT Tools",
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
      id: "nav-workflow",
      category: "Navigasi",
      title: "Workflow & Metodologi Kerja",
      subtitle: "Tahapan analisis, development, hingga deployment",
      icon: faDiagramProject,
      action: () => navigateTo("/#workflow"),
    },
    {
      id: "nav-org",
      category: "Navigasi",
      title: "Pengalaman Organisasi & BEM",
      subtitle: "Rekam jejak kepemimpinan & organisasi UMS",
      icon: faBriefcase,
      action: () => navigateTo("/#organizational-experience"),

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
      subtitle: "Kirim pesan kolaborasi atau bantuan IT",
      icon: faEnvelope,
      action: () => navigateTo("/#contact"),
    },
    // Dynamic Project links
    ...PROJECTS.map((p) => ({
      id: `proj-${p.slug}`,
      category: "Proyek" as const,
      title: p.name,
      subtitle: `${p.category || "Full Stack"} • ${p.tech.slice(0, 3).join(", ")}`,
      icon: faFolderOpen,
      action: () => navigateTo(`/projects/${p.slug}`),
    })),
    // Actions
    {
      id: "act-change-lang",
      category: "Aksi Cepat",
      title: "Pilih Bahasa / Change Language (80+ Bahasa Dunia)",
      subtitle: "Terjemahkan seluruh web ke English, العربية, 日本語, Deutsch, Español, dll.",
      icon: faGlobe,
      action: () => {
        setIsOpen(false);
        const btn = document.querySelector('button[title="Pilih Bahasa / Choose Language"]') as HTMLButtonElement;
        if (btn) btn.click();
      },
    },
    {
      id: "act-whatsapp",
      category: "Aksi Cepat",
      title: "Chat Langsung via WhatsApp",
      subtitle: "Hubungi Faiz Arfian (0823-2786-7328)",
      icon: faWhatsapp,
      action: () => {
        window.open(whatsappUrl, "_blank");
        setIsOpen(false);
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
        window.open("https://github.com/faizarfi", "_blank");
        setIsOpen(false);
      },
    },
  ];

  // Filter commands
  const filteredCommands = query.trim()
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Handle key navigation in search mode
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Terminal command executor
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
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
              <div><span className="text-emerald-400 font-bold">experience</span> : Pengalaman organisasi &amp; kepemimpinan</div>
              <div><span className="text-emerald-400 font-bold">contact</span> : Saluran komunikasi &amp; WhatsApp</div>
              <div><span className="text-emerald-400 font-bold">github</span> : Buka profil GitHub resmi</div>
              <div><span className="text-emerald-400 font-bold">status</span> : Telemetri kesiapan kerja</div>
              <div><span className="text-emerald-400 font-bold">sudo hire</span> : Rekrut Faiz untuk proyek/kerja</div>
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
            <p><span className="font-bold text-white">Pendidikan:</span> S1 Teknik Informatika — Universitas Muhammadiyah Surakarta (Lulus 2026, IPK 3.3)</p>
            <p><span className="font-bold text-white">Fokus:</span> Full Stack Web Developer &amp; IT Support (Troubleshooting LAN/Hardware)</p>
            <p><span className="font-bold text-white">Lokasi:</span> Indonesia (Terbuka untuk Remote &amp; On-Site ke Mana Saja)</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-slate-300">
            <div>
              <p className="font-bold text-emerald-400">Backend &amp; Database:</p>
              <p>PHP 8.2+, Laravel 11 (Blade, Eloquent, Authentication), MySQL 8.0, PostgreSQL, RESTful API</p>
            </div>
            <div>
              <p className="font-bold text-emerald-400">Frontend &amp; UI:</p>
              <p>Next.js 16 (App Router), React 19, TypeScript, JavaScript (ES6+), Tailwind CSS</p>
            </div>
            <div>
              <p className="font-bold text-emerald-400">IT Support &amp; Networking:</p>
              <p>LAN Crimping &amp; Subnetting, Mikrotik Router, Hardware Diagnostics, Windows/Linux Server OS</p>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="font-bold text-white">Daftar Proyek Unggulan:</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.slug} className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                <span>
                  {idx + 1}. <span className="font-bold text-white">{p.name}</span> ({p.category || "Full Stack"})
                </span>
                <button
                  onClick={() => navigateTo(`/projects/${p.slug}`)}
                  className="text-emerald-400 hover:underline font-mono text-xs"
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
            <p>&bull; <span className="font-bold text-white">BEM FKI UMS:</span> Koordinator Hubungan Masyarakat &amp; Komunikasi (2024–2025)</p>
            <p>&bull; <span className="font-bold text-white">HIMATIF UMS:</span> Anggota Divisi Pengembangan Sumber Daya Manusia (2023–2024)</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-slate-300">
            <p><span className="font-bold text-white">WhatsApp:</span> 0823-2786-7328</p>
            <p><span className="font-bold text-white">Email:</span> faizarfianilhami020204@gmail.com</p>
            <p><span className="font-bold text-white">GitHub:</span> https://github.com/faizarfi</p>
            <p className="mt-2 text-emerald-400">Menghubungkan ke WhatsApp...</p>
          </div>
        );
        setTimeout(() => window.open(whatsappUrl, "_blank"), 600);
        break;

      case "github":
        output = <p className="text-emerald-400">Membuka profil GitHub @faizarfi...</p>;
        setTimeout(() => window.open("https://github.com/faizarfi", "_blank"), 400);
        break;

      case "status":
        output = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <p className="text-emerald-400 font-bold">[SYSTEM TELEMETRY]</p>
            <p>Availability: <span className="text-white font-bold">READY FOR HIRE / PROJECT COLLAB</span></p>
            <p>Preferred Work: Full-time Web Developer / IT Support (Seluruh Indonesia &amp; Remote)</p>
            <p>Workstation: Windows 11 Pro &amp; Ubuntu WSL2 Environment</p>
            <p>Latency: &lt;15ms (Indonesia Cloud)</p>
          </div>
        );
        break;


      case "sudo hire":
      case "hire":
        output = (
          <div className="space-y-1.5 p-3 rounded-lg border border-emerald-500/40 bg-emerald-950/30 text-emerald-300">
            <p className="font-bold text-white">🎉 ACCESS GRANTED: Rekrutmen Diinisiasi!</p>
            <p>Terima kasih atas ketertarikan Anda! Faiz siap berkontribusi penuh dalam tim teknis Anda.</p>
            <p className="text-xs text-slate-400">Mengarahkan Anda langsung ke saluran WhatsApp resmi...</p>
          </div>
        );
        setTimeout(() => window.open(whatsappUrl, "_blank"), 1000);
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

  // History navigation in terminal
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
    setTimeout(() => {
      terminalInputRef.current?.focus();
    }, 10);
  };

  return (
    <>
      {/* ── Global Floating Trigger Button (Bottom Left) ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Buka Command Palette & Terminal"
        className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2 rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs font-mono font-semibold text-slate-800 shadow-md backdrop-blur-md transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white group"
      >
        <FontAwesomeIcon icon={faTerminal} className="h-3.5 w-3.5 text-slate-600 group-hover:text-emerald-400" />
        <span>Terminal</span>
        <kbd className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 group-hover:border-slate-700 group-hover:bg-slate-800 group-hover:text-slate-300">
          Ctrl K
        </kbd>
      </button>

      {/* ── Main Modal Backdrop ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-start justify-center p-3 sm:p-6 md:p-12 overflow-y-auto"
        >
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />

          {/* Dialog Container */}
          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden transition-all my-auto">
            
            {/* ── Modal Header Tabs ── */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setMode("search")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                    mode === "search"
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
                  <span>Spotlight Search</span>
                </button>

                <button
                  onClick={() => setMode("terminal")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-bold transition-colors ${
                    mode === "terminal"
                      ? "bg-slate-800 text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={faTerminal} className="h-3 w-3" />
                  <span>CLI Terminal</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-block rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                  ESC to close
                </kbd>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup"
                  className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ── MODE 1: Spotlight Search ── */}
            {mode === "search" && (
              <div>
                {/* Search Input Bar */}
                <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Cari halaman, proyek, keahlian, atau ketik perintah..."
                    className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Results List */}
                <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-800/40">
                  {filteredCommands.length === 0 ? (
                    <div className="py-10 text-center font-mono text-xs text-slate-400">
                      Tidak ada hasil yang cocok dengan &quot;{query}&quot;.
                    </div>
                  ) : (
                    filteredCommands.map((item, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-slate-800 text-white"
                              : "text-slate-300 hover:bg-slate-800/60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-slate-400 border border-slate-800">
                              <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{item.title}</p>
                              {item.subtitle && (
                                <p className="text-[11px] text-slate-400 truncate max-w-sm">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded">
                              {item.category}
                            </span>
                            {isSelected && (
                              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 text-slate-400" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer hints */}
                <div className="border-t border-slate-800 bg-slate-950/60 px-4 py-2.5 flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <div className="flex items-center gap-3">
                    <span>↑↓ Navigasi</span>
                    <span>↵ Pilih</span>
                    <span>ESC Tutup</span>
                  </div>
                  <div>
                    Tip: Ketik <span className="text-emerald-400">CLI</span> untuk masuk ke shell
                  </div>
                </div>
              </div>
            )}

            {/* ── MODE 2: Interactive Terminal ── */}
            {mode === "terminal" && (
              <div className="font-mono text-xs">
                {/* Terminal logs viewport */}
                <div className="h-[340px] overflow-y-auto p-4 space-y-3.5 bg-slate-950/90 select-text">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-emerald-400 font-bold">faiz@portfolio:~$</span>
                        <span className="text-white font-bold">{log.command}</span>
                        <span className="text-[10px] text-slate-600 ml-auto">{log.time}</span>
                      </div>
                      <div className="pl-4 text-slate-300 leading-relaxed border-l-2 border-slate-800">
                        {log.output}
                      </div>
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Terminal prompt input */}
                <form
                  onSubmit={handleTerminalSubmit}
                  className="flex items-center gap-2 border-t border-slate-800 bg-slate-900 px-4 py-3"
                >
                  <span className="text-emerald-400 font-bold shrink-0">faiz@portfolio:~$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    placeholder="ketik help, projects, skills, whoami, atau sudo hire..."
                    className="w-full bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-xs"
                    autoFocus
                  />
                </form>

                {/* Quick Chips Suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-800/80 bg-slate-950/80 px-4 py-2.5">
                  <span className="text-[10px] text-slate-500 mr-1">Saran:</span>
                  {["help", "whoami", "skills", "projects", "status", "sudo hire", "clear"].map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => executeChipCommand(cmd)}
                      className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
