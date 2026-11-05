import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EvidenceFigure from '../components/EvidenceFigure.jsx'
import ImageLightbox from '../components/ImageLightbox.jsx'
import { hyundaiCaseStudy as project } from '../data/hyundaiCaseStudy.js'

function SectionIntro({ index, eyebrow, title, body, className = '' }) {
  return <header className={`case-section__intro ${className}`.trim()}><span>{index}</span><div><p>{eyebrow}</p><h2>{title}</h2>{body && <p className="case-section__body">{body}</p>}</div></header>
}

const DESIGN_SCROLL_VIEWPORTS_PER_SECOND = 0.27
const DESIGN_SCROLL_ENDPOINT_PAUSE = 750
const DESIGN_SCROLL_RESET_FADE = 420

function SelectedWorkMedia({ src, poster, label, title, caption, className = '', mode = 'imac', kind = 'video', playbackRate = 1, hideCaption = false }) {
  const figureRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRef = useRef(null)
  const viewportRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const isPhone = mode === 'phone'
  const isImac = mode === 'imac'

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateMotionPreference)

    const target = figureRef.current
    const media = videoRef.current
    if (!target) return () => mediaQuery.removeEventListener('change', updateMotionPreference)

    let isVisible = false
    const syncPlayback = () => {
      if (!media || reducedMotion || !isVisible || hasFailed) {
        media?.pause()
        return
      }
      media.play().catch(() => setHasFailed(true))
    }
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.12 })
    observer.observe(target)

    return () => {
      observer.disconnect()
      media?.pause()
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [reducedMotion, hasFailed, kind])

  useEffect(() => {
    const figure = figureRef.current
    const content = mediaRef.current
    if (!figure || kind !== 'design') return
    if (reducedMotion) {
      if (mediaRef.current) mediaRef.current.style.transform = 'translate3d(0, 0, 0)'
      if (mediaRef.current) mediaRef.current.style.opacity = '1'
      return
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isVisible = false
    let frame = null
    let activeElapsed = 0
    let lastTime = 0
    let distance = 0
    let travelDuration = 0
    const pauseAfter = DESIGN_SCROLL_ENDPOINT_PAUSE
    const resetFadeDuration = DESIGN_SCROLL_RESET_FADE
    const cycleDuration = () => pauseAfter * 2 + travelDuration + resetFadeDuration
    const readMotion = () => {
      if (!travelDuration) return { segment: 'start', progress: 0, elapsed: 0 }
      const phase = activeElapsed % cycleDuration()
      if (phase < pauseAfter) return { segment: 'start', progress: 0, elapsed: phase }
      if (phase < pauseAfter + travelDuration) return { segment: 'forward', progress: (phase - pauseAfter) / travelDuration }
      if (phase < travelDuration + pauseAfter * 2) return { segment: 'end', progress: 1, elapsed: phase - travelDuration - pauseAfter }
      return { segment: 'reset', progress: 0, elapsed: phase - travelDuration - pauseAfter * 2 }
    }
    const measure = () => {
      const motion = readMotion()
      const viewportHeight = viewportRef.current?.clientHeight || figure.clientHeight
      distance = Math.max(0, content.scrollHeight - viewportHeight)
      const speed = viewportHeight * DESIGN_SCROLL_VIEWPORTS_PER_SECOND
      travelDuration = distance > 0 && speed > 0 ? (distance / speed) * 1000 : 0
      if (motion.segment === 'forward') activeElapsed = pauseAfter + motion.progress * travelDuration
      else if (motion.segment === 'end') activeElapsed = pauseAfter + travelDuration + motion.elapsed
      else if (motion.segment === 'reset') activeElapsed = pauseAfter * 2 + travelDuration + motion.elapsed
      else activeElapsed = motion.elapsed
      lastTime = 0
      // The Figma image begins at its actual page top, then travels upward
      // inside the clipped device viewport to reveal content further down.
      content.style.transform = `translate3d(0, ${-distance * motion.progress}px, 0)`
      content.style.opacity = motion.segment === 'reset'
        ? String(motion.elapsed < resetFadeDuration / 2 ? 1 - motion.elapsed / (resetFadeDuration / 2) : (motion.elapsed - resetFadeDuration / 2) / (resetFadeDuration / 2))
        : '1'
    }
    const draw = (time) => {
      frame = null
      if (!isVisible || document.hidden || !content) return
      if (lastTime) activeElapsed += time - lastTime
      lastTime = time
      if (!travelDuration) {
        content.style.transform = 'translate3d(0, 0, 0)'
        content.style.opacity = '1'
        frame = requestAnimationFrame(draw)
        return
      }
      const phase = activeElapsed % cycleDuration()
      const forwardEnd = pauseAfter + travelDuration
      const endPauseEnd = forwardEnd + pauseAfter
      let progress = 0
      let opacity = 1
      if (phase >= pauseAfter && phase < forwardEnd) progress = (phase - pauseAfter) / travelDuration
      else if (phase >= forwardEnd && phase < endPauseEnd) progress = 1
      else if (phase >= endPauseEnd) {
        const resetElapsed = phase - endPauseEnd
        const halfFade = resetFadeDuration / 2
        opacity = resetElapsed < halfFade ? 1 - resetElapsed / halfFade : (resetElapsed - halfFade) / halfFade
      }
      content.style.transform = `translate3d(0, ${-distance * progress}px, 0)`
      content.style.opacity = String(opacity)
      frame = requestAnimationFrame(draw)
    }
    const start = () => {
      if (frame === null && isVisible && !mediaQuery.matches && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      lastTime = 0
    }
    const resizeObserver = new ResizeObserver(measure)
    if (viewportRef.current) resizeObserver.observe(viewportRef.current)
    resizeObserver.observe(content)
    const pageImage = content instanceof HTMLImageElement ? content : null
    pageImage?.addEventListener('load', measure)
    measure()
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) start()
      else stop()
    }, { threshold: 0.08 })
    observer.observe(figure)
    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => { observer.disconnect(); resizeObserver.disconnect(); pageImage?.removeEventListener('load', measure); stop(); document.removeEventListener('visibilitychange', handleVisibility) }
  }, [kind, reducedMotion])

  const mediaContent = kind === 'video'
    ? <>
      <img className={`case-selected-works__poster${isPlaying && !hasFailed ? ' is-hidden' : ''}`} src={poster} alt="" aria-hidden="true" />
      <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={title} onLoadedMetadata={(event) => { event.currentTarget.playbackRate = playbackRate }} onPlaying={() => { setIsPlaying(true); setHasFailed(false) }} onPause={() => setIsPlaying(false)} onError={() => setHasFailed(true)} />
    </>
    : <img ref={mediaRef} className="case-selected-works__design-page" src={src} alt={`${title} — Figma design preview`} loading="lazy" />

  return <figure className={`case-selected-works__figure case-selected-works__figure--${mode} ${className}`} ref={figureRef}>
    {isImac ? <div className="case-selected-works__mockup case-selected-works__mockup--imac">
      <div className="case-selected-works__screen case-selected-works__screen--imac" ref={viewportRef}>{mediaContent}</div>
      <img className="case-selected-works__mockup-frame" src="/images/mockups/imac-frame-transparent.png" alt="" aria-hidden="true" />
    </div> : isPhone ? <div className="case-selected-works__mockup case-selected-works__mockup--phone">
      <div className="case-selected-works__screen case-selected-works__screen--phone" ref={viewportRef}>{mediaContent}</div>
      <span className="case-selected-works__phone-island" aria-hidden="true" />
    </div> : <div className="case-selected-works__screen case-selected-works__screen--plain">{mediaContent}</div>}
    {!hideCaption && <figcaption className="case-selected-works__mockup-caption">{caption || <><span>{label}</span><span>{title}</span></>}</figcaption>}
  </figure>
}

