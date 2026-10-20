// ===== 게임 데이터 =====
// 상황 카드와 옷장 아이템은 자유롭게 바꿔서 나만의 게임으로 만드세요.
// kind: 아바타에 그릴 실루엣 종류, color: 칠할 색

const SITUATIONS = [
  { id: 's1', emoji: '🌧️', title: '비 오는 금요일 저녁 데이트', desc: '우산을 들고 걸어야 하고, 식당은 조금 격식 있는 곳이에요.' },
  { id: 's2', emoji: '🏢', title: '첫 출근 날', desc: '분위기는 자유로운 스타트업이지만 첫인상이 중요해요.' },
  { id: 's3', emoji: '🎡', title: '놀이공원에서 종일 놀기', desc: '하루 종일 걷고 뛰고 줄 서야 해요. 햇빛도 강해요.' },
  { id: 's4', emoji: '🎸', title: '친구 밴드 공연 보러 가기', desc: '지하 공연장, 사람 많고 시끄럽고 더워요.' },
  { id: 's5', emoji: '👵', title: '남자친구/여자친구 부모님 첫 인사', desc: '단정하되 너무 딱딱하지 않은 느낌이 필요해요.' },
  { id: 's6', emoji: '🏔️', title: '가을 단풍 등산', desc: '초보 코스지만 아침엔 쌀쌀하고 낮엔 더워요.' },
  { id: 's7', emoji: '📸', title: '졸업사진 촬영', desc: '사진에 오래 남아요. 유행보다 오래 봐도 괜찮은 룩이 좋아요.' },
  { id: 's8', emoji: '🎂', title: '친구 생일 홈파티', desc: '편안한 분위기지만 사진은 많이 찍을 거예요.' },
];

const CLOSET = {
  top: {
    label: '상의',
    required: true,
    items: [
      { id: 't1', emoji: '👕', name: '흰색 기본 티셔츠', color: '#f7f5f0', kind: 'tee' },
      { id: 't2', emoji: '👔', name: '하늘색 셔츠', color: '#a9cbea', kind: 'shirt' },
      { id: 't3', emoji: '🧶', name: '베이지 니트', color: '#d8c1a0', kind: 'knit' },
      { id: 't4', emoji: '👚', name: '검정 블라우스', color: '#2c2a2e', kind: 'blouse' },
      { id: 't5', emoji: '🎽', name: '빨간 후드티', color: '#cf3a3a', kind: 'hoodie' },
      { id: 't6', emoji: '👗', name: '꽃무늬 원피스', color: '#e9aec6', kind: 'dress' },
      { id: 't7', emoji: '🧥', name: '회색 맨투맨', color: '#9a9aa0', kind: 'sweat' },
      { id: 't8', emoji: '🥻', name: '초록 크롭탑', color: '#3f9d6e', kind: 'crop' },
    ],
  },
  bottom: {
    label: '하의',
    required: true,
    items: [
      { id: 'b1', emoji: '👖', name: '청바지', color: '#4b6ea3', kind: 'jeans' },
      { id: 'b2', emoji: '🩳', name: '카키 반바지', color: '#8d8a5f', kind: 'shorts' },
      { id: 'b3', emoji: '👖', name: '검정 슬랙스', color: '#2b2b2f', kind: 'slacks' },
      { id: 'b4', emoji: '🩰', name: '베이지 롱스커트', color: '#e3d3b9', kind: 'skirt-long' },
      { id: 'b5', emoji: '🩳', name: '트레이닝 팬츠', color: '#5b5b68', kind: 'training' },
      { id: 'b6', emoji: '👖', name: '화이트 와이드팬츠', color: '#f2f0ea', kind: 'wide' },
      { id: 'b7', emoji: '🩰', name: '체크 미니스커트', color: '#b23a48', kind: 'skirt-mini' },
    ],
  },
  shoes: {
    label: '신발',
    required: true,
    items: [
      { id: 'sh1', emoji: '👟', name: '흰 운동화', color: '#fafafa', kind: 'sneaker' },
      { id: 'sh2', emoji: '👞', name: '갈색 로퍼', color: '#7b4b2a', kind: 'loafer' },
      { id: 'sh3', emoji: '👠', name: '검정 힐', color: '#1f1f22', kind: 'heel' },
      { id: 'sh4', emoji: '🥾', name: '등산화', color: '#5c4a32', kind: 'hiking' },
      { id: 'sh5', emoji: '🩴', name: '슬리퍼', color: '#3a7bd5', kind: 'slipper' },
      { id: 'sh6', emoji: '👢', name: '롱부츠', color: '#2e2a2a', kind: 'boots' },
    ],
  },
  outer: {
    label: '아우터',
    required: false,
    items: [
      { id: 'o1', emoji: '🧥', name: '트렌치코트', color: '#c9a97c', kind: 'trench' },
      { id: 'o2', emoji: '🧥', name: '검정 가죽 재킷', color: '#1e1e22', kind: 'leather' },
      { id: 'o3', emoji: '🧥', name: '데님 재킷', color: '#5e82b8', kind: 'denim' },
      { id: 'o4', emoji: '🧥', name: '패딩 조끼', color: '#34435a', kind: 'vest' },
      { id: 'o5', emoji: '🧥', name: '네이비 블레이저', color: '#20325a', kind: 'blazer' },
      { id: 'o6', emoji: '🌂', name: '노란 레인코트', color: '#f3c94e', kind: 'raincoat' },
    ],
  },
  acc: {
    label: '소품',
    required: false,
    items: [
      { id: 'a1', emoji: '🧢', name: '볼캡', color: '#2f4f7a', kind: 'cap' },
      { id: 'a2', emoji: '🕶️', name: '선글라스', color: '#1c1c1c', kind: 'sunglasses' },
      { id: 'a3', emoji: '👜', name: '미니백', color: '#b8743a', kind: 'minibag' },
      { id: 'a4', emoji: '🎒', name: '백팩', color: '#3c6e5a', kind: 'backpack' },
      { id: 'a5', emoji: '🧣', name: '머플러', color: '#c75c4a', kind: 'scarf' },
      { id: 'a6', emoji: '💍', name: '실버 반지', color: '#cfd3da', kind: 'ring' },
      { id: 'a7', emoji: '☂️', name: '투명 우산', color: '#dbe9f5', kind: 'umbrella' },
    ],
  },
};

