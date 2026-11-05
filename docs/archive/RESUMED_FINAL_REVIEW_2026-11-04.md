# 사용량 한도 중단 작업 재개·최종 검수

검수일: 2026-11-04, Asia/Seoul. 경로: `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`, 브랜치 `master`.

직전 작업을 재구현하지 않고 현재 소스와 `.review/number-mobile-20261103/` 기록을 대조했다. 완료된 검증을 재사용하고, 새로 요구된 모바일 표시 안정성과 결과가 없던 말풍선 검증만 보완했다. 이 문서는 이전 보고서를 덮어쓰지 않는 재개 결과다.

## 1. 재개 시 실제 상태와 완료 여부

최초 `git status --short`는 32개 경로(추적 경로 27개, untracked 문서 5개)를 표시했다. `git diff --stat`는 누적 변경 26개 파일을 표시했다. 이는 여러 차례의 기존 작업 전체이며 직전 UI에서 본 “16개”와 같은 범위로 단정하지 않았다. 시작 상태·통계는 새 QA 폴더의 `start-status.txt`, `start-stat.txt`에 원문 보관했다. 최초 `git diff --check`도 통과했다.

| 항목 | 재개 시 판정 | 근거 및 최종 처리 |
|---|---|---|
| through practice 삭제 | 완료 | JSX·전용 CSS 제거 확인. 재수정 없음 |
| WORK INTRO 범위 번호 삭제 | 완료 | `01 — 03` span 제거, 기존 오른쪽 라벨·제목·소개 유지 |
| MY CONTRIBUTION 번호 4개 삭제 | 완료 | 항목 번호 span만 제거, 수행 설명·이력 보존 |
| 개인 프로젝트 번호 삭제 | 완료 | 두 곳 모두 PERSONAL WORK 유지, 번호 span 없음 |
| 모바일 본문 가림 방지 | 기본 구현·검증 완료 | 기존 162개 샘플 통과 기록 존재. 빠른 스크롤·깜빡임은 추가 검증 필요 |
| 수정 가능한 캡션 11px | 완료 | 5개 해상도의 전후 측정·배치 비교 파일 존재 |
| 보호 캡션 9px 유지 | 완료 | 보호 JSX·CSS·렌더링 값 보존 |
| CLONE 카드 진입·교차·퇴장·왕복 | 완료 | `motion.json`에 3개 데스크톱 해상도와 SKILL 진입 결과 존재 |
| CLONE 동일 위치 복귀 | 완료 | `clone-restore.json`이 세 해상도 전체 결과와 errors 0을 포함. 중단된 미완료 파일이 아님 |
| INTRO·개인 작업·영상·ABOUT·확대 기능 | 완료 | `extra-runtime.json`에 5개 해상도 성공 결과 존재 |
| 자동 말풍선 충돌·모바일→데스크톱 복원 | 검증 필요 | `hint.mjs`는 있지만 `hint.json`은 없었음. 이번에 실행·완료 |
| 최종 빌드·Git 검사·보고 | 재개 후 확인 필요 | 새로 실행하고 이 문서 작성 |

재개 당시 기존 5173·9344 검증 포트는 응답하지 않았고, 실행 중인 이전 검증을 확인하지 못했다. 다른 node·Chrome 프로세스는 사용자/다른 용도일 수 있어 중지하지 않았다. 필요한 로컬 Vite·QA Chrome만 별도로 시작했다.

## 2. 이번에 이어서 완료한 작업

1. 기존 JSON 결과를 파싱하고 예외·실패 수, 해상도 수, CLONE 복귀 값을 확인했다. 기존 소스 보존 검사도 다시 실행했다.
2. 빠른 휠 정방향·역방향과 텍스트 경계 근처의 작은 왕복 스크롤을 추가로 검사했다.
3. 실제로 확인된 마스코트의 짧은 재등장만 최소 범위로 보완했다.
4. 보완된 모바일 코드에 대해 가림 검사·챗봇 기능을 다시 확인했다. 다른 섹션의 전체 테스트는 재실행하지 않았다.
5. 결과가 없던 자동 말풍선 및 데스크톱 크기 복원 검사를 마쳤다.
6. 최종 빌드·공백 오류·파일 해시·Git 상태 보존을 확인하고 새 보고서를 작성했다.

## 3. 실제 소스 변경 범위