const planningStages = [
  {
    number: '01',
    title: '시장·브랜드 리서치',
    subtitle: 'MARKET & BRAND RESEARCH',
    body: 'STEEP·3C 분석과 자사·경쟁 서비스 비교로 브랜드 경험과 정보 구조의 맥락을 정리했습니다. 분석 기준을 세워 개선이 필요한 접점을 좁혔습니다.',
    images: [
      { label: 'STEEP', detailTitle: 'STEEP 분석', detail: '사회·기술·경제·환경·정책 변화를 검토해 모빌리티 브랜드와 오프라인 경험이 확장되는 배경을 살폈습니다.', src: '/images/hyundai/planning/01-research/research-steep.png.png', alt: '현대 모터스튜디오 STEEP 분석 보드' },
      { label: '3C', detailTitle: '3C 분석', detail: '고객·경쟁 환경·브랜드 관점에서 리뉴얼의 범위와 비교 기준을 정리했습니다.', src: '/images/hyundai/planning/01-research/research-3c.png.png', alt: '고객, 경쟁사, 자사를 비교한 3C 분석 보드' },
      { label: '시장 환경 및 근거 조사', detailTitle: '시장 환경 및 근거 조사', detail: '자동차 시장 변화와 브랜드 경험, 온·오프라인 경험의 연결을 살펴보기 위한 근거 자료를 정리했습니다.', src: '/images/hyundai/planning/01-research/research-background-evidence.png.png', alt: '현대 모터스튜디오 시장 환경 및 근거 조사 보드' },
      { label: '경쟁사 분석', detailTitle: '경쟁사 분석', detail: 'Mercedes-Benz Museum, BMW Welt, Genesis Space의 콘텐츠 구성과 탐색 경로를 비교했습니다.', src: '/images/hyundai/planning/01-research/research-competitor.png.png', alt: '현대 모터스튜디오 경쟁사 웹사이트 비교 보드' },
      { label: '자사 분석', detailTitle: '자사 분석', detail: '기존 사이트의 메뉴, 콘텐츠 진입점, 지점·예약 정보 배치를 조사해 개선 과제를 기록했습니다.', src: '/images/hyundai/planning/01-research/research-brand-audit.png.png', alt: '현대 모터스튜디오 자사 분석 보드' },
    ],
  },
  {
    number: '02',
    title: '사용자 리서치',
    subtitle: 'USER RESEARCH',
    body: '설문과 사용자 분석 자료를 검토해 콘텐츠 이해와 탐색 과정에서 반복되는 요구를 묶었습니다. 정량 응답과 정성 관찰을 함께 읽으며 우선 살펴볼 사용 맥락을 정리했습니다.',
    images: [
      { label: '설문조사', detailTitle: '설문조사', detail: '기존 웹사이트 이용 경험과 콘텐츠 이해도를 살펴보기 위해 설문 결과를 분석했습니다.', src: '/images/hyundai/planning/02-user-research/user-survey-form.png.png', alt: '현대 모터스튜디오 사용자 설문조사 양식' },
      { label: '설문 결과', detailTitle: '설문 결과', detail: '콘텐츠의 중요도·참여 가능 여부·운영 상태를 이해하기 어렵다는 응답 경향을 확인하고, 문제 파악의 근거로 활용했습니다.', src: '/images/hyundai/planning/02-user-research/user-survey-results.png.png', alt: '현대 모터스튜디오 사용자 설문조사 결과' },
      { label: '어피니티 다이어그램', detailTitle: '어피니티 다이어그램', detail: '사용자 관찰과 응답에서 공통으로 나타난 요구를 주제별로 묶었습니다.', src: '/images/hyundai/planning/02-user-research/user-affinity-diagram.png.png', alt: '현대 모터스튜디오 사용자 어피니티 다이어그램' },
    ],
  },
  {
    number: '03',
    title: 'UX 전략',
    subtitle: 'UX STRATEGY',
    body: '퍼소나·저니맵·린 캔버스를 사용해 사용자 유형과 과업, 과정별 막힘을 시각화했습니다. 이를 바탕으로 페이지 개선 과제와 설계 가설을 정리했습니다.',
    images: [
      { label: '사용자 퍼소나', detailTitle: '사용자 퍼소나', detail: '조사에서 확인한 요구를 사용자 유형과 방문 맥락으로 정리했습니다.', src: '/images/hyundai/planning/03-ux-strategy/ux-persona-board.png.png', alt: '현대 모터스튜디오 사용자 퍼소나 전체 보드' },
      { label: '저니맵', detailTitle: '저니맵', detail: '탐색부터 예약·방문 결정까지의 주요 과업과 불편 지점을 여정 단계에 따라 표시했습니다.', src: '/images/hyundai/planning/03-ux-strategy/ux-user-journey-map.png.png', alt: '현대 모터스튜디오 사용자 저니맵' },
      { label: '린 캔버스', detailTitle: '린 캔버스', detail: '문제 정의, 해결 가설과 확인할 항목을 한 화면에 정리했습니다.', src: '/images/hyundai/planning/03-ux-strategy/ux-lean-canvas.png.png', alt: '현대 모터스튜디오 린 캔버스' },
    ],
  },
  {
    number: '04',
    title: '정보 구조',
    subtitle: 'INFORMATION ARCHITECTURE',
    body: '메뉴트리와 사용자 플로우로 페이지 간 관계와 이동 경로를 정리하고, 각 화면에 필요한 정보를 요구사항으로 구체화했습니다.',
    images: [
      { label: '팀 회의', detailTitle: '팀 회의', detail: '페이지와 기능별 작업 항목을 나누고 팀 안에서 담당 범위를 조율했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-team-meeting-notes.png.png', alt: '현대 모터스튜디오 정보 구조 팀 회의 기록' },
      { label: '메뉴트리', detailTitle: '메뉴트리', detail: '차량·시승, 전시·프로그램, 이용안내와 지점 콘텐츠의 위계와 연결 관계를 정리했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-menu-tree.png.png', alt: '현대 모터스튜디오 메뉴트리' },
      { label: '사용자 플로우', detailTitle: '사용자 플로우', detail: '전시·프로그램 탐색, 지점·일정 확인, 예약 시도의 화면 간 이동을 정리했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-user-flow.png.png', alt: '현대 모터스튜디오 사용자 플로우' },
      { label: '요구사항 정의', detailTitle: '요구사항 정의', detail: '주요 콘텐츠 노출, 지점 정보, 예약 CTA 등 화면별 필수 요소를 기록했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-requirements.png.png', alt: '현대 모터스튜디오 화면 요구사항 정의서' },
    ],
  },
  {
    number: '05',
    title: '비주얼 디렉션',
    subtitle: 'VISUAL DIRECTION',
    body: '팀의 시각 방향과 레퍼런스를 바탕으로 전시 서브페이지의 이미지 비중, 타이포그래피, 색상과 간격을 조율했습니다.',
    images: [
      { label: '디자인 마인드맵', detailTitle: '디자인 마인드맵', detail: '모던함·고급스러움·역동성·자유로움을 키워드로 묶고 컬러와 서체 방향을 정리했습니다.', src: '/images/hyundai/planning/05-visual-direction/visual-mindmap.png.png', alt: '현대 모터스튜디오 디자인 마인드맵' },
    ],
  },
  {
    number: '06',
    title: 'UI 디자인',
    subtitle: 'UI DESIGN',
    body: '정리한 구조를 담당 화면으로 구현하고, 반응형 레이아웃과 선택·전환·이동 동작을 점검해 설계와 실제 화면 사이의 차이를 보완했습니다.',
    images: [
      { label: '와이어프레임', detailTitle: '와이어프레임', detail: '화면별 정보 위계와 콘텐츠 배치를 디자인 전에 정리했습니다.', src: '/images/hyundai/planning/06-ui-design/design-wireframe.png.png', alt: '현대 모터스튜디오 와이어프레임' },
      { label: '스타일 가이드', detailTitle: '스타일 가이드', detail: 'Red Hat Display·SUIT 서체와 흑백·블루·레드 팔레트의 사용 기준을 정리했습니다.', src: '/images/hyundai/planning/06-ui-design/design-style-guide.png.png', alt: '현대 모터스튜디오 스타일 가이드' },
    ],
  },
]

