export const portfolioQuestions = [
  {
    id: 'about',
    prompt: '간단히 자기소개해 주세요.',
    answer: '정보 구조와 콘텐츠의 우선순위를 정리하고, Figma 설계를 실제 웹 화면과 인터랙션으로 구현합니다. 팀 UX/UI 리뉴얼과 브랜드 리디자인에서 설계 의도가 브라우저에서도 유지되는지 직접 검수해 왔습니다.',
    links: [{ label: 'ABOUT 보기', href: '#about' }],
  },
  {
    id: 'career',
    prompt: '포트폴리오에서 가장 대표적인 작업은 무엇인가요?',
    answer: '현대 모터스튜디오 웹사이트 리뉴얼입니다. 4인 팀 프로젝트에서 UX 구조 정리에 참여하고, Experience Finder STEP 1–3과 전시 서브페이지를 디자인·구현했습니다. 공식 종료 후에는 추천 결과와 전시 반응형 동작을 추가로 개선했습니다.',
    links: [{ label: 'HYUNDAI MOTORSTUDIO 보기', href: '#hyundai-case-study' }],
  },
  {
    id: 'motivation',
    prompt: '디자인과 구현을 함께 진행한 사례가 있나요?',
    answer: '현대 모터스튜디오의 Experience Finder와 전시 서브페이지, Vivienne Westwood와 COS 개인 리디자인을 Figma와 React로 진행했습니다. 화면 구조와 시각 기준을 설계한 뒤 실제 브라우저에서 반응형 레이아웃과 인터랙션을 확인했습니다.',
    links: [{ label: 'WORK 보기', href: '#work' }],
  },
  {
    id: 'hyundai',
    prompt: '현대 모터스튜디오 프로젝트에서 어떤 역할을 했나요?',
    answer: '4인 팀 프로젝트에서 시장·자사·경쟁 서비스 분석과 UX 구조 정리에 참여했습니다. Experience Finder STEP 1–3과 전시 서브페이지를 디자인·구현했고, 지점별 소개의 초기 구조와 통합을 지원했습니다. 공식 기간 이후에는 담당 화면의 반응형과 추천 결과를 개인적으로 추가 개선했습니다.',
    links: [{ label: 'HYUNDAI MOTORSTUDIO 보기', href: '#hyundai-case-study' }],
  },
  {
    id: 'personal-projects',
    prompt: '비비안 웨스트우드와 COS는 어떤 프로젝트인가요?',
    answer: '두 작업은 개인 웹사이트 리디자인입니다. Vivienne Westwood는 헤리티지와 반항성을 대형 타이포그래피와 비대칭 구성으로 표현했고, COS는 여백과 이미지 비율을 사용해 캠페인·제품·소재 콘텐츠가 차분하게 이어지도록 구성했습니다.',
    links: [
      { label: 'VIVIENNE WESTWOOD 보기', href: '#vivienne-westwood' },
      { label: 'COS 보기', href: '#cos' },
    ],
  },
  {
    id: 'ai-video',
    prompt: 'AI 영상은 어떻게 제작했나요?',
    answer: '두 편의 패션 영상이 등록되어 있습니다. 런웨이 영상은 파일 메타데이터에서 Dreamina 생성 정보를 확인했지만 프롬프트와 후반 작업 기록은 확인되지 않았습니다. 목걸이 캠페인 영상도 세부 제작 과정과 사용 도구는 추가 확인이 필요합니다.',
    links: [{ label: 'AI VIDEO CONTENTS 보기', href: '#ai-video-contents' }],
  },
  {
    id: 'clone-coding',
    prompt: '클론 코딩 작업은 무엇인가요?',
    answer: 'NORTH, FORM, MODE는 타이포그래피와 그리드 구성을 CSS로 연습한 시각 연구입니다. 현재 썸네일은 완성된 외부 사이트 복제 결과가 아닌 포트폴리오용 CSS 구성 예시입니다.',
    links: [{ label: 'CLONE CODING 보기', href: '#clone-coding' }],
  },
  {
    id: 'skills',
    prompt: '어떤 디자인·개발 도구를 사용할 수 있나요?',
    answer: 'Figma로 화면을 설계하고 HTML·CSS·JavaScript·React·Vite로 구현합니다. Git·GitHub로 변경사항을 관리하고 Vercel로 배포했으며, GSAP과 ScrollTrigger는 포트폴리오와 현대 모터스튜디오 인터랙션에 사용했습니다. 나머지 도구의 활용 범위는 SKILL 섹션에서 확인할 수 있습니다.',
    links: [{ label: 'SKILL 보기', href: '#skill' }],
  },
  {
    id: 'contact',
    prompt: '연락하려면 어떻게 해야 하나요?',
    answer: 'CONTACT 섹션에서 이메일과 GitHub 프로필, 프로젝트 저장소로 이동할 수 있습니다. 이력서 PDF는 현재 등록되어 있지 않습니다.',
    links: [{ label: 'CONTACT 보기', href: '#contact' }],
  },
]
