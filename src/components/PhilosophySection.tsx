import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import YouTubeTile from './YouTubeTile'
import VideoLightbox from './VideoLightbox'

const videos = [
  { id: 'cOpgJSf6G-A', title: 'KillShot' },
  { id: 'K7uhTGTLRVY', title: 'Kaavaan' },
  { id: 'O6W9wV6XIpk', title: 'Ganne Di Pori' },
  { id: 'TM8wQgA1XSI', title: 'Beimaan Sanam Tha Beimaan Mohabbat' },
  { id: 'EKISAz0src8', title: 'Beedio Call' },
  { id: 'FwjC223xx4s', title: 'Apne Haathon Se Mujhe Dedo Zeher' },
  { id: 'y4RKDcT5TRw', title: 'Boxing Fight Sequence' },
]

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section className="bg-transparent py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-12 md:mb-16"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          AI{' '}
          <em className="text-white/40" style={{ fontStyle: 'italic' }}>
            x
          </em>{' '}
          Cinema
        </motion.h2>

        {/* Intro copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
              Creative Systems
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              I believe the future of creative production belongs to people who can connect
              imagination with systems. My work is about building repeatable AI workflows that
              help teams move faster without losing the emotion, detail, and cinematic quality
              of the idea.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
              Automation With Taste
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Automation is not just about speed. It is about removing friction from the
              creative process so artists, editors, producers, and directors can spend more
              time making decisions that actually shape the final experience.
            </p>
          </motion.div>
        </div>

        {/* Video gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass rounded-2xl overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="aspect-video overflow-hidden relative">
                <YouTubeTile videoId={video.id} onPlay={setActiveId} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Title */}
              <div className="p-4">
                <p className="text-white text-sm tracking-tight leading-snug">
                  {video.title}
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
