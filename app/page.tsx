import {
  Navbar,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  SpeakingSection,
  WorkflowSection,
  GitHubSection,
  ContactSection,
  Footer,
} from "@/components";
import { PageBackground, FloatingContact } from "@/components/ui";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800">
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
          <SpeakingSection />
          <WorkflowSection />
          <GitHubSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </div>
  );
}
