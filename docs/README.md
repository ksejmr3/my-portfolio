# THE WORKING EDITION — 문서 목차

갱신: 2026-11-05. 사이트 코드 변경 없이 기존19개 Markdown과CSV1개를 조사·통합했다. **현재 상태는 아래 세 문서로 파악하며 날짜별 보고서를 모두 읽을 필요가 없다.**

## 가장 먼저 읽을 문서

1. [FINAL_QA_SUMMARY.md](FINAL_QA_SUMMARY.md) — 무엇이 완료됐는지,검증 범위·근거·남은 성능/기기 과제.
2. [PORTFOLIO_CURRENT_SPEC.md](PORTFOLIO_CURRENT_SPEC.md) — 최종 섹션·텍스트/타입·인터랙션·챗봇 위치와 보호 조건.
3. 이 목차 — 필요한 과거 증거를 찾고 이후 문서를 관리할 때 사용.

최신 사용자 지시→현재 명세/최종 검수 요약→분야별 최신 증거→이전 기록/초기 제안 순으로 판단한다.과거 보고서의'유지','미검증','제안'을 후속 결과와 대조하지 않고 현재 작업으로 복원하지 않는다.과거 원문은 보관하고 충돌·대체 결과는 최종 요약에 명시했다.

## 현재 구조와 경로 호환 예외

~~~text
docs/
  README.md
  PORTFOLIO_CURRENT_SPEC.md
  FINAL_QA_SUMMARY.md
  planning/                    # 기획·콘텐츠·디자인 근거5개
  archive/                     # 이전 검수7개 + 정리 전 명세/목차 원문2개
  ASSET_AUDIT_2026-11-04.csv     # 경로 고정 부록
  (경로 고정 날짜별 보고서5개)  # 아래 표 참조,새 현재 명세가 아님
~~~

원본 보고서를 보존하면서12개 문서를 이동했다.기존 명세/목차는 이력 사본을 먼저 보관한 뒤 현재 내용으로 재작성했다.총 원문20개(CSV포함)가 이력/이동/유지 위치에서 보존된다.

루트를 정확히 세 파일만 남기면 아래 도구의 직접 읽기/출력 경로가 바뀐다.이번에는 .review의 기존 스크립트를 수정하지 않기 위해 **보고서5개와CSV는 이동하지 않았다**.이 파일들은 경로 호환을 위한 예외이고 읽기 시작점은 위 세 문서다.

| 루트에 유지한 증거 | 실제 내용·우선순위 | 경로를 참조하는 도구 |
|---|---|---|
| [CHATBOT_BUBBLE_ALIGNMENT_FINAL_2026-11-05.md](CHATBOT_BUBBLE_ALIGNMENT_FINAL_2026-11-05.md) | 최신 최종 검수 / 실제 alpha 윤곽·최종 위치 | .review/chatbot-alignment-20261105/report.mjs:112 (writeFile wx) |
| [CHATBOT_SPEECH_BUBBLE_REVIEW_2026-11-05.md](CHATBOT_SPEECH_BUBBLE_REVIEW_2026-11-05.md) | 최신 UX 검수 / tail·220/160ms; 위치만 후속 정렬 문서가 대체 | .review/chatbot-speech-20261105/report.mjs:153 (writeFile wx) |
| [EDITORIAL_DESIGN_REVIEW_2026-11-04.md](EDITORIAL_DESIGN_REVIEW_2026-11-04.md) | 이전 검수 / GPU 검증·정렬 근거 | .review/editorial-20261104/report-metrics.mjs:4 (readFile/writeFile) |
| [FINAL_OPTIMIZATION_REVIEW_2026-11-04.md](FINAL_OPTIMIZATION_REVIEW_2026-11-04.md) | 분야별 최종 근거 / CLS·자산·성능, 실제 완료일11-05 | .review/final-optimization-20261104/write-report.mjs:254 (writeFile wx) |
| [RECORDING_BALANCE_REVIEW_2026-11-04.md](RECORDING_BALANCE_REVIEW_2026-11-04.md) | 분야별 최종 근거 / 기여 정렬·사진; 챗봇은 후속 보고서가 대체 | .review/recording-balance-20261104/report-metrics.mjs:3 (readFile/writeFile) |

