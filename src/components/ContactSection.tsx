import { Aperture, Mail, ArrowRight, ArrowUp, Globe } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="page-width">
        <Aperture className="contact-aperture" size={44} strokeWidth={1} aria-hidden="true" />
        <h2>Let's build<br /><span>smarter creative systems.</span></h2>
        <p className="body-copy">
          For collaborations, AI workflow ideas, creative automation systems, portfolio reviews,
          or production technology experiments, reach out and let's connect.
        </p>
        <div className="button-row">
          <a href="mailto:sutarpratik39@gmail.com" className="button button-primary"><Mail size={18} aria-hidden="true" />Contact Me<ArrowRight size={17} aria-hidden="true" /></a>
          <a href="https://pratik-sutar.vercel.app/" target="_blank" rel="noreferrer" className="button"><Globe size={18} aria-hidden="true" />Read the Blog</a>
        </div>
        <footer className="site-footer">
          <span>© 2026 Pratik Sutar · Pune, India</span>
          <span>Gen AI Engineer · T-Series · Creative Technology</span>
          <a className="icon-button" href="#hero" aria-label="Back to top" title="Back to top"><ArrowUp size={18} /></a>
        </footer>
      </div>
    </section>
  )
}
