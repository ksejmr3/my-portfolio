# THE WORKING EDITION — 최종 검수 요약

최종 반영 기준: **2026-11-05 챗봇 연결감 조정 완료 상태**. 11월2–5일 보고서를 통합한 문서이며, 이번 문서 정리에서 사이트 코드를 수정하거나 브라우저·빌드를 새로 실행한 결과가 아니다.

현재 구현·보호 조건은 [현재 명세](PORTFOLIO_CURRENT_SPEC.md), 문서 위치와 관리 원칙은 [목차](README.md)를 따른다. 과거 보고서의 유지·미검증 판단은 아래 후속 결과가 있으면 최신 결과로 대체한다. 과거 기록은 삭제하지 않았다.

## 1. 최종 섹션 구성

INTRO → PROFILE → WORK INTRO → HYUNDAI MOTORSTUDIO(소개/CHALLENGE/SELECTED SOLUTIONS/PROCESS/MY CONTRIBUTION/PROJECT REFLECTION) → VIVIENNE WESTWOOD → COS → AI VIDEO CONTENTS → CLONE CODING → SKILL → ABOUT → CONTACT.

단일 페이지다. 개인 작업2개,AI4편,CLONE3개(KYUNGDONG/LOTTE WORLD/MUSIGN),SKILL6그룹,ABOUT5카드를 유지한다. planning의 개별 상세 URL 제안은 현재 구조가 아니다.

## 2. 11월2–5일 주요 변경과 과거 판단의 대체

| 시점·근거 | 주요 결과 | 현재와 다른 과거 판단 |
|---|---|---|
| [11-02 1차](archive/FEEDBACK_REVIEW_2026-11-02.md) | JOIN 제거·클론3개,SKILL 회전 로고/전용 체류 제거,작은 본문/여백 보정 | 당시 남긴 태그·기간·보조 문구 중 아래 후속 삭제 항목을 복원하지 않음 |
| [11-03 2차](archive/FEEDBACK_REVIEW_2026-11-03.md) | 개인 태그·클론 카드 번호·SKILL 하단·ABOUT 서명 제거,AI 안내4편 정정 | 당시 콘셉트 부제목·SKILL 상단 라벨 유지는 이후 삭제로 대체 |
| [11-03 최종 피드백](archive/FEEDBACK_REVIEW_FINAL_2026-11-03.md) | 개인 메타/콘셉트·기여 기간 UI·보드 오른쪽 캡션·ABOUT/CONTACT 상단 보조 문구 제거 | 당시9px로 맞춘 편집 가능 캡션은 이후11px,through practice 유지도 이후 삭제 |
| [텍스트·번호](archive/TEXT_NUMBER_REVIEW_2026-11-03.md),[번호·모바일](archive/NUMBER_MOBILE_FINAL_2026-11-03.md),[재개 검증](archive/RESUMED_FINAL_REVIEW_2026-11-04.md) | 고정 INTRO 번호·WORK 범위 번호·개인/기여 장식 번호·through practice 삭제,모바일 마스코트 충돌/재등장 안정화 | 보호 HYUNDAI 카드 번호를 당시 유지했으나 다음 편집 작업에서 명시적으로 삭제 |
| [11-04 편집 디자인](archive/EDITORIAL_DESIGN_REVIEW_2026-11-04.md) | HYUNDAI 카드01/03·SELECTED WORK 삭제,프로젝트 유형/개인 CTA 축·여백 정리,GPU 활성 검증 | 당시 남은3개 줄바꿈·SKILL/CLONE 중복 라벨은 아래 잔여5개 작업에서 해결 |
| [11-04 잔여5개](archive/FINAL_FIVE_REVIEW_2026-11-04.md) | HYUNDAI/PROCESS/PROFILE 줄바꿈,SKILL 상단 삭제,CLONE 상단03 PROJECTS | 모든 한글 줄바꿈이 이상 없다는 이전 일괄 판단 대신 구체적 대상·해상도 검증 |
| [녹화 균형](archive/RECORDING_BALANCE_REVIEW_2026-11-04.md) | WORK 설명40–64px 이동,MY CONTRIBUTION 기준선·폭·사진 정리 | INTRO 말풍선을 프리뷰 위로 올리던 계산은 이후 폐기 |
| [최적화·재개 완료](archive/FINAL_OPTIMIZATION_REVIEW_2026-11-04.md),실제 완료11-05 | 근거리 후보/회차 생략,사진 공간 예약으로 CLS 개선,폴더·자산·폰트·영상 감사 | 즉시 숨김/정적 말풍선 위치는 다음 UX 검수로 대체 |
| [11-05 말풍선 UX](archive/CHATBOT_SPEECH_BUBBLE_REVIEW_2026-11-05.md) | 작은 꼬리·공유 부유,등장220ms/퇴장160ms,DOM 유지 fade-out/click-through | 기본bottom102/66px·박스 기준7px 간격은 최종 정렬값으로 대체 |
| [11-05 최종 정렬](archive/CHATBOT_BUBBLE_ALIGNMENT_FINAL_2026-11-05.md) | 실제 PNG 윤곽 기준desktop9.23px/mobile7.66px,기본bottom91/59px,같은 높이의 가까운 후보만 사용 | 투명 박스7px을 실제 캐릭터까지의 거리로 간주하지 않음 |

## 3. 삭제·유지한 텍스트와 번호