const imageDisplay = {
  '/images/hyundai/planning/01-research/research-steep.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/01-research/research-3c.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/01-research/research-background-evidence.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/01-research/research-competitor.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/01-research/research-brand-audit.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/02-user-research/user-survey-form.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/02-user-research/user-survey-results.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/02-user-research/user-affinity-diagram.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/03-ux-strategy/ux-persona-board.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/03-ux-strategy/ux-user-journey-map.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/03-ux-strategy/ux-lean-canvas.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/04-information-architecture/ia-team-meeting-notes.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/04-information-architecture/ia-menu-tree.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/04-information-architecture/ia-user-flow.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/04-information-architecture/ia-requirements.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/05-visual-direction/visual-mindmap.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/06-ui-design/design-wireframe.png.png': { fit: 'contain', position: 'center center' },
  '/images/hyundai/planning/06-ui-design/design-style-guide.png.png': { fit: 'contain', position: 'center center' },
}

const contributionItems = [
  { number: '01', eyebrow: 'UX PLANNING & DEVELOPMENT', title: <>흩어진 경험을 하나의 <em>탐색 흐름으로 정리하다.</em></>, body: ['시장·브랜드와 경쟁 서비스를 조사하고 STEP 1–3의 선택 기준을 구체화했습니다.', '선택에 따른 추천 결과를 구현하고, 상세·예약 데이터 연결 구조와 화면 이동을 검토했습니다.'] },
  { number: '02', eyebrow: 'UI DESIGN', title: <>기획 의도를 실제 <em>화면으로 구체화하다.</em></>, body: ['전시 서브페이지의 와이어프레임부터 이미지 구성, 타이포그래피, 시각적 위계까지 설계하고 브랜드 경험에 맞는 화면으로 발전시켰습니다.'], images: [{ src: '/images/hyundai/contribution/exhibition-work-01.jpg.jpg', width: 4284, height: 5712, alt: '현대 모터스튜디오 전시 서브페이지 작업 화면을 검토하는 모습' }, { src: '/images/hyundai/contribution/exhibition-work-02.jpg.jpg', width: 4284, height: 5712, alt: '현대 모터스튜디오 전시 서브페이지 작업 사진' }] },
  { number: '03', eyebrow: 'VEHICLE EXHIBITION DESIGN', title: <>차량 콘텐츠의 <em>시각적 위계를 설계하다.</em></>, body: ['메인페이지 Vehicle Exhibition의 UI 디자인을 담당해 차량 이미지와 차종명, 원형 비주얼의 구성 및 정보 위계를 설계했습니다.', '공식 프로젝트 종료 후에는 차량 이미지·배경과 노출 순서를 조정하고 구현 화면을 검수했습니다.'] },
  { number: '04', eyebrow: 'COLLABORATION', title: <>서로 다른 작업을 하나의 <em>결과로 연결하다.</em></>, body: ['지점별 소개 페이지의 초기 레이아웃과 공지·회원가입·로그인의 기본 레이아웃 구조를 구현했습니다.', '이후 팀원과 세부 UI를 수정·보완하고, 컴포넌트 통합·Git 협업·반응형 검수를 진행했습니다.'], images: [{ src: '/images/hyundai/teamwork/team-work-process.jpg.jpg', width: 4000, height: 3000, alt: '현대 모터스튜디오 팀이 디자인과 구현 화면을 함께 작업하는 모습' }, { src: '/images/hyundai/teamwork/team-review-01.jpg.jpg', width: 4284, height: 5712, alt: '현대 모터스튜디오 팀 프로젝트 화면 검토 사진' }, { src: '/images/hyundai/teamwork/team-meeting-02.jpg.jpg', width: 4284, height: 5712, alt: '현대 모터스튜디오 팀 회의 사진' }, { src: '/images/hyundai/teamwork/team-final-presentation-02.jpg.jpg', width: 1400, height: 1050, alt: '현대 모터스튜디오 팀 프로젝트 최종 발표 사진' }] },
]

