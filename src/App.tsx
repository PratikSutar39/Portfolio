import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProcessSection from './components/ProcessSection'
import EducationSection from './components/EducationSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <HeroSection />
      <main id="content">
        <FeaturedVideoSection />
        <AboutSection />
        <PhilosophySection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ProcessSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  )
}
