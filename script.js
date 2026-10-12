const fortuneData = {
  money: {
    high: ['작은 이득이 이어져 기분 좋은 하루예요.', '아껴둔 감각이 빛나요. 현명한 선택에 행운이!', '뜻밖의 절약이 작은 보너스처럼 느껴져요.'],
    mid: ['지갑을 열기 전 한 번만 더 생각해 보세요.', '계획한 만큼만 써도 충분히 만족스러워요.', '익숙한 소비 습관을 점검하기 좋은 날이에요.'],
    low: ['충동구매는 잠깐 보류, 통장이 고마워할 거예요.', '오늘은 지키는 것이 버는 것과 같아요.', '큰 결정보다 꼼꼼한 확인이 행운을 불러요.']
  },
  career: {
    high: ['미뤄둔 일을 시작하기 딱 좋은 타이밍!', '당신의 아이디어가 좋은 반응을 얻을 수 있어요.', '한 걸음 먼저 내디디면 흐름이 따라옵니다.'],
    mid: ['차분히 마무리하면 신뢰가 쌓이는 날이에요.', '속도보다 정확함이 좋은 결과를 만들어요.', '작은 진전도 오늘은 충분히 의미 있어요.'],
    low: ['급할수록 체크리스트가 든든한 편이 되어줘요.', '혼자 끌어안지 말고 가볍게 도움을 요청해 보세요.', '오늘의 최선은 무리하지 않는 페이스예요.']
  },
  love: {
    high: ['먼저 건넨 다정한 말이 설렘으로 돌아와요.', '솔직한 마음을 전하기 좋은 순간이 찾아와요.', '당신의 매력이 자연스럽게 빛나는 하루예요.'],
    mid: ['잘 듣는 것만으로 마음이 가까워질 수 있어요.', '부담 없는 안부가 기분 좋은 연결을 만들어요.', '나를 챙기는 마음이 좋은 인연의 시작이에요.'],
    low: ['답을 서두르지 말고 서로의 속도를 맞춰보세요.', '오늘은 내 마음부터 다정하게 돌봐주세요.', '오해가 생기면 짧은 확인 한마디가 도움이 돼요.']
  },
  luck: {
    high: ['우연처럼 온 기회, 반갑게 잡아보세요!', '좋은 흐름이 곁에 있어요. 가볍게 도전해 봐요.', '작은 외출이나 새로운 선택에 행운이 따라요.'],
    mid: ['평소의 루틴 안에서 반가운 발견이 있어요.', '익숙한 길에서 뜻밖의 기분 전환을 만나겠어요.', '주변을 살피면 놓쳤던 기회가 보여요.'],
    low: ['서두르지 않으면 작은 행운도 제때 찾아와요.', '익숙하고 편안한 선택이 오늘의 정답이에요.', '작은 변수를 여유로 넘기면 하루가 편안해져요.']
  }
};

const colors = [
  { name: '세이지 그린', hex: '#93a38b' },
  { name: '웜 샌드', hex: '#c6aa83' },
  { name: '더스티 블루', hex: '#8ea5b0' },
  { name: '로즈 브라운', hex: '#b9857c' },
  { name: '라벤더 그레이', hex: '#a39cb8' },
  { name: '버터 옐로', hex: '#d5c17c' }
];
const items = ['좋아하는 펜', '작은 손수건', '이어폰', '텀블러', '메모 한 장', '편안한 양말', '따뜻한 차', '동전 지갑'];
const keys = ['money', 'career', 'love', 'luck'];
const labels = ['오늘은 운이 참 좋은 날이에요. 작은 기회도 크게 피어나겠어요.', '좋은 기운이 곁에 머물러요. 마음 가는 쪽으로 한 걸음!', '무난한 흐름 속에 반가운 순간이 숨어 있어요.', '천천히 가도 괜찮아요. 오늘의 당신은 충분히 잘하고 있어요.', '예상 밖의 변수도 내 편으로 만드는 여유가 있어요.', '오늘은 작은 친절 하나가 행운의 시작이 될 거예요.'];

const dateEl = document.querySelector('#today-date');
const button = document.querySelector('#draw-button');
const card = document.querySelector('.fortune-card');
const scoreEl = document.querySelector('#total-score');
const captionEl = document.querySelector('#score-caption');
const commentEl = document.querySelector('#fortune-comment');
const colorEl = document.querySelector('#lucky-color');
const colorDot = document.querySelector('#color-dot');
const itemEl = document.querySelector('#lucky-item');

dateEl.textContent = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Seoul'
}).format(new Date());

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function commentFor(key, score) {
  const level = score >= 75 ? 'high' : score >= 45 ? 'mid' : 'low';
  return pick(fortuneData[key][level]);
}

function drawFortune() {
  if (button.disabled) return;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.querySelector('.button-label').textContent = '오늘의 흐름을 읽는 중';
  card.classList.add('is-drawing');
  captionEl.textContent = '잠시만 기다려 주세요';
  commentEl.textContent = '오늘의 가능성을 살펴보는 중…';

  window.setTimeout(() => {
    const scores = Object.fromEntries(keys.map(key => [key, Math.floor(Math.random() * 61) + 40]));
    const total = Math.round(keys.reduce((sum, key) => sum + scores[key], 0) / keys.length);
    const color = pick(colors);

    scoreEl.textContent = total;
    captionEl.textContent = total >= 80 ? '기대해도 좋은 하루' : total >= 60 ? '기분 좋은 흐름이에요' : '차분하게 채워가는 하루';
    commentEl.textContent = pick(labels);
    document.querySelector('#score-ring').style.setProperty('--progress', `${total}%`);

    document.querySelectorAll('.category-row').forEach(row => {
      const key = row.dataset.key;
      const score = scores[key];
      row.querySelector('.category-score').textContent = score;
      row.querySelector('.meter-fill').style.width = `${score}%`;
      row.setAttribute('aria-label', `${row.querySelector('.category-name').textContent}: ${score}점. ${commentFor(key, score)}`);
    });
    colorEl.textContent = color.name;
    colorDot.style.backgroundColor = color.hex;
    colorDot.setAttribute('aria-label', color.name);
    itemEl.textContent = pick(items);
    card.classList.remove('is-drawing');
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.querySelector('.button-label').textContent = '다시 뽑기';
  }, 850);
}

button.addEventListener('click', drawFortune);
