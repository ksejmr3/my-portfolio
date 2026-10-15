import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/projects.js'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

export default function WorkSection({ onNavigate }) {
  const sectionRef = useRef(null)
  const openingRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
        const openingItems = Array.from(openingRef.current.children)
        const animations = [
          gsap.fromTo(openingItems,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.09,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: openingRef.current,
                start: 'top 78%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            }),
        ]

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

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          cancelAnimationFrame(frame)
          animations.forEach((animation) => animation.kill())
        }
      })

      return () => media.revert()
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section className="work" id="work" aria-labelledby="work-title" ref={sectionRef}>
      <div className="work__opening" ref={openingRef}>
        <div className="work__topline"><span>01 — 03</span><span>UX/UI · WEB REDESIGN</span></div>
        <h2 id="work-title">selected <em>works.</em></h2>
        <div className="work__opening-bottom"><p>조사와 해석에서 화면 설계까지.<br />세 가지 프로젝트를 소개합니다.</p><span>SCROLL TO EXPLORE ↓</span></div>
      </div>
      <div className="work__projects">{projects.map((project) => <ProjectCard project={project} key={project.id} onNavigate={onNavigate} />)}</div>
    </section>
  )
}
