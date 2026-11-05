import { useEffect, useRef, useState } from 'react'
import '../styles/contact-section.css'

const contactLinks = {
  email: { href: 'mailto:ksejmr3@gmail.com', value: 'ksejmr3@gmail.com' },
  phone: { href: 'tel:01041783893', value: '010-4178-3893' },
  github: { href: 'https://github.com/ksejmr3', value: 'GitHub' },
  resume: { value: '이력서' },
}

const exploreLinks = [
  { label: 'INTRO', href: '#intro' },
  { label: 'WORK', href: '#work' },
  { label: 'SKILL', href: '#skill' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
]

function ContactIcon({ name }) {
  if (name === 'email') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
  }
  if (name === 'phone') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" /></svg>
  }
  if (name === 'github') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.2 3.2 1.5.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v2.7c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>
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

  useEffect(() => {
    const handleIntroNavigation = (event) => {
      const target = event.target
      const link = target instanceof Element
        ? target.closest('.contact-section__explore a[href="#intro"], .contact-section__top[href="#intro"]')
        : null
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      // #intro sits inside a long pinned GSAP sequence; scrolling to that child
      // through Lenis can resolve to the pin's end. The sequence begins at 0.
      event.preventDefault()
      event.stopImmediatePropagation()
      window.history.pushState(null, '', '#intro')
      window.scrollTo(0, 0)
    }

    window.addEventListener('click', handleIntroNavigation, true)
    return () => window.removeEventListener('click', handleIntroNavigation, true)
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
          <h2 id="contact-title">LET&apos;S CONNECT.</h2>
          <p className="contact-section__message">작업에 대한 이야기부터 새로운 협업의 기회까지, 편하게 연락해 주세요.</p>
        </header>

        <div className="contact-section__links">
          <nav className="contact-section__explore" aria-label="Explore sections">
            <h3 className="contact-section__column-title">EXPLORE</h3>
            <ul>
              {exploreLinks.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="contact-section__details" aria-label="연락처 정보">
            <h3 className="contact-section__column-title">CONTACT</h3>
            <ul>
              <li>
                <a href={contactLinks.email.href}>
                  <ContactIcon name="email" /><span>{contactLinks.email.value}<ExternalArrow /></span>
                </a>
              </li>
              <li>
                <a href={contactLinks.phone.href}>
                  <ContactIcon name="phone" /><span>{contactLinks.phone.value}</span>
                </a>
              </li>
              <li>
                <a href={contactLinks.github.href} target="_blank" rel="noopener noreferrer">
                  <ContactIcon name="github" /><span>{contactLinks.github.value}<ExternalArrow /></span>
                </a>
              </li>
              <li>
                <span className="contact-section__resume" aria-disabled="true">
                  <ContactIcon name="resume" /><span>{contactLinks.resume.value}<ExternalArrow /></span>
                </span>
              </li>
            </ul>
          </div>
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
