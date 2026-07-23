import reviewsData from '../../dummy data/reviews.json'
import winesData from '../../dummy data/wines.json'
import { getFrequentReviewKeywords } from '../utils/reviewKeywords'

type Score = {
  score: number
  label: string
}

export type WineDetail = {
  id: string
  nameKo: string
  nameEn: string
  type: 'red' | 'white' | 'sparkling' | 'rose'
  country: string
  region: string
  grape: string
  vintage: string
  price: number
  rating: number
  reviewCount: number
  description: string
  imageUrl: string
  winery: string
  grapeComposition: string
  alcohol: number
  volumeMl: number
  saveCount: number
  tags: string[]
  tasting: {
    sweetness: Score
    acidity: Score
    tannin: Score
    body: Score
    aroma: Score
  }
  tastingNotes: string[]
  service: {
    servingTemperature: string
    decanting: string
    drinkingWindow: string
    glass: string
    afterOpening: string
  }
  foodPairings: string[]
  aiRecommendation: string
  purchase: {
    onlineFrom: number
    offlineAvailable: boolean
  }
}

export type WineReview = {
  id: string
  wineId: string
  userId: string
  rating: number
  content: string
  createdAt: string
}

const wines = winesData as WineDetail[]
const reviews = reviewsData as WineReview[]
const wineImages = import.meta.glob('../assets/images/wines/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const typeLabels: Record<WineDetail['type'], string> = {
  red: '레드와인',
  white: '화이트와인',
  sparkling: '스파클링와인',
  rose: '로제와인',
}

export function formatPrice(price: number) {
  return `KRW ${price.toLocaleString('ko-KR')}`
}

export function formatStars(rating: number) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))
  return `${'★'.repeat(filled)}${'☆'.repeat(5 - filled)}`
}

export function resolveWineImage(wine: WineDetail) {
  const fileName = wine.imageUrl.split('/').pop() ?? ''
  return wineImages[`../assets/images/wines/${fileName}`] ?? ''
}

export function getWineDetailData(wineId: string) {
  const wine = wines.find((item) => item.id === wineId)
  if (!wine) throw new Error(`와인 상세 데이터를 찾을 수 없습니다: ${wineId}`)

  const wineReviews = reviews
    .filter((review) => review.wineId === wineId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

  const similarWines = wines
    .filter((item) => item.id !== wineId && item.type === wine.type)
    .sort((a, b) => {
      const aMatchesGrape = a.grape.includes(wine.grape) || wine.grape.includes(a.grape) ? 1 : 0
      const bMatchesGrape = b.grape.includes(wine.grape) || wine.grape.includes(b.grape) ? 1 : 0
      return bMatchesGrape - aMatchesGrape || b.rating - a.rating
    })
    .slice(0, 3)

  return {
    wine,
    wineReviews,
    similarWines,
    reviewKeywords: getFrequentReviewKeywords(reviews, wineId),
    typeLabel: typeLabels[wine.type],
  }
}
