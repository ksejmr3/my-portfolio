# THE WORKING EDITION 2차 정밀 수정·검증

작업일: 2026-11-03 (Asia/Seoul)

작업 경로: `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`, 브랜치 `master`.

1차 수정이 남아 있는 작업 트리를 기준으로 수정했다. 비교용 원본은 `.review/feedback-20261103/before-source/`, 2차 변경만의 diff는 같은 폴더의 `round2.diff`에 저장했다. 별도 리디자인 저장소·Git 커밋·푸시·배포는 건드리지 않았다.

## 1. 이번 수정 파일

| 파일 | 2차 변경 |
| --- | --- |
| `src/components/PersonalProjectCaseStudy.jsx` | 두 프로젝트의 태그 데이터·목록 제거 |
| `src/styles/personal-projects.css` | 태그 전용 스타일·모바일 규칙 제거 |
| `src/components/CloneCodingSection.jsx` | 카드와 이미지 위의 번호·번호 생성 함수·단독 제목 래퍼 제거 |
| `src/styles/clone-coding.css` | 번호 전용 스타일 제거, 기존 제목 스타일을 직접 연결 |
| `src/components/SkillSection.jsx` | 하단 보조 문구 제거 |
| `src/styles/skill-section.css` | 그리드 폭·열·간격·목록 타이포그래피 정리 |
| `src/components/AboutSection.jsx` | 지정 서명 문구 제거 |
| `src/styles/about-section.css` | 서명 스타일 제거, 본문 폭·크기·문장 간격·본문 행 높이 보정 |
| `src/data/portfolioAssistant.js` | AI 질문·답변을 기존 영상 4편 데이터에 연결 |
| `src/data/hyundaiCaseStudy.js` | 기여 요약을 내용 변경 없이 명시적인 문장 배열로 구성 |
| `src/pages/HyundaiCaseStudy.jsx` | 기여 설명의 문장별 렌더링 |
| `src/styles/base.css` | 선별한 기여 설명에만 문장 블록·간격 적용 |
| `docs/PORTFOLIO_CURRENT_SPEC.md` | 최신 지시·명세 연결 |
| `docs/FEEDBACK_REVIEW_2026-11-03.md` | 이 보고서 추가 |

이번 작업에서 자산·의존성·설정 파일은 추가하거나 삭제하지 않았다. 1차의 JOIN 자산 삭제 상태도 그대로 유지했다. 검증 스크립트·스크린샷·JSON은 기존 Git 무시 경로 `.review/feedback-20261103/`에 보관했다.

## 2. 삭제한 문구·UI

- VIVIENNE 태그: `BRITISH HERITAGE`, `PUNK REBELLION`, `EDITORIAL EXPERIENCE`.
- COS 태그: `CAMPAIGN / SS26`, `TIMELESS DESIGN`, `NEW ARRIVALS`.
- 각 개인 프로젝트의 태그 목록 래퍼와 전용 CSS.
- 클론 카드의 `01 / 03`, `02 / 03`, `03 / 03`. 이미지 위와 카드 설명 옆의 표시를 모두 제거했다.
- SKILL 하단 `SELECTED TOOLS / PRACTICE-BASED WORKFLOW`와 전용 스타일.
- ABOUT의 `OBSERVE · THINK · COMMUNICATE · GROW`와 전용 스타일.

VIVIENNE·COS의 콘셉트 부제목은 유지했다. 예를 들어 `BRITISH HERITAGE × REBELLION`, `SCANDINAVIAN MINIMALISM × TIMELESS DESIGN`은 삭제 대상 태그와 구분되는 기존 콘텐츠다.

## 3. 태그 삭제 이후 개인 프로젝트 여백

소개 다음에는 MY WORK와 CTA가 바로 이어진다. 태그에 붙어 있던 상단 22px(모바일 18px)과 태그 행 높이가 제거되었으며, 기존 역할 영역의 공통 margin만 남겼다.

| 화면 | 소개 하단→MY WORK 영역 상단, 두 프로젝트 동일 |
| --- | --- |
| 1920×1080 | 27px |
| 1440×900 | 22.5px |
| 1024×768 | 20px |
| 768×1024 | 25.59px |
| 390×844 | 21.09px |

설명·역할·사이트 링크·노트북 이미지·프로젝트 색상은 유지했다. 태그가 빠진 콘텐츠 묶음은 기존 중앙 정렬 규칙에 따라 자연스럽게 다시 배치된다.

## 4. CLONE CODING