| 영역 | 최종 삭제·정리 | 유지 |
|---|---|---|
| INTRO | 고정01/03·SELECTED PROJECTS 메타 | 실제 자동 프리뷰3개와 상태 번호 |
| WORK INTRO | 01 — 03 | UX/UI·WEB REDESIGN 분류,타이틀·최종 소개 문장 |
| HYUNDAI 검정 소개 | UX/UI WEBSITE RENEWAL·TEAM PROJECT/PERIOD/4 PERSON TEAM PROJECT 독립 메타 | 프로젝트 설명·4인 팀의 실제 기여 설명 |
| HYUNDAI 진입 카드 | 01/03·SELECTED WORK | 유형 라벨·제목·CTA·목업 |
| MY CONTRIBUTION | 장식 번호4개,OFFICIAL TEAM PROJECT/PERSONAL FOLLOW-UP의 기간 UI와 날짜 | 수행 설명·기여 항목명·내부 key/class·실제 이력 데이터 |
| 개인 프로젝트 | 태그6개,독립 유형 메타2개,콘셉트 부제목2개,01/02·02/02 | PERSONAL WORK·제목·소개·MY WORK·SITE VIEW·목업 캡션 |
| HYUNDAI 보드 | 오른쪽FIGMA UI DESIGN BOARD | 왼쪽FIGMA / WIREFRAME & UI DESIGN |
| CLONE | JOIN·카드 번호·오른쪽범위·through practice·상단 중복 CLONE CODING | 중앙03 PROJECTS·큰 제목·3개 카드 |
| SKILL | 회전 로고/긴 체류,하단SELECTED TOOLS / PRACTICE-BASED WORKFLOW,상단TOOLS / METHODS / PRACTICE | SKILL·설명·6개 도구 그룹 |
| ABOUT/CONTACT | OBSERVE·THINK·COMMUNICATE·GROW,WORKING NOTES / 2026,CONTACT / KIM JIYOUNG 상단 보조 문구 | 소개/연락 기능·5개 카드·footer·실제 연락 정보 |

개인 태그는 BRITISH HERITAGE/PUNK REBELLION/EDITORIAL EXPERIENCE,CAMPAIGN / SS26/TIMELESS DESIGN/NEW ARRIVALS다. 삭제한 콘셉트는 BRITISH HERITAGE × REBELLION,SCANDINAVIAN MINIMALISM × TIMELESS DESIGN이다.

기여 기간 UI는 이전 소개 메타와 별개로 조사한 뒤 후속 지시로 삭제했다. 이력을 허위로 지우거나 내부 number/key를 없앤 것이 아니다. CHALLENGE/PROCESS/SELECTED SOLUTIONS의 실제 단계,AI4편 상태,ABOUT 카드 상태 등 기능상 번호는 유지한다. 사용하지 않는 과거 데이터의 문장을 실제 렌더링 중복으로 오인하지 않는다.

## 4. 타이포그래피·여백·반응형 결과

- Pretendard/Inter/Lora 역할,보호 PROCESS의 기존 서체 예외와 프로젝트별 고유 타이틀을 유지한다. 전체 제목/section 높이를 동일하게 만들지 않았다.
- 개인 작업의 유형 라벨은 Inter600/12–13px/1.5/.12em. PERSONAL WORK부터 제목/소개/MY WORK/CTA까지 왼쪽 축을 맞추고 기존 목업 좌표·크기를 보존했다.
- 편집 가능 캡션3개는11px,보호 HYUNDAI4개는9px이다. Inter500/.08em/1.3와 이미지 아래14px 간격을 유지한다. planning 가이드의13–14px 일반 캡션 제안을 현재 값으로 강제하지 않는다.
- WORK INTRO 설명만701px 이상40–64px 위로 조정했다. 제목/타임라인은 유지한다.
- SKILL은 최대636px 중심 그리드,3열/700px 이하2열,자연 높이다. 도구별 개수 차이는 그대로 두며 회전·sticky 빈 구간을 다시 넣지 않는다.
- 삭제한 문구의 전용 노드/CSS·빈 행을 정리했다. 장면의 pin 거리와 일반 여백은 별개로 다룬다.

핵심 줄바꿈은 [잔여5개 보고서](archive/FINAL_FIVE_REVIEW_2026-11-04.md)에서8개 크기로 전후 검증했다.

| 문제 | 최종 결과·범위 |
|---|---|
| 768×1024 HYUNDAI가MOTORSTU/DIO로 분리 | HYUNDAI/MOTORSTUDIO 두 줄.701–900px에서 clamp(36px,5.2vw,46px),overflow-wrap:normal.768 실측39.936px |
| 390×844 PROCESS의브랜/드 | 첫 모바일 제목만 keep-all/text-wrap:wrap으로 시장·브랜드/리서치.내용·크기·높이 유지 |
| 390×844 PROFILE의다. 단독 줄 | 기존16px/문장·폭·높이를 유지하고 keep-all.360·375·390에서 웹디자이너입니다.가 온전한 줄,414에서는 기존 한 줄 |
| SKILL/CLONE 중복 라벨 | 상단 라벨 제거 후SKILL 제목→설명20px·설명→그룹40px 유지.CLONE 상단03 PROJECTS 중심 오차0.008px 미만 |

공통5개 뷰포트(1920×1080/1440×900/1024×768/768×1024/390×844)의 시각·기능 검증 기록이 있다.414×896/375×812/360×800의 추가 기록은 잔여5개 수정·모바일 줄바꿈 검증이며,모든 최종 기능을8개 크기에서 다시 전수 검사했다는 뜻은 아니다.

## 5. MY CONTRIBUTION·이미지 로딩

최종 구조는 항목1·3 텍스트 전용,2(UI DESIGN)사진2장,4(COLLABORATION)사진4장이다.901px 이상 왼쪽1·3/오른쪽2·4 교차,좁은 화면 세로 흐름을 유지한다. 내부 라벨·제목·본문·사진의 시작축을 맞췄다.

본문 최대640px/사진 묶음 최대720px,자연 비율·순서와 문장/사진 수 차이에 따른 높이를 존중했다.각 항목의 y72/opacity0→y0/opacity1,start top94%/end top58%/scrub:true는 유지한다.진입·중간·완료·역방향 복원·자연 퇴장,느린/빠른 wheel을 기록했다.

이후 사진 응답을 잠시 지연시켜 실제 레이아웃 이동인지 재현했다.1440×900 UI DESIGN 항목은 크기 속성이 없으면 사진 decode 전214.84375px→후581.859375px,**367.015625px 증가**,해당 CLS 증가0.087761이었다.원본 비율 width/height를6개 img에 추가한 뒤 **높이 변화0px/해당 CLS 증가0**이었다.이미 로드된 사진의 표시 크기·배치·순서와 GSAP는 그대로다.사이트 전체 CLS가 항상0이라는 뜻은 아니다.

