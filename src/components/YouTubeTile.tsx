interface Props {
  videoId: string
  className?: string
  onPlay: (id: string) => void
}

export default function YouTubeTile({ videoId, className = '', onPlay }: Props) {
  return (
    <div
      className={`relative w-full h-full cursor-pointer group/tile ${className}`}
      onClick={() => onPlay(videoId)}
      role="button"
      aria-label="Play video"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        onError={(e) => {
          const img = e.currentTarget
          if (!img.src.includes('hqdefault')) {
            img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          }
        }}
        alt="Video thumbnail"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group/tile-hover:scale-105"
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 group-hover/tile:scale-110 group-hover/tile:bg-white/30">
          {/* Triangle */}
          <div
            className="w-0 h-0 ml-1"
            style={{
              borderTop: '9px solid transparent',
              borderBottom: '9px solid transparent',
              borderLeft: '16px solid rgba(255,255,255,0.9)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