KYUNGDONG → LOTTE WORLD → MUSIGN의 데이터와 순서는 그대로다. 카드 번호 노드는 6개에서 0개가 되었다. 섹션의 총개수 요약은 유지했다.

2차 수정 전후 GSAP effect 코드가 바이트 단위로 동일함을 확인했다. 타임라인 `.785`, scrub `.45`, 각 easing·duration·경로·진입·교차·퇴장 계산을 변경하지 않았다. 데스크톱 3개 해상도에서는 각 카드의 top·left·right·폭·높이와 이미지 측정치가 동일했다.

768px의 정적 카드에서는 제목 아래에 따로 놓였던 번호 행이 제거되어 설명 묶음의 전체 높이가 18px 줄었다. 이미지 크기는 동일하며, 번호 자리를 빈 행으로 남기지 않았다. 390px에서는 번호가 원래 제목 옆에 있어 카드 높이가 동일했다.

실제 휠 입력으로 1920·1440·1024px의 세 카드를 정·역방향으로 검사했다. 같은 진행 지점의 위치 복원 차이는 최대 약 0.17px였고 마지막 카드 이후 SKILL 진입도 정상이다.

## 5. SKILL 중앙 정렬 전후 수치

수정 전에도 DOM 컨테이너는 중앙에 있었다. 도구 이름이 좌측 정렬된 넓은 열의 빈 공간이 시각적 치우침을 만들고 있었다. 컨테이너를 임의로 옆으로 이동시키지 않고 그리드의 폭·내부 여백·밀도를 보정했다.

| 화면 | 콘텐츠 viewport 중심 | 제목 중심 | 설명 중심 | 그리드 중심 | 중심 오차 전→후 |
| --- | --- | --- | --- | --- | --- |
| 1920×1080 | 952.5px | 952.5px | 952.5px | 952.5px | 0→0px |
| 1440×900 | 712.5px | 712.5px | 712.5px | 712.5px | 0→0px |

측정 브라우저의 세로 스크롤바 폭은 15px다. 따라서 `document.documentElement.clientWidth`는 각각 1905px·1425px이며 실제 콘텐츠 중심은 위 표와 같다. `window.innerWidth / 2`와 비교하면 네 컨테이너 모두 전후 동일하게 −7.5px다. 스크롤바 절반을 정렬 오류로 간주해 별도 이동 보정을 넣지 않았다.

보조 측정으로 도구 글자 자체의 bounding box 합집합 중심도 비교했다. 콘텐츠 중심에 대한 오차는 1920px에서 −52.62→−21.75px, 1440px에서 −58.42→−21.75px로 줄었다. 도구 이름은 요청대로 각 그룹 안에서 좌측 정렬이다.

스크린샷: `before-1920-skill.png`, `after-1920-skill.png`, `before-1440-skill.png`, `after-1440-skill.png`.

## 6. SKILL 간격·타이포그래피

| 항목 | 변경 전 → 변경 후 |
| --- | --- |
| 데스크톱 그리드 폭 | 760→636px |
| 데스크톱 열 폭 | 약 221.33→180px, 세 열 동일 |
| 열 간격 | 48px 유지 |
| 행 간격 | 48→40px |
| 그룹 내부 좌우 여백 | 0→16px, 여섯 그룹 동일 |
| 소개→그리드 | 최대 64→40px |
| 제목→소개 | 24→20px |
| 상단 보조 라벨→제목 | 16→12px |
| 그룹 제목→목록 | 16→12px |
| 도구 행 사이 gap | 8→6px |
| 도구 크기 | 데스크톱 16–20px 변동→18px, 모바일 16px 유지 |
| SKILL 제목 | 1920px에서 142→120px, 1440px에서 142→115.2px |
| 모바일 그리드 | 기존 2열 유지, 행/열 간격 32/24px |

DESIGN·FRONTEND·AI TOOLS·WORKFLOW·INTERACTION·VIDEO와 모든 도구 이름을 유지했다. 상단 `TOOLS / METHODS / PRACTICE`도 유지했다. sticky·회전 로고·전용 스크롤 구간은 없다.

## 7. 챗봇 AI 영상 4편 정정

`aiVideoProjects` 배열을 직접 import해 질문의 개수와 답변의 제목·설명을 생성한다. 답변은 다음 실제 4편으로 구성된다.

1. VIVIENNE WESTWOOD RUNWAY
2. SELEX PROFIT
3. VIVIENNE WESTWOOD CONCEPT
4. CAT SHORT-FORM

