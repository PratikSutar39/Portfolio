import { Aperture, Braces, Workflow, Sparkles } from 'lucide-react'

const icons = [Sparkles, Workflow, Braces, Aperture]

const groups = [
  {
    label: 'Generative AI & LLMs',
    skills: [
      'Generative AI',
      'Large Language Models',
      'RAG (Hybrid Search, Re-ranking)',
      'Prompt Engineering',
      'LLM App Development',
    ],
  },
  {
    label: 'Agentic AI',
    skills: ['LangChain', 'CrewAI', 'AutoGen', 'LangGraph', 'Autonomous Agents'],
  },
  {
    label: 'Engineering',
    skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'Next.js'],
  },
  {
    label: 'Generative Media',
    skills: ['ComfyUI', 'FLUX', 'LoRA Fine-Tuning', 'Diffusion Models', 'Computer Vision'],
  },
]

const topSkills = ['Generative AI', 'Large Language Models', 'Python']

export default function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <div className="page-width">
        <div className="section-heading"><h2>Skills & <span>Tools</span></h2><p className="section-aside">Gen AI / Agents / Full-Stack</p></div>
        <div className="top-skills">
          <span className="eyebrow">Top Skills</span>
          {topSkills.map((skill) => <span className="top-skill" key={skill}>{skill}</span>)}
        </div>
        <div className="skills-grid">
          {groups.map((group, index) => {
            const Icon = icons[index]
            return (
              <div className="skill-group" key={group.label}>
                <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                <h3>{group.label}</h3>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
