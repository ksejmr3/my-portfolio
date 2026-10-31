import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutPhotos } from '../data/aboutPhotos'
import '../styles/about-section.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const aboutItems = [
  {
    keyword: 'ABOUT ME',
    question: '저는 어떤 사람인가요?',
    answer: [
      '주변의 분위기와 작은 변화를 잘 알아차리는 편입니다.',
      '새로운 일을 시작할 때는 충분히 이해하고, 차근차근 방향을 잡아갑니다.',
    ],
  },
  {
    keyword: 'MY VALUES',
    question: '무엇을 중요하게 생각하나요?',
    answer: [
      '결과만큼 그 결과를 만들어가는 과정도 중요하게 생각합니다.',
      '맡은 일에 책임감을 갖고, 끝까지 완성도를 높이려 노력합니다.',
    ],
  },
  {
    keyword: 'COMMUNICATION',
    question: '사람들과 어떻게 소통하나요?',
    answer: [
      '상대방의 이야기를 먼저 듣고 서로의 생각을 이해하려고 합니다.',
      '다양한 의견을 존중하며, 함께 더 나은 방향을 찾아갑니다.',
    ],
  },
  {
    keyword: 'CURIOSITY',
    question: '어떤 것에 관심이 있나요?',
    answer: [
      '디자인과 영상, 전시처럼 시각적인 경험을 좋아합니다.',
      '일상과 여행에서 발견한 새로운 장면들은 작업을 바라보는 시야를 넓혀줍니다.',
    ],
  },
  {
    keyword: 'NEXT STEP',
    question: '앞으로 어떤 사람으로 성장하고 싶나요?',
    answer: [
      '사용자의 입장에서 생각하고, 디자인 의도를 실제 화면으로 구현할 수 있는 사람이 되고 싶습니다.',
      '경험을 쌓으며 꾸준히 성장하겠습니다.',
    ],
  },
]

const DESKTOP = '(min-width: 1101px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)'
const RESTORE_KEY = 'about-accordion-progress'
const pad = value => String(value).padStart(2, '0')

function scrollImmediately(top) {
  const request = new CustomEvent('portfolio:scroll-immediate', { detail: { top }, cancelable: true })
  if (window.dispatchEvent(request)) window.scrollTo({ top, behavior: 'instant' })
  ScrollTrigger.update()
}

