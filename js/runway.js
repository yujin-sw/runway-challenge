// ===== 런웨이 & 랭킹 페이지 공통 =====
// 두 페이지 모두 /api/runway 에서 목록을 받아 옵니다.

function avg(entry) { return entry.ratingCount ? entry.ratingSum / entry.ratingCount : 0; }
// 종합 점수 = AI 점수의 절반(최대 50) + 별점 평균 × 10 (최대 50)
function totalScore(entry) { return Math.round(entry.aiScore * 0.5 + avg(entry) * 10); }
function stars(n) { return '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)); }

async function loadEntries(msgEl) {
  hideMsg(msgEl);
  try {
    const data = await callApi('/api/runway');
    return data.entries || [];
  } catch (e) {
    showMsg(msgEl, e.message);
    return null;
  }
}

// ---- 런웨이 페이지 ----
async function initRunway() {
  const list = document.querySelector('#entries');
  const msg = document.querySelector('#msg');
  list.innerHTML = '<p class="empty"><span class="spinner"></span> 런웨이를 준비하는 중</p>';
  const entries = await loadEntries(msg);
  if (!entries) { list.innerHTML = ''; return; }
  if (!entries.length) {
    list.innerHTML = '<p class="empty">아직 런웨이에 선 코디가 없어요. 첫 번째 모델이 되어 보세요.<br><a class="btn btn--primary btn--small" href="game.html" style="margin-top:1rem">코디하러 가기</a></p>';
    return;
  }
  const rated = getRated();
  entries.sort((a, b) => b.createdAt - a.createdAt);
  list.innerHTML = entries.map((en) => `
    <article class="entry panel" data-id="${en.id}">
      <div class="runway-floor">${renderAvatar(en.look)}</div>
      <div class="entry__title">${esc(en.title)}</div>
      <div class="entry__meta">${en.situationEmoji} ${esc(en.situation)} · ${esc(en.author)}</div>
      <div class="entry__meta">AI ${en.aiScore}점 · 별점 ${en.ratingCount ? avg(en).toFixed(1) : '없음'} (${en.ratingCount}명)</div>
      <div class="stars" role="group" aria-label="별점 주기" data-done="${rated.includes(en.id) ? 1 : 0}">
        ${[1, 2, 3, 4, 5].map((n) => `<button class="star ${rated.includes(en.id) && n <= Math.round(avg(en)) ? 'on' : ''}" data-n="${n}" aria-label="${n}점">★</button>`).join('')}
      </div>
      <small class="entry__meta">${rated.includes(en.id) ? '별점을 주셨어요' : '별을 눌러 점수를 주세요'}</small>
    </article>`).join('');

  list.addEventListener('click', async (e) => {
    const star = e.target.closest('.star');
    if (!star) return;
    const card = star.closest('.entry');
    const id = card.dataset.id;
    const n = Number(star.dataset.n);
    const group = card.querySelector('.stars');
    group.dataset.done = '1';
    group.querySelectorAll('.star').forEach((s) => s.classList.toggle('on', Number(s.dataset.n) <= n));
    try {
      await callApi('/api/runway', { method: 'POST', body: { action: 'rate', id, stars: n } });
      markRated(id);
      card.querySelector('small').textContent = `${n}점을 주셨어요. 고마워요!`;
    } catch (err) {
      group.dataset.done = '0';
      group.querySelectorAll('.star').forEach((s) => s.classList.remove('on'));
      showMsg(msg, err.message);
    }
  });
}

// ---- 랭킹 페이지 ----
async function initRanking() {
  const body = document.querySelector('#rank-body');
  const msg = document.querySelector('#msg');
  body.innerHTML = '<tr><td colspan="6"><span class="spinner"></span> 집계 중</td></tr>';
  const entries = await loadEntries(msg);
  if (!entries) { body.innerHTML = ''; return; }
  if (!entries.length) { body.innerHTML = '<tr><td colspan="6" class="empty">아직 순위가 없어요. 런웨이에 코디가 올라오면 집계돼요.</td></tr>'; return; }
  entries.sort((a, b) => totalScore(b) - totalScore(a) || b.ratingCount - a.ratingCount);
  body.innerHTML = entries.slice(0, 20).map((en, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${esc(en.title)}<br><small class="entry__meta">${en.situationEmoji} ${esc(en.situation)}</small></td>
      <td>${esc(en.author)}</td>
      <td>${en.aiScore}</td>
      <td><span style="color:var(--gold)">${stars(avg(en))}</span> ${en.ratingCount ? avg(en).toFixed(1) : '-'} (${en.ratingCount})</td>
      <td><strong>${totalScore(en)}</strong></td>
    </tr>`).join('');
}

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

if (document.querySelector('#entries')) initRunway();
if (document.querySelector('#rank-body')) initRanking();
