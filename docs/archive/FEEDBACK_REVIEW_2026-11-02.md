# THE WORKING EDITION 강사 피드백 수정·검증 보고서

작업일: 2026-11-02 (Asia/Seoul)

작업 경로: `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`

Git 브랜치: `master`

메인 React/Vite 포트폴리오를 이어서 수정했다. 별도 Vivienne Westwood·COS 저장소는 수정하지 않았다. 커밋·푸시·배포·reset·clean은 실행하지 않았다.

## 1. 수정 파일 전체 목록

| 파일 | 변경 |
| --- | --- |
| `src/components/CloneCodingSection.jsx` | 3개 기준 번호·개수, 프로젝트별 경로 보존, 제거된 장면만 타임라인에서 제외 |
| `src/components/PersonalProjectCaseStudy.jsx` | 제목 부근의 중복 프로젝트 번호 제거 |
| `src/components/SkillSection.jsx` | 로고와 GSAP 코드 제거, 기존 텍스트 정적 표시 |
| `src/data/cloneCodingProjects.js` | JOIN 제거, 수동 번호 대신 컴포넌트에서 개수 기반 번호 생성 |
| `src/data/hyundaiCaseStudy.js` | 삭제된 소개 메타의 미사용 데이터 제거 |
| `src/data/portfolioAssistant.js` | JOIN 설명 삭제, 클론 사이트 수 4→3 |
| `src/data/skillTools.js` | 로고 전용 import·SVG·카드 데이터 제거, 기술 그룹 유지 |
| `src/pages/HyundaiCaseStudy.jsx` | 소개 메타 삭제, 제목·설명 묶음 구성, 기여도 기간 표시 분리 |
| `src/styles/base.css` | 소개 배치, 기여도 라벨 겹침 수정, 제한된 범위의 글씨·여백 보정 |
| `src/styles/personal-projects.css` | 두 프로젝트의 본문·태그·역할·CTA·간격 공통 보정 |
| `src/styles/ai-video-contents.css` | 역할·영상 제목·설명 확대, 간격 정리 |
| `src/styles/skill-section.css` | sticky·3D 스타일 제거, 자연 높이의 3열/2열 텍스트 구성 |
| `src/styles/clone-coding.css` | 기존 위치를 프로젝트 ID에 연결, 제거된 장면에 해당하는 스크롤 길이만 제외 |
| `src/styles/about-section.css` | 보조 글씨·본문 확대, 섹션 여백 정리 |
| `src/styles/contact-section.css` | 보조 글씨·모바일 본문 확대, 모바일 여백 보정 |
| `README.md` | CLONE CODING을 남은 3개로 정정 |
| `docs/PORTFOLIO_CURRENT_SPEC.md` | SKILL·CLONE CODING의 변경된 명세 반영 |
| `docs/FEEDBACK_REVIEW_2026-11-02.md` | 이 보고서 추가 |
| `public/images/clone-coding/join-live.png` | JOIN 전용 이미지 삭제 |
| `public/images/clone-coding/join-local.png` | JOIN 전용 이미지 삭제 |

검증용 스크립트·PNG·JSON은 기존 Git 무시 경로인 `.review/feedback-20261102/`에 저장했다. 주요 기록은 `before.json`, `final.json`, `motion.json`, `details.json`, `overlap.json`이다.

작업 시작 시 미커밋 파일은 `src/components/ProfileIntro.jsx` 1개였고 untracked 파일은 없었다. 이 파일은 수정하지 않았다. 시작·종료 SHA256은 동일하다:

`1C6E11A6AE7CC5A4C6FCD9733E870D773BD7B25E63D4DE66E13149503FBF6B42`

## 2. 삭제한 텍스트

- 검정 HYUNDAI 소개의 `UX/UI WEBSITE RENEWAL · TEAM PROJECT`.
- 같은 영역의 `PERIOD / 2026.09.01 — 09.30`.
- 같은 영역의 `4 PERSON TEAM PROJECT`와 전용 래퍼.
- 개인 프로젝트 제목 부근의 중복 `01`, `02`. 상단 `PERSONAL WORK 01 / 02`, `02 / 02`는 유지했다.
- JOIN 제목·설명·이미지 alt·사이트/소스 링크 및 챗봇의 JOIN 설명.
- 4개 기준 클론 번호는 `01 / 03`, `02 / 03`, `03 / 03` 및 `03 PROJECTS`, `01 — 03`으로 변경했다.

