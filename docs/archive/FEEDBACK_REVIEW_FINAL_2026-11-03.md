# THE WORKING EDITION 최종 피드백 수정·검수

기준: 2026-11-03, `master`의 기존 미커밋 작업 상태. 대상은 `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio` 한 곳이다. 앞선 1차·2차 보고서와 최신 명세를 현재 코드 및 로컬 브라우저와 비교했다. 이번 최종 첨부 지시에 따라 실제 수정했으며, 이전 읽기 전용 조사와 구분한다.

## 1. 이번 수정 파일

아래 목록은 이번 작업 시작 시점과 비교한 변경이다. Git 전체 diff에는 기존 작업도 포함되므로 구분해야 한다.

| 파일 | 변경 |
|---|---|
| `src/components/PersonalProjectCaseStudy.jsx` | 두 프로젝트의 `projectType`, `concept` 데이터와 출력 노드 제거 |
| `src/styles/personal-projects.css` | 삭제된 메타·콘셉트 전용 스타일 제거, 캡션 정렬·간격 정리 |
| `src/components/CloneCodingSection.jsx` | 오른쪽 숫자 및 양쪽 span 제거, 유지할 상단 문구만 출력 |
| `src/styles/clone-coding.css` | 상단 문구 중앙 정렬·라벨 크기 적용, 일반 설명 선택자가 라벨까지 덮던 충돌 해소 |
| `src/pages/HyundaiCaseStudy.jsx` | 보드 오른쪽 제목 데이터, MY CONTRIBUTION 기간 UI 제거 |
| `src/components/EvidenceFigure.jsx` | 제목이 없는 이미지에는 빈 제목 span도 출력하지 않도록 처리 |
| `src/styles/base.css` | 기간 전용 CSS 제거, 개인 프로젝트·보드 캡션 공통 규칙 및 14px 간격 적용 |
| `src/components/AboutSection.jsx` | 상단 보조 문구 제거 |
| `src/styles/about-section.css` | 해당 보조 문구 스타일 제거 |
| `src/components/ContactSection.jsx` | 상단 보조 문구 제거 |
| `src/styles/contact-section.css` | 해당 보조 문구와 모바일 전용 스타일 제거 |
| `docs/PORTFOLIO_CURRENT_SPEC.md` | 이번 최종 기준 및 캡션 예외 명시 |
| `docs/FEEDBACK_REVIEW_FINAL_2026-11-03.md` | 이번 결과 기록 |

기존 `ProfileIntro.jsx` 변경을 포함한 미커밋 파일, 기존 JOIN 이미지 삭제 상태, untracked 보고서는 보존했다. 다른 저장소는 수정하지 않았다. QA 스크립트·원본 스크린샷은 Git에서 무시되는 `.review/feedback-final-20261103/`에 보관했다.

## 2. 실제 삭제한 문구

| 표시 영역 / 파일 | 삭제 원문 | 처리 |
|---|---|---|
| VIVIENNE / `PersonalProjectCaseStudy.jsx` | `개인 웹사이트 리디자인` | 독립 메타·출력·전용 스타일 삭제 |
| VIVIENNE / 같은 파일 | `BRITISH HERITAGE × REBELLION` | 콘셉트 데이터·출력·전용 스타일 삭제 |
| COS / 같은 파일 | `COS KOREA 공식 사이트 기반 개인 랜딩페이지 리디자인` | 독립 메타·출력 삭제 |
| COS / 같은 파일 | `SCANDINAVIAN MINIMALISM × TIMELESS DESIGN` | 콘셉트 데이터·출력 삭제 |
| CLONE CODING / `CloneCodingSection.jsx` | 오른쪽 `01 — 03` | span과 양쪽 배치 구조 삭제 |
| HYUNDAI 보드 / `HyundaiCaseStudy.jsx` | `FIGMA UI DESIGN BOARD` | 오른쪽 제목 데이터·빈 출력 제거 |
| ABOUT / `AboutSection.jsx` | `WORKING NOTES / 2026` | 노드·전용 스타일 삭제 |
| CONTACT / `ContactSection.jsx` | `CONTACT / KIM JIYOUNG` | 노드·전용 스타일 삭제 |
| MY CONTRIBUTION / `HyundaiCaseStudy.jsx` | `OFFICIAL TEAM PROJECT`, `2026.09.01–09.30` | 기간 라벨·날짜·래퍼 삭제 |
| MY CONTRIBUTION / 같은 파일 | `PERSONAL FOLLOW-UP`, `2026.10.01–10.12` | 기간 라벨·날짜·래퍼·전용 CSS 삭제 |

