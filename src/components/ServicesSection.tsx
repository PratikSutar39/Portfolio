import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import YouTubeTile from './YouTubeTile'
import VideoLightbox from './VideoLightbox'

const cards = [
  {
    tag: 'Generative AI',
    title: 'Character & Image Pipelines',
    description:
      'I build generative pipelines in ComfyUI with FLUX and LoRA fine-tuning — including a dual-model system that separates identity from style to turn a single photo into a consistent, high-resolution, game-ready character.',
    youtubeId: 'O6W9wV6XIpk',
  },
  {
    tag: 'RAG / Automation',
    title: 'Applied AI Products',
    description:
      'I ship AI products that pair deterministic reasoning with LLMs — RAG over ChromaDB, FastAPI + Pydantic rule engines, and report generation — so the logic stays trustworthy while the model only explains the result.',
    youtubeId: 'TM8wQgA1XSI',
  },
  {
    tag: 'Full-Stack AI',
    title: 'AI Web Platforms',
    description:
      'I build complete AI web apps with Next.js, TypeScript, Tailwind, and Supabase — natural-language search, LLM match scoring, auth, and messaging — turning model capabilities into products people can actually use.',
    youtubeId: 'EKISAz0src8',
  },
  {
    tag: 'CV / Deep Learning',
    title: 'Computer Vision & Models',
    description:
      'I train and apply deep-learning models for vision tasks — from convolutional traffic-sign recognition to behavioral-cloning driving experiments — grounding my AI work in real model training, not just APIs.',
    youtubeId: 'FwjC223xx4s',
  },
]

function ServiceCard({
  card,
  index,
  inView,
  onPlay,
}: {
  card: (typeof cards)[0]
  index: number
  inView: boolean
  onPlay: (id: string) => void
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
        <YouTubeTile videoId={card.youtubeId} onPlay={onPlay} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
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
  const [activeId, setActiveId] = useState<string | null>(null)

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
            <ServiceCard key={card.title} card={card} index={i} inView={inView} onPlay={setActiveId} />
          ))}
        </div>
      </div>
      <VideoLightbox id={activeId} onClose={() => setActiveId(null)} />
    </section>
  )
}
