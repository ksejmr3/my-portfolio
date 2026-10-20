import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/personal-projects.css'
import cosHero from '../assets/cos/hero-main.png'
import cosDetail from '../assets/cos/hero-sub.png'

const SCROLL_SPEED_VIEWPORTS_PER_SECOND = 0.27
const ENDPOINT_PAUSE_MS = 750

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
    projectType: '개인 웹사이트 리디자인',
    concept: 'BRITISH HERITAGE × REBELLION',
    summary: '영국의 전통적인 테일러링과 펑크 문화에서 출발한 브랜드 정체성을 에디토리얼 웹 경험으로 재해석했습니다. 대형 타이포그래피와 비대칭 이미지 구성, 스크롤 인터랙션을 통해 헤리티지와 반항적인 브랜드 감성을 표현했습니다.',
    role: '브랜드 랜딩페이지의 정보 구조와 시각 시스템을 설계하고, React 기반 화면 구현에 참여했습니다.',
    learning: '최신 Figma 디자인을 13개 연속 이미지로 구성해 노트북 화면에서 자동 스크롤로 확인할 수 있게 연결했습니다.',
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
    liveUrl: 'https://cos-portfolio-gmuknjdrw-kjy7.vercel.app/',
    theme: 'cos',
    projectType: 'COS Korea 공식 사이트 기반 개인 랜딩페이지 리디자인',
    concept: 'SCANDINAVIAN MINIMALISM × TIMELESS DESIGN',
    summary: 'COS 특유의 절제된 미학과 타임리스 디자인을 중심으로 브랜드 랜딩페이지를 재구성했습니다. 여백과 타이포그래피, 뉴트럴 컬러의 이미지 구성을 활용해 컬렉션과 소재의 디테일이 자연스럽게 드러나도록 디자인했습니다.',
    role: 'Figma 화면 설계와 React 기반 랜딩페이지 구현을 진행했습니다.',
    learning: 'CAMPAIGN / SS26에서 NEW ARRIVALS와 DISCOVER COS로 이어지는 콘텐츠 흐름을 구성했습니다.',
    contentTags: ['CAMPAIGN / SS26', 'QUIET ELEGANCE', 'TIMELESS DESIGN', 'NEW ARRIVALS', 'DISCOVER COS'],
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
      if (visible) start()
      else stop()
    }, { threshold: 0.05 })
    let preloadStarted = false
    const resizeObserver = new ResizeObserver(measure)
    observer.observe(section)
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
      <div className="personal-project__laptop">
        <div className="personal-project__screen" ref={viewportRef}>
          <div className="personal-project__page" ref={pageRef} role="img" aria-label={project.designAlt}>
            {project.designSlices.map((slice) => <img key={slice.src} src={slice.src} width={slice.width} height={slice.height} alt="" loading="lazy" decoding="async" />)}
          </div>
        </div>
        <img className="personal-project__laptop-frame" src="/images/mockups/laptop-mockup-alpha.png" alt="" aria-hidden="true" />
      </div>
    </div>
    <p className="personal-project__visual-caption">FIGMA FULL-PAGE PREVIEW · AUTO SCROLL</p>
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

        const refresh = () => {
          syncPanels()
          ScrollTrigger.refresh()
        }
        const observer = new ResizeObserver(refresh)
        observer.observe(viewport)
        observer.observe(track)
        const images = [...track.querySelectorAll('img')]
        images.forEach((image) => image.addEventListener('load', refresh, { once: true }))
        document.fonts?.ready.then(refresh)
        requestAnimationFrame(refresh)

        return () => {
          observer.disconnect()
          images.forEach((image) => image.removeEventListener('load', refresh))
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
        {projects.map(([projectId, project], index) => <article className={`personal-project personal-project--${project.theme}`} id={projectId} key={projectId} aria-labelledby={`${projectId}-title`}>
          <div className="personal-project__inner">
            <header className="personal-work__topline">
              <p className="personal-work__eyebrow">PERSONAL WORK <span>{String(index + 1).padStart(2, '0')} / 02</span></p>
              <p className="personal-work__descriptor">브랜드의 고유한 분위기를 해석해 랜딩페이지로 풀어낸 개인 리디자인 프로젝트입니다.</p>
            </header>
            <div className="personal-project__layout">
              <header className="personal-project__heading">
                <p className="personal-project__meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.projectType}</span></p>
                <h2 id={`${projectId}-title`}>{project.name}</h2>
                <p className="personal-project__concept">{project.concept}</p>
                <p className="personal-project__summary">{project.summary}</p>
                {project.contentTags && <ul className="personal-project__tags" aria-label="COS Korea 콘텐츠 기준">{project.contentTags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
              </header>
              <DesignLaptop project={project} />
              <footer className="personal-project__footer">
                <p><span>MY WORK</span>{project.role}</p>
                <p><span>DESIGN NOTE</span>{project.learning}</p>
                <a className="personal-project__live-link" href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label={`${project.name} 실제 사이트를 새 창에서 열기`}>
                  <span>VIEW LIVE SITE</span><span aria-hidden="true">↗</span>
                </a>
              </footer>
            </div>
          </div>
        </article>)}
      </div>
    </div>
  </section>
}