5개 해상도의 실제 DOM에서 해당 메타·기간·보조 문구 노드가 남지 않았음을 확인했다. 이전에 삭제한 JOIN, 개인 프로젝트 태그 6개, 클론 카드 번호, SKILL 하단 문구, ABOUT 하단 서명도 렌더링되지 않는다.

독립 메타와 동일한 문자열 일부가 들어간 **미사용 과거 소개 문장**은 아래 11항에 따로 기록했다. 현재 화면의 삭제 대상 데이터와 구분했으며, 다른 문장을 임의로 재작성하지 않았다.

## 3. 유지한 문구·콘텐츠

- 두 프로젝트 제목, 기존 한국어 소개, MY WORK 및 실제 역할, WEBSITE와 연결 주소, 이미지·노트북 목업·자동 스크롤·프로젝트별 배경색.
- `FASHION LANDING PAGE REDESIGN`, `MINIMAL FASHION LANDING PAGE REDESIGN`, 기준 캡션 `INTEREST-BASED EXPERIENCE FINDER`.
- `03 PROJECTS · CLONE CODING`, `through practice`, KYUNGDONG → LOTTE WORLD → MUSIGN 순서, 카드 크기·위치·GSAP 효과.
- 보드 왼쪽 `FIGMA / WIREFRAME & UI DESIGN`, 원본 이미지·확대 버튼·배치.
- MY CONTRIBUTION 실제 수행 설명과 협업·후속 작업 이력 데이터. 기간 UI 제거는 이력 삭제가 아니다.
- SKILL `TOOLS / METHODS / PRACTICE`, 기술 그룹 6개와 모든 도구 이름, 정적 그리드.
- ABOUT 제목·소개·카드 5개·사진·전환, CONTACT 연락 정보·연결 주소·푸터·저작권·다른 CONTACT 표기.
- INTRO, PROFILE, WORK INTRO, HYUNDAI 목업 도입부, SELECTED SOLUTIONS, PROCESS, 영상 4편, 기존 라우팅과 외부 링크.

## 4. 캡션 실측 전후

수정 전에 기준 HYUNDAI 캡션의 computed style을 5개 해상도에서 측정했다. 기준 파일과 보호 목업·SELECTED SOLUTIONS의 CSS는 수정하지 않았다.

| 속성 | HYUNDAI 기준 | 개인 캡션 수정 전 | 보드 수정 전 | 개인·보드 수정 후 |
|---|---|---|---|---|
| family | Inter, Arial, sans-serif | Inter | DM Sans | Inter, Arial, sans-serif |
| size | 9px, 전 해상도 | 1920:13 / 1440:12.24 / 이하:12px | 동일한 13 / 12.24 / 12px | 전 해상도 9px |
| weight | 500 | 500 | 400 | 500 |
| letter-spacing | .08em = .72px | .08em | .04em | .08em = .72px |
| line-height | 1.3 = 11.7px | 1.3 | 1.5 | 1.3 = 11.7px |
| opacity | 1 | .72 | 1 | 1 |
| color | rgba(23,23,22,.65) | 프로젝트별 기존 색 | 기존 밝은 색 | COS: 기준과 동일 / VIVIENNE: rgba(247,243,239,.65) / 보드: rgba(244,243,239,.65) |
| 이미지 하단 간격 | 보이는 이미지 기준 약 14.28–14.70px | 약 7px, 캡션 아래 padding 9px | 12px | 공통 14px, 개인 실측 오차 .01px 이내 |
| 정렬 | 이미지 왼쪽 기준 | 박스 왼쪽+4px | 양끝 두 캡션 | 보이는 목업 왼쪽 / 보드 왼쪽 한 캡션 |

개인 PNG의 실제 불투명 영역은 박스 왼쪽에서 2.5% 안쪽이므로 그 경계에 맞췄다. 캡션의 왼쪽 정렬 오차는 .015px 이내다. 보드에는 캡션 자식 span 하나만 남았고 실제 텍스트와 이미지 간격은 14px이다.

색상은 배경 대비를 위해 의도적으로 구분했다. 밝은 COS에는 기준 먹색을 그대로 쓰고, 어두운 VIVIENNE·보드에는 같은 .65 알파의 밝은 색을 썼다. 어두운 배경에 기준 먹색을 강제하지 않았다. 기준 캡션이 9px이므로 요청된 이미지 캡션에 한해 일반 캡션 스케일의 명시적 예외로 유지한다.

## 5. 전체 타이포그래피 역할 검수

