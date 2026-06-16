import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="bg-transparent py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Recent{' '}
          <em className="text-white/60" style={{ fontStyle: 'italic' }}>
            Experience
          </em>
        </motion.h2>

        {/* Timeline */}
        <div className="flex flex-col gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="liquid-glass rounded-full p-2">
                      <Briefcase size={16} className="text-white/60" />
                    </div>
                    <span className="text-white/40 text-xs tracking-widest uppercase">
                      {role.location}
                    </span>
                    {role.current && (
                      <span className="flex items-center gap-1.5 text-emerald-300/80 text-xs tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-white text-xl md:text-2xl tracking-tight mb-1">
                    {role.title}
                  </h3>
                  <p className="text-white/70 text-base mb-3">{role.company}</p>
                  <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                    {role.description}
                  </p>
                </div>

                {/* Period */}
                <div className="flex-shrink-0">
                  <span
                    className="text-white/40 text-base md:text-lg"
                    style={{ fontFamily: '"Instrument Serif", serif' }}
                  >
                    {role.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
