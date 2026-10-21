import { useEffect, useRef } from 'react'

const SPEED = 0.27
const PAUSE = 750

function AutoScrollScreen({ src, className }) {
  const viewportRef = useRef(null)
  const pageRef = useRef(null)
  useEffect(() => {
    const viewport = viewportRef.current; const page = pageRef.current
    if (!viewport || !page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0; let visible = false; let last = 0; let elapsed = 0; let distance = 0; let duration = 0
    const measure = () => { if (!page.naturalWidth) return; distance = Math.max(0, page.naturalHeight * (viewport.clientWidth / page.naturalWidth) - viewport.clientHeight); duration = distance ? distance / (viewport.clientHeight * SPEED) * 1000 : 0 }
    const draw = (time) => { if (!visible) return; if (last) elapsed += time - last; last = time; const phase = duration ? elapsed % (duration * 2 + PAUSE * 2) : 0; const progress = phase < PAUSE ? 0 : phase < PAUSE + duration ? (phase - PAUSE) / duration : phase < duration + PAUSE * 2 ? 1 : 1 - (phase - duration - PAUSE * 2) / duration; page.style.transform = `translate3d(0, ${-distance * progress}px, 0)`; frame = requestAnimationFrame(draw) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; last = 0; if (visible) { elapsed = 0; page.style.transform = 'translate3d(0, 0, 0)'; if (!frame) frame = requestAnimationFrame(draw) } else if (frame) { cancelAnimationFrame(frame); frame = 0 } }, { threshold: .08 })
    const resize = new ResizeObserver(measure)
    observer.observe(viewport); resize.observe(viewport); page.addEventListener('load', measure); measure()
    return () => { observer.disconnect(); resize.disconnect(); page.removeEventListener('load', measure); cancelAnimationFrame(frame) }
  }, [])
  return <div className={className} ref={viewportRef}><img ref={pageRef} src={src} alt="" /></div>
}

export default function HyundaiProjectPreview() {
  return <figure className="hyundai-project-preview">
    <div className="hyundai-project-preview__desktop"><AutoScrollScreen className="hyundai-project-preview__screen hyundai-project-preview__screen--desktop" src="/images/hyundai/selected-works/exhibition-desktop-figma.webp" /><img className="hyundai-project-preview__laptop-frame" src="/images/mockups/laptop-mockup-alpha.png" alt="" aria-hidden="true" /></div>
    <div className="hyundai-project-preview__phone"><AutoScrollScreen className="hyundai-project-preview__screen hyundai-project-preview__screen--phone" src="/images/hyundai/selected-works/exhibition-mobile-figma.webp" /><i aria-hidden="true" /></div>
    <figcaption>FIGMA / RESPONSIVE MAIN DESIGN</figcaption>
  </figure>
}
