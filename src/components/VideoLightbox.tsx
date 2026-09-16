import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'

interface Props { id: string | null; title: string; onClose: () => void }

export default function VideoLightbox({ id, title, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!id) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current
    dialog?.showModal()
    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [id])

  if (!id) return null
  return createPortal(
    <dialog ref={dialogRef} className="video-dialog" aria-labelledby="film-title" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="video-dialog-content">
        <div className="video-dialog-header">
          <h2 id="film-title">{title}</h2>
          <div className="video-dialog-actions">
            <a className="icon-button" href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer" aria-label="Open film on YouTube" title="Open film on YouTube"><ArrowUpRight size={20} /></a>
            <button ref={closeButtonRef} type="button" className="icon-button" onClick={onClose} aria-label="Close film" title="Close film"><X size={22} /></button>
          </div>
        </div>
        <div className="video-frame">
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        </div>
      </div>
    </dialog>,
    document.body,
  )
}
