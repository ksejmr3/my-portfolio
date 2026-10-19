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
  contributionSummary: '4인 팀 프로젝트에서 UX 기획과 탐색 구조 구체화에 참여했습니다. 메인페이지의 Vehicle Exhibition 콘텐츠, 전시 서브페이지의 디자인·인터랙션, 경험 찾기 STEP 1~3 탐색 흐름을 담당했습니다.',
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
}
