import fs from 'node:fs'

const winesPath = new URL('../dummy data/wines.json', import.meta.url)
const reviewsPath = new URL('../dummy data/reviews.json', import.meta.url)
const usersPath = new URL('../dummy data/users.json', import.meta.url)

const wines = JSON.parse(fs.readFileSync(winesPath, 'utf8'))
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'))
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
const minimumReviewsPerWine = 5

function clampRating(rating) {
  return Math.max(1, Math.min(5, Math.round(rating * 10) / 10))
}

function isSweet(wine) {
  return wine.tasting.sweetness.score >= 4 || /스위트|모스카토|아스티|Sweet|Moscato|Asti/i.test(`${wine.nameKo} ${wine.nameEn}`)
}

function reviewTemplates(wine) {
  const [firstNote = '과실', secondNote = '꽃'] = wine.tastingNotes
  const [firstFood = '가벼운 요리'] = wine.foodPairings
  const sweet = isSweet(wine)

  if (wine.type === 'red') {
    return [
      `${firstFood} 페어링으로 마셨는데 부드러운 탄닌과 진한 과일향이 음식에 잘 어울렸어요.`,
      `${firstNote}와 ${secondNote} 향이 풍부하고 탄닌이 부드러워 천천히 마시기 좋았습니다.`,
      `스테이크 페어링으로 골랐는데 밸런스가 좋고 여운이 길어서 만족스러웠어요.`,
      `오픈하고 조금 두니 부드러운 탄닌과 오크향이 살아났고 끝맛도 깔끔했습니다.`,
      `가격 대비 풍미가 깊고 과일향이 선명해서 레드 와인 입문자에게도 추천하고 싶어요.`,
    ]
  }

  if (wine.type === 'white') {
    if (sweet) {
      return [
        `${firstNote} 향과 달콤함이 기분 좋게 이어져 디저트와 함께 즐기기 좋았어요.`,
        `과일향이 풍부하고 달달하지만 산미가 받쳐줘서 생각보다 균형이 좋았습니다.`,
        `${firstFood}와 페어링하니 달콤한 풍미가 더 살아나고 여운도 길게 남아요.`,
        `차갑게 마시니 상큼한 향과 달콤함이 잘 어우러져 홈파티에서 인기가 좋았어요.`,
        `향이 화사하고 부담 없이 부드러워 와인 입문자나 선물용으로 추천합니다.`,
      ]
    }

    return [
      `${firstFood} 페어링에서는 산뜻한 산미와 미네랄감이 또렷해서 정말 잘 어울렸어요.`,
      `${firstNote}와 ${secondNote} 향이 풍부하고 드라이한 끝맛이 깔끔했습니다.`,
      `해산물 페어링으로 선택했는데 상큼한 산미가 입안을 산뜻하게 정리해줘요.`,
      `차갑게 마셨을 때 미네랄감과 과일향이 선명하고 밸런스도 좋았습니다.`,
      `깔끔한 산미와 긴 여운이 매력적이라 화이트 와인 입문자에게 추천하고 싶어요.`,
    ]
  }

  if (wine.type === 'sparkling') {
    return sweet
      ? [
          `${firstNote} 중심의 과일향과 달콤함이 풍부해서 케이크와 잘 어울렸어요.`,
          `기포가 부드럽고 달달한 풍미가 있어 홈파티에서 편하게 마시기 좋았습니다.`,
          `${firstFood} 페어링에서는 상큼한 산미 덕분에 달콤함이 무겁지 않았어요.`,
          `향이 화사하고 병 디자인도 예뻐서 선물용으로 만족스러웠습니다.`,
          `가격 대비 분위기를 잘 살려주는 스위트 스파클링이라 입문자에게 추천해요.`,
        ]
      : [
          `${firstFood} 페어링에서는 산뜻한 산미와 섬세한 기포가 아주 잘 어울렸어요.`,
          `${firstNote} 향이 풍부하고 드라이한 끝맛이 깔끔해서 식전주로 좋았습니다.`,
          `홈파티에서 열었는데 기포가 오래가고 해산물 페어링도 훌륭했어요.`,
          `상큼한 과일향과 좋은 밸런스 덕분에 한 잔씩 계속 손이 갔습니다.`,
          `특별한 날 선물용으로 골랐는데 긴 여운과 고급스러운 향이 만족스러웠어요.`,
        ]
  }

  if (wine.type === 'rose') {
    return [
      `${firstNote}와 ${secondNote} 과일향이 화사하고 산뜻한 산미가 매력적이었어요.`,
      `${firstFood} 페어링에서는 드라이하고 깔끔한 끝맛이 음식과 잘 어울렸습니다.`,
      `차갑게 마시면 과일향이 풍부하게 살아나서 브런치나 홈파티에 딱이에요.`,
      `색도 예쁘고 부드러운 질감에 밸런스가 좋아 선물용으로도 추천합니다.`,
      `상큼한 산미와 긴 여운이 인상적이라 로제 와인 입문자도 편하게 즐길 수 있어요.`,
    ]
  }

  if (sweet) {
    return [
      `${firstNote}의 개성 있는 과일향과 달콤함이 조화로워 한국 와인의 매력을 느꼈어요.`,
      `${firstFood} 페어링에서는 달달한 풍미와 산뜻한 산미가 잘 어울렸습니다.`,
      `향이 풍부하고 부드러워 홈파티에서 누구나 편하게 마시기 좋았어요.`,
      `지역 특산물의 풍미가 선명하고 병도 근사해서 선물용으로 추천합니다.`,
      `가격 대비 개성이 확실하고 끝맛이 깔끔해서 한국 와인 입문용으로 좋았어요.`,
    ]
  }

  return [
    `${firstFood} 페어링에서는 산뜻한 산미와 지역 특유의 과일향이 잘 어울렸어요.`,
    `${firstNote}와 ${secondNote} 향이 풍부하고 드라이한 끝맛이 깔끔했습니다.`,
    `한식과 페어링하기 좋고 부드러운 질감과 좋은 밸런스가 인상적이에요.`,
    `개성 있는 향과 긴 여운이 매력적이라 선물용으로도 추천하고 싶습니다.`,
    `가격 대비 완성도가 좋고 부담 없이 즐길 수 있어 한국 와인 입문자에게 좋아요.`,
  ]
}

