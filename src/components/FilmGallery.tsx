import { useState } from 'react'
import YouTubeTile from './YouTubeTile'
import VideoLightbox from './VideoLightbox'

interface Film { id: string; title: string }
interface Props { films: Film[]; featured?: boolean }

export default function FilmGallery({ films, featured = false }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeFilm = films.find((film) => film.id === activeId)
  return (
    <>
      <div className={`film-grid ${featured ? 'featured-grid' : 'cinema-grid'}`}>
        {films.map((film, index) => (
          <article className="film-item" key={film.id}>
            <YouTubeTile videoId={film.id} title={film.title} localPoster={featured} onPlay={setActiveId} />
            <div className="film-caption">
              <h3>{film.title}</h3>
              <span className="film-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </div>
          </article>
        ))}
      </div>
      <VideoLightbox id={activeId} title={activeFilm?.title ?? ''} onClose={() => setActiveId(null)} />
    </>
  )
}
