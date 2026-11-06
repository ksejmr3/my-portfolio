# THE WORKING EDITION — 잔여 5개 최종 수정·검증

2026-11-04 · 로컬 `master` · `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`.

[직전 편집 디자인 보고서](EDITORIAL_DESIGN_REVIEW_2026-11-04.md) 이후 지정된 5개만 수정했다. 작업 시작 당시 실제 파일을 별도로 보관하고 SHA-256으로 대조했다. Git HEAD와의 전체 diff에는 이전 작업도 포함되므로 이번 변경 범위와 구분한다. 기존 미커밋 변경·untracked 문서·JOIN 이미지 삭제 상태는 보존했다.

## 1. 실제 변경 파일

| 파일 | 이번 변경 |
|---|---|
| `src/styles/base.css` | HYUNDAI 태블릿 제목, 모바일 첫 PROCESS 제목, PROFILE 소개 문장의 줄바꿈만 보정 |
| `src/components/SkillSection.jsx` | 보조 라벨 p 출력 제거 |
| `src/styles/skill-section.css` | 삭제한 라벨 전용 규칙과 공통 selector의 해당 항목 제거 |
| `src/components/CloneCodingSection.jsx` | 상단 라벨의 ` · CLONE CODING`만 제거 |
| `docs/PORTFOLIO_CURRENT_SPEC.md` | 최신 기준 링크 추가 |
| `docs/FINAL_FIVE_REVIEW_2026-11-04.md` | 이번 보고서 신규 작성 |

제품 소스 변경은 **4개**다. `ProfileIntro.jsx`, 셰이더, `HyundaiCaseStudy.jsx`, 프로젝트 데이터, 목업·이미지·영상, VIVIENNE/COS 소스·CSS, 마스코트 소스는 변경하지 않았다.

## 2. 지정한 5개 수정 결과

| 항목 | 이전 | 현재 / 근거 |
|---|---|---|
| HYUNDAI 768 제목 | `HYUNDAI / MOTORSTU / DIO` | `HYUNDAI / MOTORSTUDIO` 두 줄. 단어 내부 분리 없음. 제목→본문→CTA 간 겹침 없음 |
| PROCESS 390 제목 | `시장·브랜 / 드 리서치` | `시장·브랜드 / 리서치`. 360·375·414에서도 동일한 어절 구성 |
| PROFILE 390 문장 끝 | `…웹디자이너입니 / 다.` | `디자인을 실제 웹 화면으로 구현하는 / 웹디자이너입니다.`. 기존 문장·16px·너비·행간 유지 |
| SKILL 상단 라벨 | `TOOLS / METHODS / PRACTICE` | JSX와 전용 스타일 제거. SKILL·설명·6개 그룹 유지, 빈 라벨 공간 없음 |
| CLONE 상단 라벨 | `03 PROJECTS · CLONE CODING` | `03 PROJECTS`. 큰 제목·총개수·중앙 정렬·서체 유지. `through practice` 없음 |

보이는 문자열을 문자별 DOM Range로 줄 단위 측정하고, 실제 브라우저 스크린샷과 대조했다. 단순히 CSS에 속성을 추가한 것만으로 통과 판정하지 않았다.

## 3. CSS 속성·수치와 최소 변경 범위

### HYUNDAI

`@media (min-width:701px) and (max-width:900px)` 안에서 `.project-card--hyundai-motorstudio .project-card__story h3`에만 적용한다.

- 크기: 기존 `clamp(50px,5.6vw,70px)` → 해당 구간에 한해 `clamp(36px,5.2vw,46px)`.
- `overflow-wrap:anywhere` → `normal`로 단어 내부 임의 분리 방지.
- 768 실측: **50px → 39.936px**, 행간 **49px → 39.1373px**, 제목 높이 **147px → 78.25px**.
- 자간 비율 `-.085em`은 유지. 크기 조정에 따라 px 환산만 **-4.25 → -3.39456px**로 바뀐다. Inter 400, 칼럼 너비 **270.375px**, 좌측 x **444.609375px** 유지.
- 나머지 요청 해상도 7개의 제목 크기·자간·행간·박스 높이는 전후 동일. 목업 x·y·너비·높이와 카드 높이는 **8개 모두 변화 0px**.

문구나 강제 줄바꿈 JSX는 추가하지 않았다. 단어가 들어갈 수 있는 크기와 기존 공백의 자연스러운 줄바꿈으로 해결했다.

### PROCESS

