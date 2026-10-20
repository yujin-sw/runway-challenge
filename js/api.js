// ===== 백엔드 호출 공통 함수 =====
// 모든 요청은 /api/... 로 보내고, 타임아웃·HTTP 오류를 한 곳에서 처리합니다.

const API_TIMEOUT_MS = 15000;

async function callApi(path, { method = 'GET', body } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    let data = null;
    try { data = await res.json(); } catch (_) { /* 본문이 JSON이 아닐 때 */ }

    if (!res.ok) {
      const detail = data?.error || `서버가 ${res.status} 오류를 돌려줬어요.`;
      throw new ApiError(detail, res.status);
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new ApiError('응답이 너무 오래 걸려요. 잠시 후 다시 시도해 주세요.', 'timeout');
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError('네트워크에 연결할 수 없어요. 인터넷 상태를 확인해 주세요.', 'network');
  } finally {
    clearTimeout(timer);
  }
}

class ApiError extends Error {
  constructor(message, code) { super(message); this.code = code; }
}

// 화면에 메시지 보여주기
function showMsg(el, text, type = 'error') {
  el.textContent = text;
  el.className = `msg msg--${type}`;
  el.hidden = false;
}
function hideMsg(el) { el.hidden = true; }

// 내가 이미 별점을 준 코디 목록 (브라우저에 저장)
const RATED_KEY = 'runway_rated';
function getRated() { try { return JSON.parse(localStorage.getItem(RATED_KEY)) || []; } catch { return []; } }
function markRated(id) { const r = getRated(); if (!r.includes(id)) { r.push(id); localStorage.setItem(RATED_KEY, JSON.stringify(r)); } }
