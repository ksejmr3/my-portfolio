import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cloneCodingProjects } from '../data/cloneCodingProjects.js'
import '../styles/clone-coding.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

function ClonePreview({ project, onPending }) {
  const content = (
    <>
      <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
      <span className="clone-coding__preview-shade" />
      <span className="clone-coding__preview-index">{project.label}</span>
      {project.previewNote && <span className="clone-coding__preview-note">{project.previewNote}</span>}
      <span className="clone-coding__preview-status">{project.liveUrl ? 'VIEW WEBSITE' : 'DEPLOYMENT PENDING'} <i>↗</i></span>
    </>
  )

  return project.liveUrl ? (
    <a className={`clone-coding__preview clone-coding__preview--${project.visual}`} href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} 구현 사이트 새 탭에서 열기`}>
      {content}
    </a>
  ) : (
    <button className={`clone-coding__preview clone-coding__preview--${project.visual}`} type="button" onClick={() => onPending(project.name)} aria-label={`${project.name} 배포 상태 확인`}>
      {content}
    </button>
  )
}

export default function CloneCodingSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const noticeTimerRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const [notice, setNotice] = useState('')

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

  useEffect(() => () => window.clearTimeout(noticeTimerRef.current), [])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const projects = gsap.utils.toArray('.clone-coding__project', stage)
        const title = stage.querySelector('.clone-coding__scene-title')
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: 'clone-coding-scenes',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: .45,
            invalidateOnRefresh: true,
          },
        })

        gsap.set(projects, { autoAlpha: 0 })
        projects.forEach((project, index) => {
          const fromTop = index % 2 === 1
          const start = .08 + index * .215
          gsap.set(project, {
            yPercent: fromTop ? -112 : 112,
            xPercent: index % 2 ? 7 : -7,
            scale: .78,
            rotate: index % 2 ? 2.5 : -2.5,
          })
          timeline.to(project, {
            yPercent: 0,
            xPercent: 0,
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            ease: 'power2.out',
            duration: .13,
          }, start)
          timeline.to(project, {
            yPercent: fromTop ? 22 : -22,
            scale: 1.035,
            ease: 'none',
            duration: .095,
          }, start + .13)
          timeline.to(project, {
            yPercent: fromTop ? 118 : -118,
            xPercent: index % 2 ? -5 : 5,
            scale: .84,
            rotate: index % 2 ? -2 : 2,
            autoAlpha: 0,
            ease: 'power2.in',
            duration: .13,
          }, start + .225)
        })
        timeline.to(title, { scale: .94, autoAlpha: .55, ease: 'none', duration: .86 }, .07)
        timeline.to({}, { duration: .01 }, .99)
        return () => timeline.kill()
      })
      return () => media.revert()
    }, section)
    return () => context.revert()
  }, [])

  const showPendingNotice = (name) => {
    window.clearTimeout(noticeTimerRef.current)
    setNotice(`${name} · 배포 준비 중`)
    noticeTimerRef.current = window.setTimeout(() => setNotice(''), 2200)
  }

  return (
    <section className={`clone-coding${isVisible ? ' is-visible' : ''}`} id="clone-coding" aria-labelledby="clone-coding-title" ref={sectionRef}>
      <div className="clone-coding__stage" ref={stageRef}>
        <header className="clone-coding__scene-title">
          <p className="clone-coding__eyebrow"><span>04 / 04 · CLONE CODING</span><span>01 — 04</span></p>
          <h2 id="clone-coding-title">CLONE CODING</h2>
          <em>through practice</em>
          <p>웹사이트의 구조와 시각적 흐름을 분석하고 직접 화면으로 구현한 클론 코딩 작업입니다.</p>
        </header>
        <div className="clone-coding__projects">
          {cloneCodingProjects.map((project, index) => (
            <article className="clone-coding__project" key={project.id} style={{ '--clone-index': index }}>
              <ClonePreview project={project} onPending={showPendingNotice} />
              <div className="clone-coding__project-meta">
                <div className="clone-coding__project-heading">
                  <h3>{project.name}</h3>
                  <span>{project.label}</span>
                </div>
                <p>{project.description}</p>
                <a className="clone-coding__source" href={project.sourceUrl} target="_blank" rel="noreferrer">SOURCE CODE <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className={`clone-coding__notice${notice ? ' is-active' : ''}`} role="status" aria-live="polite">{notice}</p>
    </section>
  )
}
