# THE WORKING EDITION — 현재 프로젝트 명세

기준일: 2026-11-05. 대상: `C:\Users\ksejm\Desktop\ㄱㅈㅇ\포트폴리오\my-portfolio`의 메인 React/Vite 개인 포트폴리오. 별도 Vivienne Westwood/COS 리디자인 저장소와 구분한다.

먼저 [문서 목차](README.md)와 [최종 검수 요약](FINAL_QA_SUMMARY.md)을 읽는다. 이 문서는 **현재 유지할 동작과 보호 범위**, 검수 요약은 **변경 결과·증거·한계**를 설명한다. 과거 명세 전체는 [명세 이력](archive/PORTFOLIO_SPEC_HISTORY.md)에 보존했다. 과거의 유지/미검증/제안 표현을 현재 지시로 복원하지 않는다.

## 1. 구성과 콘텐츠

단일 페이지 `/`의 순서:

1. INTRO — 3개 프로젝트 자동 프리뷰와 내비게이션.
2. PROFILE — 자기소개/인물 이미지, desktop 스크롤 말림 효과.
3. WORK INTRO — selected works 제목과 결과물 소개.
4. HYUNDAI MOTORSTUDIO — 진입 목업/결과물 링크, 소개, CHALLENGE, SELECTED SOLUTIONS, PROCESS, MY CONTRIBUTION, PROJECT REFLECTION.
5. VIVIENNE WESTWOOD — PERSONAL WORK, 소개/MY WORK/WEBSITE와 노트북 목업.
6. COS — 같은 역할의 개인 작업 구성, 고유한 색상·비주얼 유지.
7. AI VIDEO CONTENTS — 기존 영상4편과 설명·MY ROLE.
8. CLONE CODING — KYUNGDONG → LOTTE WORLD → MUSIGN,3개.
9. SKILL — DESIGN/FRONTEND/AI TOOLS/WORKFLOW/INTERACTION/VIDEO,6개 정적 그룹.
10. ABOUT — 5개 카드와 사진 필름스트립.
11. CONTACT — 기존 연락/탐색/푸터 링크.

`App.jsx`는 INTRO/PROFILE/WORK INTRO를 IntroWorkSequence로 연결하고 WorkSection이 HYUNDAI 상세와 두 개인 작업을 배치한다. PortfolioAssistant/SmoothScroll은 공통 기능이다. planning의 개별 `/work/...` URL은 초기 제안이며 현재 라우트가 아니다.

현재 AI4편: VIVIENNE WESTWOOD RUNWAY / SELEX PROFIT / VIVIENNE WESTWOOD CONCEPT / CAT SHORT-FORM. 챗봇 안내도 같은 영상 데이터를 따른다. JOIN은 제외되어 있으며 과거 설명/태그/장식 번호를 다시 추가하지 않는다. 화면 삭제와 내부 key·class·진행 상태 데이터는 구분한다.

## 2. 디자인·텍스트의 최종 기준

- 한국어/UI: Pretendard Variable, 영문 UI/숫자: Inter, 포인트 이탤릭: Lora. 보호 PROCESS의 Manrope/DM Sans 등 기존 예외 유지.
- 본문은 섹션별 기존16–18px 체계와 자연스러운 어절 줄바꿈을 사용한다. ABOUT 본문16px, 기여 설명 desktop16–18/mobile15px 같은 승인된 차이를 일괄 통일하지 않는다.
- 프로젝트 유형 라벨은 Inter600/12–13px/1.5/.12em. 개인 작업의 PERSONAL WORK·제목·소개·MY WORK·CTA는 공통 왼쪽 축을 유지한다.
- 개인 목업 캡션2개와 HYUNDAI 검정 소개 보드의 왼쪽 캡션은 Inter500/**11px**/.08em/1.3, 이미지와14px 간격. HYUNDAI 보호 목업/SELECTED SOLUTIONS의4개 캡션은 **9px** 그대로다.
- 정적 섹션의 공통 여백과 보호 pin 길이를 구분한다. 모든 섹션 높이/제목 크기를 동일하게 강제하지 않는다. WORK INTRO의701px 이상 설명 이동40–64px은 유지한다.
- CLONE 상단은 중앙 `03 PROJECTS`, 큰 CLONE CODING 제목 유지. `through practice`와 카드 번호는 없다.
- SKILL 상·하 보조 문구, 개인 태그·독립 메타·콘셉트 부제목, ABOUT 서명/상단 보조 문구, CONTACT 상단 보조 문구, MY CONTRIBUTION 기간 UI는 최종 삭제 상태다. 정확한 목록은 검수 요약 참조.

## 3. MY CONTRIBUTION과 이미지

네 항목은 UX PLANNING & DEVELOPMENT / UI DESIGN / VEHICLE EXHIBITION DESIGN / COLLABORATION이다. 1·3은 텍스트 전용,2는 작업 사진2장,4는 협업 사진4장이다. 없는 이미지를 임의로 채우지 않는다.

901px 이상은 항목 전체가 왼쪽1·3/오른쪽2·4로 교차하고 좁은 화면은 세로 흐름이다. 내부 라벨·제목·본문·사진은 각 항목의 같은 x축을 사용한다. 본문 최대640px/사진 묶음 최대720px, 원본 비율·순서를 유지한다. 내용 밀도 차이를 같은 높이로 강제하지 않는다.

