import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard.jsx'
import HyundaiCaseStudy from '../pages/HyundaiCaseStudy.jsx'
import { projects } from '../data/projects.js'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

export function WorkOpening() {
  return (
    <section className="work work--transition" id="work" aria-labelledby="work-title">
      <div className="work__opening">
        <div className="work__topline work__topline--transition"><span>01 — 03</span><span>UX/UI · WEB REDESIGN</span></div>
        <h2 id="work-title"><span className="work__title-word work__title-word--selected">selected</span>{' '}<em className="work__title-word work__title-word--works">works.</em></h2>
        <div className="work__opening-bottom"><p className="work__description--transition">조사와 해석에서 화면 설계까지.<br />세 가지 프로젝트를 소개합니다.</p><span className="work__scroll-cue--transition">SCROLL TO EXPLORE ↓</span></div>
      </div>
    </section>
  )
}

export default function WorkSection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
        const animations = []

        sectionRef.current.querySelectorAll('.project-card').forEach((card) => {
          const mediaPanel = card.querySelector('.project-card__media')
          const contentPanel = card.querySelector('.project-card__content')

          animations.push(gsap.fromTo(mediaPanel,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 76%',
                end: 'top 32%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            }))

          animations.push(gsap.fromTo(contentPanel,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                end: 'top 26%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            }))
        })

        let refreshFrame = 0
        const resizeObserver = new ResizeObserver(() => {
          cancelAnimationFrame(refreshFrame)
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
        })
        resizeObserver.observe(sectionRef.current)

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          cancelAnimationFrame(frame)
          cancelAnimationFrame(refreshFrame)
          resizeObserver.disconnect()
          animations.forEach((animation) => animation.kill())
        }
      })

      return () => media.revert()
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section className="work work--projects-section" aria-labelledby="work-title" ref={sectionRef}>
      <div className="work__projects">{projects.map((project) => <Fragment key={project.id}>
        <ProjectCard project={project} />
        {project.id === 'hyundai-motorstudio' && <HyundaiCaseStudy />}
      </Fragment>)}</div>
    </section>
  )
}
