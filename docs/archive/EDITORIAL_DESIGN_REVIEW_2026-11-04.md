# THE WORKING EDITION — 위계·정렬·여백 정밀 검수

검수일: 2026-11-04 · 작업 경로: `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio` · 로컬 `master`.

이번 요청의 명시적 변경만 적용했다. 시작 당시 미커밋 파일·untracked 문서·JOIN 이미지 삭제 상태를 보존했다. 비교 기준은 Git HEAD가 아니라 **이번 작업 시작 시점의 실제 파일 사본과 SHA-256 목록**이다. 이전 수정 결과를 이번 수정으로 계산하지 않는다.

## 1. 이번 수정 파일과 검증 자료

| 파일 | 이번 변경 |
|---|---|
| `src/components/WorkSection.jsx` | WORK INTRO 지정 문장 교체 |
| `src/components/ProjectCard.jsx` | HYUNDAI 진입 카드 번호·SELECTED WORK 출력 래퍼 제거 |
| `src/components/PersonalProjectCaseStudy.jsx` | PERSONAL WORK를 기존 프로젝트 정보 그룹 안으로 이동; 중첩 header 방지를 위해 라벨 래퍼를 div로 변경 |
| `src/styles/base.css` | 제거한 래퍼 전용 스타일·불필요해진 flex gap 정리, 공통 프로젝트 유형 라벨 규칙 |
| `src/styles/personal-projects.css` | 라벨과 정보 그룹의 간격, 공통 좌측 정렬, 기존 목업 영역을 보존하는 내부 배치 |
| `docs/PORTFOLIO_CURRENT_SPEC.md` | 최신 예외와 기준을 추가 |
| `docs/EDITORIAL_DESIGN_REVIEW_2026-11-04.md` | 이번 보고서 신규 작성 |

실제 제품 소스 변경은 **5개**다. 마스코트, PROFILE, HYUNDAI 상세, AI VIDEO, CLONE, SKILL, ABOUT, CONTACT 소스와 데이터는 이번에 수정하지 않았다. 과거부터 Git에 표시되는 변경 파일 수와 구분해야 한다.

검증 전용 자료는 [`.review/editorial-20261104/`](../../.review/editorial-20261104/)에 있다. `.review`는 기존 Git ignore 대상이며 제품의 import 경로에 연결하지 않았다. 사용자 파일이나 이전 검증 폴더를 삭제하지 않았다.

| 자료 | 용도 |
|---|---|
| `before-source/`, `start-hashes.json`, `start-status.txt` | 시작 시점 소스·파일 해시·Git 상태 |
| `cdp.mjs`, `baseline.html`, `measure.mjs`, `before.json`, `after.json` | 동일 브라우저에서 전후 좌표·서체·보호 영역·ScrollTrigger 측정 |
| `hyundai-entry.mjs`, `hyundai-entry.json`, `entry-{before,after}-*.png` | HYUNDAI 진입 애니메이션이 끝난 화면의 정확한 전후 비교 |
| `final-projects.mjs/json`, `verify-source.mjs`, `source-verification.json`, `metrics.csv` | 최종 프로젝트 정렬, reduced-motion 목업, 원본 파일 보존 검사·전체 수치 |
| `site-review.mjs/json`, `gpu.json`, `gpu-*.png`, `site-*.png` | 전체 섹션, 실제 GPU 말림, 자동재생, ABOUT 전환 |
| `motion.mjs/json`, `motion-*.png` | CLONE 휠 왕복·카드 교차·퇴장, 개인 프로젝트 왕복, INTRO 전환 |
| `mobile.mjs/json`, `stability.mjs`, `final-stability.json`, `hint.mjs/json`, `details.mjs/json` | 모바일 본문 가림·깜빡임·리스너·말풍선·챗봇, 프리뷰·캡션 |
| `sheets.ps1`, `sheet-{projects,site}-*.png` | 원본 스크린샷을 모아 시각 대조한 검수판 |
| `report-metrics.mjs`, `artifact-manifest.json`, `final-status.txt`, `final-diff-stat.txt`, `final-diff-check.txt` | 보고서 수치 생성, 개별 검증 파일 목록, 최종 Git 원시 결과 |

`before/after-*-hyundai.png`는 카드 진입 시작 시점의 사진이다. 최종 HYUNDAI 판단과 아래 수치는 **`entry-before/after-*.png`와 `hyundai-entry.json`**을 사용한다. 두 시점을 혼용하지 않는다.

## 2. WORK INTRO 문구 변경 전후

- 이전: `팀 웹사이트 리뉴얼과 두 브랜드의 개인 리디자인에서 조사·설계·구현 과정을 보여드립니다.`
- 현재: `팀 프로젝트와 두 개의 개인 리디자인 작업을 통해 웹 경험을 설계하고 구현한 결과물을 소개합니다.`

지정 문장 그대로 교체했다. 기존 글자 크기·행간·좌측 정렬·스크롤 코드는 유지했다. 1920에서는 18px/30.96px, 나머지 검수 폭에서는 16px/27.52px이다. 390에서는 335px 본문 폭 안에서 두 줄로 표시된다. 제목과 하단 설명 사이의 넓은 공간은 기존 전환 레이아웃을 유지한 결과다.

## 3. HYUNDAI 번호·SELECTED WORK 삭제

`ProjectCard.jsx`의 `.project-card__topline` 전체 출력과 전용 CSS를 제거했다. 따라서 화면의 `01 / 03`, `SELECTED WORK`와 빈 행이 함께 사라졌다. `.project-card__content`에는 story 한 개만 남아 불필요한 flex gap도 제거했다.

