import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import ProcessSection from './components/ProcessSection'
import ContactSection from './components/ContactSection'
import SceneBackground from './components/SceneBackground'

export default function App() {
  return (
    <div className="relative bg-black min-h-screen">
      {/* Global animated 3D background — RED Dragon camera that
          dismantles as you scroll and reassembles on scroll up */}
      <SceneBackground />

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
