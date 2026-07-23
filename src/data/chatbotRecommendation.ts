import winesData from '../../dummy data/wines.json'
import type { WineDetail } from './wineDetailData'

export type WineRecommendationRequest = {
  food: string
  mood: string
  priceRange: string
}

export type ChatbotLocationState = {
  from?: string
  recommendationRequest?: WineRecommendationRequest
}

const wines = winesData as WineDetail[]

const foodKeywords: Record<string, string[]> = {
  스테이크: ['스테이크', '소고기', '육류', '양갈비'],
  파스타: ['파스타', '토마토', '크림'],
  해산물: ['해산물', '생선', '연어', '새우', '조개', '굴'],
  치즈: ['치즈', '브리', '고다', '파르미지아노'],
}

const moodKeywords: Record<string, string[]> = {
  혼술: ['혼술', '가벼운', '데일리'],
  데이트: ['데이트', '로맨틱'],
  기념일: ['기념일', '선물', '특별'],
  친구들과: ['친구', '홈파티', '파티'],
}

function isInPriceRange(price: number, priceRange: string) {
  if (priceRange === '2만원 이하') return price <= 20_000
  if (priceRange === '2~5만원') return price > 20_000 && price <= 50_000
  if (priceRange === '5~10만원') return price > 50_000 && price <= 100_000
  if (priceRange === '10만원 이상') return price > 100_000
  return true
}

function wineSearchText(wine: WineDetail) {
  return [
    wine.nameKo,
    wine.nameEn,
    wine.description,
    wine.aiRecommendation,
    ...wine.tags,
    ...wine.foodPairings,
    ...wine.tastingNotes,
  ]
    .join(' ')
    .toLowerCase()
}

function recommendationScore(wine: WineDetail, request: WineRecommendationRequest) {
  const text = wineSearchText(wine)
  const foodScore = (foodKeywords[request.food] ?? [request.food]).filter((keyword) =>
    text.includes(keyword.toLowerCase()),
  ).length
  const moodScore = (moodKeywords[request.mood] ?? [request.mood]).filter((keyword) =>
    text.includes(keyword.toLowerCase()),
  ).length

  let typeBonus = 0
  if (request.food === '스테이크' && wine.type === 'red') typeBonus += 5
  if (request.food === '해산물' && (wine.type === 'white' || wine.type === 'sparkling')) typeBonus += 5
  if (request.mood === '데이트' && (wine.type === 'rose' || wine.type === 'sparkling')) typeBonus += 2
  if (request.mood === '기념일' && wine.type === 'sparkling') typeBonus += 4
  if (request.mood === '친구들과' && wine.type === 'sparkling') typeBonus += 2

  return foodScore * 6 + moodScore * 4 + typeBonus + wine.rating
}

function recommendationReason(wine: WineDetail, request: WineRecommendationRequest) {
  const pairings = wine.foodPairings.filter((pairing) =>
    (foodKeywords[request.food] ?? [request.food]).some((keyword) => pairing.includes(keyword)),
  )
  if (pairings.length) return `${pairings.slice(0, 2).join(', ')}와 잘 어울리는 와인이에요.`
  if (wine.aiRecommendation) return wine.aiRecommendation
  return `${wine.tastingNotes.slice(0, 2).join(', ')} 풍미가 ${request.mood} 분위기에 잘 맞아요.`
}

export function buildRecommendationQuestion(request: WineRecommendationRequest) {
  return `${request.food}에 어울리고, ${request.mood} 분위기에서 즐길 ${request.priceRange} 와인을 추천해줘`
}

export function buildRecommendationAnswer(request: WineRecommendationRequest) {
  const inBudget = wines.filter((wine) => isInPriceRange(wine.price, request.priceRange))
  const candidates = (inBudget.length ? inBudget : wines)
    .map((wine) => ({ wine, score: recommendationScore(wine, request) }))
    .sort((a, b) => b.score - a.score || b.wine.rating - a.wine.rating)
    .slice(0, 3)
    .map(({ wine }) => wine)

  const recommendations = candidates
    .map(
      (wine, index) =>
        `${index + 1}. ${wine.nameKo}\n${wine.nameEn}\nKRW ${wine.price.toLocaleString('ko-KR')}\n${recommendationReason(wine, request)}`,
    )
    .join('\n\n')

  return `선택한 조건을 기억했어요.

음식 · ${request.food}
분위기 · ${request.mood}
가격대 · ${request.priceRange}

이 조건에는 다음 와인을 추천해요.

${recommendations}

가장 먼저 고른다면 1번 와인을 추천해요. 원하시면 취향에 맞춰 더 자세히 비교해드릴게요.`
}
