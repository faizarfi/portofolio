"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapPin,
  faCopy,
  faCheck,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
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

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(getFormattedMessage());
    window.open(`https://wa.me/6282327867328?text=${text}`, "_blank");
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Inquiry Portofolio] ${formData.subject} — ${formData.name || "Klien"}`);
    const body = encodeURIComponent(getFormattedMessage());
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Kontak &amp; Diskusi"
            title="Mari Mulai Diskusi Proyek"
            subtitle="Saya terbuka untuk peluang kerja sama pembuatan website, pengembangan sistem informasi, maupun konsultasi bantuan IT di Surakarta."
          />
        </Reveal>

        {/* ── 2-Column Responsive Contact Grid ── */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Main Action & Form (7 cols) */}
          <Reveal delay={60} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1.5 text-xs font-bold text-blue-800 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>Tersedia untuk Freelance &amp; Kesempatan Kerja</span>
                </div>

                <h3 className="font-display text-xl font-black text-slate-900 sm:text-2xl lg:text-3xl">
                  Punya ide sistem atau butuh solusi web?
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Tulis pesan Anda melalui formulir di bawah ini dan kirim langsung melalui WhatsApp
                  atau Email. Pesan akan terformat otomatis dan siap dikirimkan.
                </p>

                {/* ── Interactive Contact Form ── */}
                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nama Anda
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-xs transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email atau No. WhatsApp
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="contoh@email.com / 0812..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-xs transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Kebutuhan / Topik Diskusi
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 shadow-xs transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Detail Pesan atau Gambaran Proyek
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan sedikit tentang kebutuhan proyek atau kendala teknis yang ingin diselesaikan..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-xs transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Dual Submit Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xs shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-500 hover:shadow-md active:scale-95 sm:flex-none"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                      <span>Kirim via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-xs shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-md active:scale-95 sm:flex-none"
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                      <span>Kirim via Email</span>
                    </button>
                  </div>
                </form>

                {/* Direct WhatsApp Strip */}
                <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-200/90 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                      <FontAwesomeIcon icon={faWhatsapp} className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-emerald-950 sm:text-sm">
                        0823-2786-7328
                      </p>
                      <p className="text-[11px] font-medium text-emerald-700">WhatsApp Resmi Faiz Arfian</p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/6282327867328?text=Halo%20Faiz%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:bg-emerald-500 active:scale-95"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="h-3.5 w-3.5" />
                    <span>Chat Langsung</span>
                  </a>
                </div>

                {/* Email Copy Box */}
                <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                      <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800 sm:text-sm">
                      {email}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs transition-all duration-200 hover:border-blue-300 hover:bg-slate-50 active:scale-95"
                  >
                    <FontAwesomeIcon
                      icon={copied ? faCheck : faCopy}
                      className={copied ? "text-blue-600" : "text-slate-500"}
                    />
                    <span>{copied ? "Tersalin!" : "Salin Email"}</span>
                  </button>
                </div>
              </div>

              {/* Location indicator */}
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                <FontAwesomeIcon icon={faMapPin} className="h-3.5 w-3.5 text-blue-600" />
                Surakarta, Jawa Tengah, Indonesia (Bisa Remote / On-Site)
              </div>
            </div>
          </Reveal>

          {/* Social Deck & Info (5 cols) */}
          <Reveal delay={100} direction="right" className="lg:col-span-5">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="font-display mb-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Profil &amp; Saluran Komunikasi
                </p>
                <div className="space-y-3">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs transition-transform duration-200 group-hover:scale-110 group-hover:text-blue-600">
                          <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-700">
                          {label}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 text-slate-400 transition-colors group-hover:text-blue-600"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-blue-900 sm:text-sm">
                  <p className="font-bold">Respon Cepat &amp; Ramah</p>
                  <p className="mt-0.5 text-xs text-blue-700">
                    Aktif menanggapi pesan diskusi proyek dan pertanyaan teknis setiap hari kerja.
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