기존 모바일 `max-width:700px` 안의 **첫 `.case-process__stage` h3에만** `word-break:keep-all; text-wrap:wrap`을 추가했다. 다른 PROCESS 제목이나 전체 grid·스크롤 코드는 변경하지 않았다.

`keep-all`만으로는 기존 `text-wrap:balance`가 가운데점 뒤를 선택해 `시장· / 브랜드 리서치`로 표시했다. 실제 브라우저에서 이를 확인하고 해당 제목만 일반 줄 채우기 `wrap`으로 바꿨다. 결과는 `시장·브랜드 / 리서치`다. 글자 크기·자간·행간·제목 내용은 그대로다. 390 기준 **42.9px / 42.9px / -.06em**, 360·375·414는 각각 **39.6 / 41.25 / 45.54px**이다. 모든 검수 폭에서 첫 PROCESS 패널 높이도 전후 동일하고, 영문 부제와의 grid 간격은 16px을 유지한다.

### PROFILE

기존 모바일 `max-width:700px`의 `.profile-intro__summary`에 **`word-break:keep-all` 한 속성만** 추가했다. 내용, 강제 br, margin-top22px, font-size16px, line-height1.72, letter-spacing-.01em, max-width580px은 변경하지 않았다. 글자 크기를 줄이거나 이미지 공간을 침범해 본문 폭을 넓힐 필요가 없었다.

| 폭 | 실제 본문 너비 전후 동일 | 문장 끝 표시 | 문단 높이 전후 동일 |
|---|---:|---|---:|
| 414 | 359px | 문장 전체가 기존 한 줄에 들어감 | 55.03125px |
| 390 | 335px | `…구현하는 / 웹디자이너입니다.` | 82.546875px |
| 375 | 320px | `…구현하는 / 웹디자이너입니다.` | 82.546875px |
| 360 | 305px | `…구현하는 / 웹디자이너입니다.` | 82.546875px |

표의 문단 높이는 기존 첫 문장과 br까지 포함한다. 이미지·WebGL·셰이더·타임라인은 소스 변경이 없고 문단 높이도 유지되어 이미지 배치가 달라지지 않았다.

### SKILL / CLONE

SKILL의 삭제된 라벨은 18–19.5px 행 높이와 아래 margin12px을 차지했다. 새 spacer를 넣지 않고 실제 출력과 전용 CSS를 제거했다. 제목→설명 **20px**, 설명→그룹 **40px**, 그룹 수6·도구명·grid·상하 padding은 유지했다.

CLONE은 JSX의 접미 문자열만 삭제했다. 상단 라벨의 글자 크기12–13px·600·자간.13em·행간1.5와 고정 박스 폭·좌표·높이는 전후 동일하다. 중앙 오차는 최대 **0.008px 미만**으로 레이아웃 반올림 수준이다. 카드·타임라인 관련 JS는 바이트 비교상 그대로다.

## 4. 8개 해상도별 전후 검증

모든 해상도에서 HYUNDAI 두 단어가 각각 온전하게 표시된다. SKILL 라벨은 없고 CLONE은 `03 PROJECTS`로 중앙 표시된다. 가로 넘침은 없었으며 HYUNDAI 제목·본문·CTA, PROCESS 제목·부제의 겹침도 없었다. 수정 전후 원본 사진 80장과 해상도별 검수판을 저장했다.

| 해상도 | HYUNDAI 크기 전후 / 현재 줄 | PROCESS 현재 줄 | PROFILE 문장 끝 | 결과 |
|---|---|---|---|---|
| 1920×1080 | 98→98px / 두 줄 | 한 줄 유지 | 기존 표시 유지 | 통과 |
| 1440×900 | 74.88→74.88px / 두 줄 | 한 줄 유지 | 기존 표시 유지 | 통과 |
| 1024×768 | 55→55px / 두 줄 | 한 줄 유지 | 기존 표시 유지 | 통과 |
| 768×1024 | 50→39.936px / 온전한 두 줄 | 한 줄 유지 | 기존 표시 유지 | 통과 |
| 414×896 | 45.54→45.54px / 두 줄 | 시장·브랜드 / 리서치 | 문장 한 줄 유지 | 통과 |
| 390×844 | 44→44px / 두 줄 | 시장·브랜드 / 리서치 | 웹디자이너입니다. 온전한 마지막 줄 | 통과 |
| 375×812 | 44→44px / 두 줄 | 시장·브랜드 / 리서치 | 웹디자이너입니다. 온전한 마지막 줄 | 통과 |
| 360×800 | 44→44px / 두 줄 | 시장·브랜드 / 리서치 | 웹디자이너입니다. 온전한 마지막 줄 | 통과 |