근거: [기여 정렬](archive/RECORDING_BALANCE_REVIEW_2026-11-04.md),[재현/성능 측정](archive/FINAL_OPTIMIZATION_REVIEW_2026-11-04.md).

## 6. 챗봇의 최종 상태와 검증

초기 INTRO 프리뷰 위로 말풍선을 올리는 방식은 마스코트와 분리되는 문제로 폐기했다.제한된 근거리 후보→공간 없으면 해당 회차 생략으로 변경했고,그 뒤 즉시 숨김을 자연스러운 퇴장으로 바꿨다.

최종값:

- 최초5초/이후20초/정상3초/3문구.실제 벽시계 기록은 약5.07초,20.00초 간격,3.00초였다.
- 등장220ms/정상·충돌·X 퇴장160ms,이동6px.공유 부유3.2초.
- 기본 right/bottom desktop26/91px,mobile8/59px.후보는 현재 명세 참조.위로 멀리 옮기는 후보는 없다.
- 실제 PNG alpha≥128 윤곽까지 거리desktop20.56→**9.23px**,mobile14.92→**7.66px**.꼬리 자체의12×9/10×8px 형태는 유지하고 수평으로3/2px 보정했다.
- 부유 전체·hover·등장·퇴장에서 실제 캐릭터와 본체/꼬리 겹침 없음.투명 박스와의 겹침은 실제 캐릭터 가림과 구분한다.
- 표시 전 본체+꼬리/부유/등장 여유 검사.표시 중 충돌은 제자리 fade-out/click-through,같은 회차에는 재등장하지 않는다.다음 정규 주기는 유지한다.
- X/sessionStorage/수동 패널/ESC/모바일 런처 충돌 숨김·220ms reveal 대기/reduced-motion 유지.모바일에서 부모 전체를 숨겨 말풍선 fade를 자르지 않는다.

최종 위치 조정은5개 뷰포트에서 실제 alpha16/128 윤곽,INTRO/기여 사진 충돌,정상/X/충돌 퇴장·회차 잠금·수동 패널을 검증했다.초기 사진 paint 부하로 CSS 전환 시간보다 프레임 관측이 길 수 있으며,다양한 기기에서 항상160ms 내 완전히 그려진다고 보장하지 않는다.

근거: [UX](archive/CHATBOT_SPEECH_BUBBLE_REVIEW_2026-11-05.md),[최종 위치](archive/CHATBOT_BUBBLE_ALIGNMENT_FINAL_2026-11-05.md).

## 7. GSAP·주요 인터랙션 검증 근거

| 기능 | 기록된 최종 확인과 한계 |
|---|---|
| INTRO/PROFILE/WORK | 자동 프리뷰3개,desktop 실제 GPU curl의 진행·종료·역방향 복귀.11-02의 GPU 비활성 한계는11-04 GPU 활성 검증으로 보완.390은 기존 일반 세로 흐름이지 desktop pin 재현이 아님 |
| HYUNDAI | 진입 opacity0→1→0→1,보호 목업/SELECTED SOLUTIONS/PROCESS·확대/ESC와 위치·소스 보존.절대 문서 좌표는 앞선 콘텐츠 높이 변경으로 달라질 수 있음 |
| 개인 작업 | 1920/1440/1024 가로0→.5→1→.5→0,768/390의 기존 세로 흐름·목업 내부 미리보기 유지 |
| AI4편 |5개 뷰포트에서 viewport 진입 후 currentTime 증가·paused=false·media error 없음.새로 전체 재생 정책을 바꾸지 않음 |
| CLONE3개 | 실제 wheel 등장·교차·퇴장·역순 복원과 마지막 SKILL 전환.901px 미만 정적 흐름 유지 |
| SKILL | 정적6그룹,로고/회전 트리거 없음 |
| ABOUT |5개 상태0→1→2→3→4→3→2→1→0.배경→콘텐츠 순서 유지.390px 수동 카드 흐름과 구분 |
| CONTACT/챗봇 | 기존 href·패널/질문/답변·충돌 처리 보존.실제 메일 발송/전화/모든 외부 사이트 접속 성공은 미검증 |

각 후속 작업은 변경 영향 항목을 재검증하고 미변경 기능의 성공 기록·소스/좌표 비교를 재사용했다.모든 기능의 모든 프레임을 매번 전수 재검사한 것으로 합산하지 않는다.기존 cleanup/이미지 준비 refresh를 유지했고 공유 부유에 새 JS 타이머·rAF 루프를 추가하지 않았다.

## 8. 빌드·Git·배포 상태

11-05 연결감 조정 당시 `npm.cmd run build`는 **exit0/72 modules**,`git diff --check`도 **exit0**이었다.[당시 빌드 로그](../.review/chatbot-alignment-20261105/build-result.txt)는 CSS119.43kB/JS972.06kB(gzip277.00kB)다. 이후 초기 로딩 최적화 빌드도 **exit0/72 modules**,CSS119.43kB/JS972.11kB(gzip277.01kB)이며500kB 초과 경고는 유지했다. 이번 최종 로그는 [성능 검증 폴더](../.review/loading-performance-20261105/)에 보존한다.

현재 package scripts는 dev/build/preview다.초기 lint 실행은 Missing script:lint로 실패한 이력이지 통과 기록이 아니다.새 lint/test 의존성을 설치하지 않았다.

11월2–5일 작업 보고서는 Commit/Push/Vercel 배포 미실행을 명시하며,마지막 확인 HEAD는 `1367ed938ca3252023788c1a91892204910587eb`/master다.이번 문서 작업도 커밋·푸시·배포·reset·clean하지 않는다.외부에서 별도로 수행된 배포나 원격 상태를 조회한 결과는 아니다.

