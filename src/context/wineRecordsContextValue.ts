import { createContext, useContext } from 'react'
import wineImage1 from '../assets/mypage/figma-wine-review-01.png'
import wineImage2 from '../assets/mypage/figma-wine-review-02.png'
import wineImage3 from '../assets/mypage/figma-wine-review-03.png'

export type WineRecordEntry = {
  id: string
  name: string
  date: string
  rating: number | string
  review: string
  image: string | null
  crop?: string
  location: string
  companions: string
  pairing: string
  tastingNotes: { 향: string; 풍미: string; 여운: string }
  profileValues: Record<string, number>
  privacy: string
}

const EMPTY_TASTING_NOTES = { 향: '', 풍미: '', 여운: '' }
const EMPTY_PROFILE_VALUES: Record<string, number> = { 바디: 0, 탄닌: 0, 산도: 0, 단맛: 0 }

// 마이페이지 '와인 기록' 탭 데모용 고정 기록. localStorage에는 저장되지 않으며,
// 세션 중에만 숨김 처리가 가능하다 — 강제 새로고침하면 항상 다시 나타난다.
export const DEMO_WINE_RECORDS: WineRecordEntry[] = [
  {
    id: 'demo-1',
    name: '샤토 라퐁 로셰 2015',
    date: '2026.07.01',
    rating: '5.0',
    review: '친구들과 저녁을 먹으며 천천히 마셨다. 묵직한 가죽 향 뒤로 잘 익은 베리 향이 올라와 마지막 잔까지 편안하게 즐겼다.',
    image: wineImage1,
    crop: 'absolute top-[-9.47%] left-[-9.01%] h-[116.41%] w-[116.46%] max-w-none',
    location: '',
    companions: '',
    pairing: '',
    tastingNotes: EMPTY_TASTING_NOTES,
    profileValues: EMPTY_PROFILE_VALUES,
    privacy: '나만보기',
  },
  {
    id: 'demo-2',
    name: '클라우디 베이 소비뇽 블랑',
    date: '2026.06.25',
    rating: '4.0',
    review: '더운 날 차갑게 식혀 마시니 시트러스한 산미가 무척 상쾌했다. 은은한 열대 과실 향이 오래 남아 해산물 요리와 잘 어울렸다.',
    image: wineImage2,
    crop: 'absolute top-[-21.09%] left-[-14.79%] h-[136.83%] w-[129.44%] max-w-none',
    location: '',
    companions: '',
    pairing: '',
    tastingNotes: EMPTY_TASTING_NOTES,
    profileValues: EMPTY_PROFILE_VALUES,
    privacy: '나만보기',
  },
  {
    id: 'demo-3',
    name: '투 핸즈 엔젤스 쉐어 쉬라즈',
    date: '2026.06.10',
    rating: '4.5',
    review: '집에서 음악을 들으며 마셨다. 진한 자두와 블랙베리 풍미가 풍성했고 탄닌도 부드러웠다. 다음에는 스테이크와 다시 마시고 싶다.',
    image: wineImage3,
    crop: 'absolute top-[-29.28%] left-[-20.38%] h-[149.77%] w-[141.59%] max-w-none',
    location: '',
    companions: '',
    pairing: '',
    tastingNotes: EMPTY_TASTING_NOTES,
    profileValues: EMPTY_PROFILE_VALUES,
    privacy: '나만보기',
  },
]

const STORAGE_KEY = 'wine-records'

export function loadStoredRecords(): WineRecordEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as WineRecordEntry[]) : []
  } catch {
    return []
  }
}

export function storeRecords(records: WineRecordEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export type WineRecordsContextValue = {
  records: WineRecordEntry[]
  addRecord: (record: WineRecordEntry) => void
  deleteRecord: (id: string) => void
}

export const WineRecordsContext = createContext<WineRecordsContextValue | null>(null)

export function useWineRecords() {
  const context = useContext(WineRecordsContext)
  if (!context) throw new Error('useWineRecords must be used within a WineRecordsProvider')
  return context
}
