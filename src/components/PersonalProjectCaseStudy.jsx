import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/personal-projects.css'
import cosHero from '../assets/cos/hero-main.png'
import cosDetail from '../assets/cos/hero-sub.png'

const SCROLL_SPEED_VIEWPORTS_PER_SECOND = 0.27
const ENDPOINT_PAUSE_MS = 750
const PERSONAL_SCROLL_RESTORE_KEY = 'personal-work-horizontal-progress'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const projectContent = {
  'vivienne-westwood': {
    name: 'VIVIENNE WESTWOOD',
    designSlices: [
      { src: '/images/personal-projects/vivienne-westwood-latest/01-header.png', width: 1920, height: 96 },
      { src: '/images/personal-projects/vivienne-westwood-latest/02-hero.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/03-latest-collection.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/04-house-objects.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/05-selected-projects.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/06-house-intro.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/07-heritage.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/08-craftsmanship.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/09-rebellion.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/10-latest-news.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/11-house-codes.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/12-editorial-voices.png', width: 1920, height: 1080 },
      { src: '/images/personal-projects/vivienne-westwood-latest/13-footer.png', width: 1920, height: 1080 },
    ],
    designAlt: 'Vivienne Westwood 최신 Figma 랜딩페이지 미리보기',
    liveUrl: 'https://vivienne-westwood-portfolio.vercel.app/',
    theme: 'vivienne',
    summary: '영국 테일러링과 펑크 문화의 대비를 대형 타이포그래피와 비대칭 이미지, 스크롤 흐름으로 재해석한 에디토리얼 웹사이트입니다.',
    role: '정보 구조와 UI를 설계하고 React로 구현했습니다.',
    visualCaption: 'FASHION LANDING PAGE REDESIGN',
    layers: [
      { src: '/images/personal-projects/vivienne-westwood-latest/15-heritage-layer.png', alt: 'Vivienne Westwood 헤리티지 이미지', className: 'heritage' },
      { src: '/images/personal-projects/vivienne-westwood-latest/16-craftsmanship-layer.png', alt: 'Vivienne Westwood 장인정신 이미지', className: 'craft' },
      { src: '/images/personal-projects/vivienne-westwood-latest/14-hero-feature.png', alt: 'Vivienne Westwood 캠페인 이미지', className: 'runway' },
    ],
  },
  cos: {
    name: 'COS KOREA',
    designSlices: [
      { src: '/images/personal-projects/cos-sections/01-hero.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/02-season-message.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/03-collection-intro.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/04-new-arrivals-one.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/05-new-arrivals-two.webp', width: 1920, height: 1570 },
      { src: '/images/personal-projects/cos-sections/06-collection-edit.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/07-stories.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/08-design-philosophy.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/09-material-craft.webp', width: 1920, height: 1080 },
      { src: '/images/personal-projects/cos-sections/10-footer.webp', width: 1920, height: 1080 },
    ],
    designAlt: 'COS Korea 랜딩페이지 디자인 미리보기',
    liveUrl: 'https://cos-portfolio-pied.vercel.app/',
    theme: 'cos',
    summary: 'COS의 절제된 형태와 소재 표현을 바탕으로, 캠페인에서 제품과 브랜드 스토리로 이어지는 흐름을 여백과 뉴트럴 이미지로 구성했습니다.',
    role: 'Figma 화면을 설계하고 React 기반 랜딩페이지로 구현했습니다.',
    visualCaption: 'MINIMAL FASHION LANDING PAGE REDESIGN',
    layers: [
      { src: cosHero, alt: 'COS Korea 메인 캠페인 이미지', className: 'campaign' },
      { src: cosDetail, alt: 'COS Korea 소재 디테일 이미지', className: 'detail' },
    ],
  },
}

