import {
  Navbar,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  SpeakingSection,
  GitHubSection,
  ContactSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-white dark:focus:bg-white dark:focus:text-slate-950"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <SpeakingSection />
        <GitHubSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
