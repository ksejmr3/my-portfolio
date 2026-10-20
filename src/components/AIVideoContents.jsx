import { useEffect, useRef } from 'react'
import { aiVideoProjects } from '../data/aiVideoContents.js'
import '../styles/ai-video-contents.css'

function VideoPlayer({ project }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    }, { threshold: 0.08 })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="ai-video-detail__player"
      src={project.video}
      poster={project.poster}
      controls
      muted
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
              ? '패션 런웨이 장면을 담은 AI 생성 영상과 작업 정보를 소개합니다.'
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

function VideoDetail({ project, index, total }) {
  return (
    <article className="ai-video-detail" aria-labelledby={`ai-video-film-${project.number}`}>
      <div className="ai-video-detail__layout">
        <div className="ai-video-detail__media">
          <div
            className={`ai-video-detail__player-frame ai-video-detail__player-frame--${project.orientation}`}
            style={{ aspectRatio: project.aspectRatio }}
          >
            <VideoPlayer project={project} />
          </div>
          <p className="ai-video-detail__media-note">AI GENERATED FILM / {project.formatLabel}</p>
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
          <span className="ai-video-detail__index">{String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}</span>
        </div>
      </div>
    </article>
  )
}

export default function AIVideoContents() {
  return (
    <div className="ai-video-contents" id="ai-video-contents">
      <VideoIntro projects={aiVideoProjects} />
      {aiVideoProjects.map((project, index) => (
        <VideoDetail project={project} index={index} total={aiVideoProjects.length} key={project.number} />
      ))}
    </div>
  )
}
