import FilmGallery from './FilmGallery'

const films = [
  { id: 'J1sABGXaSm0', title: 'Tipu v General Munro' },
  { id: 'VC8-sgDCu44', title: '52 Bahane' },
  { id: 'LhZusV6yuX8', title: 'Shree Krishna v Kaaliya Naag' },
  { id: 'CskjCS77sI8', title: "India's Lost Treasure" },
]

export default function FeaturedVideoSection() {
  return (
    <section id="work" className="featured-section">
      <div className="page-width">
        <div className="section-heading"><h2>Featured Films</h2><span className="heading-rule" aria-hidden="true" /></div>
        <FilmGallery films={films} featured />
      </div>
    </section>
  )
}
