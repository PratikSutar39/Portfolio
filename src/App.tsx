import GlobalShaderBackground from './components/GlobalShaderBackground'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import ProcessSection from './components/ProcessSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div className="relative bg-[#06010a] min-h-screen">
      {/* Fixed plasma shader — runs behind every section,
          morphs as you scroll through the palette */}
      <GlobalShaderBackground />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <FeaturedVideoSection />
        <PhilosophySection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </div>
  )
}
