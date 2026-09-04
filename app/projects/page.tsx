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
    "Koleksi proyek web yang telah dibangun oleh Faiz Arfian Ilhami — mulai dari sistem tracer alumni kampus, asisten AI chatbot, hingga aplikasi live scoring.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 px-5 pt-8 pb-24 sm:px-8 md:pt-14 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* ── Page Header ── */}
          <div className="hero-animate hero-delay-1">
            <SectionHeading
              tag="Koleksi Karya"
              title="Katalog Lengkap Proyek"
              subtitle="Kumpulan sistem informasi, modul backend, antarmuka web interaktif, dan utilitas yang telah saya selesaikan untuk berbagai kebutuhan instansi dan organisasi."
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
            <div className="neat-card mt-16 flex flex-col items-center justify-center p-8 text-center sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-850 text-slate-800 dark:text-white mb-3">
                <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ingin melihat lebih banyak kode?</h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-sm">
                Seluruh repositori open-source, skrip utilitas, dan proyek eksperimental saya
                tersedia secara terbuka di GitHub.
              </p>
              <a
                href="https://github.com/faizarfi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-white px-6 py-2.5 text-xs font-semibold text-white dark:text-black shadow-2xs transition-colors hover:bg-slate-800 dark:hover:bg-zinc-200"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                Kunjungi Profil GitHub @faizarfi
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3 text-slate-400 dark:text-zinc-500" />
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


