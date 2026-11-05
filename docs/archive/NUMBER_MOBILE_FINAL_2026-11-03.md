# 번호·문구·모바일 겹침 최종 수정

2026-11-03 / `master` / `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`

최신 첨부 지시와 명세·1차·2차·최종·텍스트 번호 보고서를 대조했다. 이번 지시는 이전 `through practice` 유지 및 번호 변경 보류 결정을 대체한다. 지정한 삭제와 모바일 마스코트·수정 가능한 캡션만 변경했다. 기존 HYUNDAI 검정 소개 두 문단·제목·여백은 유지했다.

## 1. 수정 파일

| 파일 | 이번 변경 |
|---|---|
| `src/components/CloneCodingSection.jsx` | `through practice` em 출력 제거 |
| `src/styles/clone-coding.css` | 해당 em 전용 기본·반응형 CSS 제거 |
| `src/components/WorkSection.jsx` | WORK INTRO의 범위 번호 span 제거 |
| `src/components/PersonalProjectCaseStudy.jsx` | 개인 작업 번호 span 및 출력에만 쓰던 map index 제거 |
| `src/styles/personal-projects.css` | 개인 작업 라벨의 번호용 flex·gap·span 스타일 제거 |
| `src/pages/HyundaiCaseStudy.jsx` | 네 기여 항목의 번호 span 제거 |
| `src/styles/base.css` | WORK 라벨 정렬, 기여 번호용 gap·색상 규칙 정리, 수정 가능한 캡션 11px 적용 |
| `src/components/PortfolioAssistant.jsx` | 모바일에서 닫힌 마스코트·자동 말풍선이 실제 텍스트나 조작 요소와 충돌하는지 검사 |
| `src/styles/portfolio-assistant.css` | 모바일 크기·위치·부유 폭·패널 간격 및 충돌 시 표시 상태 조정 |
| `docs/PORTFOLIO_CURRENT_SPEC.md` | 최신 확정 기준 연결 |
| `docs/NUMBER_MOBILE_FINAL_2026-11-03.md` | 이번 결과 기록 |

작업 전 Git 상태·파일 해시·src 복사본을 `.review/number-mobile-20261103/`에 보관했다. 이 경로는 기존 Git 무시 경로다. 이전 미커밋 파일과 untracked 보고서, 삭제된 JOIN PNG 2개의 상태를 보존했다. 새 자산·의존성·lint 설정은 추가하지 않았다.

## 2. 삭제한 문구·번호

| 표시 위치 | 삭제 | 남긴 내용 |
|---|---|---|
| CLONE CODING | `through practice`, 해당 em·CSS | CLONE CODING 제목, 한국어 소개, 총개수 라벨, 3개 카드 |
| WORK INTRO | `01 — 03`, 해당 span | `UX/UI · WEB REDESIGN`, 제목, 소개 문장, 전환 대상 부모 |
| HYUNDAI 기여 항목 1 | `01` | `UX PLANNING & DEVELOPMENT` 및 수행 설명 |
| HYUNDAI 기여 항목 2 | `02` | `UI DESIGN` 및 수행 설명·사진 |
| HYUNDAI 기여 항목 3 | `03` | `VEHICLE EXHIBITION DESIGN` 및 수행·후속 작업 설명 |
| HYUNDAI 기여 항목 4 | `04` | `COLLABORATION` 및 수행 설명·사진 |
| VIVIENNE | `01 / 02`, 해당 span | `PERSONAL WORK`, 프로젝트명·소개·MY WORK·CTA·이미지 |
| COS | `02 / 02`, 해당 span | `PERSONAL WORK`, 프로젝트명·소개·MY WORK·CTA·이미지 |

기여 데이터의 `item.number`는 React key 및 `case-contribution__media--02`, `--04` 같은 기존 식별에 계속 쓰이므로 유지했다. 화면 번호만 제거했고 애니메이션·이미지 배치의 식별자를 바꾸지 않았다. 불필요한 번호 전용 출력·스타일과 실제 내부 식별값을 구분했다.

5개 해상도에서 삭제 대상 출력이 남지 않았음을 확인했다. 과거에 삭제한 INTRO 고정 SELECTED PROJECTS, 개인 태그·메타·콘셉트, 기간 UI, 보드 오른쪽 캡션, SKILL 하단 문구, ABOUT 서명, ABOUT/CONTACT 상단 보조 문구, JOIN도 복원하지 않았다.

## 3. 유지한 번호