`UX/UI WEBSITE RENEWAL · TEAM PROJECT`, 프로젝트명·설명·두 링크는 유지했다. 데이터의 `project.number` 자체는 남아 있지만 이 카드에서 렌더링하지 않는다. 기능·과정 번호, INTRO 자동 프리뷰 상태, ABOUT 상태, AI FILM 번호, CLONE 총개수는 삭제하지 않았다.

| 해상도 | 유형 라벨 y 이전 → 현재 | 카드 높이 이전 = 현재 |
|---|---:|---:|
| 1920×1080 | 390.52 → 340.77 | 1080 |
| 1440×900 | 326.61 → 277.44 | 900 |
| 1024×768 | 275.45 → 236.73 | 768 |
| 768×1024 | 324.77 → 291.72 | 1024 |
| 390×844 | 410.84 → 381.84 | 748.47 |

y는 카드 상단 기준 CSS px이며 진입 완료 상태다. 목업의 x·y·너비·높이 변화는 다섯 해상도 모두 **0px**이다. 캡션·이미지 비율·CTA 외형·스크롤 트리거도 유지했다. 삭제된 행을 제외한 콘텐츠가 기존 중앙 정렬 안에서 위로 정돈되었다. 768의 기존 영문 제목 분리는 14번에 별도 기록한다.

## 4. 프로젝트 유형 라벨 통일

세 라벨은 공통 규칙 `Inter / 600 / var(--type-label) / line-height:1.5 / letter-spacing:.12em`을 사용한다. HYUNDAI는 기존 검정, VIVIENNE는 밝은 글자, COS는 검정 계열을 유지한다. 새로운 번호·메타는 추가하지 않았다.

| 해상도 | 세 라벨의 공통 크기 / 행간 / 자간 |
|---|---|
| 1920×1080 | 13 / 19.5 / 1.56px |
| 1440×900 | 12.24 / 18.36 / 1.4688px |
| 1024×768, 768×1024, 390×844 | 12 / 18 / 1.44px |

유형 문구는 HYUNDAI `UX/UI WEBSITE RENEWAL · TEAM PROJECT`, 개인 두 프로젝트 `PERSONAL WORK` 그대로다. 배경과 이미지 구성을 통일하는 변경은 하지 않았다.

## 5. VIVIENNE / COS 버튼 좌측 정렬

측정 결과 시작 시점에도 WEBSITE **외곽선**은 제목·본문·MY WORK와 같은 x에 있었다. 버튼의 내부 좌우 padding 14px 때문에 `WEBSITE` 글자 시작점은 외곽선보다 안쪽이다. 이를 버튼 전체 들여쓰기로 오인하여 음수 margin을 추가하지 않았다. `text-align:left`, `justify-self:start`, `margin-inline:0`으로 두 프로젝트의 정렬 의도를 명시했다.

| 해상도 | VIVIENNE 제목 x / 버튼 x 이전 → 현재 | COS 제목 x / 버튼 x 이전 → 현재 | 버튼 너비×높이, 전후 동일 |
|---|---|---|---|
| 1920×1080 | 187.50 / 187.50 → 187.50 / 187.50 | 187.50 / 187.50 → 187.50 / 187.50 | 123.45×42 |
| 1440×900 | 60.47 / 60.47 → 60.47 / 60.47 | 60.47 / 60.47 → 60.47 / 60.47 | 119.70×42 |
| 1024×768 | 40.95 / 40.95 → 40.95 / 40.95 | 40.95 / 40.95 → 40.95 / 40.95 | 118.52×42 |
| 768×1024 | 38.39 / 38.39 → 38.39 / 38.39 | 38.39 / 38.39 → 38.39 / 38.39 | 118.52×42 |
| 390×844 | 20 / 20 → 20 / 20 | 20 / 20 → 20 / 20 | 118.52×42 |

x는 각 프로젝트 article 기준이다. 실제 글리프의 side bearing은 글자마다 달라질 수 있지만, 외곽선과 콘텐츠 DOM 기준선 차이는 전후 모두 0px이다. 기존 1px 외곽선·둥근 모서리·화살표·hover/focus·링크 주소를 유지했다. HYUNDAI CTA는 수정하지 않았다.

## 6. 개인 프로젝트 정보 그룹·간격

데스크톱에서 PERSONAL WORK가 본문과 떨어진 상단 레일에 있던 구조를 정리했다. 기존 heading 안에 넣되 24–32px의 명확한 그룹 간격을 두었다. 텍스트 그룹은 기존 목업 영역을 기준으로 가운데 정렬한다. VIVIENNE 두 줄 제목과 COS 한 줄 제목의 높이가 달라 각각의 절대 y는 다르다. 제목을 억지로 같은 y로 고정하면 그룹의 균형이 깨지므로 같은 관계·간격 규칙을 적용했다.

모바일은 기존 세로 구성이 이미 연결되어 있었다. 제목·본문·버튼·이미지의 기존 y를 유지하고 라벨만 같은 정보 그룹에 포함했다. 목업을 옮기지 않기 위해 기존 상단 레일이 차지하던 공간을 내부 inset으로 보존했다. 빈 DOM 행은 남기지 않았다.

| 해상도 | 라벨→제목 이전 VIV / COS → 현재 공통 | 제목→소개, 전후 공통 | 소개→MY WORK, 전후 공통 | MY WORK→업무 글리프 시작 | 업무 블록→CTA |
|---|---|---:|---:|---:|---:|
| 1920×1080 | 309.67 / 342.98 → 32 | 27 | 27 | 9 | 12 |
| 1440×900 | 244.77 / 274.05 → 27 | 22.5 | 22.5 | 8 | 12 |
| 1024×768 | 189.66 / 196.52 → 24 | 20 | 20 | 8 | 12 |
| 768×1024 | 42 / 42 → 39 | 25.59 | 25.59 | 8 | 12 |
| 390×844 | 40.44 / 40.44 → 37.44 | 18 | 21.09 | 8 | 12 |

