import GlobalShaderBackground from './components/GlobalShaderBackground'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProcessSection from './components/ProcessSection'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div className="relative bg-[#0C0C0C] min-h-screen" style={{ overflowX: 'clip' }}>
      {/* Fixed plasma shader — sits behind everything; the opaque top
          sections cover it, the transparent lower sections reveal it */}
      <GlobalShaderBackground />

      <main className="relative z-10">
        {/* New Kanit / 3D-creator template sections */}
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />

        {/* Existing content sections — preserved */}
        <FeaturedVideoSection />
        <PhilosophySection />
        <ExperienceSection />
        <SkillsSection />
        <ProcessSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  )
}
