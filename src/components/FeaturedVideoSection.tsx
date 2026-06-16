import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import YouTubeTile from './YouTubeTile'
import VideoLightbox from './VideoLightbox'

const FEATURED_ID = 'J1sABGXaSm0'

export default function FeaturedVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section
      id="work"
      className="bg-transparent pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden aspect-video relative group"
        >
          {/* Featured highlight video */}
          <YouTubeTile videoId={FEATURED_ID} onPlay={setActiveId} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
            {/* Left card */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-3">
                Featured Work
              </p>
              <h3
                className="text-white text-2xl md:text-3xl leading-tight tracking-tight mb-2"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                Tipu v General Munro
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                An AI-generated cinematic sequence built with Seedance 2.0 — my flagship
                experiment in directing story, performance, and motion through generative video.
              </p>
            </div>

            {/* Right button — re-enable pointer events on the link itself */}
            <motion.button
              type="button"
              onClick={() => setActiveId(FEATURED_ID)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium whitespace-nowrap self-end md:self-auto pointer-events-auto"
            >
              Watch the Film
            </motion.button>
          </div>
        </motion.div>
      </div>

      <VideoLightbox id={activeId} onClose={() => setActiveId(null)} />
    </section>
  )
}
