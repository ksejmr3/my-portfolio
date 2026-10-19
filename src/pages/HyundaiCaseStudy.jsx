import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EvidenceFigure from '../components/EvidenceFigure.jsx'
import ImageLightbox from '../components/ImageLightbox.jsx'
import { hyundaiCaseStudy as project } from '../data/hyundaiCaseStudy.js'

function SectionIntro({ index, eyebrow, title, body }) {
  return <header className="case-section__intro"><span>{index}</span><div><p>{eyebrow}</p><h2>{title}</h2>{body && <p className="case-section__body">{body}</p>}</div></header>
}

function solvePhoneScreenMatrix(scale) {
  const width = 430
  const height = 980
  const corners = [[120, 264], [1442, 83], [2740, 3028], [1417, 3330]].map(([x, y]) => [x * scale, y * scale])
  const source = [[0, 0], [width, 0], [width, height], [0, height]]
  const equations = []
  source.forEach(([x, y], index) => {
    const [u, v] = corners[index]
    equations.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u])
    equations.push([0, 0, 0, x, y, 1, -v * x, -v * y, v])
  })
  for (let column = 0; column < 8; column += 1) {
    let pivot = column
    for (let row = column + 1; row < 8; row += 1) if (Math.abs(equations[row][column]) > Math.abs(equations[pivot][column])) pivot = row
    ;[equations[column], equations[pivot]] = [equations[pivot], equations[column]]
    const divisor = equations[column][column]
    for (let cell = column; cell < 9; cell += 1) equations[column][cell] /= divisor
    for (let row = 0; row < 8; row += 1) {
      if (row === column) continue
      const factor = equations[row][column]
      for (let cell = column; cell < 9; cell += 1) equations[row][cell] -= factor * equations[column][cell]
    }
  }
  const [a, c, e, b, d, f, g, h] = equations.map((row) => row[8])
  return `matrix3d(${a}, ${b}, 0, ${g}, ${c}, ${d}, 0, ${h}, 0, 0, 1, 0, ${e}, ${f}, 0, 1)`
}

const DESIGN_SCROLL_VIEWPORTS_PER_SECOND = 0.27
const DESIGN_SCROLL_ENDPOINT_PAUSE = 750