MY WORK의 CSS grid gap은 5px이며 표의 8–9px은 서체 여유를 포함한 실제 텍스트 Range 기준이다. 나머지 간격은 요소 박스 경계 기준이다. 자세한 좌표·그룹 높이·padding·서체는 부록 A와 [metrics.csv](../../.review/editorial-20261104/metrics.csv)에 기록했다.

## 7. 전체 타이포그래피·여백 점검

| 섹션 / 역할 | 확인 결과와 유지 판단 |
|---|---|
| INTRO | Inter 대형 제목과 Lora 이탤릭 위계 유지. 한국어 설명과 프리뷰·내비의 위계 분리. 프리뷰 자동 상태 번호 유지 |
| PROFILE | 실제 GPU 말림과 독립된 텍스트 영역 유지. 390의 문장 끝 단독 글자 문제는 보호 영역 후보 |
| WORK INTRO | 새 문장의 두 줄 모바일 배치·좌측 정렬 확인. 대형 selected works와 넓은 전환 여백 유지 |
| HYUNDAI 진입 | 제거 행의 잔여 래퍼 없음. 유형 라벨만 공통화. 목업과 카드 높이 보존 |
| HYUNDAI 상세 | 소개·SELECTED SOLUTIONS·PROCESS·기여·마무리 본문 유지. 넓은 pin 구간을 빈 여백으로 오인하여 줄이지 않음. 보호 9px 캡션 유지 |
| VIVIENNE / COS | 제목·소개·MY WORK·업무·버튼 좌측선 일치. 대형 제목의 줄 수 차이는 프로젝트 고유 구성으로 유지. 소개·업무 설명은 16–18px/1.65–1.7 |
| AI VIDEO | 제목 이탤릭, 소개와 MY ROLE 구분선 유지. 4편의 FILM 상태·제목·본문 위계, 모바일 1열/태블릿 2열 확인 |
| CLONE CODING | 제목·중앙 총개수·본문과 카드의 시간차 유지. through practice 없는 상태 유지. 세 카드 정·역방향 교차 검증 |
| SKILL | 상단 라벨·SKILL·설명·6개 분류 유지. 도구명 desktop18px/1.5, 작은 모바일16px. 회전 인터랙션 없음 |
| ABOUT | 제목·설명·상태 번호·5개 카드 위계와 왕복 전환 유지. 한 카드만 열린 상태 확인 |
| CONTACT | 제목·안내·EXPLORE·연락 링크·footer 위계 유지. 모바일 세로 배치와 하단 여유 확인 |

공통 한글 본문은 Pretendard, 영문 UI는 Inter, 이탤릭은 Lora다. 보호 PROCESS의 기존 Manrope 등은 유지했다. 대형 타이틀은 섹션별 의도적인 크기 차이를 유지하고 모든 제목을 같은 크기로 만들지 않았다. HYUNDAI CTA의 기존 10px과 개인 CTA의 12–13px도 외형 보호 조건 때문에 유지했다.

편집 가능한 이미지 캡션은 이번 변경 전부터 **11px/14.3px, Inter 500, .08em**, 이미지와 14px 간격이다. 위치는 개인 두 목업 하단 `.personal-project__visual-caption`, 검정 HYUNDAI 소개 보드 `.case-hero figcaption`이다. 기존 margin-bottom -2.6px도 이미지 배치 보존을 위해 유지했다. 보호 4종은 9px/11.7px 그대로다. 이번에 캡션을 다시 조정하지 않았다.

수정 전후 보호 섹션의 높이·padding·본문/제목 서체와 너비·높이를 비교했으며 동일하다. AI와 SKILL은 루트 padding이 0이어도 실제 내부 `.ai-showcase`, `.skill-section__stage`에 섹션 간격이 적용되므로 루트만 보고 여백이 없다고 판단하지 않았다. 섹션별 구체적 간격은 부록 B에 기록한다.

## 8. 추가 중복·삭제 및 가독성 후보 — 이번에는 적용하지 않음

| 원문 / 위치 | 파일 | 분류 | 판단 |
|---|---|---|---|
| `UX/UI · WEB REDESIGN` / WORK INTRO 우상단 | `src/components/WorkSection.jsx:15` | HYUNDAI 유형 라벨과 의미 일부 유사, 동일 문장 아님 | 전체 작업 분류 기능도 있으므로 유지; 더 간결한 위계가 필요하면 삭제 검토 후보 |
| `TOOLS / METHODS / PRACTICE` / SKILL 제목 위 | `src/components/SkillSection.jsx:9` | SKILL·설명과 범주 의미 유사 | 정보 가치가 낮은 후보. 이번 명시 삭제 대상이 아니므로 유지 |
| `03 PROJECTS · CLONE CODING` / CLONE 제목 위, `CLONE CODING` / h2 | `src/components/CloneCodingSection.jsx:145` | 라벨 안의 **동일 어구** 반복, 동일 문장 반복 아님 | 03은 총개수 정보. 라벨의 CLONE CODING 부분만 후속 삭제 후보; 이번 유지 |
| `PERSONAL WORK`, `MY WORK`, `WEBSITE` / VIVIENNE·COS | `src/components/PersonalProjectCaseStudy.jsx:392` | 공통 UI 라벨 반복 | 유형·담당 업무·외부 링크의 역할이 같아 필요한 일관성. 유지 |
| 개인 프로젝트 소개와 `정보 구조와 UI를 설계하고 React로 구현했습니다.` / VIVIENNE 업무 | `src/components/PersonalProjectCaseStudy.jsx:35` 및 같은 파일 project.role, 출력 :398 | 소개는 디자인 방향, 업무는 실제 수행 범위. 관련 의미, 동일 문장 아님 | 유지. COS에도 같은 기준 적용 |
| AI VIDEO 소개 / MY ROLE / 각 영상 설명 | `src/components/AIVideoContents.jsx` | 분야 소개·전 과정 담당 범위·영상별 의도 | 서로 다른 정보 수준. 이번 조사에서 추가 삭제할 동일 문장 반복은 확인하지 못함 |
| ABOUT 성장 설명 / CONTACT 작업·기회 안내 | `src/components/AboutSection.jsx`, `src/components/ContactSection.jsx` | 직무·성장이라는 주제는 유사 | 자기소개와 연락 유도 기능이 달라 유지 |
| HYUNDAI 보호 9px 캡션 4종 | `src/components/HyundaiProjectPreview.jsx:78`, `src/pages/HyundaiCaseStudy.jsx:621`, :641, :653 | 가독성 개선 후보, 삭제 후보 아님 | 원본 100% 배율에서도 작은 편이고 모바일에서는 보조 정보로 읽힘. 중요 정보로 사용할 경우 11px 검토 필요. 보호 조건에 따라 유지 |
| 개인 목업 캡션 `FASHION LANDING PAGE REDESIGN`, `MINIMAL FASHION LANDING PAGE REDESIGN` | `src/components/PersonalProjectCaseStudy.jsx`의 visualCaption 데이터·출력 :226 | 프로젝트 유형과 의미 일부 유사 | 이미지의 결과물 종류를 설명하는 역할. 11px로 확인 가능하므로 이번 유지 |

