import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { SectionHeading, Reveal, PageBackground, ProjectCard, FloatingContact } from "@/components/ui";

export const metadata: Metadata = {
  title: "Semua Proyek — Faiz Arfian Ilhami",
  description:
    "Koleksi proyek web yang telah dikembangkan oleh Faiz Arfian Ilhami — mulai dari sistem tracer alumni kampus, asisten AI chatbot, hingga aplikasi live scoring.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 px-5 pt-8 pb-24 sm:px-8 md:pt-14 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* ── Page Header ── */}
          <div className="hero-animate hero-delay-1">
            <SectionHeading
              tag="Portfolio &amp; Work"
              title="Seluruh Koleksi Proyek"
              subtitle="Kumpulan sistem informasi, modul backend, antarmuka frontend, dan aplikasi web yang telah saya selesaikan untuk berbagai kebutuhan instansi dan organisasi."
            />
          </div>

          {/* ── Projects Grid ── */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          {/* ── GitHub CTA ── */}
          <Reveal delay={PROJECTS.length * 60 + 100}>
            <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 mb-3">
                <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ingin melihat lebih banyak kode?</h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
                Seluruh repository open source, skrip utilitas, dan eksperimen teknologi terbaru saya
                tersedia secara publik di GitHub.
              </p>
              <a
                href="https://github.com/faizarfi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-slate-800 hover:shadow-md"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                Kunjungi Profil GitHub @faizarfi
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3 text-slate-400" />
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