### 한도 도달 이전에 수정되어 있던 소스 9개

| 파일 | 이미 반영된 내용 |
|---|---|
| `src/components/CloneCodingSection.jsx` | through practice 출력 제거 |
| `src/styles/clone-coding.css` | 해당 문구 전용 스타일 제거 |
| `src/components/WorkSection.jsx` | 범위 번호 출력 제거 |
| `src/components/PersonalProjectCaseStudy.jsx` | 개인 프로젝트 번호 제거 |
| `src/styles/personal-projects.css` | 개인 번호용 간격·스타일 정리 |
| `src/pages/HyundaiCaseStudy.jsx` | 기여 항목 번호 span 제거 |
| `src/styles/base.css` | 번호 삭제 후 정렬·간격, 수정 가능한 캡션 11px |
| `src/components/PortfolioAssistant.jsx` | 모바일 콘텐츠 충돌 검사·임시 숨김 |
| `src/styles/portfolio-assistant.css` | 모바일 52px·위치·부유 폭·충돌 상태 |

### 이번 재개에서 보완한 소스 2개

| 파일 | 재개 후 추가 변경 |
|---|---|
| `src/components/PortfolioAssistant.jsx` | 충돌은 즉시 숨김. 비충돌 상태가 220ms 유지된 뒤 다시 검사하여 재등장. 타이머 취소·cleanup 추가 |
| `src/styles/portfolio-assistant.css` | 모바일 재등장만 opacity 120ms 전환. 숨김은 즉시 처리. reduced-motion에서는 전환 제거 |

새 문서는 `docs/RESUMED_FINAL_REVIEW_2026-11-04.md` 하나다. 이번 재개에서 기존 명세·보고서는 수정하지 않았다. 시작 시 저장한 파일 306개 중 위 두 소스를 제외한 304개가 같은 SHA256을 유지한다. 사용자 미커밋 작업·기존 untracked 문서·JOIN 삭제 상태를 보존했다.

## 4. 검증용 파일과 제품 코드 분리

기존 기록은 `.review/number-mobile-20261103/`에 그대로 둔다.

| 파일·그룹 | 용도·재사용 판단 |
|---|---|
| `initial-status.txt`, `initial-hashes.json`, `before-source/` | 직전 수정 전 상태 |
| `before.json`, `after.json`, `before-*.png`, `after-*.png` | 5개 해상도 삭제·배치·보호 영역 비교 |
| `captions.mjs`, `captions.json`, `baseline.html` | 원본 복사본과 현재 캡션·이미지 배치 비교 |
| `motion.mjs`, `motion.json`, `motion-*.png` | 실제 휠 왕복·카드 교차·퇴장·SKILL 전환 |
| `clone-restore.mjs`, `clone-restore.json` | 동일 스크롤 위치의 카드 복귀 |
| `extra-runtime.mjs`, `extra-runtime.json`, `verified-*-cos.png` | INTRO·PROCESS·개인 작업·영상·ABOUT·확대 기능 |
| `mobile.mjs`, `mobile.json`, `sweep-*.png`, `chat-*-open.png` | 보완 전 모바일 162개 위치·챗봇 검사 |
| `audit.mjs`, `cdp.mjs`, `verify-source.mjs`, `hint.mjs` | 브라우저 측정·소스 보존·미실행 말풍선 검사 스크립트 |

이번 추가 기록은 `.review/number-mobile-resume-20261104/`에 분리했다.

| 파일·그룹 | 내용 |
|---|---|
| `start-status.txt`, `start-stat.txt`, `start-hashes.json` | 재개 시작 상태 |
| `PortfolioAssistant.jsx`, `portfolio-assistant.css` | 재개 직전 두 소스의 보관본 |
| `cdp.mjs` | 새 QA 출력 경로를 사용하는 연결 도우미 |
| `stability.mjs`, `before-stability.json`, `after-stability.json` | 빠른 휠·경계 왕복·표시 전환·검사 비용·리스너 기록 |
| `mobile.mjs`, `mobile.json`, `sweep-*.png`, `chat-*-open.png` | 보완 후 모바일 가림·챗봇 재검사 |
| `hint.mjs`, `hint.json`, `hint-*-reading.png` | 자동 말풍선 가림 방지·클릭 열기·데스크톱 복원 |
| `reading-views.mjs`, `reading-views.json`, `reading-*.png` | AI·SKILL·ABOUT·CONTACT 실제 본문 위치 캡처 |
| `finish-check.mjs`, `finish-check.json` | 재사용 결과의 SHA256, 완료 조건, 재개 전후 파일 보존 검사 |