SELECTED SOLUTIONS와 HYUNDAI 보호 도입·목업 영역은 추가 삭제 후보에서 제외했다. 보호 캡션은 요청대로 **가독성 평가만** 기록했다. JSX 밖의 number 등 남은 데이터가 있다고 실제 화면에도 표시된다고 판단하지 않았다.

## 9. PROFILE WebGL 검증

이번 Chrome은 GPU가 실제 활성화되어 있었다. `gpu.json`: **AMD Radeon(TM) Graphics / ANGLE Direct3D11**, `webgl:enabled`, `gpu_compositing:enabled`. WebGL2 context 생성, `is-webgl-ready`, contextLost=false를 다섯 해상도에서 확인했다. CPU 소프트웨어 렌더링만 확인한 결과가 아니다.

1920·1440·1024·768의 기존 스크롤 타임라인에서 정방향 시간 70→88→103→114→158과 역방향 88→70을 검수했다. 실제 `profilecurlprogress`는 약 0→.428→.964→1→1→.428→0. 종료 시 PROFILE opacity 0, WORK opacity 1; 복귀 시 PROFILE 1, 말림 0으로 회복했다. 말리는 실제 프레임, 거의 종료된 프레임, WORK 전환, 복귀 사진을 확인했으며 이미지가 텍스트 영역을 가리는 현상은 관찰하지 못했다.

390에서는 기존 반응형 정책에 따라 해당 pin 타임라인이 없고 프로필이 일반 세로 흐름에 표시된다. GPU 준비와 정적 표시를 확인했으며 390에서 데스크톱과 같은 스크롤 말림을 실행했다고 보고하지 않는다. `ProfileIntro.jsx`와 셰이더는 시작 시점과 바이트 해시가 동일하다.

## 10. 모바일 마스코트·챗봇

이번에는 마스코트 소스를 변경하지 않았다. 이전 구현을 그대로 검수했다. 900px 이하 52px, safe-area를 고려한 우측/하단 최소 12px, 부유 ±4px. 닫힌 상태에서 실제 텍스트 줄·조작 영역과 충돌하면 즉시 숨긴다. 말풍선이 열려 있으면 말풍선 영역도 포함한다. 안전한 상태가 220ms 지속된 뒤 재등장하며 opacity 120ms 전환을 사용한다. reduced-motion에서는 전환을 제거한다. 열린 채팅 패널은 사용자 조작을 위해 유지한다.

| 검증 | 768×1024 | 390×844 |
|---|---:|---:|
| AI·SKILL·ABOUT·CONTACT, 모든 ABOUT 카드, 채팅 종료 후 검사 위치 | 77 | 85 |
| 실제 본문/조작 영역 가림 또는 가로 넘침 | 0 | 0 |
| 보이는 위치 / 충돌로 숨겨진 위치 | 21 / 56 | 8 / 77 |
| 빠른 휠 왕복에서 150ms 미만 재등장 | 0 | 0 |
| SKILL 경계 ±8px 12회 왕복 중 class 깜빡임 | 0 | 0 |
| 자동 말풍선 표시→충돌 숨김→안전한 곳 복귀 | 통과 | 통과 |
| 챗봇 열기·실제 4편 안내·Escape 닫기·런처 포커스 복귀 | 통과 | 통과 |

해당 마스코트에 활성 scroll 리스너는 passive 1개, resize 1개로 중복 누적되지 않았다. rAF로 한 프레임에 검사 1회, cleanup과 ResizeObserver 해제 코드 유지. 측정한 구간별 검사 p95는 768에서 1.4–4.9ms, 390에서 1.1–1.3ms였다. 측정 기기에서의 수치이며 모든 실제 모바일 기기의 성능을 보증하는 수치는 아니다. 1024에서 데스크톱 런처 88px·우측/하단24px 복귀도 확인했다.

## 11. 다섯 해상도 시각 검증

원본 전후 사진과 검수판을 함께 확인했다. 새 문장·유형 라벨·개인 정보 그룹·버튼·목업뿐 아니라 HYUNDAI 상세, AI, CLONE, SKILL, ABOUT, CONTACT의 실제 화면을 검수했다.