후속 배포 요청(2026-11-05): 위 미실행 기록과 아래 성능 검수의 미실행 기록은 **검수 완료 당시**의 이력이다.사용자가 이후 `ksejmr3/my-portfolio`의 `master` 커밋·푸시 및 기존 Vercel 프로덕션 갱신을 명시적으로 승인했다.배포 직전 fetch 결과 로컬/원격은 위 SHA로 일치했고 build/diff 검사를 통과했다.배포 결과의 실제 SHA·자동 배포 상태는 해당 Git 커밋과 GitHub Vercel status 및 프로덕션 응답으로 확인하며,이 과거 검수 기록의'배포 미실행'을 이후 배포 금지나 최신 배포 상태로 해석하지 않는다.로컬 `.review` 증거는 커밋 대상이 아니다.

## 9. 초기 로딩·JavaScript 성능과 남은 후보

### 11-05 실제 적용 범위

문서 정리 후 현재 소스를 다시 측정하고 **제품 소스 두 줄만** 변경했다. 기존 미커밋 변경·삭제 상태와 untracked 파일은 보존했다.

| 제품 파일 | 변경과 이유 | 유지한 부분 |
|---|---|---|
| `src/components/ProfileIntro.jsx` | HTML 사진에 `crossOrigin="anonymous"` 추가. 기존 HTML no-cors 요청과 TextureLoader의 cors 요청이 같은 원본을 각각 약4.95MB씩 전송하던 것을 한 요청으로 합침 | 원본 2837×3649/4,951,045bytes,초기 로딩,Three.js·셰이더·cleanup·스크롤 이벤트·사진 위치 |
| `src/pages/HyundaiCaseStudy.jsx` | PROCESS `img.is-current`에 `loading="lazy" decoding="async"` 추가. 첫8초에 필요 없던 6개 이미지의 약2.55MB 선행 전송을 지연 | 원본 src/alt,고정 미디어 박스·fit/position,현재/이전 이미지 교체,컨트롤·5초 순환·확대 보기·GSAP |

CSS/GSAP/챗봇/폰트/영상/의존성/Vite 설정은 변경하지 않았다. 원본 교체·삭제·새 포맷 변환도 없다. [시작 SHA256 목록](../.review/loading-performance-20261105/start-hashes.json)과 최종 보존 검사로 이번 변경을 기존 작업과 구분한다. 문서는 이 요약과 명세의 로딩 규칙만 갱신했으며 새 날짜별 Markdown 보고서는 만들지 않았다.

### 11-06 HYUNDAI INTRO Hero WebP 적용

별도 분석에서 실제 슬롯 최대305 CSS px/DPR3 필요 폭915px를 확인한 뒤, 검증 후보 `960×540 WebP quality .95`를 `public/images/hyundai/intro-home-hero-960.webp`로 추가하고 `src/components/IntroSection.jsx`의 HYUNDAI INTRO 경로 한 줄만 변경했다. 후보와 제품 파일 SHA256은 `EA5B287CFBE7D419F2274860464A1486555901B3FCE283544C8328CEB49F288B`로 동일하며 원본 `intro-home-hero.png`(3842×2160/7,344,057bytes)는 수정·삭제하지 않았다. CSS·JSX 구조·2.5초 상태 로직·GSAP·다른 자산은 변경하지 않았다.

동일 production preview/Chrome/1440×900/DPR1/cache disabled/첫8초 조건에서 기존 3회 표본과 적용 후 3회를 비교했다. 이미지 encoded는 **18.077807MB → 10.850719MB**(7.227088MB/39.98% 감소), 전체 encoded 중앙값은 **19.078946MB → 11.851890MB**(7.227056MB/37.88% 감소), 요청 수는64/64/64로 동일했다. HYUNDAI 요청은 PNG7,344,328 encoded bytes에서 WebP117,240bytes로 바뀌었다. LCP는 기존1040/916/916ms(중앙916) 대비1020/940/916ms(중앙940)로 범위가 겹치므로 개선으로 단정하지 않는다. CLS 범위도 양쪽 모두0.000442–0.000881로 동일하다. JS encoded는275,392→275,397bytes, production JS는972,118→972,123bytes로 경로 문자열5bytes만 증가했고 CSS119,438bytes는 동일하다.

5개 viewport에서 이미지 layout은 기존 PNG와 동일한305×172/242×136/194×109/194×109/140×79px,가로 넘침0,로드 중 관측 CLS0이었다.1920/390 DPR3에서 필요한915/420px를 자연 폭960px가 충족했다.자동 프리뷰는0/2526/5026ms에01 HYUNDAI→02 VIVIENNE→03 COS로 이미지·캡션이 동기화됐다.PROFILE WebGL ready/canvas,INTRO GSAP 정·역방향,PROCESS native lazy(초기 미요청→진입 시 현재 패널 준비),AI4편 metadata/muted/loop/playsInline,챗봇 수동 패널,ABOUT5카드 전환을 확인했다.런타임 예외·HTTP4xx/5xx·이미지404는0이다. 근거는 [분석/적용 폴더](../.review/hyundai-hero-optimization-20261106/)의 `REPORT.md`,`perf-applied.json`,`regression-applied.json`,`process-applied.json`이다.빌드는72 modules/exit0이며500kB 경고는 유지했다.이 로컬 적용은 아직 Commit/Push/Vercel 배포하지 않았다.

### 11-06 PROFILE WebP 적용

사전 분석에서 desktop 최대 표시410×527px/DPR3 필요량1230×1583px를 확인한 뒤, 검증 후보 `1600×2058 WebP quality .95`를 `public/images/profile/profile-1600.webp`로 추가하고 `src/components/ProfileIntro.jsx`의 HTML `img` 경로 한 줄만 변경했다. 후보와 제품 파일 SHA256은 `DC9D0FB69570DFC6879343177929713CBA3B78AFCA0314BAD8310B410E283067`로 동일하다. 원본 `profile-portrait.jpg.jpg`(2837×3649/4,951,045bytes/SHA256 `2AD2EE95365CDDAB8975D291B745E553FE0F92512ACB9A6F228AA0DD93340FA3`)는 수정·삭제하지 않았다. `crossOrigin="anonymous"`, `currentSrc || src` TextureLoader 공유, sRGB·LinearFilter·mipmap 비활성, UV·셰이더·GSAP·CSS는 변경하지 않았다.