function CaseDetails({ eyebrow, heading, summary, role, details, titleId }) {
  return <div className="case-selected-works__details">
    <div className="case-selected-works__details-heading">
      <p className="case-selected-works__eyebrow">{eyebrow}</p>
      <h3 id={titleId}>{heading}</h3>
      <p className="case-selected-works__summary">{summary}</p>
    </div>
    <div className="case-selected-works__case-notes-details">{details.map(([label, body]) => <section key={label}><span>{label}</span><p>{body}</p></section>)}<section className="case-selected-works__role"><span>MY ROLE</span><p>{role}</p></section></div>
  </div>
}

function ProcessStage({ stage, isActive, isLightboxOpen, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [outgoingImage, setOutgoingImage] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [controlsFocused, setControlsFocused] = useState(false)
  const controlsRef = useRef(null)
  const wasActive = useRef(false)
  const activeImage = stage.images[activeIndex]
  const display = imageDisplay[activeImage.src] ?? { fit: 'contain', position: 'center center' }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isActive && !wasActive.current) setActiveIndex(0)
    wasActive.current = isActive
  }, [isActive])

  useEffect(() => {
    if (!isActive || isLightboxOpen || controlsFocused || reducedMotion || stage.images.length < 2) return undefined
    const timer = window.setTimeout(() => selectImage((activeIndex + 1) % stage.images.length), 5000)
    return () => window.clearTimeout(timer)
  }, [activeIndex, controlsFocused, isActive, isLightboxOpen, reducedMotion, stage.images.length])

  useEffect(() => {
    if (!outgoingImage) return undefined
    const timer = window.setTimeout(() => setOutgoingImage(null), 650)
    return () => window.clearTimeout(timer)
  }, [outgoingImage])

  const handleControlsBlur = () => requestAnimationFrame(() => setControlsFocused(controlsRef.current?.contains(document.activeElement) ?? false))
  const selectImage = (nextIndex) => {
    if (nextIndex === activeIndex) return
    setOutgoingImage(activeImage)
    setActiveIndex(nextIndex)
  }

  return <article className={`case-process__stage${isActive ? ' is-active' : ''}`}>
    <div className="case-process__media-column">
      <button className="case-process__media" type="button" onClick={() => onOpen({ ...activeImage, label: `${stage.subtitle} / ${activeImage.label}`, title: stage.title }, stage.number)} aria-label={`${activeImage.label} 원본 이미지 확대`}>
        <img className="is-current" src={activeImage.src} alt={activeImage.alt} loading="lazy" decoding="async" style={{ objectFit: display.fit, objectPosition: display.position }} />
        {outgoingImage && <img className="is-outgoing" src={outgoingImage.src} alt="" aria-hidden="true" style={{ objectFit: imageDisplay[outgoingImage.src]?.fit ?? 'contain', objectPosition: imageDisplay[outgoingImage.src]?.position ?? 'center center' }} />}
      </button>
      {stage.images.length > 1 && <div className="case-process__controls" ref={controlsRef} aria-label={`${stage.title} 이미지 선택`} onFocusCapture={() => setControlsFocused(true)} onBlurCapture={handleControlsBlur}>
        {stage.images.map((image, index) => <button key={image.src} type="button" className={index === activeIndex ? 'is-active' : ''} aria-pressed={index === activeIndex} onClick={() => selectImage(index)}>{image.label}</button>)}
      </div>}
    </div>
    <div className="case-process__content">
      <p className="case-process__index">PROCESS {stage.number} / 06</p>
      <h3>{stage.title}</h3>
      <p className="case-process__subtitle">{stage.subtitle}</p>
      <p className="case-process__body-slot">{stage.body}</p>
      <div className="case-process__detail" key={activeImage.src} aria-live="off">
        <h4>{activeImage.detailTitle}</h4>
        <p>{activeImage.detail}</p>
      </div>
    </div>
  </article>
}