| 해상도 | 결과 | 기존 보호 영역의 예외 |
|---|---|---|
| 1920×1080 | 공통 라벨·정렬·여백 연결 확인, 목업 변화 0, 가로 넘침 없음 | 보호 9px 캡션의 작은 크기 유지 |
| 1440×900 | VIVIENNE/COS 시각적 중심·좌측선·본문과 CTA 간격 확인, 목업 변화 0 | 보호 9px 유지 |
| 1024×768 | 좁아진 개인 텍스트 컬럼의 자연스러운 여러 줄, 카드 교차·퇴장 확인, 넘침 없음 | 보호 9px 유지 |
| 768×1024 | 개인 세로 흐름·목업·11px 캡션·챗봇 확인, 넘침 없음 | HYUNDAI 진입 제목 기존 `MOTORSTU / DIO` 분리, 후속 후보 |
| 390×844 | WORK 문장 두 줄·개인 본문/CTA/이미지 간격·AI와 도구명 가림 없음, 넘침 없음 | PROFILE 끝 `다.` 단독 줄, PROCESS `브랜 / 드` 분리, 후속 후보 |

검사한 이미지의 깨진 src는 0, 검사 대상 본문의 가로 clipping은 0이었다. CSS 단순 수치 확인에만 의존하지 않았다. 사진은 캡처 순간의 영상·애니메이션 상태를 포함하므로 일부 목업 내부 화면은 전후에 다른 프레임일 수 있다. 위치 보존은 좌표·소스 검사로 별도 확인했다.

## 12. 인터랙션 보존

| 기능 | 근거·결과 |
|---|---|
| INTRO 자동 프리뷰 | 실제 세 프로젝트 상태가 시간에 따라 자동 변경됨. 타이머 변경 없음 |
| PROFILE / WORK 전환 | 실제 GPU 정·역방향·종료·복귀 확인 |
| HYUNDAI 진입 | 실제 완료 화면·원본 진입 코드·트리거 동일. 목업과 CTA 보존 |
| SELECTED SOLUTIONS / PROCESS / MY CONTRIBUTION | 원본 파일 해시·보호 서체/기하 값 유지. 각 섹션 실제 화면 확인 |
| VIVIENNE / COS | 1920·1440·1024의 가로 진행 0→.5→1→.5→0, 이미지 스택 유지. 768·390 세로 구성. reduced-motion 1440의 전후 이미지 좌표도 동일 |
| AI VIDEO | 다섯 해상도에서 4편 모두 코드로 play()를 강제 호출하지 않고 viewport 진입 후 currentTime 증가·paused=false·오류 없음 |
| CLONE CODING | 1920·1440·1024 실제 휠 정·역방향에서 경동→롯데월드→뮤자인 등장·교차·퇴장 및 역순 복귀. 마지막 뒤 SKILL 정상 노출 |
| SKILL | 기존 정적 그리드 유지, 로고 궤도/카드 회전 트리거 없음 |
| ABOUT | 다섯 해상도에서 0→1→2→3→4→3→2→1→0 열린 카드 상태 확인 |
| CONTACT | 전체 링크 href 목록 전후 동일, 모바일 화면 및 충돌 검사. 외부 전송·전화·메일 실행은 하지 않음 |

CLONE 실측 시점에서 `.29`에는 경동+롯데, `.505`에는 롯데+뮤자인, `.21/.425/.64`에는 각각 한 카드가 보인다. `.78`에는 카드 퇴장 후 빈 무대이며 이후 SKILL로 넘어간다. 역방향에서도 동일 카드 조합이 돌아왔다. 768·390은 기존 세 카드 일반 흐름이며 데스크톱 pin을 새로 추가하지 않았다.

모든 ScrollTrigger의 start·end·animation duration은 전후 **정확히 동일**했다. 개수는 해상도 순서대로 **12 / 12 / 10 / 7 / 4**. 스크롤 거리나 section pin을 정렬 수정 때문에 변경하지 않았다. 상세 원시 결과는 `before/after.json`, `motion.json`, `site-review.json`에 있다.

## 13. 빌드·Git 검사

- `npm.cmd run build`: 성공, Vite 8.3.0, 72 modules, 1.89s. CSS 118.35kB, JS 970.07kB. 기존 500kB 초과 번들 경고는 남아 있으며 이번 범위에서 분할·의존성 변경은 하지 않았다.
- `git diff --check`: 통과. Git의 기존 LF→CRLF 안내는 오류가 아니다.
- 시작 시점 파일 해시 대조: 이번 허용 소스 5개와 최신 명세 문서 외 기존 파일 변경 없음. 기존 untracked 문서·삭제 상태 보존.
- `ProfileIntro.jsx` SHA-256: `1C6E11A6AE7CC5A4C6FCD9733E870D773BD7B25E63D4DE66E13149503FBF6B42`, 시작 시점과 동일. 셰이더를 포함한 나머지 원본 파일도 검사했다.
- 새로운 의존성·lint 스크립트 없음. Git commit/push, Vercel 배포, reset/clean 없음.
- 최종 결과 JSON 11개에서 Runtime 오류 기록 없음. 이번 검증을 위해 띄운 Vite와 전용 Chrome은 검증 후 종료했다. 다른 사용자 프로세스는 종료하지 않았다.

## 14. 남은 문제와 미검증 범위