프로젝트 설명을 새 경력이나 수행 내용으로 바꾸지 않았다. 삭제가 불명확한 장식 문구는 유지했다.

## 3. 유지한 중요 콘텐츠

- HYUNDAI의 기존 제목·개요·4인 팀 기여 설명·개인 담당 범위·원본 이미지·확대 기능.
- 공식 팀 프로젝트와 개인 후속 작업의 기간 및 기여도 4개 항목.
- VIVIENNE·COS의 기존 설명·콘셉트·태그·역할·이미지·사이트 링크.
- AI 영상 4편과 제목·설명·MY ROLE·재생 코드.
- 남은 클론 3개의 이미지·설명·사이트/소스 링크·디자인.
- SKILL의 기존 안내 문구·6개 기술 그룹·모든 도구 이름·하단 문구.
- INTRO/PROFILE/WORK, PROCESS, ABOUT, CONTACT와 포트폴리오 마스코트.
- 기존 섹션 순서. VIVIENNE가 COS보다 먼저, SKILL이 ABOUT보다 먼저다.

## 4. HYUNDAI 도입부·SELECTED SOLUTIONS 보존

목업과 오른쪽 제목으로 구성된 HYUNDAI 진입 카드의 JSX·CSS·인터랙션은 변경하지 않았다. SELECTED SOLUTIONS의 JSX·전용 CSS·스크롤 코드는 변경하지 않았다.

5개 해상도에서 두 보호 영역의 전후 측정 데이터가 각각 동일했다. 비교 항목은 섹션 높이, 네 방향 padding, 텍스트 내용·크기·행간·너비·높이다. 전체 문서에서의 절대 스크롤 위치는 앞선 영역의 높이 변경에 따라 달라질 수 있다.

SELECTED SOLUTIONS의 데스크톱 패널 전환은 0→40→80→40→0% 진행률로 왕복 확인했다. 1024px 이하의 기존 세로 구성도 유지했다.

## 5. VIVIENNE WESTWOOD·COS 정리

제목 부근의 번호 반복을 제거하고 프로젝트 종류를 유지했다. 두 프로젝트에 공통 글자 크기와 간격을 적용했다. 버건디·뉴트럴 색상과 기존 이미지 배치는 유지했다.

역할 설명은 12→16–18px, 태그는 9→12px, CTA와 MY WORK 라벨은 9–10→12–13px로 보정했다. 14px이던 태블릿·모바일 소개 본문은 16px로 보정했다. 가로 스크롤과 노트북 내부 자동 미리보기 코드는 수정하지 않았다.

## 6. JOIN 삭제·CLONE CODING 3개 구성

순서는 KYUNGDONG → LOTTE WORLD → MUSIGN이다. JOIN 데이터·화면·전용 이미지 2개·챗봇 참조를 제거했다.

남은 카드의 원래 위치는 `nth-child` 대신 프로젝트 ID에 연결했다. 따라서 첫 항목이 삭제되어도 KYUNGDONG이 JOIN의 위치나 움직임을 물려받지 않는다. 기존 진입·교차·퇴장 좌표, easing, 각 tween의 duration, scrub `.45`를 유지했다.

JOIN의 `.215` 장면 간격만 제외하여 타임라인 길이는 `1 → .785`, 데스크톱 섹션 높이는 `500svh → 414svh`가 된다. 타임라인 한 단위당 스크롤 거리를 함께 유지해 나머지 카드의 움직임 속도를 보존했다. 모바일·reduced-motion의 정적 구성은 기존 방식을 유지했다.

## 7. SKILL 로고 회전 영역 삭제

로고 DOM·전용 SVG 데이터·GSAP effect·ScrollTrigger·ref·3D CSS·sticky·전용 스크롤 높이를 제거했다. 로고 영역을 숨기는 방식이 아니라 관련 코드를 제거했다.

기존 텍스트와 위치를 유지한 자연 높이 구성이다. 데스크톱·태블릿은 3열, 700px 이하는 2열이다. `skill-logo-orbit` 트리거와 로고 노드 수는 모두 0이다.

## 8. 섹션별 여백 전후

정적인 영역에는 `--section-space: clamp(72px, 8vw, 128px)`를 사용한다. 모든 섹션의 높이를 동일하게 강제하지 않았다.

