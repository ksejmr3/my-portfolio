# THE WORKING EDITION — 챗봇·최종 시각 검수·파일 감사·성능 검증

완료 검수일: **2026-11-05 (Asia/Seoul)**. 요청한 파일명은 중단 전 작업일인 2026-11-04를 유지한다.

작업 경로: `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`.
브랜치 `master`, HEAD `1367ed938ca3252023788c1a91892204910587eb`. 다른 리디자인 저장소는 수정하지 않았다.

## 1. 중단 지점 대조와 재개 범위

- 중단 전 완료: Git/해시·src 사본, 5개 해상도 수정 전 캡처·기여 항목 치수, 251개 자산 및 폴더 감사, 녹화 사본/프레임, 초기 성능 측정. 최초 .review 측정은 **15,332개 / 4,682,714,694 bytes**였다.
- 중단 전 소스 초안도 실제 반영되어 있었다: 챗봇 JSX/CSS의 제한된 충돌 처리와 HYUNDAI 사진 6개의 원본 크기 속성. 재개 시 이를 중복 적용하지 않았다.
- 재개 시 QA 자료는 `audit.mjs`, `cdp.mjs`, `collision-effect.txt`뿐 아니라 `before.json`, `audit.json`, `assets.csv`, `perf-before.json`, 캡처·비교 소스·해시까지 남아 있었다. 브라우저/서버는 종료되어 검수 전용 포트 5176·5177·9347로 다시 실행했다.
- 재개 후 수행: 이미지 지연 로딩 재현/비교, 말풍선 거리·사진 충돌·회차 생략·실제 타이머·수동 패널·cleanup, 5개 뷰포트 회귀 검수, 자료 분류·CSV·문서 안내, 최종 빌드/차이 검사.
- 이번 추가 제품 보완은 충돌로 생략된 말풍선의 fade-out을 즉시 끝내는 CSS 한 규칙이다. 일반 등장/정규 종료의 .28초 전환은 유지한다. 사진 위에 fade 잔상이 남지 않도록 한다.
- 기존 tracked/untracked 파일의 시작 해시와 대조한 결과, 기존 파일 누락은 **0개**다. 아래 세 제품 파일과 최신 명세 외에는 시작 시점 콘텐츠가 그대로다. 기존 JOIN 이미지 2개의 삭제 상태도 시작 당시 상태이며 복구·추가 삭제하지 않았다.

## 2. 실제 수정 파일

| 파일 | 이번 작업 단위의 내용 |
|---|---|
| src/components/PortfolioAssistant.jsx | 중단 전 반영 초안 유지·검증. 제한된 후보 위치, 이미지/텍스트/조작 영역 충돌 검사, 회차 생략 잠금, 캐시·관찰자·cleanup |
| src/styles/portfolio-assistant.css | right/bottom 변수 초안 유지. 재개 후 skipped 상태에서 transition:none 추가 |
| src/pages/HyundaiCaseStudy.jsx | 사진 6개의 원본 width/height 데이터와 img 속성만 유지·검증 |
| docs/PORTFOLIO_CURRENT_SPEC.md | 최종 보고서 우선순위와 기존 말풍선 계산의 대체 사실 추가 |
| docs/README.md | 새 문서 분류/탐색 안내. 기존 문서 이동·이름 변경 없음 |
| docs/ASSET_AUDIT_2026-11-04.csv | 새 전수 자산 목록 251행. 참조·해상도·용량·코덱·판정·SHA256 |
| docs/FINAL_OPTIMIZATION_REVIEW_2026-11-04.md | 이 최종 보고서 |

HYUNDAI 소스에서 추가한 크기 데이터/JSX 속성을 제거한 비교 문자열은 시작 사본과 **완전히 동일**했다. 이미지·문구·순서·GSAP 코드는 그대로다. PROFILE/ABOUT/개인 프로젝트/CLONE/영상 소스도 작업 시작 해시와 같다. 기존 Git diff 전체를 이번 변경량으로 혼동하지 않는다.

## 3. 챗봇 원인과 최종 동작

기존 계산은 INTRO 프리뷰의 상단까지 말풍선을 계속 올렸고 다른 섹션의 사진을 검사하지 않았다. 이번에는 기본 위치 → 마스코트 근처의 정해진 후보만 검사 → 모두 충돌하면 해당 3초 회차를 생략한다.