| 위치 | 유지한 표시·역할 |
|---|---|
| INTRO 자동 프리뷰 | `WORK PREVIEW / 01—03`, `02—03`, `03—03`과 프로젝트명. 실제 순환 상태 |
| HYUNDAI 보호 진입 카드 | `01 / 03`, `SELECTED WORK` |
| HYUNDAI 사례 장 | 01 CHALLENGE, 02 SELECTED SOLUTIONS, 03 PROCESS, 04 MY CONTRIBUTION, 05 PROJECT REFLECTION |
| CHALLENGE | 실제 문제 목록 01·02·03 |
| SELECTED SOLUTIONS | 01 EXPERIENCE FINDER, 02 EXHIBITION EXPERIENCE, 03 VEHICLE EXHIBITION |
| Experience Finder | STEP 1–3 및 역할·기여 설명의 실제 단계 번호 |
| PROCESS | `PROCESS 01 / 06`부터 `PROCESS 06 / 06` |
| AI VIDEO | `MOVING IMAGE / 04 FILMS`, `FILM 01 / 04`부터 `FILM 04 / 04` |
| CLONE CODING | `03 PROJECTS · CLONE CODING` |
| ABOUT | 현재 카드 01/05–05/05, 선택 버튼 01–05 |
| 사실 정보 | 연도·연락처·4인 팀·3C 분석 명칭 등. 현재 존재하는 날짜·이력 데이터도 이번에 변경하지 않음 |

기존 데이터·라벨 전후 비교와 실제 DOM으로 확인했다. 프로젝트 순서는 HYUNDAI → VIVIENNE → COS, 클론은 KYUNGDONG → LOTTE WORLD → MUSIGN이며 영상은 4편이다.

## 4. 삭제 후 정렬·여백

| 영역 | 전 → 후 |
|---|---|
| WORK INTRO | 번호·라벨을 양끝에 배치하던 구조 → 라벨 하나를 기존 오른쪽 축에 정렬. 번호 span과 불필요한 양쪽 배치 gap 제거. 부모 class는 GSAP 전환에 필요해 유지 |
| 기여 항목 라벨 | 번호와 20px gap(모바일 12px gap)이 있던 flex → 라벨 하나의 블록. 네 라벨 모두 항목 왼쪽 시작점으로 통일 |
| 개인 작업 라벨 | PERSONAL WORK와 20px gap·번호 → PERSONAL WORK 하나. 라벨 높이와 위치 유지, 두 프로젝트 같은 규칙 |
| CLONE 타이틀 묶음 | em 행과 그 margin 제거. 중앙 정렬·제목 서체·한국어 설명의 margin·카드 좌표·GSAP 효과 유지 |
| 이미지 캡션 | 이미지 아래 14px 간격과 왼쪽 축 유지. 커진 행 상자만큼 기존 흐름 높이를 보정해 이미지가 위로 밀리지 않도록 처리 |

| 해상도 | CLONE 타이틀 묶음 높이 px 전→후 | PERSONAL WORK 라벨 높이 px 전→후 |
|---|---:|---:|
| 1920×1080 | 299→274 | 16→16 |
| 1440×900 | 257→232 | 15→15 |
| 1024×768 | 219→194 | 15→15 |
| 768×1024 | 279→199 | 15→15 |
| 390×844 | 326→258 | 15→15 |

데스크톱 CLONE 묶음의 중앙 기준점은 전후 동일하다. 모바일은 삭제한 행 높이만큼 아래 카드가 자연스럽게 앞당겨진다. 남은 카드의 상대 좌표·크기는 5개 해상도 모두 전후 동일하다. 개인 라벨 두 개의 같은 좌측 축·높이를 확인했다. 일반 섹션 padding이나 보호 인터랙션의 pin 길이는 변경하지 않았다.

## 5. 모바일 마스코트 겹침

### 원인과 실제 재현

390px에서는 70px 런처가 오른쪽 14px·하단 74px에 고정되어 있었다. 768px에는 모바일 크기가 적용되지 않아 88px·오른쪽/하단 24px의 데스크톱 구성이 남아 있었다. 위아래 12px 부유 모션도 텍스트 영역을 추가로 침범했다. 이 배치는 본문과 독립적으로 고정되어 있어 스크롤에 따라 AI 설명, SKILL 목록, ABOUT·CONTACT가 아래로 지나갈 때 가려질 수 있었다.

