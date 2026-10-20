# 개인 포트폴리오 최신 확정 기준

상태: 현재 단일 페이지 구현을 기준으로 정리한 최신 명세. 이 문서는 기존 문서를 삭제하거나 대체하지 않으며, 이후 디자인·구현 작업에서 우선 참조하는 기준이다.

## 기준 표기

- **확정**: 현재 작업에서 유지해야 하는 방향 또는 기능이다.
- **제안**: 이후 구현 전에 검토·승인이 필요한 개선 방향이다.
- **검증 필요**: 출처, 공개 범위, 실제 렌더링 또는 성능 확인이 필요한 항목이다.

## 1. 프로젝트 개요

이 포트폴리오는 React, Vite, CSS, GSAP 기반의 단일 페이지 포트폴리오다. UI/UX 디자인, 웹디자인, 웹퍼블리싱 지원을 위한 작업 사례와 구현 경험을 함께 보여 준다.

- **확정**: 단일 페이지 구조를 유지한다.
- **확정**: 기존 프로젝트와 섹션 순서를 유지한다.
- **확정**: 구현된 인터랙션을 단순화하거나 제거하지 않는다. 개선은 기존 기능을 보존하는 범위에서 검토한다.
- **제안**: 공통 디자인 토큰을 도입할 때는 현재 섹션의 고유한 결과물과 원본 목업을 우선 보호한다.

## 2. 현재 섹션 순서

1. INTRO
2. PROFILE / WORK INTRO
3. HYUNDAI MOTORSTUDIO
4. VIVIENNE WESTWOOD
5. COS
6. AI VIDEO CONTENTS
7. CLONE CODING
8. SKILL
9. ABOUT
10. CONTACT

- **확정**: 위 순서와 단일 페이지 내 탐색 흐름을 유지한다.
- **확정**: 오른쪽 하단의 3D 마스코트 기반 Portfolio Assistant를 유지한다.
- **제안**: 섹션 사이의 전환은 배경, 타이포그래피, 여백을 우선 사용해 정리한다. 새 pin 또는 가로 스크롤은 필요성이 검증된 경우에만 추가한다.

## 3. 최신 디자인 시스템 기준

### 3.1 서체

| 역할 | 최신 기준 | 상태 |
|---|---|---|
| 한글 본문·UI | Pretendard | 확정 |
| 영문 본문·숫자·메타 | Inter | 확정 |
| 영문 이탤릭 포인트 | Lora Italic | 확정 |
| Hyundai PROCESS 01–06 내부 장표 | 기존 Manrope 및 원본 장표 표현 유지 | 확정 예외 |
| Figma 디자인·영상·이미지 내부 서체 | 결과물 자산의 원본 상태 유지 | 확정 예외 |

Playfair Display는 현재 일부 구현에서 사용되지만, 이후 공통 타이포그래피 정리 시 Lora Italic과 역할을 통합하는 방향을 우선 검토한다.

- **검증 필요**: Playfair Display가 브랜드별 고유 표현으로 남아야 하는 구간이 있는지 실제 화면 기준으로 확인한다.

### 3.2 타입 스케일

| 역할 | 데스크톱 제안 범위 | 모바일 제안 범위 | 기준 |
|---|---:|---:|---|
| Display XL | `clamp(72px, 9vw, 160px)` | `clamp(52px, 15vw, 92px)` | 히어로·마무리 대형 제목 |
| Display LG | `clamp(56px, 6.6vw, 120px)` | `clamp(44px, 11vw, 72px)` | 주요 섹션 제목 |
| Section Title | `clamp(44px, 4.8vw, 80px)` | `clamp(34px, 8.5vw, 52px)` | 섹션 내부 제목 |
| Project Title | `clamp(40px, 4.2vw, 70px)` | `clamp(30px, 7vw, 46px)` | 프로젝트·영상 제목 |
| Heading | `clamp(22px, 1.8vw, 30px)` | `18px–22px` | 질문·소제목 |
| Body Large | `17px–20px` | `16px` | 핵심 설명 |
| Body | `16px–18px` | `15px–16px` | 일반 본문 |
| Caption | `13px–14px` | `11px–12px` | 보조 설명·캡션 |
| Eyebrow / Label | `12px–13px` | `9px–10px` | 번호·메타·레이블 |

