import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { portfolioQuestions } from '../data/portfolioAssistant.js'
import '../styles/portfolio-assistant.css'

const welcomeMessage = {
  id: 'welcome',
  type: 'assistant',
  content: '안녕하세요. 추천 질문을 선택하면 포트폴리오의 확인 가능한 정보를 안내해 드립니다.',
}

const hintMessages = [
  '어떤 프로젝트를 진행했는지 궁금하신가요?',
  '프로젝트에서 맡은 역할이 궁금하신가요?',
  '사용한 기술이 궁금하신가요?',
]

function MessageLinks({ links, onNavigate }) {
  if (!links.length) return null

  return (
    <div className="portfolio-assistant__message-links">
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={onNavigate}>{link.label} <span aria-hidden="true">↓</span></a>
      ))}
    </div>
  )
}

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactVisible, setIsContactVisible] = useState(false)
  const [isMobileOccluded, setIsMobileOccluded] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [hintIndex, setHintIndex] = useState(0)
  const [isHintVisible, setIsHintVisible] = useState(false)
  const [isHintSafe, setIsHintSafe] = useState(false)
  const [isHintDismissed, setIsHintDismissed] = useState(() => sessionStorage.getItem('portfolio-assistant-hint-dismissed') === 'true')
  const launcherRef = useRef(null)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const historyRef = useRef(null)
  const wasOpenRef = useRef(false)
  const hintSafeRef = useRef(false)
  const hintCycleRef = useRef({ skipped: true, position: null })

  const closePanel = () => setIsOpen(false)

  useLayoutEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)')
    const main = document.querySelector('main')
    const launcher = launcherRef.current
    const assistant = launcher?.parentElement
    if (!main || !assistant) return undefined
    const hint = assistant.querySelector('.portfolio-assistant__hint')
    const imageGroups = '.intro__preview,.hyundai-project-preview,.case-selected-works__mockup,.case-selected-works__device-stage,.personal-project__stage,.case-process__media,.case-contribution__media,.about-section__carousel'
    const atomic = `a,button,video,img,canvas,input,select,textarea,${imageGroups}`
    const selector = `h1,h2,h3,h4,p,li,span,small,figcaption,${atomic}`
    let frame = 0
    let revealTimer = 0
    let clearSince = 0
    let disposed = false
    let dirty = true
    let targets = []
    let hasVisibleTargets = false
    let previousScroll = window.scrollY
    const visibleTargets = new Set()
    const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    const setSafe = (safe) => {
      if (hintSafeRef.current !== safe) {
        hintSafeRef.current = safe
        setIsHintSafe(safe)
      }
    }
    const viewportObserver = new IntersectionObserver((entries) => {
      hasVisibleTargets = true
      entries.forEach(({ target, isIntersecting }) => isIntersecting ? visibleTargets.add(target) : visibleTargets.delete(target))
      schedule()
    }, { rootMargin: '100% 0px' })
    const collect = () => {
      viewportObserver.disconnect()
      visibleTargets.clear()
      hasVisibleTargets = false
      targets = [...main.querySelectorAll(selector)].filter(element => !assistant.contains(element))
      targets.forEach(element => viewportObserver.observe(element))
      dirty = false
    }
    const checkOverlap = () => {
      frame = 0
      if (dirty) collect()
      const visibility = new WeakMap()
      const isVisible = (element) => {
        if (!element || element === main) return true
        if (visibility.has(element)) return visibility.get(element)
        const style = getComputedStyle(element)
        const result = style.display !== 'none' && style.visibility === 'visible' && style.opacity !== '0'
          && !element.matches('[inert], [aria-hidden="true"]') && isVisible(element.parentElement)
        visibility.set(element, result)
        return result
      }
      // Cache selectors; only nearby observed content is measured during normal scrolling.
      const nearby = !hasVisibleTargets || Math.abs(window.scrollY - previousScroll) > window.innerHeight ? targets : visibleTargets
      previousScroll = window.scrollY
      const blocks = (areas, protectImages) => {
        for (const element of nearby) {
          if (!element.isConnected || !protectImages && element.matches(`img,canvas,${imageGroups}`)) continue
          const rect = element.getBoundingClientRect()
          if (!rect.width || !rect.height || !areas.some(area => intersects(area, rect)) || !isVisible(element)) continue
          if (element.matches(atomic)) return true
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
          const range = document.createRange()
          let node
          while ((node = walker.nextNode())) {
            if (!node.textContent.trim() || !isVisible(node.parentElement)) continue
            range.selectNodeContents(node)
            if ([...range.getClientRects()].some(line => areas.some(area => intersects(area, line)))) return true
          }
        }
        return false
      }
      const cycle = hintCycleRef.current
      if (!isOpen && isHintVisible && hint && !cycle.skipped) {
        const root = assistant.getBoundingClientRect()
        const size = hint.getBoundingClientRect()
        // Reserve the tail, entrance movement and the full shared float range.
        const floatRoom = mobile.matches ? 4 : 12
        const rectangle = ([right, bottom]) => ({ left: root.right - right - size.width - 6, right: root.right - right + 6, top: root.bottom - bottom - size.height - floatRoom - 6, bottom: root.bottom - bottom + floatRoom + 20 })
        const safe = (position) => {
          const rect = rectangle(position)
          return rect.left >= 8 && rect.right <= document.documentElement.clientWidth - 8 && rect.top >= 8 && rect.bottom <= window.innerHeight - 8 && !blocks([rect], true)
        }
        if (!cycle.position) {
          const positions = mobile.matches ? [[8, 59], [16, 59], [0, 59], [12, 59]] : [[26, 91], [18, 91], [-8, 91], [34, 91]]
          cycle.position = positions.find(safe)
          if (cycle.position) {
            assistant.style.setProperty('--assistant-hint-right', `${cycle.position[0]}px`)
            assistant.style.setProperty('--assistant-hint-bottom', `${cycle.position[1]}px`)
            assistant.style.setProperty('--assistant-hint-tail-right', `${root.width / 2 - cycle.position[0] - (mobile.matches ? 5 : 6)}px`)
          } else cycle.skipped = true
        } else if (!safe(cycle.position)) cycle.skipped = true
        // Once a cycle becomes unsafe it stays skipped; never reappear mid-cycle.
        setSafe(!cycle.skipped)
      } else setSafe(false)
      if (!mobile.matches || isOpen) {
        window.clearTimeout(revealTimer)
        revealTimer = 0
        clearSince = 0
        setIsMobileOccluded(false)
        return
      }
      const rect = launcher.getBoundingClientRect()
      const blocked = blocks([{ left: rect.left - 6, right: rect.right + 6, top: rect.top - 6, bottom: rect.bottom + 6 }], false)
      if (blocked) {
        if (isHintVisible) { cycle.skipped = true; setSafe(false) }
        window.clearTimeout(revealTimer)
        revealTimer = 0
        clearSince = 0
        setIsMobileOccluded(true)
      } else {
        if (!clearSince) clearSince = performance.now()
        const remaining = 220 - (performance.now() - clearSince)
        if (remaining <= 0) {
          window.clearTimeout(revealTimer)
          revealTimer = 0
          setIsMobileOccluded(false)
        } else if (!revealTimer) {
          revealTimer = window.setTimeout(() => { revealTimer = 0; schedule() }, remaining)
        }
      }
    }
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(checkOverlap)
    }
    const changes = new MutationObserver(records => {
      if (records.some(record => !assistant.contains(record.target) && !record.target.closest?.('.intro__preview'))) {
        dirty = true
        schedule()
      }
    })
    changes.observe(main, { childList: true, subtree: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('transitionend', schedule)
    mobile.addEventListener('change', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(main)
    document.fonts?.ready.then(schedule)
    checkOverlap()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.clearTimeout(revealTimer)
      viewportObserver.disconnect()
      changes.disconnect()
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('transitionend', schedule)
      mobile.removeEventListener('change', schedule)
    }
  }, [isOpen, isHintVisible, hintIndex, isContactVisible, isHintDismissed])


  useEffect(() => {
    if (!isOpen) return undefined

    closeButtonRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true
      return
    }
    if (wasOpenRef.current) {
      launcherRef.current?.focus()
      wasOpenRef.current = false
    }
  }, [isOpen])

  useEffect(() => {
    const history = historyRef.current
    if (history) history.scrollTop = history.scrollHeight
  }, [messages, isOpen])

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setIsContactVisible(entry.isIntersecting)
    }, { threshold: 0.12 })
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen || isHintDismissed) {
      setIsHintVisible(false)
      return undefined
    }
    let hideTimer
    let interval
    const showHint = () => {
      hintCycleRef.current = { skipped: false, position: null }
      hintSafeRef.current = false
      setIsHintSafe(false)
      setIsHintVisible(true)
      hideTimer = window.setTimeout(() => setIsHintVisible(false), 3000)
      setHintIndex((current) => (current + 1) % hintMessages.length)
    }
    const firstTimer = window.setTimeout(() => {
      showHint()
      interval = window.setInterval(showHint, 20000)
    }, 5000)
    return () => {
      window.clearTimeout(firstTimer)
      window.clearTimeout(hideTimer)
      if (interval) window.clearInterval(interval)
    }
  }, [isOpen, isHintDismissed])

  const dismissHint = (event) => {
    event.stopPropagation()
    sessionStorage.setItem('portfolio-assistant-hint-dismissed', 'true')
    setIsHintDismissed(true)
    setIsHintVisible(false)
  }

  useEffect(() => {
    const openFromNavigation = () => setIsOpen(true)
    window.addEventListener('portfolio-assistant:open', openFromNavigation)
    return () => window.removeEventListener('portfolio-assistant:open', openFromNavigation)
  }, [])

  const selectQuestion = (question) => {
    setMessages((current) => [
      ...current,
      { id: `${question.id}-question-${current.length}`, type: 'user', content: question.prompt },
      { id: `${question.id}-answer-${current.length}`, type: 'assistant', content: question.answer, links: question.links },
    ])
  }

  const navigateToSection = () => closePanel()

  const canShowHint = isHintVisible && isHintSafe && !isOpen && !isHintDismissed

  return (
    <div data-hint-state={canShowHint ? 'visible' : (isHintVisible ? 'skipped' : 'idle')} className={`portfolio-assistant${isContactVisible ? ' portfolio-assistant--contact' : ''}${isOpen ? ' is-open' : ''}${isMobileOccluded && !isOpen ? ' is-mobile-occluded' : ''}`}>
      <div className="portfolio-assistant__hint-anchor">
        <div className={`portfolio-assistant__hint${canShowHint ? ' is-visible' : ''}`} aria-hidden={!canShowHint}>
          <button className="portfolio-assistant__hint-message" type="button" tabIndex={canShowHint ? 0 : -1} onClick={() => setIsOpen(true)}>{hintMessages[(hintIndex + hintMessages.length - 1) % hintMessages.length]}</button>
          <button className="portfolio-assistant__hint-close" type="button" tabIndex={canShowHint ? 0 : -1} aria-label="안내 말풍선 닫기" onClick={dismissHint}>×</button>
        </div>
      </div>
      <button
        ref={launcherRef}
        className="portfolio-assistant__launcher"
        type="button"
        aria-label="포트폴리오 챗봇 열기"
        aria-expanded={isOpen}
        aria-controls="portfolio-assistant-panel"
        onClick={() => setIsOpen(true)}
      >
        <span className="portfolio-assistant__mascot-float" aria-hidden="true">
          <img className="portfolio-assistant__mascot" src="/images/chatbot-mascot.png" alt="" />
        </span>
      </button>

      {isOpen && (
        <section
          className="portfolio-assistant__panel"
          id="portfolio-assistant-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="portfolio-assistant-title"
        >
          <header className="portfolio-assistant__header">
            <div>
              <p>PORTFOLIO GUIDE</p>
              <h2 id="portfolio-assistant-title">PORTFOLIO ASSISTANT</h2>
            </div>
            <button ref={closeButtonRef} type="button" aria-label="포트폴리오 도우미 닫기" onClick={closePanel}>×</button>
          </header>

          <p className="portfolio-assistant__intro">포트폴리오에 대해 궁금한 내용을 확인해 보세요.</p>

          <div className="portfolio-assistant__history" ref={historyRef} data-lenis-prevent aria-live="polite" aria-label="질문과 답변 기록">
            {messages.map((message) => (
              <article className={`portfolio-assistant__message portfolio-assistant__message--${message.type}`} key={message.id}>
                <p>{message.content}</p>
                <MessageLinks links={message.links ?? []} onNavigate={navigateToSection} />
              </article>
            ))}
          </div>

          <div className="portfolio-assistant__suggestions" aria-label="추천 질문">
            <p>RECOMMENDED QUESTIONS</p>
            <div data-lenis-prevent>
              {portfolioQuestions.map((question) => (
                <button type="button" key={question.id} onClick={() => selectQuestion(question)}>{question.prompt}</button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