- desktop 후보 right/bottom(px): (72,72), (0,104), (-8,104), (104,24), (0,128).
- 900px 이하 후보: (0,64), (64,16), (0,88), (64,64).
- 뷰포트 여백 8px, 콘텐츠 주변 여유와 등장 translateY8px을 포함해 검사한다. 자동 안내 버튼/X도 안전한 회차에만 포커스 가능하다.
- 사진·영상·canvas·목업 묶음·본문 실제 텍스트 줄·링크·버튼을 보호한다. 한 회차에서 위치를 정한 후에는 위치를 계속 옮기지 않는다. 충돌하면 즉시 숨고 **그 회차가 끝날 때까지 다시 나타나지 않는다**. 다음 정규 타이머는 유지한다.
- 기존 마스코트 크기·부유·CONTACT 시 위치, 수동 패널과 답변은 유지한다. 모바일 런처 자체는 기존처럼 본문·조작 영역 충돌 시 숨고 220ms 안전 상태 후 재등장한다. 사진만 있는 배경과 런처의 일부 겹침은 기존 동작이며, 자동 말풍선의 사진 충돌 검사와 구분한다.
- DOM 대상은 최초/실제 자식 변경 시 캐시하고 IntersectionObserver로 주변 대상을 추린다. scroll은 passive 1개, rAF 중복 예약 방지, resize/transitionend/media change와 ResizeObserver를 사용한다. 매 프레임 전체 DOM을 다시 검색하지 않는다.
- effect 교체 시 이벤트, rAF, 220ms timeout, Intersection/Mutation/ResizeObserver를 모두 해제한다. 최초/숨김/interval 타이머도 cleanup을 유지한다.

### INTRO 위치 전후 실측

좌표는 뷰포트 왼쪽 위 기준 CSS px. 거리는 말풍선과 런처 사각형 가장자리의 최소 거리다. 실제 마스코트 그림에는 투명 여백·부유가 있다. 수정 전 `probe`의 launcher 필드는 첫 안내 버튼을 잘못 선택했으므로, 인플로우 런처와 동일한 root(88×88/52×52) 사각형으로 수정 전 거리를 재계산한 `before-distances.json`을 사용했다. 원본 JSON은 보존했다.

| 해상도 | 이전 말풍선 x,y | 이전 거리 | 최종 INTRO | 최종 거리 |
|---|---|---|---|---|
| 1920×1080 | 1519.66, 777.92 | 139.08px | 1599.66, 901.00 | 16.00px |
| 1440×900 | 1047.19, 635.08 | 109.45px | 안전 위치 없음 → 해당 회차 생략 | 표시 안 함 |
| 1024×768 | 631.66, 531.24 | 81.76px | 안전 위치 없음 → 해당 회차 생략 | 표시 안 함 |
| 768×1024 | 461.00, 766.19 | 129.81px | 안전 위치 없음 → 해당 회차 생략 | 표시 안 함 |
| 390×844 | 83.00, 609.39 | 106.61px | 안전 위치 없음 → 해당 회차 생략 | 표시 안 함 |

일반 위치 검사는 5개 뷰포트 × 16지점, 총 80회다. 표시된 31회에서 겹침 0, 안전하지 않은 49회는 생략했다. 좁은 화면에서 안내를 표시하기 위해 콘텐츠 위로 강제로 옮기지 않았다. 추가로 UI DESIGN/COLLABORATION 사진을 기본 말풍선 자리 바로 아래로 배치한 **10회 모두 생략**했다. desktop 3개 해상도에서는 표시 중인 회차에 사진을 접근시킨 뒤 돌아와도 숨김이 유지됨을 검사했다. 768px에서도 일반 위치 검사에서 회차 잠금을 확인했다.

### 타이머와 수동 기능

| 실제 시간 검증 | 결과 |
|---|---|
| 최초 timeout 생성 → 실행 | 5056.00ms (설정 5000ms) |
| 다음 회차 간격 | 20006.70ms / 20000.40ms (설정 20000ms) |
| 회차별 표시 상태 지속 | 3003.10ms / 3010.00ms / 3009.60ms (설정 3000ms) |
| 문구 | 프로젝트 → 역할 → 기술, 기존 3개 순환 |
| 수동 패널 | 열기·추천 질문/답변 2개 추가·닫기·ESC 통과. 보이는 런처로 focus 복귀 |
| X / sessionStorage | 같은 탭 reload 후 자동 안내 계속 닫힘. 수동 패널은 사용 가능 |

위 시간 검사는 실제 벽시계로 수행했다. 위치 80회와 사진 충돌 10회는 대기 시간을 줄이기 위해 QA에서 원래 예약된 callback을 실행한 별도 검사다. 제품의 타이머 숫자나 문구는 바꾸지 않았다. 모바일에서 런처가 본문 충돌로 숨겨진 상태로 패널을 닫으면 그 숨겨진 버튼에는 포커스가 가지 않는다. 이 기존 동작을 포커스 복귀 성공으로 부풀리지 않았다.

## 4. 사진 로딩과 레이아웃 이동

단순 측정 시점 차이인지 확인하기 위해 **현재 코드에서 해당 6개 img의 크기 속성만 브라우저 DOM에서 제거**, 사진 응답을 지연시켰다가 해제했다. 현재 원본/레이아웃/스크롤 조건에서 이전 문제를 다시 재현했다. 제품 파일을 되돌리지 않았다.

| 1440×900 UI DESIGN | 크기 속성 없음(재현) | 원본 크기 속성 있음 |
|---|---|---|
| 사진 decode 전 항목 높이 | 214.84375px | 581.859375px |
| decode 후 항목 높이 | 581.859375px | 581.859375px |
| 높이 변화 | 367.015625px | 0px |
| 지연 응답 해제 전후 CLS 증가 | 0.08776102828220649 | 0 |
| 사진 한 장 최종 표시 크기 | 275.265625×367.015625px | 동일 |