const MAX_ROUNDS = 5; // 세션당 AI 호출 횟수 제한(과금 방지)

// ===== 그리기 공통 =====
const SKIN = '#f3d2b3', SKIN_D = '#e2b893', HAIR = '#3a2a25', LINE = 'rgba(40,20,30,.22)';
const S = (c) => `stroke="${LINE}" stroke-width="1.2" stroke-linejoin="round" fill="${c}"`;

// 아바타 실루엣: 각 부위를 kind에 따라 다르게 그립니다. (viewBox 0 0 120 240)
function renderAvatar(look) {
  const top = look.top || {}, bottom = look.bottom || {}, shoes = look.shoes || {}, outer = look.outer, acc = look.acc;
  const tc = top.color || '#ddd', bc = bottom.color || '#ccc', sc = shoes.color || '#bbb';
  const tk = top.kind || 'tee', bk = bottom.kind || 'slacks', sk = shoes.kind || 'sneaker';
  const ok = outer?.kind, oc = outer?.color, ak = acc?.kind, ac = acc?.color;
  const longSleeve = ['shirt', 'knit', 'blouse', 'hoodie', 'sweat'].includes(tk);
  const outerSleeve = ok && ok !== 'vest';

  // --- 하의 ---
  let bottomSvg = '';
  const legs = (toY, w = 18, flare = 0) => `
    <path d="M${40 - flare} ${toY} L42 126 H58 L${58 + 1} ${toY} Z" ${S(bc)}/>
    <path d="M${62 - 1} ${toY} L62 126 H78 L${80 + flare} ${toY} Z" ${S(bc)}/>`;
  if (bk === 'jeans') bottomSvg = legs(196) + `<path d="M46 130 V192 M74 130 V192" stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none"/><rect x="42" y="126" width="36" height="5" fill="rgba(0,0,0,.15)"/>`;
  else if (bk === 'slacks') bottomSvg = legs(198) + `<path d="M50 130 V194 M70 130 V194" stroke="rgba(255,255,255,.12)" stroke-width="1"/>`;
  else if (bk === 'training') bottomSvg = legs(196, 18, 1) + `<path d="M44 132 V192 M76 132 V192" stroke="rgba(255,255,255,.7)" stroke-width="2"/>`;
  else if (bk === 'wide') bottomSvg = legs(200, 18, 6);
  else if (bk === 'shorts') bottomSvg = legs(160) + `<path d="M42 158 H59 M61 158 H78" stroke="rgba(0,0,0,.2)"/>`;
  else if (bk === 'skirt-long') bottomSvg = `<path d="M44 126 H76 L88 198 H32 Z" ${S(bc)}/><path d="M52 132 L46 196 M68 132 L74 196" stroke="rgba(0,0,0,.08)" fill="none"/>`;
  else if (bk === 'skirt-mini') bottomSvg = `<path d="M44 126 H76 L84 160 H36 Z" ${S(bc)}/><path d="M38 138 H82 M40 150 H80 M52 128 L48 158 M68 128 L72 158" stroke="rgba(255,255,255,.35)" stroke-width="1.4" fill="none"/>`;

  // --- 신발 ---
  let shoeSvg = '';
  const L = 50, R = 70; // 발 중심
  const foot = (cx, flip) => {
    const d = flip ? -1 : 1;
    if (sk === 'sneaker') return `<path d="M${cx - 9} 198 V206 Q${cx - 9} 212 ${cx - 3} 212 H${cx + 12 * d} Q${cx + 14 * d} 212 ${cx + 13 * d} 206 L${cx + 9} 198 Z" ${S(sc)}/><path d="M${cx - 9} 208 H${cx + 13 * d}" stroke="#fff" stroke-width="2.5"/><path d="M${cx - 5} 201 H${cx + 3}" stroke="rgba(0,0,0,.25)"/>`;
    if (sk === 'loafer') return `<path d="M${cx - 9} 199 V208 Q${cx - 9} 212 ${cx - 4} 212 H${cx + 12 * d} Q${cx + 15 * d} 212 ${cx + 13 * d} 207 L${cx + 9} 199 Z" ${S(sc)}/><path d="M${cx - 6} 203 H${cx + 6}" stroke="rgba(255,255,255,.4)" stroke-width="2"/>`;
    if (sk === 'heel') return `<path d="M${cx - 8} 199 L${cx - 8} 206 L${cx + 14 * d} 212 L${cx + 9} 199 Z" ${S(sc)}/><path d="M${cx - 7} 205 L${cx - 8} 213" stroke="${sc}" stroke-width="2.5"/>`;
    if (sk === 'hiking') return `<path d="M${cx - 10} 192 V207 Q${cx - 10} 213 ${cx - 4} 213 H${cx + 13 * d} Q${cx + 16 * d} 213 ${cx + 14 * d} 207 L${cx + 10} 199 V192 Z" ${S(sc)}/><path d="M${cx - 10} 209 H${cx + 15 * d}" stroke="#2a2420" stroke-width="3"/><path d="M${cx - 6} 195 H${cx + 6} M${cx - 6} 199 H${cx + 6} M${cx - 6} 203 H${cx + 6}" stroke="rgba(255,255,255,.5)"/>`;
    if (sk === 'slipper') return `<path d="M${cx - 9} 206 H${cx + 13 * d} Q${cx + 16 * d} 206 ${cx + 15 * d} 211 H${cx - 9} Z" ${S(sc)}/><path d="M${cx - 7} 205 Q${cx + 2} 196 ${cx + 11 * d} 205" stroke="${sc}" stroke-width="3" fill="none"/>`;
    if (sk === 'boots') return `<path d="M${cx - 9} 150 V207 Q${cx - 9} 213 ${cx - 3} 213 H${cx + 13 * d} Q${cx + 16 * d} 213 ${cx + 14 * d} 207 L${cx + 9} 199 V150 Z" ${S(sc)}/><path d="M${cx - 9} 209 H${cx + 15 * d}" stroke="rgba(0,0,0,.4)" stroke-width="2.5"/><path d="M${cx - 9} 154 H${cx + 9}" stroke="rgba(255,255,255,.2)"/>`;
    return '';
  };
  shoeSvg = foot(L, true) + foot(R, false);

  // --- 상의 ---
  const sleeveEnd = longSleeve ? 128 : 92;
  const sleeves = (c, end) => `
    <path d="M40 66 L26 72 L22 ${end} H34 L38 92 Z" ${S(c)}/>
    <path d="M80 66 L94 72 L98 ${end} H86 L82 92 Z" ${S(c)}/>`;
  const armsSkin = `<rect x="23" y="70" width="11" height="64" rx="5" fill="${SKIN}"/><rect x="86" y="70" width="11" height="64" rx="5" fill="${SKIN}"/>`;
  let topSvg = '';
  const neckRound = `<path d="M52 62 Q60 70 68 62" stroke="${LINE}" fill="${SKIN}"/>`;
  if (tk === 'tee') topSvg = sleeves(tc, 92) + `<path d="M40 64 Q60 70 80 64 L82 132 H38 Z" ${S(tc)}/>` + neckRound;
  else if (tk === 'shirt') topSvg = sleeves(tc, 128) + `<path d="M40 64 Q60 70 80 64 L82 134 H38 Z" ${S(tc)}/><path d="M60 70 V132" stroke="rgba(0,0,0,.18)"/><path d="M52 62 L60 74 L68 62 L72 66 L60 80 L48 66 Z" ${S(tc)}/><circle cx="60" cy="90" r="1.3" fill="rgba(0,0,0,.3)"/><circle cx="60" cy="104" r="1.3" fill="rgba(0,0,0,.3)"/><circle cx="60" cy="118" r="1.3" fill="rgba(0,0,0,.3)"/>`;
  else if (tk === 'knit') topSvg = sleeves(tc, 130) + `<path d="M38 64 Q60 70 82 64 L84 134 H36 Z" ${S(tc)}/><path d="M38 126 H82 M40 130 H80" stroke="rgba(0,0,0,.12)"/><path d="M46 80 V120 M53 80 V120 M60 80 V120 M67 80 V120 M74 80 V120" stroke="rgba(255,255,255,.22)" stroke-width="1.5"/>` + neckRound;
  else if (tk === 'blouse') topSvg = sleeves(tc, 128) + `<path d="M40 64 Q60 70 80 64 L84 136 H36 Z" ${S(tc)}/><path d="M50 62 L60 84 L70 62" stroke="${LINE}" fill="${SKIN}"/><path d="M60 84 V134" stroke="rgba(255,255,255,.18)"/>`;
  else if (tk === 'hoodie') topSvg = `<path d="M44 58 Q60 46 76 58 L80 70 H40 Z" ${S(tc)}/>` + sleeves(tc, 130) + `<path d="M38 64 Q60 72 82 64 L84 136 H36 Z" ${S(tc)}/><path d="M55 72 V86 M65 72 V86" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/><path d="M44 108 H76 V130 H44 Z" fill="rgba(0,0,0,.12)"/>` + neckRound;
  else if (tk === 'sweat') topSvg = sleeves(tc, 130) + `<path d="M38 64 Q60 70 82 64 L84 134 H36 Z" ${S(tc)}/><path d="M36 128 H84" stroke="rgba(0,0,0,.12)" stroke-width="3"/>` + neckRound;
  else if (tk === 'crop') topSvg = `<path d="M42 64 Q60 70 78 64 L80 106 H40 Z" ${S(tc)}/><path d="M40 64 L30 70 L30 84 H38 Z M80 64 L90 70 L90 84 H82 Z" ${S(tc)}/>` + neckRound;
  else if (tk === 'dress') {
    topSvg = sleeves(tc, 92) + `<path d="M40 64 Q60 70 80 64 L84 126 L92 196 H28 L36 126 Z" ${S(tc)}/>` + neckRound
      + `<g fill="rgba(255,255,255,.55)"><circle cx="48" cy="100" r="2.2"/><circle cx="70" cy="112" r="2.2"/><circle cx="54" cy="150" r="2.2"/><circle cx="78" cy="166" r="2.2"/><circle cx="40" cy="180" r="2.2"/><circle cx="64" cy="184" r="2.2"/></g>`;
    bottomSvg = ''; // 원피스는 하의를 덮음
  }

  // --- 아우터 ---
  let outerSvg = '';
  const oS = (end) => `<path d="M40 64 L24 70 L20 ${end} H34 L38 90 Z" ${S(oc)}/><path d="M80 64 L96 70 L100 ${end} H86 L82 90 Z" ${S(oc)}/>`;
  if (ok === 'trench') outerSvg = oS(132) + `<path d="M36 62 L50 64 L54 90 L52 176 H26 L30 90 Z" ${S(oc)}/><path d="M84 62 L70 64 L66 90 L68 176 H94 L90 90 Z" ${S(oc)}/><path d="M36 62 L54 90 L50 64 Z M84 62 L66 90 L70 64 Z" fill="rgba(0,0,0,.12)"/><rect x="28" y="118" width="64" height="6" fill="rgba(0,0,0,.25)"/><rect x="56" y="116" width="8" height="10" rx="1.5" fill="none" stroke="rgba(0,0,0,.5)"/>`;
  else if (ok === 'leather') outerSvg = oS(130) + `<path d="M38 62 L52 64 L56 86 L55 130 H34 Z" ${S(oc)}/><path d="M82 62 L68 64 L64 86 L65 130 H86 Z" ${S(oc)}/><path d="M56 86 L54 128" stroke="#9aa0a8" stroke-width="2"/><path d="M38 62 L56 86 L52 64 Z M82 62 L64 86 L68 64 Z" fill="rgba(255,255,255,.08)"/><path d="M28 72 L40 76 M92 72 L80 76" stroke="rgba(255,255,255,.2)"/>`;
  else if (ok === 'denim') outerSvg = oS(128) + `<path d="M38 62 L52 64 L55 86 L55 128 H34 Z" ${S(oc)}/><path d="M82 62 L68 64 L65 86 L65 128 H86 Z" ${S(oc)}/><rect x="40" y="94" width="12" height="12" rx="1" fill="none" stroke="rgba(255,255,255,.4)"/><rect x="68" y="94" width="12" height="12" rx="1" fill="none" stroke="rgba(255,255,255,.4)"/><circle cx="60" cy="92" r="1.5" fill="#d9c070"/><circle cx="60" cy="110" r="1.5" fill="#d9c070"/><path d="M38 62 L55 86 L52 64 Z M82 62 L65 86 L68 64 Z" fill="rgba(255,255,255,.12)"/>`;
  else if (ok === 'vest') outerSvg = `<path d="M38 62 L54 66 V128 H34 Z" ${S(oc)}/><path d="M82 62 L66 66 V128 H86 Z" ${S(oc)}/><path d="M36 82 H54 M36 98 H54 M36 114 H54 M66 82 H84 M66 98 H84 M66 114 H84" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>`;
  else if (ok === 'blazer') outerSvg = oS(130) + `<path d="M38 62 L52 64 L58 96 L56 142 H34 Z" ${S(oc)}/><path d="M82 62 L68 64 L62 96 L64 142 H86 Z" ${S(oc)}/><path d="M38 62 L58 96 L52 64 Z M82 62 L62 96 L68 64 Z" fill="rgba(255,255,255,.1)"/><circle cx="58" cy="112" r="1.6" fill="rgba(255,255,255,.5)"/>`;
  else if (ok === 'raincoat') outerSvg = `<path d="M44 56 Q60 44 76 56 L80 68 H40 Z" ${S(oc)}/>` + oS(132) + `<path d="M36 62 L58 66 L58 170 H28 L32 90 Z" ${S(oc)}/><path d="M84 62 L62 66 L62 170 H92 L88 90 Z" ${S(oc)}/><circle cx="60" cy="90" r="1.8" fill="rgba(0,0,0,.3)"/><circle cx="60" cy="112" r="1.8" fill="rgba(0,0,0,.3)"/><circle cx="60" cy="134" r="1.8" fill="rgba(0,0,0,.3)"/>`;

  // --- 소품 ---
  let accBack = '', accFront = '';
  if (ak === 'backpack') { accBack = `<rect x="30" y="66" width="60" height="62" rx="10" fill="${ac}" stroke="${LINE}"/>`; accFront = `<path d="M44 66 Q48 96 46 126 M76 66 Q72 96 74 126" stroke="${ac}" stroke-width="6" fill="none" stroke-linecap="round"/>`; }
  if (ak === 'umbrella') { accBack = `<path d="M104 86 V200" stroke="#8a8f99" stroke-width="2.5"/><path d="M98 74 Q104 60 110 74 L108 88 H100 Z" ${S(ac)}/><path d="M104 200 Q110 206 104 210" stroke="#8a8f99" stroke-width="2" fill="none"/>`; }
  if (ak === 'cap') accFront += `<path d="M38 30 Q60 6 82 30 V36 H38 Z" ${S(ac)}/><path d="M38 34 H86 Q92 36 88 40 H38 Z" ${S(ac)}/>`;
  if (ak === 'sunglasses') accFront += `<rect x="44" y="30" width="13" height="9" rx="3" fill="#1c1c1c"/><rect x="63" y="30" width="13" height="9" rx="3" fill="#1c1c1c"/><path d="M57 34 H63 M40 32 H44 M76 32 H80" stroke="#1c1c1c" stroke-width="1.5"/>`;
  if (ak === 'minibag') accFront += `<path d="M78 70 Q106 100 102 136" stroke="${ac}" stroke-width="2" fill="none"/><rect x="92" y="134" width="22" height="18" rx="4" ${S(ac)}/><path d="M92 141 H114" stroke="rgba(0,0,0,.25)"/><circle cx="103" cy="144" r="1.5" fill="#f1d27a"/>`;
  if (ak === 'scarf') accFront += `<path d="M44 58 Q60 72 76 58 L78 68 Q60 82 42 68 Z" ${S(ac)}/><path d="M68 66 L74 100 H66 L62 68 Z" ${S(ac)}/><path d="M66 90 H74" stroke="rgba(0,0,0,.2)"/>`;
  if (ak === 'ring') accFront += `<circle cx="92" cy="130" r="2.2" fill="none" stroke="${ac}" stroke-width="1.6"/><path d="M92 124 L93 126 M96 128 L94 129" stroke="#fff" stroke-width="1.2"/>`;

  // --- 몸 기본형 ---
  const body = `
    <rect x="44" y="124" width="12" height="78" rx="5" fill="${SKIN}"/>
    <rect x="64" y="124" width="12" height="78" rx="5" fill="${SKIN}"/>
    ${armsSkin}
    <rect x="54" y="50" width="12" height="14" rx="4" fill="${SKIN_D}"/>`;
  const headBack = `<path d="M36 36 Q36 10 60 10 Q84 10 84 36 L86 66 Q60 60 34 66 Z" fill="${HAIR}"/>`;
  const head = `
    <ellipse cx="60" cy="34" rx="19" ry="21" fill="${SKIN}"/>
    <path d="M40 30 Q44 12 60 12 Q76 12 80 30 Q72 22 60 26 Q50 22 40 30 Z" fill="${HAIR}"/>
    <circle cx="52.5" cy="37" r="1.8" fill="#2b1d1a"/><circle cx="67.5" cy="37" r="1.8" fill="#2b1d1a"/>
    <path d="M56 45 Q60 48 64 45" stroke="#b8705a" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <ellipse cx="48" cy="42" rx="3.5" ry="2" fill="rgba(240,120,120,.35)"/><ellipse cx="72" cy="42" rx="3.5" ry="2" fill="rgba(240,120,120,.35)"/>`;

  return `
  <svg class="avatar" viewBox="0 0 120 240" role="img" aria-label="코디 아바타">
    ${headBack}${accBack}${body}${bottomSvg}${shoeSvg}${topSvg}${outerSvg}${head}${accFront}
  </svg>`;
}