[ASSET_AUDIT_2026-11-04.csv](ASSET_AUDIT_2026-11-04.csv)는 public/src 자산251개의 경로·해상도·참조·분류·SHA256이다. `.review/final-optimization-20261104/asset-report.mjs:25`가 이 경로에 직접 출력하므로 유지했다.정적 미발견/DOM 요청 확인/보존 원본/미확정을 구분하며 삭제 승인 목록이 아니다.

## 기획·콘텐츠·디자인 자료

| planning 문서 | 실제 내용에 따른 분류 |
|---|---|
| [CONTENT_INVENTORY.md](planning/CONTENT_INVENTORY.md) | 기획·콘텐츠 근거 / 오래된 경로·placeholder 기록, 현재 구현 명세 아님 |
| [HYUNDAI_ASSET_INVENTORY.md](planning/HYUNDAI_ASSET_INVENTORY.md) | 자산 출처·Figma export / 11-01 WebP 타일 기록 및 공개 범위 근거 |
| [PORTFOLIO_TYPOGRAPHY_GUIDE.md](planning/PORTFOLIO_TYPOGRAPHY_GUIDE.md) | 디자인 기준 / 스케일은 출발점, 최종9/11px 캡션 예외는 현재 명세 우선 |
| [REFERENCE_AUDIT.md](planning/REFERENCE_AUDIT.md) | 기획 레퍼런스 / 녹화에서 관찰한 사실, 실제 구현 추정과 구분 |
| [SITE_ARCHITECTURE.md](planning/SITE_ARCHITECTURE.md) | 초기 설계 / 별도 상세 URL 제안은 현재 단일 페이지 구조로 대체됨 |

SITE_ARCHITECTURE의 개별 상세 URL,CONTENT_INVENTORY의 다른 작업 경로/placeholder,타이포그래피 가이드의 출발점 스케일은 초기 기록이다.현재 구현이라고 해석하지 않는다.HYUNDAI 인벤토리의 과거 Git 미추적/export 상태도 작성 시점 기록이며 지금 Git 상태를 대신하지 않는다.출처·공개 범위 판단과 레퍼런스 관찰 근거는 보존한다.

## 이전 검수 기록

| archive 문서 | 보존 목적 |
|---|---|
| [FEEDBACK_REVIEW_2026-11-02.md](archive/FEEDBACK_REVIEW_2026-11-02.md) | 1차 피드백·JOIN/로고 제거,후속 삭제 전 기록 |
| [FEEDBACK_REVIEW_2026-11-03.md](archive/FEEDBACK_REVIEW_2026-11-03.md) | 2차 태그/카드 번호/하단 문구 삭제·영상4편 안내 |
| [FEEDBACK_REVIEW_FINAL_2026-11-03.md](archive/FEEDBACK_REVIEW_FINAL_2026-11-03.md) | 개인 메타/기간 UI/보조 문구 삭제,후속 캡션 변경 전 기록 |
| [FINAL_FIVE_REVIEW_2026-11-04.md](archive/FINAL_FIVE_REVIEW_2026-11-04.md) | 8개 크기 줄바꿈·중복 라벨 최종 수정 |
| [NUMBER_MOBILE_FINAL_2026-11-03.md](archive/NUMBER_MOBILE_FINAL_2026-11-03.md) | 장식 번호·캡션11px·모바일 가림 방지 |
| [RESUMED_FINAL_REVIEW_2026-11-04.md](archive/RESUMED_FINAL_REVIEW_2026-11-04.md) | 중단 재개·모바일 표시 안정성 추가 검증 |
| [TEXT_NUMBER_REVIEW_2026-11-03.md](archive/TEXT_NUMBER_REVIEW_2026-11-03.md) | 불필요 문구·고정 번호 정리 |

- [PORTFOLIO_SPEC_HISTORY.md](archive/PORTFOLIO_SPEC_HISTORY.md): 정리 전33KB 명세 원문.10월 기록·11월 수정 과정과 이제 해결된 미정 사항을 보존한 이력이며 현행 명세가 아니다.
- [DOCS_INDEX_HISTORY.md](archive/DOCS_INDEX_HISTORY.md): 이동 전 분류/목차 원문.당시'이동하지 않는다'는 문구는 이번 사용자의 문서 이동 허용으로 대체됐다.

