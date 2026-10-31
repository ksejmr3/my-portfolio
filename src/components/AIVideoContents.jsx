import { useEffect, useRef, useState } from 'react'
import { aiVideoProjects } from '../data/aiVideoContents.js'
import '../styles/ai-video-contents.css'

function SoundIcon({ active }) {
  return <span aria-hidden="true">{active ? '◖))' : '◖×'}</span>
}

function Film({ project, index, videoRef, activeSound, onToggleSound }) {
  const isSoundActive = activeSound === index
  return (
    <article className={`ai-showcase__film ai-showcase__film--${project.orientation}`} aria-labelledby={`ai-film-${project.number}`}>
      <div className="ai-showcase__video-frame" style={{ aspectRatio: project.aspectRatio }}>
        <video ref={videoRef} src={project.video} poster={project.poster} autoPlay muted={!isSoundActive} loop playsInline preload="metadata" aria-label={`${project.title} 영상`} />
      </div>
      <div className="ai-showcase__film-copy">
        <p className="ai-showcase__eyebrow">FILM {project.number} / {String(aiVideoProjects.length).padStart(2, '0')}</p>
        <h3 id={`ai-film-${project.number}`}>{project.title}</h3>
        <p>{project.description ?? project.concept}</p>
        <button type="button" className={isSoundActive ? 'is-active' : ''} aria-pressed={isSoundActive} onClick={() => onToggleSound(index)}>
          <SoundIcon active={isSoundActive} /><span>{isSoundActive ? 'SOUND ON' : 'SOUND OFF'}</span>
        </button>
      </div>
    </article>
  )
}

export default function AIVideoContents() {
  const sectionRef = useRef(null)
  const videoRefs = useRef([])
  const [activeSound, setActiveSound] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) return undefined
    const videos = videoRefs.current.filter(Boolean)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) videos.forEach((video) => video.play().catch(() => {}))
      else {
        videos.forEach((video) => { video.muted = true; video.pause() })
        setActiveSound(-1)
      }
    }, { threshold: 0.12 })
    observer.observe(section)
    return () => {
      observer.disconnect()
      videos.forEach((video) => { video.muted = true; video.pause() })
    }
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => { if (video) video.muted = index !== activeSound })
  }, [activeSound])

  const toggleSound = (index) => {
    setActiveSound((current) => current === index ? -1 : index)
    videoRefs.current[index]?.play().catch(() => {})
  }

  return (
    <section className="ai-video-contents" id="ai-video-contents" ref={sectionRef} aria-labelledby="ai-video-title">
      <div className="ai-showcase">
        <header className="ai-showcase__intro">
          <p className="ai-showcase__eyebrow">MOVING IMAGE / 02 FILMS</p>
          <h2 id="ai-video-title">AI VIDEO<br /><em>CONTENTS</em></h2>
          <p className="ai-showcase__intent">생성형 AI를 활용해 브랜드 광고부터 숏폼 콘텐츠까지 다양한 영상의 콘셉트와 장면을 기획하고 제작했습니다.</p>
          <div className="ai-showcase__role"><span>MY ROLE</span><p>AI 영상의 콘셉트 기획부터 프롬프트 설계, 장면 생성, 편집 및 후반 작업까지 전 과정을 진행했습니다.</p></div>
        </header>
        <Film project={aiVideoProjects[0]} index={0} videoRef={(node) => { videoRefs.current[0] = node }} activeSound={activeSound} onToggleSound={toggleSound} />
        <Film project={aiVideoProjects[1]} index={1} videoRef={(node) => { videoRefs.current[1] = node }} activeSound={activeSound} onToggleSound={toggleSound} />
      </div>
    </section>
  )
}