- **확정**: 본문은 데스크톱에서 16–18px, 모바일에서 15–16px을 기본으로 한다.
- **확정**: Caption은 13–14px, Eyebrow / Label은 12–13px을 기본 기준으로 한다.
- **확정**: 큰 제목은 공통 Display 체계를 사용한다.
- **확정 예외**: INTRO와 WORK INTRO처럼 의도적인 연출형 제목은 별도 크기와 줄바꿈을 허용한다.
- **제안**: 본문 line-height는 1.65–1.75, 제목은 0.88–1.05, 한글 본문 자간은 `-.02em` 이하의 과도한 압축을 피한다.

### 3.3 여백과 그리드

```css
--page-gutter: clamp(24px, 4.2vw, 82px);
--case-gutter: clamp(24px, 8vw, 160px);
--content-standard: 1320px;
--content-wide: 1480px;
--content-editorial: 1530px;
```

| 항목 | 최신 기준 | 상태 |
|---|---|---|
| 일반 섹션 좌우 여백 | `--page-gutter` | 제안 |
| 케이스 스터디 본문 좌우 여백 | `--case-gutter` | 제안 |
| 일반 콘텐츠 최대 폭 | 1320px | 제안 |
| 넓은 프로젝트·편집형 콘텐츠 폭 | 1480px | 제안 |
| 대형 카드·콜라주 콘텐츠 폭 | 1530px | 제안 |
| 제목과 설명 간격 | 24–32px | 제안 |
| 주요 블록 간격 | 32–64px | 제안 |
| 일반 섹션 상하 간격 | 96–128px | 제안 |
| 대형 케이스 섹션 상하 간격 | 128–160px | 제안 |

- **확정**: 전체 화면형 섹션과 일반 콘텐츠형 섹션에 동일한 padding을 강제하지 않는다.
- **제안**: 기존의 `4.2vw`, `5vw`, `6.5vw`, `7vw`, `8.3vw`는 일반·케이스·편집형 콘텐츠라는 목적에 따라 위 세 가지 폭 기준으로 정리한다.

### 3.4 색상

```css
--color-bg-light: #f4f4f0;
--color-bg-dark: #121212;
--color-surface-dark: #1b1b1a;
--color-surface-warm: #d8d4ca;
--color-text-primary: #171717;
--color-text-secondary: #686761;
--color-text-inverse: #f4f4f0;
--color-text-inverse-muted: #b9b9b5;
--color-border-light: #1717172e;
--color-border-dark: #f4f4f04d;
--color-accent-editorial: #651f2a;
```

- **확정**: 공통 밝은 배경은 `#f4f4f0`을 기본으로 한다.
- **확정**: 공통 어두운 배경은 `#121212`을 우선 사용한다.
- **확정**: Vivienne Westwood, COS의 프로젝트 전용 배경과 실제 브랜드 이미지는 보존한다.
- **확정**: 장식용 배경 그라데이션은 추가하지 않는다.
- **확정**: 마스코트의 보라색을 전역 강조색으로 확장하지 않는다.

## 4. 스크롤 및 인터랙션 기준

### 4.1 확정된 구조

| 구간 | 현재 방식 | 최신 기준 |
|---|---|---|
| INTRO → PROFILE / WORK INTRO | GSAP pin·scrub 기반 전환 | 유지 |
| Hyundai PROCESS 01–06 | GSAP pin·scrub·가로 패널·도로 SVG·자동차 이동 | 유지 및 보호 |
| Hyundai Selected Works | 영상 재생, 목업 내부 자동 스크롤 | 유지 |
| VIVIENNE / COS | 목업 내부 Figma 자동 스크롤 | 유지 |
| AI VIDEO CONTENTS | 네이티브 영상 controls, 화면 이탈 시 pause | 유지 |
| CLONE CODING | 일반 세로 스크롤, 카드 reveal | 유지 |
| SKILL | sticky + GSAP scrub 기반 로고 카드 회전·하강 | 유지 |
| ABOUT | 전체 Q&A 노출, 읽기 중심 세로 흐름 | 유지 |
| CONTACT | 일반 세로 흐름, 실제 링크, Back to Top | 유지 |
| Portfolio Assistant | 고정 마스코트, 부유 애니메이션, 추천 질문 | 유지 |

