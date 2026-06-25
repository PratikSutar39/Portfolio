import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      className="bg-transparent pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top, rgba(255,255,255,0.03) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-8"
        >
          About Me
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          I design AI workflows
          <br />
          <em className="text-white/60" style={{ fontStyle: 'italic' }}>
            where creativity
          </em>
          <br />
          for music, video, and production teams
          <br />
          <em className="text-white/60" style={{ fontStyle: 'italic' }}>
            meets automation.
          </em>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-3xl mt-8 text-white/60 text-base md:text-lg leading-relaxed"
        >
          My work spans agentic AI, RAG, and full-stack LLM products — autonomous agents with
          LangChain, CrewAI, and AutoGen, retrieval systems with hybrid search and re-ranking, and
          generative character pipelines built in ComfyUI with FLUX and LoRA. My focus is
          production-readiness: systems that consider scalability, cost, and real deployment — not
          just impressive demos.
        </motion.p>
      </div>
    </section>
  )
}