동일 production preview/Chrome/1440×900/DPR1/cache disabled/첫8초 조건에서 HYUNDAI 최적화 후 기준3회와 PROFILE 적용 후3회를 비교했다. 이미지 encoded는 **10.850719MB → 6.442340MB**(4.408379MB/40.63% 감소), 전체 encoded 중앙값은 **11.851890MB → 7.443475MB**(4.408415MB/37.20% 감소)였다. PROFILE 요청은 1회/542,990 encoded bytes이며 파일 payload는542,668bytes다. 요청 수는 기존64/64/64에서65/64/64로 첫 회의 비본질적 요청 1개 변동이 있었다. LCP는 기존1020/940/916ms(중앙940) 대비936/836/836ms(중앙836)였지만 각3회·로컬 headless 표본이므로 통계적 개선으로 단정하지 않는다. CLS는 양쪽 모두0.000442–0.000881 범위이고 JS encoded는275,397→275,399bytes로 실질적으로 동일하다.

5개 viewport에서 PROFILE layout은 기존 JPG와 동일한410×527/410×527/316.92×407.63/360×463.03/252×324.13px이고, WebGL ready·GL error0·단일 요청·CLS0·가로 넘침0을 확인했다.1920/390의 DPR2·3에서 필요한 최대1230×1582/756×972px를 자연 크기1600×2058이 충족했다. reduced-motion 1440/390도 정적 WebGL 표시와 단일 요청을 유지했다. 격리된 curl 3회 왕복360프레임은 평균16.63ms/최대16.8ms/25ms 초과0이었으나 Chrome headless/제한 없음 환경의 결과이며 저사양 실기기 성능을 뜻하지 않는다. 5폭 전체 사이트에서 GPU context, AI4편, ABOUT5카드, 주요 섹션 잘림·가로 넘침을 재검증했고 1440에서 CLONE3카드 정·역방향, 개인 작업/INTRO 왕복도 통과했다. 근거는 [PROFILE 분석/적용 폴더](../.review/profile-image-optimization-20261106/)의 `REPORT.md`, `profile-regression-applied.json`, `site-review-applied.json`, `motion-applied.json`, `perf-profile-applied.json`, `timing-applied.json`이다. 로컬 적용은 아직 Commit/Push/Vercel 배포하지 않았다.

### 같은 조건의 전후 측정

로컬 **production Vite preview**,Chrome headless,1440×900,DPR1,HTTP cache disabled,CPU/네트워크 제한 없음,스크롤 없이 최초8초. 동일 브라우저/재사용 프로필에서 전후 각3회 측정했다. 별도 상세 표본은 DOM 가시성 120ms 샘플러를 포함하므로 주 비교 수치에서 제외했다. 공개 배포·실사용자·실제 모바일 결과가 아니다.

원자료의 수집 대기는8.05초이며,집계의 LCP/CLS/long task는 startTime≤8000ms로 제한했다. 네트워크는 최초8초에 시작한 요청의 완료 encodedDataLength이고 모든 집계 이미지의 완료도8초 이내다. CDP TaskDuration/ScriptDuration은 약8.05초 시점 누적 진단값이다. MB/kB는10진수다.

| 지표 | 수정 전 | 수정 후 | 해석 |
|---|---|---|---|
| 이미지 encoded 전송 | 25.580404MB,3회 동일 | 18.077807MB,3회 동일 | **7.502597MB/29.33% 감소** |
| 전체 encoded 전송 중앙값 | 26.581497MB | 19.078946MB | **약7.50MB/28.23% 감소** |
| 요청 수 | 71/71/72 | 64/64/64 | 외부 리소스·favicon 변동 포함 |
| 초기 JS encoded 전송 | 275,382bytes | 275,392bytes | 단일 청크 유지,감소 없음 |
| JS production 파일 | 972,062bytes | 972,118bytes | 속성 추가로56bytes 증가 |
| Vite 표시 JS gzip | 약277.00kB | 약277.01kB | 500kB 경고를 숨기지 않음 |
| LCP(ms),3회/중앙값 | 988/912/980 → **980** | 1040/916/916 → **916** | 범위 중첩·최고값 증가,속도 향상으로 단정하지 않음 |
| 첫8초 CLS | 0.000442–0.000881 | 0.000442–0.000881 | 기존 INTRO 프리뷰 전환이8초 경계에 걸리는 차이,이미지 최적화 효과로 주장하지 않음 |
| long task 합 중앙값 | 613ms(578–632) | 586ms(579–596) | 표본3개로 일반 개선 미입증 |
| TaskDuration 중앙값 | 1.451185s | 1.485147s | 약34ms 증가,전체 메인 스레드 개선 미입증 |
| ScriptDuration 중앙값 | 0.347646s | 0.323426s | 편차가 있어 JS 실행 개선으로 단정하지 않음 |

근거: [전후 집계](../.review/loading-performance-20261105/comparison.json),[before](../.review/loading-performance-20261105/perf-before.json),[after](../.review/loading-performance-20261105/perf-after.json),[상세 before](../.review/loading-performance-20261105/perf-before-detail.json),[상세 after](../.review/loading-performance-20261105/perf-after-detail.json). 과거 [최적화 보고서](archive/FINAL_OPTIMIZATION_REVIEW_2026-11-04.md)의26.58MB/25.58MB/LCP972ms는 역사적 단일 표본이며 이번 반복 표본으로 대체한다. 기존 MY CONTRIBUTION 사진 공간 예약에 의한 CLS 개선은 별개로 유지한다.

### 이미지·폰트·영상 요청 분석

초기 이미지 전 요청의 경로·원본 bytes/해상도·실제 전송·시작 시각·표시 표본·렌더 크기·사용 위치·loading/decoding/priority는 [이미지 CSV](../.review/loading-performance-20261105/initial-images.csv)와 [JSON](../.review/loading-performance-20261105/initial-images.json)에 있다. 원본 정보는 기존 자산 감사와 대조했다. 같은 URL의 전후 합계를 중복 요청별 행에 반복 기재하므로 after 열을 행별로 재합산하지 않는다.