사진6개의 원본 width/height 속성으로 로딩 공간을 예약한다. CSS width:100%/height:auto/object-fit:contain, lazy/async를 유지한다. 원본 압축·크기·색상·참조 경로를 임의로 변경하지 않는다. 새 자산의 출처·개인 기여·조사 사실/가설·공개 범위를 구분한다.

초기 로딩 최적화(11-05): PROFILE의 HTML 사진은 `crossOrigin="anonymous"`로 기존 Three.js TextureLoader와 요청 모드를 맞춰 동일 원본의 중복 다운로드를 방지한다. 사진·텍스처는 계속 초기 준비하며 셰이더/타임라인은 그대로다. PROCESS의 현재 이미지에만 `loading="lazy" decoding="async"`를 적용한다. 기존 고정 미디어 박스·원본 경로·object-fit·확대 보기·교체 애니메이션은 유지한다.

## 4. 유지할 인터랙션과 반응형

- INTRO 프리뷰는 기존3개/2.5초 순환.701px 이상·일반 모션에서 PROFILE curl과 WORK 전환을 유지한다.390px은 기존 세로 흐름이다.
- HYUNDAI 목업/SELECTED SOLUTIONS/PROCESS·차량/도로·확대 보기는 보호한다.701–900px 제목 보정, 모바일 첫 PROCESS/PROFILE 줄바꿈 예외는 유지한다.
- 개인 작업은901px 이상 일반 모션에서 가로 전환, 좁은 화면/reduced-motion에서는 기존 대체 흐름. 목업 내부 자동 미리보기 유지.
- AI4편은 muted/loop/playsInline/controls/preload=metadata, viewport 진입 재생·이탈 정지 및 사용자 조작 정책 유지. 현재 AI 자동재생에는 별도 reduced-motion 제외 분기가 없으므로 새로 추가한 것으로 기록하지 않는다.
- CLONE은901px 이상3개 카드 등장·교차·퇴장·역방향 복귀, 타임라인 .785/scrub .45. 모바일/reduced-motion 정적 구성 유지.
- SKILL은 sticky/회전 로고/전용 체류 없이3열,700px 이하2열의 자연 높이 구성이다.
- ABOUT은 **배경 먼저→콘텐츠 다음** 등장하는 의도된 순서다. 일반 스크롤/수동5카드 전환·필름스트립·복귀·drag 정책을 임의로 변경하지 않는다.
- resize/이미지 준비 후 refresh, cleanup과 역방향 상태 보존. 새로운 기능 변경 없이 pin/start/end/easing을 리팩터링하지 않는다.

## 5. 챗봇 최종 상태

- 최초5초, 이후20초 간격, 정상3초, 기존 문구3개. 등장220ms/정상·충돌·X 퇴장160ms, 이동6px.
- 마스코트와 말풍선은 같은3.2초 부유. desktop88px/±12px,900px 이하52px/±4px·우측/하단 최소12px 및safe-area 유지.
- 최종 후보(right,bottom): desktop (26,91)/(18,91)/(-8,91)/(34,91), mobile (8,59)/(16,59)/(0,59)/(12,59). 같은 높이의 근거리 후보만 검사한다.
- 꼬리12×9px 외곽+10×8px 내부는 유지. right offset은 launcherWidth/2−bubbleRight−(mobile5/desktop6), 기본값desktop12/mobile13px이다.
- 실제 PNG alpha 윤곽 기준 꼬리 거리는 desktop약9.23px/mobile약7.66px. 투명 이미지 박스의 겹침과 실제 캐릭터 가림을 구분한다.
- 표시 전 본체+꼬리·부유/등장 여유를 포함해 콘텐츠 충돌 검사. 안전한 근거리 공간이 없으면 해당 회차만 생략한다.
- 표시 중 충돌은 제자리 fade-out, 즉시 click-through/tabIndex-1/aria-hidden. 같은 회차에는 복귀해도 재등장하지 않으며 다음 정규 주기는 유지한다.
- 모바일 마스코트 자체의 본문·조작 영역 충돌 숨김/220ms 안전 지연 후 reveal은 유지한다. 말풍선 fade를 부모 visibility로 자르지 않는다. 사용자 수동 패널은 자동 충돌로 닫지 않는다.
- X sessionStorage·수동 질문/답변·ESC·접근 가능한 focus 상태·reduced-motion 유지. DOM 캐시/관찰자/rAF 예약과 기존 이벤트·타이머 cleanup을 재작성하지 않는다.

## 6. 변경·검증 원칙

기존 미커밋·untracked·원본 자산을 보존한다. 다른 저장소 수정, 승인 없는 자산 삭제/대량 변환/재인코딩/패키지 변경/주요 코드 분할/대규모 GSAP 변경은 하지 않는다. Commit/Push/배포는 별도 요청 전 실행하지 않는다.

실제 검증된 범위·미검증 기기·초기 전송량/대형 JS 등 남은 과제는 [FINAL_QA_SUMMARY.md](FINAL_QA_SUMMARY.md)에 있다. 최초 명세 통합은 문서 작업이었으며 이후 11-05 초기 로딩 최적화의 빌드·회귀 결과는 요약의 성능 항목에서 구분한다. 작은 변경은 이 명세의 해당 항목과 최종 요약만 갱신한다.
