import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import AnimatedText from './AnimatedText'

const FIGMA =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative corner images */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none"
      >
        <img
          src={`${FIGMA}/moon_icon.11395d36.png`}
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none"
      >
        <img
          src={`${FIGMA}/lego_icon-1.703bb594.png`}
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn
        x={-80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none"
      >
        <img
          src={`${FIGMA}/p59_1.4659672e.png`}
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn
        x={80}
        y={0}
        delay={0.3}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none"
      >
        <img
          src={`${FIGMA}/Group_134-1.2e04f3ce.png`}
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40} delay={0}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: 'Kanit, sans-serif', fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
          <AnimatedText
            text="With more than five years across design and AI engineering, I focus on generative AI workflows, intelligent automation, and creative production systems. I truly enjoy working with teams that aim to stand out and push what is technically possible. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] mx-auto"
          />
        </div>
      </div>

      <div className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <ContactButton />
      </div>
    </section>
  )
}