| 항목 | 정확한 위치·현재 상태 | 이번 처리 |
|---|---|---|
| PROFILE 390 문장 | `src/components/ProfileIntro.jsx:134`, `.profile-intro__summary`: `디자인을 실제 웹 화면으로 구현하는 웹디자이너입니다.`의 `다.`가 단독 마지막 줄 | 보호 소스 유지, 후보로 보고 |
| HYUNDAI 768 제목 | `src/components/ProjectCard.jsx` h3, `src/data/projects.js`의 `HYUNDAI MOTORSTUDIO`: 제목이 `HYUNDAI / MOTORSTU / DIO` 세 줄. 전후 제목 높이147px 동일 | 진입 카드의 기존 제목 디자인·목업을 보호하므로 임의 폰트/컬럼 변경 안 함 |
| PROCESS 390 제목 | `src/pages/HyundaiCaseStudy.jsx:179`의 `시장·브랜드 리서치`: `시장·브랜 / 드 리서치`로 표시 | 보호 PROCESS 소스 유지, 후보로 보고 |
| HYUNDAI 9px 4종 | `RESPONSIVE MAIN DESIGN`, `INTEREST-BASED EXPERIENCE FINDER`, `RESPONSIVE EXHIBITION DESIGN`, `INTERACTIVE VEHICLE EXHIBITION` | 유지. 가독성 후보만 8번에 기록 |
| 실제 모바일 기기 / 다른 엔진 | 이번은 Windows Chrome의 GPU 활성 headless 브라우저, viewport emulation. 실제 iOS Safari·Android Chrome 기기 테스트는 아님 | 미검증 범위 명시 |
| 외부 링크·연락 실행 | href·UI·포커스 보존을 확인. 외부 사이트 전체 기능·메일/전화 발신·이력서 게시 여부까지 검증하지 않음 | 기능 범위를 과장하지 않음 |

제품 결함으로 처리한 추가 변경은 없다. GPU 제한은 이번 환경에서 해소했고, 보호 영역의 줄바꿈·작은 캡션은 사용자의 보호 조건에 따라 그대로 남겼다. QA 중 초기 HYUNDAI 사진의 진입 시점 선택, 줄바꿈 형식 차이(CRLF)로 인한 보존 검사, INTRO 프리뷰를 정확히 한 주기 뒤 비교하던 검사 방식을 보정했다. 제품 소스 결함과 구분하고 최종 통과 기록을 사용했다.


## 부록 A. VIVIENNE / COS 전후 실측 비교

좌표는 각 article의 좌상단 기준 `(x, y)` CSS px. 가로 스크롤 중인 COS도 article 기준으로 비교한다. 업무 텍스트는 실제 글리프 Range, 나머지는 요소 외곽 박스다. 원시 정밀도는 CSV/JSON을 따른다.

### 1920×1080

| 요소 | VIVIENNE 이전 → 현재 | COS 이전 → 현재 |
|---|---|---|
| PERSONAL WORK (x, y) | 187.50, 54 → 187.50, 353.92 | 187.50, 54 → 187.50, 387.23 |
| 프로젝트명 (x, y) | 187.50, 379.67 → 187.50, 405.42 | 187.50, 412.98 → 187.50, 438.73 |
| 소개 시작 (x, y) | 187.50, 539.92 → 187.50, 565.67 | 187.50, 506.61 → 187.50, 532.36 |
| MY WORK (x, y) | 187.50, 628.11 → 187.50, 653.86 | 187.50, 594.80 → 187.50, 620.55 |
| 업무 설명 시작 (x, y) | 187.50, 658.55 → 187.50, 684.30 | 187.50, 625.23 → 187.50, 650.98 |
| WEBSITE 외곽선 (x, y) | 187.50, 696.23 → 187.50, 721.98 | 187.50, 662.92 → 187.50, 688.67 |
| VIVIENNE heading 높이 | 358.56 → 410.06 | 이전은 라벨 제외, 현재는 라벨 포함 |
| VIVIENNE 라벨 상단→버튼 하단 전체 범위 | 684.23 → 410.06 | 라벨과 본문의 관계 비교용 |
| COS heading 높이 | 291.94 → 343.44 | 이전은 라벨 제외, 현재는 라벨 포함 |
| COS 라벨 상단→버튼 하단 전체 범위 | 650.92 → 343.44 | 라벨과 본문의 관계 비교용 |
| section 상단 / 하단 padding, 전후 동일 | 54px / 54px | 54px / 54px |

| 서체 역할 | VIVIENNE 크기/행간 이전 → 현재 | COS 크기/행간 이전 → 현재 |
|---|---|---|
| 유형 라벨 | 13px/normal → 13px/19.5px | 13px/normal → 13px/19.5px |
| 제목 | 68px/66.64px → 68px/66.64px | 68px/66.64px → 68px/66.64px |
| 소개 | 18px/30.6px → 18px/30.6px | 18px/30.6px → 18px/30.6px |
| MY WORK | 13px/21.45px → 13px/21.45px | 13px/21.45px → 13px/21.45px |
| WEBSITE | 13px/normal → 13px/normal | 13px/normal → 13px/normal |

업무 본문은 두 프로젝트 모두 18px, line-height:1.65. WEBSITE의 normal 행간과 내부 padding·42px 외곽 높이는 변경하지 않았다.

### 1440×900

| 요소 | VIVIENNE 이전 → 현재 | COS 이전 → 현재 |
|---|---|---|
| PERSONAL WORK (x, y) | 60.47, 45 → 60.47, 282.09 | 60.47, 45 → 60.47, 311.38 |
| 프로젝트명 (x, y) | 60.47, 304.77 → 60.47, 327.44 | 60.47, 334.05 → 60.47, 356.72 |
| 소개 시작 (x, y) | 60.47, 444.39 → 60.47, 467.06 | 60.47, 415.11 → 60.47, 437.78 |
| MY WORK (x, y) | 60.47, 521.27 → 60.47, 543.94 | 60.47, 491.98 → 60.47, 514.66 |
| 업무 설명 시작 (x, y) | 60.47, 549.44 → 60.47, 572.11 | 60.47, 520.16 → 60.47, 542.83 |
| WEBSITE 외곽선 (x, y) | 60.47, 584.83 → 60.47, 607.50 | 60.47, 555.55 → 60.47, 578.22 |
| VIVIENNE heading 높이 | 322.06 → 367.41 | 이전은 라벨 제외, 현재는 라벨 포함 |
| VIVIENNE 라벨 상단→버튼 하단 전체 범위 | 581.83 → 367.41 | 라벨과 본문의 관계 비교용 |
| COS heading 높이 | 263.50 → 308.84 | 이전은 라벨 제외, 현재는 라벨 포함 |
| COS 라벨 상단→버튼 하단 전체 범위 | 552.55 → 308.84 | 라벨과 본문의 관계 비교용 |
| section 상단 / 하단 padding, 전후 동일 | 45px / 45px | 45px / 45px |

