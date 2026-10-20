// ===== 코디하기 페이지 =====
const state = {
  situation: null,
  look: { top: null, bottom: null, shoes: null, outer: null, acc: null },
  gender: 'f',
  category: 'top',
  verdict: null,     // AI 평가 결과
  round: 0,          // 이번 세션에 AI를 부른 횟수
};

const $ = (sel) => document.querySelector(sel);
const els = {
  sitEmoji: $('#sit-emoji'), sitTitle: $('#sit-title'), sitDesc: $('#sit-desc'),
  tabs: $('#tabs'), items: $('#items'), summary: $('#summary'), stage: $('#stage'),
  lookName: $('#look-name'), author: $('#author'),
  evalBtn: $('#eval-btn'), submitBtn: $('#submit-btn'), newBtn: $('#new-btn'),
  msg: $('#msg'), verdict: $('#verdict'), roundInfo: $('#round-info'),
};

function pickSituation() {
  const prev = state.situation?.id;
  let s;
  do { s = SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)]; } while (SITUATIONS.length > 1 && s.id === prev);
  state.situation = s;
  els.sitEmoji.textContent = s.emoji;
  els.sitTitle.textContent = s.title;
  els.sitDesc.textContent = s.desc;
  state.look = { top: null, bottom: null, shoes: null, outer: null, acc: null };
  state.verdict = null;
  els.verdict.hidden = true;
  els.submitBtn.disabled = true;
  hideMsg(els.msg);
  renderAll();
}

function renderTabs() {
  els.tabs.innerHTML = Object.entries(CLOSET).map(([key, cat]) => `
    <button class="tab" role="tab" data-cat="${key}" aria-selected="${state.category === key}">
      ${cat.label}${cat.required ? '' : ' (선택)'}
    </button>`).join('');
}

function renderItems() {
  const cat = CLOSET[state.category];
  const chosen = state.look[state.category];
  els.items.innerHTML = cat.items.map((it) => `
    <button class="item" data-id="${it.id}" aria-pressed="${chosen?.id === it.id}">
      <span class="item__icon">${renderItemIcon(state.category, it)}</span>${it.name}
    </button>`).join('');
}

function renderSummary() {
  const chips = Object.entries(state.look)
    .filter(([, v]) => v)
    .map(([k, v]) => `<span class="chip">${CLOSET[k].label}: ${v.emoji} ${v.name}</span>`);
  els.summary.innerHTML = chips.length ? chips.join('') : '<span class="chip">아직 고른 옷이 없어요</span>';
  els.stage.innerHTML = renderAvatar({ ...state.look, gender: state.gender });
  els.roundInfo.textContent = `AI 평가 ${state.round}/${MAX_ROUNDS}회 사용`;
}

function renderAll() { renderTabs(); renderItems(); renderSummary(); }

// ---- 이벤트 ----
els.tabs.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-cat]');
  if (!btn) return;
  state.category = btn.dataset.cat;
  renderTabs(); renderItems();
});

els.items.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-id]');
  if (!btn) return;
  const cat = CLOSET[state.category];
  const item = cat.items.find((i) => i.id === btn.dataset.id);
  // 같은 걸 다시 누르면 해제
  state.look[state.category] = state.look[state.category]?.id === item.id ? null : item;
  state.verdict = null; els.verdict.hidden = true; els.submitBtn.disabled = true;
  renderItems(); renderSummary();
});

els.newBtn.addEventListener('click', pickSituation);

document.querySelector('#gender').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-gender]');
  if (!btn) return;
  state.gender = btn.dataset.gender;
  document.querySelectorAll('#gender [data-gender]').forEach((b) => b.setAttribute('aria-selected', b === btn));
  renderSummary();
});

// 빈 입력 검사: 필수 카테고리가 비었는지
function validateLook() {
  const missing = Object.entries(CLOSET).filter(([k, c]) => c.required && !state.look[k]).map(([, c]) => c.label);
  if (missing.length) return `${missing.join(', ')}을(를) 골라 주세요. 상의·하의·신발은 꼭 필요해요.`;
  if (!els.lookName.value.trim()) return '코디 이름을 지어 주세요.';
  return null;
}

function lookPayload() {
  return {
    situation: `${state.situation.title} — ${state.situation.desc}`,
    items: Object.entries(state.look).filter(([, v]) => v).map(([k, v]) => `${CLOSET[k].label}: ${v.name}`),
  };
}

els.evalBtn.addEventListener('click', async () => {
  hideMsg(els.msg);
  const err = validateLook();
  if (err) return showMsg(els.msg, err);
  if (state.round >= MAX_ROUNDS) return showMsg(els.msg, `이번 세션에서는 AI 평가를 ${MAX_ROUNDS}번까지만 받을 수 있어요. 새로고침하면 다시 시작돼요.`, 'info');

  els.evalBtn.disabled = true;
  els.evalBtn.innerHTML = '<span class="spinner"></span> 스타일리스트가 보는 중';
  try {
    const data = await callApi('/api/evaluate', { method: 'POST', body: lookPayload() });
    state.round += 1;
    state.verdict = data;
    $('#v-score').textContent = data.score;
    $('#v-fit').textContent = data.fit;
    $('#v-comment').textContent = data.comment;
    els.verdict.hidden = false;
    els.submitBtn.disabled = false;
    els.stage.querySelector('.avatar')?.classList.add('avatar--walk');
  } catch (e) {
    showMsg(els.msg, e.message);
  } finally {
    els.evalBtn.disabled = false;
    els.evalBtn.textContent = 'AI 평가 받기';
    renderSummary();
  }
});

els.submitBtn.addEventListener('click', async () => {
  hideMsg(els.msg);
  if (!state.verdict) return showMsg(els.msg, '먼저 AI 평가를 받아야 런웨이에 설 수 있어요.');
  els.submitBtn.disabled = true;
  els.submitBtn.innerHTML = '<span class="spinner"></span> 출전 중';
  try {
    const entry = {
      title: els.lookName.value.trim().slice(0, 30),
      author: (els.author.value.trim() || '익명').slice(0, 20),
      situation: state.situation.title,
      situationEmoji: state.situation.emoji,
      look: { gender: state.gender, ...Object.fromEntries(Object.entries(state.look).map(([k, v]) => [k, v ? { emoji: v.emoji, name: v.name, color: v.color || null, kind: v.kind || null } : null])) },
      aiScore: state.verdict.score,
      aiComment: state.verdict.comment,
    };
    await callApi('/api/runway', { method: 'POST', body: { action: 'submit', entry } });
    showMsg(els.msg, '런웨이에 올라갔어요! 런웨이 페이지에서 확인해 보세요.', 'info');
    els.submitBtn.textContent = '출전 완료';
  } catch (e) {
    showMsg(els.msg, e.message);
    els.submitBtn.disabled = false;
    els.submitBtn.textContent = '런웨이에 출전하기';
  }
});

pickSituation();
