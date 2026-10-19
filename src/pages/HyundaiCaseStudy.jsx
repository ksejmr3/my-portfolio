import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EvidenceFigure from '../components/EvidenceFigure.jsx'
import ImageLightbox from '../components/ImageLightbox.jsx'
import { hyundaiCaseStudy as project } from '../data/hyundaiCaseStudy.js'

function SectionIntro({ index, eyebrow, title, body }) {
  return <header className="case-section__intro"><span>{index}</span><div><p>{eyebrow}</p><h2>{title}</h2>{body && <p className="case-section__body">{body}</p>}</div></header>
}

const planningStages = [
  {
    number: '01',
    title: '시장·브랜드 리서치',
    subtitle: 'MARKET & BRAND RESEARCH',
    body: '시장 환경과 경쟁 브랜드의 콘텐츠 구성을 비교하며 현대 모터스튜디오 웹사이트의 개선 방향을 검토했습니다. 특히 지점과 경험 유형이 분산된 정보 구조에 주목했고, 사용자가 관심 있는 콘텐츠를 중심으로 탐색할 수 있도록 UX 개선 방향을 구체화하는 기획 과정에 참여했습니다.',
    images: [
      { label: 'STEEP', detailTitle: 'STEEP 분석', detail: '사회·기술·경제·환경·정책 관점에서 브랜드 경험을 살펴본 결과, 온라인에서도 사용자가 공간과 콘텐츠를 직관적으로 탐색할 수 있는 디지털 접점이 필요하다고 보았습니다.', src: '/images/hyundai/planning/01-research/research-steep.png.png', alt: '현대 모터스튜디오 STEEP 분석 보드' },
      { label: '3C', detailTitle: '3C 분석', detail: '브랜드·사용자·경쟁 환경을 함께 비교해 지점과 콘텐츠가 혼재된 구조를 경험 중심으로 재구성하고, 탐색부터 상세·예약까지 이어지는 흐름을 설계 방향으로 설정했습니다.', src: '/images/hyundai/planning/01-research/research-3c.png.png', alt: '현대 모터스튜디오 3C 분석 보드' },
      { label: '시장 환경 및 근거 조사', detailTitle: '시장 환경 및 근거 조사', detail: '자동차 시장 변화와 브랜드 경험, 온·오프라인 경험의 연결을 살펴보기 위한 근거 자료를 정리했습니다.', src: '/images/hyundai/planning/01-research/research-background-evidence.png.png', alt: '현대 모터스튜디오 시장 환경 및 근거 조사 보드' },
      { label: '경쟁사 분석', detailTitle: '경쟁사 분석', detail: '벤츠 뮤지엄·BMW·제네시스 웹사이트를 비교해, 주요 콘텐츠의 진입점과 정보 구조를 한 화면에서 이해하기 쉬운 방식으로 구성하는 사례를 확인했습니다.', src: '/images/hyundai/planning/01-research/research-competitor.png.png', alt: '현대 모터스튜디오 경쟁사 분석 보드' },
      { label: '자사 분석', detailTitle: '자사 분석', detail: '기존 사이트는 지점·콘텐츠·예약 정보가 여러 영역에 분산되어, 사용자가 원하는 경험과 다음 행동을 빠르게 판단하기 어려운 지점을 확인했습니다.', src: '/images/hyundai/planning/01-research/research-brand-audit.png.png', alt: '현대 모터스튜디오 자사 분석 보드' },
    ],
  },
  {
    number: '02',
    title: '사용자 리서치',
    subtitle: 'USER RESEARCH',
    body: '팀에서 진행한 설문조사와 사용자 분석 결과를 바탕으로 콘텐츠 이해도와 정보 탐색 과정의 불편 요소를 정리했습니다. 사용자가 경험을 선택할 때 필요한 지점·일정·예약 정보를 쉽게 확인할 수 있도록 정보 우선순위와 화면 구성에 반영할 방향을 검토했습니다.',
    images: [
      { label: '설문조사', detailTitle: '설문조사', detail: '기존 웹사이트 이용 경험을 바탕으로 콘텐츠·지점·일정·예약 정보의 이해도를 확인할 수 있도록 설문 문항을 구성했습니다.', src: '/images/hyundai/planning/02-user-research/user-survey-form.png.png', alt: '현대 모터스튜디오 사용자 설문조사 양식' },
      { label: '설문 결과', detailTitle: '설문 결과', detail: '12개 응답에서 콘텐츠의 중요도·참여 가능 여부·운영 상태 이해도가 모두 평균 2점대에 머물렀습니다. 정보의 우선순위와 참여·운영 상태를 화면에서 구분하는 방향을 설정했습니다.', src: '/images/hyundai/planning/02-user-research/user-survey-results.png.png', alt: '현대 모터스튜디오 사용자 설문조사 결과' },
      { label: '어피니티 다이어그램', detailTitle: '어피니티 다이어그램', detail: '사용자 관찰을 묶어 정리한 어피니티 다이어그램입니다.', src: '/images/hyundai/planning/02-user-research/user-affinity-diagram.png.png', alt: '현대 모터스튜디오 사용자 어피니티 다이어그램' },
    ],
  },
  {
    number: '03',
    title: 'UX 전략',
    subtitle: 'UX STRATEGY',
    body: '퍼소나·저니맵·린 캔버스에서 정리한 문제를 실제 탐색 흐름으로 연결하는 데 집중했습니다. 특히 경험 찾기 페이지에서 사용자가 관심사를 단계적으로 선택하고 추천 결과를 확인하도록 STEP 1~3 구조와 콘텐츠 흐름을 구체화하고 구현했습니다.',
    images: [
      { label: '사용자 퍼소나', detailTitle: '사용자 퍼소나', detail: '세 유형의 사용자는 원하는 경험을 빠르게 비교하고, 첫 화면에서 지점·일정·예약 정보를 파악하기를 원했습니다. 이를 바탕으로 경험 정보의 우선 노출과 탐색·예약 흐름의 연결을 검토했습니다.', src: '/images/hyundai/planning/03-ux-strategy/ux-persona-board.png.png', alt: '현대 모터스튜디오 사용자 퍼소나 전체 보드' },
      { label: '저니맵', detailTitle: '저니맵', detail: '콘텐츠 탐색부터 상세 확인·예약·방문 결정까지의 흐름에서, 반복적인 확인과 예약 이탈 지점을 파악해 각 단계의 정보 연결 방식을 검토했습니다.', src: '/images/hyundai/planning/03-ux-strategy/ux-user-journey-map.png.png', alt: '현대 모터스튜디오 사용자 저니맵' },
      { label: '린 캔버스', detailTitle: '린 캔버스', detail: '콘텐츠 탐색 이후 상세 정보와 예약으로 이어지는 과정의 이탈을 문제로 정의하고, 해결 가설과 검증 항목을 한 화면에 정리했습니다.', src: '/images/hyundai/planning/03-ux-strategy/ux-lean-canvas.png.png', alt: '현대 모터스튜디오 린 캔버스' },
    ],
  },
  {
    number: '04',
    title: '정보 구조',
    subtitle: 'INFORMATION ARCHITECTURE',
    body: '메뉴트리와 사용자 플로우를 검토하며 콘텐츠 탐색에서 상세 정보와 예약으로 이어지는 흐름을 정리했습니다. 이후 담당 페이지와 연결 화면을 구현하는 과정에서 콘텐츠 배치, 이동 경로, 버튼 연결 등을 확인하며 실제 사용 흐름을 보완했습니다.',
    images: [
      { label: '팀 회의', detailTitle: '팀 회의', detail: '서브페이지의 이미지·콘텐츠 구성, 반응형 디자인, 로고와 소개 영역 등 화면별 작업 항목을 나누고 역할을 정리했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-team-meeting-notes.png.png', alt: '현대 모터스튜디오 정보 구조 팀 회의 기록' },
      { label: '메뉴트리', detailTitle: '메뉴트리', detail: '지점별 경험 정보와 전시·프로그램·예약을 병렬로 구성하고, 각 지점에서 차량·시승, 전시·프로그램, 이용안내로 이어지는 메뉴 구조를 설계했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-menu-tree.png.png', alt: '현대 모터스튜디오 메뉴트리' },
      { label: '사용자 플로우', detailTitle: '사용자 플로우', detail: '전시·프로그램 탐색, 지점과 일정 확인, 예약 시도로 이어지는 흐름을 정리해 반복 확인으로 인한 이탈 지점을 화면 연결의 기준으로 삼았습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-user-flow.png.png', alt: '현대 모터스튜디오 사용자 플로우' },
      { label: '요구사항 정의', detailTitle: '요구사항 정의', detail: '브랜드 경험 노출, 주요 콘텐츠 바로가기, 지점 정보 통합, 예약 CTA 등 화면별 요구사항을 우선순위와 함께 정리했습니다.', src: '/images/hyundai/planning/04-information-architecture/ia-requirements.png.png', alt: '현대 모터스튜디오 화면 요구사항 정의서' },
    ],
  },
  {
    number: '05',
    title: '비주얼 디렉션',
    subtitle: 'VISUAL DIRECTION',
    body: '팀의 디자인 방향을 바탕으로 담당 전시 서브페이지의 시각적 구성을 구체화했습니다. 레퍼런스를 분석하고 Figma를 기준으로 이미지 배치, 타이포그래피, 여백과 화면 전환 방식을 조정해 브랜드의 공간·전시 경험을 전달하는 디자인을 발전시켰습니다.',
    images: [
      { label: '디자인 마인드맵', detailTitle: '디자인 마인드맵', detail: '모던함·고급스러움·역동성·자유로움과 전시·공간 경험을 핵심 키워드로 정리해, 컬러와 타이포그래피의 시각적 방향을 설정했습니다.', src: '/images/hyundai/planning/05-visual-direction/visual-mindmap.png.png', alt: '현대 모터스튜디오 디자인 마인드맵' },
    ],
  },
  {
    number: '06',
    title: 'UI 디자인',
    subtitle: 'UI DESIGN',
    body: '담당 전시 서브페이지와 경험 찾기 페이지의 UI를 실제 화면으로 구현하고, 스크롤·이미지 전환과 선택 상태 등 주요 인터랙션을 반복적으로 검수했습니다. 다른 팀원과 연결되는 페이지의 디자인 보완과 컴포넌트 이식 작업에도 참여하며 팀 프로젝트의 구현 완성도를 높였습니다.',
    images: [
      { label: '와이어프레임', detailTitle: '와이어프레임', detail: '메인·전시·방문 전 정보 화면의 정보 위계와 콘텐츠 배치를 설계해, 탐색 과정에서 필요한 정보를 순서대로 확인하도록 구조화했습니다.', src: '/images/hyundai/planning/06-ui-design/design-wireframe.png.png', alt: '현대 모터스튜디오 와이어프레임' },
      { label: '스타일 가이드', detailTitle: '스타일 가이드', detail: 'Red Hat Display와 SUIT의 서체 기준, 흑백·블루·레드 컬러 팔레트를 정리해 화면 전반의 시각적 일관성을 유지하도록 구성했습니다.', src: '/images/hyundai/planning/06-ui-design/design-style-guide.png.png', alt: '현대 모터스튜디오 스타일 가이드' },
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
  { number: '01', eyebrow: 'UX PLANNING', title: <>탐색의 기준을<br /><em>구체화하다.</em></>, body: '사용자가 원하는 경험을 찾는 과정에 주목하고, 지점과 콘텐츠 중심으로 분산된 정보를 관심사 기반 탐색 흐름으로 연결하는 기획에 참여했습니다. 콘텐츠 탐색에서 상세·예약으로 이어지는 사용자 흐름도 함께 검토했습니다.' },
  { number: '02', eyebrow: 'CONTENT & DESIGN', title: <>전시 경험을<br /><em>화면으로 옮기다.</em></>, body: '메인페이지의 Vehicle Exhibition 콘텐츠를 담당하고, 전시 서브페이지에서는 공간과 전시 경험을 효과적으로 전달하기 위한 레이아웃과 시각적 구성을 구체화했습니다. Figma를 기준으로 이미지 배치, 타이포그래피, 간격을 조정했습니다.', images: [{ src: '/images/hyundai/contribution/exhibition-work-01.jpg.jpg', alt: '현대 모터스튜디오 전시 서브페이지 작업 화면을 검토하는 모습' }, { src: '/images/hyundai/contribution/exhibition-work-02.jpg.jpg', alt: '현대 모터스튜디오 전시 서브페이지 작업 사진' }] },
  { number: '03', eyebrow: 'INTERACTION & DEVELOPMENT', title: <>설계한 흐름을<br /><em>작동하게 하다.</em></>, body: '기획과 디자인에서 설정한 경험을 실제 웹 인터랙션으로 연결했습니다. 전시 서브페이지의 스크롤 연출과 경험 찾기의 단계별 선택 흐름을 구현하고 반복적으로 검수했습니다. Vehicle Exhibition 인터랙션은 후속 개선에 참여했습니다.' },
  { number: '04', eyebrow: 'COLLABORATION', title: <>연결된 화면을<br /><em>함께 다듬다.</em></>, body: '팀원들과 기획·디자인 방향을 공유하고, 담당 컴포넌트의 통합과 화면 연결을 점검했습니다. 기능 검수와 Git 기반 협업을 통해 구현 과정의 완성도를 높였습니다.', images: [{ src: '/images/hyundai/teamwork/team-work-process.jpg.jpg', alt: '현대 모터스튜디오 팀이 디자인과 구현 화면을 함께 작업하는 모습' }, { src: '/images/hyundai/teamwork/team-review-01.jpg.jpg', alt: '현대 모터스튜디오 팀 프로젝트 화면 검토 사진' }, { src: '/images/hyundai/teamwork/team-meeting-02.jpg.jpg', alt: '현대 모터스튜디오 팀 회의 사진' }, { src: '/images/hyundai/teamwork/team-final-presentation-02.jpg.jpg', alt: '현대 모터스튜디오 팀 프로젝트 최종 발표 사진' }] },
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
  const heroImage = { ...project.hero, label: 'FINAL UI / CURRENT BOARD', title: 'WIREFRAME & UI DESIGN' }

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
      <SectionIntro index="02" eyebrow="CHALLENGE" title={<>FROM CONTENT DISCOVERY<br />TO A VISIT.</>} body="전시·시승·프로그램 정보가 분산된 흐름에서, 사용자가 관심 있는 경험을 찾고 지점·일정·예약 정보를 자연스럽게 확인하도록 하는 것이 목표였습니다." />
      <div className="case-problems"><p>01 <strong>공간의 정체성과 실제 경험을 온라인에서 이해하기 어려움</strong></p><p>02 <strong>방문 목적에 맞는 콘텐츠와 지점 정보를 찾기 어려움</strong></p><p>03 <strong>콘텐츠 탐색에서 예약까지의 흐름이 분산됨</strong></p></div>
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
      <SectionIntro index="04" eyebrow="INSIGHT & DESIGN DECISIONS" title={<>FROM FRICTION<br /><em>TO FLOW.</em></>} body="사용자가 마주한 문제를 탐색, 전시 경험, 방문 행동을 잇는 세 가지 설계 판단으로 정리했습니다." />
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
    <section className="case-section case-final" aria-labelledby="final-ui-title">
      <SectionIntro index="06" eyebrow="FINAL UI" title={<>THE EXPERIENCE,<br /><em>CONNECTED.</em></>} body="현재 확보된 보드는 와이어프레임과 UI 디자인을 함께 담고 있습니다. 독립된 최종 화면 export가 확보되면 이 영역을 화면별 사례로 확장할 예정입니다." />
      <EvidenceFigure image={heroImage} onOpen={openImage} className="case-final__figure" />
    </section>

    <section className="case-section case-contribution" aria-label="My Contribution">
      <SectionIntro index="07" eyebrow="MY CONTRIBUTION" title={<>THE WORK<br /><em>I CONNECTED.</em></>} body="팀 프로젝트의 목표 안에서 UX 기획, 콘텐츠·전시 화면 디자인, 인터랙션 구현, 화면 통합과 검수에 참여한 역할을 정리했습니다." />
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

    <footer className="case-closing"><div className="case-closing__message"><p>PROJECT SUMMARY</p><h2>경험을 찾고,<br /><em>방문을 계획하다.</em></h2><p>전시·시승·프로그램을 하나의 탐색 흐름으로 연결하고, 필요한 정보를 확인한 뒤 방문과 예약으로 이어지도록 설계했습니다.</p></div></footer>
    {activeImage && <ImageLightbox image={activeImage} onClose={closeImage} />}
  </section>
}
