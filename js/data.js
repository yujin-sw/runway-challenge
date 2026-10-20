// ===== 게임 데이터 =====
// 상황 카드와 옷장 아이템은 자유롭게 바꿔서 나만의 게임으로 만드세요.

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

// color: 아바타에 칠해질 색, name: AI에게 전달되는 이름
const CLOSET = {
  top: {
    label: '상의',
    required: true,
    items: [
      { id: 't1', emoji: '👕', name: '흰색 기본 티셔츠', color: '#f5f5f5' },
      { id: 't2', emoji: '👔', name: '하늘색 셔츠', color: '#9fc5e8' },
      { id: 't3', emoji: '🧶', name: '베이지 니트', color: '#d9c3a3' },
      { id: 't4', emoji: '👚', name: '검정 블라우스', color: '#2b2b2b' },
      { id: 't5', emoji: '🎽', name: '빨간 후드티', color: '#d63b3b' },
      { id: 't6', emoji: '👗', name: '꽃무늬 원피스', color: '#e7a7c2' },
      { id: 't7', emoji: '🧥', name: '회색 맨투맨', color: '#8e8e93' },
      { id: 't8', emoji: '🥻', name: '초록 크롭탑', color: '#3f9d6e' },
    ],
  },
  bottom: {
    label: '하의',
    required: true,
    items: [
      { id: 'b1', emoji: '👖', name: '청바지', color: '#4a6fa5' },
      { id: 'b2', emoji: '🩳', name: '카키 반바지', color: '#8a8a5c' },
      { id: 'b3', emoji: '👖', name: '검정 슬랙스', color: '#2b2b2b' },
      { id: 'b4', emoji: '🩰', name: '베이지 롱스커트', color: '#e2d2b8' },
      { id: 'b5', emoji: '🩳', name: '트레이닝 팬츠', color: '#5a5a66' },
      { id: 'b6', emoji: '👖', name: '화이트 와이드팬츠', color: '#f0f0f0' },
      { id: 'b7', emoji: '🩰', name: '체크 미니스커트', color: '#b23a48' },
    ],
  },
  shoes: {
    label: '신발',
    required: true,
    items: [
      { id: 'sh1', emoji: '👟', name: '흰 운동화', color: '#fafafa' },
      { id: 'sh2', emoji: '👞', name: '갈색 로퍼', color: '#7b4b2a' },
      { id: 'sh3', emoji: '👠', name: '검정 힐', color: '#1f1f1f' },
      { id: 'sh4', emoji: '🥾', name: '등산화', color: '#5c4a32' },
      { id: 'sh5', emoji: '🩴', name: '슬리퍼', color: '#3a7bd5' },
      { id: 'sh6', emoji: '👢', name: '롱부츠', color: '#2e2a2a' },
    ],
  },
  outer: {
    label: '아우터',
    required: false,
    items: [
      { id: 'o1', emoji: '🧥', name: '트렌치코트', color: '#c8a97e' },
      { id: 'o2', emoji: '🧥', name: '검정 가죽 재킷', color: '#1c1c1c' },
      { id: 'o3', emoji: '🧥', name: '데님 재킷', color: '#5a7fb5' },
      { id: 'o4', emoji: '🧥', name: '패딩 조끼', color: '#334155' },
      { id: 'o5', emoji: '🧥', name: '네이비 블레이저', color: '#1e2f55' },
      { id: 'o6', emoji: '🌂', name: '노란 레인코트', color: '#f2c94c' },
    ],
  },
  acc: {
    label: '소품',
    required: false,
    items: [
      { id: 'a1', emoji: '🧢', name: '볼캡' },
      { id: 'a2', emoji: '🕶️', name: '선글라스' },
      { id: 'a3', emoji: '👜', name: '미니백' },
      { id: 'a4', emoji: '🎒', name: '백팩' },
      { id: 'a5', emoji: '🧣', name: '머플러' },
      { id: 'a6', emoji: '💍', name: '실버 반지' },
      { id: 'a7', emoji: '☂️', name: '투명 우산' },
    ],
  },
};

const MAX_ROUNDS = 5; // 세션당 AI 호출 횟수 제한(과금 방지)

// 아바타 SVG 생성: 선택한 아이템 색으로 마네킹을 칠합니다.
function renderAvatar(look) {
  const top = look.top?.color || '#ddd';
  const bottom = look.bottom?.color || '#ccc';
  const shoes = look.shoes?.color || '#bbb';
  const outer = look.outer?.color;
  const acc = look.acc?.emoji || '';
  return `
  <svg class="avatar" viewBox="0 0 120 220" role="img" aria-label="코디 아바타">
    <circle cx="60" cy="32" r="22" fill="#f4d3b5"/>
    <path d="M38 24 q22 -22 44 0 v6 q-22 -10 -44 0z" fill="#3b2a24"/>
    ${outer ? `<path d="M22 70 q38 -14 76 0 l10 70 h-20 l-4 -30 v70 h-48 v-70 l-4 30 h-20z" fill="${outer}"/>` : ''}
    <path d="M38 66 q22 -10 44 0 v62 h-44z" fill="${top}"/>
    ${outer ? '' : `<path d="M38 68 l-14 6 l-4 56 h14z M82 68 l14 6 l4 56 h-14z" fill="${top}"/>`}
    <path d="M40 128 h40 v58 h-16 v-40 h-8 v40 h-16z" fill="${bottom}"/>
    <path d="M38 186 h20 v14 h-22 q-4 -8 2 -14z M62 186 h20 q6 6 2 14 h-22z" fill="${shoes}"/>
    ${acc ? `<text x="88" y="24" font-size="22">${acc}</text>` : ''}
  </svg>`;
}