function SelectedWorkMedia({ src, poster, label, title, className = '', mode = 'laptop', kind = 'video', playbackRate = 1 }) {
  const figureRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRef = useRef(null)
  const viewportRef = useRef(null)
  const mockupRef = useRef(null)
  const phonePlaneRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const isPhone = mode === 'phone'
  const isLaptop = mode === 'laptop'

  useLayoutEffect(() => {
    if (!isPhone || !mockupRef.current || !phonePlaneRef.current) return
    const updateMatrix = () => {
      const scale = mockupRef.current.getBoundingClientRect().width / 2793
      phonePlaneRef.current.style.transform = solvePhoneScreenMatrix(scale)
    }
    const observer = new ResizeObserver(updateMatrix)
    observer.observe(mockupRef.current)
    updateMatrix()
    return () => observer.disconnect()
  }, [isPhone])

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
    const cycleDuration = () => (travelDuration + pauseAfter) * 2
    const readMotion = () => {
      if (!travelDuration) return { segment: 'start', progress: 0, elapsed: 0 }
      const phase = activeElapsed % cycleDuration()
      if (phase < pauseAfter) return { segment: 'start', progress: 0, elapsed: phase }
      if (phase < pauseAfter + travelDuration) return { segment: 'forward', progress: (phase - pauseAfter) / travelDuration }
      if (phase < travelDuration + pauseAfter * 2) return { segment: 'end', progress: 1, elapsed: phase - travelDuration - pauseAfter }
      return { segment: 'reverse', progress: 1 - (phase - travelDuration - pauseAfter * 2) / travelDuration }
    }
    const measure = () => {
      const motion = readMotion()
      const viewportHeight = viewportRef.current?.clientHeight || figure.clientHeight
      distance = Math.max(0, content.scrollHeight - viewportHeight)
      const speed = viewportHeight * DESIGN_SCROLL_VIEWPORTS_PER_SECOND
      travelDuration = distance > 0 && speed > 0 ? (distance / speed) * 1000 : 0
      if (motion.segment === 'forward') activeElapsed = pauseAfter + motion.progress * travelDuration
      else if (motion.segment === 'end') activeElapsed = pauseAfter + travelDuration + motion.elapsed
      else if (motion.segment === 'reverse') activeElapsed = pauseAfter * 2 + travelDuration + (1 - motion.progress) * travelDuration
      else activeElapsed = motion.elapsed
      lastTime = 0
      content.style.transform = `translate3d(0, ${-distance * motion.progress}px, 0)`
    }
    const draw = (time) => {
      frame = null
      if (!isVisible || document.hidden || !content) return
      if (lastTime) activeElapsed += time - lastTime
      lastTime = time
      if (!travelDuration) {
        content.style.transform = 'translate3d(0, 0, 0)'
        frame = requestAnimationFrame(draw)
        return
      }
      const phase = activeElapsed % cycleDuration()
      const progress = phase < pauseAfter
        ? 0
        : phase < pauseAfter + travelDuration
          ? (phase - pauseAfter) / travelDuration
          : phase < travelDuration + pauseAfter * 2
            ? 1
            : 1 - (phase - travelDuration - pauseAfter * 2) / travelDuration
      content.style.transform = `translate3d(0, ${-distance * progress}px, 0)`
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
    {isLaptop ? <div className="case-selected-works__mockup case-selected-works__mockup--laptop" ref={mockupRef}>
      <div className="case-selected-works__screen case-selected-works__screen--laptop" ref={viewportRef}>{mediaContent}</div>
      <img className="case-selected-works__mockup-frame" src="/images/mockups/laptop-mockup-alpha.png" alt="" aria-hidden="true" />
    </div> : isPhone ? <div className="case-selected-works__mockup case-selected-works__mockup--phone" ref={mockupRef}>
      <div className="case-selected-works__phone-plane" ref={phonePlaneRef}><div className="case-selected-works__screen case-selected-works__screen--phone" ref={viewportRef}>{mediaContent}</div></div>
      <img className="case-selected-works__mockup-frame" src="/images/mockups/phone-mockup-alpha.png" alt="" aria-hidden="true" />
    </div> : <div className="case-selected-works__screen case-selected-works__screen--plain">{mediaContent}</div>}
    <figcaption><span>{label}</span><span>{title}</span></figcaption>
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
      { label: '설문조사', detailTitle: '설문조사', detail: '기존 웹사이트 이용 경험과 콘텐츠 이해도를 살펴보기 위해 설문을 진행했습니다.', src: '/images/hyundai/planning/02-user-research/user-survey-form.png.png', alt: '현대 모터스튜디오 사용자 설문조사 양식' },
      { label: '설문 결과', detailTitle: '설문 결과', detail: '12개 응답에서 콘텐츠의 중요도·참여 가능 여부·운영 상태 이해도가 모두 평균 2점대였습니다. 이 결과를 문제 파악의 근거로 활용했습니다.', src: '/images/hyundai/planning/02-user-research/user-survey-results.png.png', alt: '현대 모터스튜디오 사용자 설문조사 결과' },
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
  { number: '01', eyebrow: 'UX PLANNING', title: <>탐색의 기준을<br /><em>구체화하다.</em></>, body: '4인 팀의 UX 기획과 정보 구조 정리를 주도했습니다. 리서치 내용을 메뉴 트리, 요구사항, 사용자 흐름으로 구체화해 화면 설계의 기준을 정리했습니다.' },
  { number: '02', eyebrow: 'CONTENT & DESIGN', title: <>전시 경험을<br /><em>화면으로 옮기다.</em></>, body: '전시 서브페이지를 디자인·구현하며 이미지 구성, 타이포그래피, 간격, 스크롤 전개를 다듬었습니다.', images: [{ src: '/images/hyundai/contribution/exhibition-work-01.jpg.jpg', alt: '현대 모터스튜디오 전시 서브페이지 작업 화면을 검토하는 모습' }, { src: '/images/hyundai/contribution/exhibition-work-02.jpg.jpg', alt: '현대 모터스튜디오 전시 서브페이지 작업 사진' }] },
  { number: '03', eyebrow: 'INTERACTION & DEVELOPMENT', title: <>설계한 흐름을<br /><em>작동하게 하다.</em></>, body: 'Experience Finder STEP 1–3의 선택 인터랙션과 전시 페이지의 스크롤·콘텐츠 전환을 구현했습니다. 데스크톱과 모바일에서 동작을 확인하고 화면 차이를 보완했습니다.' },
  { number: '04', eyebrow: 'COLLABORATION', title: <>연결된 화면을<br /><em>함께 다듬다.</em></>, body: '지점별 소개 페이지는 담당 팀원이 주도했고, 저는 초기 구조와 구현 기반을 지원했습니다. Git으로 변경 사항을 관리하고 담당 화면을 통합하며 팀원과 구현 내용을 맞췄습니다.', images: [{ src: '/images/hyundai/teamwork/team-work-process.jpg.jpg', alt: '현대 모터스튜디오 팀이 디자인과 구현 화면을 함께 작업하는 모습' }, { src: '/images/hyundai/teamwork/team-review-01.jpg.jpg', alt: '현대 모터스튜디오 팀 프로젝트 화면 검토 사진' }, { src: '/images/hyundai/teamwork/team-meeting-02.jpg.jpg', alt: '현대 모터스튜디오 팀 회의 사진' }, { src: '/images/hyundai/teamwork/team-final-presentation-02.jpg.jpg', alt: '현대 모터스튜디오 팀 프로젝트 최종 발표 사진' }] },
]

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
        <img className="is-current" src={activeImage.src} alt={activeImage.alt} style={{ objectFit: display.fit, objectPosition: display.position }} />
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

if (!gsap.plugins.ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

export default function HyundaiCaseStudy() {
  const [activeImage, setActiveImage] = useState(null)
  const [activeProcess, setActiveProcess] = useState(null)
  const [lightboxProcess, setLightboxProcess] = useState(null)
  const [usesHorizontalProcess, setUsesHorizontalProcess] = useState(false)
  const processRef = useRef(null)
  const processRoadRef = useRef(null)
  const processRoadPathRef = useRef(null)
  const processRoadCarRef = useRef(null)
  const openImage = (image, processNumber = null) => {
    setLightboxProcess(processNumber)
    if (processNumber) setActiveProcess(processNumber)
    setActiveImage(image)
  }
  const closeImage = () => {
    setActiveImage(null)
    if (lightboxProcess) setActiveProcess(lightboxProcess)
    setLightboxProcess(null)
  }
  const heroImage = { ...project.hero, label: 'PROJECT BOARD / OVERVIEW', title: 'WIREFRAME & UI DESIGN' }
  const { experienceFinder, exhibitionExperience, vehicleExhibition } = project.selectedWorks

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)')
    const update = () => setUsesHorizontalProcess(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
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
        setActiveProcess(null)
        return
      }
      const activePanel = visiblePanels.reduce((nearest, candidate) => {
        const nearestDistance = Math.abs(((nearest.rect.top + nearest.rect.bottom) / 2) - viewportCenter)
        const candidateDistance = Math.abs(((candidate.rect.top + candidate.rect.bottom) / 2) - viewportCenter)
        return candidateDistance < nearestDistance ? candidate : nearest
      })
      setActiveProcess(activePanel.panel.querySelector('.case-process__index')?.textContent.match(/PROCESS (\d+)/)?.[1] ?? null)
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
        const readingDuration = 1
        const movementDuration = 5
        const timelineDuration = readingDuration + movementDuration + readingDuration
        const animation = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            // Preserve the former horizontal movement distance while adding
            // an equal reading interval before PROCESS 01 begins to move.
            end: () => `+=${Math.max(travelDistance() * 1.6 * (timelineDuration / (movementDuration + readingDuration)), 1)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => setActiveProcess('01'),
            onEnterBack: () => setActiveProcess('06'),
            onLeave: () => setActiveProcess(null),
            onLeaveBack: () => setActiveProcess(null),
            onUpdate: (trigger) => {
              placeRoadCar(trigger.progress)
              const panelWidthValue = stage.clientWidth
              const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
              const movementProgress = Math.min(1, Math.max(0, ((trigger.progress * timelineDuration) - readingDuration) / movementDuration))
              const viewportCenter = (travelDistance() * movementProgress) + (panelWidthValue / 2)
              const panelIndex = Math.min(planningStages.length - 1, Math.max(0, Math.round((viewportCenter - (panelWidthValue / 2)) / (panelWidthValue + gap))))
              setActiveProcess(planningStages[panelIndex].number)
            },
            onRefresh: (trigger) => placeRoadCar(trigger.progress),
          },
        })
        animation
          .to({}, { duration: readingDuration })
          .to(track, { x: () => -travelDistance(), duration: movementDuration })
          .to({}, { duration: readingDuration })
        placeRoadCar(0)
        const refreshForWidthChange = () => {
          if (syncPanelWidth()) ScrollTrigger.refresh()
        }
        const images = [...track.querySelectorAll('img')].filter((image) => !image.complete)
        images.forEach((image) => image.addEventListener('load', refreshForWidthChange, { once: true }))
        const resizeObserver = new ResizeObserver(refreshForWidthChange)
        resizeObserver.observe(stage)
        document.fonts?.ready.then(() => ScrollTrigger.refresh())
        return () => {
          images.forEach((image) => image.removeEventListener('load', refreshForWidthChange))
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
      <div className="case-hero__meta"><p>{project.type}</p><p>PERIOD / {project.period}</p><p>4 PERSON TEAM PROJECT</p></div>
      <h1 id="hyundai-title">HYUNDAI<br /><em>MOTORSTUDIO</em></h1>
      <div className="case-hero__bottom"><div><p>{project.overview}</p><p className="case-hero__contribution">{project.contributionSummary}</p></div><span>SCROLL TO EXPLORE ↓</span></div>
      <EvidenceFigure image={heroImage} onOpen={openImage} className="case-hero__figure" />
    </section>

    <section className="case-section case-section--dark case-section--challenge">
      <SectionIntro index="02" eyebrow="CHALLENGE" title={<>SCATTERED CONTENT<br />DISCONNECTED VISITS.</>} body="자사 사이트와 비교 서비스를 살펴보며 콘텐츠 탐색, 지점 정보, 예약 안내가 각각 끊기는 지점을 확인했습니다." />
      <div className="case-problems"><p>01 <strong>온라인에서 공간과 전시의 특징을 파악하기 어려움</strong></p><p>02 <strong>관심사와 방문 목적에 맞는 경험을 좁혀 찾기 어려움</strong></p><p>03 <strong>상세 콘텐츠 이후 지점·예약 정보로 이동하는 경로가 나뉨</strong></p></div>
    </section>

    <section className="case-section case-section--process" aria-labelledby="process-title">
      <SectionIntro index="03" eyebrow="PROCESS" title={<>RESEARCH TO<br /><em>DESIGN.</em></>} />
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

    <section className="case-section case-section--warm case-insight-decisions" aria-label="INSIGHT & DESIGN DECISIONS">
      <SectionIntro index="04" eyebrow="INSIGHT & DESIGN DECISIONS" title={<>FROM FRICTION<br /><em>TO FLOW.</em></>} body="리서치와 사용자 흐름에서 확인한 요구를 세 가지 화면 설계 기준으로 구체화했습니다." />
      <div className="case-insight-decisions__rows" aria-label="사용자 문제에서 설계 판단과 개선 경험으로 이어지는 세 가지 방향">
        {project.designDecisions.map((item) => <article className="case-insight-decisions__row" key={item.number}>
          <span className="case-insight-decisions__number" aria-hidden="true">{item.number}</span>
          <p className="case-insight-decisions__keyword">{item.keyword}</p>
          <div className="case-insight-decisions__copy">
            <h3 className="case-insight-decisions__statement">{item.statement}</h3>
            <p className="case-insight-decisions__support">{item.support}</p>
          </div>
        </article>)}
      </div>
    </section>
    <section className="case-section case-selected-works" aria-label="SELECTED WORKS">
      <SectionIntro index="05" eyebrow="PROJECT OUTCOMES" title={<>SELECTED<br /><em>WORKS.</em></>} body="실제 구현 영상과 Figma 디자인을 구분해 각 담당 화면의 결과와 인터랙션 근거를 보여줍니다." />
      <div className="case-selected-works__content">
        <article className="case-selected-works__group case-selected-works__group--finder" aria-labelledby="selected-work-finder-title">
          <header className="case-selected-works__heading">
            <p className="case-selected-works__eyebrow">{experienceFinder.eyebrow}</p>
            <h3 id="selected-work-finder-title">{experienceFinder.heading}</h3>
            <p className="case-selected-works__summary">{experienceFinder.summary}</p>
            <p className="case-selected-works__role"><span>MY ROLE</span>{experienceFinder.role}</p>
          </header>
          <SelectedWorkMedia src={experienceFinder.video} poster={experienceFinder.poster} label={experienceFinder.mediaLabel} title={experienceFinder.mediaTitle} className="case-selected-works__video--finder" mode="laptop" playbackRate={experienceFinder.playbackRate} />
        </article>

        <article className="case-selected-works__group case-selected-works__group--exhibition" aria-labelledby="selected-work-exhibition-title">
          <header className="case-selected-works__heading">
            <p className="case-selected-works__eyebrow">{exhibitionExperience.eyebrow}</p>
            <h3 id="selected-work-exhibition-title">{exhibitionExperience.heading}</h3>
            <p className="case-selected-works__summary">{exhibitionExperience.summary}</p>
            <p className="case-selected-works__role"><span>MY ROLE</span>{exhibitionExperience.role}</p>
          </header>
          <SelectedWorkMedia src={exhibitionExperience.designPage} label="DESKTOP / FIGMA DESIGN SCROLL" title="전시 데스크톱 완성 디자인" className="case-selected-works__video--exhibition" mode="laptop" kind="design" />
          <div className="case-selected-works__responsive">
            <div className="case-selected-works__responsive-copy">
              <p className="case-selected-works__eyebrow">RESPONSIVE EXPERIENCE</p>
              <h4>작은 화면에서도<br />이어지는 전시 경험</h4>
              <p>모바일 완성 디자인의 화면 구성과 스크롤 흐름을 보여주는 Figma 미리보기입니다.</p>
            </div>
            <SelectedWorkMedia mode="phone" kind="design" src={exhibitionExperience.mobileDesignPage} label="MOBILE / FIGMA DESIGN SCROLL" title="전시 모바일 디자인 미리보기" />
          </div>
        </article>

        <article className="case-selected-works__group case-selected-works__group--vehicle" aria-labelledby="selected-work-vehicle-title">
          <header className="case-selected-works__heading">
            <p className="case-selected-works__eyebrow">{vehicleExhibition.eyebrow}</p>
            <h3 id="selected-work-vehicle-title">{vehicleExhibition.heading}</h3>
            <p className="case-selected-works__summary">{vehicleExhibition.summary}</p>
            <p className="case-selected-works__role"><span>MY ROLE</span>{vehicleExhibition.role}</p>
          </header>
          <SelectedWorkMedia src={vehicleExhibition.video} poster={vehicleExhibition.poster} label={vehicleExhibition.mediaLabel} title={vehicleExhibition.mediaTitle} className="case-selected-works__video--vehicle" mode="laptop" playbackRate={vehicleExhibition.playbackRate} />
        </article>
      </div>
    </section>

    <section className="case-section case-contribution" aria-label="My Contribution">
      <SectionIntro index="06" eyebrow="MY CONTRIBUTION" title={<>THE WORK<br /><em>I CONNECTED.</em></>} body="프로젝트 전반의 기획 참여, 직접 맡은 디자인·구현, 협업 지원 범위를 구분했습니다." />
      <div className="case-contribution__items">
        {contributionItems.map((item) => <article className="case-contribution__item" key={item.number}>
          <div className="case-contribution__meta"><span>{item.number}</span><p>{item.eyebrow}</p></div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.images && <div className={`case-contribution__media case-contribution__media--${item.number}`}>
            {item.images.map((image) => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" decoding="async" /></figure>)}
          </div>}
        </article>)}
      </div>
    </section>

    <footer className="case-closing"><div className="case-closing__message"><p>PROJECT REFLECTION</p><h2>설계를 화면으로,<br /><em>화면을 흐름으로.</em></h2><p>여러 담당 화면을 하나의 경험으로 연결하려면, 기획 의도와 구현 기준을 팀 안에서 분명히 공유해야 한다는 점을 배웠습니다.</p></div></footer>
    {activeImage && <ImageLightbox image={activeImage} onClose={closeImage} />}
  </section>
}