두 QA 경로 모두 Git에서 무시된다. 제품 진입점·소스에서 이 스크립트를 import하지 않으며 빌드 결과에서도 QA 식별자 유입이 없는지 확인했다. 임시 파일을 제품 소스에 섞지 않았고 기존 `.review` 폴더를 삭제하지 않았다.

## 5. 삭제한 문구·번호 최종 확인

- CLONE CODING `through practice`: JSX em·전용 기본/반응형 CSS 제거 상태 유지.
- WORK INTRO `01 — 03`: 번호 span 제거. UX/UI 라벨·selected works 제목·소개와 전환 부모는 유지.
- MY CONTRIBUTION 항목 앞 `01`, `02`, `03`, `04`: 숫자만 제거. UX PLANNING & DEVELOPMENT / UI DESIGN / VEHICLE EXHIBITION DESIGN / COLLABORATION과 설명·사진·이력 유지.
- VIVIENNE `01 / 02`, COS `02 / 02`: 숫자 span만 제거. 두 곳 모두 PERSONAL WORK와 실제 프로젝트 콘텐츠 유지.

기여 데이터의 `item.number`는 React key와 기존 이미지 class 식별에 쓰이므로 유지했다. 내부 식별값과 화면 번호 삭제를 구분한다. 기존 삭제를 반복하거나 새로운 문구를 만들지 않았다.

번호용 flex gap·span 스타일과 through practice 전용 CSS는 이미 제거되어 있다. WORK 라벨 오른쪽 축, 기여 라벨 왼쪽 축, 두 개인 라벨의 위치·높이를 유지한다. CLONE 중앙 묶음 높이는 문구 삭제에 따라 줄었으며 빈 em 행은 없다. 세 카드의 크기·상대 좌표·타임라인은 유지한다.

## 6. 유지한 번호

| 영역 | 유지 |
|---|---|
| INTRO | 자동 프리뷰 01—03 / 02—03 / 03—03 |
| HYUNDAI 진입 카드 | 보호된 01 / 03 · SELECTED WORK |
| HYUNDAI 사례 장 | CHALLENGE부터 PROJECT REFLECTION까지 01–05 |
| CHALLENGE | 실제 문제 목록 01–03 |
| SELECTED SOLUTIONS | 실제 결과물 01–03 |
| Experience Finder | STEP 1–3 |
| PROCESS | PROCESS 01 / 06부터 06 / 06 |
| AI VIDEO | MOVING IMAGE / 04 FILMS, FILM 01 / 04부터 04 / 04 |
| CLONE CODING | 03 PROJECTS · CLONE CODING |
| ABOUT | 현재 카드 01/05–05/05 및 선택 버튼 01–05 |
| 기타 | 연도·존재하는 날짜/이력·연락처·4인 팀·3C 등 사실 정보 |

## 7. 모바일 마스코트 최종 방식·안정성

기존 방식은 유지한다. 900px 이하에서 52px 런처, 오른쪽·하단 최소 12px 및 safe area, 부유 ±4px이다. 본문의 실제 줄·버튼·링크·영상 또는 자동 말풍선과 충돌하는 동안 접힌 런처를 숨기고, 여백에서는 다시 표시한다. 사용자가 대화 패널을 열면 충돌 숨김을 적용하지 않는다. 데스크톱의 88px·위치·±12px 부유는 유지한다.

추가 검사에서 기존 구현은 빠른 왕복 중 50~118ms의 짧은 재등장이 있었다. 경계 부근의 작은 왕복에서는 표시 상태가 11~12회 바뀌었다. 이것은 기존 가림 검사만으로는 완료 판정할 수 없던 실제 문제였다.

최소 보완 후에는 충돌 시 즉시 숨기고, 비충돌 상태가 220ms 이어졌을 때 실제 충돌을 다시 확인한 후 재등장한다. 재등장은 120ms opacity 전환으로 부드럽게 표시한다. 충돌 시에는 fade-out을 기다리지 않아 본문을 계속 덮지 않는다. reduced-motion CSS에서는 전환하지 않는다. timeout·예약 프레임·관찰자·이벤트는 effect cleanup에서 취소한다.

