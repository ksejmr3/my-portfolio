import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aiVideoProjects } from '../data/aiVideoContents.js'
import '../styles/ai-video-contents.css'

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

function VideoPlayer({ project, active }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !('IntersectionObserver' in window)) return undefined

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isInView = false

    const syncPlayback = () => {
      if (!active || !isInView || motionPreference.matches) {
        video.pause()
        return
      }

      video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.08 })

    observer.observe(video)
    motionPreference.addEventListener?.('change', syncPlayback)
    return () => {
      observer.disconnect()
      motionPreference.removeEventListener?.('change', syncPlayback)
      video.pause()
    }
  }, [active])

  return (
    <video
      ref={videoRef}
      className="ai-video-detail__player"
      src={project.video}
      poster={project.poster}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${project.title} 영상 플레이어`}
    />
  )
}

function VideoIntro({ projects }) {
  const featuredProject = projects.find((project) => project.introStills?.length)
  const stills = featuredProject?.introStills ?? []

  return (
    <section className="ai-video-intro" aria-labelledby="ai-video-title">
      <div className="ai-video-intro__layout">
        <div className="ai-video-intro__visual" role="group" aria-label="AI 영상 스틸컷 콜라주">
          {stills.length > 0 ? (
            <div className="ai-video-intro__collage">
              {stills.slice(0, 3).map((still, index) => (
                <figure className={`ai-video-intro__still ai-video-intro__still--${index + 1}`} key={still.src}>
                  <img src={still.src} alt={still.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                </figure>
              ))}
            </div>
          ) : (
            <div className="ai-video-intro__empty" role="status">
              <span>VIDEO STILLS</span>
              <strong>NO SOURCE<br />VIDEO</strong>
              <p>실제 영상이 추가되면 대표 장면을 표시합니다.</p>
            </div>
          )}
        </div>

        <div className="ai-video-intro__copy">
          <p className="ai-video-intro__eyebrow">MOVING IMAGE / {String(projects.length).padStart(2, '0')} FILM{projects.length === 1 ? '' : 'S'}</p>
          <h1 id="ai-video-title">AI VIDEO<br /><em>CONTENTS</em></h1>
          <p className="ai-video-intro__description">
            {projects.length > 0
              ? '패션을 주제로 한 영상 작업과 관련 정보를 소개합니다.'
              : 'AI를 활용해 제작한 영상 작업물을 소개합니다.'}
          </p>
          <div className="ai-video-intro__tags" aria-label="콘텐츠 키워드">
            <span>AI VISUALS</span>
            <span>FASHION FILM</span>
            <span>{String(projects.length).padStart(2, '0')} FILM{projects.length === 1 ? '' : 'S'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoDetail({ project, index, total, active }) {
  return (
    <article className={`ai-video-detail${index % 2 ? ' ai-video-detail--reverse' : ''}`} aria-labelledby={`ai-video-film-${project.number}`}>
      <div className="ai-video-detail__layout">
        <div className="ai-video-detail__media">
          <div
            className={`ai-video-detail__player-frame ai-video-detail__player-frame--${project.orientation}`}
            style={{ aspectRatio: project.aspectRatio }}
          >
            <VideoPlayer project={project} active={active} />
          </div>
          <p className="ai-video-detail__media-note">{project.mediaLabel} / {project.formatLabel}</p>
        </div>
        <div className="ai-video-detail__content">
          <p className="ai-video-detail__eyebrow">FILM {project.number} / {String(total).padStart(2, '0')}</p>
          <h2 id={`ai-video-film-${project.number}`}>{project.title}</h2>
          <p className="ai-video-detail__concept">{project.concept}</p>
          <dl className="ai-video-detail__facts">
            {project.details.map((detail) => (
              <div className="ai-video-detail__fact" key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="ai-video-detail__progress" aria-label={`영상 ${index + 1} / ${total}`}>
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span className="ai-video-detail__progress-track"><span style={{ width: `${((index + 1) / total) * 100}%` }} /></span>
      </div>
    </article>
  )
}

export default function AIVideoContents() {
  const sectionRef = useRef(null)
  const activeRef = useRef(-1)
  const [activeIndex, setActiveIndex] = useState(-1)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const activate = (index) => {
      if (activeRef.current === index) return
      activeRef.current = index
      setActiveIndex(index)
    }
    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const rail = section.querySelector('.ai-video-contents__rail')
        const scenes = [...rail.querySelectorAll('.ai-video-intro, .ai-video-detail')]
        const [intro, firstFilm, secondFilm] = scenes
        const introText = intro.querySelectorAll('.ai-video-intro__copy > *')
        const firstText = firstFilm.querySelectorAll('.ai-video-detail__content > *')
        const secondText = secondFilm.querySelectorAll('.ai-video-detail__content > *')
        gsap.set(rail, { x: 0 })
        gsap.set([introText, firstText, secondText], { autoAlpha: 0, y: 26 })

        const timeline = gsap.timeline({
          onUpdate: () => {
            const phase = timeline.time()
            activate(phase < 3.1 ? -1 : phase < 6.66 ? 0 : 1)
          },
          scrollTrigger: {
            trigger: section,
            // Pin the section wrapper itself so ScrollTrigger's spacer owns
            // the same box that participates in normal document flow.
            pin: true,
            pinSpacing: true,
            start: 'top top',
            // The rail and text share one scroll coordinate, including holds.
            end: () => `+=${window.innerHeight * 7}`,
            scrub: true,
            anticipatePin: 0,
            fastScrollEnd: false,
            invalidateOnRefresh: true,
            onLeave: () => activate(-1),
            onLeaveBack: () => activate(-1),
            onEnterBack: (self) => {
              const phase = self.progress * timeline.duration()
              activate(phase < 3.1 ? -1 : phase < 6.66 ? 0 : 1)
            },
          },
        })

        const revealText = (elements, at) => timeline.to(elements, {
          autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.14, ease: 'power2.out',
        }, at)
        const hideText = (elements, at) => timeline.to(elements, {
          autoAlpha: 0, y: -18, duration: 0.32, stagger: 0.04, ease: 'power1.in',
        }, at)

        revealText(introText, 0.08)
        hideText(introText, 1.6)
        timeline.to(rail, { x: () => -section.clientWidth, duration: 1.3, ease: 'none' }, 1.8)
        revealText(firstText, 3.17)
        hideText(firstText, 5.15)
        timeline.to(rail, { x: () => -section.clientWidth * 2, duration: 1.3, ease: 'none' }, 5.36)
        revealText(secondText, 6.75)
        timeline.to({}, { duration: 1.35 }, 7.81)
        return () => { timeline.kill(); activate(-1) }
      })

      media.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
        const scenes = [...section.querySelectorAll('.ai-video-detail')]
        const ratios = new Map()
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0))
          const best = scenes.reduce((current, scene, index) => ratios.get(scene) > (ratios.get(scenes[current]) || 0) ? index : current, -1)
          activate(best >= 0 && ratios.get(scenes[best]) > 0 ? best : -1)
        }, { threshold: [0, 0.1, 0.25, 0.5, 0.75] })
        scenes.forEach((scene) => observer.observe(scene))

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          scenes.forEach((scene) => {
            gsap.fromTo(scene.querySelectorAll('.ai-video-detail__media, .ai-video-detail__content'),
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out',
                scrollTrigger: { trigger: scene, start: 'top 80%', toggleActions: 'play none none reverse' } })
          })
        }
        return () => { observer.disconnect(); activate(-1) }
      })
      return () => media.revert()
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section className="ai-video-contents" id="ai-video-contents" ref={sectionRef}>
      <div className="ai-video-contents__stage">
        <div className="ai-video-contents__rail">
          <VideoIntro projects={aiVideoProjects} />
          {aiVideoProjects.map((project, index) => (
            <VideoDetail project={project} index={index} total={aiVideoProjects.length} active={activeIndex === index} key={project.number} />
          ))}
        </div>
      </div>
    </section>
  )
}
