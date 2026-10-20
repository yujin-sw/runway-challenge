# 오늘의 코디 챌린지 👗

상황 카드를 뽑고 옷장에서 아이템을 골라 코디를 완성하면, AI 스타일리스트 '마담 룩'이 100점 만점으로 평가합니다.
마음에 드는 코디는 런웨이에 올려 다른 방문자에게 별점을 받고, 랭킹에서 순위를 확인할 수 있습니다.

- 배포 URL: **https://runway-challenge-khaki.vercel.app**
- 기획서: [docs/PLAN.md](docs/PLAN.md)

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| 상황 카드 | 8가지 상황 중 랜덤 제시, "다른 상황 뽑기"로 교체 가능 |
| 옷장 코디 | 상의·하의·신발(필수) + 아우터·소품(선택). 고르는 즉시 아바타에 반영 |
| 캐릭터 | 여성/남성 선택. 옷 종류마다 다른 실루엣(원피스, 후드, 롱부츠, 트렌치코트 등)을 SVG로 그림 |
| AI 평가 | 점수(0~100), 상황 적합도 한 줄, 코멘트 2문장 |
| 런웨이 | 코디를 공개 저장소에 올리고 방문자가 1~5점 별점 부여(코디당 1회) |
| 랭킹 | 종합 = AI 점수 × 0.5 + 별점 평균 × 10, 상위 20개 |

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 프론트엔드 | HTML, CSS, 바닐라 JavaScript (프레임워크 없음) |
| 백엔드 | Vercel Serverless Functions (Python) |
| AI | Google Gemini API (`gemini-3.5-flash-lite`, REST 직접 호출) |
| 저장소 | Upstash Redis (REST API, 무료 플랜) |
| 그래픽 | 직접 그린 SVG 아바타·아이콘 (외부 이미지 없음) |
| 배포 | GitHub + Vercel |

## 폴더 구조

```
.
├── index.html        # 홈
├── game.html         # 코디하기 (성별 선택, 옷장, AI 평가, 런웨이 출전)
├── runway.html       # 런웨이 (별점 주기)
├── ranking.html      # 랭킹
├── css/style.css
├── js/
│   ├── data.js       # 상황 카드, 옷장 아이템, 아바타·아이콘 SVG 렌더러
│   ├── api.js        # fetch 공통 함수 (30초 타임아웃, 오류 처리)
│   ├── game.js       # 코디하기 페이지 로직
│   └── runway.js     # 런웨이/랭킹 페이지 로직
├── api/
│   ├── evaluate.py   # POST /api/evaluate : Gemini로 코디 평가
│   └── runway.py     # GET/POST /api/runway : 코디 저장, 별점
├── docs/PLAN.md      # 서비스 기획서
├── requirements.txt  # requests
└── .env.example      # 환경 변수 이름 목록 (값 없음)
```

## 동작 흐름

1. 사용자가 캐릭터 성별과 옷장 아이템을 고르고 "AI 평가 받기"를 누름
2. `js/game.js`가 필수 항목을 검사한 뒤 `fetch('/api/evaluate')`로 상황 + 아이템 목록을 POST
3. `api/evaluate.py`가 환경 변수에서 키를 읽어 Gemini REST API를 호출하고, 답변에서 JSON(점수/적합도/코멘트)만 꺼내 반환
4. 프론트가 결과를 화면에 표시하고, "런웨이에 출전하기"로 `/api/runway`에 저장
5. 런웨이 페이지에서 다른 방문자가 별점을 주면 `/api/runway`가 Upstash Redis에 누적

## 환경 변수

| 이름 | 설명 | 발급처 |
| --- | --- | --- |
| `GEMINI_API_KEY` | Gemini API 키 | https://aistudio.google.com/apikey |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | Vercel > Storage에서 Upstash 연결 시 자동 생성 |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST 토큰 | 위와 동일 |

- 값은 코드, README, 스크린샷에 절대 적지 않습니다. Vercel 프로젝트의 **Settings > Environment Variables**에만 등록합니다.
- 로컬에서는 `.env.example`을 복사해 `.env`를 만들어 씁니다. `.env`는 `.gitignore`에 있어 커밋되지 않습니다.
- 환경 변수를 추가·수정한 뒤에는 **새 배포**가 있어야 반영됩니다(Redeploy 또는 새 push).

## 로컬 실행

```bash
npm i -g vercel          # Vercel CLI 설치 (최초 1회)
vercel link              # 프로젝트 연결
vercel env pull .env     # 환경 변수 받아오기
vercel dev               # http://localhost:3000
```

정적 화면만 볼 때는 `python -m http.server 8000`으로도 열 수 있습니다. 이때 `/api`는 동작하지 않습니다.

## 배포

1. 저장소를 GitHub에 push
2. [vercel.com](https://vercel.com) > Add New > Project > 저장소 Import (Framework Preset: Other)
3. Environment Variables에 `GEMINI_API_KEY` 추가
4. Storage 탭에서 Upstash Redis 연결 (환경 변수 자동 추가)
5. Deployments에서 새 배포가 Ready가 되면 배포 URL에서 전체 기능 확인
6. 이후에는 push할 때마다 자동으로 재배포됨

## AI 기능 실패 처리

| 상황 | 사용자 안내 |
| --- | --- |
| 필수 아이템/코디 이름 누락 | "상의, 하의를 골라 주세요…" 안내 후 요청하지 않음 |
| API 오류 (4xx/5xx) | 상태 코드와 Gemini가 보낸 메시지를 함께 표시, 재시도 가능 |
| 타임아웃 | 브라우저 30초, 서버 20초. "응답이 너무 오래 걸려요" 안내 |
| AI 응답 파싱 실패 | "AI 답변을 읽지 못했어요" 안내 |
| 무료 사용량 초과 (429) | "무료 사용량을 모두 썼어요" 안내, 잠시 후 재시도 |
| 세션당 5회 초과 | 과금 방지 안내 (새로고침 시 초기화) |

## 개발 중 해결한 문제

| 증상 | 원인 | 해결 |
| --- | --- | --- |
| AI 서비스 오류(401) | Anthropic API는 별도 결제가 필요해 키 인증 실패 | 무료 티어가 있는 Gemini API로 교체 |
| 키를 넣어도 "키가 설정되지 않았어요" | 환경 변수 추가 후 새 배포가 없어 예전 코드 실행 | README 한 줄 수정 후 push해 재배포 |
| AI 서비스 오류(504) | Gemini 서버 응답 지연 | 가벼운 모델로 변경, 브라우저/서버 타임아웃 조정 |
| AI 서비스 오류(400) | SDK 설정값이 모델에서 미지원 | SDK 대신 REST API 직접 호출로 전환 |
| 404 "no longer available to new users" | `gemini-2.5-flash-lite`가 신규 사용자 제공 종료 | `gemini-3.5-flash-lite`로 변경 |
| 런웨이 "저장소가 연결되지 않았어요" | Upstash 미연결 | Vercel Storage에서 연결 후 재배포 |

Gemini 모델 이름은 Google이 주기적으로 교체합니다. 404가 다시 나오면 `api/evaluate.py`의 `MODEL` 값만 최신 모델로 바꾸면 됩니다.
