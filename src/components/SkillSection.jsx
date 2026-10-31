import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups, skillIconCards } from '../data/skillTools.js'
import '../styles/skill-section.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const smoothstep = (value) => {
  const progress = clamp(value)
  return progress * progress * (3 - 2 * progress)
}

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
        if (!iconFieldRef.current) return undefined
        const orbitState = { progress: 0 }
        const renderOrbit = () => {
          const progress = orbitState.progress
          const field = iconFieldRef.current
          if (!field) return
          const width = field.clientWidth
          const height = field.clientHeight
          const radiusX = Math.min(width * .275, 480)
          const radiusY = Math.min(height * .025, 24)
          const radiusZ = 220
          const centerX = width * .5
          const centerY = height * (.70 + .04 * clamp((950 - height) / 50))
          const rotation = progress * Math.PI * 2 * 1.35
          const perspective = 1100

          cards.forEach((card, index) => {
            const enter = smoothstep((progress - index * .0045) / .12)
            const enterOffset = (1 - enter) * height * .08
            const angle = index / cards.length * Math.PI * 2 + rotation
            const depth = (Math.sin(angle) + 1) / 2
            const orbitX = centerX + Math.cos(angle) * radiusX
            const orbitY = centerY + Math.sin(angle) * radiusY + enterOffset
            const z = (depth - .5) * radiusZ * 2 - (1 - enter) * 120
            // Compensate for CSS perspective once, then set the intended on-screen size.
            const projectionCorrection = (perspective - z) / perspective
            const scale = .87 * (.78 + enter * .22) * (.6 + Math.pow(depth, 3) * 1.8) * projectionCorrection
            const exitStart = .62 + index * .0185
            const exitProgress = smoothstep((progress - exitStart) / .135)
            const targetY = orbitY + height * .46 * exitProgress
            gsap.set(card, {
              x: centerX + (orbitX - centerX) * projectionCorrection,
              y: height * .5 + (targetY - height * .5) * projectionCorrection,
              z,
              scale,
              rotationY: Math.cos(angle) * -25,
              autoAlpha: enter * (1 - exitProgress) * (.6 + depth * .4),
              zIndex: Math.round(depth * 100),
            })
          })
        }

        const orbitTimeline = gsap.timeline({
          scrollTrigger: {
            id: 'skill-logo-orbit',
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: .55,
            invalidateOnRefresh: true,
            onRefresh: renderOrbit,
          },
        })
        orbitTimeline.to(orbitState, { progress: 1, duration: 1, ease: 'none', onUpdate: renderOrbit })
        renderOrbit()

        return () => {
          orbitTimeline.kill()
        }
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
          {skillIconCards.map((item) => (
            <div
              className="skill-section__icon-card"
              data-skill-card
              data-skill-name={item.name}
              key={item.name}
              style={{ '--card-size': `${item.size}px`, '--logo-color': item.icon.hex ? `#${item.icon.hex}` : '#111', '--logo-scale': `${item.logoScale}%` }}
            >
              <span className="skill-section__icon-face">
                <svg viewBox={item.icon.viewBox || '0 0 24 24'} focusable="false">
                  {item.icon.paths
                    ? item.icon.paths.map((path) => <path d={path.d} fill={path.fill} key={path.d} />)
                    : <path d={item.icon.path} />}
                </svg>
              </span>
            </div>
          ))}
        </div>
        <p className="skill-section__footnote">SELECTED TOOLS / PRACTICE-BASED WORKFLOW</p>
      </div>
    </section>
  )
}