이동 시 Markdown 상대 링크를 새 위치로 바꾸고,원문 내용·표·수치는 유지했다.보고서 안의 backtick 파일 경로/당시 수정 파일 목록은 **그 날짜의 기록**이다.옛 Git 상태 JSON·initial-hashes를 현재 경로로 고쳐 이력을 바꾸지 않는다.

과거 verify/verify-source는 당시 소스·허용 파일·해시에 묶인 일회성 검사다.후속 사이트 수정 전용 검증기를 현재 트리의 신규 검사로 재실행하면 이전에도 실패할 수 있다.이번에는 실행하지 않았다.당시 문서의 byte 원문은 `.review/docs-consolidation-20261105/original-docs/`,이동 매핑·원문 보존 검사는 같은 폴더의JSON에 있다.최신 검증이 필요하면 현재 기준으로 별도 도구를 준비하며 과거 스냅샷을 덮어쓰지 않는다.

## 남은 최적화 과제와 실제 기기 한계

[최종 검수 요약](FINAL_QA_SUMMARY.md)의 성능/미검증 항목을 우선한다.단일 대형 JS 청크,초기 이미지약25.58MB,원본/영상 품질을 보존한 파생본·코드 분할·폰트/패키지·업로드 경계가 후보로 남아 있다.자산 삭제/대량 변환/재인코딩/패키지 변경/GSAP 구조 변경은 아직 실행하지 않았다.

실물 iOS/Android·터치·Safari/Firefox·저사양/느린 회선·실사용자 성능은 기존 viewport 검수와 구분한다.이번 문서 정리에서 사이트 디자인·빌드·브라우저 검사를 새로 통과했다고 기록하지 않는다.

## .review 정리 후보 — 이번 삭제 없음

측정 시 18,495개/5,695,215,092 bytes(**5.70GB**,약5.30GiB)다.검수용 Chrome 프로필18개가4.83GB를 차지한다.정확한 수치/보존·후보 구분은 최종 요약에 있다.

- 우선 검토: 재생성 가능한 검수 Chrome 프로필/캐시,약4.83GB.향후 정리 전 브라우저 종료·재현 상태 보존 필요를 확인한다.
- 조건부 후보: baseline 밖 byte 동일 캡처5개,760,826 bytes(약0.76MB).참조 확인과사본 보존 후에만 검토한다.
- 보존 권장: before-source 스냅샷·JSON·스크립트·해시·최종 전후 캡처.동일 미디어175개/223.96MB도 원본 비교 스냅샷이라 단순 중복 삭제하지 않는다.
- 전체 동일 미디어 후보180개/224.72MB를 모두 안전한 절약량으로 합산하지 않았다.삭제·이동은 이번에하지 않았다.

## 이후 문서 관리 원칙

1. **작은 수정:** 날짜별 Markdown을 새로 만들지 않고 현재 명세와 FINAL_QA_SUMMARY의 해당 항목·검수일·실제 근거/한계를 갱신한다.
2. **중요한 기능 변경:** 기존 문서의 관련 동작·보호 범위·검증 결과를 갱신한다.이전 결과와 달라진 점을 남기되 완결된 명세에 모순되는 과거 지시를 계속 쌓지 않는다.
3. **대규모/독립 검증:** 필요할 때만 새 보고서를 만들고 요약에서 링크한다.종료된 상세 기록은 archive에 두고 루트에 날짜별 보고서를 자동 증식시키지 않는다.
4. **원문 보존:** archive 기록을 현행 사실로 다시 쓰지 않는다.이동 시 상대 링크/도구 참조를 확인하고 원문·표·수치가 보존되는지 대조한다.
5. **경로 고정 방지:** 새 도구는 날짜별 루트 보고서 위치를 무조건 하드코딩하지 않는다.기존 경로 고정 도구를 변경할 때는 위 예외 파일 이동을 함께 검토한다.
6. **중복 방지:** 같은 결과를 여러 새 보고서로 반복하지 않는다.검증하지 않은 기능·실제 기기·성능 개선·커밋/배포를 완료로 표시하지 않는다.
7. **검수 자료 분리:** .review는 제품 코드와 분리한다.자동 삭제하지 않으며 브라우저 프로필과 반드시 보존할 증거를 구분한다.

이번 목차/명세 이력 사본은 통합 전 원문을 잃지 않기 위한 일회성 보관이다.작은 갱신마다 이력 사본과 날짜별 보고서를 복제하는 관리 방식으로 사용하지 않는다.
