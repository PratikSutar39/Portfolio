import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen bg-[#0C0C0C] flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* Navbar */}
      <FadeIn y={-20} delay={0}>
        <nav className="flex items-center justify-between gap-4 px-6 md:px-10 pt-6 md:pt-8 max-w-[1600px] mx-auto w-full">
          <span className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            Pratik Sutar
          </span>
          <div className="flex items-center gap-5 sm:gap-8 md:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Hero heading */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 max-w-[1600px] mx-auto w-full">
        <div className="overflow-hidden">
          <FadeIn y={40} delay={0.15}>
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5"
              style={{ fontFamily: 'Kanit, sans-serif' }}
            >
              Hi, i&apos;m Pratik
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 max-w-[1600px] mx-auto w-full">
        <div className="flex justify-between items-end gap-6">
          <FadeIn y={20} delay={0.35}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              a gen ai engineer crafting intelligent systems for creative production
            </p>
          </FadeIn>
          <FadeIn y={20} delay={0.5}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
