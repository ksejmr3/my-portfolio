import { useEffect, useRef, useState } from 'react'
import '../styles/contact-section.css'

const contactLinks = {
  email: { href: 'mailto:ksejmr3@gmail.com', value: 'ksejmr3@gmail.com' },
  githubProfile: { href: 'https://github.com/ksejmr3', value: 'github.com/ksejmr3' },
  repository: { href: 'https://github.com/ksejmr3/my-portfolio', value: 'my-portfolio repository' },
  resume: null,
}

function ExternalArrow() {
  return <span className="contact-section__arrow" aria-hidden="true">↗</span>
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`contact-section${isVisible ? ' is-visible' : ''}`}
      id="contact"
      aria-labelledby="contact-title"
      ref={sectionRef}
    >
      <div className="contact-section__inner">
        <header className="contact-section__header">
          <p className="contact-section__eyebrow">CONTACT / KIM JIYOUNG</p>
          <h2 id="contact-title">LET&apos;S CONNECT.</h2>
          <p className="contact-section__message">작업에 대한 이야기부터 새로운 협업의 기회까지, 편하게 연락해 주세요.</p>
        </header>

        <div className="contact-section__links" aria-label="연락 및 프로젝트 링크">
          {contactLinks.email && (
            <a className="contact-section__link" href={contactLinks.email.href}>
              <span className="contact-section__label">EMAIL</span>
              <span className="contact-section__value">{contactLinks.email.value}<ExternalArrow /></span>
            </a>
          )}
          {contactLinks.githubProfile && (
            <div className="contact-section__link contact-section__link--group">
              <span className="contact-section__label">GITHUB</span>
              <span className="contact-section__value-group">
                <a className="contact-section__value" href={contactLinks.githubProfile.href} target="_blank" rel="noopener noreferrer">
                  PROFILE <ExternalArrow />
                </a>
                {contactLinks.repository && (
                  <a className="contact-section__value" href={contactLinks.repository.href} target="_blank" rel="noopener noreferrer">
                    PROJECT REPOSITORY <ExternalArrow />
                  </a>
                )}
              </span>
            </div>
          )}
        </div>

        <footer className="contact-section__footer">
          <span>© {new Date().getFullYear()} KIM JIYOUNG</span>
          <a className="contact-section__top" href="#intro" aria-label="맨 위로 이동">
            <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 15 16 4l11 11M16 5v23" /></svg>
          </a>
        </footer>
      </div>
    </section>
  )
}