function PhotoCarousel({ group, active }) {
  const frameRef = useRef(null)
  const trackRef = useRef(null)
  const sequenceWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const interactionRef = useRef({ pointerId: null, axis: null, dragged: false, startX: 0, startY: 0, startOffset: 0, pauseUntil: 0 })
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const track = trackRef.current
    const sequence = track.firstElementChild
    const measure = () => {
      sequenceWidthRef.current = sequence.getBoundingClientRect().width
      if (sequenceWidthRef.current) {
        offsetRef.current %= sequenceWidthRef.current
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
    }
    const resize = new ResizeObserver(measure)
    resize.observe(sequence)
    measure()
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(frame)
    return () => { resize.disconnect(); observer.disconnect() }
  }, [])

  useEffect(() => {
    if (!active || loaded) return undefined
    let cancelled = false
    Promise.all([...trackRef.current.querySelectorAll('img')].map(image => image.decode().catch(() => {})))
      .then(() => { if (!cancelled) setLoaded(true) })
    return () => { cancelled = true }
  }, [active, loaded])

  useEffect(() => {
    if (!active) {
      const interaction = interactionRef.current
      interaction.pointerId = null
      interaction.axis = null
      interaction.dragged = false
      interaction.pauseUntil = 0
    }
  }, [active])

  useEffect(() => {
    if (!active || !visible || !loaded || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const track = trackRef.current
    let frame = 0
    let previous = performance.now()
    const tick = now => {
      const interaction = interactionRef.current
      const sequenceWidth = sequenceWidthRef.current
      if (sequenceWidth && interaction.pointerId === null && now >= interaction.pauseUntil) {
        // Keep the original 36-second-per-sequence pace, while preserving the dragged offset.
        offsetRef.current = (offsetRef.current + sequenceWidth * ((now - previous) / 36000)) % sequenceWidth
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      }
      previous = now
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, visible, loaded])

  const handlePointerDown = event => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || event.button !== undefined && event.button !== 0) return
    const interaction = interactionRef.current
    interaction.pointerId = event.pointerId
    interaction.axis = null
    interaction.dragged = false
    interaction.startX = event.clientX
    interaction.startY = event.clientY
    interaction.startOffset = offsetRef.current
  }

  const handlePointerMove = event => {
    const interaction = interactionRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || interaction.pointerId !== event.pointerId) return
    const moveX = event.clientX - interaction.startX
    const moveY = event.clientY - interaction.startY
    if (!interaction.axis && Math.hypot(moveX, moveY) > 6) {
      interaction.axis = Math.abs(moveX) > Math.abs(moveY) ? 'horizontal' : 'vertical'
      if (interaction.axis === 'horizontal') event.currentTarget.setPointerCapture?.(event.pointerId)
    }
    if (interaction.axis !== 'horizontal') return
    event.preventDefault()
    const sequenceWidth = sequenceWidthRef.current
    if (!sequenceWidth) return
    interaction.dragged = true
    offsetRef.current = ((interaction.startOffset - moveX) % sequenceWidth + sequenceWidth) % sequenceWidth
    trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
  }

  const finishPointer = event => {
    const interaction = interactionRef.current
    if (interaction.pointerId !== event.pointerId) return
    if (interaction.axis === 'horizontal') event.currentTarget.releasePointerCapture?.(event.pointerId)
    if (interaction.dragged) interaction.pauseUntil = performance.now() + 3000
    interaction.pointerId = null
    interaction.axis = null
    interaction.dragged = false
  }

  return (
    <div className="about-section__carousel" ref={frameRef} tabIndex={active ? 0 : -1}
      role="region" aria-label={group.label + ' 사진 모음'}
      data-running={active && visible && loaded}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={finishPointer}>
      <div className="about-section__photo-track" ref={trackRef}>
        {[0, 1].map(copy => (
          <div className="about-section__photo-sequence" key={copy} aria-hidden={copy === 1}>
            {group.photos.map((photo, index) => (
              <img key={photo.src} src={photo.src}
                width={photo.width} height={photo.height}
                alt={copy === 0 ? group.label + ' — 사진 ' + (index + 1) : ''}
                loading={active ? 'eager' : 'lazy'} decoding="async" draggable="false" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
export default function AboutSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const triggerRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const list = section.querySelector('.about-section__list')
    // A stable inner width keeps text and photographs from reflowing during expansion.
    const measure = () => {
      const rail = parseFloat(getComputedStyle(list).getPropertyValue('--rail')) || 64
      const width = list.clientWidth - rail * 4
      list.style.setProperty('--open-width', width + 'px')
      list.querySelectorAll('.about-section__item').forEach(item => {
        item.dataset.ready = String(item.clientWidth >= width - 2)
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    list.querySelectorAll('.about-section__item').forEach(item => observer.observe(item))
    measure()

    const media = gsap.matchMedia()
    media.add(DESKTOP, () => {
      let disposed = false
      let frame = 0
      let restore = null
      if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
        try {
          const saved = JSON.parse(sessionStorage.getItem(RESTORE_KEY) || 'null')
          if (saved?.path === location.pathname + location.search && Date.now() - saved.time < 30000
            && Number.isFinite(saved.progress)) restore = Math.max(0, Math.min(1, saved.progress))
        } catch { /* Storage is optional; native scrolling still works. */ }
      }
      const trigger = ScrollTrigger.create({
        id: 'about-accordion',
        trigger: stageRef.current,
        start: 'top 64px',
        end: () => '+=' + Math.max(window.innerHeight * 4, 2800),
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => setOpenIndex(Math.min(4, Math.floor(self.progress * 5))),
      })
      triggerRef.current = trigger
      setOpenIndex(Math.min(4, Math.floor(trigger.progress * 5)))
      const restorePosition = () => {
        if (restore === null) return
        const progress = restore
        restore = null
        scrollImmediately(trigger.start + (trigger.end - trigger.start) * progress)
        try { sessionStorage.removeItem(RESTORE_KEY) } catch { /* Optional storage. */ }
      }
      const save = () => {
        try {
          if (trigger.isActive) sessionStorage.setItem(RESTORE_KEY, JSON.stringify({
            progress: trigger.progress, path: location.pathname + location.search, time: Date.now(),
          }))
          else sessionStorage.removeItem(RESTORE_KEY)
        } catch { /* Optional storage. */ }
      }
      ScrollTrigger.addEventListener('refresh', restorePosition)
      window.addEventListener('pagehide', save)
      document.fonts.ready.then(() => {
        if (disposed) return
        frame = requestAnimationFrame(() => { ScrollTrigger.refresh(); restorePosition() })
      })
      return () => {
        disposed = true
        cancelAnimationFrame(frame)
        window.removeEventListener('pagehide', save)
        ScrollTrigger.removeEventListener('refresh', restorePosition)
        triggerRef.current = null
        trigger.kill()
      }
    })
    return () => { observer.disconnect(); media.revert() }
  }, [])

  const select = index => {
    const trigger = triggerRef.current
    if (trigger) {
      setOpenIndex(index)
      // Move the document to the chosen card's reading interval, so the next
      // wheel input continues from that card instead of undoing the selection.
      scrollImmediately(trigger.start + (trigger.end - trigger.start) * ((index + .5) / 5))
    } else setOpenIndex(current => current === index ? -1 : index)
  }

  return (
    <section className="about-section" id="about" aria-labelledby="about-title" ref={sectionRef}>
      <div className="about-section__inner">
        <header className="about-section__intro">
          <p className="about-section__eyebrow">WORKING NOTES / 2026</p>
          <h2 id="about-title">ABOUT</h2>
          <p className="about-section__summary">자세히 보고, 생각을 정리하고, 필요한 말을 분명히 전하려고 합니다.</p>
          <p className="about-section__signature">OBSERVE · THINK · COMMUNICATE · GROW</p>
        </header>
        <div className="about-section__stage" ref={stageRef}>
          <p className="about-section__position" aria-label="현재 카드">{pad(Math.max(0, openIndex) + 1)} / 05</p>
          <ol className="about-section__list">
            {aboutItems.map((item, index) => (
              <li className={'about-section__item' + (openIndex === index ? ' is-open' : '')} key={item.keyword}>
                <button className="about-section__trigger" id={'about-trigger-' + index}
                  type="button" aria-expanded={openIndex === index}
                  aria-controls={'about-answer-' + index} aria-label={item.question}
                  onClick={() => select(index)}>
                  <span className="about-section__number">{pad(index + 1)}</span>
                  <span className="about-section__keyword">{item.keyword}</span>
                </button>
                <div className="about-section__answer" id={'about-answer-' + index}
                  role="region" aria-labelledby={'about-trigger-' + index}
                  aria-hidden={openIndex !== index} inert={openIndex !== index}>
                  <div className="about-section__content">
                    <h3 className="about-section__question">{item.question}</h3>
                    <PhotoCarousel group={aboutPhotos[index]} active={openIndex === index} />
                    <p className="about-section__copy">
                      {item.answer.map(sentence => <span className="about-section__sentence" key={sentence}>{sentence}</span>)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
