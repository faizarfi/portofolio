import {
  Navbar,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  WorkflowSection,
  SpeakingSection,
  GitHubSection,
  ContactSection,
  Footer,
} from "@/components";
import { PageBackground } from "@/components/ui";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-200">
      {/* Global decorative background (fixed mesh + ambient glow) */}
      <PageBackground />

      {/* Site content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <WorkflowSection />
          <SpeakingSection />
          <GitHubSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
