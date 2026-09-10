import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="bg-transparent py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Project{' '}
          <em className="text-white/60" style={{ fontStyle: 'italic' }}>
            Work
          </em>
        </motion.h2>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-3xl p-6 md:p-8 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="text-white/20 text-4xl md:text-5xl font-light tabular-nums"
                      style={{ fontFamily: '"Instrument Serif", serif' }}
                    >
                      {project.number}
                    </span>
                    <span className="text-white/40 text-xs tracking-widest uppercase">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 mt-4 md:mt-0 flex-shrink-0">
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="liquid-glass rounded-full px-6 py-2 text-white/70 text-sm font-medium flex items-center gap-2 hover:text-white transition-colors"
                  >
                    View project
                    <ArrowUpRight size={14} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
