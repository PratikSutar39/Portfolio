import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import YouTubeTile from './YouTubeTile'
import VideoLightbox from './VideoLightbox'

const films = [
  { id: 'J1sABGXaSm0', title: 'Tipu v General Munro' },
  { id: 'VC8-sgDCu44', title: '52 Bahane' },
  { id: 'LhZusV6yuX8', title: 'Shree Krishna v Kaaliya Naag' },
  { id: 'CskjCS77sI8', title: "India's Lost Treasure" },
]

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
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-xs tracking-widest uppercase mb-6"
        >
          Featured Films
        </motion.p>

        {/* 4-tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {films.map((film, i) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-2xl overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden relative">
                <YouTubeTile videoId={film.id} onPlay={setActiveId} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Title */}
              <div className="p-3">
                <p className="text-white text-sm tracking-tight leading-snug">
                  {film.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoLightbox id={activeId} onClose={() => setActiveId(null)} />
    </section>
  )
}