function readMotion(elapsed, travelDuration) {
  if (!travelDuration) return { segment: 'start', progress: 0, elapsed: 0 }
  const cycle = travelDuration * 2 + ENDPOINT_PAUSE_MS * 2
  const phase = elapsed % cycle
  if (phase < ENDPOINT_PAUSE_MS) return { segment: 'start', progress: 0, elapsed: phase }
  if (phase < ENDPOINT_PAUSE_MS + travelDuration) {
    return { segment: 'forward', progress: (phase - ENDPOINT_PAUSE_MS) / travelDuration, elapsed: 0 }
  }
  if (phase < travelDuration + ENDPOINT_PAUSE_MS * 2) {
    return { segment: 'end', progress: 1, elapsed: phase - travelDuration - ENDPOINT_PAUSE_MS }
  }
  return { segment: 'reverse', progress: 1 - (phase - travelDuration - ENDPOINT_PAUSE_MS * 2) / travelDuration, elapsed: 0 }
}

function useDesignScroll(sectionRef, viewportRef, pageRef) {
  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const page = pageRef.current
    if (!section || !viewport || !page) return undefined
    const images = [...page.querySelectorAll('img')]
    if (!images.length) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let frame = null
    let lastTime = 0
    let elapsed = 0
    let distance = 0
    let travelDuration = 0
    let assetsReady = false

    const measure = () => {
      if (!assetsReady) return
      const motion = readMotion(elapsed, travelDuration)
      const viewportHeight = viewport.clientHeight
      const nextDistance = Math.max(0, page.scrollHeight - viewportHeight)
      const speed = viewportHeight * SCROLL_SPEED_VIEWPORTS_PER_SECOND
      distance = nextDistance
      travelDuration = distance > 0 && speed > 0 ? (distance / speed) * 1000 : 0

      if (motion.segment === 'forward') elapsed = ENDPOINT_PAUSE_MS + motion.progress * travelDuration
      else if (motion.segment === 'end') elapsed = ENDPOINT_PAUSE_MS + travelDuration + motion.elapsed
      else if (motion.segment === 'reverse') elapsed = ENDPOINT_PAUSE_MS * 2 + travelDuration + (1 - motion.progress) * travelDuration
      else elapsed = motion.elapsed

      page.style.transform = `translate3d(0, ${-distance * motion.progress}px, 0)`
      lastTime = 0
    }

    const draw = (time) => {
      frame = null
      if (!visible || document.hidden || reducedMotion.matches) return
      if (lastTime) elapsed += time - lastTime
      lastTime = time

      const motion = readMotion(elapsed, travelDuration)
      page.style.transform = `translate3d(0, ${-distance * motion.progress}px, 0)`
      frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (frame === null && visible && assetsReady && !reducedMotion.matches && !document.hidden) {
        frame = requestAnimationFrame(draw)
      }
    }
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      lastTime = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        elapsed = 0
        page.style.transform = 'translate3d(0, 0, 0)'
        start()
      }
      else stop()
    }, { threshold: 0.05 })
    let preloadStarted = false
    const resizeObserver = new ResizeObserver(measure)
    observer.observe(viewport)
    resizeObserver.observe(viewport)
    resizeObserver.observe(page)
    const onAssetsReady = () => {
      if (assetsReady || !images.every((image) => image.complete && image.naturalWidth > 0)) return
      assetsReady = true
      measure()
      start()
    }
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || preloadStarted) return
      preloadStarted = true
      preloadObserver.disconnect()
      images.forEach((image) => { image.loading = 'eager' })
      Promise.all(images.map((image) => image.decode?.().catch(() => {}) ?? Promise.resolve())).then(onAssetsReady)
    }, { rootMargin: '1200px 0px' })
    images.forEach((image) => {
      image.addEventListener('load', onAssetsReady)
      image.addEventListener('error', onAssetsReady)
    })
    if (images.every((image) => image.complete && image.naturalWidth > 0)) onAssetsReady()
    else preloadObserver.observe(section)

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stop()
        elapsed = 0
        page.style.transform = 'translate3d(0, 0, 0)'
      } else {
        measure()
        start()
      }
    }
    const onVisibilityChange = () => document.hidden ? stop() : start()
    reducedMotion.addEventListener?.('change', onMotionPreferenceChange)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      observer.disconnect()
      preloadObserver.disconnect()
      resizeObserver.disconnect()
      images.forEach((image) => {
        image.removeEventListener('load', onAssetsReady)
        image.removeEventListener('error', onAssetsReady)
      })
      reducedMotion.removeEventListener?.('change', onMotionPreferenceChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      stop()
    }
  }, [sectionRef, viewportRef, pageRef])
}

