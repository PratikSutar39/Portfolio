import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

// Top skills surfaced from the LinkedIn profile
const topSkills = ['Generative AI', 'Large Language Models', 'Python']

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="bg-transparent py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-12"
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Skills &{' '}
            <em className="text-white/60" style={{ fontStyle: 'italic' }}>
              Tools
            </em>
          </h2>
          <span className="text-white/40 text-sm hidden md:block">Gen AI / Agents / Full-Stack</span>
        </motion.div>

        {/* Top skills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase mr-2">Top Skills</span>
          {topSkills.map((skill) => (
            <span
              key={skill}
              className="liquid-glass rounded-full px-4 py-2 text-white text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-3xl p-6 md:p-8"
            >
              <p className="text-white/40 text-xs tracking-widest uppercase mb-5">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-4 py-2 text-white/70 text-sm bg-white/[0.04] border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