설명은 각 영상의 기존 `description`을 그대로 사용한다. 새 제작 내용은 추가하지 않았다. 다른 질문·답변·챗봇 UI는 유지했다. 1440px·390px 브라우저에서 질문을 선택해 실제 답변과 패널 표시를 확인했다. JOIN은 다시 노출되지 않는다.

## 8. 문장 줄바꿈 검수·보정 목록

1차 수정 전 Git 코드와 2차 시작 시점의 JSX·CSS를 비교했다. ABOUT의 문장 배열과 `display: block`은 원래부터 유지되고 있었다. 1920px에서 18px로 커진 본문이 620px 안에서 두 줄이 되던 것이 핵심이었다.

ABOUT은 본문을 16px로 맞추고 최대 폭을 620→760px로 넓혔다. 문장 사이에는 4px 간격을 적용했다. 고정 48px이던 본문용 grid 행을 자연 높이로 바꿔 문장 수에 맞게 공간을 배정했다.

대표 문장:

- `사용자의 입장에서 생각하고, 디자인 의도를 실제 화면으로 구현할 수 있는 사람이 되고 싶습니다.`: 1920px에서 2→1줄.
- `경험을 쌓으며 꾸준히 성장하겠습니다.`: 독립된 다음 줄 유지.

ABOUT의 나머지 4개 카드도 기존 두 문장 배열을 보존했다. 모바일에서는 긴 문장의 자연 줄바꿈을 허용하며 다음 문장과의 구분은 유지한다.

HYUNDAI에서는 다음 문장 경계를 명시적인 배열·블록으로 구성했다. 문자열 자체는 바꾸지 않았다.

| 영역 | 첫 문장 끝 / 다음 문장 시작 |
| --- | --- |
| 검정 소개의 기여 요약 | `4인 팀이 기획·디자인·구현을 나누어 진행했습니다.` / `저는 Experience Finder와 전시 서브페이지를 디자인·구현하고, 메인페이지 Vehicle Exhibition의 UI 디자인을 담당했습니다.` |
| UX PLANNING & DEVELOPMENT | `시장·브랜드와 경쟁 서비스를 조사하고 STEP 1–3의 선택 기준을 구체화했습니다.` / `선택에 따른 추천 결과를 구현하고, 상세·예약 데이터 연결 구조와 화면 이동을 검토했습니다.` |
| VEHICLE EXHIBITION DESIGN | `메인페이지 Vehicle Exhibition의 UI 디자인을 담당해 차량 이미지와 차종명, 원형 비주얼의 구성 및 정보 위계를 설계했습니다.` / `공식 프로젝트 종료 후에는 차량 이미지·배경과 노출 순서를 조정하고 구현 화면을 검수했습니다.` |
| COLLABORATION | `지점별 소개 페이지의 초기 레이아웃과 공지·회원가입·로그인의 기본 레이아웃 구조를 구현했습니다.` / `이후 팀원과 세부 UI를 수정·보완하고, 컴포넌트 통합·Git 협업·반응형 검수를 진행했습니다.` |

위 HYUNDAI 설명은 기존 문자열에 문장별 구분을 추가한 것이다. UI DESIGN은 한 문장이므로 줄바꿈을 추가하지 않았다. 문장 사이 간격은 해당 설명에만 `.5em`을 적용했다.

INTRO·PROFILE·WORK INTRO·개인 프로젝트·AI VIDEO·CLONE CODING·REFLECTION·CONTACT도 검토했다. 단일 문장은 자연 줄바꿈을 유지했고 기존 PROFILE의 명시적 `<br />`, REFLECTION의 의도된 행 구분도 유지했다. 마침표·URL·날짜를 기계적으로 나누는 로직은 사용하지 않았다.

## 9. 전체 타이포그래피·여백 검토

| 역할 | 적용·검토 결과 |
| --- | --- |
| 대형 섹션 제목 | 기존 Inter·Lora 조합 유지, SKILL만 해당 구성에 맞게 축소 |
| 프로젝트 제목 | VIVIENNE·COS·HYUNDAI·클론의 기존 크기·서체 유지 |
| 본문·역할 설명 | 1차의 16–18px·한글 keep-all 유지, ABOUT만 16px로 통일 |
| 보조 라벨 | SKILL의 기존 12–13px 체계 유지, 삭제 문구의 CSS 정리 |
| 이미지 캡션 | 기존 규칙 유지 |
| CTA | 개인 프로젝트와 클론의 기존 스타일·링크 유지 |
| 메타 | 1차에 정리한 HYUNDAI 기간·역할 표시 유지 |
| 섹션 여백 | 1차의 공통 여백 유지, 삭제된 콘텐츠 높이와 SKILL 내부 간격만 보정 |