- **확정**: INTRO pin의 길이는 현재 상태로 유지한 뒤 실제 사용 환경에서 체류 시간을 측정한다.
- **확정**: SKILL의 `250svh` 길이는 현재 상태로 유지한 뒤 실제 사용 환경에서 체류 시간을 측정한다.
- **확정**: 현대 PROCESS 01–06의 기존 GSAP, 레이아웃, 도로, 자동차, 패널 구조는 변경하지 않는다.
- **확정**: 목업 내부 자동 스크롤의 속도·선형 이동·양 끝 대기와 영상 재생 정책을 보존한다.

### 4.2 검토 중인 방향

- **제안**: VIVIENNE → COS 전환은 공통 목업 배치와 배경 대비를 이용해 세로 흐름에서 연결감을 강화한다.
- **검토 단계**: VIVIENNE → COS의 가로 전환은 구현 확정 사항이 아니다.
- **제안**: AI VIDEO → CLONE CODING은 새 가로 스크롤보다 배경 전환, 이미지 비율, 타이틀 위치로 리듬을 강화한다.
- **제안**: ABOUT → CONTACT는 정보 전달과 연락처 접근성을 우선하며, 새 pin이나 가로 스크롤을 추가하지 않는다.

## 5. 보호해야 할 기존 기능

### Hyundai Motorstudio

- PROCESS 01–06 패널 구조와 순서
- 도로 SVG 및 자동차 이동 경로
- GSAP pin / scrub
- Selected Works의 실제 구현 영상
- Experience Finder 흐름
- 전시 Figma 자동 스크롤
- 노트북·휴대폰 목업 합성 방식
- 팀 작업 범위와 개인 기여의 정확한 표현

### 개인 프로젝트와 기타 섹션

- VIVIENNE WESTWOOD와 COS의 Figma 자동 스크롤
- 프로젝트 레이어 이미지와 실제 Live Site 링크
- AI VIDEO의 재생·일시정지·mute·모바일 controls
- CLONE CODING의 임시 CSS 썸네일 구조
- SKILL 로고 카드의 회전·하강·역스크롤·reduced-motion 대응
- ABOUT의 Q&A 5개 전체 노출 구조
- CONTACT의 이메일·GitHub·Back to Top
- Portfolio Assistant의 질문 9개, 패널, ESC 닫기, 섹션 이동, 마스코트 애니메이션

## 6. 현재 구현과 최신 기준의 차이

| 항목 | 현재 상태 | 최신 기준과의 관계 | 향후 조치 상태 |
|---|---|---|---|
| 영문 이탤릭 | Lora와 Playfair Display가 함께 사용됨 | Lora 중심 기준과 차이 | 검토 필요 |
| 큰 제목 | 56px–190px 범위로 섹션별 편차가 큼 | 공통 Display 체계 필요 | 제안 |
| 본문 | 일부 AI fact, 카드 설명이 12–15px | 본문 최소 기준보다 작음 | 검토 필요 |
| Caption / Label | 다수 8–11px | Caption 13–14px, Label 12–13px 기준보다 작음 | 검토 필요 |
| 콘텐츠 폭 | 1320 / 1390 / 1480 / 1500 / 1530px 혼용 | 역할별 폭 토큰 필요 | 제안 |
| 가로 여백 | `4.2vw`부터 `8.3vw`까지 혼용 | page / case / editorial 구분 필요 | 제안 |
| 배경색 | 여러 밝은 회색과 어두운 회색이 혼용됨 | 공통 light / dark 기준 필요 | 제안 |
| 긴 스크롤 구간 | INTRO pin, PROCESS pin, SKILL sticky 존재 | 기능 유지 후 체류 실측 필요 | 검증 필요 |

## 7. 아직 결정되지 않은 사항

1. Playfair Display를 전역에서 Lora Italic으로 통합할지 여부
2. INTRO pin의 실제 체류 시간이 적절한지 여부
3. SKILL `250svh`가 전체 페이지 흐름에서 적절한지 여부
4. VIVIENNE → COS를 가로 전환으로 연결할지 여부
5. 공통 색상 토큰을 실제 CSS에 적용할 시점과 범위
6. 기존 초기 기획 문서를 최신 단일 페이지 구조에 맞게 갱신할지 여부
7. 현대 조사 자료 중 공개 가능한 수치·이미지·개인정보 범위

