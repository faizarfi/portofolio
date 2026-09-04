"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faCopy,
  faCheck,
  faArrowUpRightFromSquare,
  faShieldHalved,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import { SectionHeading, Reveal } from "@/components/ui";

const SUBJECT_OPTIONS = [
  "Pembuatan Website / Aplikasi Web Baru",
  "Pengembangan Sistem Informasi / Dashboard",
  "Bantuan Teknis IT & Troubleshooting",
  "Peluang Kerja / Kolaborasi Proyek",
  "Lainnya / Konsultasi Santai",
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [turnstileStatus, setTurnstileStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    subject: SUBJECT_OPTIONS[0],
    message: "",
  });

  const email = "faizarfianilhami020204@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getFormattedMessage = () => {
    const namePart = formData.name ? `Halo Faiz, perkenalkan saya ${formData.name}.` : "Halo Faiz,";
    const contactPart = formData.contactInfo ? ` (Kontak: ${formData.contactInfo})` : "";
    const subjectPart = `Mengenai: ${formData.subject}.`;
    const messagePart = formData.message ? `\n\nPesan:\n${formData.message}` : "";
    return `${namePart}${contactPart}\n${subjectPart}${messagePart}`;
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Ambil token dari widget Turnstile
    const turnstileInput = document.querySelector(
      'input[name="cf-turnstile-response"]'
    ) as HTMLInputElement | null;
    const token =
      turnstileInput?.value ||
      (typeof window !== "undefined" &&
      (window as unknown as { turnstile?: { getResponse?: () => string } }).turnstile?.getResponse?.()
        ? (window as unknown as { turnstile?: { getResponse?: () => string } }).turnstile!.getResponse!()
        : "");

    if (!token) {
      setTurnstileStatus("error");
      setStatusMessage("Mohon selesaikan verifikasi keamanan Cloudflare Turnstile terlebih dahulu.");
      return;
    }

    setTurnstileStatus("verifying");
    setStatusMessage("Memvalidasi keamanan Turnstile...");

    try {
      // 2. Kirim validasi ke API Route Backend (/api/contact)
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
        setStatusMessage(data.message || "Verifikasi bot gagal, silakan coba lagi.");
        if (typeof window !== "undefined" && (window as unknown as { turnstile?: { reset?: () => void } }).turnstile) {
          (window as unknown as { turnstile?: { reset?: () => void } }).turnstile!.reset!();
        }
        return;
      }

      // 3. Jika validasi sukses
      setTurnstileStatus("success");
      setStatusMessage("Verifikasi berhasil! Membuka aplikasi email...");

      const subject = encodeURIComponent(`[Inquiry Portofolio] ${formData.subject} — ${formData.name || "Klien"}`);
      const body = encodeURIComponent(getFormattedMessage());
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

      // Reset widget untuk pengiriman berikutnya
      if (typeof window !== "undefined" && (window as unknown as { turnstile?: { reset?: () => void } }).turnstile) {
        (window as unknown as { turnstile?: { reset?: () => void } }).turnstile!.reset!();
      }
    } catch {
      setTurnstileStatus("error");
      setStatusMessage("Terjadi kendala jaringan saat memverifikasi keamanan. Silakan coba lagi.");
      if (typeof window !== "undefined" && (window as unknown as { turnstile?: { reset?: () => void } }).turnstile) {
        (window as unknown as { turnstile?: { reset?: () => void } }).turnstile!.reset!();
      }
    }
  };

  return (
    <section id="contact" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Kontak &amp; Diskusi"
            title="Mari Terhubung &amp; Berkolaborasi"
            subtitle="Saya terbuka untuk peluang kerja sama pembuatan website, perancangan sistem informasi instansi, maupun dukungan teknis IT ke seluruh wilayah Indonesia (Remote &amp; On-Site)."
          />
        </Reveal>

        {/* ── 2-Column Responsive Contact Grid ── */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Main Action & Form (7 cols) */}
          <Reveal delay={60} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-7 lg:p-8">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-mono font-medium text-slate-700 dark:text-zinc-200 shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Indonesia &bull; Tersedia Kerja Sama Proyek (Remote &amp; On-Site)</span>
                </div>


                <h3 className="font-display text-lg font-black text-slate-950 dark:text-white sm:text-xl lg:text-2xl">
                  Punya kebutuhan sistem atau kendala teknis?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  Kirimkan gambaran ide atau masalah Anda melalui formulir di bawah ini. Pesan akan terformat otomatis dan bisa langsung diteruskan ke Email.
                </p>

                {/* ── Interactive Contact Form ── */}
                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                        NAMA ANDA
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                        EMAIL / KONTAK ANDA
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="contoh@email.com"
                        className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                      KEBUTUHAN / TOPIK
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white focus:outline-none"
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1.5 font-mono">
                      DETAIL PESAN
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan sedikit tentang kebutuhan sistem atau kendala teknis yang ingin diselesaikan..."
                      className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 shadow-2xs transition-colors focus:border-slate-900 dark:focus:border-white focus:outline-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile Widget */}
                  <div className="pt-1">
                    <div
                      className="cf-turnstile"
                      data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAElvKt9_LYYr1Uov"}
                      data-theme="auto"
                    />
                  </div>

                  {/* Status notification banner */}
                  {statusMessage && (
                    <div
                      className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium ${
                        turnstileStatus === "error"
                          ? "border border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                          : turnstileStatus === "success"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                          : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={turnstileStatus === "verifying" ? faSpinner : faShieldHalved}
                        className={`h-3.5 w-3.5 ${turnstileStatus === "verifying" ? "animate-spin text-slate-600 dark:text-zinc-400" : ""}`}
                      />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      disabled={turnstileStatus === "verifying"}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-5 py-2.5 text-xs font-semibold text-white dark:text-slate-950 shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon
                        icon={turnstileStatus === "verifying" ? faSpinner : faEnvelope}
                        className={`h-3.5 w-3.5 ${turnstileStatus === "verifying" ? "animate-spin" : ""}`}
                      />
                      <span>{turnstileStatus === "verifying" ? "Memverifikasi..." : "Kirim Pesan via Email"}</span>
                    </button>
                  </div>
                </form>

                {/* Email Copy Box */}
                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                      <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-800 dark:text-zinc-200 sm:text-sm">
                      {email}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-200 shadow-2xs transition-colors hover:bg-slate-50 dark:hover:bg-zinc-700 hover:border-slate-400 dark:hover:border-zinc-600"
                  >
                    <FontAwesomeIcon
                      icon={copied ? faCheck : faCopy}
                      className={copied ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-zinc-400"}
                    />
                    <span>{copied ? "Tersalin!" : "Salin Email"}</span>
                  </button>
                </div>
              </div>

              {/* Location indicator */}
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 dark:border-zinc-800 pt-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
                <FontAwesomeIcon icon={faMapPin} className="h-3.5 w-3.5 text-slate-500 dark:text-zinc-400" />
                Indonesia (Terbuka untuk Remote &amp; On-Site ke Mana Saja)
              </div>

            </div>
          </Reveal>

          {/* Social Deck & Info (5 cols) */}
          <Reveal delay={100} direction="right" className="lg:col-span-5">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="font-mono mb-4 text-xs font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase">
                  Profil &amp; Saluran Komunikasi
                </p>
                <div className="space-y-2.5">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 px-4 py-3 transition-colors hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-2xs">
                          <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          {label}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 text-slate-400 dark:text-zinc-500"
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


