import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-transparent py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          AI{' '}
          <em className="text-white/40" style={{ fontStyle: 'italic' }}>
            x
          </em>{' '}
          Cinema
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left — video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <video
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              src="/videos/ai-cinema-process.mp4"
            />
          </motion.div>

          {/* Right — text blocks */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center gap-8"
          >
            {/* Block 1 */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                Creative Systems
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                I believe the future of creative production belongs to people who can connect
                imagination with systems. My work is about building repeatable AI workflows that
                help teams move faster without losing the emotion, detail, and cinematic quality
                of the idea.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Block 2 */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                Automation With Taste
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Automation is not just about speed. It is about removing friction from the
                creative process so artists, editors, producers, and directors can spend more
                time making decisions that actually shape the final experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
