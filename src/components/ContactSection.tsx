import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      className="bg-black py-32 px-6 text-center relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 65%), #000',
      }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Let's build
          <br />
          <em className="text-white/60" style={{ fontStyle: 'italic' }}>
            smarter creative systems.
          </em>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-xl mx-auto mt-6 text-white/60 text-base leading-relaxed"
        >
          For collaborations, AI workflow ideas, creative automation systems, portfolio reviews,
          or production technology experiments, reach out and let's connect.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          href="mailto:sutarpratik39@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="liquid-glass rounded-full px-8 py-4 text-white text-sm font-medium inline-flex items-center gap-3 mt-8 hover:bg-white/5 transition-colors"
        >
          <Mail size={18} />
          Contact Me
          <ArrowRight size={16} />
        </motion.a>

        {/* Footer */}
        <div className="border-t border-white/10 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <span>© 2026 Pratik Sutar</span>
          <span>AI Automation Engineer · T-Series · Creative Technology</span>
        </div>
      </div>
    </section>
  )
}
