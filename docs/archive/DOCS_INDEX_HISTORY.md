# THE WORKING EDITION 문서 안내

갱신: 2026-11-05. 파일명에 적힌 2026-11-04는 중단 전 작업 단위의 날짜다. 문서를 이동·삭제·이름 변경하지 않고 분류했다. 최신 사용자 지시와 현재 구현이 과거 보고서의 설명보다 우선한다.

## A. 현재 기준

| 문서 | 용도 |
|---|---|
| [CHATBOT_SPEECH_BUBBLE_REVIEW_2026-11-05.md](../CHATBOT_SPEECH_BUBBLE_REVIEW_2026-11-05.md) | 자동 말풍선의 최신 UX 기준: 꼬리·공유 부유·자연스러운 충돌 퇴장. 아래 11-04 보고서의 챗봇 위치/즉시 숨김 설명을 대체한다. |
| [PORTFOLIO_CURRENT_SPEC.md](../PORTFOLIO_CURRENT_SPEC.md) | 확정 방향과 후속 변경의 우선순위. 날짜별 기록을 함께 읽는다. |
| [FINAL_OPTIMIZATION_REVIEW_2026-11-04.md](../FINAL_OPTIMIZATION_REVIEW_2026-11-04.md) | 챗봇 충돌 수정, 이미지 공간 예약, 재개 검증, 성능·파일 감사의 최종 결과. |
| [ASSET_AUDIT_2026-11-04.csv](../ASSET_AUDIT_2026-11-04.csv) | public/src 미디어 251개 전체 목록. 실제 참조와 보존·검토 후보를 구분하며 삭제 목록이 아니다. |

## B. 유지할 기획·설계 근거

| 문서 | 활용 범위 |
|---|---|
| [PORTFOLIO_TYPOGRAPHY_GUIDE.md](../planning/PORTFOLIO_TYPOGRAPHY_GUIDE.md) | 서체 선택과 위계의 근거. 최종 크기·문구는 최신 검수 기록 우선. |
| [HYUNDAI_ASSET_INVENTORY.md](../planning/HYUNDAI_ASSET_INVENTORY.md) | 자산 출처와 공개 범위 검토 근거. 최신 전수 목록은 CSV 병행. |
| [REFERENCE_AUDIT.md](../planning/REFERENCE_AUDIT.md) | 레퍼런스 관찰 기록. 관찰과 구현 사실을 구분한다. |

## C. 이전 검수 기록

| 문서 | 기록 범위 |
|---|---|
| [RECORDING_BALANCE_REVIEW_2026-11-04.md](../RECORDING_BALANCE_REVIEW_2026-11-04.md) | WORK 설명 위치·기여 항목 정렬·사진 비율. 말풍선 위치 계산은 이번 최종 보고서가 대체한다. |
| [FINAL_FIVE_REVIEW_2026-11-04.md](FINAL_FIVE_REVIEW_2026-11-04.md) | HYUNDAI/PROCESS/PROFILE 줄바꿈, SKILL 보조 라벨 삭제, CLONE 총개수 라벨. |
| [EDITORIAL_DESIGN_REVIEW_2026-11-04.md](../EDITORIAL_DESIGN_REVIEW_2026-11-04.md) | 디자인 위계·정렬·여백 검수. |
| [RESUMED_FINAL_REVIEW_2026-11-04.md](RESUMED_FINAL_REVIEW_2026-11-04.md) | 이전 번호·모바일 작업 중단 후 검증 재개 기록. |
| [NUMBER_MOBILE_FINAL_2026-11-03.md](NUMBER_MOBILE_FINAL_2026-11-03.md) | 장식 번호·캡션·모바일 마스코트. |
| [TEXT_NUMBER_REVIEW_2026-11-03.md](TEXT_NUMBER_REVIEW_2026-11-03.md) | 불필요한 문구 및 번호 검토. |
| [FEEDBACK_REVIEW_FINAL_2026-11-03.md](FEEDBACK_REVIEW_FINAL_2026-11-03.md) | 3차 문구·메타·캡션 보완. 이후 삭제된 문구를 복원하는 근거로 사용하지 않는다. |
| [FEEDBACK_REVIEW_2026-11-03.md](FEEDBACK_REVIEW_2026-11-03.md) | 2차 강사 피드백 반영 기록. |
| [FEEDBACK_REVIEW_2026-11-02.md](FEEDBACK_REVIEW_2026-11-02.md) | 1차 강사 피드백 반영 기록. |

## D. 최신 구현과 차이가 있는 초기 문서

| 문서 | 보존 이유·정리 후보 |
|---|---|
| [CONTENT_INVENTORY.md](../planning/CONTENT_INVENTORY.md) | 초기 콘텐츠·자산 검증 이력. 후속 섹션과 현재 경로가 모두 반영된 전수 목록으로 간주하지 않는다. 추후 archive 보관 후보. |
| [SITE_ARCHITECTURE.md](../planning/SITE_ARCHITECTURE.md) | 초기 구조 제안. 현재 단일 페이지와 확정 인터랙션은 최신 명세를 따른다. 추후 archive 보관 후보. |

## 검수 파일 위치

최종 브라우저 캡처·스크립트·측정 JSON·원본 대비 해시는 `.review/final-optimization-20261104/`에 있다. `.review/`와 `about-photo-review/`는 Git ignore 대상이고 앱의 런타임 입력이 아니다. `dist/`는 Vite 빌드 산출물, `node_modules/`는 설치 환경이므로 자료 보관 폴더와 구분한다.

정리 후보의 실제 삭제·이동, 자산 변환·재인코딩, 패키지 변경, 주요 코드 분할은 별도 승인 후 진행한다.
