import { Globe, ArrowRight, Linkedin, Instagram, Mail, Github } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-transparent overflow-hidden relative flex flex-col">
      {/* Bottom gradient for headline legibility over the plasma */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-[2] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 mt-2">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left — logo */}
          <div className="flex items-center gap-3">
            <Globe size={24} className="text-white" />
            <span className="text-white font-semibold text-lg tracking-tight">Pratik Sutar</span>
          </div>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {['Work', 'Systems', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3">
            <button className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden sm:block">
              Portfolio
            </button>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Connect
            </a>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <h1
          className="text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Building AI systems
          <br />
          <em className="text-white/60 not-italic" style={{ fontStyle: 'italic' }}>
            for stories.
          </em>
        </h1>

        <p className="max-w-2xl text-white/70 text-sm md:text-base leading-relaxed px-4 mt-6">
          Gen AI Engineer building production-ready AI systems — RAG pipelines,
          autonomous agents, and full-stack LLM products, with generative character work in
          ComfyUI — turning models into tools people can actually use.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <a
            href="#work"
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            className="flex items-center gap-2 bg-white text-black rounded-full px-8 py-3 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Download Resume
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="https://www.linkedin.com/in/pratiksutar39"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://www.instagram.com/pratiksutar.39"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://github.com/PratikSutar39"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="mailto:sutarpratik39@gmail.com"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>
    </section>
  )
}
