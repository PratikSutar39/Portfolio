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
    <main className="bg-black min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
    </main>
  )
}