| 역할 | 확인·적용 결과 |
|---|---|
| 대형 섹션 제목 | 기존 Inter 및 Lora 이탤릭 대비·반응형 크기 유지. INTRO/WORK의 연출형 제목 보호 |
| 프로젝트 제목 | 두 개인 프로젝트의 같은 제목 규칙 유지. 삭제 메타와 무관한 대형 타이틀 재설계 없음 |
| 한국어 본문 | 기존 Pretendard, 대체로 16–18px 및 약 1.65–1.72 행간 유지. ABOUT 소개·CONTACT 등 기존 강조 크기는 별도 유지 |
| MY ROLE / MY WORK | 라벨과 수행 본문의 위계를 유지. 두 개인 프로젝트는 같은 컴포넌트·간격 규칙 사용 |
| 이미지 캡션 | 위 4항의 공통 Inter 500 / 9px / .08em / 1.3 / 14px 규칙 적용 |
| CLONE 상단 라벨 | `--type-label`, 600, 1.5, 중앙. 일반 설명 선택자에서 제외해 기존 body 크기 덮어쓰기를 해소 |
| CTA·카드 설명 | 기존 상호작용 및 카드 정보 밀도 유지. 모든 작은 텍스트를 일괄 확대하지 않음 |
| 날짜·메타 | 지정한 기간과 보조 메타만 삭제. 다른 섹션 번호·저작권·영상 번호 유지 |
| 이미지 내부 텍스트 | Figma 보드·영상·결과물 자체의 서체·크기는 원본 유지 |

CLONE 상단 라벨의 최종 computed font-size는 1920에서 13px, 1440에서 12.24px, 나머지에서 12px이다. 헤더·본문·캡션의 역할을 분리했으며 전역 본문 크기는 바꾸지 않았다. 보호 영역의 기존 소형 라벨은 이번 확대 후보에서 제외했다.

## 6. 여백 전후

| 영역 | 수정 전 → 후 |
|---|---|
| VIVIENNE / COS | 제목 주변의 메타·콘셉트 행과 전용 margin 제거. 제목 → 소개 → MY WORK → CTA만 연결. 소개와 MY WORK 사이 기존 간격 유지 |
| 개인 캡션 | 위쪽 약 7 → 14px, 아래 전용 padding 9 → 0px, 목업 가시 경계에 맞춤 |
| 보드 캡션 | 위쪽 12 → 14px, 양끝 두 항목 → 왼쪽 한 항목 |
| MY CONTRIBUTION | 기간 행·전용 gap 제거, 기존 섹션 padding과 수행 항목 간격 유지 |
| CLONE | 양쪽 숫자 배치 → 가운데 라벨 하나. 카드의 측정 크기·위치, 데스크톱 pin 구간 유지 |
| ABOUT | eyebrow 행 제거. 섹션 padding·카드 내부 간격 유지 |
| CONTACT | eyebrow 행 제거. 연락·탐색·푸터 구조 유지. 데스크톱 전체 화면 높이 유지 |
| SKILL / AI VIDEO | 기존 여백 유지. 시각 검수에서 추가 보정이 필요한 새 불균형을 확인하지 못해 CSS를 수정하지 않음 |
| HYUNDAI 보호 목업 / SELECTED SOLUTIONS / PROCESS | 5개 해상도 모두 수정 전후 수집한 높이·padding·텍스트 크기·박스 값 일치 |

실측 높이 예: MY CONTRIBUTION은 1920에서 3288 → 3173px, 390에서 4223 → 4063px. 개인 프로젝트 구간은 768에서 1848 → 1666px, 390에서 1547 → 1381px. ABOUT은 1920에서 5741 → 5699px, 390에서 1163 → 1123px. CONTACT는 390에서 923 → 881px이다. 삭제된 행이 자연스럽게 줄어든 결과이며 모든 섹션을 같은 높이로 맞추지 않았다. GSAP pin을 위한 스크롤 길이는 일반 본문 여백과 구분했다.

## 7. 문장 줄바꿈

- HYUNDAI 소개·기여 설명의 독립 `.case-copy__sentence` 9개를 유지했다. 여러 문장을 하나로 합치지 않았다.
- PROCESS와 PROJECT REFLECTION은 기존 설명·문장 블록·전환을 유지했다. 화면 폭에 따른 여러 줄 배치를 허용했다.
- VIVIENNE·COS 소개, AI 소개·MY ROLE·영상 설명, CLONE 설명, SKILL 소개, CONTACT 설명은 원문을 유지했다. 새 말줄임이나 축약을 추가하지 않았다.
- ABOUT 5개 카드 모두 문장 블록을 확인했다. 768px에서는 NEXT STEP 첫 문장이 한 줄, 390px에서는 세 줄이며 다음 문장은 별도 블록 한 줄로 유지된다. 390px의 나머지 카드 문장은 주로 각 두 줄이다. 사진 아래 본문이 카드의 콘텐츠 높이를 벗어나지 않는다.
- 검사한 본문 요소에서 가로 잘림은 없었다. 전역 문장 크기를 확대하지 않아 기존 줄바꿈에 추가 압박을 주지 않았다.
- 보호 PROFILE의 390px 소개는 기존 문자열 끝 `웹디자이너입니다.`의 마지막 `다.`가 다음 줄로 넘어간다. 시각적으로 확인했지만 `ProfileIntro.jsx` 수정 금지에 따라 그대로 두었다. 전체 사이트의 모든 한글 줄바꿈이 이상 없다고 판정하지 않는다.