| 구분 | 발견·판단 |
|---|---|
| INTRO 실제 초기 표시 | HYUNDAI는 INTRO 전용 WebP0.117MB/960×540로 적용하고3842×2160 원본 PNG는 보존.VIVIENNE0.50MB,COS0.83MB와3개 순환·요청 정책 유지.현재 프리뷰 슬롯은 약253×157px(1440폭 표본),최대305px/DPR3까지 검증 |
| INTRO 준비 시각 | 상세 표본에서 첫 HYUNDAI 준비 약701→704ms,VIVIENNE3135→3082ms,COS5663→5602ms.후속 두 프리뷰는 최초 가시 표본에서 준비됨.120ms 샘플 오차가 있어 프레임 단위 무지연을 보장하는 값은 아님 |
| PROFILE | 최초 스크롤 대비 초기 사진/텍스처 준비 유지.410×527px 최대 표시,1600×2058 WebP를 HTML/TextureLoader가 같은 URL로 1회 요청.2837×3649 원본 JPG는 보존.초기 img 가시성 null은 숨겨진 PROFILE/캔버스 대체를 포함하므로 미사용 판정이 아님 |
| PROCESS 6장 | 시장 조사·회의 기록·페르소나·설문·마인드맵·와이어프레임.각각 약0.10/0.56/1.33/0.30/0.12/0.14MB.초기 offscreen,전후 첫8초 요청6→0.접근/가로 이동 시 브라우저 native lazy가 로드 |
| 기타 선행 이미지 | HYUNDAI 첫 데스크톱/모바일 타일,프레임·동영상 poster,개인 노트북 프레임1.03MB,ABOUT 필름스트립 사진,마스코트0.83MB 요청은 유지.즉시 초기 화면에 모두 필요한 것은 아니며 다음 단계의 선행 준비/회전·재생 정책과 연결됨 |
| CSS background/preload | main의 computed background 표본은 CLONE gradient3개이며 추가 URL 배경 이미지가 없었음.index.html에 이미지 preload 없음.컴포넌트의 src/decode/동영상 poster가 선행 요청 원인 |
| 캐시 | HTTP cache disabled 상태에서 PROFILE 요청2→1을 확인.서버 preview는 no-cache 응답,디스크 캐시 개선을 가장한 결과가 아님.일반 재방문 캐시·CDN 배포 정책은 별도 미검증 |
| 폰트 | 초기 Font21요청/약0.609MB,동일 Font URL 중복 없음.Pretendard Variable/Inter/Lora와 보호 Manrope/DM Sans 유지,FontFace display=swap 확인.여러 weight 선언을 같은 variable 파일로 받는 것을 중복 파일로 계산하지 않음.관측 CLS source는 INTRO 프리뷰이며 폰트 인과/느린 회선의 FOIT는 별도 미검증 |
| 영상 | 초기 Media10요청 합82,435bytes,AI84.07MB 전체 다운로드가 아님.metadata 일부 range 요청과 기존 재생 정책 유지.4편 muted/loop/playsInline/controls/preload=metadata 및 viewport 진입 자동재생 재검증.이탈 pause/수동 pause 존중은 기존 코드·검증 재사용 |

### JavaScript 기여도와 적용하지 않은 후보

임시 `write:false` 분석 빌드로 실제 포함 모듈을 확인했다.[번들 before](../.review/loading-performance-20261105/bundle-before.json)/[after](../.review/loading-performance-20261105/bundle-after.json)의 `renderedLength`는 **최종 minify 전 모듈 기여도**이며 최종972kB 청크의 압축 후 bytes로 해석하거나 gzip 기여량처럼 합산하면 안 된다.현재 JS는 초기 단일 청크이고 코드 분할은 실행하지 않았다.

| 모듈 | renderedLength | 초기 실행 필요성·판단 |
|---|---:|---|
| Three.js | 835,851 | 가장 큰 기여.PROFILE 초기 renderer/texture 준비에 사용,후속 전환 대비.GPU·pin 등록 시점 검증 없는 지연 import 미적용 |
| GSAP | 173,654 | 초기 INTRO/PROFILE/WORK 전환부터 필요 |
| ScrollTrigger | 78,441 | mount 시 전 섹션 pin/start/end 계산과 연결 |
| React / React DOM / scheduler | 16,425 / 459,807 / 9,252 | 초기 렌더링 기반,패키지 변경 없음 |
| Lenis | 28,164 | 기존 스크롤과 ScrollTrigger 동기화 기반 |
| 전체 프로젝트 소스 | 188,166 | 아래 개별 모듈은 이 합계의 일부 |
| PROFILE 컴포넌트 / 셰이더 | 5,942 / 4,803 | Three.js와 별도 기여.구조 변경 없이 HTML 요청 모드만 조정 |
| HyundaiCaseStudy / HyundaiProjectPreview | 51,683 / 6,411 | 아래 섹션이지만 mount 시 레이아웃·pin 등록.범용 React.lazy 변경은 위험 |
| AI VIDEO 컴포넌트 | 5,117 | viewport 재생 observer만 초기 등록.영상 자체는 metadata 정책 |
| PersonalProjectCaseStudy / PortfolioAssistant | 20,511 / 15,958 | 개인 가로 pin/목업 선행 준비,공통 챗봇 초기 타이머·충돌 처리 |

simple-icons는 설치되어 있지만 이 실제 청크에는 포함되지 않는다.제거해도 이 번들 절감의 근거가 없으므로 패키지를 제거하지 않았다.실제 포함된 라이브러리는 기능 사용 중이며,확실한 미사용 import를 제거해 JS가 줄었다고 주장할 항목은 발견하지 못했다.기존 effect의 timer/observer/resize/scroll/GSAP/renderer cleanup을 유지하고 새 listener·timer·observer를 추가하지 않았다.큰 섹션의 JS 초기 전송·실행 비용은 남는다.

### 반응형·회귀 검증

성능 수치는 production,상세 GSAP 진단은 동일 소스의 Vite dev에서 수행했다.기존5개 viewport 스크립트를 복제해 출력 경로만 이번 검수 폴더로 바꾸고 과거 결과를 덮어쓰지 않았다.