| 서체 역할 | VIVIENNE 크기/행간 이전 → 현재 | COS 크기/행간 이전 → 현재 |
|---|---|---|
| 유형 라벨 | 12.24px/normal → 12.24px/18.36px | 12.24px/normal → 12.24px/18.36px |
| 제목 | 59.76px/58.5648px → 59.76px/58.5648px | 59.76px/58.5648px → 59.76px/58.5648px |
| 소개 | 16px/27.2px → 16px/27.2px | 16px/27.2px → 16px/27.2px |
| MY WORK | 12.24px/20.196px → 12.24px/20.196px | 12.24px/20.196px → 12.24px/20.196px |
| WEBSITE | 12.24px/normal → 12.24px/normal | 12.24px/normal → 12.24px/normal |

업무 본문은 두 프로젝트 모두 16px, line-height:1.65. WEBSITE의 normal 행간과 내부 padding·42px 외곽 높이는 변경하지 않았다.

### 1024×768

| 요소 | VIVIENNE 이전 → 현재 | COS 이전 → 현재 |
|---|---|---|
| PERSONAL WORK (x, y) | 40.95, 38.39 → 40.95, 222.05 | 40.95, 38.39 → 40.95, 228.91 |
| 프로젝트명 (x, y) | 40.95, 243.05 → 40.95, 264.05 | 40.95, 249.91 → 40.95, 270.91 |
| 소개 시작 (x, y) | 40.95, 343.30 → 40.95, 364.30 | 40.95, 310.03 → 40.95, 331.03 |
| MY WORK (x, y) | 40.95, 444.86 → 40.95, 465.86 | 40.95, 411.59 → 40.95, 432.59 |
| 업무 설명 시작 (x, y) | 40.95, 472.66 → 40.95, 493.66 | 40.95, 439.39 → 40.95, 460.39 |
| WEBSITE 외곽선 (x, y) | 40.95, 508.05 → 40.95, 529.05 | 40.95, 501.17 → 40.95, 522.17 |
| VIVIENNE heading 높이 | 307 → 349 | 이전은 라벨 제외, 현재는 라벨 포함 |
| VIVIENNE 라벨 상단→버튼 하단 전체 범위 | 511.66 → 349 | 라벨과 본문의 관계 비교용 |
| COS heading 높이 | 293.27 → 335.27 | 이전은 라벨 제외, 현재는 라벨 포함 |
| COS 라벨 상단→버튼 하단 전체 범위 | 504.78 → 335.27 | 라벨과 본문의 관계 비교용 |
| section 상단 / 하단 padding, 전후 동일 | 38.4px / 38.4px | 38.4px / 38.4px |

| 서체 역할 | VIVIENNE 크기/행간 이전 → 현재 | COS 크기/행간 이전 → 현재 |
|---|---|---|
| 유형 라벨 | 12px/normal → 12px/18px | 12px/normal → 12px/18px |
| 제목 | 40.96px/40.1408px → 40.96px/40.1408px | 40.96px/40.1408px → 40.96px/40.1408px |
| 소개 | 16px/27.2px → 16px/27.2px | 16px/27.2px → 16px/27.2px |
| MY WORK | 12px/19.8px → 12px/19.8px | 12px/19.8px → 12px/19.8px |
| WEBSITE | 12px/normal → 12px/normal | 12px/normal → 12px/normal |

업무 본문은 두 프로젝트 모두 16px, line-height:1.65. WEBSITE의 normal 행간과 내부 padding·42px 외곽 높이는 변경하지 않았다.

### 768×1024

| 요소 | VIVIENNE 이전 → 현재 | COS 이전 → 현재 |
|---|---|---|
| PERSONAL WORK (x, y) | 38.39, 72 → 38.39, 72 | 38.39, 72 → 38.39, 72 |
| 프로젝트명 (x, y) | 38.39, 129 → 38.39, 129 | 38.39, 129 → 38.39, 129 |
| 소개 시작 (x, y) | 38.39, 187.91 → 38.39, 187.91 | 38.39, 187.91 → 38.39, 187.91 |
| MY WORK (x, y) | 38.39, 267.88 → 38.39, 267.88 | 38.39, 267.88 → 38.39, 267.88 |
| 업무 설명 시작 (x, y) | 38.39, 295.67 → 38.39, 295.67 | 38.39, 295.67 → 38.39, 295.67 |
| WEBSITE 외곽선 (x, y) | 38.39, 331.06 → 38.39, 331.06 | 38.39, 331.06 → 38.39, 331.06 |
| VIVIENNE heading 높이 | 244.06 → 301.06 | 이전은 라벨 제외, 현재는 라벨 포함 |
| VIVIENNE 라벨 상단→버튼 하단 전체 범위 | 301.06 → 301.06 | 라벨과 본문의 관계 비교용 |
| COS heading 높이 | 244.06 → 301.06 | 이전은 라벨 제외, 현재는 라벨 포함 |
| COS 라벨 상단→버튼 하단 전체 범위 | 301.06 → 301.06 | 라벨과 본문의 관계 비교용 |
| section 상단 / 하단 padding, 전후 동일 | 72px / 72px | 72px / 72px |

