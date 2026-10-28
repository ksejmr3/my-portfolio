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
        const paths = [
          { start: .06, enterX: -.055, restX: 0, exitX: -.025, rotate: -2 },
          { start: .275, enterX: .05, restX: -.01, exitX: -.035, rotate: 2 },
          { start: .49, enterX: -.025, restX: .015, exitX: .055, rotate: -1.5 },
          { start: .705, enterX: .06, restX: -.015, exitX: -.045, rotate: 1.5 },
        ]
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
          const path = paths[index]
          const belowStage = () => stage.clientHeight - project.offsetTop + 56
          const aboveStage = () => -project.offsetTop - project.offsetHeight - 56
          timeline.fromTo(project, {
            x: () => stage.clientWidth * path.enterX,
            y: belowStage,
            scale: .94,
            rotate: path.rotate,
          }, {
            x: () => stage.clientWidth * path.restX,
            y: 0,
            scale: 1,
            rotate: 0,
            ease: 'power1.out',
            duration: .1,
          }, path.start)
          timeline.to(project, { autoAlpha: 1, ease: 'none', duration: .025 }, path.start)
          timeline.to(project, {
            x: () => stage.clientWidth * (path.restX + path.exitX) / 2,
            y: () => -stage.clientHeight * .065,
            ease: 'none',
            duration: .1,
          }, path.start + .1)
          timeline.to(project, {
            x: () => stage.clientWidth * path.exitX,
            y: aboveStage,
            scale: .97,
            rotate: -path.rotate * .5,
            ease: 'power1.in',
            duration: .09,
          }, path.start + .2)
          timeline.to(project, { autoAlpha: 0, ease: 'none', duration: .025 }, path.start + .265)
        })
        timeline.to({}, { duration: .005 }, .995)
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
          <p>웹사이트의 구조와 시각적 흐름을 분석하고 직접 화면으로 구현한<br />클론 코딩 작업입니다.</p>
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
