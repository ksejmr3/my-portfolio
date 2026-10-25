import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups, skillIconCards } from '../data/skillTools.js'
import '../styles/skill-section.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

export default function SkillSection() {
  const sectionRef = useRef(null)
  const iconFieldRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('[data-skill-card]', section)
        const categories = section.querySelector('.skill-section__categories')
        if (!iconFieldRef.current) return undefined

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: 'skill-logo-motion',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        cards.forEach((card, index) => {
          const tool = skillIconCards[index]
          const spinner = card.querySelector('[data-skill-spinner]')
          const start = .025 + tool.delay * .42
          const riseEnd = .31 + tool.delay * .24
          const passEnd = .64 + tool.delay * .18
          const end = .9 + tool.delay * .12
          const below = () => window.innerHeight + card.offsetHeight * 1.4
          const clearY = (ratio) => {
            const listBottom = categories.offsetTop + categories.offsetHeight
            const readableFloor = listBottom + card.offsetHeight * .18
            return Math.max(window.innerHeight * ratio, readableFloor)
          }

          gsap.set(card, {
            y: below,
            x: -tool.drift * .45,
            scale: .72,
            autoAlpha: 0,
          })
          gsap.set(spinner, {
            rotationX: tool.rx * -.14,
            rotationY: tool.ry * -.14,
            rotationZ: tool.rz * -.2,
            transformPerspective: 780,
            transformOrigin: '50% 50%',
          })

          timeline.to(card, {
            y: () => clearY(tool.peakY),
            x: tool.drift,
            scale: 1,
            autoAlpha: 1,
            ease: 'power2.out',
            duration: riseEnd - start,
          }, start)

          timeline.to(card, {
            y: () => clearY(tool.passY),
            x: tool.drift * -.75,
            scale: .94,
            autoAlpha: .96,
            ease: 'none',
            duration: passEnd - riseEnd,
          }, riseEnd)

          timeline.to(card, {
            y: below,
            x: tool.drift * .3,
            scale: .74,
            autoAlpha: 0,
            ease: 'power2.in',
            duration: end - passEnd,
          }, passEnd)

          timeline.to(spinner, {
            rotationX: tool.rx,
            rotationY: tool.ry,
            rotationZ: tool.rz,
            ease: 'none',
            duration: end - start,
          }, start)
        })

        timeline.to({}, { duration: 0.01 }, 0.99)

        return () => timeline.kill()
      })

      return () => media.revert()
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section className="skill-section" id="skill" aria-labelledby="skill-title" ref={sectionRef}>
      <div className="skill-section__stage">
        <header className="skill-section__header">
          <p className="skill-section__eyebrow">TOOLS / METHODS / PRACTICE</p>
          <h2 id="skill-title">SKILL</h2>
          <p className="skill-section__description">디자인을 기획하고 화면으로 구현하는 과정에서 사용하는 도구와 기술입니다.</p>
        </header>

        <div className="skill-section__categories">
          {skillGroups.map((group) => (
            <section className="skill-section__category" key={group.name} aria-label={`${group.name} tools`}>
              <h3>{group.name}</h3>
              <ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </section>
          ))}
        </div>

        <div className="skill-section__icon-field" aria-hidden="true" ref={iconFieldRef}>
          {skillIconCards.map((item, index) => (
            <div
              className="skill-section__icon-card"
              data-skill-card
              data-skill-name={item.name}
              key={item.name}
              style={{ left: `${item.x}%`, '--card-size': `${item.size}px`, zIndex: index + 1 }}
            >
              <div
                className="skill-section__icon-spinner"
                data-skill-spinner
                style={{ '--logo-color': item.icon.hex ? `#${item.icon.hex}` : '#111', '--logo-scale': `${item.logoScale}%` }}
              >
                {[0, 1].map((face) => (
                  <span className={`skill-section__icon-face skill-section__icon-face--${face ? 'back' : 'front'}`} key={face}>
                    <svg viewBox={item.icon.viewBox || '0 0 24 24'} focusable="false">
                      {item.icon.paths
                        ? item.icon.paths.map((path) => <path d={path.d} fill={path.fill} key={path.d} />)
                        : <path d={item.icon.path} />}
                    </svg>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="skill-section__footnote">SELECTED TOOLS / PRACTICE-BASED WORKFLOW</p>
      </div>
    </section>
  )
}
