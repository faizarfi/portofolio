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
import { Reveal, PageBackground, TechBadge, FloatingContact, ProjectBlueprint } from "@/components/ui";

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
    <div className="relative min-h-screen bg-[#fafaf9] text-slate-800">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 px-5 pt-8 pb-24 sm:px-8 md:pt-12 md:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* ── Back button ── */}
          <div className="hero-animate hero-delay-1 mb-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-500 transition-colors hover:text-slate-900"
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
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-sm">
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
                <div className="flex h-full w-full items-center justify-center bg-slate-50">
                  <span className="text-8xl font-black text-slate-300 select-none">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Top-left Role Badge overlay */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-md bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-xs">
                  <FontAwesomeIcon icon={faBriefcase} className="h-3 w-3 text-slate-700" />
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
                  <span className="rounded border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-mono font-semibold text-slate-700">
                    {project.category || "Full Stack"}
                  </span>
                </div>
                <h1 className="mb-4 text-2xl font-extrabold text-slate-950 sm:text-3xl lg:text-4xl">
                  {project.name}
                </h1>
                <p className="text-base leading-relaxed text-slate-600">{project.description}</p>
              </div>

              {/* Overview Section */}
              <Reveal delay={150}>
                <div className="neat-card mt-8 p-6 sm:p-8">
                  <h2 className="mb-3 text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                    Tentang Proyek
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                    {project.details.overview}
                  </p>
                </div>
              </Reveal>

              {/* Key Contributions */}
              <Reveal delay={220}>
                <div className="neat-card mt-8 p-6 sm:p-8">
                  <h2 className="mb-5 text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                    Tanggung Jawab &amp; Fitur yang Saya Bangun
                  </h2>
                  <div className="space-y-3">
                    {project.details.contributions.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors hover:border-slate-300 hover:bg-white"
                      >
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="mt-0.5 h-4 w-4 shrink-0 text-slate-800"
                        />
                        <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* System Architecture & ERD Blueprint */}
              {project.details.architecture && (
                <Reveal delay={260}>
                  <div className="mt-8">
                    <ProjectBlueprint architecture={project.details.architecture} />
                  </div>
                </Reveal>
              )}

              {/* Action buttons */}
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.url && project.url !== "/" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-slate-800"
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
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-950"
                    >
                      <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                      Lihat Source Code
                    </a>
                  )}

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
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
                <div className="neat-card p-5">
                  <p className="mb-2 text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    Peran / Role
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3.5 w-3.5 text-slate-700" />
                    {project.details.role}
                  </div>
                </div>

                {/* Tech Stack Card */}
                <div className="neat-card p-5">
                  <p className="mb-3 text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    Teknologi yang Digunakan
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Contribution points count */}
                <div className="neat-card p-5">
                  <p className="mb-2 text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    Cakupan Pengerjaan
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5 text-slate-700" />
                    <span>{project.details.contributions.length} poin implementasi fitur</span>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}