## 8. 현대 조사 자료 검증 원칙

- **확정**: 조사 결과, 가설, 팀 산출물, 개인 기여를 서로 구분한다.
- **확정**: 설문, 인터뷰, 퍼소나 등 개인정보를 포함할 수 있는 자료는 공개 가능 여부를 확인하기 전까지 확대·추가 노출하지 않는다.
- **확정**: 와이어프레임·분석 보드를 독립된 최종 UI 화면처럼 표현하지 않는다.
- **검증 필요**: 설문 수치, 조사 표본, 최종 UI 프레임의 출처와 공개 범위.
- **검증 필요**: 현대 Figma에서 독립된 최종 화면 프레임을 확보할 수 있는지 여부.
- **확정**: Vehicle Exhibition은 팀 메인 페이지 전체가 아닌 차량 전시 콘텐츠 영역 참여로만 설명한다.

## 9. 향후 최적화 계획

최적화는 시각적 통합 구현과 반응형 검수가 끝난 뒤 진행한다.

1. **이미지**: Figma WebP 분할 이미지의 총 용량, 노트북·휴대폰 PNG 크기, 장표 원본 해상도와 실제 표시 크기를 측정한다.
2. **영상**: MP4의 해상도·코덱·비트레이트·포스터·재생 정책을 점검한다.
3. **GSAP**: ScrollTrigger 중복, refresh 횟수, pin 위치, 리사이즈·이미지 로드 이후 안정성을 확인한다.
4. **스크롤 렌더링**: rAF 자동 스크롤이 화면 밖에서 정지하는지, SKILL scrub이 저사양 환경에서 프레임을 유지하는지 확인한다.
5. **폰트**: Pretendard와 Google Fonts의 로딩, FOUT/FOIT, 대체 서체 상태를 확인한다.
6. **번들**: GSAP 및 simple-icons의 tree-shaking, JS/CSS 청크 크기, 사용하지 않는 자산을 점검한다.
7. **Web Vitals**: LCP, CLS, INP를 실제 배포 또는 로컬 프로덕션 빌드에서 측정한다.
8. **접근성**: 키보드 포커스, video controls, 챗봇 패널, reduced-motion, 390px 가로 overflow를 점검한다.

최적화는 무조건적인 압축보다 목업 선명도, 영상 재생 안정성, 기존 인터랙션의 품질을 우선한다.

## 10. 기존 MD 문서와의 관계

| 기존 문서 | 현재 문서와의 관계 |
|---|---|
| `SITE_ARCHITECTURE.md` | 초기 구조 제안으로 보존한다. 개별 상세 URL·텍스트 중심 SKILL 제안은 현재 확정된 단일 페이지와 카드 인터랙션보다 낮은 우선순위다. |
| `REFERENCE_AUDIT.md` | 레퍼런스 녹화 기반의 관찰 자료로 유지한다. 확인되지 않은 구현 방식은 여전히 추정하지 않는다. |
| `PORTFOLIO_TYPOGRAPHY_GUIDE.md` | 최신 서체·본문·캡션 기준을 정리할 때 핵심 근거로 사용한다. Lora 우선 원칙은 이 문서에서 확정 기준으로 채택한다. |
| `HYUNDAI_ASSET_INVENTORY.md` | 현대 자산 출처와 개인정보 보류 원칙의 근거 문서로 유지한다. |
| `CONTENT_INVENTORY.md` | 초기 콘텐츠·에셋 검증 기록으로 보존한다. 현재 구현에 추가된 AI VIDEO, CLONE CODING, ABOUT, CONTACT, 챗봇 관련 내용은 별도 최신화가 필요할 수 있다. |

이 문서와 기존 문서가 충돌할 경우, 현재 사용자가 명시적으로 확정한 방향과 현재 의도적으로 완성된 기능을 우선한다. 단, 자산 출처·개인정보·개인 기여 범위 검증 원칙은 기존 문서의 기준을 계속 적용한다.
