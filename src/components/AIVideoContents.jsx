import { useEffect, useRef } from 'react'
import { aiVideoProjects } from '../data/aiVideoContents.js'
import '../styles/ai-video-contents.css'

function Film({ project, videoRef }) {
  return (
    <article className={`ai-showcase__film ai-showcase__film--${project.orientation}`} aria-labelledby={`ai-film-${project.number}`}>
      <div className="ai-showcase__video-frame">
        <video ref={videoRef} src={project.video} muted loop playsInline controls preload="metadata" aria-label={`${project.title} 영상`} />
      </div>
      <div className="ai-showcase__film-copy">
        <p className="ai-showcase__eyebrow">FILM {project.number} / {String(aiVideoProjects.length).padStart(2, '0')}</p>
        <h3 id={`ai-film-${project.number}`}>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  )
}

export default function AIVideoContents() {
  const videoRefs = useRef([])
  const manuallyPaused = useRef(new WeakSet())

  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean)
    const visible = new WeakSet()
    const observerPauses = new WeakMap()
    let disposed = false

    const handlePause = (event) => {
      const video = event.currentTarget
      const pending = observerPauses.get(video) || 0
      if (pending > 0) {
        observerPauses.set(video, pending - 1)
      } else if (visible.has(video)) {
        manuallyPaused.current.add(video)
      }
    }
    const handlePlay = (event) => {
      manuallyPaused.current.delete(event.currentTarget)
    }
    const handleVolume = (event) => {
      const video = event.currentTarget
      if (!video.muted && video.volume > 0) {
        videos.forEach((other) => { if (other !== video) other.muted = true })
      }
    }

    videos.forEach((video) => {
      video.addEventListener('pause', handlePause)
      video.addEventListener('play', handlePlay)
      video.addEventListener('volumechange', handleVolume)
    })

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        if (disposed) return
        entries.forEach(({ target: video, isIntersecting, intersectionRatio }) => {
          if (isIntersecting && intersectionRatio >= 0.1) {
            visible.add(video)
            if (video.paused && !manuallyPaused.current.has(video)) {
              video.play().catch(() => {})
            }
          } else {
            visible.delete(video)
            video.muted = true
            if (!video.paused) {
              observerPauses.set(video, (observerPauses.get(video) || 0) + 1)
              video.pause()
            }
          }
        })
      }, { threshold: [0, 0.1] })
      : null

    if (observer) videos.forEach((video) => observer.observe(video))
    else videos.forEach((video) => { visible.add(video); video.play().catch(() => {}) })

    return () => {
      disposed = true
      observer?.disconnect()
      videos.forEach((video) => {
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('volumechange', handleVolume)
        video.muted = true
        video.pause()
      })
    }
  }, [])

  return (
    <section className="ai-video-contents" id="ai-video-contents" aria-labelledby="ai-video-title">
      <div className="ai-showcase">
        <header className="ai-showcase__intro">
          <p className="ai-showcase__eyebrow">MOVING IMAGE / 04 FILMS</p>
          <h2 id="ai-video-title">AI VIDEO<br /><em>CONTENTS</em></h2>
          <p className="ai-showcase__intent">생성형 AI를 활용해 패션, 제품 광고, 숏폼 등 다양한 콘셉트의 영상 콘텐츠를 기획하고 제작했습니다.</p>
          <div className="ai-showcase__role"><span>MY ROLE</span><p>콘셉트 기획, AI 이미지·영상 생성, 장면 구성, 편집 및 사운드 연출까지 전 과정을 직접 진행했습니다.</p></div>
        </header>
        <div className="ai-showcase__gallery">
          {aiVideoProjects.map((project, index) => (
            <Film key={project.video} project={project} videoRef={(node) => { videoRefs.current[index] = node }} />
          ))}
        </div>
      </div>
    </section>
  )
}