// 옷장 카드용 아이콘 (viewBox 0 0 64 64)
function renderItemIcon(cat, it) {
  const c = it.color || '#ccc', k = it.kind;
  let d = '';
  if (cat === 'top') {
    if (k === 'dress') d = `<path d="M22 10 L32 16 L42 10 L50 14 L46 24 L42 24 L52 56 H12 L22 24 L18 24 L14 14 Z" ${S(c)}/><circle cx="26" cy="38" r="1.8" fill="rgba(255,255,255,.6)"/><circle cx="38" cy="46" r="1.8" fill="rgba(255,255,255,.6)"/>`;
    else if (k === 'crop') d = `<path d="M22 12 L32 18 L42 12 L52 18 L50 28 L44 26 V40 H20 V26 L14 28 L12 18 Z" ${S(c)}/>`;
    else {
      const sleeve = ['tee'].includes(k) ? 'L58 20 L54 32 L46 30 V54 H18 V30 L10 32 L6 20' : 'L58 22 L56 48 L46 46 V54 H18 V46 L8 48 L6 22';
      d = `<path d="M22 10 L32 16 L42 10 ${sleeve} Z" ${S(c)}/>`;
      if (k === 'shirt') d += `<path d="M32 16 V54 M26 10 L32 20 L38 10" stroke="rgba(0,0,0,.25)" fill="none"/>`;
      if (k === 'hoodie') d += `<path d="M24 12 Q32 2 40 12" stroke="${LINE}" fill="${c}"/><rect x="22" y="40" width="20" height="12" fill="rgba(0,0,0,.12)"/>`;
      if (k === 'knit') d += `<path d="M22 28 V48 M28 28 V48 M34 28 V48 M40 28 V48" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>`;
      if (k === 'sweat') d += `<path d="M18 50 H46" stroke="rgba(0,0,0,.15)" stroke-width="3"/>`;
      if (k === 'blouse') d += `<path d="M26 10 L32 24 L38 10" stroke="${LINE}" fill="#f3d2b3"/>`;
    }
  } else if (cat === 'bottom') {
    if (k === 'skirt-long') d = `<path d="M22 10 H42 L52 56 H12 Z" ${S(c)}/>`;
    else if (k === 'skirt-mini') d = `<path d="M20 14 H44 L50 44 H14 Z" ${S(c)}/><path d="M16 26 H48 M18 36 H46 M28 14 L26 44 M36 14 L38 44" stroke="rgba(255,255,255,.4)" fill="none"/>`;
    else if (k === 'shorts') d = `<path d="M18 10 H46 L48 38 H34 L32 22 L30 38 H16 Z" ${S(c)}/>`;
    else { const f = k === 'wide' ? 6 : 0; d = `<path d="M18 10 H46 L${50 + f} 56 H34 L32 26 L30 56 H${14 - f} Z" ${S(c)}/>`;
      if (k === 'jeans') d += `<path d="M22 16 V52 M42 16 V52" stroke="rgba(255,255,255,.35)"/>`;
      if (k === 'training') d += `<path d="M20 14 V52 M44 14 V52" stroke="rgba(255,255,255,.7)" stroke-width="2"/>`; }
  } else if (cat === 'shoes') {
    if (k === 'boots') d = `<path d="M18 8 H36 V36 L54 46 V52 H18 Z" ${S(c)}/><path d="M18 48 H54" stroke="rgba(0,0,0,.4)" stroke-width="2"/>`;
    else if (k === 'heel') d = `<path d="M14 30 L22 24 Q40 20 54 36 V42 H28 L26 50 H22 L24 42 H14 Z" ${S(c)}/>`;
    else if (k === 'hiking') d = `<path d="M16 18 H34 V32 L54 40 V48 H16 Z" ${S(c)}/><path d="M16 45 H54" stroke="#2a2420" stroke-width="3"/><path d="M20 22 H30 M20 27 H30" stroke="rgba(255,255,255,.5)"/>`;
    else if (k === 'slipper') d = `<path d="M12 38 H52 Q56 38 54 46 H12 Z" ${S(c)}/><path d="M18 38 Q32 22 46 38" stroke="${c}" stroke-width="4" fill="none"/>`;
    else if (k === 'loafer') d = `<path d="M12 30 Q20 22 32 26 L54 36 V44 H12 Z" ${S(c)}/><path d="M22 30 H34" stroke="rgba(255,255,255,.4)" stroke-width="2.5"/>`;
    else d = `<path d="M12 28 Q18 20 30 24 L54 34 V44 H12 Z" ${S(c)}/><path d="M12 40 H54" stroke="#fff" stroke-width="3"/><path d="M18 30 L24 34 M20 27 L26 31" stroke="rgba(0,0,0,.3)"/>`;
  } else if (cat === 'outer') {
    if (k === 'vest') d = `<path d="M22 8 L32 14 L42 8 L48 12 V54 H16 V12 Z" ${S(c)}/><path d="M18 22 H46 M18 34 H46 M18 46 H46" stroke="rgba(255,255,255,.2)"/>`;
    else {
      const len = ['trench', 'raincoat'].includes(k) ? 58 : 50;
      d = `<path d="M22 8 L32 16 L42 8 L58 16 L56 44 L48 42 V${len} H16 V42 L8 44 L6 16 Z" ${S(c)}/><path d="M32 16 V${len}" stroke="rgba(0,0,0,.25)"/><path d="M22 8 L32 24 L26 12 Z M42 8 L32 24 L38 12 Z" fill="rgba(0,0,0,.12)"/>`;
      if (k === 'trench') d += `<rect x="16" y="36" width="32" height="4" fill="rgba(0,0,0,.25)"/>`;
      if (k === 'leather') d += `<path d="M30 20 V48" stroke="#9aa0a8" stroke-width="2"/>`;
      if (k === 'denim') d += `<rect x="20" y="28" width="8" height="8" fill="none" stroke="rgba(255,255,255,.5)"/><rect x="36" y="28" width="8" height="8" fill="none" stroke="rgba(255,255,255,.5)"/>`;
      if (k === 'raincoat') d += `<path d="M24 10 Q32 0 40 10" stroke="${LINE}" fill="${c}"/>`;
    }
  } else if (cat === 'acc') {
    if (k === 'cap') d = `<path d="M14 36 Q14 14 32 14 Q50 14 50 36 Z" ${S(c)}/><path d="M12 36 H54 Q60 38 56 42 H12 Z" ${S(c)}/>`;
    else if (k === 'sunglasses') d = `<rect x="8" y="26" width="20" height="14" rx="5" fill="#1c1c1c"/><rect x="36" y="26" width="20" height="14" rx="5" fill="#1c1c1c"/><path d="M28 32 H36" stroke="#1c1c1c" stroke-width="2"/>`;
    else if (k === 'minibag') d = `<path d="M24 24 Q32 8 40 24" stroke="${c}" stroke-width="2.5" fill="none"/><rect x="14" y="24" width="36" height="28" rx="6" ${S(c)}/><path d="M14 34 H50" stroke="rgba(0,0,0,.25)"/><circle cx="32" cy="40" r="2.5" fill="#f1d27a"/>`;
    else if (k === 'backpack') d = `<rect x="16" y="14" width="32" height="42" rx="9" ${S(c)}/><path d="M24 14 Q32 6 40 14" stroke="${c}" stroke-width="3" fill="none"/><rect x="22" y="34" width="20" height="14" rx="3" fill="rgba(0,0,0,.15)"/>`;
    else if (k === 'scarf') d = `<path d="M14 22 Q32 34 50 22 L52 32 Q32 46 12 32 Z" ${S(c)}/><path d="M38 30 L46 56 H36 L30 32 Z" ${S(c)}/>`;
    else if (k === 'ring') d = `<circle cx="32" cy="36" r="13" fill="none" stroke="${c}" stroke-width="5"/><path d="M26 22 L32 14 L38 22 Z" fill="#dfe6ef" stroke="${LINE}"/>`;
    else if (k === 'umbrella') d = `<path d="M10 32 Q32 6 54 32 Z" ${S(c)}/><path d="M32 32 V52 Q32 58 26 56" stroke="#8a8f99" stroke-width="2.5" fill="none"/>`;
  }
  return `<svg viewBox="0 0 64 64" width="44" height="44" aria-hidden="true">${d}</svg>`;
}
