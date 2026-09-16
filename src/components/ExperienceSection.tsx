import { Briefcase } from 'lucide-react'

const roles = [
  {
    title: 'Generative AI Workflow Engineer',
    company: 'T-Series',
    period: 'Mar 2026 — Present',
    location: 'Mumbai, India',
    description:
      'Building production-ready generative AI workflows and LLM-powered tooling — bringing RAG, agents, and creative AI pipelines into real content and production environments.',
    current: true,
  },
  {
    title: 'Cohort Learner',
    company: '100xEngineers',
    period: 'Nov 2025 — May 2026',
    location: 'Bengaluru, India',
    description:
      'An intensive 21-week Gen AI engineering program — mastering RAG systems, autonomous agents, and production LLM applications, from foundation models to full agentic architectures.',
    current: false,
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <div className="page-width">
        <div className="section-heading"><h2>Recent <span>Experience</span></h2><Briefcase size={23} strokeWidth={1.5} aria-hidden="true" /></div>
        <div className="experience-list">
          {roles.map((role) => (
            <article className="experience-row" key={role.title}>
              <div className="experience-meta">
                <p>{role.period}</p>
                <span>{role.location}</span>
                {role.current && <span className="current-label"><i aria-hidden="true" />Current</span>}
              </div>
              <div>
                <p className="company-name">{role.company}</p>
                <h3>{role.title}</h3>
                <p className="body-copy">{role.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
