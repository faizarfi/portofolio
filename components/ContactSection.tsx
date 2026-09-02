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
    <section id="contact" className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <Reveal direction="up">
          <SectionHeading
            tag="Kontak &amp; Diskusi"
            title="Mari Terhubung &amp; Berkolaborasi"
            subtitle="Saya terbuka untuk peluang kerja sama pembuatan website, perancangan sistem informasi instansi, maupun dukungan teknis IT di wilayah Surakarta dan sekitarnya."
          />
        </Reveal>

        {/* ── 2-Column Responsive Contact Grid ── */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Main Action & Form (7 cols) */}
          <Reveal delay={60} direction="left" className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-5 sm:p-7 lg:p-8">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-mono font-medium text-slate-700 shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Surakarta, ID &bull; Tersedia Kerja Sama Proyek</span>
                </div>

                <h3 className="font-display text-lg font-black text-slate-950 sm:text-xl lg:text-2xl">
                  Punya kebutuhan sistem atau kendala teknis?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Kirimkan gambaran ide atau masalah Anda melalui formulir di bawah ini. Pesan akan terformat otomatis dan bisa langsung diteruskan ke WhatsApp atau Email.
                </p>

                {/* ── Interactive Contact Form ── */}
                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-mono">
                        NAMA ANDA
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-2xs transition-colors focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 font-mono">
                        EMAIL / WHATSAPP
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="contoh@email.com / 0812..."
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-2xs transition-colors focus:border-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-mono">
                      KEBUTUHAN / TOPIK
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 shadow-2xs transition-colors focus:border-slate-900 focus:outline-none"
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 font-mono">
                      DETAIL PESAN
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan sedikit tentang kebutuhan sistem atau kendala teknis yang ingin diselesaikan..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 shadow-2xs transition-colors focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Dual Submit Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700 sm:flex-none"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                      <span>Kirim via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-slate-800 sm:flex-none"
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                      <span>Kirim via Email</span>
                    </button>
                  </div>
                </form>

                {/* Direct WhatsApp Strip */}
                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-emerald-300 bg-emerald-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-emerald-950 sm:text-sm">
                        0823-2786-7328
                      </p>
                      <p className="text-[11px] text-emerald-800 font-mono">WhatsApp Faiz Arfian</p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/6282327867328?text=Halo%20Faiz%2C%20saya%20tertarik%20untuk%20diskusi%20proyek%20web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="h-3.5 w-3.5" />
                    <span>Chat Langsung</span>
                  </a>
                </div>

                {/* Email Copy Box */}
                <div className="mt-3 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                      <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-800 sm:text-sm">
                      {email}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:border-slate-400"
                  >
                    <FontAwesomeIcon
                      icon={copied ? faCheck : faCopy}
                      className={copied ? "text-emerald-600" : "text-slate-500"}
                    />
                    <span>{copied ? "Tersalin!" : "Salin Email"}</span>
                  </button>
                </div>
              </div>

              {/* Location indicator */}
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-mono text-slate-500">
                <FontAwesomeIcon icon={faMapPin} className="h-3.5 w-3.5 text-slate-500" />
                Surakarta, Jawa Tengah, Indonesia (Bisa Remote / On-Site)
              </div>
            </div>
          </Reveal>

          {/* Social Deck & Info (5 cols) */}
          <Reveal delay={100} direction="right" className="lg:col-span-5">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="font-mono mb-4 text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Profil &amp; Saluran Komunikasi
                </p>
                <div className="space-y-2.5">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 transition-colors hover:border-slate-300 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white shadow-2xs">
                          <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {label}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 text-slate-400"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs text-slate-800 sm:text-sm">
                  <p className="font-bold">Respon Tanggap &amp; Komunikasi Jelas</p>
                  <p className="mt-0.5 text-xs text-slate-600">
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


