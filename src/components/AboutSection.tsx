import { Aperture } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="page-width">
        <div className="section-heading"><p className="eyebrow">About Me</p><Aperture size={22} strokeWidth={1} aria-hidden="true" /></div>
        <div className="about-layout">
          <h2>I design AI workflows <span>where creativity</span> for music, video, and production teams <span>meets automation.</span></h2>
          <p className="body-copy">
            My work centers on generative media — character and image pipelines built in ComfyUI
            with FLUX and LoRA, along with video and image generation using tools like Higgsfield,
            Kling, and Google Veo. My focus is production-readiness: systems that consider
            scalability, cost, and real deployment — not just impressive demos.
          </p>
        </div>
      </div>
    </section>
  )
}
