import fs from 'node:fs'

const winePath = new URL('../dummy data/wines.json', import.meta.url)
const wines = JSON.parse(fs.readFileSync(winePath, 'utf8'))

const wineryRows = `
wine_001|Viña San Pedro
wine_002|Montes Wines
wine_003|Montes Wines
wine_004|Viña Concha y Toro
wine_005|Viña Concha y Toro
wine_006|Dos Copas
wine_007|Casella Family Brands
wine_008|McGuigan Wines
wine_009|Two Hands Wines
wine_010|Caymus Vineyards
wine_011|Decoy Wines
wine_012|Robert Mondavi Winery
wine_013|Force & Grace
wine_014|Marchesi Antinori
wine_015|Tenuta San Guido
wine_016|Château Talbot
wine_017|Château Mont-Pérat
wine_018|Château Margaux
wine_019|Opus One Winery
wine_020|Viña Errázuriz
wine_021|Cloudy Bay
wine_022|Kim Crawford
wine_023|Oyster Bay Wines
wine_024|Villa Maria Estate
wine_025|Domaine William Fèvre
wine_026|Maison Louis Jadot
wine_027|Pascal Jolivet
wine_028|Château d'Yquem
wine_029|Dr. Loosen
wine_030|Selbach-Oster
wine_031|Chateau Montelena
wine_032|Kendall-Jackson
wine_033|Far Niente
wine_034|Santa Margherita
wine_035|Montes Wines
wine_036|Maison Trimbach
wine_037|Familia Torres
wine_038|Jacob's Creek
wine_039|Viña Carta Vieja
wine_040|Viña Concha y Toro
wine_041|Dom Pérignon
wine_042|Moët & Chandon
wine_043|Veuve Clicquot
wine_044|Krug
wine_045|Louis Roederer
wine_046|Champagne Bollinger
wine_047|Champagne Taittinger
wine_048|Champagne Pol Roger
wine_049|Perrier-Jouët
wine_050|Armand de Brignac
wine_051|G.H. Mumm
wine_052|Chandon
wine_053|Ferrari Trento
wine_054|Mionetto
wine_055|Freixenet
wine_056|Codorníu
wine_057|Paolo Saracco
wine_058|Gancia
wine_059|Martini & Rossi
wine_060|Villa M
wine_061|Château d'Esclans
wine_062|Château d'Esclans
wine_063|Château Miraval
wine_064|Château Minuty
wine_065|Maison Saint Aix
wine_066|Gérard Bertrand
wine_067|E. Guigal
wine_068|Bodegas Muga
wine_069|Sogrape
wine_070|Vidigal Wines
wine_071|Beringer Vineyards
wine_072|Casella Family Brands
wine_073|Gancia
wine_074|Villa M
wine_075|Moët & Chandon
wine_076|Veuve Clicquot
wine_077|Laurent-Perrier
wine_078|Dom Pérignon
wine_079|Piper-Heidsieck
wine_080|Louis Roederer
wine_081|오미나라
wine_082|오미나라
wine_083|그랑꼬또 와이너리
wine_084|그랑꼬또 와이너리
wine_085|그랑꼬또 와이너리
wine_086|그랑꼬또 와이너리
wine_087|도란원 샤토미소
wine_088|여포와인농장
wine_089|여포와인농장
wine_090|여포와인농장
wine_091|불휘농장 시나브로
wine_092|불휘농장 시나브로
wine_093|샤토무주
wine_094|서가원
wine_095|예산사과와인
wine_096|청도감와인
wine_097|고도리와이너리
wine_098|뱅꼬레 와이너리
wine_099|두레양조
wine_100|롯데칠성음료
wine_101|19 Crimes
wine_102|Barefoot Cellars
wine_106|Te Mata Estate`

const alcoholRows = `
14.5 14.5 14.5 13.5 13.5 13 13.5 13 14.2 14.6 14 14.5 14.5 14 14 13.5 14.5 14 14 13.5 13.5 13 13 13 12.5 13 13 13.5 8.5 10.5 13.5 13.5 14.3 12.5 14 13.5 11.5 12.5 13 13 12.5 12 12 12.5 12 12 12.5 12.5 12.5 12.5 12 12 12.5 11 11.5 11.5 6 5.5 7.5 5 13 13.5 13 12.5 13 13 13.5 12.5 11 12 10 8 7 5 12 12.5 12 12.5 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 13.5 9 12 13.5 9`

const wineryById = Object.fromEntries(wineryRows.trim().split('\n').map((row) => row.split('|')))
const alcoholById = Object.fromEntries(alcoholRows.trim().split(/\s+/).map((value, index) => [`wine_${String(index + 1).padStart(3, '0')}`, Number(value)]))

