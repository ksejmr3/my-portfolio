import { useEffect, useRef } from 'react'

export default function ImageLightbox({ image, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const dialog = closeButtonRef.current?.closest('[role="dialog"]')
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'Tab' && dialog) {
        const focusable = [...dialog.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')]
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus?.()
    }
  }, [onClose])

  return <div className="image-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="image-lightbox__dialog" role="dialog" aria-modal="true" aria-label={`${image.label} 원본 이미지 확대`}>
      <div className="image-lightbox__bar"><p>{image.label} / ORIGINAL SIZE</p><button type="button" ref={closeButtonRef} onClick={onClose}>CLOSE <span aria-hidden="true">×</span></button></div>
      <div className="image-lightbox__viewport" data-lenis-prevent><img src={image.src} alt={image.alt} /></div>
    </section>
  </div>
}