스크롤을 먼저 고정한 뒤 응답을 해제했으며, 이동 항목의 y도 같고 사진의 높이가 0→367px로 증가해 실제 layout shift로 확인했다. after 측정은 decode 전부터 같은 공간이 존재하고 이동이 없다.

| 사진 | 추가한 width×height |
|---|---|
| contribution/exhibition-work-01.jpg.jpg / 02.jpg.jpg | 각 4284×5712 |
| teamwork/team-work-process.jpg.jpg | 4000×3000 |
| teamwork/team-review-01.jpg.jpg / team-meeting-02.jpg.jpg | 각 4284×5712 |
| teamwork/team-final-presentation-02.jpg.jpg | 1400×1050 |

경로 접두사는 `public/images/hyundai/`. CSS width:100% / height:auto / object-fit:contain, lazy / async decoding, 원본 파일은 그대로다. 5개 해상도에서 완전히 로드된 네 기여 항목의 제목·본문·사진 좌표/크기/순서와 보호 섹션의 높이/padding/문구 및 ScrollTrigger 시작·종료·duration이 수정 전과 같았다.

## 5. 시각·반응형·인터랙션 검수

Chrome 실제 렌더링 + CDP 수치 + 뷰포트 캡처로 검사했다. 뷰포트 CSS px, DPR1, desktop UA이며 실물 모바일/터치 기기 검사와 구분한다.

| 해상도 | 자동 말풍선 16지점 표시/생략 | 사진 충돌 2회 | GPU / AI 4편 / ABOUT 왕복 | 넘침·깨진 이미지·검사 본문 잘림 |
|---|---|---|---|---|
| 1920×1080 | 14 / 2 | 두 회차 생략 | 통과 | 0 / 0 / 0 |
| 1440×900 | 8 / 8 | 두 회차 생략 | 통과 | 0 / 0 / 0 |
| 1024×768 | 8 / 8 | 두 회차 생략 | 통과 | 0 / 0 / 0 |
| 768×1024 | 1 / 15 | 두 회차 생략 | 통과 | 0 / 0 / 0 |
| 390×844 | 0 / 16 | 두 회차 생략 | 통과 | 0 / 0 / 0 |

