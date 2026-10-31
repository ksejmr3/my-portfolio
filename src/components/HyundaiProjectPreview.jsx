import { useEffect, useRef } from 'react'

const SPEED = 0.27
const PAUSE = 750

const DESKTOP_TILES = [
  { src: '/images/hyundai/selected-works/web/desktop/desktop-01.webp', width: 1280, height: 2048 },
  { src: '/images/hyundai/selected-works/web/desktop/desktop-02.webp', width: 1280, height: 2048 },
  { src: '/images/hyundai/selected-works/web/desktop/desktop-03.webp', width: 1280, height: 2048 },
  { src: '/images/hyundai/selected-works/web/desktop/desktop-04.webp', width: 1280, height: 2048 },
  { src: '/images/hyundai/selected-works/web/desktop/desktop-05.webp', width: 1280, height: 2048 },
  { src: '/images/hyundai/selected-works/web/desktop/desktop-06.webp', width: 1280, height: 2048 },
  { src: '/images/hyundai/selected-works/web/desktop/desktop-07.webp', width: 1280, height: 1469 },
]

const MOBILE_TILES = [
  { src: '/images/hyundai/selected-works/web/mobile/mobile-01.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-02.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-03.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-04.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-05.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-06.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-07.webp', width: 640, height: 2048 },
  { src: '/images/hyundai/selected-works/web/mobile/mobile-08.webp', width: 640, height: 959 },
]

function AutoScrollScreen({ tiles, className }) {
  const viewportRef = useRef(null)
  const pageRef = useRef(null)
  useEffect(() => {
    const viewport = viewportRef.current; const page = pageRef.current
    if (!viewport || !page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const images = [...page.querySelectorAll('img')]
    let frame = 0; let visible = false; let last = 0; let elapsed = 0; let distance = 0; let duration = 0; let preloadDistance = 0; let tileBottoms = []; let disposed = false; let queuedIndex = 1
    let decodeQueue = Promise.resolve()
    const loadThrough = (targetIndex) => {
      while (queuedIndex < Math.min(targetIndex, images.length - 1)) {
        queuedIndex += 1
        const image = images[queuedIndex]
        decodeQueue = decodeQueue.then(async () => {
          if (disposed || !image?.dataset.src) return
          image.src = image.dataset.src
          delete image.dataset.src
          try { await image.decode() } catch { /* The browser keeps the reserved tile space on a failed decode. */ }
        })
      }
    }
    const measure = () => {
      const viewportWidth = viewport.clientWidth
      const viewportHeight = viewport.clientHeight
      const scale = viewportWidth / tiles[0].width
      let bottom = 0
      tileBottoms = tiles.map((tile) => { bottom += tile.height * scale; return bottom })
      preloadDistance = viewportHeight * 3
      distance = Math.max(0, bottom - viewportHeight)
      duration = distance ? distance / (viewportHeight * SPEED) * 1000 : 0
    }
    const queueUpcomingTiles = (offset) => {
      const target = offset + preloadDistance
      const foundIndex = tileBottoms.findIndex((bottom) => bottom >= target)
      const tileIndex = foundIndex < 0 ? tiles.length - 1 : foundIndex
      loadThrough(tileIndex + 1)
    }
    const draw = (time) => { if (!visible) return; if (last) elapsed += time - last; last = time; const phase = duration ? elapsed % (duration * 2 + PAUSE * 2) : 0; const progress = phase < PAUSE ? 0 : phase < PAUSE + duration ? (phase - PAUSE) / duration : phase < duration + PAUSE * 2 ? 1 : 1 - (phase - duration - PAUSE * 2) / duration; const offset = distance * progress; page.style.transform = `translate3d(0, ${-offset}px, 0)`; queueUpcomingTiles(offset); frame = requestAnimationFrame(draw) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; last = 0; if (visible) { if (!frame) frame = requestAnimationFrame(draw) } else if (frame) { cancelAnimationFrame(frame); frame = 0 } }, { threshold: .08 })
    const resize = new ResizeObserver(measure)
    observer.observe(viewport); resize.observe(viewport); measure()
    images.slice(0, 2).reduce((queue, image) => queue.then(() => image.decode().catch(() => {})), Promise.resolve())
    return () => { disposed = true; observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame) }
  }, [tiles])
  return <div className={className} ref={viewportRef}><div className="hyundai-project-preview__screen-strip" ref={pageRef}>{tiles.map((tile, index) => <img key={tile.src} src={index < 2 ? tile.src : undefined} data-src={index < 2 ? undefined : tile.src} alt="" width={tile.width} height={tile.height} decoding="async" />)}</div></div>
}

export default function HyundaiProjectPreview() {
  return <figure className="hyundai-project-preview">
    <div className="hyundai-project-preview__desktop"><AutoScrollScreen className="hyundai-project-preview__screen hyundai-project-preview__screen--desktop" tiles={DESKTOP_TILES} /><img className="hyundai-project-preview__imac-frame" src="/images/mockups/imac-frame-transparent.png" alt="" aria-hidden="true" /></div>
    <div className="hyundai-project-preview__phone"><AutoScrollScreen className="hyundai-project-preview__screen hyundai-project-preview__screen--phone" tiles={MOBILE_TILES} /><i aria-hidden="true" /></div>
    <figcaption>RESPONSIVE MAIN DESIGN</figcaption>
  </figure>
}
