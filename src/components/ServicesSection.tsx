import FadeIn from './FadeIn'

const services = [
  {
    number: '01',
    name: 'Character & Image Pipelines',
    description:
      'Generative pipelines in ComfyUI with FLUX and LoRA fine-tuning — including a dual-model system that separates identity from style to turn a single photo into a consistent, high-resolution, game-ready character.',
  },
  {
    number: '02',
    name: 'Applied AI Products',
    description:
      'AI products that pair deterministic reasoning with LLMs — RAG over ChromaDB, FastAPI + Pydantic rule engines, and report generation — so the logic stays trustworthy while the model only explains the result.',
  },
  {
    number: '03',
    name: 'AI Web Platforms',
    description:
      'Complete AI web apps with Next.js, TypeScript, Tailwind, and Supabase — natural-language search, LLM match scoring, auth, and messaging — turning model capabilities into products people can actually use.',
  },
  {
    number: '04',
    name: 'Computer Vision & Models',
    description:
      'Training and applying deep-learning models for vision tasks — from convolutional traffic-sign recognition to behavioral-cloning driving experiments — grounding the work in real model training, not just APIs.',
  },
]

export default function ServicesSection() {
  return (
    <section
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontFamily: 'Kanit, sans-serif', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : 'none',
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                className="text-[#0C0C0C] font-black leading-none flex-shrink-0"
                style={{ fontFamily: 'Kanit, sans-serif', fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="pt-1 sm:pt-2 md:pt-3">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase mb-3"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
