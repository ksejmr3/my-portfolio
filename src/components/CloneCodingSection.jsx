import { useEffect, useRef, useState } from 'react'
import { cloneCodingProjects } from '../data/cloneCodingProjects.js'
import '../styles/clone-coding.css'

function CloneThumbnail({ project }) {
  return (
    <div
      className={`clone-coding__thumbnail clone-coding__thumbnail--${project.visual}`}
      role="img"
      aria-label={`${project.name} 임시 CSS 콘셉트 썸네일`}
    >
      <div className="clone-coding__mock-page" aria-hidden="true">
        <div className="clone-coding__mock-topline">
          <span>{project.name}</span>
          <span>{project.visualLabel}</span>
        </div>
        <strong>{project.visualTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</strong>
        <div className="clone-coding__mock-footer"><span>LAYOUT / TYPE / GRID</span><i /></div>
      </div>
    </div>
  )
}

export default function CloneCodingSection() {
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
      className={`clone-coding${isVisible ? ' is-visible' : ''}`}
      id="clone-coding"
      aria-labelledby="clone-coding-title"
      ref={sectionRef}
    >
      <div className="clone-coding__inner">
        <header className="clone-coding__header">
          <div className="clone-coding__title-block">
            <p className="clone-coding__eyebrow"><span>CODING PRACTICE</span><span>01 — 03</span></p>
            <h2 id="clone-coding-title">CLONE<br />CODING</h2>
          </div>
          <div className="clone-coding__intro">
            <span className="clone-coding__index">LAYOUT / INTERACTION / FRONT-END</span>
            <p>웹사이트의 레이아웃과 인터랙션을 분석하고 직접 구현하는 프런트엔드 연습 작업을 소개합니다.</p>
          </div>
        </header>

        <div className="clone-coding__projects">
          {cloneCodingProjects.map((project, index) => (
            <article className="clone-coding__project" key={project.id} style={{ '--clone-index': index }}>
              <CloneThumbnail project={project} />
              <div className="clone-coding__project-meta">
                <div className="clone-coding__project-heading">
                  <h3>{project.name}</h3>
                  <span>{project.label}</span>
                </div>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="clone-coding__disclaimer">TEMPORARY VISUAL STUDIES · 실제 프로젝트 화면이 아닌 CSS 구성 예시입니다.</p>
      </div>
    </section>
  )
}