gsap.registerPlugin(ScrollTrigger)

export default function HyundaiCaseStudy() {
  const [activeImage, setActiveImage] = useState(null)
  const [activeProcess, setActiveProcess] = useState(null)
  const [lightboxProcess, setLightboxProcess] = useState(null)
  const [usesHorizontalProcess, setUsesHorizontalProcess] = useState(false)
  const activeProcessRef = useRef(null)
  const processRef = useRef(null)
  const processRoadRef = useRef(null)
  const processRoadPathRef = useRef(null)
  const processRoadCarRef = useRef(null)
  const contributionRef = useRef(null)
  const selectedWorksRef = useRef(null)
  const setVisibleProcess = (processNumber) => {
    if (activeProcessRef.current === processNumber) return
    activeProcessRef.current = processNumber
    setActiveProcess(processNumber)
  }
  const openImage = (image, processNumber = null) => {
    setLightboxProcess(processNumber)
    if (processNumber) setVisibleProcess(processNumber)
    setActiveImage(image)
  }
  const closeImage = () => {
    setActiveImage(null)
    if (lightboxProcess) setVisibleProcess(lightboxProcess)
    setLightboxProcess(null)
  }
  const heroImage = { ...project.hero, label: 'FIGMA / WIREFRAME & UI DESIGN' }
  const { experienceFinder, exhibitionExperience, vehicleExhibition } = project.selectedWorks

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)')
    const update = () => setUsesHorizontalProcess(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const items = [...(contributionRef.current?.querySelectorAll('.case-contribution__item') ?? [])]
        items.forEach((item) => {
          gsap.fromTo(item, { y: 72, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, ease: 'none',
            scrollTrigger: { trigger: item, start: 'top 94%', end: 'top 58%', scrub: true, invalidateOnRefresh: true },
          })
        })
      })
      return () => media.revert()
    })
    return () => context.revert()
  }, [])

  useLayoutEffect(() => {
    const section = selectedWorksRef.current
    if (!section) return undefined
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      // Keep the desktop breakpoint aligned with the requested 1024px fallback;
      // browser chrome must not disable stacking by reducing innerHeight.
      media.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = [...section.querySelectorAll('.case-selected-works__group')]
        if (panels.length !== 3) return undefined

        let timeline
        try {
          section.classList.add('is-stacked')
          gsap.set(panels[0], { yPercent: 0, zIndex: 1 })
          gsap.set(panels[1], { yPercent: 105, zIndex: 2 })
          gsap.set(panels[2], { yPercent: 105, zIndex: 3 })
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${window.innerHeight * 4.45}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
        } catch (error) {
          section.classList.remove('is-stacked')
          panels.forEach((panel) => {
            panel.style.removeProperty('transform')
            panel.style.removeProperty('z-index')
          })
          console.error('SELECTED SOLUTIONS scroll setup failed; showing all panels in document flow.', error)
          return undefined
        }

        // Each panel holds before the following panel rises over it.
        timeline.to(panels[1], { yPercent: 0, duration: 0.72, ease: 'none' }, 1)
        timeline.to(panels[2], { yPercent: 0, duration: 0.72, ease: 'none' }, 2.72)
        timeline.to({}, { duration: 1.01 }, 3.44)
        let isActive = true
        document.fonts?.ready.then(() => {
          if (isActive) ScrollTrigger.refresh()
        })
        return () => {
          isActive = false
          timeline.kill()
          timeline.scrollTrigger?.kill()
          section.classList.remove('is-stacked')
          gsap.set(panels, { clearProps: 'transform,zIndex' })
        }
      })
      return () => media.revert()
    }, section)
    return () => context.revert()
  }, [])

  useEffect(() => {
    if (usesHorizontalProcess) return undefined
    const stage = processRef.current
    const panels = [...stage?.querySelectorAll('.case-process__stage') ?? []]
    if (!panels.length) return undefined

    let frame = 0
    const updateActiveProcess = () => {
      frame = 0
      const viewportCenter = window.innerHeight / 2
      const visiblePanels = panels
        .map((panel) => {
          const rect = panel.getBoundingClientRect()
          return { panel, rect, visible: Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) }
        })
        .filter(({ visible }) => visible > 0)
      if (!visiblePanels.length) {
        setVisibleProcess(null)
        return
      }
      const activePanel = visiblePanels.reduce((nearest, candidate) => {
        const nearestDistance = Math.abs(((nearest.rect.top + nearest.rect.bottom) / 2) - viewportCenter)
        const candidateDistance = Math.abs(((candidate.rect.top + candidate.rect.bottom) / 2) - viewportCenter)
        return candidateDistance < nearestDistance ? candidate : nearest
      })
      setVisibleProcess(activePanel.panel.querySelector('.case-process__index')?.textContent.match(/PROCESS (\d+)/)?.[1] ?? null)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveProcess)
    }
    updateActiveProcess()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [usesHorizontalProcess])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const stage = processRef.current
        const track = stage?.querySelector('.case-process__track')
        if (!stage || !track) return undefined
        let panelWidth = 0
        const syncPanelWidth = () => {
          const nextWidth = stage.clientWidth
          // Pinning can change clientWidth by a single pixel without a viewport resize.
          // Ignore that rounding adjustment so it cannot trigger a refresh mid-scroll.
          if (!nextWidth || Math.abs(nextWidth - panelWidth) < 2) return false
          panelWidth = nextWidth
          stage.style.setProperty('--process-panel-width', `${nextWidth}px`)
          return true
        }
        syncPanelWidth()
        gsap.set(track, { x: 0 })
        const travelDistance = () => track.scrollWidth - stage.clientWidth
        const placeRoadCar = (progress) => {
          const roadPath = processRoadPathRef.current
          const roadCar = processRoadCarRef.current
          if (!roadPath || !roadCar) return
          const pathLength = roadPath.getTotalLength()
          // The road, lane markings, and car all share this path's SVG space.
          // Leave a small distance at each end so the car enters and exits inside
          // the continuous road rather than on its clipped extension.
          const currentLength = pathLength * (0.06 + (progress * 0.88))
          const point = roadPath.getPointAtLength(currentLength)
          const nextPoint = roadPath.getPointAtLength(Math.min(pathLength, currentLength + 2))
          // The stone car image faces right at zero degrees. Its group rotates
          // around the same point used by the road's centre path.
          const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)
          roadCar.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
          roadCar.setAttribute('opacity', '.86')
        }
        const animation = gsap.to(track, {
          x: () => -travelDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            // Keep vertical input directly coupled to the horizontal track.
            // There is no dwell or panel snap between PROCESS stages.
            end: () => `+=${Math.max(travelDistance() * 1.1, window.innerHeight)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => setVisibleProcess('01'),
            onEnterBack: () => setVisibleProcess('06'),
            onLeave: () => setVisibleProcess(null),
            onLeaveBack: () => setVisibleProcess(null),
            onUpdate: (trigger) => {
              placeRoadCar(trigger.progress)
              const panelWidthValue = stage.clientWidth
              const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
              const viewportCenter = (travelDistance() * trigger.progress) + (panelWidthValue / 2)
              const panelIndex = Math.min(planningStages.length - 1, Math.max(0, Math.round((viewportCenter - (panelWidthValue / 2)) / (panelWidthValue + gap))))
              setVisibleProcess(planningStages[panelIndex].number)
            },
            onRefresh: (trigger) => placeRoadCar(trigger.progress),
          },
        })
        placeRoadCar(0)
        let previousStageHeight = stage.clientHeight
        const refreshForLayoutChange = () => {
          const widthChanged = syncPanelWidth()
          const nextStageHeight = stage.clientHeight
          const heightChanged = Math.abs(nextStageHeight - previousStageHeight) > 1
          if (heightChanged) previousStageHeight = nextStageHeight
          if (widthChanged || heightChanged) ScrollTrigger.refresh()
        }
        const images = [...track.querySelectorAll('img')].filter((image) => !image.complete)
        images.forEach((image) => image.addEventListener('load', refreshForLayoutChange, { once: true }))
        const resizeObserver = new ResizeObserver(refreshForLayoutChange)
        resizeObserver.observe(stage)
        document.fonts?.ready.then(() => {
          // The preceding PROCESS pin must be measured before the later insight pin.
          ScrollTrigger.sort()
          ScrollTrigger.refresh()
        })
        return () => {
          images.forEach((image) => image.removeEventListener('load', refreshForLayoutChange))
          resizeObserver.disconnect()
          animation.kill()
        }
      })
      return () => media.revert()
    }, processRef)
    return () => context.revert()
  }, [])

  return <section className="case-study case-study--hyundai" id="hyundai-case-study" aria-label="Hyundai Motorstudio project case study">
    <section className="case-hero" aria-labelledby="hyundai-title">
      <div className="case-hero__copy">
        <h1 id="hyundai-title">HYUNDAI<br /><em>MOTORSTUDIO</em></h1>
        <div className="case-hero__bottom"><p>{project.overview}</p><p className="case-hero__contribution">{project.contributionSummary}</p></div>
      </div>
      <EvidenceFigure image={heroImage} onOpen={openImage} className="case-hero__figure" />
    </section>

    <section className="case-section case-section--dark case-section--challenge">
      <SectionIntro index="01" eyebrow="CHALLENGE" title={<>SCATTERED CONTENT<br />DISCONNECTED VISITS.</>} body="자사 사이트와 비교 서비스를 살펴보며 콘텐츠 탐색, 지점 정보, 예약 안내가 각각 끊기는 지점을 확인했습니다." className="case-section__intro--editorial" />
      <div className="case-problems"><p>01 <strong>온라인에서 공간과 전시의 특징을 파악하기 어려움</strong></p><p>02 <strong>관심사와 방문 목적에 맞는 경험을 좁혀 찾기 어려움</strong></p><p>03 <strong>상세 콘텐츠 이후 지점·예약 정보로 이동하는 경로가 나뉨</strong></p></div>
    </section>

    <section className="case-section case-selected-works" id="selected-works" aria-label="SELECTED SOLUTIONS" ref={selectedWorksRef}>
      <header className="case-selected-works__intro">
        <div className="case-selected-works__intro-meta"><span>02</span><p>SELECTED SOLUTIONS</p></div>
        <h2>SELECTED SOLUTIONS.</h2>
        <p className="case-selected-works__intro-body">관심사 기반 경험찾기와 전시 서브페이지의 구현, 메인 차량 전시 디자인까지 세 가지 대표 작업을 소개합니다.</p>
      </header>
      <div className="case-selected-works__content">
        <article className="case-selected-works__group case-selected-works__group--finder" aria-labelledby="selected-work-finder-title">
          <SelectedWorkMedia src={experienceFinder.video} poster={experienceFinder.poster} label={experienceFinder.mediaLabel} title={experienceFinder.mediaTitle} caption="INTEREST-BASED EXPERIENCE FINDER" className="case-selected-works__video--finder" mode="imac" playbackRate={experienceFinder.playbackRate} />
          <CaseDetails eyebrow={experienceFinder.eyebrow} heading={experienceFinder.heading} summary="STEP 1–3에서 관심사와 방문 목적을 선택하고, 추천 결과에서 관련 상세·예약 정보로 이동하는 탐색 흐름입니다." role={experienceFinder.role} titleId="selected-work-finder-title" details={[
            ['DESIGN APPROACH', '관심사와 방문 목적을 중심으로 탐색 구조를 정리하고, 단계별 선택과 추천 기준을 명확히 했습니다.'],
            ['KEY SOLUTION', 'STEP 1–3 선택 결과에 전시·프로그램·시승 추천을 연결하고, 중복 결과를 대표 경험 단위로 정리했습니다.'],
            ['VALIDATION', '선택 입력과 추천 결과를 구현하고, 상세·예약 데이터 연결 구조와 화면 이동을 검토했습니다.'],
          ]} />
        </article>

        <article className="case-selected-works__group case-selected-works__group--exhibition" aria-labelledby="selected-work-exhibition-title">
          <div className="case-selected-works__exhibition-visuals">
            <div className="case-selected-works__device-stage" role="group" aria-label="Exhibition desktop and mobile mockups">
              <div className="case-selected-works__exhibition-desktop">
                <p className="case-selected-works__device-label">DESKTOP EXPERIENCE</p>
                <SelectedWorkMedia src={exhibitionExperience.designPage} label="DESKTOP / FIGMA DESIGN SCROLL" title="전시 데스크톱 완성 디자인" className="case-selected-works__video--exhibition" mode="imac" kind="design" hideCaption />
              </div>
              <div className="case-selected-works__responsive">
                <p className="case-selected-works__device-label">MOBILE EXPERIENCE</p>
                <SelectedWorkMedia mode="phone" kind="design" src={exhibitionExperience.mobileDesignPage} label="MOBILE / FIGMA SCROLL" title="모바일 반응형 디자인" hideCaption />
              </div>
            </div>
            <p className="case-selected-works__mockup-caption">RESPONSIVE EXHIBITION DESIGN</p>
          </div>
          <CaseDetails eyebrow={exhibitionExperience.eyebrow} heading="전시를 경험하는 새로운 방식." summary="이미지와 타이포그래피, 스크롤 전환을 결합해 전시의 분위기와 정보를 순서대로 경험하도록 구성한 화면입니다." role={exhibitionExperience.role} titleId="selected-work-exhibition-title" details={[
            ['DESIGN APPROACH', 'Hero와 EXPERIENCE PREVIEW를 하나의 탐색 흐름으로 구성하고, 전시 콘텐츠의 등장 순서를 설계했습니다.'],
            ['KEY SOLUTION', '공통 반응형 구조 안에서 스크롤 기반 이미지와 타이포그래피를 전환해 콘텐츠를 단계적으로 경험하도록 구현했습니다.'],
            ['VALIDATION', '디자인과 구현 화면을 비교하고, 주요 스크롤 인터랙션과 반응형 동작을 확인했습니다.'],
          ]} />
        </article>

        <article className="case-selected-works__group case-selected-works__group--vehicle" aria-labelledby="selected-work-vehicle-title">
          <div className="case-selected-works__vehicle-visual">
            <SelectedWorkMedia src={vehicleExhibition.video} poster={vehicleExhibition.poster} label={vehicleExhibition.mediaLabel} title={vehicleExhibition.mediaTitle} className="case-selected-works__video--vehicle" mode="imac" playbackRate={vehicleExhibition.playbackRate} hideCaption />
            <p className="case-selected-works__mockup-caption">INTERACTIVE VEHICLE EXHIBITION</p>
          </div>
          <CaseDetails eyebrow="03 / VEHICLE EXHIBITION" heading="차량을 탐색하는 시각적 흐름." summary="차량 이미지와 차종명이 연동되는 원형 비주얼을 활용해, 다양한 차량을 하나의 흐름에서 탐색하도록 구성한 메인페이지 콘텐츠입니다." role="MAIN PAGE · VEHICLE EXHIBITION UI DESIGN · VISUAL CONTENT" titleId="selected-work-vehicle-title" details={[
            ['DESIGN APPROACH', '차량 이미지의 배치와 원형 비주얼, 차종명과 이미지의 관계를 정리해 차량 콘텐츠의 정보 위계를 설계했습니다.'],
            ['KEY SOLUTION', '메인페이지 화면에 원형 차량 비주얼과 차종명 전환을 적용해 여러 차량을 이어서 살펴보도록 구성했습니다. 차량 이미지와 차종명 전환은 제공된 구현 영상에서 확인할 수 있습니다.'],
            ['VALIDATION', '공식 프로젝트 종료 후 차량 이미지와 배경, 노출 순서를 조정하고 구현 화면을 검수했습니다.'],
          ]} />
        </article>
      </div>
    </section>

    <section className="case-section case-section--process" aria-labelledby="process-title">
      <SectionIntro index="03" eyebrow="PROCESS" title={<>RESEARCH TO<br /><em>DESIGN.</em></>} className="case-section__intro--editorial" />
      <div className="case-process-horizontal" ref={processRef} aria-label="현대 모터스튜디오 기획 과정">
        <div className="case-process-road" ref={processRoadRef} aria-hidden="true">
          <div className="case-process-road__world">
            <svg className="case-process-road__motion-path" viewBox="0 0 2000 900" preserveAspectRatio="xMidYMid meet">
              <path className="case-process-road__edge" d="M -120 684 C 175 603, 411 694, 679 654 S 1174 568, 1435 650 S 1788 731, 2120 638" />
              <path className="case-process-road__surface" d="M -120 684 C 175 603, 411 694, 679 654 S 1174 568, 1435 650 S 1788 731, 2120 638" />
              <path className="case-process-road__lane" d="M -120 684 C 175 603, 411 694, 679 654 S 1174 568, 1435 650 S 1788 731, 2120 638" />
              <path className="case-process-road__guide" ref={processRoadPathRef} d="M -120 684 C 175 603, 411 694, 679 654 S 1174 568, 1435 650 S 1788 731, 2120 638" />
              <g className="case-process-road__car" ref={processRoadCarRef} opacity="0">
                <image href="/images/decorations/stone-car.png.png" x="-40.5" y="-32.5" width="84" height="57" />
              </g>
            </svg>
          </div>
        </div>
        <div className="case-process__viewport">
          <div className="case-process__track">{planningStages.map((stage) => <ProcessStage key={stage.number} stage={stage} isActive={activeProcess === stage.number} isLightboxOpen={Boolean(activeImage)} onOpen={openImage} />)}</div>
        </div>
      </div>
    </section>

    <section className="case-section case-contribution" aria-label="My Contribution">
      <SectionIntro index="04" eyebrow="MY CONTRIBUTION" title={<>THE WORK<br /><em>I CONNECTED.</em></>} body="프로젝트 전반의 기획 참여, 직접 맡은 디자인·구현, 협업 지원 범위를 구분했습니다." className="case-section__intro--editorial" />
      <div className="case-contribution__items" ref={contributionRef}>
        {contributionItems.map((item) => <article className="case-contribution__item" key={item.number}>
          <div className="case-contribution__meta"><p>{item.eyebrow}</p></div>
          <h3>{item.title}</h3>
          <p>{item.body.map((sentence) => <span className="case-copy__sentence" key={sentence}>{sentence}</span>)}</p>
          {item.images && <div className={`case-contribution__media case-contribution__media--${item.number}`}>
            {item.images.map((image) => <figure key={image.src}><img src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" /></figure>)}
          </div>}
        </article>)}
      </div>
    </section>

    <footer className="case-closing"><div className="case-closing__message"><p className="case-closing__label">05 / PROJECT REFLECTION</p><h2><span className="case-closing__line">설계를 화면으로,</span><br /><em className="case-closing__line">화면을 흐름으로.</em></h2><p className="case-closing__body"><span>여러 담당 화면을 하나의 경험으로 연결하려면, 기획 의도와 구현 기준을 팀 안에서</span><span>분명히 공유해야 한다는 점을 배웠습니다.</span></p></div></footer>
    {activeImage && <ImageLightbox image={activeImage} onClose={closeImage} />}
  </section>
}
