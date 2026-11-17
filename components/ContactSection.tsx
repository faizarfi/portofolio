"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faCopy,
  faCheck,
  faArrowUpRightFromSquare,
  faShieldHalved,
  faSpinner,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import { SectionHeading, Reveal } from "@/components/ui";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          retry?: "auto" | "never";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode?: string) => boolean | void;
        }
      ) => string;
      reset?: (widgetId?: string) => void;
      remove?: (widgetId?: string) => void;
      getResponse?: (widgetId?: string) => string;
    };
  }
}

const SUBJECT_OPTIONS = [
  "Pembuatan Website / Aplikasi Web Baru",
  "Pengembangan Sistem Informasi / Dashboard",
  "Konsultasi Teknis & Arsitektur Web",
  "Peluang Kerja / Kolaborasi Proyek",
  "Lainnya / Diskusi Santai",
];

const DEV_TEST_SITEKEY = "1x00000000000000000000AA";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [turnstileStatus, setTurnstileStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileErrorCode, setTurnstileErrorCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    subject: SUBJECT_OPTIONS[0],
    message: "",
  });

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const email = "faizarfianilhami020204@gmail.com";

  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === "development" ? DEV_TEST_SITEKEY : "");

  const renderTurnstileWidget = useCallback(() => {
    const container = turnstileContainerRef.current;
    if (!container || !window.turnstile || !siteKey) return;
    if (widgetIdRef.current) return;

    try {
      const id = window.turnstile.render(container, {
        sitekey: siteKey,
        theme: "auto",
        retry: "never",
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileErrorCode(null);
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
        "error-callback": (errorCode?: string) => {
          setTurnstileToken("");
          setTurnstileErrorCode(errorCode || "400020");
          // Return true so Turnstile treats the error as handled and stops throwing uncaught errors
          return true;
        },
      });
      widgetIdRef.current = id;
    } catch {
      setTurnstileErrorCode("render-failed");
    }
  }, [siteKey]);

  useEffect(() => {
    const timer = window.setTimeout(renderTurnstileWidget, 0);
    return () => {
      window.clearTimeout(timer);
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore teardown errors when script has not initialized
        }
        widgetIdRef.current = null;
      }
    };
  }, [renderTurnstileWidget]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getFormattedMessage = () => {
    const namePart = formData.name ? `Halo Faiz, perkenalkan saya ${formData.name}.` : "Halo Faiz,";
    const contactPart = formData.contactInfo ? ` (Kontak: ${formData.contactInfo})` : "";
    const subjectPart = `Mengenai: ${formData.subject}.`;
    const messagePart = formData.message ? `\n\nPesan:\n${formData.message}` : "";
    return `${namePart}${contactPart}\n${subjectPart}${messagePart}`;
  };

  const getMailtoUrl = () => {
    const sender = formData.name.trim() || "Pengunjung Portofolio";
    const subject = encodeURIComponent(`[Inquiry Portofolio] ${formData.subject} - ${sender}`);
    const body = encodeURIComponent(getFormattedMessage());
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    const draft = `Kepada: ${email}\nSubjek: [Inquiry Portofolio] ${formData.subject}\n\n${getFormattedMessage()}`;
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length < 2 || formData.message.trim().length < 5) {
      setTurnstileStatus("error");
      setStatusMessage("Mohon isi nama (minimal 2 karakter) dan detail pesan (minimal 5 karakter).");
      return;
    }

    const token =
      turnstileToken ||
      (widgetIdRef.current && window.turnstile?.getResponse?.(widgetIdRef.current)) ||
      "";

    if (!token) {
      setTurnstileStatus("error");
      setStatusMessage(
        turnstileErrorCode
          ? "Widget verifikasi Turnstile tidak aktif pada domain ini. Silakan gunakan tombol Kirim Email Langsung atau Salin Draf Pesan."
          : "Mohon selesaikan verifikasi keamanan Cloudflare Turnstile terlebih dahulu."
      );
      return;
    }

    setTurnstileStatus("verifying");
    setStatusMessage("Memvalidasi keamanan dan memproses pesan...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          "cf-turnstile-response": token,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setTurnstileStatus("error");
        setStatusMessage(data.message || "Verifikasi gagal, silakan coba lagi.");
        if (widgetIdRef.current && window.turnstile?.reset) {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken("");
        }
        return;
      }

      setTurnstileStatus("success");
      setStatusMessage(data.message || "Verifikasi berhasil!");

      if (data.deliveredDirectly) {
        setFormData({
          name: "",
          contactInfo: "",
          subject: SUBJECT_OPTIONS[0],
          message: "",
        });
      } else {
        window.location.href = getMailtoUrl();
      }

      if (widgetIdRef.current && window.turnstile?.reset) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    } catch {
      setTurnstileStatus("error");
      setStatusMessage("Terjadi kendala jaringan saat memverifikasi keamanan. Silakan coba lagi.");
    }
  };

  return (
    <section id="contact" className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={renderTurnstileWidget}
        />
      )}

      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Kontak &amp; Kolaborasi"
            title="Mari Terhubung &amp; Berdiskusi"
            subtitle="Saya terbuka untuk peluang kerja sama rekayasa perangkat lunak, pengembangan sistem informasi instansi, maupun konsultasi teknis."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={40} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-7 lg:p-8">
              <div>
                <p className="mb-2 font-mono text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Karanganyar / Surakarta / Remote &bull; Terbuka untuk Diskusi &amp; Proyek Baru
                </p>

                <h3 className="font-display text-lg font-black text-slate-950 dark:text-white sm:text-xl lg:text-2xl">
                  Punya kebutuhan sistem atau kendala teknis?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  Kirimkan gambaran kebutuhan Anda melalui formulir di bawah ini, atau salin draf pesan siap kirim jika perangkat Anda tidak memiliki aplikasi email bawaan.
                </p>

                <form onSubmit={handleSendEmail} className="mt-6 space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                        NAMA ANDA
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nama lengkap Anda"
                        className="w-full min-h-[42px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-zinc-400 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-info" className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                        EMAIL / KONTAK ANDA
                      </label>
                      <input
                        id="contact-info"
                        name="contactInfo"
                        type="text"
                        autoComplete="email"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="email@domain.com"
                        className="w-full min-h-[42px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-zinc-400 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                      KEBUTUHAN / TOPIK
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full min-h-[42px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white"
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                      DETAIL PESAN
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan singkat kebutuhan sistem atau kendala teknis yang ingin didiskusikan..."
                      className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-zinc-400 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white"
                    />
                  </div>

                  <div className="pt-1">
                    <div
                      ref={turnstileContainerRef}
                      className={turnstileErrorCode || !siteKey ? "hidden" : "min-h-[65px]"}
                    />
                    {(turnstileErrorCode || !siteKey) && (
                      <div className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 p-3 text-xs text-amber-900 dark:text-amber-200">
                        <p className="font-semibold">
                          {turnstileErrorCode
                            ? `Verifikasi Turnstile tidak tersedia untuk host saat ini (kode: ${turnstileErrorCode}).`
                            : "Widget verifikasi Turnstile belum dikonfigurasi."}
                        </p>
                        <p className="mt-1 text-[11px] text-amber-800 dark:text-amber-300">
                          Anda tetap dapat mengirim pesan lewat tombol Buka Email Langsung atau menyalin draf terformat di bawah.
                        </p>
                      </div>
                    )}
                  </div>

                  {statusMessage && (
                    <div
                      role={turnstileStatus === "error" ? "alert" : "status"}
                      aria-live="polite"
                      className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium ${
                        turnstileStatus === "error"
                          ? "border border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                          : turnstileStatus === "success"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                          : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={turnstileStatus === "verifying" ? faSpinner : faShieldHalved}
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 shrink-0 ${turnstileStatus === "verifying" ? "animate-spin text-slate-600 dark:text-zinc-400" : ""}`}
                      />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {!turnstileErrorCode && siteKey && (
                      <button
                        type="submit"
                        disabled={turnstileStatus === "verifying"}
                        className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-5 py-2.5 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50"
                      >
                        <FontAwesomeIcon
                          icon={turnstileStatus === "verifying" ? faSpinner : faEnvelope}
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 ${turnstileStatus === "verifying" ? "animate-spin" : ""}`}
                        />
                        <span>{turnstileStatus === "verifying" ? "Memverifikasi..." : "Kirim Pesan"}</span>
                      </button>
                    )}

                    {(turnstileErrorCode || !siteKey) && (
                      <a
                        href={getMailtoUrl()}
                        className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-5 py-2.5 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
                      >
                        <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="h-3.5 w-3.5" />
                        <span>Buka Email Langsung</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800"
                    >
                      <FontAwesomeIcon
                        icon={copiedDraft ? faCheck : faFileLines}
                        aria-hidden="true"
                        className={copiedDraft ? "h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" : "h-3.5 w-3.5 text-slate-600 dark:text-zinc-300"}
                      />
                      <span>{copiedDraft ? "Draf Tersalin!" : "Salin Draf Pesan"}</span>
                    </button>
                  </div>
                </form>

                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                      <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-800 dark:text-zinc-200 sm:text-sm truncate">
                      {email}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[38px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-700 hover:border-slate-400 dark:hover:border-zinc-600"
                  >
                    <FontAwesomeIcon
                      icon={copiedEmail ? faCheck : faCopy}
                      aria-hidden="true"
                      className={copiedEmail ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-zinc-300"}
                    />
                    <span>{copiedEmail ? "Tersalin!" : "Salin Email"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 dark:border-zinc-800 pt-4 text-xs font-mono text-slate-600 dark:text-zinc-400">
                <FontAwesomeIcon icon={faMapPin} aria-hidden="true" className="h-3.5 w-3.5 text-slate-600 dark:text-zinc-400" />
                <span>Indonesia (Terbuka untuk Remote &amp; On-Site)</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} direction="right" className="lg:col-span-5">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="font-mono mb-4 text-xs font-bold tracking-wider text-slate-600 dark:text-zinc-400 uppercase">
                  Profil &amp; Saluran Komunikasi
                </p>
                <div className="space-y-2.5">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[52px] items-center justify-between rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 px-4 py-3 transition-colors hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-2xs">
                          <FontAwesomeIcon icon={icon} aria-hidden="true" className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          {label}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        aria-hidden="true"
                        className="h-3 w-3 text-slate-600 dark:text-zinc-400"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/60 p-4 text-xs text-slate-800 dark:text-zinc-200 sm:text-sm">
                  <p className="font-bold">Respon Tanggap &amp; Komunikasi Jelas</p>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-zinc-400">
                    Aktif menanggapi pesan diskusi proyek dan konsultasi teknis setiap hari kerja.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
