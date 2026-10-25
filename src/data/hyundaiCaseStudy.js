import steep from '../assets/hyundai/ux-steep-analysis.png'
import threeC from '../assets/hyundai/ux-3c-analysis.png'
import siteAnalysis from '../assets/hyundai/ux-site-analysis.png'
import competitiveResearch from '../assets/hyundai/ux-competitive-research.png'
import affinity from '../assets/hyundai/ux-affinity-diagram-color-hq.png'
import journeyMap from '../assets/hyundai/ux-journey-map.png'
import leanCanvas from '../assets/hyundai/ux-lean-canvas.png'
import menuTree from '../assets/hyundai/ux-menu-tree.png'
import userFlow from '../assets/hyundai/ux-user-flow.png'
import requirements from '../assets/hyundai/ux-requirements.png'
import wireframes from '../assets/hyundai/ui-wireframes.png'
import styleGuide from '../assets/hyundai/ui-style-guide.png'
import mainUiBoard from '../assets/hyundai/main-ui-design-board.png'

export const hyundaiCaseStudy = {
  title: 'HYUNDAI\nMOTORSTUDIO',
  type: 'UX/UI WEBSITE RENEWAL · TEAM PROJECT',
  period: '2026.09.01 — 09.30',
  overview: '전시·시승·프로그램 콘텐츠를 목적에 맞게 찾고, 필요한 지점 정보를 확인할 수 있도록 탐색 구조와 화면을 함께 개선한 웹사이트 리뉴얼입니다.',
  contributionSummary: '4인 팀이 기획·디자인·구현을 나누어 진행했습니다. 저는 Experience Finder와 전시 서브페이지를 디자인·구현하고, 메인페이지 Vehicle Exhibition의 UI 디자인을 담당했습니다.',
  hero: { src: mainUiBoard, alt: '현대 모터스튜디오 Figma 전체 UI 디자인 보드' },
  research: [
    { label: 'STEEP ANALYSIS', title: 'MARKET & EXPERIENCE SHIFT', summary: '제품 판매를 넘어 브랜드·공간·미래 모빌리티 경험으로 확장되는 환경을 살폈습니다.', src: steep, alt: '자동차 산업과 브랜드 경험을 다섯 관점에서 분석한 STEEP 보드' },
    { label: '3C ANALYSIS', title: 'BRAND AND MARKET CONTEXT', summary: '고객·경쟁사·자사의 관계 안에서 브랜드 경험과 웹사이트 개선의 방향을 검토했습니다.', src: threeC, alt: '고객, 경쟁사, 자사를 비교한 3C 분석 보드' },
    { label: 'OWN SITE ANALYSIS', title: 'CURRENT EXPERIENCE', summary: '현대 모터스튜디오 웹사이트의 콘텐츠와 정보 구조를 점검했습니다.', src: siteAnalysis, alt: '현대 모터스튜디오 웹사이트 자사 분석 보드' },
    { label: 'COMPETITIVE RESEARCH', title: 'COMPARING CONTENT STRUCTURES', summary: 'Mercedes-Benz Museum, BMW Welt, Genesis Space의 웹사이트를 비교했습니다.', src: competitiveResearch, alt: '경쟁사 웹사이트의 콘텐츠와 정보 구조를 비교한 리서치 보드' },
  ],
  insight: [
    { label: 'AFFINITY DIAGRAM', title: 'USER OBSERVATIONS', src: affinity, alt: '사용자 관찰을 묶어 정리한 어피니티 다이어그램' },
    { label: 'JOURNEY MAP', title: 'FROM DISCOVERY TO VISIT', src: journeyMap, alt: '서비스 탐색부터 방문 결정까지의 사용자 여정 지도' },
    { label: 'LEAN CANVAS', title: 'PROBLEM TO DIRECTION', src: leanCanvas, alt: '문제와 해결 방향을 정리한 린캔버스' },
  ],
  designDecisions: [
    { number: '01', keyword: 'EXPERIENCE DISCOVERY', statement: '지점과 유형별로 흩어진 선택을 관심사와 방문 목적 중심 탐색으로 엮습니다.', support: 'STEP 1–3에서 목적과 관심사를 고르면 관련 경험을 찾고 상세 정보를 확인할 수 있습니다.' },
    { number: '02', keyword: 'EXHIBITION IMMERSION', statement: '정보 중심 화면에서 놓치기 쉬운 전시의 분위기를 콘텐츠 흐름에 담습니다.', support: '이미지·타이포그래피·스크롤 전개를 결합해 전시 콘텐츠를 순서대로 경험하도록 합니다.' },
    { number: '03', keyword: 'CONTENT TO VISIT', statement: '분산된 콘텐츠와 지점 정보를 연결해 방문·예약의 다음 단계로 잇습니다.', support: '관련 콘텐츠에서 지점별 소개를 거쳐 방문·예약 정보를 이어 확인할 수 있게 합니다.' },
  ],
  structure: [
    { label: 'MENU TREE', title: 'INFORMATION ARCHITECTURE', src: menuTree, alt: '현대 모터스튜디오 메뉴 트리' },
    { label: 'USER FLOW', title: 'CONTENT TO RESERVATION', src: userFlow, alt: '콘텐츠 탐색과 예약 흐름을 보여주는 사용자 플로우' },
    { label: 'REQUIREMENTS', title: 'SCREEN REQUIREMENTS', src: requirements, alt: '화면별 요구사항 정의서' },
    { label: 'WIREFRAMES', title: 'STRUCTURE BEFORE VISUAL DESIGN', src: wireframes, alt: '현대 모터스튜디오 웹사이트 와이어프레임 보드' },
  ],
  visual: { label: 'STYLE GUIDE', title: 'A CONSISTENT VISUAL LANGUAGE', src: styleGuide, alt: '현대 모터스튜디오 스타일 가이드' },
  selectedWorks: {
    experienceFinder: {
      eyebrow: '01 / EXPERIENCE FINDER',
      heading: '관심사로 찾는 경험.',
      summary: 'STEP 1–3에서 관심사와 방문 목적을 고르고, 추천 결과에서 관련 상세·예약 정보로 이동하는 탐색 흐름입니다.',
      role: 'UX STRUCTURE · STEP 1–3 FLOW · INTERACTION DESIGN & DEVELOPMENT',
      video: '/videos/hyundai/selected-works/experience-finder.mp4',
        poster: '/images/hyundai/selected-works/experience-finder-current-poster.jpg',
      playbackRate: 1.1,
      mediaLabel: 'STEP 01–03 / RECOMMENDATION / LINK REVIEW',
      mediaTitle: '관심사 선택부터 추천 결과와 관련 정보로 이어지는 탐색 흐름',
    },
    exhibitionExperience: {
      eyebrow: '02 / EXHIBITION EXPERIENCE',
      heading: 'BEYOND THE EXHIBITION',
      summary: '대형 타이포그래피와 전시 이미지를 스크롤 흐름에 맞춰 배치해 콘텐츠의 분위기와 정보를 함께 전달합니다.',
      role: 'EXHIBITION SUBPAGE · DESIGN & IMPLEMENTATION · RESPONSIVE',
      video: '/videos/hyundai/selected-works/exhibition-desktop.mp4',
      poster: '/images/hyundai/selected-works/exhibition-desktop-poster.jpg',
      mediaLabel: 'DESKTOP / EXHIBITION FLOW',
      mediaTitle: '전시 이미지와 타이포그래피가 이어지는 스크롤 경험',
      designPage: '/images/hyundai/selected-works/exhibition-desktop-figma.webp',
      mobileDesignPage: '/images/hyundai/selected-works/exhibition-mobile-figma.webp',
      mobileVideo: '/videos/hyundai/selected-works/exhibition-mobile.mp4',
      mobilePoster: '/images/hyundai/selected-works/exhibition-mobile-poster.jpg',
      mobileLabel: 'MOBILE / RESPONSIVE',
      mobileTitle: '모바일 전시 페이지 스크롤 흐름',
    },
    vehicleExhibition: {
      eyebrow: '03 / VEHICLE EXHIBITION',
      heading: 'A CLOSER LOOK AT MOBILITY.',
      summary: '원형 차량 이미지와 중앙 차종명이 전환되는 Vehicle Exhibition 콘텐츠입니다.',
      role: 'MAIN PAGE · VEHICLE EXHIBITION UI DESIGN · VISUAL CONTENT',
      video: '/videos/hyundai/selected-works/vehicle-exhibition-circle.mp4',
      poster: '/images/hyundai/selected-works/vehicle-exhibition-circle-poster.jpg',
      playbackRate: 0.9,
      mediaLabel: 'TEAM MAIN PAGE / VEHICLE EXHIBITION INTERACTION',
      mediaTitle: '원형 차량 이미지와 중앙 차종명이 전환되는 실제 화면',
    },
  },
}
