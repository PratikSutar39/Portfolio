import { useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'

interface Props {
  videoId: string
  title: string
  localPoster?: boolean
  onPlay: (id: string) => void
}

export default function YouTubeTile({ videoId, title, localPoster = false, onPlay }: Props) {
  const [failed, setFailed] = useState(false)
  return (
    <button type="button" className="film-poster" onClick={() => onPlay(videoId)} aria-label={`Play ${title}`}>
      {!failed && <img
        src={localPoster ? `/films/${videoId}.jpg` : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        onError={() => setFailed(true)}
        alt="" width="1280" height="720" loading="lazy" decoding="async"
      />}
      <span className="poster-shade" aria-hidden="true" />
      <span className="poster-corners" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="play-icon" aria-hidden="true"><Play size={16} fill="currentColor" strokeWidth={1} /></span>
      <ArrowUpRight className="poster-arrow" size={21} aria-hidden="true" />
    </button>
  )
}