수정 전 390px의 AI 설명·SKILL·ABOUT·CONTACT, 768px의 ABOUT·CONTACT에서 겹침을 재현했다. `before-390-mascot-ai.png`에는 영상 설명 우측을 가리는 장면이 기록되어 있다.

### 해결

- 900px 이하에만 52×52px 런처, 오른쪽·하단 최소 12px 및 safe-area inset을 적용했다. 52px의 클릭 영역과 기존 마스코트 이미지·색상은 유지한다.
- 모바일 부유 폭은 ±12→±4px. 데스크톱은 기존 88px·위치·±12px·3.2초 주기를 유지한다.
- 크기·위치 조정만으로 모든 스크롤 위치를 해결할 수 없으므로, **닫힌 마스코트와 자동 말풍선이 실제 텍스트 줄·버튼·링크·영상과 충돌하는 동안만 숨긴다.** 여백으로 이동하면 다시 표시한다. 본문 끝의 빈 박스 공간까지 무조건 충돌로 취급하지 않는다.
- 텍스트 span·small, 버튼·링크·영상의 조작 영역과 부유 여유 6px도 확인한다. 숨겨진·접힌 콘텐츠와 마스코트 자신의 UI는 충돌 대상에서 제외한다.
- scroll·resize·레이아웃 변경에 맞춰 requestAnimationFrame에서 검사한다. 새 로고·버튼·안내 문구·상시 예약 여백을 추가하지 않았다.
- 사용자가 챗봇을 열면 충돌 숨김을 적용하지 않는다. 열린 대화 패널은 사용자가 직접 선택한 기존 UI로 유지한다. 자동 말풍선도 본문을 가리지 않는 위치에서만 표시된다.
- 모바일 패널은 런처 위 64px에 놓이며 기존 질문·답변·링크·닫기 기능을 유지한다. CONTACT Back to Top 등 다른 버튼도 충돌 대상이므로 접힌 런처가 해당 버튼을 가리지 않는다.

이 방식은 읽는 위치에서 닫힌 런처가 잠시 보이지 않을 수 있다. 런처를 계속 고정 노출하기 위해 보호 콘텐츠 폭을 줄이거나 전역 여백을 늘리지 않았다.

### 실측 검증

| 해상도 | 확인한 스크롤 상태 | 표시 상태 | 본문·버튼 가림 |
|---|---:|---|---|
| 768×1024 | 77개 | 표시 41 / 숨김 36 | 0건 |
| 390×844 | 85개 | 표시 27 / 숨김 58 | 0건 |

AI·SKILL·ABOUT·CONTACT를 90px 간격과 실제 휠 왕복으로 확인하고, ABOUT 5개 카드의 본문 위치도 검사했다. 총 162개 샘플의 실제 화면 hit test에서 마스코트가 글자·버튼 위를 가리는 경우가 없었다. 표시 상태가 반복해서 복원되므로 마스코트를 전체 삭제한 방식이 아니다.

768/390에서 실제 클릭으로 챗봇 열기, 영상 질문의 4편 답변, 패널이 viewport 안에 들어오는지, Escape 닫기·기본 위치의 런처 포커스 복귀를 확인했다. 무조건 숨기거나 기능을 제거하지 않았다.

## 6. 9px 캡션 목록과 수정 결과

현재 UI에서 수정 전 9px이던 이미지 캡션은 아래 7개다. INTRO 프리뷰는 이미 11px이며, DESKTOP/MOBILE EXPERIENCE 장치 라벨은 10px이다. CLONE 카드의 작은 CTA와 챗봇 보조 라벨은 이미지 캡션과 구분했다.

| 원문 | JSX 위치 | 크기 전→후 | 처리 이유 |
|---|---|---:|---|
| `RESPONSIVE MAIN DESIGN` | `src/components/HyundaiProjectPreview.jsx` | 9→9px | HYUNDAI 목업 도입부 보호 |
| `INTEREST-BASED EXPERIENCE FINDER` | `src/pages/HyundaiCaseStudy.jsx` | 9→9px | SELECTED SOLUTIONS 보호·기준 참조 |
| `RESPONSIVE EXHIBITION DESIGN` | 같은 파일 | 9→9px | SELECTED SOLUTIONS 보호 |
| `INTERACTIVE VEHICLE EXHIBITION` | 같은 파일 | 9→9px | SELECTED SOLUTIONS 보호 |
| `FIGMA / WIREFRAME & UI DESIGN` | 같은 파일, 검정 소개 보드 | 9→11px | 수정 가능 영역, 단일 왼쪽 캡션 유지 |
| `FASHION LANDING PAGE REDESIGN` | `src/components/PersonalProjectCaseStudy.jsx` | 9→11px | 수정 가능 영역, 문구 유지 |
| `MINIMAL FASHION LANDING PAGE REDESIGN` | 같은 파일 | 9→11px | 동일 역할 규칙·모바일 한 줄 유지 |

