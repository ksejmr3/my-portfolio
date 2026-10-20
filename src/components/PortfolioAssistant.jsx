import { useEffect, useRef, useState } from 'react'
import { portfolioQuestions } from '../data/portfolioAssistant.js'
import '../styles/portfolio-assistant.css'

const welcomeMessage = {
  id: 'welcome',
  type: 'assistant',
  content: '안녕하세요. 추천 질문을 선택하면 포트폴리오의 확인 가능한 정보를 안내해 드립니다.',
}

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
  const [messages, setMessages] = useState([welcomeMessage])
  const launcherRef = useRef(null)
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const historyRef = useRef(null)
  const wasOpenRef = useRef(false)

  const closePanel = () => setIsOpen(false)

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

  return (
    <div className={`portfolio-assistant${isContactVisible ? ' portfolio-assistant--contact' : ''}${isOpen ? ' is-open' : ''}`}>
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

          <div className="portfolio-assistant__history" ref={historyRef} aria-live="polite" aria-label="질문과 답변 기록">
            {messages.map((message) => (
              <article className={`portfolio-assistant__message portfolio-assistant__message--${message.type}`} key={message.id}>
                <p>{message.content}</p>
                <MessageLinks links={message.links ?? []} onNavigate={navigateToSection} />
              </article>
            ))}
          </div>

          <div className="portfolio-assistant__suggestions" aria-label="추천 질문">
            <p>RECOMMENDED QUESTIONS</p>
            <div>
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