| 서체 역할 | VIVIENNE 크기/행간 이전 → 현재 | COS 크기/행간 이전 → 현재 |
|---|---|---|
| 유형 라벨 | 12px/normal → 12px/18px | 12px/normal → 12px/18px |
| 제목 | 34px/33.32px → 34px/33.32px | 34px/33.32px → 34px/33.32px |
| 소개 | 16px/27.2px → 16px/27.2px | 16px/27.2px → 16px/27.2px |
| MY WORK | 12px/19.8px → 12px/19.8px | 12px/19.8px → 12px/19.8px |
| WEBSITE | 12px/normal → 12px/normal | 12px/normal → 12px/normal |

업무 본문은 두 프로젝트 모두 16px, line-height:1.65. WEBSITE의 normal 행간과 내부 padding·42px 외곽 높이는 변경하지 않았다.

### 390×844

| 요소 | VIVIENNE 이전 → 현재 | COS 이전 → 현재 |
|---|---|---|
| PERSONAL WORK (x, y) | 20, 64 → 20, 64 | 20, 64 → 20, 64 |
| 프로젝트명 (x, y) | 20, 119.44 → 20, 119.44 | 20, 119.44 → 20, 119.44 |
| 소개 시작 (x, y) | 20, 206.22 → 20, 206.22 | 20, 171.83 → 20, 171.83 |
| MY WORK (x, y) | 20, 308.88 → 20, 308.88 | 20, 274.48 → 20, 274.48 |
| 업무 설명 시작 (x, y) | 20, 336.67 → 20, 336.67 | 20, 302.28 → 20, 302.28 |
| WEBSITE 외곽선 (x, y) | 20, 372.06 → 20, 372.06 | 20, 364.06 → 20, 364.06 |
| VIVIENNE heading 높이 | 294.63 → 350.06 | 이전은 라벨 제외, 현재는 라벨 포함 |
| VIVIENNE 라벨 상단→버튼 하단 전체 범위 | 350.06 → 350.06 | 라벨과 본문의 관계 비교용 |
| COS heading 높이 | 286.63 → 342.06 | 이전은 라벨 제외, 현재는 라벨 포함 |
| COS 라벨 상단→버튼 하단 전체 범위 | 342.06 → 342.06 | 라벨과 본문의 관계 비교용 |
| section 상단 / 하단 padding, 전후 동일 | 64px / 64px | 64px / 64px |

| 서체 역할 | VIVIENNE 크기/행간 이전 → 현재 | COS 크기/행간 이전 → 현재 |
|---|---|---|
| 유형 라벨 | 12px/normal → 12px/18px | 12px/normal → 12px/18px |
| 제목 | 35.1px/34.398px → 35.1px/34.398px | 35.1px/34.398px → 35.1px/34.398px |
| 소개 | 16px/27.2px → 16px/27.2px | 16px/27.2px → 16px/27.2px |
| MY WORK | 12px/19.8px → 12px/19.8px | 12px/19.8px → 12px/19.8px |
| WEBSITE | 12px/normal → 12px/normal | 12px/normal → 12px/normal |

업무 본문은 두 프로젝트 모두 16px, line-height:1.65. WEBSITE의 normal 행간과 내부 padding·42px 외곽 높이는 변경하지 않았다.

## 부록 B. 전체 섹션 여백 실측

각 숫자는 실제 콘텐츠 컨테이너의 상단/하단 padding CSS px. 전환·pin·100svh 섹션의 화면 내 빈 공간은 padding만으로 설명할 수 없으므로 그대로 보존했다. PROFILE/WORK는 기존 스크롤 무대와 이미지·텍스트 배치를 유지했다.

| 섹션 | 1920×1080 | 1440×900 | 1024×768 | 768×1024 | 390×844 |
|---|---|---|---|---|---|
| HYUNDAI 소개 | 86.4px / 86.4px | 72px / 72px | 64px / 64px | 64px / 64px | 64px / 64px |
| SELECTED SOLUTIONS | 45.36px / 45.36px | 37.8px / 37.8px | 62px / 62px | 64px / 64px | 64px / 64px |
| PROCESS | 120px / 136px | 100.8px / 115.2px | 71.68px / 81.92px | 78px / 78px | 78px / 78px |
| MY CONTRIBUTION | 128px / 128px | 115.2px / 115.2px | 81.92px / 81.92px | 78px / 78px | 78px / 78px |
| PROJECT REFLECTION | 128px / 128px | 115.2px / 115.2px | 81.92px / 81.92px | 72px / 72px | 72px / 72px |
| AI VIDEO (내부 .ai-showcase) | 128 / 128 | 115.2 / 115.2 | 81.92 / 81.92 | 72 / 72 | 72 / 72 |
| CLONE CODING | 0px / 0px | 0px / 0px | 0px / 0px | 82px / 100px | 66px / 76px |
| SKILL (내부 stage) | 128 / 128 | 115.2 / 115.2 | 81.92 / 81.92 | 72 / 72 | 72 / 72 |
| ABOUT | 128px / 128px | 115.2px / 115.2px | 81.92px / 81.92px | 72px / 72px | 72px / 72px |
| CONTACT | 96px / 76px | 86.4px / 72px | 61.44px / 51.2px | 54px / 48px | 64px / 64px |

개인 프로젝트 padding은 부록 A에 수록했다. 이미지↔캡션은 편집 가능 3종과 보호 HYUNDAI 모두 기존 14px 간격을 유지한다. 개인 프로젝트 텍스트↔목업 가로 grid gap은 기존 desktop clamp(34px,5vw,82px), 1024에서는30px; 모바일에서는 기존 세로 gap22px을 유지한다. 넓은 데스크톱 CLONE 루트의 0 padding은 pin 무대와 별도 내부 헤더 배치가 있기 때문이며 여백 누락을 뜻하지 않는다.