9px은 작은 보조 글씨로 보였으며 수정 가능한 세 캡션은 11px에서 읽기 크기를 확보하면서 390px의 긴 COS 캡션도 한 줄로 유지할 수 있었다. 12px로 일괄 확대하지 않았다.

| 속성 | 수정 전 | 수정 후 |
|---|---|---|
| 서체·굵기 | Inter / 500 | 동일 |
| 크기 | 9px | 11px, 5개 해상도 공통 |
| 행간 | 1.3 = 11.7px | 1.3 = 14.3px |
| 자간 | .08em = .72px | .08em = .88px |
| 색상·opacity | 프로젝트별 .65 alpha / opacity 1 | 동일 |
| 이미지와 텍스트 간격 | 14px | 동일 |
| 정렬 | 목업 가시 경계 또는 보드 왼쪽 | 동일 |
| 문구 | 기존 세 문구 | 동일 |

색 대비는 기존 배경과 반투명 글자색을 합성한 계산상 COS 약 4.90:1, VIVIENNE 약 6.95:1, 보드 약 7.53:1이다. 색을 불필요하게 바꾸지 않고 크기로 가독성을 개선했다. 실제 안티앨리어싱 픽셀별 대비를 전수 측정한 값은 아니다.

캡션 행 상자가 2.6px 커지는 만큼 하단 흐름 margin을 −2.6px 보정했다. 이미지 간격을 줄인 것이 아니라 기존 단일 행의 배치 높이를 유지한 것이다. 작업 전 src 복사본을 별도 QA 페이지로 렌더링해 전후를 비교했으며, 세 이미지의 크기·비율은 동일하고 상대 세로 위치 차이는 5개 해상도 모두 .05px 미만이다. 텍스트 잘림도 없다.

**보호 캡션과의 관계:** 서체·굵기·상대 자간·행간·색상 체계·왼쪽 축·간격은 유지하지만 크기는 보호 영역 9px / 수정 가능 영역 11px로 구분된다. 보호 영역까지 완전히 같은 11px로 만들려면 해당 영역을 변경해야 하므로 적용하지 않았다. 남은 보호 캡션 4개의 소형 크기는 이번 수정의 명시적 예외다.

## 7. 5개 해상도 실제 검증

Chrome의 실제 로컬 Vite 페이지를 지정 viewport로 열어 원본 스크린샷과 computed style을 비교했다. 전후 원본, 카드·캡션·모바일 충돌 기록은 `.review/number-mobile-20261103/`에 있다.

| 해상도 | 지정 삭제·번호 유지 | 정렬·캡션 | 마스코트 |
|---|---|---|---|
| 1920×1080 | 통과 | 중앙 타이틀·기여 라벨·PERSONAL WORK 확인, 캡션 11px | 기존 데스크톱 값 동일 |
| 1440×900 | 통과 | 라벨 좌측 축·본문·보드 캡션 확인 | 기존 데스크톱 값 동일 |
| 1024×768 | 통과 | 카드 geometry 유지, 프로젝트 캡션·제목 배치 확인 | 기존 데스크톱 값 동일 |
| 768×1024 | 통과 | 자연 높이·두 개인 라벨·목업 배치 확인 | 77개 상태 가림 없음, 챗봇 동작 통과 |
| 390×844 | 통과 | 한국어 문장 구분·긴 COS 캡션 한 줄·삭제 후 여백 확인 | 85개 상태 가림 없음, 챗봇 동작 통과 |

모든 해상도에서 페이지 가로 overflow 없음, 실제 로드된 이미지 오류 없음, 검사한 본문 가로 잘림 없음. 유지 대상 사례 장 5개·PROCESS 6단계·영상 4개·ABOUT 버튼 5개를 전후 비교했다. 기존 외부 링크와 연락처 href도 동일하다.

HYUNDAI 목업 도입부·SELECTED SOLUTIONS·PROCESS·검정 소개 본문의 높이·padding·서체·크기·본문 박스는 전후 동일하다. 마스코트 충돌을 피하려고 보호 영역의 폭이나 레이아웃을 바꾸지 않았다.

