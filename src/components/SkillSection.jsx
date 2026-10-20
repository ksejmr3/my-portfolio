import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups, skillIconCards } from '../data/skillTools.js'
import '../styles/skill-section.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

export default function SkillSection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('[data-skill-card]', section)
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        cards.forEach((card, index) => {
          const tool = skillIconCards[index]
          const isMobile = () => window.innerWidth <= 700
          const originX = () => (isMobile() ? tool.mobileX : tool.x)
          const centerX = () => (isMobile() ? tool.mobileOrbitXPercent : tool.orbitXPercent)
          const spreadX = () => (isMobile() ? tool.mobileMidXPercent : tool.midXPercent)
          const exitX = () => (isMobile() ? tool.mobileFallXPercent : tool.fallXPercent)
          const positionX = (target) => () => window.innerWidth * (target() - originX()) / 100
          const rotationAt = (turnProgress) => tool.angle + tool.turns * 360 * turnProgress

          timeline
            .to(card, {
              x: positionX(centerX),
              y: () => window.innerHeight * (tool.orbitY ?? 0.025),
              rotation: rotationAt(0.2),
              scale: tool.midScale,
              ease: 'none',
              duration: 0.18,
            }, 0)
            .to(card, {
              x: positionX(spreadX),
              y: () => window.innerHeight * (tool.orbitY ?? 0.025) + window.innerHeight * (tool.orbitDriftY ?? 0.045),
              rotation: rotationAt(0.78),
              scale: tool.midScale,
              ease: 'none',
              duration: 0.42,
            }, 0.18)
            .to(card, {
              x: positionX(exitX),
              y: () => window.innerHeight * (tool.orbitY ?? 0.025) + window.innerHeight * (tool.dropY ?? 0.34),
              rotation: rotationAt(1.18),
              scale: tool.midScale * 0.96,
              ease: 'none',
              duration: 0.25,
            }, 0.6)
            .to(card, {
              x: () => positionX(exitX)() + window.innerWidth * (tool.exitDriftX ?? 0) / 100,
              y: () => {
                const startY = isMobile() ? tool.mobileY : tool.y
                const targetCenter = window.innerHeight * 1.12
                return Math.max(0, targetCenter - window.innerHeight * startY / 100)
              },
              rotation: rotationAt(1),
              scale: tool.scale,
              autoAlpha: 0,
              ease: 'none',
              duration: 0.15,
            }, 0.85)
        })

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

        <div className="skill-section__icon-field" aria-hidden="true">
          {skillIconCards.map((item, index) => (
            <div
              className="skill-section__icon-card"
              data-skill-card
              key={item.name}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                '--card-size': `${item.size}px`,
                '--mobile-size': `${item.mobileSize}px`,
                '--mobile-x': `${item.mobileX}%`,
                '--mobile-y': `${item.mobileY}%`,
                width: `clamp(54px, ${Math.round(item.size / 18)}vw, ${item.size}px)`,
                height: `clamp(54px, ${Math.round(item.size / 18)}vw, ${item.size}px)`,
                '--card-angle': `${item.angle}deg`,
                '--logo-color': `#${item.icon.hex}`,
                zIndex: index + 1,
              }}
            >
              <svg viewBox="0 0 24 24" focusable="false">
                <path d={item.icon.path} />
              </svg>
            </div>
          ))}
        </div>
        <p className="skill-section__footnote">SELECTED TOOLS / PRACTICE-BASED WORKFLOW</p>
      </div>
    </section>
  )
}