## 8. SKILL 시각적 중심

5개 해상도의 스크린샷에서 제목·소개 중심과 그룹 간 여백을 함께 확인했다. 데스크톱 및 768px의 3열×2행, 390px의 2열 구성을 유지한다. 그룹 내부는 읽기 위한 왼쪽 정렬이다. 도구 이름의 길이·개수 차이로 생기는 문자 면적 차이를 보정하려고 전체 그리드를 임의 이동하지 않았다.

제목과 소개, 그룹 전체의 좌우 여백을 화면에서 비교했으며 이번에는 추가 CSS 보정이 필요하지 않았다. 6개 그룹, 모든 도구, 그룹 제목과 목록의 간격이 유지됐다. 로고·회전·sticky 체류는 다시 추가하지 않았다.

## 9. 해상도별 실제 화면 검증

전후 원본 스크린샷, computed style, 최종 추가 검증 스크린샷을 비교했다. 아래 결과는 지정 변경 영역의 판정이며, 보호 PROFILE의 기존 줄바꿈 및 GPU 한계는 별도다.

| 해상도 | 시각 검증 결과 | CLONE 라벨 중심 오차 |
|---|---|---:|
| 1920×1080 | 삭제 행 정리, 두 개인 프로젝트·보드 캡션 일치, 3×2 SKILL, ABOUT/CONTACT 확인 | 0px |
| 1440×900 | 개인 프로젝트 제목·소개·역할 그룹, 캡션, 기여 영역의 자연스러운 연결 확인 | .008px 이내 |
| 1024×768 | 데스크톱 pin 구조에서 제목·이미지·본문 배치 및 CLONE 카드 크기 유지 확인 | .016px 이내 |
| 768×1024 | 개인 프로젝트 세로 구성, 클론 그리드, SKILL 3열, ABOUT 문장·사진 확인 | .008px 이내 |
| 390×844 | 개인 프로젝트 캡션 왼쪽 기준, 클론 한 열, SKILL 두 열, ABOUT 문장 구분 확인 | .008px 이내 |

중심은 스크롤바를 제외한 실제 부모 콘텐츠 영역 기준이다. 모든 해상도에서 가로 페이지 overflow 없음, 지정 삭제 노드 0개, 검사한 본문 가로 잘림 없음, 로드된 이미지 오류 없음, 수집된 미처리 JS 예외 없음. 보드 확대·Escape 닫기와 ABOUT 카드 5개 상태를 각 해상도에서 확인했다. AI 영상 4편도 각 해상도에서 `play()` 후 실제 `currentTime` 증가와 media error 없음까지 확인했다.

화면 증빙은 `.review/feedback-final-20261103/`의 `before-*.png`, `after-*.png`, `verified-*.png`에 있다. 최종 CLONE 상단 라벨은 `verified-*-clone-centered.png`를 기준으로 한다. `after.json` 촬영 후 라벨 선택자 충돌을 정리했으므로 최종 라벨 수치는 `verify.json`에 기록했다.

## 10. 정방향·역방향 인터랙션

- CLONE의 GSAP effect 전체를 작업 전 소스와 비교해 동일함을 확인했다. 타임라인 duration .785, scrub·easing·카드 geometry를 유지했다.
- 1920/1440/1024에서 실제 wheel 입력으로 진입 → 교차 → 세 카드 → 퇴장과 역순을 검증했다. 동일 진행 위치의 왕복 카드 좌표 차이는 최대 약 .327px이며 카드 순서는 유지됐다. 종료 후 SKILL이 정상 노출된다.
- 768/390에서는 기존 반응형 정적 카드 흐름을 실제 wheel로 내려갔다가 되돌렸고 시작 위치로 복귀했다. 데스크톱 pin을 모바일에 추가하지 않았다.
- INTRO → PROFILE → WORK와 개인 프로젝트의 스크롤 진행·복귀 상태를 데스크톱에서 점검했다. WebGL의 실제 페이지 컬 효과는 GPU 제약으로 시각 검증하지 못했다.
- ABOUT의 기존 스크롤/클릭 전환, 보드 lightbox, 영상 재생을 유지했다. 기존 라우팅·외부 링크 값은 전후 비교 결과 동일하다. 보호 SELECTED SOLUTIONS·PROCESS JSX 및 ProcessStage 함수, 기여 내용 배열도 작업 전과 동일하다.

