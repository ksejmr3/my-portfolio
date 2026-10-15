import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vivienneHero from '../assets/vivienne-westwood/implemented-hero.png'

gsap.registerPlugin(ScrollTrigger)

export default function IntroSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        timeline.to(canvasRef.current, {
          yPercent: -22,
          ease: 'none',
        })

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          cancelAnimationFrame(frame)
          timeline.kill()
        }
      })

      return () => media.revert()
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section className="intro" id="intro" aria-labelledby="intro-title" ref={sectionRef}>
      <header className="site-header">
        <a className="site-header__brand" href="#intro" aria-label="김지영 포트폴리오 처음으로">KIM JIYOUNG</a>
        <nav className="site-header__nav" aria-label="주요 메뉴"><a href="#intro" aria-current="page">INTRO</a><a href="#work">WORK</a></nav>
        <span className="site-header__edition">PORTFOLIO / 2026</span>
      </header>
      <div className="intro__canvas" ref={canvasRef}>
        <p className="intro__eyebrow">KIM JIYOUNG — DESIGN PORTFOLIO</p>
        <h1 id="intro-title" className="intro__title"><span>DESIGNING</span><span><em>connected</em> EXPERIENCES.</span></h1>
        <p className="intro__summary">흩어진 정보를 정리하고,<br />사람과 경험을 자연스럽게 잇는 화면을 설계합니다.</p>
      </div>
      <div className="intro__bottom">
        <div className="intro__index"><span>01 / 03</span><span>SELECTED PROJECTS</span></div>
        <figure className="intro__preview"><img src={vivienneHero} alt="Vivienne Westwood 웹사이트 리디자인 구현 화면 미리보기" /><figcaption>VIVIENNE WESTWOOD / IMPLEMENTED HERO</figcaption></figure>
        <a className="intro__next" href="#work">EXPLORE WORK <span aria-hidden="true">↘</span></a>
      </div>
    </section>
  )
}
