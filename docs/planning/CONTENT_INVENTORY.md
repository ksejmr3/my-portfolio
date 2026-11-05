# 기존 콘텐츠와 에셋 목록

조사 기준: 읽기 전용 `C:\Users\mbc\Desktop\김지영\개인포폴\my-portfolio`의 `src`, `docs`, `references`, 그리고 사용자 제공 [현대 Figma 노드](https://www.figma.com/design/3JuafVYlSdXJsmETYSH448/개인포폴정리_김지영?node-id=682-1758). 기존 HEAD `fa539eb7417d94d4d1382253c7279abd8583e1a1`, 작업트리 깨끗함. 아래 파일은 이번 단계에 복사하지 않았다.

## HYUNDAI MOTORSTUDIO

기존 `src/App.jsx`에는 UX/UI 웹 리뉴얼, 팀 프로젝트, 기간 `2026.09.01–09.30`, 목표(분산된 전시·시승·프로그램과 예약 연결), OVERVIEW→RESEARCH→PROBLEM→SOLUTION→DESIGN→DEVELOPMENT→OUTCOME의 7개 챕터가 있다. 팀 전체 범위는 적혀 있지만 본인 담당 범위는 placeholder다. 조사 요약과 어피니티 다이어그램 표기 비율은 기존 텍스트에 있으나 최종 장표 대조 전까지 별도 설문 결과로 취급하지 않는다. `docs/CONTENT_GUIDE.md`가 이 구분을 자세히 설명한다.

| 기존 경로 (`my-portfolio/` 기준) | 현재 용도 | V2 계획 |
|---|---|---|
| `src/assets/hyundai/main-ui-design-board.png` | 실제 사용 중; 와이어프레임+메인 UI 보드 | 대표 화면 후보. 메인 UI만 분리한 export가 더 적합 |
| `src/assets/hyundai/steep-analysis.png` | 실제 사용 중 | 조사 원본 이미지로 재사용 후보 |
| `src/assets/hyundai/competitive-research.png` | 실제 사용 중 | 경쟁 분석 보드로 재사용 후보 |
| `src/assets/hyundai/user-affinity.png` | 실제 사용 중 | 어피니티 다이어그램으로 재사용 후보 |
| `src/assets/hyundai/3c-analysis.png` | 코드 import 확인; 상세 노출 범위는 후속 검토 | 3C 보드 재사용 후보 |
| `src/assets/hyundai/hyundai-site-analysis.png` | 코드 import 확인; 상세 노출 범위는 후속 검토 | 자사 분석 보드 재사용 후보 |
| `references/장표.pdf` | 원본 발표 자료 40.7MB | 수치·역할·순서 대조용. 웹에 통째로 넣지 않음 |

Figma 선택 섹션 `682:1758`의 메타데이터에서 실제 확인한 노드: STEEP `682:1338`, 3C `682:1337`, 자사 분석 `682:1576`, 경쟁사 리서치 `682:1577`, 설문조사 `682:592`, 인터뷰 `682:593`, 어피니티 `682:1575`, 최종 퍼소나 `682:594`, 사용자 여정 지도 `682:710`, 린캔버스 `682:981`, 메뉴트리 `682:1573`, 플로우차트 `682:1574`, 요구사항 검증 `682:1582`, 스타일 `682:1588`, 와이어프레임 `682:1587`. 기존 문서는 메인 UI 보드 Figma `668:3294`를 출처로 기록한다. 이 노드들의 존재와 이름은 확인했지만 모든 수치·내용을 독립 검증한 것은 아니다.

**추가 export:** 설문과 인터뷰 원본(개인정보 정리 후), 퍼소나, 여정 지도, 린캔버스, 메뉴트리, 플로우차트, 요구사항, 디자인 시스템/스타일, 최종 UI의 독립 화면, 데스크톱·모바일 완성 화면, 디자인과 구현의 비교 화면. 분석표·다이어그램·UI 화면은 원본 이미지로 사용하고, 본문은 핵심 판단을 짧게 설명한다. 실제 조사 결과와 기획 가설, 팀 산출물과 개인 기여를 캡션에서 분리한다.

## VIVIENNE WESTWOOD

기존 `my-portfolio/src/App.jsx`는 개인 웹사이트 리디자인으로 분류하고 OVERVIEW→BRAND CONCEPT→VISUAL DESIGN→DEVELOPMENT→FINAL RESULT 슬롯을 둔다. 해당 통합 포트폴리오 안의 내용은 대부분 placeholder다. 3차 조사에서 별도 `개인포폴1/vivienne-westwood-portfolio` React 프로젝트와 구현 캡처를 확인했다. `verification/precision-hero-1920.png`는 실제 구현 화면의 히어로 캡처이며 V2의 `src/assets/vivienne-westwood/implemented-hero.png`로 복사해 WORK에 사용한다. `public/images/hero-poster.jpeg` 등도 존재한다. 이 사실만으로 통합 포트폴리오의 상세 챕터나 최종 성과가 완성됐다고 간주하지 않는다.

## COS

기존 `my-portfolio/src/App.jsx`는 개인 웹사이트 리디자인으로 분류하고 OVERVIEW→CONCEPT→VISUAL DESIGN→DEVELOPMENT→FINAL RESULT 슬롯을 둔다. 그 통합 페이지의 콘텐츠는 placeholder다. 3차 조사에서 별도 `개인포폴2/cos-portfolio` React 프로젝트와 `구현 영상/cos-portfolio - Chrome 2026-10-14 10-07-33.mp4`를 확인했다. 구현의 `HeroSection.jsx`가 실제 사용한 `src/assets/images/hero/IMG_HERO_MAIN.png`, `IMG_HERO_SUB.png`를 V2의 `src/assets/cos/hero-main.png`, `hero-sub.png`로 복사해 WORK에 사용한다. 두 사진은 구현된 히어로의 원본 캠페인 에셋이며 UI 화면 전체 캡처는 아니다. 최종 디자인·구현 설명과 개인 기여 범위는 별도로 정리해야 한다.

## 공통 자료와 주의점

- `my-portfolio` 통합 프로젝트가 사용하는 현대 PNG는 6종이다. 별도 프로젝트 폴더에는 위의 Vivienne·COS 구현물과 이미지, COS 구현 영상이 있다. 통합 프로젝트의 `src/assets/hero.png`는 세 프로젝트의 확정 대표 이미지로 간주하지 않는다.
- 현대 WORK에는 `main-ui-design-board.png`의 아래쪽 `UI DESIGN_MAIN` 영역만 CSS 프레임으로 보여준다. 원본은 1920×2160 와이어프레임+디자인 비교 보드이며 전용 메인 화면 export는 아직 확보하지 못했다. 이전 문서가 기록한 Figma 노드 `668:3294`는 3차 조사 시 조회되지 않았다.
- `src/components/IntroSection.jsx`, `PortfolioSections.jsx`, `editorial/*`와 CSS는 기존 구현 참고 자료다. GSAP 타임라인이나 5패널 가로 스크롤을 V2로 복사하지 않는다.
- INTRO의 인명·소개와 ABOUT/SKILLS/CONTACT의 사실 관계, 연락처, 프로젝트별 본인 역할, 연구 표본·수치, 성과·검증 기록은 최종 공개 전 원자료와 사용자 확인이 필요하다.
- 에셋 복사 우선순위: 현대의 선택된 원본 보드 → 추가 Figma export → 다른 두 프로젝트의 확정 디자인/구현 화면. 이번 단계에는 복사 없음.