| 검사 | 보완 전 | 보완 후 |
|---|---|---|
| 768px AI·SKILL·ABOUT·CONTACT 빠른 왕복 | 150ms 미만 재등장 합계 9건 | 0건 |
| 390px 동일 4구간 | 150ms 미만 재등장 합계 7건 | 0건 |
| 경계 부근 반복 왕복 | 768px 11회 / 390px 12회 상태 전환 | 두 해상도 모두 반복 전환 0회 |
| 충돌 검사 실행 비용 | 관측 최대 약 3.1ms | 관측 최대 약 2.8ms |

마스코트 구현의 활성 window 리스너는 passive scroll 1개, resize 1개로 확인했다. 이벤트를 한 프레임의 검사로 합치며, 데스크톱에서는 본문 스캔 전에 반환한다. 등록/해제 기록에서 중복 누적이 없었다. 측정 비용은 이 테스트 환경의 관측치이며 모든 장치의 성능을 보증하는 수치는 아니다.

보완된 코드로 768px 77개·390px 85개, 총 162개 스크롤 위치와 실제 휠 왕복을 다시 확인했다. 본문·버튼 가림 0건, 가로 넘침 0건이다. 재등장 지연 때문에 빠르게 지나가는 여백에서는 계속 숨겨질 수 있지만, 안전한 위치에서 멈추면 재등장한다.

챗봇 실제 클릭 열기, 4편 영상 답변, 패널 화면 범위, Escape 닫기와 기본 위치의 런처 포커스 복귀도 통과했다. 자동 말풍선은 본문을 가리는 위치에서 숨고, 안전한 위치에서 표시·클릭 열기가 가능했다. 1024px으로 바꿨을 때 기존 데스크톱 88px 런처로 복원됐다.

## 8. 캡션 위치·최종 크기

| 캡션 | 위치 | 최종 크기 |
|---|---|---:|
| FASHION LANDING PAGE REDESIGN | `PersonalProjectCaseStudy.jsx`, VIVIENNE 목업 아래 | 11px |
| MINIMAL FASHION LANDING PAGE REDESIGN | 같은 파일, COS 목업 아래 | 11px |
| FIGMA / WIREFRAME & UI DESIGN | `HyundaiCaseStudy.jsx`, 검정 소개 보드 아래 | 11px |
| RESPONSIVE MAIN DESIGN | `HyundaiProjectPreview.jsx`, 보호 진입 목업 | 9px |
| INTEREST-BASED EXPERIENCE FINDER | SELECTED SOLUTIONS | 9px |
| RESPONSIVE EXHIBITION DESIGN | SELECTED SOLUTIONS | 9px |
| INTERACTIVE VEHICLE EXHIBITION | SELECTED SOLUTIONS | 9px |

11px 캡션의 Inter 500 / .08em / 행간 1.3 / opacity 1 / 기존 .65 알파 색 / 이미지와 14px 간격 / 왼쪽 기준은 유지한다. COS의 긴 캡션도 390px에서 한 줄이다. 기존 `captions.json`은 세 이미지의 크기·비율이 동일하고 상대 세로 위치 차이가 .05px 미만임을 포함한다. 보호 캡션까지 11px로 바꾸지 않았다.

이번 재개에서는 캡션·목업·소개 문장을 수정하지 않았다. 해당 소스와 이미지 배치는 같으므로 완료된 5개 해상도 검사를 재사용했다.

## 9. CLONE CODING 왕복·복귀 검증

`motion.json`에는 실제 wheel의 정방향·역방향, 각 카드가 보이는 표본, 마지막 SKILL 노출이 있다. `clone-restore.json`에는 .21→.425→.64→.425→.21의 동일 위치 복귀 결과가 모두 저장돼 있다.

| 해상도 | 카드 순서·교차·퇴장 | SKILL 진입 | 동일 위치 복귀 최대 좌표 차이 |
|---|---|---|---:|
| 1920×1080 | KYUNGDONG → LOTTE WORLD → MUSIGN, 통과 | 표시됨 | 0px |
| 1440×900 | 동일, 통과 | 표시됨 | 0px |
| 1024×768 | 동일, 통과 | 표시됨 | 0px |