전역 font-size는 변경하지 않았다. 기존 SKILL·ABOUT 규칙을 직접 수정하고, 사라진 태그·번호·서명·하단 문구의 전용 스타일을 제거했다. 새 스타일은 선별한 HYUNDAI 문장을 표시하는 두 규칙뿐이며 보호 영역에 적용되지 않는다.

## 10. 해상도별 실제 브라우저 검증

| 해상도 | 태그·카드 번호 삭제 | SKILL 축 일치 | ABOUT 문장 분리 | 가로 넘침·본문 잘림 |
| --- | --- | --- | --- | --- |
| 1920×1080 | 통과 | 오차 0px | 통과, 대표 문장 1줄 | 없음 |
| 1440×900 | 통과 | 오차 0px | 통과 | 없음 |
| 1024×768 | 통과 | 오차 0px | 통과 | 없음 |
| 768×1024 | 통과 | 오차 0px | 통과 | 없음 |
| 390×844 | 통과 | 오차 0px, 2열 | 통과, 대표 문장 3줄+다음 문장 | 없음 |

검증은 Chrome headless의 실제 페이지에서 지정 viewport로 수행했다. 카드 번호 노드 0개, SKILL 로고·하단 문구 0개, ABOUT 서명 0개, 클론 3개 순서, 개인 프로젝트 링크 유지, 사진과 본문의 비중첩, 실제 src가 지정된 이미지의 로드 오류 없음도 확인했다.

## 11. build·diff 검사

- `npm.cmd run build`: 통과. 기존 규모의 500kB 초과 청크 경고가 남아 있으나 빌드는 성공했다.
- `git diff --check`: 통과.
- 2차 시작 시점과 비교한 변경 파일 12개 소스 diff 검토 완료. 문서 변경은 별도로 기록했다.
- 브라우저 검증의 미처리 JavaScript 예외: 0건.
- 요청대로 ESLint·lint 스크립트·의존성을 추가하지 않았다.

## 12. 기존 인터랙션·사용자 작업 보존

INTRO 자동 프리뷰, PROFILE, WORK INTRO, HYUNDAI 목업, AI 영상 재생, CONTACT, SmoothScroll, App의 원본 파일이 2차 시작 시점과 동일한지 확인했다. CLONE CODING GSAP 블록도 동일하다. SELECTED SOLUTIONS·PROCESS·HYUNDAI 목업 진입부의 높이·padding·텍스트 서체·크기·행간·크기 측정값은 5개 해상도 모두 동일했다.

클론은 실제 휠 왕복을 검증했고 개인 프로젝트와 INTRO→PROFILE→WORK 전환도 왕복 확인했다. ABOUT은 5개 카드 전환과 대표 카드의 사진·본문 범위를 확인했다. 전체 섹션 순서는 변경하지 않았다.

`src/components/ProfileIntro.jsx`는 수정하지 않았다. 시작·종료 SHA256:

`1C6E11A6AE7CC5A4C6FCD9733E870D773BD7B25E63D4DE66E13149503FBF6B42`

사용자가 일반 `npm run dev` 환경에서 확인한 PROFILE WebGL 구현을 그대로 유지했다. 자동 검수 브라우저는 GPU가 비활성화되어 해당 효과의 시각 검증에는 제한이 있다.

## 13. 남아 있는 시각적 차이

- 모바일의 긴 문장은 화면 폭에 따라 여러 줄이 된다. 문장 분리는 유지하며 nowrap을 강제하지 않았다.
- 각 기술 그룹의 도구 개수가 달라 그룹 자체 높이는 다르다. 그룹은 같은 행 시작점과 동일한 열 폭을 사용한다.
- SKILL은 내용에 따른 높이로 끝나며 다음 ABOUT이 자연스럽게 보일 수 있다. 화면을 채우기 위한 빈 영역·sticky를 추가하지 않았다.
- 768px 정적 클론 카드에서는 번호 한 행의 제거에 따라 설명 영역 높이가 18px 짧아졌다. 이미지·데스크톱 모션 카드 크기는 유지했다.
- 보호 영역과 기존 프로젝트 고유의 제목 크기·색상·서체 차이는 유지했다.

검증 자료: `before.json`, `after.json`, `motion.json`, `verify.json`, `before-*.png`, `after-*.png`, `verified-*.png`, `motion-*.png`.
