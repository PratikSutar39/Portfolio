import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const thumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, id: string) => {
  const img = e.currentTarget
  if (!img.src.includes('hqdefault')) {
    img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  }
}

const projects = [
  {
    number: '01',
    category: 'RAG / AI Product',
    name: 'CarTrust',
    url: 'https://github.com/PratikSutar39/CarTrust',
    images: ['J1sABGXaSm0', 'LhZusV6yuX8', 'CskjCS77sI8'],
  },
  {
    number: '02',
    category: 'Full-Stack AI / Next.js',
    name: 'SuperNetworkAI',
    url: 'https://github.com/PratikSutar39/SuperNetworkAI',
    images: ['y4RKDcT5TRw', 'cOpgJSf6G-A', 'K7uhTGTLRVY'],
  },
  {
    number: '03',
    category: 'Generative AI / Diffusion',
    name: 'Pixel Art Character Generator',
    url: 'https://github.com/PratikSutar39/pixel-art-character-generator',
    images: ['O6W9wV6XIpk', 'TM8wQgA1XSI', 'EKISAz0src8'],
  },
  {
    number: '04',
    category: 'RAG / Automation',
    name: 'IntelliDoc',
    url: 'https://github.com/PratikSutar39/IntelliDoc',
    images: ['FwjC223xx4s', 'J1sABGXaSm0', 'LhZusV6yuX8'],
  },
]

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

function Card({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: (typeof projects)[0]
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className={`relative w-full max-w-6xl ${radius} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top`}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 sm:mb-7">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="text-[#D7E2EA] font-black leading-none"
              style={{ fontFamily: 'Kanit, sans-serif', fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div>
              <p className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-xs sm:text-sm mb-1">
                {project.category}
              </p>
              <h3
                className="text-[#D7E2EA] font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2.4rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors whitespace-nowrap"
          >
            View on GitHub
          </a>
        </div>

        {/* Bottom row — image grid */}
        <div className="flex gap-3 sm:gap-4">
          {/* Left column 40% */}
          <div className="w-2/5 flex flex-col gap-3 sm:gap-4">
            <img
              src={thumb(project.images[0])}
              onError={(e) => handleImgError(e, project.images[0])}
              alt=""
              className={`w-full object-cover ${radius}`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={thumb(project.images[1])}
              onError={(e) => handleImgError(e, project.images[1])}
              alt=""
              className={`w-full object-cover ${radius}`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          {/* Right column 60% */}
          <div className="w-3/5">
            <img
              src={thumb(project.images[2])}
              onError={(e) => handleImgError(e, project.images[2])}
              alt=""
              className={`w-full object-cover ${radius}`}
              style={{ height: 'clamp(302px, 38vw, 582px)' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16"
        style={{ fontFamily: 'Kanit, sans-serif', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.03
          return (
            <Card
              key={project.number}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