| viewport | 이번 재검증 결과 |
|---|---|
| 1920×1080 | WebGL2 ready/context 정상,curl 정·역방향,주요10영역 캡처,AI4편 자동재생,ABOUT5카드 왕복,PROCESS6단계 빠른 왕복·박스 안정,챗봇 실제 자동 주기/수동 질문·ESC 통과 |
| 1440×900 | 위 항목 통과.추가 CLONE3카드 등장·교차·퇴장·역방향·SKILL 진입,개인 가로 전환 왕복,INTRO 전환 왕복,PROCESS 느린 wheel 진입 재검증 |
| 1024×768 | WebGL2/curl 왕복·주요영역·AI4/ABOUT5·PROCESS6 빠른 왕복·박스 안정·챗봇 자동/수동 통과 |
| 768×1024 | 기존 PROFILE 공유 전환·세로 PROCESS/개인 대체 흐름·AI4/ABOUT5·PROCESS6 빠른 왕복·박스 안정·챗봇 자동/수동 통과 |
| 390×844 | PROFILE 세로 흐름/사진·WebGL ready·AI4/ABOUT5·PROCESS6 빠른 왕복·박스 안정·챗봇 자동/수동 통과 |

5폭 모두 가로 넘침·검사 대상 텍스트 clipping·로드 완료 후 broken image 없음.빠른 PROCESS 진입은 cold HTTP cache/진입120ms 후 해당 원본 준비를 검증한 것이며 모든 환경에서0ms 빈 프레임이 없다는 보장은 아니다.디코딩 전후 stageHeight/trackWidth/이미지 박스 높이는 동일했다.1440 느린 wheel 진입은 실제 보이는 표본에서 이미지 준비 상태를 확인했다.PROFILE ready 및 curl 복귀를 확인하고 1440/390의 reduced-motion 대체 흐름도 별도 점검했다.스크린샷에서 원본 선명도·색상·투명 경계를 확인했으며 이미지 bytes 자체는 변경하지 않았다.

근거: [5폭 사이트/GPU/영상/ABOUT](../.review/loading-performance-20261105/site-review.json),[PROCESS 빠른 왕복·decode 안정성](../.review/loading-performance-20261105/process-regression.json),[CLONE/개인/INTRO 왕복](../.review/loading-performance-20261105/motion.json),[챗봇·느린 진입·reduced-motion](../.review/loading-performance-20261105/smoke.json).챗봇 소스·CSS·데이터,타임라인·CSS가 시작 시점과 동일한 영역의 기존 상세 검증(20초/3초 주기·fade·꼬리/alpha·회차 생략,다른 desktop CLONE 표본)은 재사용했다.이번에 전 항목의 타이머 경계를 새로 측정했다고 표현하지 않는다.

최종 `npm.cmd run build`/`git diff --check`는 각각 **exit0**.빌드의500kB 경고와 Git의기존 LF→CRLF 안내는 남지만 검사는 실패하지 않았다.[최종 보존·링크·기하 검증](../.review/loading-performance-20261105/final-verification.json)은 시작 파일318개 중 승인된 JSX2개/문서2개 외 해시 변경0·누락0,갱신 문서의 상대 링크 오류0을 확인했다.PROFILE/PROCESS7개 이미지의 production 전후 렌더 박스 좌표·크기도 동일했다.master/HEAD `1367ed938ca3252023788c1a91892204910587eb` 유지,Commit/Push/배포/reset/clean 미실행.

새 검증 폴더는 약17.98MB(소스 시점 사본·JSON/CSV·스크립트·필요 캡처 포함).기존 `.review` 자료를 삭제하지 않고 기존 검증 Chrome 프로필을 재사용했으며 새 프로필을 만들지 않았다.소유한 Chrome9352와 preview5183/dev5184는 검증 후 종료했고 해당 포트 listener가 없음을 확인했다.기존 사용자 서버는 건드리지 않았다.`.review`/`dist`/`node_modules`는 Git ignore 대상이며 검증 스크립트는 제품 실행 그래프 밖에 있다.기존5.70GB 자료의 정리 후보는 아래 문서 감사 표를 참고하며 이번에 정리하지 않았다.

### 별도 승인 후 검토할 후보

| 별도 승인 후 검토할 후보 | 유지할 검증 조건 |
|---|---|
| PROFILE WebP 실기기 확인 | 1600×2058 WebP 적용·Chrome 회귀 검증 완료.원본 JPG는 보존.실제 iOS Safari/Android·저사양 GPU·확대 환경의 인물 디테일과 context loss는 추가 확인 필요 |
| 우선순위2: PROFILE Three.js/비초기 섹션 코드 분할 | 큰 초기 JS 비용 절감 가능하나 mount/레이아웃·pin/refresh/GPU·정역방향/모바일/reduced-motion 전체 재검증 필요.주요 구조 변경은 승인 대상.단지 청크 경고 기준을 올리지 않음 |
| 우선순위3: eager 프레임·poster,ABOUT decode의 선행 로딩 세분화 | 목업/순환 준비를 늦출 수 있어 현재 유지.예상 이점은 요청 시점 조정이며 실제 절감은 추가 표본 필요.상태/observer 구조 변경을 동반하면 별도 검토 |
| AI4편84.07MB 등 영상 재인코딩 | 원본/화질/음성/색·자동재생/controls 검증.이번까지 미실행 |
| public 보존 원본의 경로 분리·미사용 후보 정리 | 동적 참조·출처·다른 용도 확인 및 폴더 변경 승인.미발견을 미사용 확정으로 보지 않음 |
| 미참조 simple-icons/패키지 변경 | 설치 용량과 실제 번들 효과를 구분.제거/업데이트 미실행 |
| 외부 폰트·배포 업로드 경계 | Pretendard/Google Fonts swap 유지,가중치·외형 비교.QA 폴더 업로드 포함 여부는 실제 배포 방식 확인 후 판단 |

자산251개 전수 목록은 [CSV](archive/ASSET_AUDIT_2026-11-04.csv)에 있다.원본 JPG/WebP·제작 자산·미사용 가능성이 높은 파일·미확정 파일은 구분한다.

