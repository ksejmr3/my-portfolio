import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_QUERY = '(min-width: 901px) and (prefers-reduced-motion: no-preference)'
const HORIZONTAL_PROJECT_IDS = new Set(['vivienne-westwood', 'cos'])

// Lenis stays on the document scroller: ScrollTrigger pins, sticky sections, and
// the browser scrollbar therefore keep their existing coordinate system.
export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY)
    let lenis = null
    let refreshFrame = 0
    const updateLenis = (time) => lenis?.raf(time * 1000)

    const requestRefresh = () => {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    // Local controls can align the document and any outstanding Lenis target.
    const handleImmediateScroll = (event) => {
      if (!lenis || !Number.isFinite(event.detail?.top)) return
      event.preventDefault()
      lenis.scrollTo(event.detail.top, { immediate: true, force: true })
    }
    window.addEventListener('portfolio:scroll-immediate', handleImmediateScroll)

    const handleAnchor = (event) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash === '#' || HORIZONTAL_PROJECT_IDS.has(hash.slice(1))) return
      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      window.history.pushState(null, '', hash)
      lenis.scrollTo(target, { duration: 0.85 })
    }

    const start = () => {
      if (lenis || !media.matches) return
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        syncTouch: false,
        autoRaf: false,
      })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(updateLenis)
      gsap.ticker.lagSmoothing(0)
      document.addEventListener('click', handleAnchor, true)
      requestRefresh()
    }

    const stop = () => {
      if (!lenis) return
      document.removeEventListener('click', handleAnchor, true)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      lenis = null
      requestRefresh()
    }

    const onMediaChange = () => (media.matches ? start() : stop())
    start()
    media.addEventListener('change', onMediaChange)

    return () => {
      window.removeEventListener('portfolio:scroll-immediate', handleImmediateScroll)
      media.removeEventListener('change', onMediaChange)
      stop()
      cancelAnimationFrame(refreshFrame)
    }
  }, [])

  return null
}