타임라인 .785와 기존 duration·easing·scrub·카드 geometry를 유지한다. 768/390은 기존 정적 카드 흐름과 왕복 복귀 결과가 있다. through practice 삭제 후 중앙 타이틀·한국어 소개만 남고 전용 행·margin은 제거되어 있다. CLONE 소스가 재개 전후 동일하므로 성공한 검사를 다시 실행하지 않았다.

## 10. 5개 해상도별 최종 근거

| 해상도 | 재사용한 실제 화면·기능 결과 | 이번 추가 확인 |
|---|---|---|
| 1920×1080 | 삭제·번호 유지, 정렬, 캡션·목업, 보호 영역, 영상·ABOUT, CLONE 왕복 통과 | 관련 소스·배치 보존 검사 |
| 1440×900 | 같은 범위 통과 | 관련 소스·배치 보존 검사 |
| 1024×768 | 같은 범위 통과 | 모바일 검사 후 데스크톱 88px 런처 복원 |
| 768×1024 | 삭제·캡션·전체 레이아웃·영상·ABOUT 통과 | 빠른/역방향 스크롤, 가림 77개 위치, 말풍선·챗봇·본문 위치 화면 |
| 390×844 | 삭제·캡션 한 줄·한국어 문장·영상·ABOUT 통과 | 빠른/역방향 스크롤, 가림 85개 위치, 말풍선·챗봇·본문 위치 화면 |

기존 `after.json`은 5개 해상도 모두 가로 넘침 없음과 유지 번호를 기록한다. `extra-runtime.json`은 INTRO 프리뷰, INTRO/PROFILE/WORK 대표 전환, SELECTED SOLUTIONS·PROCESS, VIVIENNE/COS, 영상 4편의 재생 시간 증가, ABOUT 5개 카드 왕복, 보드 확대·닫기의 완료 기록을 포함한다. 이번에 이 동작들을 수정하지 않아 재사용했다.

## 11. 빌드·Git·보존 결과

- `npm.cmd run build`: 이번 재개 후 최종 소스 기준 통과. 72개 모듈 변환, JS 약 970.23kB / gzip 276.29kB.
- `git diff --check`: 통과. LF/CRLF 안내는 나오지만 공백 오류는 없다.
- 새 lint 스크립트·의존성은 추가하지 않았다.
- `finish-check.json`에 재사용 JSON의 SHA256·해상도·완료 조건, 재개 전후 변경 2개 소스·나머지 304개 파일 보존 결과를 기록했다.
- PROFILE 파일 SHA256은 `1C6E11A6AE7CC5A4C6FCD9733E870D773BD7B25E63D4DE66E13149503FBF6B42`로 동일하다.
- 기존 Git 상태 경로와 untracked 파일을 보존하고 새 최종 보고서 하나만 추가했다. 검증 산출물은 무시 경로에 분리했다.
- Commit·Push·Vercel 배포·reset·clean·다른 저장소 수정·검증 폴더 일괄 삭제는 하지 않았다.

## 12. 남은 예외와 미검증 사항

- GPU가 비활성화된 headless 환경에서 PROFILE WebGL 말림 효과를 실제 GPU 화면으로 확인하지 못했다. 해당 소스·셰이더는 보존했다.
- 실제 휴대폰 터치, 모든 OS·브라우저·safe-area·줌 조합을 검증하지 않았다. 지정 viewport와 실제 wheel·클릭, 기록된 위치·대표 전환 검증이다.
- 보호 HYUNDAI 캡션 4개는 9px 그대로다. 이는 명시적 보호 조건에 따른 예외다.
- 닫힌 모바일 마스코트는 중요한 내용과 충돌할 때 숨겨진다. 열린 패널이 페이지 위에 놓이는 기존 동작은 유지한다.
- 빠른 스크롤 검사에서 확인한 짧은 재등장은 해소됐지만 모든 가능한 입력·모든 애니메이션 프레임의 무깜빡임을 보증하지는 않는다.
- 외부 링크의 배포 성공, 실제 메일 발송·전화 연결은 실행하지 않았다. 연결 값이 보존됐는지 확인했다.
- 기존 보호 PROFILE의 390px 문장 끝 줄바꿈, 원본 이미지·영상 내부 작은 텍스트는 이번 수정 범위에서 그대로 유지했다.
