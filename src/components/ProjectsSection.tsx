import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'CarTrust — AI Used-Car Trust Engine',
    category: 'RAG / AI Product',
    description:
      'A web app that helps first-time used-car buyers decide with confidence. A deterministic rule engine scores five trust dimensions and returns a BUY / NEGOTIATE / WALK AWAY verdict with flagged contradictions and a 3-year cost projection. Built with Next.js 16, FastAPI, Pydantic, ChromaDB RAG, and Llama 3.3 70B for plain-language explanations.',
    url: 'https://github.com/PratikSutar39/CarTrust',
  },
  {
    number: '02',
    title: 'SuperNetworkAI — Ikigai Matching Platform',
    category: 'Full-Stack AI / Next.js',
    description:
      'An AI networking platform that connects people on the intersection of passion, skill, purpose, and pay — not just skill overlap. Natural-language search, AI match scoring with personalised explanations, and in-app messaging. Built with Next.js 14, TypeScript, Supabase, NextAuth, and OpenRouter LLMs.',
    url: 'https://github.com/PratikSutar39/SuperNetworkAI',
  },
  {
    number: '03',
    title: 'Pixel Art Character Generator',
    category: 'Generative AI / Diffusion',
    description:
      'A ComfyUI pipeline that turns a user photo into a high-resolution, game-ready pixel-art character. A dual-model approach separates an identity model (preserves facial features) from a style model (pixel-art coherence), powered by FLUX texture synthesis and LoRA fine-tuning.',
    url: 'https://github.com/PratikSutar39/pixel-art-character-generator',
  },
  {
    number: '04',
    title: 'IntelliDoc — Document Intelligence',
    category: 'RAG / Automation',
    description:
      'A centralized AI-powered document intelligence platform that automates document digitization, classification, validation, and authenticity checks for government services — reducing manual verification overhead in high-volume workflows.',
    url: 'https://github.com/PratikSutar39/IntelliDoc',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <div className="page-width">
        <div className="section-heading"><h2>Project <span>Work</span></h2><span className="heading-rule" aria-hidden="true" /></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.number}>
              <span className="project-number" aria-hidden="true">{project.number}</span>
              <div>
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="body-copy">{project.description}</p>
              </div>
              <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                View project <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
