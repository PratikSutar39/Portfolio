import { useEffect, useRef, useState } from 'react'
import { Aperture, ArrowRight, Download, Focus, Github, Instagram, Linkedin, Mail, Menu, X } from 'lucide-react'

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const reticle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])

  return (
    <section id="hero" className="hero">
      <div className="hero-photograph">
        <img src="/images/pratik-aurora.jpg" alt="Pratik Sutar beneath the northern lights" width="1440" height="1440" />
      </div>
      <header className="site-header">
        <nav className="site-nav page-width" aria-label="Main navigation">
          <a className="wordmark" href="#hero"><Aperture size={29} strokeWidth={1.5} aria-hidden="true" /><span>Pratik Sutar</span></a>
          <div id="navigation-links" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {['Work', 'Systems', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{link}</a>
            ))}
            <a href="#hero" onClick={() => setMenuOpen(false)}>Portfolio</a>
          </div>
          <a className="button button-small nav-connect" href="#contact" onClick={() => setMenuOpen(false)}>Connect <ArrowRight size={15} aria-hidden="true" /></a>
          <button ref={menuButton} type="button" className="icon-button menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="navigation-links" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>
      <div className="hero-stage"
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse' || !reticle.current) return
          const bounds = event.currentTarget.getBoundingClientRect()
          reticle.current.style.transform = `translate3d(${event.clientX - bounds.left}px, ${event.clientY - bounds.top}px, 0)`
        }}
      >
        <div className="viewfinder-corners" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hero-reticle" ref={reticle} aria-hidden="true"><Focus size={34} strokeWidth={1} /></div>
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <p className="eyebrow hero-name">Pratik Sutar</p>
            <h1>Building AI systems<br /><span>for stories.</span></h1>
            <p className="hero-description">
              Gen AI Engineer building production-ready AI systems — RAG pipelines,
              autonomous agents, and full-stack LLM products, with generative character work in
              ComfyUI — turning models into tools people can actually use.
            </p>
            <div className="button-row">
              <a className="button button-primary" href="#work">View My Work <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="button" href="/resume.pdf">Download Resume <Download size={17} aria-hidden="true" /></a>
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/pratiksutar39" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/pratiksutar.39" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><Instagram size={20} /></a>
              <a href="https://github.com/PratikSutar39" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><Github size={20} /></a>
              <a href="mailto:sutarpratik39@gmail.com" aria-label="Email" title="Email"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