- INTRO: 1920/390px에서 실제 2.5초 자동 프리뷰 세 종류 순환·이미지 로드 확인. 5개 화면의 타이틀/프리뷰/마스코트 캡처를 확인했다.
- WORK INTRO: 기존 40–64px 설명 이동과 타임라인 유지. 보호 치수·문구 전후 동일. 명백한 잘림/겹침이 없어 수정 안 함.
- WORK 메뉴: 4개 desktop/tablet 뷰포트에서 hover와 키보드 focus 확인. 기본은 어두운 글자(#191919)/밝은 메뉴, hover는 밝은 글자(#f4f4f0)/어두운 배경(#191919). 대비 오류 재현 안 됨. 메뉴 CSS·구조·링크 수정 안 함.
- PROFILE: 모든 뷰포트에서 WebGL ready, contextLost=false. 701px 이상은 curl 이벤트/INTRO→PROFILE→WORK 정·역방향 확인, 390px은 기존 세로 흐름 유지. 셰이더·이미지·페이지 말림 코드 변경 없음.
- HYUNDAI: 진입 카드·소개·SELECTED SOLUTIONS·PROCESS 캡처 및 보호 치수 유지. 1440px의 INTRO/WORK 왕복과 HYUNDAI 시작점도 기존대로다. 목업/도로/차량/영상 타임라인 수정 없음.
- MY CONTRIBUTION: 텍스트 전용 1·3, 사진 포함 2·4 유지. 라벨/제목/본문/사진 시작축 유지. desktop 좌우 교차, 좁은 화면 세로 흐름 유지. 1440/390px에서 네 항목 등장·중간·완료·역방향 복원·퇴장 및 느린/빠른 wheel 양방향 재검증 통과. 미변경 구간은 기존 5개 해상도 motion 기록도 재사용했다.
- VIVIENNE/COS: 최신 문구·타입·정렬·CTA·목업·자산은 소스 해시와 보호 치수로 보존 확인. 1440px 가로 전환 정·역방향 추가 확인. 다른 desktop 크기의 미변경 가로 전환은 기존 final-five motion 기록 재사용.
- AI VIDEO: 5개 뷰포트에서 네 영상 각각 currentTime 증가·paused=false·video error 없음 확인. muted/playsInline/controls/preload=metadata 및 viewport 진입 재생·이탈 정지 코드를 유지한다.
- CLONE: 1440px 실제 wheel로 KYUNGDONG → 2장 교차 → LOTTE WORLD → 2장 교차 → MUSIGN → 전부 퇴장, 역순도 동일하게 복원. 마지막 카드 뒤 SKILL이 화면에 나타남. 390px 정적 세 카드 모두 opacity1. 기존 `03 PROJECTS`, 큰 제목과 `through practice` 삭제 상태 보존. 1920/1024px 기존 왕복 검증은 소스·트리거 동일성 확인 후 재사용.
- SKILL: 제목·설명·6그룹과 정적 흐름 유지. 삭제한 보조 라벨/회전 로고 복원 없음.
- ABOUT: 5개 뷰포트에서 0→1→2→3→4→3→2→1→0 상태 확인. 배경 먼저/콘텐츠 다음 등장, 필름스트립, 원본 소스는 변경 없음. 390px은 기존 수동 카드 구성을 검사했다.
- CONTACT: href 유지 및 말풍선/런처 충돌 정책 확인. 외부 메일 발송·외부 사이트 기능 검사는 하지 않았다.

### 스크롤 비용과 cleanup

| 화면 | 같은 이벤트 핸들러 집합: 6회 열기/닫기 | 검사 수 / DOM 전체 재수집 | 충돌 검사 평균 / p95 / 최대 ms | rAF 간격 p95 / 최대 ms |
|---|---|---|---|---|
| 1440px | 2 → 2 → 2 → 2 → 2 → 2 | 371 / 7 | 0.09 / 0.50 / 3.40 | 10.40 / 99.90 |
| 390px | 2 → 2 → 2 → 2 → 2 → 2 | 148 / 8 | 0.30 / 0.80 / 1.90 | 10.40 / 60.10 |

핸들러 집합은 QA가 추적한 고유 callback 수이며 이벤트 종류 총개수와 다르다. 빠른 이동·wheel·역방향에서 누적 없음. 이 rAF 간격은 로컬 개발 브라우저의 점프 이동을 포함한 표본이다. 최대 약100ms 프레임이 있어 모든 프레임 60fps라고 주장하지 않는다. 변경 전 동일 frame 표본은 없으므로 FPS 개선율도 산출하지 않는다.

## 6. 폴더·Git·검수 자료 감사

루트 구조: .git / .review / about-photo-review / dist / docs / node_modules / public / src. public은 images/videos, src는 components/data/pages/styles/assets를 사용한다.

| 폴더 | 파일 수 | 총 bytes | 설명 |
|---|---|---|---|
| docs | 17 | 361,012 | 보고서 생성 직전 17개. 이 보고서까지 최종 18개 |
| dist | 245 | 307,508,728 | Git 추적 없음, ignore; public 원본도 복사되는 빌드 결과 |
| src | 62 | 32,319,715 | 감사 스냅샷 |
| public/images | 214 | 173,727,535 | 감사 스냅샷 |
| public/videos/ai-contents | 4 | 84,065,403 | 감사 스냅샷 |
| node_modules | 5,324 | 94,805,156 | Git 추적 없음, ignore; 설치·업데이트·제거 안 함 |
| .review | 16,267 | 5,014,988,980 | 측정 시점 스냅샷. 브라우저 캐시·추가 캡처로 변동 |
| about-photo-preview | 0 | 0 | 해당 이름의 폴더 없음 |
| about-photo-review | 7 | 7,895,920 | 실제로 존재하는 검수 이미지 5개+매핑 문서 2개 |
| public/ai-contents | 0 | 0 | 해당 경로 없음. 실제 영상은 public/videos/ai-contents |
| public/videos | 10 | 117,095,079 | 감사 스냅샷 |

.review는 이전 4.683GB에서 이번 측정 시 **5.01GB**가 되었다. 기존 자료를 삭제하지 않았고, 재실행한 전용 Chrome의 캐시·새 캡처가 추가됐다. 이 값은 정적 제품 전송량과 다르다. .review를 제외한 과거 검수 자료(이번 작업 폴더 제외)는 14,651개 / 4,467,157,060 bytes다.

| .review 분류 | 파일 수 | bytes | 처리 |
|---|---|---|---|
| 화면 캡처·비교 이미지 | 2,038 | 553,121,583 | 보존; 정리 후보만 분류 |
| 기타 환경·로그 | 249 | 86,710,732 | 보존; 정리 후보만 분류 |
| 검수 Chrome 프로필·캐시 | 13,285 | 4,140,111,992 | 과거 프로필·캐시 정리 승인 후보. 이번 검수 원본도 보존 |
| 측정 JSON·메타데이터 | 158 | 13,315,279 | 보존; 정리 후보만 분류 |
| 스크립트·비교 소스·메모 | 535 | 4,150,419 | 보존; 정리 후보만 분류 |
| 녹화 사본 | 2 | 217,578,975 | 보존; 정리 후보만 분류 |

앱 import·JSX·CSS·Vite 설정에 .review/about-photo-review 참조가 없고 dist에도 QA 자료가 복사되지 않는다. `git ls-files dist node_modules .review about-photo-review` 결과는 비어 있고 `git check-ignore`는 각 경로를 ignore로 확인했다. .vercelignore에는 .review/about-photo-review 명시가 없으므로 향후 업로드 방식까지 검토할 후보로 기록한다. 실제 배포/업로드는 수행하지 않았고 현재 업로드 포함 여부를 단정하지 않는다.

### 전체 용량 상위 20개

검수 Chrome 캐시와 Git 객체도 포함한 bytes 내림차순 스냅샷이다. 같은 크기 경계의 파일은 동순위이며 Git pack은 정리 대상이 아니다.

| 순위 | 경로 | bytes |
|---|---|---|
| 1 | .git/objects/pack/pack-d3007b4cda44d9bf133f7430f1c325477f60ad4b.pack | 255,203,263 |
| 2 | .review/recording-balance-20261104/recording.mp4 | 151,503,438 |
| 3 | .review/final-optimization-20261104/recording.mp4 | 66,075,537 |
| 4 | .review/about-profile-20261028/Default/Cache/Cache_Data/f_000021 | 39,880,613 |
| 5 | .review/about-tools/chrome-profile/Default/Cache/Cache_Data/f_000024 | 39,880,613 |
| 6 | dist/images/hyundai/selected-works/hyundai-main-desktop-figma.png | 39,880,613 |
| 7 | public/images/hyundai/selected-works/hyundai-main-desktop-figma.png | 39,880,613 |
| 8 | .review/about-profile-20261028/optimization_guide_model_store/43/0CB888B74FE8F85E/12C4C915F01E95E6/model.tflite | 36,778,224 |
| 9 | .review/about-tools/chrome-profile/optimization_guide_model_store/43/0CB888B74FE8F85E/3316089E35496D8B/model.tflite | 36,778,224 |
| 10 | .review/editorial-20261104/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/3DC5D105055295B4/model.tflite | 36,778,224 |
| 11 | .review/feedback-20261102/browser/optimization_guide_model_store/43/0CB888B74FE8F85E/CD01A95EAE3508E0/model.tflite | 36,778,224 |
| 12 | .review/feedback-20261103/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/40719D98981CF005/model.tflite | 36,778,224 |
| 13 | .review/feedback-final-20261103/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/2E28CCEF85FFBD51/model.tflite | 36,778,224 |
| 14 | .review/final-five-20261104/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/250E3E459CB1903A/model.tflite | 36,778,224 |
| 15 | .review/number-mobile-20261103/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/883110EC2ECC0FC4/model.tflite | 36,778,224 |
| 16 | .review/number-mobile-resume-20261104/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/8815ECD07EAA7F9A/model.tflite | 36,778,224 |
| 17 | .review/recording-balance-20261104/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/E04462FC0ADE3AC9/model.tflite | 36,778,224 |
| 18 | .review/text-number-20261103/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/63D1FAF51FBA8DF7/model.tflite | 36,778,224 |
| 19 | .review/final-optimization-20261104/.tmp-browser/optimization_guide_model_store/43/0CB888B74FE8F85E/8949694818A0243E/model.tflite | 36,778,224 |
| 20 | dist/videos/ai-contents/cat-ai-shortform.mp4 | 31,252,231 |

## 7. 문서 분류

[docs 안내](../README.md)에 기존 15개 문서를 모두 분류했다. A: 최신 명세 + 이번 보고서/감사 CSV, B: 타이포그래피·HYUNDAI 자산·레퍼런스 근거 3개, C: 기존 검수 보고서 9개, D: 초기 CONTENT_INVENTORY/SITE_ARCHITECTURE 2개다. D는 오래된 다른 작업 경로/상세 페이지 제안 등 최신 구현과 차이가 있어 보관 후보로 구분했다. C의 과거 말풍선/문구 설명은 최신 명세보다 낮은 우선순위다. 기존 문서 링크 대상과 파일명은 유지했다.

## 8. 전수 자산·의존성 감사

전체 **251개 / 322,822,755 bytes**: ico1/svg1/jpg69/webp81/png88/mp4 10/jpeg1. 로컬 폰트 자산 없음. 전체 경로·형식·bytes·이미지/영상 해상도·영상 코덱/평균 컨테이너 bitrate·실제 참조 파일/행·판정·SHA256은 [CSV](ASSET_AUDIT_2026-11-04.csv)에 있다.

정적 문자열/CSS url/JSX import/데이터/도달 그래프를 확인하고, 현재 미디어 경로가 배열의 명시 경로임도 확인했다. import.meta.glob/템플릿 기반 미디어 경로 후보는 발견하지 못했다. 정적 검색에서 찾지 못했다는 이유로 삭제 확정하지 않는다. DOM은 아직 로드되지 않은 lazy 이미지도 포함하며 요청 기록 역시 매 순간 화면 노출을 뜻하지 않는다.

| 최종 분류 | 개수 | bytes |
|---|---|---|
| 실행 그래프 참조 있음·화면 사용 미확정 | 31 | 21,466,778 |
| 보존 원본 | 39 | 14,213,508 |
| 브라우저 DOM 또는 요청 확인 | 117 | 157,074,163 |
| 사용 여부 미확정 | 41 | 110,950,111 |
| 검수·이전 버전 후보 | 19 | 12,264,851 |
| 미사용 가능성 높음 | 4 | 6,853,344 |

도달 가능한 소스의 정적 참조는 148개, 미확정 99개, 도달 그래프 밖 파일에서만 참조 4개다. CSV의 브라우저 증거 분류와 함께 읽는다. public/src 251개를 SHA256으로 비교한 결과 **완전히 같은 중복 파일 그룹은 0개**다. 비슷한 이름·화면이라는 이유로 중복 삭제하지 않는다.

| 미사용/보존 후보 | 근거·현재 처리 |
|---|---|
| public/images/about/originals/ JPG 39개, 14,213,508 bytes | ABOUT web WebP39개(4,920,846 bytes)와 분리된 원본. 명시적 보존, 삭제 후보 제외 |
| src/pages/VivienneCaseStudy.jsx + expertise PNG3개/hero-poster.jpeg | main.jsx 도달 그래프 밖. 자산 4개 합계6,853,344 bytes. 미사용 가능성 높으나 다른 용도 확인/승인 필요 |
| public/images/personal-projects/vivienne-westwood-sections/ WebP13개 | 현재 latest PNG 타일 경로와 분리된 이전 버전 후보. 자동 삭제 안 함 |
| public/images/clone-coding/*-local.png 3개 | 현재 live 카드 경로와 분리된 검수본 후보 |
| public/videos/hyundai/selected-works/experience-finder-previous.mp4 | 현재 experience-finder.mp4 경로와 분리. 이전 영상 보관 후보 |
| public/images/hyundai/selected-works/ 대형 PNG와 기타 미확정 파일 | 최대39,880,613 bytes인 원본/이전 산출물 포함. 일부 WebP 대체 경로가 있어도 출처·사용 맥락 확인 전 미사용 확정 안 함 |
| public/videos/hyundai/selected-works/vehicle-exhibition.mp4 | 현재 circle 영상과 구분된 미확정 영상. 원본 보존 |
| simple-icons@16.35.0 | 현 소스 import 없음. 설치 디스크16,107,937 bytes. 제거 승인 후보이며 초기 번들 절감량으로 계산하지 않음 |

React19.2.8/ReactDOM19.2.8, GSAP3.15.0, Lenis1.3.27, Three0.186.1, Vite8.3.0을 확인했다. npm ls에서 React는 deduped이고 조사한 주요 라이브러리의 중복 설치는 없다. package.json/lockfile/설치 환경 변경 없음. 기존 미사용 파일 후보는 실행 그래프 밖 상세 컴포넌트이며, 이번에 안전하다고 단정해 삭제한 import/코드는 없다.

## 9. 영상·폰트·이미지 로딩

| 영상 경로 (public/videos/) | bytes | 인코딩 해상도 | 초 / 코덱 | 평균 컨테이너 kbps |
|---|---|---|---|---|
| ai-contents/cat-ai-shortform.mp4 | 31,252,231 | 1080×1920 | 25.40 / avc1+mp4a | 9842.06 |
| ai-contents/selex-profit-commercial.mp4 | 20,670,937 | 1906×1080 | 17.11 / avc1+mp4a | 9662.70 |
| ai-contents/vivienne-westwood-ai-video.mp4 | 12,335,105 | 1920×1080 | 10.05 / avc1+mp4a | 9814.11 |
| ai-contents/vivienne-westwood-video-02.mp4 | 19,807,130 | 1080×1920 | 18.02 / avc1+mp4a | 8793.89 |
| hyundai/selected-works/exhibition-desktop.mp4 | 7,545,190 | 1920×920 | 19.50 / avc1 | 3095.46 |
| hyundai/selected-works/exhibition-mobile.mp4 | 4,565,071 | 430×794 | 13.27 / avc1 | 2752.74 |
| hyundai/selected-works/experience-finder-previous.mp4 | 4,689,448 | 1920×920 | 18.77 / avc1 | 1999.02 |
| hyundai/selected-works/experience-finder.mp4 | 4,006,321 | 1920×920 | 15.67 / avc1 | 2045.74 |
| hyundai/selected-works/vehicle-exhibition-circle.mp4 | 2,855,598 | 1280×720 | 4.30 / avc1 | 5312.74 |
| hyundai/selected-works/vehicle-exhibition.mp4 | 9,368,048 | 1920×920 | 14.50 / avc1 | 5168.58 |

bitrate는 컨테이너 총 bytes×8/길이이며 비디오 트랙만의 bitrate가 아니다. circle 영상은 tkhd 표시 폭1280.35px, 인코딩 픽셀은1280×720으로 구분했다. AI4편은 합계84,065,403 bytes. metadata preload, muted/playsInline, viewport 재생·이탈 정지와 controls를 유지한다. preload=metadata는 브라우저의 힌트여서 모든 환경에서 정확한 전송량을 보장하지 않는다. 로컬 첫 화면 8초의 Media 요청 합계는82,435 bytes였으며 전체 영상117MB가 최초에 전송된 것은 아니다. 기존 reduced-motion에서 AI 자동재생을 제외하는 별도 분기는 없고 이번에 정책을 바꾸지 않았다.

폰트는 Pretendard Variable(동적 subset) + Inter/Lora/Manrope/DM Sans 외부 로딩이다. 실제 받은 두 CSS 모두 font-display:swap을 확인했다. Pretendard 92개/Google72개의 font-face는 언어·unicode-range·weight별 선언이며 이것을 중복으로 보고 제거하지 않았다. 첫 화면의 실제 Font 요청은21개 /608,898 bytes다. 서체·weight·import 변경 없음. 외부 서비스/네트워크에 따른 로딩 변화는 남아 있다.

기존 HYUNDAI WebP 타일15개(2,582,552 bytes), ABOUT WebP39개, 개인 목업 lazy/근접 decode 정책과 첫 화면 이미지 우선순위를 유지한다. 원본 압축·포맷·참조 경로 교체는 하지 않았다. 이번에 직접 적용한 이미지 최적화는 기여 사진의 intrinsic size 예약뿐이다.

## 10. 번들·초기 성능 측정

| 산출물 | 이전 raw bytes | 최종 raw bytes | 이전/최종 gzip bytes |
|---|---|---|---|
| CSS | 118,577 | 118,724 | 21,673 / 21,697 |
| JS | 970,617 | 971,880 | 274,220 / 274,772 |

gzip 표는 Node zlib의 동일 옵션으로 전후 파일을 압축한 비교값이다. Vite 로그의 자체 gzip 표기와 혼합하지 않는다. 충돌 로직/크기 속성 추가로 JS raw+1,263 bytes, CSS+147 bytes다. 번들 용량 감소를 달성했다고 보고하지 않는다. 500kB 초과 JS 청크 경고는 유지했으며 경고 기준을 올리지 않았다.

### 개발 모드 전후 기록

1440×900, cache disabled, CPU/network 무제한, local Vite dev, load+5초. 수정 전은 중단 전 측정, 수정 후는 재개 후 측정이라 서버/Chrome 재시작·외부 폰트 응답 차이가 있으며 통계적 개선 비교가 아니다.

| 측정 | 이전 | 이후 |
|---|---|---|
| 요청 수 / 합계 bytes | 131 / 37,462,907 | 131 / 37,448,518 |
| LCP ms | 1700 | 1756 |
| CLS (recent input 제외) | 0.00044156591187379234 | 0.00044156591187379234 |
| long task 수 / 합계ms | 7 / 951 | 7 / 957 |
| TaskDuration 초 | 1.583319 | 1.841306 |
| ScriptDuration 초 | 0.454968 | 0.477003 |

일반 초기 로딩 LCP/메인 스레드가 빨라졌다는 근거는 없다. 확인된 성능 개선은 **동일 지연 응답 조건에서 기여 사진 로딩에 의한 높이 이동/CLS 증가가0이 된 것**이다. dev의 모듈별 JS 전송량을 최종 번들 크기와 비교해 개선율을 만들지 않는다.

### 최종 프로덕션 로컬 기준값

같은 Chrome,1440×900,DPR1,cache disabled,CPU/network 무제한, Vite preview 첫8초. 폰트 감사용 추가 fetch는 아래 요청 합계에서 제외했다. 배포 환경 Core Web Vitals나 실사용자 통계가 아니다.

| 항목 | 측정값 |
|---|---|
| 요청 / 총 encodedDataLength bytes | 71 / 26,581,394 |
| Script 전송 bytes | 275,351 |
| Image 전송 bytes | 25,580,404 |
| Stylesheet 전송 bytes | 33,308 |
| Font / Media 전송 bytes | 608,898 / 82,435 |
| LCP / CLS | 972ms / 0.00044156591187379234 |
| long task / 총 duration | 5 / 597ms |
| TaskDuration / ScriptDuration | 1.491536s / 0.333618s |

**초기 이미지 약25.58MB와 단일 대형 JS 청크는 잔여 성능 부담**이다. 로컬 LCP가 짧아도 느린 네트워크/실물 모바일 성능 해결로 간주하지 않는다. 원본 품질·보호 타임라인에 영향을 줄 수 있어 이번에 대량 변환/코드 분할을 강행하지 않았다.

## 11. 추가 승인 후 진행할 후보 (미실행)

| 후보 | 예상 효과 | 위험·필요 검증 |
|---|---|---|
| 과거 .review Chrome 프로필·캐시를 보관/삭제 | 스냅샷상 캐시 계열 약4.14GB 디스크 여유 후보 | 최근 전후 캡처/JSON/스크립트 선별 보존, 사용자 원본 구분. 이번 삭제 없음 |
| 과거 문서 archive 이동·초기 설계 문서 갱신 | 현재 기준 탐색 용이 | 모든 상대 링크·참조 수정과 히스토리 보존. 이번 이동/이름 변경 없음 |
| 미사용 후보 19+4개 및 기타 미확정 자산 정리 | 설치/빌드 산출물 축소 가능 | 동적 경로·타 프로젝트/원본 용도 확인 후 결정. 런타임 속도 효과와 디스크 효과 구분 |
| 보존 원본을 public 밖으로 분리 | dist에 복사되는 불필요 원본 감소 가능 | 폴더 구조/경로·문서·배포 방식 변경 승인 필요. 원본 삭제 금지 |
| 대형 첫 화면/작업 이미지 WebP·AVIF·적정해상도 변형 | 초기 이미지25.58MB 절감 목표 | 원본 유지, 확대 선명도·alpha·목업 경계·GPU texture/타일 측정과 5뷰포트 비교 |
| AI 영상/기타 MP4 재인코딩 | AI 합계84.07MB 등의 스트리밍 부담 감소 가능 | 사용자 승인, 원본 보존, 색/음성/글자/controls/autoplay 전후 검증 |
| PROFILE Three.js/비초기 섹션 코드 분할 | 최초 JS 청크 감소 가능 | mount/이미지 준비·pin 높이·refresh·역방향 복귀·CLS/GPU 재검증 필요 |
| simple-icons 제거·패키지 업데이트 | 미참조 패키지의 설치 용량 축소 | lockfile과 기존환경 변경 승인. 지금 번들에 없는 모듈의 네트워크 절감 약속 금지 |
| GSAP 구조 변경/숨김 구간 계산 축소 | 병목 입증 시만 검토 | pin/scrub/start/end/easing 및 ABOUT 배경 순서 보호. 이번 변경 안 함 |
| .vercelignore에 검수 폴더 명시 | 미래 업로드 경계 명확화 가능 | 실제 업로드 방식 확인. 이번 배포·업로드 없음 |

## 12. 빌드·Git·한계와 검증 자료

- `npm.cmd run build`: **exit0**, 72 modules, dist245개. 기존 단일 JS >500kB 경고만 유지. 새 스크립트/의존성/lint 추가 없음.
- `git diff --check`: **exit0**. 기존 LF→CRLF 안내는 whitespace 오류가 아니다. 기존 미커밋 파일 전체 보존, HEAD/branch 동일. Commit/Push/Vercel 배포/reset/clean 없음.
- 제품 코드와 검수 코드는 분리되어 있다. 모든 임시 도구/측정·녹화 사본은 ignored .review에 있으며 제품 import 없음. 이번 전용 서비스만 종료하고 사용자 브라우저/5173 서버는 건드리지 않는다.
- 남은 검증 한계: 실물 iOS/Android/터치·Safari/Firefox·저사양 GPU·느린 회선·공개 배포/실사용자 INP는 미검증. 축소 동작 설정의 새 재설계·모든 폰트 다운로드 상태별 조합·외부 사이트/메일 발송도 검증 범위 밖이다.
- 기능상 새 실패는 발견하지 않았다. 좁은 화면의 자동 회차 생략과 숨겨진 모바일 런처의 포커스 제한은 위에 명시했다. 초기 이미지 용량·대형 JS·외부 폰트 의존·최대 프레임 지연은 잔여 부담이며 개선 완료로 표시하지 않는다.

### 이번 검증 파일 (.review/final-optimization-20261104/)

| 파일/묶음 | 증거 |
|---|---|
| start-status/stat/check.txt, start-hashes.json, before-source/ | 작업 시작 Git/원본 소스·해시 |
| audit.mjs/json, assets.csv, before.json, before-*.png, perf-before.json | 중단 전 완료 기록 그대로 보존 |
| cdp.mjs, collision-effect.txt | 기존 브라우저 도구와 반영 초안. 초안을 재적용하지 않음 |
| audit-final.mjs/json, assets-final.csv, exact-duplicates.json, asset-report.mjs, asset-summary.json | 확장 감사·영상 인코딩 해상도·해시·최종 분류 |
| review-summary.mjs/json, final-folders.json, top20-final.json | 검수 자료 분류/폴더 및 큰 파일 |
| probe.mjs, after.json, after-*.png, before-distances.json | 5뷰포트 치수/보호 트리거 비교와 수정 전 거리 재계산 |
| chat-review.mjs, chat-geometry.json, chat-timing.json, hint-*.png, focus-*.png | 80지점/실제 5·20·3 타이머/수동·focus·dismiss |
| chat-photos.mjs/json, photo-conflict-*.png | 사진을 기본 안내 자리에 둔 충돌·회차 잠금 |
| perf.mjs, perf-reproduced.json, perf-after.json | 지연 응답과 intrinsic size 전후 이동/CLS |
| site-review.mjs/json, site-*.png, gpu-*.png | 5해상도 실제 GPU/섹션/AI/ABOUT/넘침 |
| contribution-motion.mjs/json, motion-*-item-*-exit.png | 1440/390 네 기여 항목 정역·slow/fast wheel |
| motion.mjs/json, motion-1440-*.png | 1440 CLONE/개인 프로젝트/INTRO 왕복 |
| stability.mjs/json, mobile-clone.png | 핸들러 누적·DOM 재수집·빠른 스크롤 비용·모바일 세 카드 |
| production-perf.mjs/json, bundle-before/after.json | 최종 프로덕션/번들/폰트 실측 |
| intro-previews.mjs/json, intro-preview-*.png | 1920/390 자동 프리뷰3개 |
| recording.mp4, video-frames.mjs, video-extra.mjs, video-*.jpg, video-*-metadata.json | 최신 녹화 46.4441초/1920×1040의 관찰 프레임 |
| preservation.json, final-status.txt, final-stat.txt, final-check.txt | 변경 보존·최종 Git 점검 |
| write-report.mjs | 측정 JSON에서 표를 생성한 보고서 작성 도구. 제품 코드 아님 |

재사용한 이전 검증은 `.review/recording-balance-20261104/contribution-motion.json`의 5뷰포트 및 `.review/final-five-20261104/motion.json`의 1920/1440/1024 왕복 등이다. 이번 변경 영향 영역인 말풍선·사진 공간·아래 섹션 배치·해당 타임라인 좌표는 새로 검증했다. 추가 디자인 변경 없이 이 범위에서 마무리한다.