## 8. 인터랙션 보존

- INTRO 자동 프리뷰 3개 순환, INTRO → PROFILE → WORK 대표 진행 상태와 역방향 복귀를 확인했다. 기존 타임라인은 수정하지 않았다.
- CLONE 카드 진입·교차·퇴장을 1920/1440/1024에서 실제 wheel로 확인했다. KYUNGDONG → LOTTE WORLD → MUSIGN 순서와 마지막 SKILL 진입을 유지한다. 타임라인 .785, 기존 scrub·duration·easing 및 effect 소스가 동일하다.
- 동일한 스크롤 위치로 돌아간 뒤의 CLONE 복원 검사는 별도 `clone-restore.json`에 기록한다. 모바일은 기존 정적 카드 흐름과 휠 왕복을 유지했다.
- SELECTED SOLUTIONS의 기존 데스크톱 pin 왕복, PROCESS의 1920/1440/1024 진행·복귀를 확인했다. 나머지 해상도는 기존 반응형 세로 구성이다.
- VIVIENNE / COS 가로 전환·역방향 복귀와 5개 해상도의 COS 끝 화면을 확인했다. 목업 내부 이미지·자동 스크롤 코드는 보존했다.
- 5개 해상도에서 AI 영상 4편 각각의 재생 시간 증가와 media error 없음을 확인했다.
- 5개 해상도에서 ABOUT 1→2→3→4→5→4→3→2→1 상태를 확인했다. 사진·문장·기존 전환 코드를 유지했다.
- 보드 확대·Escape 닫기를 5개 해상도에서 확인했다. CONTACT 정보·링크·푸터 및 기존 외부 링크는 변경하지 않았다.

주요 기록: `before.json`, `after.json`, `captions.json`, `mobile.json`, `motion.json`, `extra-runtime.json`, `clone-restore.json`.

## 9. 빌드·Git·보존 검사

- `npm.cmd run build`: 통과. 기존 500kB 초과 JS 청크 경고는 남아 있다.
- `git diff --check`: 통과.
- 기존 package scripts는 dev/build/preview이며 새 lint·test 스크립트나 의존성을 추가하지 않았다.
- 작업 전 저장한 파일 해시와 비교해 이번 지정 소스·명세 외의 기존 파일이 유지되는지 검사했다. 이전 보고서를 덮어쓰지 않았다.
- `ProfileIntro.jsx`와 셰이더, 기존 데이터·자산·영상·다른 섹션 소스는 보존했다. 해당 PROFILE의 SHA256은 기존 `1C6E11A6AE7CC5A4C6FCD9733E870D773BD7B25E63D4DE66E13149503FBF6B42`와 동일하다.
- 추가한 QA 파일은 Git 무시 경로에만 있다. Commit·Push·Vercel 배포·reset·clean·다른 저장소 수정은 실행하지 않았다.

## 10. 남은 예외·미검증 사항

- HYUNDAI 보호 영역의 캡션 4개는 9px 그대로다. 수정 가능한 세 캡션과 크기까지 동일하게 맞추지는 않았다.
- GPU가 비활성화된 테스트 브라우저에서 PROFILE WebGL 말림 효과를 실제 GPU 화면으로 검증하지 못했다. 해당 파일·셰이더는 수정하지 않았다.
- 실제 휴대폰·터치 제스처·safe-area가 있는 모든 장치와 브라우저 조합은 확인하지 않았다. 지정 viewport, 실제 wheel·클릭, 대표 상태의 검증이다.
- 모바일 마스코트는 중요한 내용과 충돌하는 동안 표시되지 않는다. 열린 챗봇 패널이 페이지 위에 놓이는 것은 사용자가 직접 연 기존 동작이며, 이를 접힌 마스코트의 자동 가림과 구분했다.
- 자동화된 충돌 검사는 기록한 스크롤 위치·확대 전 상태를 대상으로 한다. 모든 중간 애니메이션 프레임과 브라우저 줌 조합을 전수 검사한 것은 아니다.
- 외부 프로젝트의 배포 상태, 실제 메일 발송·전화 연결은 실행하지 않았다. 이미지·영상 내부 작은 글자·번호는 원본 자산으로 유지했다.
- 앞서 확인한 보호 PROFILE의 390px 문장 끝 줄바꿈 등은 이번 수정 범위에 포함하지 않았다.
