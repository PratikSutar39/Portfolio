import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'

const education = [
  {
    degree: 'B.E., Mechanical Engineering',
    school: 'Nagesh Karajagi Orchid College of Engineering & Technology',
    period: '2014 — 2018',
  },
  {
    degree: '12th HSC',
    school: 'SR Chandak Junior College, Solapur',
    period: '2012 — 2014',
  },
  {
    degree: '10th SSC',
    school: 'Saint Joseph High School, Solapur',
    period: '2012',
  },
]

const certifications = [
  'Generative AI Cohort Certificate',
  '100x Mini Hackathon',
  'Simulink Onramp',
  'Matlab Onramp',
]

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="bg-transparent py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Education &{' '}
          <em className="text-white/60" style={{ fontStyle: 'italic' }}>
            Credentials
          </em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="liquid-glass rounded-full p-2">
                <GraduationCap size={18} className="text-white/60" />
              </div>
              <span className="text-white/40 text-xs tracking-widest uppercase">Education</span>
            </div>

            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.degree} className="border-l border-white/10 pl-4">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-white text-lg tracking-tight">{edu.degree}</h3>
                    <span
                      className="text-white/40 text-sm"
                      style={{ fontFamily: '"Instrument Serif", serif' }}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="liquid-glass rounded-full p-2">
                <Award size={18} className="text-white/60" />
              </div>
              <span className="text-white/40 text-xs tracking-widest uppercase">
                Certifications
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 bg-white/[0.04] border border-white/10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
