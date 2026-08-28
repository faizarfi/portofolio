"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowRight,
  faMapPin,
  faCopy,
  faCheck,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import { SectionHeading, Reveal } from "@/components/ui";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "faizarfianilhami020204@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            tag="Kontak &amp; Diskusi"
            title="Mari Mulai Diskusi Proyek"
            subtitle="Saya terbuka untuk peluang kerja sama pembuatan website, pengembangan sistem informasi, maupun konsultasi IT."
          />
        </Reveal>

        {/* ── 2-Column Responsive Contact Grid ── */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Main Action (7 cols) */}
          <Reveal delay={60} className="lg:col-span-7">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-800">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>Tersedia untuk Freelance &amp; Kesempatan Fulltime</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 sm:text-2xl lg:text-3xl">
                  Punya ide sistem atau ingin membuat website baru?
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Silakan hubungi saya melalui email langsung atau salin alamat email di bawah ini.
                  Saya akan merespons secepat mungkin.
                </p>

                {/* Email Copy Box */}
                <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
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
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 active:scale-95"
                  >
                    <FontAwesomeIcon
                      icon={copied ? faCheck : faCopy}
                      className={copied ? "text-blue-600" : "text-slate-500"}
                    />
                    <span>{copied ? "Tersalin!" : "Salin Email"}</span>
                  </button>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <a
                  href={`mailto:${email}`}
                  className="btn-pulse inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-500 hover:shadow-md"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                  Kirim Pesan Email
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </a>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
                  <FontAwesomeIcon icon={faMapPin} className="h-3.5 w-3.5 text-blue-600" />
                  Surakarta, Jawa Tengah, ID
                </div>
              </div>
            </div>
          </Reveal>

          {/* Social Deck (5 cols) */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className="neat-card flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="mb-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Profil &amp; Saluran Komunikasi
                </p>
                <div className="space-y-3">
                  {SOCIALS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3.5 transition-all hover:border-blue-200 hover:bg-blue-50/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs">
                          <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700">
                          {label}
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 text-slate-400 group-hover:text-blue-600"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-blue-900 sm:text-sm">
                <p className="font-bold">Respon Cepat</p>
                <p className="mt-0.5 text-xs text-blue-700">
                  Aktif membalas email dan pesan profesional setiap hari kerja.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
