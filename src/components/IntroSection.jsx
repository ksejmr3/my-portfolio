import { useEffect, useState } from 'react'

const workNavigation = [
  { id: 'hyundai-case-study', label: 'HYUNDAI MOTORSTUDIO', meta: 'TEAM PROJECT', href: '#hyundai-case-study' },
  { id: 'vivienne-westwood', label: 'VIVIENNE WESTWOOD', meta: 'PERSONAL WORK', href: '#vivienne-westwood' },
  { id: 'cos', label: 'COS', meta: 'PERSONAL WORK', href: '#cos' },
  { id: 'clone-coding', label: 'CLONE CODING', meta: 'CODING PRACTICE', href: '#clone-coding' },
]

const introPreviews = [
  { src: '/images/hyundai/intro-home-hero.png', alt: 'Hyundai Motorstudio Figma home hero preview', label: 'HYUNDAI MOTORSTUDIO' },
  { src: '/images/personal-projects/vivienne-westwood-latest/02-hero.png', alt: 'Vivienne Westwood Figma hero preview', label: 'VIVIENNE WESTWOOD' },
  { src: '/images/personal-projects/cos-sections/01-hero.webp', alt: 'COS Figma hero preview', label: 'COS' },
]

export default function IntroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWorkOpen, setIsWorkOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('intro')
  const [previewIndex, setPreviewIndex] = useState(0)

  useEffect(() => {
    const sectionIds = ['intro', 'work', 'ai-video-contents', 'skill', 'about', 'contact', ...workNavigation.map(({ id }) => id)]
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current?.target.id) setActiveSection(current.target.id)
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0.01, 0.2, 0.5] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => setPreviewIndex((index) => (index + 1) % introPreviews.length), 2500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsWorkOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeNavigation = () => {
    setIsMenuOpen(false)
    setIsWorkOpen(false)
  }

  return (
    <section className="intro" id="intro" aria-labelledby="intro-title">
      <div className="intro__stage">
        <header className={`site-header${isMenuOpen ? ' is-menu-open' : ''}`}>
          <a className="site-header__brand" href="#intro" aria-label="포트폴리오 처음으로" onClick={closeNavigation}>KIM JIYOUNG</a>
          <button className="site-header__menu-toggle" type="button" aria-expanded={isMenuOpen} aria-controls="site-navigation" onClick={() => setIsMenuOpen((current) => !current)}>
            <span>{isMenuOpen ? 'CLOSE' : 'MENU'}</span><i aria-hidden="true" />
          </button>
          <nav className="site-header__nav" id="site-navigation" aria-label="주요 메뉴">
            <a href="#intro" aria-current={activeSection === 'intro' ? 'page' : undefined} onClick={closeNavigation}>INTRO</a>
            <div className={`site-header__work${isWorkOpen ? ' is-open' : ''}`}>
              <a className="site-header__work-link" href="#work" aria-current={activeSection === 'work' ? 'page' : undefined} onClick={closeNavigation}>WORK</a>
              <button className="site-header__work-toggle" type="button" aria-label={isWorkOpen ? 'WORK 하위 메뉴 닫기' : 'WORK 하위 메뉴 열기'} aria-expanded={isWorkOpen} aria-controls="work-navigation" onClick={() => setIsWorkOpen((current) => !current)}><span>PROJECTS</span></button>
              <div className="site-header__work-menu" id="work-navigation">
                {workNavigation.map((item) => (
                  <a key={item.id} href={item.href} aria-current={activeSection === item.id ? 'page' : undefined} onClick={closeNavigation}>
                    <strong>{item.label}</strong><small>{item.meta}</small>
                  </a>
                ))}
              </div>
            </div>
            <a href="#ai-video-contents" aria-current={activeSection === 'ai-video-contents' ? 'page' : undefined} onClick={closeNavigation}>AI VIDEO</a>
            <a href="#skill" aria-current={activeSection === 'skill' ? 'page' : undefined} onClick={closeNavigation}>SKILL</a>
            <a href="#about" aria-current={activeSection === 'about' ? 'page' : undefined} onClick={closeNavigation}>ABOUT</a>
            <a href="#contact" aria-current={activeSection === 'contact' ? 'page' : undefined} onClick={closeNavigation}>CONTACT</a>
          </nav>
          <span className="site-header__edition">PORTFOLIO / 2026</span>
        </header>
        <div className="intro__canvas">
          <p className="intro__eyebrow intro__eyebrow--transition">KIM JIYOUNG · DESIGN PORTFOLIO</p>
          <h1 id="intro-title" className="intro__title"><span className="intro__title-line intro__title-line--primary">DESIGNING</span><span className="intro__title-line intro__title-line--secondary"><em>connected</em> EXPERIENCES.</span></h1>
          <p className="intro__summary intro__summary--transition">정보의 우선순위를 정리하고, 설계 의도를 작동하는 화면으로 연결합니다.</p>
        </div>
        <div className="intro__bottom intro__bottom--transition">
          <div className="intro__index intro__index--transition"><span>01 / 03</span><span>SELECTED PROJECTS</span></div>
          <figure className="intro__preview intro__preview--transition"><img key={introPreviews[previewIndex].src} src={introPreviews[previewIndex].src} alt={introPreviews[previewIndex].alt} /><figcaption>WORK PREVIEW / {String(previewIndex + 1).padStart(2, '0')}—03 · {introPreviews[previewIndex].label}</figcaption></figure>
        </div>
        <div className="intro__transition-plane" aria-hidden="true" />
      </div>
    </section>
  )
}
