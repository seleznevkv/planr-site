import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return createPortal(
    <div className="lightbox" onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Закрыть">
        ✕
      </button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption || ''} />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>
    </div>,
    document.body,
  )
}