## 11. 추가 후보 — 이번에는 변경하지 않음

| 위치 / 파일 | 원문 또는 의미 | 판단 |
|---|---|---|
| SKILL / `src/components/SkillSection.jsx` | `TOOLS / METHODS / PRACTICE` | 제목 아래 소개와 의미가 일부 겹치지만 도구·방법 범위를 안내하는 라벨. 이번 삭제 지시 없음, 유지 |
| CLONE / `src/components/CloneCodingSection.jsx` | `through practice` | CLONE CODING 및 한국어 소개와 의미 연관. 명시적인 유지 지시를 우선 |
| 개인 프로젝트 / `src/components/PersonalProjectCaseStudy.jsx` | 두 영문 목업 캡션과 한국어 소개 | 프로젝트 성격이 일부 겹치지만 이미지 식별 역할. 명시적인 유지·스타일 통일 지시 적용 |
| HYUNDAI / `src/pages/HyundaiCaseStudy.jsx` | UI DESIGN 등 기여 항목명·보드 식별 라벨 | 단어는 반복되지만 결과물과 수행 역할의 위치가 다름. 동일 문장 반복으로 보지 않음 |
| 미사용 / `src/data/projects.js` | `브랜드 해석과 시각적 표현을 중심에 둔 개인 웹사이트 리디자인.` / `콘셉트와 비주얼 디자인을 중심에 둔 개인 웹사이트 리디자인.` | 화면에 출력되지 않는 과거 설명. 독립 메타와 달리 긴 문장의 일부이므로 보존. 향후 미사용 코드 정리 시 함께 검토 |
| 미사용 / `src/pages/VivienneCaseStudy.jsx` | `개인 웹사이트 리디자인 프로젝트. 브랜드의 헤리티지와 반항적인 태도를 초대형 타이포, 비대칭 이미지, 절제된 컬러로 재해석했습니다.` | 현재 App 경로에서 사용하지 않는 과거 페이지. 실제 렌더링에 남은 메타로 오인하면 안 됨. 별도 페이지 삭제·재작성 없이 보존 |
| AI / `src/data/aiVideoContents.js`, `src/data/portfolioAssistant.js` | 영상 소개를 화면과 챗봇 안내에서 공유 | 같은 원본 데이터 활용. 한 화면의 중복 설명과 구분, 일관된 안내를 위해 유지 |

추가 문구는 임의로 삭제하거나 재작성하지 않았다. 수정 금지 영역은 삭제 추천 후보로 넣지 않았다.

## 12. 검사 결과와 확인하지 못한 범위

- `npm.cmd run build`: 최종 소스 기준 통과.
- `git diff --check`: 통과.
- 기존 package scripts는 dev/build/preview이며 lint·test 스크립트가 없다. 새 의존성·설정을 추가하지 않았다.
- 소스 보존 및 전후 측정값 비교 스크립트 통과. `ProfileIntro.jsx` SHA256은 작업 전후 `1C6E11A6AE7CC5A4C6FCD9733E870D773BD7B25E63D4DE66E13149503FBF6B42`로 동일하다.
- 기존 대형 JS 번들 경고는 남아 있다. 이번 범위를 넘어 번들 구조를 변경하지 않았다.
- GPU가 비활성화된 headless Chrome에서 PROFILE의 WebGL 효과를 실제 GPU 화면으로 검증하지 못했다. 정상 작동한다는 사용자 환경을 존중하고 해당 파일·shader를 수정하지 않았다.
- 브라우저 크기 에뮬레이션으로 확인했으며 실제 휴대폰 터치·모바일 OS·모든 브라우저 조합은 확인하지 않았다. 모바일 wheel 왕복은 실제 터치 제스처 검증을 대신하지 않는다.
- 모든 외부 사이트의 접속 성공, 실제 메일 발송·전화 연결은 실행하지 않았다. 기존 링크 값 및 로컬 UI를 확인했다.
- INTRO의 자동 프리뷰를 포함한 모든 연출의 모든 프레임을 전수 검사한 것은 아니다. 기존 소스 보존과 대표 진행·복귀 상태를 확인했다.
- 로컬 작업만 수행했다. Commit·Push·Vercel 배포는 실행하지 않았다.
