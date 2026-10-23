import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IntroWorkSequence({ intro, profile, opening }) {
  const sequenceRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(sequenceRef)
        const stage = select('.intro-work-sequence__stage')[0]
        const transitionPlane = select('.intro__transition-plane')
        const workItems = select('.work__topline--transition, .work__title-word, .work__description--transition')
        const profileSection = select('.profile-intro')[0]
        const profileItems = select('.profile-intro__portrait, .profile-intro__content')
        const profilePortrait = select('.profile-intro__portrait')[0]
        const curlProgress = { value: 0 }

        gsap.set(workItems, { autoAlpha: 0 })
        gsap.set(profileSection, { autoAlpha: 0 })
        gsap.set(profileItems, { y: 24 })

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=260%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(select('.intro__title-line--primary'), { xPercent: -62, yPercent: -4, scale: 1.18, transformOrigin: '50% 50%', duration: 32 }, 14)
          .to(select('.intro__title-line--secondary'), { xPercent: 62, yPercent: -3, scale: 1.22, transformOrigin: '50% 50%', duration: 32 }, 14)
          .to(select('.intro__eyebrow--transition, .intro__summary--transition'), { yPercent: -45, autoAlpha: 0, duration: 18 }, 22)
          .to(select('.intro__preview--transition'), { yPercent: -20, rotate: 0, duration: 24 }, 18)
          .to(select('.site-header, .intro__bottom--transition'), { autoAlpha: 0, duration: 16 }, 46)
          .fromTo(transitionPlane, { yPercent: 100 }, { yPercent: 0, duration: 16 }, 40)
          .to(select('.intro__title-line'), { autoAlpha: 0, duration: 14 }, 54)
          .to(profileSection, { autoAlpha: 1, duration: 10 }, 56)
          .to(profileItems, { y: 0, duration: 14, stagger: .08 }, 58)
          .to({}, { duration: 28 }, 74)
          .to(curlProgress, {
            value: 1,
            duration: 28,
            onUpdate: () => {
              if (profilePortrait) {
                profilePortrait.dispatchEvent(new CustomEvent('profilecurlprogress', { detail: curlProgress.value }))
              }
            },
          }, 76)
          .to(profileSection, { autoAlpha: 0, duration: 10 }, 104)
          .to(select('.work__topline--transition'), { autoAlpha: 1, y: 0, duration: 12 }, 114)
          .fromTo(select('.work__title-word--selected'), { xPercent: -16, yPercent: 20 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 22 }, 118)
          .fromTo(select('.work__title-word--works'), { xPercent: 16, yPercent: 28 }, { autoAlpha: 1, xPercent: 0, yPercent: 0, duration: 20 }, 120)
          .to(select('.work__description--transition'), { autoAlpha: 1, y: 0, duration: 18 }, 140)

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
        const refresh = () => ScrollTrigger.refresh()
        const images = select('img').filter((image) => !image.complete)
        images.forEach((image) => image.addEventListener('load', refresh, { once: true }))
        return () => {
          cancelAnimationFrame(frame)
          images.forEach((image) => image.removeEventListener('load', refresh))
          timeline.kill()
          gsap.set(workItems, { clearProps: 'opacity,visibility,transform' })
          gsap.set([profileSection, ...profileItems], { clearProps: 'opacity,visibility,transform' })
        }
      })

      return () => media.revert()
    }, sequenceRef)

    return () => context.revert()
  }, [])

  return (
    <div className="intro-work-sequence" ref={sequenceRef}>
      <div className="intro-work-sequence__stage">
        {intro}
        {profile}
        {opening}
      </div>
    </div>
  )
}