const reviewsByWine = new Map()
for (const review of reviews) {
  const wineReviews = reviewsByWine.get(review.wineId) ?? []
  wineReviews.push(review)
  reviewsByWine.set(review.wineId, wineReviews)
}

let nextReviewNumber = reviews.reduce((maximum, review) => {
  const number = Number(review.id.match(/\d+$/)?.[0] ?? 0)
  return Math.max(maximum, number)
}, 0) + 1

for (const [wineIndex, wine] of wines.entries()) {
  const existingReviews = reviewsByWine.get(wine.id) ?? []
  const templates = reviewTemplates(wine)
  const neededCount = Math.max(0, minimumReviewsPerWine - existingReviews.length)

  for (let index = 0; index < neededCount; index += 1) {
    const templateIndex = (existingReviews.length + index) % templates.length
    const user = users[(wineIndex * 3 + index + existingReviews.length) % users.length]
    const ratingOffsets = [-0.2, 0.1, 0, -0.1, 0.2]
    const daysAgo = (wineIndex * 7 + index * 13) % 108
    const createdAt = new Date(Date.UTC(2026, 6, 20 - daysAgo, 9 + ((wineIndex + index) % 12), (wineIndex * 11 + index * 17) % 60))

    reviews.push({
      id: `review_${String(nextReviewNumber).padStart(3, '0')}`,
      wineId: wine.id,
      userId: user.id,
      rating: clampRating(wine.rating + ratingOffsets[templateIndex]),
      content: templates[templateIndex],
      createdAt: createdAt.toISOString().replace('.000Z', ''),
    })
    nextReviewNumber += 1
  }
}

reviews.sort((a, b) => Number(a.id.match(/\d+$/)?.[0] ?? 0) - Number(b.id.match(/\d+$/)?.[0] ?? 0))
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`)

console.log(`Generated ${reviews.length} reviews for ${wines.length} wines.`)
