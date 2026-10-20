"""
POST /api/evaluate
입력: { "situation": "...", "items": ["상의: 흰색 기본 티셔츠", ...] }
출력: { "score": 0~100, "fit": "한 줄 적합도", "comment": "스타일리스트 코멘트" }

API 키는 환경 변수 ANTHROPIC_API_KEY 로만 읽습니다. 코드에 절대 적지 마세요.
"""
import json
import os
from http.server import BaseHTTPRequestHandler

import anthropic

SYSTEM_PROMPT = """당신은 '오늘의 코디 챌린지' 게임의 스타일리스트 '마담 룩'입니다.
말투는 짧고 유쾌하며, 칭찬과 지적을 한 문장씩 섞습니다.
플레이어가 고른 코디가 주어진 상황(날씨, 장소, 활동량, 격식 수준)에 얼마나 맞는지 평가합니다.

채점 기준 (총 100점):
- 상황 적합도 40점: 날씨·장소·활동에 맞는가
- 색 조합 30점: 색이 서로 어울리는가
- 완성도 30점: 아우터·소품이 룩을 완성하는가, 과하지 않은가

반드시 아래 JSON 형식으로만 답하고, 다른 말이나 마크다운 코드블록은 쓰지 마세요.
{"score": 정수, "fit": "상황 적합도를 10자 내외로", "comment": "2문장 이내의 코멘트"}"""


def _send(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # 1) 요청 본문 읽기
        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return _send(self, 400, {"error": "요청 형식이 올바르지 않아요."})

        situation = str(data.get("situation", "")).strip()
        items = data.get("items") or []
        if not situation or not isinstance(items, list) or len(items) < 3:
            return _send(self, 400, {"error": "상황과 아이템(최소 3개)을 보내 주세요."})

        # 2) 환경 변수 확인
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            return _send(self, 500, {"error": "서버에 AI 키가 설정되지 않았어요. 환경 변수를 확인해 주세요."})

        # 3) AI 호출
        user_msg = f"상황: {situation}\n코디:\n" + "\n".join(f"- {i}" for i in items[:8])
        try:
            client = anthropic.Anthropic(api_key=api_key, timeout=12.0)
            resp = client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=300,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_msg}],
            )
            text = "".join(block.text for block in resp.content if getattr(block, "type", "") == "text")
        except anthropic.APITimeoutError:
            return _send(self, 504, {"error": "스타일리스트가 고민이 길어지고 있어요. 다시 시도해 주세요."})
        except anthropic.APIStatusError as e:
            return _send(self, 502, {"error": f"AI 서비스 오류({e.status_code})예요. 잠시 후 다시 시도해 주세요."})
        except Exception:
            return _send(self, 502, {"error": "스타일리스트가 잠시 자리를 비웠어요. 다시 시도해 주세요."})

        # 4) JSON 파싱 (코드블록이 섞여 와도 처리)
        clean = text.strip().replace("```json", "").replace("```", "").strip()
        try:
            result = json.loads(clean)
            score = max(0, min(100, int(result.get("score", 0))))
            fit = str(result.get("fit", "")).strip()[:40]
            comment = str(result.get("comment", "")).strip()[:300]
        except (ValueError, AttributeError, json.JSONDecodeError):
            return _send(self, 502, {"error": "AI 답변을 읽지 못했어요. 한 번 더 시도해 주세요."})

        return _send(self, 200, {"score": score, "fit": fit, "comment": comment})
