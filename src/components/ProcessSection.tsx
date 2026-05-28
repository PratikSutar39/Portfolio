import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Decode the brief',
    description:
      'Understand the song, emotion, visual grammar, timeline, production constraints, and final output requirement.',
  },
  {
    number: '02',
    title: 'Build the system',
    description:
      'Convert the creative problem into reusable workflows, naming conventions, prompt structures, references, and automation logic.',
  },
  {
    number: '03',
    title: 'Generate and refine',
    description:
      'Use AI tools to generate characters, scenes, frames, motion tests, and storyboard options while preserving continuity.',
  },
  {
    number: '04',
    title: 'Automate the repeatable',
    description:
      'Create dashboards, calculators, templates, and AI-assisted tools for tasks that should not be manually repeated.',
  },
  {
    number: '05',
    title: 'Deliver with clarity',
    description:
      'Package the output into production sheets, prompts, timelines, visual references, and handoff-ready assets.',
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="systems" className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl text-white tracking-tight">
            How I Work
          </h2>
          <p className="text-white/50 max-w-2xl mt-4 text-base md:text-lg leading-relaxed">
            My process combines creative intuition with structured systems thinking — turning
            messy ideas into production-ready workflows.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-3xl p-6 flex flex-col gap-4"
            >
              <span
                className="text-white/20 text-3xl font-light"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                {step.number}
              </span>
              <h3 className="text-white text-base font-medium leading-snug">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
