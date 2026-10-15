import board from '../assets/hyundai/main-ui-design-board.png'
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

export const hyundaiCaseStudy = {
  title: 'HYUNDAI\nMOTORSTUDIO',
  type: 'UX/UI WEBSITE RENEWAL · TEAM PROJECT',
  period: '2026.09.01 — 09.30',
  overview: '전시·시승·프로그램을 찾는 순간부터 방문과 예약까지, 모빌리티 경험을 하나의 탐색 흐름으로 잇는 웹사이트 리뉴얼입니다.',
  hero: { src: board, alt: '현대 모터스튜디오 와이어프레임과 UI 디자인 보드' },
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
  problemDirections: [
    { number: '01', title: 'INFORMATION HIERARCHY', problem: '핵심 콘텐츠와 필요한 방문 정보가 한눈에 보이지 않음', direction: '대표 경험과 핵심 콘텐츠를 우선 노출' },
    { number: '02', title: 'BRAND EXPERIENCE', problem: '웹사이트만으로 공간의 정체성과 실제 경험을 충분히 이해하기 어려움', direction: '브랜드·공간 메시지와 경험 정보를 강화' },
    { number: '03', title: 'DISCOVERY TO RESERVATION', problem: '거점·콘텐츠 유형으로 나뉜 정보를 탐색하고 예약까지 이어가기 어려움', direction: '관심사·방문 목적 중심의 탐색과 예약 정보 통합' },
  ],
  structure: [
    { label: 'MENU TREE', title: 'INFORMATION ARCHITECTURE', src: menuTree, alt: '현대 모터스튜디오 메뉴 트리' },
    { label: 'USER FLOW', title: 'CONTENT TO RESERVATION', src: userFlow, alt: '콘텐츠 탐색과 예약 흐름을 보여주는 사용자 플로우' },
    { label: 'REQUIREMENTS', title: 'SCREEN REQUIREMENTS', src: requirements, alt: '화면별 요구사항 정의서' },
    { label: 'WIREFRAMES', title: 'STRUCTURE BEFORE VISUAL DESIGN', src: wireframes, alt: '현대 모터스튜디오 웹사이트 와이어프레임 보드' },
  ],
  visual: { label: 'STYLE GUIDE', title: 'A CONSISTENT VISUAL LANGUAGE', src: styleGuide, alt: '현대 모터스튜디오 스타일 가이드' },
}