`두 줄`은 `HYUNDAI / MOTORSTUDIO`다. 전체 화면을 보고 제목 크기, 여백, 이미지·본문의 관계를 확인했다. 영상 내부 프레임은 캡처 시각에 따라 다를 수 있으므로 목업 보존은 별도 좌표 측정과 소스 해시로도 확인했다.

### SKILL 제목 위치·여백 전후

좌표 y는 SKILL 섹션 상단 기준이다. 제목과 실제 콘텐츠가 삭제된 행만큼 올라오며, 상단 padding은 그대로다.

| 해상도 | 제목 y 이전→현재 | 상·하 padding 유지 | 콘텐츠 stage 높이 이전→현재 |
|---|---|---|---|
| 1920×1080 | 159.5→128 | 128 / 128px | 843.84375→812.34375px |
| 1440×900 | 145.53125→115.1875 | 115.2 / 115.2px | 806.90625→776.5625px |
| 1024×768 | 111.90625→81.90625 | 81.92 / 81.92px | 708.6875→678.6875px |
| 768×1024 | 102→72 | 72 / 72px | 683.421875→653.421875px |
| 414×896 | 94→64 | 64 / 64px | 875.203125→845.203125px |
| 390×844 | 94→64 | 64 / 64px | 870.78125→840.78125px |
| 375×812 | 94→64 | 64 / 64px | 868.9375→838.9375px |
| 360×800 | 94→64 | 64 / 64px | 868.9375→838.9375px |

## 5. 인터랙션 보존·재검증

| 기능 | 이번 확인과 기존 결과 재사용 범위 |
|---|---|
| PROFILE GPU | GPU 활성 Chrome의 AMD Radeon / ANGLE Direct3D11, WebGL2 ready·contextLost=false. 1440·768의 실제 말림 중간→종료→역방향→원래 상태 재검증. 390은 기존 일반 세로 흐름과 GPU 준비 확인 |
| HYUNDAI 진입 | 1440·768에서 진입 전→진입→역방향 퇴장→재진입의 media/content opacity가 **0→1→0→1**. 원래 y32/y24→0 코드와 duration0.6/0.55 유지. 390의 일반 흐름 유지 |
| CLONE | 1920·1440·1024 실제 wheel로 세 카드 등장·교차·퇴장·역순 복귀 재검증. .29 시점 경동+롯데, .505 롯데+뮤자인; .21/.425/.64는 각각 단독 카드, .78은 퇴장. 마지막 이후 SKILL 정상 노출 |
| PROFILE/WORK·HYUNDAI·CLONE 트리거 | start·end·duration이 전후 동일. 새 pin이나 애니메이션 없음 |
| ABOUT / CONTACT | SKILL 라벨 삭제로 하단 문서 위치가 자연스럽게 상향됨. desktop ABOUT의 start/end는 각각 1920에서31px, 1440에서30px 앞당겨졌지만 **타임라인 거리·duration·카드 동작 코드는 동일**. 1440에서 0→1→2→3→4→3→2→1→0 왕복과 열린 카드가 한 개임을 재검증했다. 빈 공간을 되넣어 이전 절대 위치를 강제하지 않음 |
| VIVIENNE / COS | 최신 소스·CSS·이미지 목록·section 높이/padding/텍스트 유지. 이번 수정 selector가 해당 영역에 적용되지 않음. 직전 정렬·목업·왕복 결과 재사용 |
| SELECTED SOLUTIONS / AI 4편 | 소스·데이터·미디어 파일과 section 측정값 동일. 직전 5해상도의 실제 4편 자동재생 결과 재사용. 미변경 영상을 불필요하게 전편 재검수하지 않음 |

PROFILE와 PROCESS의 첫 패널·문단 높이가 그대로이므로 이 줄바꿈 변경은 후속 문서 높이에 영향을 주지 않았다. ABOUT 절대 위치 변화는 SKILL에서 실제로 삭제한 행의 높이에서만 발생한다. ScrollTrigger의 픽셀 반올림 때문에 실수 stage 높이 차이와 최대1px 미만 차이가 날 수 있다.

## 6. 모바일 충돌·검증 자료

검증용 파일은 [`.review/final-five-20261104/`](../../.review/final-five-20261104/)에 격리했다. 기존 `.review` 폴더나 이전 자료는 삭제하지 않았다. 제품 코드에 검증 스크립트를 import하지 않았으며 `.review`는 기존 Git ignore 대상이다.