const grapeCorrections = {
  wine_041: '샤르도네·피노 누아',
  wine_045: '피노 누아·샤르도네',
  wine_059: '모스카토 비앙코',
  wine_075: '피노 누아·샤르도네·피노 뫼니에',
  wine_076: '피노 누아·샤르도네·피노 뫼니에',
  wine_077: '피노 누아',
  wine_078: '피노 누아·샤르도네',
  wine_079: '피노 누아·샤르도네·피노 뫼니에',
  wine_080: '피노 누아·샤르도네',
  wine_088: '머스캣 오브 알렉산드리아',
}

const alcoholOverrides = {
  wine_083: 13,
  wine_087: 12,
  wine_088: 12,
  wine_095: 12,
  wine_097: 10.5,
  wine_098: 12,
  wine_106: 12.5,
}

const volumeOverrides = {
  wine_087: 375,
  wine_088: 375,
  wine_095: 375,
  wine_098: 375,
}

const noteProfiles = [
  [/오미자/, ['오미자', '붉은 베리', '허브', '은은한 향신료']],
  [/청수/, ['청사과', '유자', '흰 꽃', '허브']],
  [/산머루|머루/, ['산머루', '블랙베리', '자두', '은은한 향신료']],
  [/캠벨얼리/, ['딸기', '포도', '장미', '붉은 베리']],
  [/거봉/, ['거봉', '복숭아', '흰 꽃', '꿀']],
  [/사과/, ['사과', '배', '꿀', '은은한 꽃']],
  [/감\(/, ['감', '살구', '꿀', '은은한 향신료']],
  [/모스카토|모스카토 비앙코/, ['복숭아', '머스캣', '흰 꽃', '꿀']],
  [/리슬링/, ['라임', '청사과', '복숭아', '미네랄']],
  [/게뷔르츠/, ['리치', '장미', '복숭아', '은은한 향신료']],
  [/소비뇽 블랑/, ['자몽', '패션프루트', '청사과', '허브']],
  [/피노 그리지오/, ['레몬', '배', '흰 꽃', '미네랄']],
  [/샤르도네/, ['레몬', '사과', '흰 꽃', '브리오슈']],
  [/세미용/, ['살구', '꿀', '시트러스', '바닐라']],
  [/카르메네르/, ['자두', '블랙베리', '후추', '허브']],
  [/쉬라즈|시라/, ['블랙베리', '자두', '후추', '다크 초콜릿']],
  [/산지오베제/, ['체리', '자두', '담배', '향신료']],
  [/카베르네|메를로|블렌드/, ['블랙체리', '블랙커런트', '삼나무', '바닐라']],
  [/그르나슈|가르나차|진판델|바가/, ['딸기', '라즈베리', '자몽', '흰 꽃']],
]

function notesFor(wine) {
  const key = `${wine.grape} ${wine.nameKo}`
  return noteProfiles.find(([pattern]) => pattern.test(key))?.[1] ?? ['시트러스', '붉은 과일', '흰 꽃', '은은한 향신료']
}

function isSweet(wine) {
  return /Sweet|Moscato|Asti|스위트|모스카토|디저트|d'Yquem/i.test(`${wine.nameEn} ${wine.nameKo} ${wine.description}`)
}

function tastingFor(wine) {
  const sweet = isSweet(wine)
  if (wine.type === 'red') return {
    sweetness: { score: 1, label: '드라이' }, acidity: { score: 3, label: '중간' },
    tannin: { score: 4, label: '높음' }, body: { score: 4, label: '풍부함' }, aroma: { score: 4, label: '강함' },
  }
  if (wine.type === 'white') return {
    sweetness: { score: sweet ? 5 : 1, label: sweet ? '달콤함' : '드라이' }, acidity: { score: sweet ? 3 : 4, label: sweet ? '중간' : '높음' },
    tannin: { score: 1, label: '낮음' }, body: { score: sweet ? 4 : 3, label: sweet ? '풍부함' : '중간' }, aroma: { score: 4, label: '풍부함' },
  }
  if (wine.type === 'sparkling') return {
    sweetness: { score: sweet ? 4 : 2, label: sweet ? '달콤함' : '약간 드라이' }, acidity: { score: sweet ? 3 : 4, label: sweet ? '중간' : '높음' },
    tannin: { score: 1, label: '낮음' }, body: { score: sweet ? 2 : 3, label: sweet ? '가벼움' : '중간' }, aroma: { score: 4, label: '풍부함' },
  }
  if (wine.type === 'rose') return {
    sweetness: { score: sweet ? 4 : 2, label: sweet ? '달콤함' : '약간 드라이' }, acidity: { score: 4, label: '높음' },
    tannin: { score: 1, label: '낮음' }, body: { score: 2, label: '가벼움' }, aroma: { score: 4, label: '풍부함' },
  }
  return {
    sweetness: { score: sweet ? 4 : 2, label: sweet ? '달콤함' : '약간 드라이' }, acidity: { score: 3, label: '중간' },
    tannin: { score: /레드|머루|캠벨/.test(`${wine.nameKo} ${wine.grape}`) ? 2 : 1, label: '낮음' }, body: { score: 3, label: '중간' }, aroma: { score: 4, label: '풍부함' },
  }
}

function foodPairingsFor(wine) {
  if (wine.type === 'red') return ['채끝 스테이크', '양갈비', '숙성 치즈', '버섯 요리']
  if (wine.type === 'white') return isSweet(wine) ? ['과일 타르트', '블루 치즈', '가벼운 디저트', '매콤한 요리'] : ['해산물', '구운 생선', '닭고기 요리', '샐러드']
  if (wine.type === 'sparkling') return isSweet(wine) ? ['과일 디저트', '케이크', '브런치', '매콤한 요리'] : ['굴', '카나페', '튀김 요리', '가벼운 치즈']
  if (wine.type === 'rose') return ['연어 요리', '샐러드', '피자', '가벼운 파스타']
  return /레드|머루|캠벨/.test(`${wine.nameKo} ${wine.grape}`) ? ['불고기', '갈비구이', '숙성 치즈', '버섯 요리'] : ['한식 전채', '구운 생선', '과일', '가벼운 디저트']
}

function serviceFor(wine) {
  const red = wine.type === 'red'
  const sparkling = wine.type === 'sparkling'
  const sweet = isSweet(wine)
  const premium = wine.price >= 200000
  return {
    servingTemperature: red ? '16 ~ 18°C' : sparkling ? '6 ~ 8°C' : sweet ? '6 ~ 10°C' : '8 ~ 12°C',
    decanting: red ? (premium ? '30 ~ 60분' : '20 ~ 30분') : '디캔팅 불필요',
    drinkingWindow: premium ? '2026 ~ 2040' : wine.vintage === 'NV' ? '구매 후 1 ~ 3년' : '2026 ~ 2030',
    glass: red ? '보르도 글라스' : sparkling ? '튤립형 스파클링 글라스' : '화이트 와인 글라스',
    afterOpening: sparkling ? '당일 음용 권장' : '2 ~ 3일',
  }
}

function tagsFor(wine) {
  const occasion = wine.price >= 100000 ? '선물하기 좋은' : wine.type === 'red' ? '홈파티' : '가볍게 즐기기 좋은'
  const style = isSweet(wine) ? '달콤한 와인' : wine.type === 'sparkling' ? '파티 와인' : wine.type === 'rose' ? '브런치 와인' : wine.type === 'korean' ? '우리술' : '음식과 함께'
  return [occasion, style]
}

function aiRecommendationFor(wine, notes, pairings) {
  return `${notes[0]}와 ${notes[1]} 풍미가 매력적인 ${wine.nameKo}예요. ${isSweet(wine) ? '기분 좋은 단맛을 지녀 ' : ''}${pairings[0]} 또는 ${pairings[1]}와 함께 즐겨보세요.`
}

for (const wine of wines) {
  if (grapeCorrections[wine.id]) wine.grape = grapeCorrections[wine.id]
  const tastingNotes = wine.tastingNotes ?? notesFor(wine)
  const foodPairings = wine.foodPairings ?? foodPairingsFor(wine)
  Object.assign(wine, {
    winery: wineryById[wine.id],
    grapeComposition: grapeCorrections[wine.id] ?? wine.grapeComposition ?? wine.grape,
    alcohol: alcoholOverrides[wine.id] ?? alcoholById[wine.id],
    volumeMl: volumeOverrides[wine.id] ?? wine.volumeMl ?? 750,
    saveCount: wine.saveCount ?? 100 + ((Number(wine.id.slice(-3)) * 97 + wine.reviewCount * 13) % 2900),
    tags: wine.tags ?? tagsFor(wine),
    tasting: wine.tasting ?? tastingFor(wine),
    tastingNotes,
    service: wine.service ?? serviceFor(wine),
    foodPairings,
    aiRecommendation: ['wine_018', 'wine_025'].includes(wine.id) ? wine.aiRecommendation : aiRecommendationFor(wine, tastingNotes, foodPairings),
    purchase: wine.purchase ?? { onlineFrom: wine.price, offlineAvailable: true },
  })
}

fs.writeFileSync(winePath, `${JSON.stringify(wines, null, 2)}\n`)