function DesignLaptop({ project }) {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const pageRef = useRef(null)
  useDesignScroll(sectionRef, viewportRef, pageRef)

  return <div className={`personal-project__visual personal-project__visual--${project.theme}`} ref={sectionRef} aria-label={`${project.name} Figma 디자인 목업`}>
    <div className="personal-project__stage">
      <div className="personal-project__layers" aria-hidden="true">
        {project.layers.map((layer) => <img key={layer.className} className={`personal-project__layer personal-project__layer--${layer.className}`} src={layer.src} alt={layer.alt} loading="lazy" decoding="async" />)}
      </div>
      <a className="personal-project__laptop" href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} 실제 사이트를 새 창에서 열기`}>
        <div className="personal-project__screen" ref={viewportRef}>
          <div className="personal-project__page" ref={pageRef} role="img" aria-label={project.designAlt}>
            {project.designSlices.map((slice) => <img key={slice.src} src={slice.src} width={slice.width} height={slice.height} alt="" loading="lazy" decoding="async" />)}
          </div>
        </div>
        <img className="personal-project__laptop-frame" src="/images/mockups/laptop-mockup-alpha.png" alt="" aria-hidden="true" />
      </a>
    </div>
    <p className="personal-project__visual-caption">{project.visualCaption}</p>
  </div>
}

export default function PersonalProjectCaseStudy() {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const projects = Object.entries(projectContent)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const syncPanels = () => track.style.setProperty('--personal-slide-width', `${viewport.clientWidth}px`)
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        let refreshFrame = 0
        let restoreFrame = 0
        let viewportSize = ''
        const navigationEntry = performance.getEntriesByType('navigation')[0]
        const isReload = navigationEntry?.type === 'reload'
        let restoreProgress = null
        if (isReload) {
          try {
            const saved = JSON.parse(sessionStorage.getItem(PERSONAL_SCROLL_RESTORE_KEY) || 'null')
            if (saved?.path === `${window.location.pathname}${window.location.search}`
              && Number.isFinite(saved.progress)
              && Date.now() - saved.savedAt < 30_000) {
              restoreProgress = Math.min(1, Math.max(0, saved.progress))
            }
          } catch {
            sessionStorage.removeItem(PERSONAL_SCROLL_RESTORE_KEY)
          }
        } else {
          sessionStorage.removeItem(PERSONAL_SCROLL_RESTORE_KEY)
        }
        syncPanels()
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'personal-work-horizontal',
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: viewport,
            scrub: 0.35,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        const saveProgressForReload = () => {
          const trigger = tween.scrollTrigger
          if (!trigger?.isActive) {
            sessionStorage.removeItem(PERSONAL_SCROLL_RESTORE_KEY)
            return
          }
          sessionStorage.setItem(PERSONAL_SCROLL_RESTORE_KEY, JSON.stringify({
            path: `${window.location.pathname}${window.location.search}`,
            progress: trigger.progress,
            savedAt: Date.now(),
          }))
        }

        const restoreAfterRefresh = () => {
          if (restoreProgress === null) return
          if (restoreFrame) cancelAnimationFrame(restoreFrame)
          restoreFrame = requestAnimationFrame(() => {
            restoreFrame = 0
            const trigger = tween.scrollTrigger
            if (!trigger) return
            const target = trigger.start + (trigger.end - trigger.start) * restoreProgress
            window.scrollTo({ top: target, behavior: 'auto' })
            ScrollTrigger.update()
            restoreProgress = null
            sessionStorage.removeItem(PERSONAL_SCROLL_RESTORE_KEY)
            ScrollTrigger.removeEventListener('refresh', restoreAfterRefresh)
          })
        }
        window.addEventListener('pagehide', saveProgressForReload)
        if (restoreProgress !== null) ScrollTrigger.addEventListener('refresh', restoreAfterRefresh)

        const refresh = (force = false) => {
          if (refreshFrame) cancelAnimationFrame(refreshFrame)
          refreshFrame = requestAnimationFrame(() => {
            refreshFrame = 0
            const nextViewportSize = `${viewport.clientWidth}x${viewport.clientHeight}`
            if (!force && nextViewportSize === viewportSize) return
            viewportSize = nextViewportSize
            syncPanels()
            ScrollTrigger.refresh()
          })
        }
        viewportSize = `${viewport.clientWidth}x${viewport.clientHeight}`
        const observer = new ResizeObserver(() => refresh())
        observer.observe(viewport)
        const images = [...track.querySelectorAll('img')]
        const imageLoadHandlers = new Map()
        images.forEach((image) => {
          const handler = () => refresh(true)
          imageLoadHandlers.set(image, handler)
          image.addEventListener('load', handler, { once: true })
        })
        document.fonts?.ready.then(() => refresh(true))
        refresh(true)

        return () => {
          observer.disconnect()
          if (refreshFrame) cancelAnimationFrame(refreshFrame)
          if (restoreFrame) cancelAnimationFrame(restoreFrame)
          window.removeEventListener('pagehide', saveProgressForReload)
          ScrollTrigger.removeEventListener('refresh', restoreAfterRefresh)
          imageLoadHandlers.forEach((handler, image) => image.removeEventListener('load', handler))
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
      return () => media.revert()
    }, section)

    return () => context.revert()
  }, [])

  useEffect(() => {
    const getProjectIndex = (hash) => projects.findIndex(([id]) => `#${id}` === hash)
    const scrollToProject = (hash, behavior = 'smooth') => {
      if (window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)').matches) return false
      const index = getProjectIndex(hash)
      const trigger = ScrollTrigger.getById('personal-work-horizontal')
      if (index < 0 || !trigger) return false
      const progress = projects.length > 1 ? index / (projects.length - 1) : 0
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior })
      return true
    }
    const handleClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link || getProjectIndex(link.getAttribute('href')) < 0) return
      if (!scrollToProject(link.getAttribute('href'))) return
      event.preventDefault()
      window.history.pushState(null, '', link.getAttribute('href'))
    }
    const handleHistory = () => scrollToProject(window.location.hash, 'auto')
    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handleHistory)
    window.addEventListener('hashchange', handleHistory)
    if (getProjectIndex(window.location.hash) >= 0) requestAnimationFrame(() => scrollToProject(window.location.hash, 'auto'))
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handleHistory)
      window.removeEventListener('hashchange', handleHistory)
    }
  }, [])

  return <section className="personal-work" aria-label="PERSONAL WORK" ref={sectionRef}>
    <div className="personal-work__viewport" ref={viewportRef}>
      <div className="personal-work__track" ref={trackRef}>
        {projects.map(([projectId, project]) => <article className={`personal-project personal-project--${project.theme}`} id={projectId} key={projectId} aria-labelledby={`${projectId}-title`}>
          <div className="personal-project__inner">
            <div className="personal-project__layout">
              <header className="personal-project__heading">
                <div className="personal-work__topline">
                  <p className="personal-work__eyebrow">PERSONAL WORK</p>
                </div>
                <h2 id={`${projectId}-title`}>{project.name}</h2>
                <p className="personal-project__summary">{project.summary}</p>
                <div className="personal-project__details">
                  <p><span>MY WORK</span>{project.role}</p>
                  <a className="personal-project__live-link" href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} 실제 사이트를 새 창에서 열기`}>
                    <span>SITE VIEW</span><span aria-hidden="true">↗</span>
                  </a>
                </div>
              </header>
              <DesignLaptop project={project} />
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
