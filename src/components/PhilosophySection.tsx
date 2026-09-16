import FilmGallery from './FilmGallery'

const videos = [
  { id: 'cOpgJSf6G-A', title: 'KillShot' },
  { id: 'K7uhTGTLRVY', title: 'Kaavaan' },
  { id: 'O6W9wV6XIpk', title: 'Ganne Di Pori' },
  { id: 'TM8wQgA1XSI', title: 'Beimaan Sanam Tha Beimaan Mohabbat' },
  { id: 'EKISAz0src8', title: 'Beedio Call' },
  { id: 'FwjC223xx4s', title: 'Apne Haathon Se Mujhe Dedo Zeher' },
  { id: 'y4RKDcT5TRw', title: 'Boxing Fight Sequence' },
  { id: '9tyYW4kURa4', title: 'Amarnath ki Katha' },
  { id: 'Kr2tWA4C1uM', title: 'Muralidhar ki Murali' },
]

export default function PhilosophySection() {
  return (
    <section id="cinema" className="section cinema-section">
      <div className="page-width">
        <div className="section-heading"><h2>AI <span>x</span> Cinema</h2><span className="heading-rule" aria-hidden="true" /></div>
        <div className="cinema-intro">
          <div>
            <p className="eyebrow">Creative Systems</p>
            <p className="body-copy">
              I believe the future of creative production belongs to people who can connect
              imagination with systems. My work is about building repeatable AI workflows that
              help teams move faster without losing the emotion, detail, and cinematic quality
              of the idea.
            </p>
          </div>
          <div>
            <p className="eyebrow">Automation With Taste</p>
            <p className="body-copy">
              Automation is not just about speed. It is about removing friction from the
              creative process so artists, editors, producers, and directors can spend more
              time making decisions that actually shape the final experience.
            </p>
          </div>
        </div>
        <FilmGallery films={videos} />
      </div>
    </section>
  )
}
