import hyundaiBoard from '../assets/hyundai/main-ui-design-board.png'
import vivienneHero from '../assets/vivienne-westwood/implemented-hero.png'
import cosHeroMain from '../assets/cos/hero-main.png'
import cosHeroSub from '../assets/cos/hero-sub.png'

export const projects = [
  {
    number: '01', id: 'hyundai-motorstudio', name: 'HYUNDAI MOTORSTUDIO',
    type: 'UX/UI WEBSITE RENEWAL · TEAM PROJECT',
    description: '분산된 전시·시승·프로그램과 예약 정보를 하나의 탐색 흐름으로 연결하는 웹사이트 리뉴얼.',
    image: hyundaiBoard,
    visualKind: 'hyundai',
    imageAlt: '현대 모터스튜디오 Figma 보드의 최종 메인 UI 디자인 영역',
    imageNote: 'FIGMA / UI DESIGN_MAIN · FINAL SCREEN AREA',
  },
  {
    number: '02', id: 'vivienne-westwood', name: 'VIVIENNE WESTWOOD',
    type: 'INDIVIDUAL WEBSITE REDESIGN',
    description: '브랜드 해석과 시각적 표현을 중심에 둔 개인 웹사이트 리디자인.',
    image: vivienneHero,
    visualKind: 'vivienne',
    imageAlt: 'Vivienne Westwood 리디자인 구현 화면의 BREAK THE RULES 히어로',
    imageNote: 'IMPLEMENTED WEBSITE / HERO SCREEN',
  },
  {
    number: '03', id: 'cos', name: 'COS',
    type: 'INDIVIDUAL WEBSITE REDESIGN',
    description: '콘셉트와 비주얼 디자인을 중심에 둔 개인 웹사이트 리디자인.',
    image: cosHeroMain,
    secondaryImage: cosHeroSub,
    visualKind: 'cos',
    imageAlt: 'COS 리디자인 히어로에 사용한 검은 수트 캠페인 이미지',
    secondaryImageAlt: 'COS 리디자인 히어로에 사용한 회색 톱 캠페인 이미지',
    imageNote: 'IMPLEMENTED WEBSITE / HERO CAMPAIGN ASSETS',
  },
]
