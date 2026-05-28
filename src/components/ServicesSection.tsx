import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const cards = [
  {
    tag: 'Prompt Systems',
    title: 'AI Storyboard & Character Pipelines',
    description:
      'I build structured prompt systems for character references, cinematic scenes, video generation, and shot-by-shot storyboard workflows that help production teams visualize songs before execution.',
    video: '/videos/storyboard-pipeline.mp4',
  },
  {
    tag: 'Automation',
    title: 'Production Workflow Tools',
    description:
      'I design tools that calculate delivery timelines, track project stages, estimate first-cut dates, and reduce confusion between creative teams, managers, and production stakeholders.',
    video: '/videos/automation-dashboard.mp4',
  },
  {
    tag: 'Generative Video',
    title: 'AI Music Video Experiments',
    description:
      'I work across AI image and video tools to create cinematic frames, scene references, motion prompts, and visual experiments for music-led storytelling.',
    video: '/videos/generative-video.mp4',
  },
  {
    tag: 'RAG / AI Apps',
    title: 'Applied AI Product Prototypes',
    description:
      'I also build AI product prototypes using RAG, LangChain, Streamlit, and modern frontend systems — turning ideas into usable demos, dashboards, and decision-support tools.',
    video: '/videos/ai-apps.mp4',
  },
]

function ServiceCard({
  card,
  index,
  inView,
}: {
  card: (typeof cards)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass rounded-3xl overflow-hidden group"
    >
      {/* Video area */}
      <div className="aspect-video overflow-hidden relative">
        <video
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          src={card.video}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/40 text-xs tracking-widest uppercase">{card.tag}</span>
          <div className="liquid-glass rounded-full p-2">
            <ArrowUpRight size={16} className="text-white/60" />
          </div>
        </div>
        <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">
          {card.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="bg-transparent py-28 md:py-40 px-6 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-12"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            What I Build
          </h2>
          <span className="text-white/40 text-sm hidden md:block">
            AI Automation / Creative Tech
          </span>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <ServiceCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
