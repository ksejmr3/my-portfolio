# THE WORKING EDITION

김지영의 React 기반 개인 포트폴리오입니다. UI/UX 기획, 화면 디자인과 프런트엔드 구현 사례를 한 페이지의 스크롤 흐름으로 소개합니다.

## 프로젝트 구성

1. INTRO
2. WORK INTRO
3. HYUNDAI MOTORSTUDIO — 4인 팀 프로젝트
4. VIVIENNE WESTWOOD — 개인 리디자인 프로젝트
5. COS KOREA — 개인 리디자인 프로젝트
6. AI VIDEO CONTENTS
7. CLONE CODING
8. SKILL
9. ABOUT
10. CONTACT

## 기술 스택

- React, JavaScript, HTML, CSS
- Vite
- GSAP, ScrollTrigger, Lenis
- Three.js
- Simple Icons

프로젝트별 도구와 실제 활용 범위는 포트폴리오의 SKILL 및 프로젝트 설명을 참고하세요.

## 로컬 실행

Node.js와 npm이 설치된 환경에서 저장소 루트에서 실행합니다.

```bash
npm install
npm run dev
```

프로덕션 빌드와 로컬 미리보기:

```bash
npm run build
npm run preview
```

`preview`는 빌드가 완료된 뒤 실행합니다.

## 디렉터리 구조

```text
my-portfolio/
├─ docs/       프로젝트 명세와 조사·에셋 기록
├─ public/     이미지, 영상, favicon 등 정적 자산
├─ src/
│  ├─ components/  페이지 섹션 및 공통 UI
│  ├─ data/        프로젝트 및 챗봇 콘텐츠
│  ├─ pages/       프로젝트 상세 페이지
│  └─ styles/      전역 및 섹션 스타일
├─ index.html
├─ package.json
└─ vite.config.js
```

## 프로젝트 링크

- [THE WORKING EDITION 소스 저장소](https://github.com/ksejmr3/my-portfolio)

- [HYUNDAI MOTORSTUDIO 구현 사이트](https://mbc-teamproject-wheat.vercel.app/)
- [VIVIENNE WESTWOOD 개인 리디자인](https://vivienne-westwood-portfolio.vercel.app/)
- [COS KOREA 개인 리디자인](https://cos-portfolio-kjy7.vercel.app/)
- [CLONE CODING 소스 저장소](https://github.com/ksejmr3/CloneCoding)

포트폴리오의 CLONE CODING 섹션에는 KYUNGDONG, LOTTE WORLD, MUSIGN 총 3개의 구현 사이트와 소스 폴더 링크가 등록되어 있습니다. 위 배포 URL의 현재 응답 상태는 이 문서에서 보증하지 않습니다.

## 에셋 안내

`public/images/`와 `public/videos/`에는 프로젝트 설명을 위한 브랜드 관련 이미지, Figma 화면, 목업 및 영상이 포함됩니다. 제3자 브랜드·이미지의 권리는 각 권리자에게 있습니다. 자료는 개인 포트폴리오 및 학습 결과 설명을 위한 것이며, 별도 프로젝트나 상업적 용도로 재사용하지 마세요.

에셋 출처와 프로젝트 기준 문서는 [`docs/`](./docs)를 참고하세요.