| 영역 | 변경 전 → 변경 후 |
| --- | --- |
| INTRO/WORK INTRO | 장면 높이·pin 거리 유지, 작은 보조 글씨만 보정 |
| HYUNDAI 목업 진입 카드 | 변경 없음 |
| 검정 HYUNDAI 소개, 1440×900 | 상하 36px → 72px, 메타 행 제거, 제목·설명을 한 묶음으로 중앙 정렬 |
| 검정 HYUNDAI 소개, 390×844 | 상단 38/하단 28px → 64/64px, 내용에 따른 자연 높이 |
| SELECTED SOLUTIONS | 변경 없음 |
| PROCESS | 기존 section padding·pin 거리 유지, 보조 라벨만 확대 |
| MY CONTRIBUTION | 기존 92–210px 범위 → 72–128px, 기간·라벨·제목 간격 분리 |
| PROJECT REFLECTION | 기존 80–150px 범위 → 72–128px, 기존 데스크톱 최소 높이 유지 |
| VIVIENNE·COS 데스크톱 | 상하 24–40px → 32–64px 범위, 기존 화면 높이 유지 |
| VIVIENNE·COS 모바일 | 56/62px → 64/64px |
| AI VIDEO | 데스크톱 72–96px → 공통 72–128px, 역할 구분선 위 15→24px, 영상과 설명 14→20px |
| CLONE CODING | JOIN의 인터랙션 구간만 제외, 나머지 카드 내부 여백 유지 |
| SKILL | 390–400svh 전용 스크롤 → 내용에 따른 자연 높이 |
| ABOUT, 1920×1080 | 140/160px → 128/128px |
| ABOUT, 390×844 | 82/96px → 72/72px |
| CONTACT | 데스크톱 유지, 모바일 48/36px → 64/64px |

SKILL의 실제 높이는 1920px 화면에서 4320→약 1024px, 1440px에서 3600→약 967px다. 390px에서는 글씨 확대·줄바꿈·여백 보정으로 659→약 964px가 되었으며, 빈 sticky 구간은 없다.

기여도 카드의 긴 영문 역할 라벨과 제목이 겹치는 문제는 라벨을 독립된 행에 배치해 해결했다.

## 9. 폰트·가독성 전후

| 항목 | 변경 전 → 변경 후 |
| --- | --- |
| 개인 프로젝트 역할 설명 | 12px → 16–18px |
| 개인 프로젝트 태그 | 9px → 12px |
| 개인 프로젝트 보조 라벨·CTA | 9–11px → 12–13px |
| AI MY ROLE·영상 설명 | 12px → 16–18px, 행간 1.55 → 1.72 |
| AI 영상 제목 | 17–22px → 20–24px, 행간 1.08 → 1.25 |
| HYUNDAI 원본 이미지 캡션·확대 라벨 | 8–9px → 12–13px |
| 기여도 기간 | 11px 한 줄 → 라벨 12–13px·날짜 13–14px 별도 행 |
| PROCESS·기여도·REFLECTION 보조 라벨 | 8–11px → 12–13px |
| SKILL 모바일 도구 목록 | 14px → 16px |
| SKILL 하단 문구 | 8px/모바일 숨김 → 12–13px/줄바꿈 허용 |
| ABOUT 본문 | 14px → 16–18px |
| ABOUT·CONTACT 보조 글씨 | 8–10px → 12–13px |
| CONTACT 모바일 본문 | 14px → 16px |
| INTRO 미리보기 캡션 | 6–8px → 11px |

한글 본문은 기존 `word-break: keep-all`을 유지하고 SKILL·역할 설명에도 적용했다. 보호 대상인 SELECTED SOLUTIONS·HYUNDAI 진입 카드 및 남은 클론 카드의 글꼴·크기는 유지했다.

## 10. 정방향·역방향 인터랙션 검증

