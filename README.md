# 오늘의 코디 챌린지 👗

상황 카드를 뽑고 옷장에서 아이템을 골라 코디를 완성하면, AI 스타일리스트가 100점 만점으로 평가합니다.
마음에 드는 코디는 런웨이에 올려 다른 방문자에게 별점을 받고, 랭킹에서 순위를 확인할 수 있습니다.

- 배포 URL: https://runway-challenge-khaki.vercel.app
- 기획서: [docs/PLAN.md](docs/PLAN.md)

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 프론트엔드 | HTML, CSS, 바닐라 JavaScript (프레임워크 없음) |
| 백엔드 | Vercel Serverless Functions (Python) |
| AI | Anthropic Claude API (`anthropic` 패키지) |
| 저장소 | Upstash Redis (REST API, 무료 플랜) |
| 배포 | GitHub + Vercel |

## 폴더 구조

```
.
├── index.html        # 홈
├── game.html         # 코디하기 (AI 평가)
├── runway.html       # 런웨이 (별점 주기)
├── ranking.html      # 랭킹
├── css/style.css
├── js/
│   ├── data.js       # 상황 카드, 옷장 아이템, 아바타 SVG
│   ├── api.js        # fetch 공통 함수 (타임아웃/오류 처리)
│   ├── game.js       # 코디하기 페이지 로직
│   └── runway.js     # 런웨이/랭킹 페이지 로직
├── api/
│   ├── evaluate.py   # POST /api/evaluate : AI 코디 평가
│   └── runway.py     # GET/POST /api/runway : 코디 저장, 별점
├── docs/PLAN.md      # 서비스 기획서
├── requirements.txt
└── .env.example
```

## 동작 흐름

1. 사용자가 옷장에서 아이템을 고르고 "AI 평가 받기"를 누름
2. `js/game.js`가 `fetch('/api/evaluate')`로 상황 + 아이템 목록을 POST
3. `api/evaluate.py`가 Claude API를 호출해 JSON(점수/적합도/코멘트)을 받아 반환
4. 프론트가 결과를 화면에 표시하고, "런웨이에 출전하기"로 `/api/runway`에 저장
5. 런웨이 페이지에서 다른 방문자가 별점을 주면 `/api/runway`가 Redis에 누적

## 환경 변수

| 이름 | 설명 |
| --- | --- |
| `ANTHROPIC_API_KEY` | Anthropic 콘솔에서 발급한 API 키 |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST 토큰 |

- 로컬: `.env.example`을 복사해 `.env`를 만들고 값을 채웁니다. `.env`는 커밋하지 않습니다.
- Vercel: 프로젝트 > Settings > Environment Variables에 등록합니다.
- Upstash는 Vercel 대시보드 > Storage > Upstash Redis 를 연결하면 변수가 자동 생성됩니다.

## 로컬 실행

```bash
npm i -g vercel          # Vercel CLI 설치 (최초 1회)
vercel link              # 프로젝트 연결
vercel env pull .env     # 환경 변수 받아오기
vercel dev               # http://localhost:3000
```

정적 화면만 확인할 때는 `python -m http.server 8000` 으로도 열 수 있습니다(이때 /api는 동작하지 않음).

## 배포

1. 이 저장소를 GitHub에 push
2. [vercel.com](https://vercel.com) > Add New Project > 저장소 선택 > Deploy
3. Storage 탭에서 Upstash Redis 연결, Environment Variables에 `ANTHROPIC_API_KEY` 추가
4. Deployments > Redeploy (환경 변수 반영)
5. 배포 URL에서 코디하기 → AI 평가 → 런웨이 출전 → 별점 → 랭킹 순으로 확인

## AI 기능 실패 처리

| 상황 | 사용자 안내 |
| --- | --- |
| 필수 아이템/코디 이름 누락 | "상의, 하의를 골라 주세요…" 안내 후 요청하지 않음 |
| API 오류 (4xx/5xx) | 서버가 돌려준 메시지 표시, 재시도 가능 |
| 15초 타임아웃 | "응답이 너무 오래 걸려요" 안내 |
| AI 응답 파싱 실패 | "AI 답변을 읽지 못했어요" 안내 |
| 세션당 5회 초과 | 과금 방지 안내 (새로고침 시 초기화) |

