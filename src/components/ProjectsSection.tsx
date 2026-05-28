import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'AI Music Video Storyboard System',
    category: 'Creative AI / Production',
    description:
      'A structured workflow for creating 75+ frame cinematic storyboards for a 150-second song, including character locking, timestamp mapping, scene continuity, and video-generation-ready prompts.',
  },
  {
    number: '02',
    title: 'AI Team Project Planner',
    category: 'Internal Tool / Automation',
    description:
      'A planning interface for AI teams that estimates delivery milestones based on video length, project type, non-working days, and production norms — helping clarify character sheet, storyboard, and video deadlines.',
  },
  {
    number: '03',
    title: 'Generative Character Reference Pipeline',
    category: 'Prompt Engineering / Visual Design',
    description:
      'A repeatable process for creating consistent AI characters across wardrobe, angles, facial identity, styling, and cinematic production requirements.',
  },
  {
    number: '04',
    title: 'CarTrust AI Prototype',
    category: 'RAG / AI Product',
    description:
      'An AI-powered used-car trust and evidence prototype using RAG, Streamlit, LangChain, structured reasoning, and report generation to support better buying decisions.',
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Selected{' '}
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
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="liquid-glass rounded-full px-6 py-2 text-white/70 text-sm font-medium flex items-center gap-2 hover:text-white transition-colors"
                  >
                    View case study
                    <ArrowUpRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
