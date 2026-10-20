"""
GET  /api/runway                              -> { "entries": [...] }
POST /api/runway { action: "submit", entry }  -> { "ok": true, "id": "..." }
POST /api/runway { action: "rate", id, stars }-> { "ok": true }

저장소: Upstash Redis (REST API). Vercel Marketplace에서 Upstash를 연결하면
UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN 환경 변수가 자동으로 생깁니다.
(예전 Vercel KV 이름인 KV_REST_API_URL / KV_REST_API_TOKEN 도 지원)

이용자 수가 적다는 전제로, 전체 목록을 하나의 키에 JSON으로 저장합니다.
"""
import json
import os
import time
import uuid
from http.server import BaseHTTPRequestHandler

import requests

KEY = "runway:entries"
MAX_ENTRIES = 100


def _redis(cmd):
    url = os.environ.get("UPSTASH_REDIS_REST_URL") or os.environ.get("KV_REST_API_URL")
    token = os.environ.get("UPSTASH_REDIS_REST_TOKEN") or os.environ.get("KV_REST_API_TOKEN")
    if not url or not token:
        raise RuntimeError("no-storage")
    r = requests.post(url, headers={"Authorization": f"Bearer {token}"}, json=cmd, timeout=8)
    r.raise_for_status()
    return r.json().get("result")


def _load():
    raw = _redis(["GET", KEY])
    return json.loads(raw) if raw else []


def _save(entries):
    _redis(["SET", KEY, json.dumps(entries, ensure_ascii=False)])


def _send(handler, status, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def _storage_error(handler, err):
    if str(err) == "no-storage":
        return _send(handler, 500, {"error": "저장소가 아직 연결되지 않았어요. Upstash 환경 변수를 확인해 주세요."})
    return _send(handler, 502, {"error": "저장소에 연결하지 못했어요. 잠시 후 다시 시도해 주세요."})


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            return _send(self, 200, {"entries": _load()})
        except Exception as e:
            return _storage_error(self, e)

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return _send(self, 400, {"error": "요청 형식이 올바르지 않아요."})

        action = data.get("action")
        try:
            if action == "submit":
                return self._submit(data.get("entry") or {})
            if action == "rate":
                return self._rate(data.get("id"), data.get("stars"))
            return _send(self, 400, {"error": "알 수 없는 요청이에요."})
        except Exception as e:
            return _storage_error(self, e)

    def _submit(self, entry):
        title = str(entry.get("title", "")).strip()[:30]
        if not title or not entry.get("look"):
            return _send(self, 400, {"error": "코디 이름과 아이템이 필요해요."})
        new = {
            "id": uuid.uuid4().hex[:10],
            "title": title,
            "author": str(entry.get("author", "익명")).strip()[:20] or "익명",
            "situation": str(entry.get("situation", ""))[:60],
            "situationEmoji": str(entry.get("situationEmoji", ""))[:4],
            "look": entry.get("look"),
            "aiScore": max(0, min(100, int(entry.get("aiScore", 0)))),
            "aiComment": str(entry.get("aiComment", ""))[:300],
            "ratingSum": 0,
            "ratingCount": 0,
            "createdAt": int(time.time() * 1000),
        }
        entries = _load()
        entries.append(new)
        entries = entries[-MAX_ENTRIES:]  # 오래된 것부터 정리
        _save(entries)
        return _send(self, 200, {"ok": True, "id": new["id"]})

    def _rate(self, entry_id, stars):
        try:
            stars = int(stars)
        except (TypeError, ValueError):
            return _send(self, 400, {"error": "별점은 1~5 사이 숫자여야 해요."})
        if not 1 <= stars <= 5:
            return _send(self, 400, {"error": "별점은 1~5 사이 숫자여야 해요."})
        entries = _load()
        for en in entries:
            if en.get("id") == entry_id:
                en["ratingSum"] = en.get("ratingSum", 0) + stars
                en["ratingCount"] = en.get("ratingCount", 0) + 1
                _save(entries)
                return _send(self, 200, {"ok": True})
        return _send(self, 404, {"error": "그 코디를 찾을 수 없어요. 이미 지워졌을 수 있어요."})
