import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FeaturedVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

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
          className="rounded-3xl overflow-hidden aspect-video relative"
        >
          {/* Showreel video */}
          <video
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            src="/videos/showreel.mp4"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Left card */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-3">
                Featured Work
              </p>
              <p className="text-white text-sm md:text-base leading-relaxed">
                A collection of AI-assisted production experiments, music-video concepts,
                storyboard frames, character systems, automation tools, and visual workflows
                created to accelerate modern content pipelines.
              </p>
            </div>

            {/* Right button */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium whitespace-nowrap self-end md:self-auto"
            >
              Explore Projects
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