실물 iOS/Android·터치·Safari/Firefox·저사양 GPU·다양한 확대율/안전 영역·느린 회선·실사용자 INP는 미검증이다.5개 viewport 검증을 실제 휴대폰 검증으로 표현하지 않는다.긴 프레임·외부 폰트 의존과 큰 이미지/JS 부담은 남아 있다.

## 10. 문서 통합 및 .review 감사

이번 작업 전19개 Markdown+CSV1개를 전수 조사했다.기획5개는 planning,경로 고정이 없는 이전 보고서7개는 archive로 이동했다.기존 명세·목차의 원문은 archive의 이력 사본에 보존하고 현재 명세/목차를 현행 기준으로 정리했다.원본 보고서는 삭제하지 않았으며 링크 변경만 반영했다.

루트의 날짜별 보고서5개와CSV는 검수 도구가 경로를 직접 읽거나 쓰는 **이동 예외**다.정확한 도구/행은 [목차](README.md)에 있다.이 때문에 루트 파일이 세 개만 있는 것은 아니지만 현재 판단은 명세·이 요약·목차 세 문서를 중심으로 한다.과거 snapshot JSON/상태 로그의 경로·해시는 당시 기록으로 보존한다.그 시점 전용 verify 스크립트를 현재 트리의 새 검증기로 재실행한 것으로 간주하지 않는다.

### .review 현재 용량과 정리 후보

측정:2026-11-05,이번 감사 스크립트 실행 시점.이전 약4.68GB 측정 이후 검수용 프로필/캡처가 누적된 상태다.파일 삭제·이동은 하지 않았다.

측정 시각: 2026-11-05 11:21:17 KST

| 구분 | 파일 수 / bytes | 보존·정리 판단 / 예상 절약 |
|---|---|---|
| 현재 .review | 18,495 / 5,695,215,092 | 5.70GB,약5.30GiB.감사 시점 스냅샷 |
| 검수 Chrome 프로필 | 15,413 / 4,830,103,748 | 18개 환경.향후 종료/재현 상태 확인 후약4.83GB 후보 |
| 최신4개 폴더의 프로필 밖 증거 | 492 / 153,038,510 | 보존,원시JSON/스크립트/캡처/이번 원문 백업 포함 |
| SHA256 동일 미디어(64KiB 이상) 후보전체 | 180 / 224,721,976 | 32그룹.안전 삭제 가능량과 다름 |
| 그중before-source 등 원본비교 | 175 / 223,961,150 | 약223.96MB 보존 권장.경로·해시 재현 자료 |
| 그밖의 동일 캡처 | 5 / 760,826 | 약0.76MB 조건부후보.참조·keeper 확인 필요 |
| 현재 확보한 절약 용량 | 0 bytes | 어떤.review 파일도 삭제/이동하지 않음 |

조건부 중복 캡처5개:

- `.review/feedback-20261102/final-1440-personal-work.png` — 260,038 bytes
- `.review/text-number-20261103/motion-1440-forward-0.64.png` — 124,977 bytes
- `.review/final-five-20261104/before-414-profile.png` — 133,467 bytes
- `.review/number-mobile-resume-20261104/sweep-390-ai.png` — 102,119 bytes
- `.review/number-mobile-resume-20261104/sweep-390-skill.png` — 140,225 bytes

Chrome 프로필은 캡처/측정 기록과 구분되는 재생성 환경 후보다.나중에 삭제하려면 해당 테스트 브라우저가 종료됐는지와 재현·로그인 상태 보존 필요를 다시 확인해야 한다.위 수치는 이번에 확보한 디스크 공간이 아니다.프로필18개 경로·크기와중복 SHA256 목록은 `.review/docs-consolidation-20261105/review-audit.json`에 있다.

before-source 원본 비교 파일175개는 byte가 같아도 당시 경로·해시 검증에 필요하므로 보존 권장이다.그223.96MB를 그대로 안전 절약량으로 계산하지 않았다.프로필을 제외한 중복 캡처5개도 원래 보고서/스크립트 참조를 확인하고 사본 한 개 이상 보존한 뒤에만 정리 후보가 된다.

최신 근거로 chatbot-alignment/chatbot-speech/final-optimization의JSON·스크립트·캡처와 이번 docs-consolidation의 원문/매핑/검사 결과를 보존한다.earlier recording-balance/final-five 등의 성공 증거와모든before-source·원시 JSON·Git 로그도 보존 대상이다.이번 스캔의최신4개 폴더 중 프로필 제외 자료는 약153.04MB다.

### 이번 문서 작업의 최종 확인

- 원문 보존 **20/20개**(Markdown19개+CSV1개).본문·표·수치는 보존하고 상대 링크 대상만 새 위치에 맞췄다.
- 현재 Markdown **22개**.로컬 Markdown 링크 **112개**,깨진 링크 **0개**.외부URL은 보존했으며 네트워크 접속 검사는 하지 않았다.
- 원문 누락 **0개**,docs 밖 변경 **0개**.기존 소스·자산·패키지 파일은 작업 시작 해시와 같다.
- 직접 참조 도구 경로 **6/6개 유지**.과거 스냅샷의 경로/해시는 역사 기록으로 보존했고 당시 전용 검증기를 현재 사이트의 검사로 다시 실행하지 않았다.
- `git diff --check`: **exit0**.브랜치 **master**,HEAD `1367ed938ca3252023788c1a91892204910587eb` 유지.Commit/Push/배포/reset/clean 없음.
- 아직 스테이징하지 않은 문서 이동은 Git에서 옛 경로의D와 새 경로의??로 보일 수 있다.보존 위치는 `.review/docs-consolidation-20261105/document-inventory.json`에 기록했다.
- 검사 근거: `.review/docs-consolidation-20261105/`의 `verification.json`, `final-status.txt`, `final-check.txt`, `markdown-link-changes.json`, `relocation-map.json`.

사이트 JSX/CSS/JS·이미지·영상·인터랙션을 수정하지 않았으므로 이번에는 사이트 빌드·전체 디자인 검수를 반복하지 않았다.이후 작은 변경은 날짜별 새 보고서 대신 현재 명세와 이 요약의 관련 항목을 갱신한다.