- **클론 카드**: 1920·1440·1024px에서 실제 Chrome 휠 입력으로 진입·교차·퇴장·역방향 복원을 확인했다. 세 카드의 동일 진행 지점에서 정방향/역방향 위치 차이는 0–0.2px였다. 마지막 카드 이후 SKILL 진입도 확인했다.
- **개인 프로젝트**: 0→50→100→50→0% 왕복, COS 끝 지점과 VIVIENNE 복원, 제목·역할·CTA의 세로 범위를 확인했다. 이미지 로드 후 좌표가 갱신될 수 있어 안정화된 최신 트리거 좌표로 재확인했다.
- **INTRO/PROFILE/WORK**: 스크롤 왕복 시 제목 이동·PROFILE 표시·WORK 제목 전환 및 복원을 확인했다.
- **SELECTED SOLUTIONS**: 기존 적층 패널의 정·역방향 복원을 확인했다.
- **ABOUT**: 1920·1440px에서 5개 카드의 정·역방향 전환, 1024·768·390px에서 버튼 선택을 확인했다. 확대된 본문과 사진의 간격도 각 카드에서 검사했다.
- **이미지 확대**: 5개 해상도에서 HYUNDAI 이미지 클릭으로 열고 Escape로 닫았다.
- **reduced-motion**: 1440×900에서 클론 3개가 정적으로 표시되고 클론 스크롤·SKILL 회전 트리거가 없는 것을 확인했다.

GPU 비활성 headless 환경에서는 PROFILE의 WebGL 말림 렌더링이 활성화되지 않아 해당 효과의 시각 검증은 제한된다. PROFILE 파일의 시작·종료 해시는 동일하고 셰이더·외부 스크롤 코드는 수정하지 않았다.

## 11. 해상도별 브라우저 결과

Chrome headless의 실제 페이지를 지정 viewport로 구동해 스크린샷과 DOM 수치를 수집했다.

| 해상도 | 보호 영역 전후 측정 | 가로 넘침 | 클론 개수 | SKILL 로고 | 이미지 확대·닫기 |
| --- | --- | --- | --- | --- | --- |
| 1920×1080 | 동일 | 없음 | 3 | 0 | 통과 |
| 1440×900 | 동일 | 없음 | 3 | 0 | 통과 |
| 1024×768 | 동일 | 없음 | 3 | 0 | 통과 |
| 768×1024 | 동일 | 없음 | 3 | 0 | 통과 |
| 390×844 | 동일 | 없음 | 3 | 0 | 통과 |

수정 전후 비교: `before-*.png`, `final-*.png`. 개인 프로젝트 끝 화면·기여도·PROCESS·클론 검증 화면: `detail-*.png`. 기여도 겹침 수정 후 화면: `verified-*-contribution.png`. 카드 휠 검증: `motion-*.png`.

## 12. 품질 검사

- `npm.cmd run build`: 통과. Vite가 500kB 초과 JS 청크 경고를 표시하지만 빌드는 성공했다.
- `npm.cmd run lint`: 실행했으나 `Missing script: lint`로 실패. 프로젝트에는 lint 스크립트·ESLint 의존성/설정이 없다. 통과한 검사로 표기하지 않았다.
- `git diff --check`: 통과.
- `git diff`: 파일별 검토 완료. 보호 영역, 기존 미커밋 파일, 타 저장소가 변경되지 않았는지 확인했다.
- 브라우저 미처리 JavaScript 예외: 완료된 페이지 검증 기록에서 0건.

PowerShell 실행 정책이 `npm.ps1`을 차단하므로 같은 npm CLI의 `npm.cmd`를 사용했다. Git 상태상 삭제 자산은 명시적으로 제거한 JOIN 전용 PNG 2개뿐이다.

## 13. 추가 검토 후보·검증 한계

삭제 여부가 불명확하여 유지한 문구:

- SKILL의 `SELECTED TOOLS / PRACTICE-BASED WORKFLOW`: 이미지에는 삭제 제안이 있으나 최종 텍스트가 SKILL 문구 보존을 명시하므로 유지·확대했다.
- ABOUT의 `OBSERVE · THINK · COMMUNICATE · GROW`: 삭제 명시가 없어 유지·확대했다.
- 개인 프로젝트의 콘셉트·태그·이미지 캡션: 중복 의미 가능성이 있어도 프로젝트 정보이므로 유지했다.

기존 챗봇의 AI 영상 질문은 “두 편”을 기준으로 작성되어 있고 실제 AI VIDEO는 4편이다. 이번에는 내용이 명확한 JOIN 참조만 정정했으며, 나머지 답변의 내용 갱신은 검토 후보로 남긴다.

추가 확인이 필요한 항목은 lint 도구 설정, GPU가 활성화된 일반 브라우저의 PROFILE 말림 효과, 실제 모바일 터치 장치에서의 체감이다. 기존 외부 프로젝트 링크의 배포 상태는 이번 로컬 수정 작업에서 검증하지 않았다.
