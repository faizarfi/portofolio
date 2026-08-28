import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faCircleCheck,
  faBriefcase,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { Reveal, PageBackground, TechBadge } from "@/components/ui";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Faiz Arfian Ilhami`,
    description: project.details.overview,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 px-5 pt-8 pb-24 sm:px-8 md:pt-12 md:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* ── Back button ── */}
          <div className="hero-animate hero-delay-1 mb-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-700"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="h-3 w-3 transition-transform group-hover:-translate-x-1"
              />
              Kembali ke Semua Proyek
            </Link>
          </div>

          {/* ── Hero image card ── */}
          <div className="hero-animate hero-delay-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-100 shadow-xl shadow-slate-900/5">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot ${project.name}`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100/50 to-slate-100">
                  <span className="text-8xl font-black text-blue-200 select-none">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Top-left Role Badge overlay */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-md backdrop-blur-md">
                  <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3 text-blue-600" />
                  {project.details.role}
                </span>
              </div>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_19rem] lg:gap-12">
            {/* ── LEFT: Main Details ── */}
            <div>
              {/* Title & Category */}
              <div className="hero-animate hero-delay-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-bold text-blue-800">
                    {project.category || "Full Stack"}
                  </span>
                </div>
                <h1 className="mb-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
                  {project.name}
                </h1>
                <p className="text-base leading-relaxed text-slate-600">{project.description}</p>
              </div>

              {/* Overview Section */}
              <Reveal delay={150}>
                <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="mb-3 text-xs font-bold tracking-wider text-blue-700 uppercase">
                    Tentang Proyek
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                    {project.details.overview}
                  </p>
                </div>
              </Reveal>

              {/* Key Contributions / Yang Saya Kerjakan */}
              <Reveal delay={220}>
                <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="mb-5 text-xs font-bold tracking-wider text-blue-700 uppercase">
                    Tanggung Jawab &amp; Yang Saya Kerjakan
                  </h2>
                  <div className="space-y-3.5">
                    {project.details.contributions.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
                      >
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                        />
                        <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Action buttons */}
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.url && project.url !== "/" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-md"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                      Buka Live Demo
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-950"
                    >
                      <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                      Lihat Source Code
                    </a>
                  )}

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
                    Proyek Lainnya
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: Sidebar (Role & Tech Stack) ── */}
            <Reveal delay={150}>
              <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
                {/* Role Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <p className="mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    Peran / Role
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3.5 w-3.5 text-blue-600" />
                    {project.details.role}
                  </div>
                </div>

                {/* Tech Stack Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <p className="mb-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    Teknologi yang Digunakan
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Contribution points count */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                  <p className="mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    Cakupan Pengerjaan
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5 text-blue-600" />
                    <span>{project.details.contributions.length} poin implementasi fitur</span>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