| 자료 | 역할 |
|---|---|
| `before-source/`, `start-hashes.json`, `start-status.txt` | 이번 작업 시작 시점 파일·Git 상태 보관 |
| `cdp.mjs`, `measure.mjs`, `before.json`, `after.json` | 8개 해상도 DOM 문자별 줄·좌표·서체·높이·보호 영역·트리거 전후 측정 |
| `before/after-{폭}-{profile,hyundai,process,skill,clone}.png` | 실제 전후 화면 80장 |
| `sheets.ps1`, `sheet-{폭}.png` | 실제 사진을 모은 8개 검수판 |
| `verify.mjs`, `verification.json` | 파일 보존·문구·줄바꿈·그룹/목업/트리거·CLONE 상태 검증 |
| `interaction.mjs/json`, `gpu-*.png` | 실제 GPU 및 HYUNDAI 역방향·재진입 |
| `motion.mjs/json`, `motion-*.png` | CLONE 3개 desktop 폭의 실제 wheel 왕복 |
| `mobile.mjs/json`, `sweep-*.png`, `chat-*.png` | 태블릿·4개 휴대폰 폭에서 실제 콘텐츠 가림·챗봇·ABOUT 개별 카드 확인 |
| `about.mjs/json`, `about-1440-return.png` | 위치가 이동한 desktop ABOUT의 5개 카드 왕복 |
| `artifact-manifest.json`, `final-checks.json`, `final-status.txt`, `final-diff-stat.txt` | 검증 파일 목록과 최종 Git 원시 결과 |

이전의 마스코트 충돌 처리 코드·CSS는 변경하지 않았다. 이번에는 PROFILE·HYUNDAI·첫 PROCESS·AI·SKILL·ABOUT·CONTACT를 포함해 변경 뒤 실제 위치에서 다시 검사했다. 문자 줄·조작 영역의 실제 hit-test 기준 **533개 위치에서 가림·가로 넘침 0건**이다.

| viewport | 검사 위치 | 표시 / 충돌로 숨김 | 실패 | 챗봇 열기·Escape 닫기·포커스 복귀 |
|---|---:|---:|---:|---|
| 768×1024 | 107 | 36 / 71 | 0 | 통과 |
| 414×896 | 108 | 20 / 88 | 0 | 통과 |
| 390×844 | 106 | 13 / 93 | 0 | 통과 |
| 375×812 | 106 | 11 / 95 | 0 | 통과 |
| 360×800 | 106 | 13 / 93 | 0 | 통과 |

각 폭에서 ABOUT의 5개 답변과 실제 영상 4편 안내도 확인했다. 마스코트의 재등장 지연220ms·opacity120ms·passive scroll 1개/rAF 검사 방식은 미변경이며 직전 `editorial-20261104/final-stability.json`의 빠른 왕복·경계 깜빡임 0건 결과를 재사용했다. 이번 폴더에 복사된 `stability.mjs`, `hint.mjs`, `site-review.mjs`는 이번 실행 결과로 계산하지 않았다.

## 7. 빌드·Git 결과

- `npm.cmd run build`: **성공**. Vite8.3.0, 72 modules, 841ms. CSS118.54kB / JS969.96kB.
- 기존 **500kB 초과 번들 경고**는 유지된다. 이번 요청과 관계없는 코드 분할이나 라이브러리 변경은 하지 않았다.
- `git diff --check`: **통과(exit 0)**. 기존 LF→CRLF 안내는 whitespace 오류와 구분한다.
- 시작 시점 해시와 대조해 허용 소스4개·최신 명세 외 기존 파일은 보존했다. PROFILE JSX·셰이더도 동일하다.
- 새 라이브러리·lint 설정·reset/clean·commit/push·Vercel 배포 없음.
- 이번 전용 Chrome(9345)과 Vite(5174)는 검증 후 종료했다. 사용자 브라우저·기존 프로세스와 검증 자료는 유지했다.

## 8. 추가 문제·미검증 범위와 마무리

지정한 5개 문제 외 추가 디자인 변경은 하지 않았다. 보호 9px 캡션은 그대로 유지했다. 지정 해상도의 수정 영역에서 새 줄바꿈·가로 넘침·본문/CTA 충돌 문제는 확인하지 못했다.

이번 결과는 **Windows Chrome의 GPU 활성 headless 브라우저 및 viewport emulation** 기준이다. 실제 iOS Safari·Android 기기나 다른 브라우저 엔진, OS 글꼴 렌더링 차이까지 검증한 결과는 아니다. 외부 사이트·메일·전화 실행은 하지 않았고 기존 href를 보존했다.

이 5개 수정과 검증을 마지막 변경으로 마무리한다.
