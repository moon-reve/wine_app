import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import filterIcon from '../assets/list/filter-icon.svg'
import starIcon from '../assets/list/container-star.svg'
import dummyWines from '../../dummy data/wines.json'
import FilterSheet, { type WineFilters } from '../components/FilterSheet'
import WineMap from '../components/WineMap'

const wineImages = import.meta.glob('../assets/images/wines/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

type WineType = 'red' | 'white' | 'sparkling' | 'rose' | 'korean'

type DummyWine = {
  id: string
  nameKo: string
  type: WineType
  country: string
  region: string
  grape: string
  price: number
  rating: number
  imageUrl: string
}

type Wine = {
  id: string
  name: string
  region: string
  regionTextSize: string
  price: string
  priceValue: number
  rating: string
  image: string
  bgColor: string
  type: WineType
  country: string
  grape: string
}

const WINE_TYPE_BG_COLOR: Record<WineType, string> = {
  white: '#ece4a2',
  red: '#831317',
  sparkling: '#F2E9C9',
  rose: '#E8A9A0',
  korean: '#ece4a2',
}

// 상단 큐레이션 와인은 더미데이터의 ID로 직접 연결하고, 일반 목록에서는 중복 노출하지 않는다.
const CURATED_WINE_IDS = ['wine_106', 'wine_033', 'wine_023'] as const
const DUPLICATE_DUMMY_IDS = new Set<string>(CURATED_WINE_IDS)
// 아래 와인들은 리스트에서만 숨기며, 더미데이터 자체는 다른 화면에서도 사용하므로 유지한다.
const HIDDEN_FROM_LIST_IDS = new Set(['wine_003', 'wine_018', 'wine_019', 'wine_068'])

// 더미데이터의 type은 'korean'이 색이 아닌 원산지 구분이라, 국산 와인은 이름에 적힌
// 레드/화이트/로제/스파클링 표기를 우선 읽어서 배경색을 정한다. 표기가 없는 경우에만 화이트로 대체.
function resolveBgColorType(wine: DummyWine): Exclude<WineType, 'korean'> {
  if (wine.type !== 'korean') return wine.type
  if (wine.nameKo.includes('스파클링')) return 'sparkling'
  if (wine.nameKo.includes('로제')) return 'rose'
  if (wine.nameKo.includes('레드')) return 'red'
  return 'white'
}

function getRegionText(wine: DummyWine): string {
  const subRegion = wine.region.startsWith(wine.country)
    ? wine.region.slice(wine.country.length).trim()
    : wine.region
  return subRegion ? `${wine.country} · ${subRegion} · ${wine.grape}` : `${wine.country} · ${wine.grape}`
}

const dummyWineData = dummyWines as DummyWine[]

function toListWine(wine: DummyWine): Wine {
  const regionText = getRegionText(wine)
  const fileName = wine.imageUrl.split('/').pop() ?? ''

  return {
    id: wine.id,
    name: wine.nameKo,
    region: regionText,
    regionTextSize: regionText.length > 18 ? 'text-[11px]' : 'text-[12px]',
    price: `₩${wine.price.toLocaleString()}`,
    priceValue: wine.price,
    rating: wine.rating.toFixed(1),
    image: wineImages[`../assets/images/wines/${fileName}`] ?? '',
    bgColor: WINE_TYPE_BG_COLOR[resolveBgColorType(wine)],
    type: wine.type,
    country: wine.country,
    grape: wine.grape,
  }
}

const curatedWines: Wine[] = CURATED_WINE_IDS
  .map((id) => dummyWineData.find((wine) => wine.id === id))
  .filter((wine): wine is DummyWine => Boolean(wine))
  .map(toListWine)

const dummyWineList: Wine[] = dummyWineData
  .filter((wine) => !DUPLICATE_DUMMY_IDS.has(wine.id) && !HIDDEN_FROM_LIST_IDS.has(wine.id))
  .map(toListWine)

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const wines: Wine[] = shuffle([...curatedWines, ...dummyWineList])

function matchesFilters(wine: Wine, filters: WineFilters): boolean {
  if (filters.types.length > 0 && !filters.types.includes(wine.type)) return false
  if (filters.countries.length > 0 && !filters.countries.includes(wine.country)) return false
  if (filters.grapes.length > 0 && !filters.grapes.some((grape) => wine.grape.includes(grape))) return false
  if (wine.priceValue > filters.maxPrice) return false
  return true
}

type ListView = 'list' | 'map'

function List() {
  const navigate = useNavigate()
  const [view, setView] = useState<ListView>('list')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<WineFilters | null>(null)

  const visibleWines = useMemo(
    () => (appliedFilters ? wines.filter((wine) => matchesFilters(wine, appliedFilters)) : wines),
    [appliedFilters],
  )

  return (
    <div
      className={`${view === 'map' ? 'flex h-dvh min-h-0 flex-col overflow-hidden' : 'min-h-screen pb-20'} w-full bg-white text-[#0d0d0d]`}
      data-node-id="690:403"
    >
      <Header tone="light" titleColorClassName="text-black" />

      <main className={`px-5 pt-5 ${view === 'map' ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        <div className="flex items-center justify-between">
          <h1 className="font-playfair text-[32px] leading-[1.3] font-normal tracking-[-0.64px] text-[#831317]">
            List
          </h1>
          {view === 'list' && (
            <button type="button" aria-label="필터" onClick={() => setIsFilterOpen(true)}>
              <img src={filterIcon} alt="" className="h-[18px] w-[19px]" />
            </button>
          )}
        </div>

        <div className="relative mt-[27px] flex border-b border-[#7b7b7b]">
          <button
            type="button"
            onClick={() => setView('list')}
            className={`relative flex-1 pb-[10px] text-center text-[18px] leading-[1.3] tracking-[-0.36px] ${
              view === 'list' ? 'font-bold text-[#831317]' : 'font-medium text-[#aaa]'
            }`}
          >
            리스트
            {view === 'list' && <span className="absolute inset-x-0 bottom-[-1px] h-[3px] bg-[#831317]" />}
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            className={`relative flex-1 pb-[10px] text-center text-[18px] leading-[1.3] tracking-[-0.36px] ${
              view === 'map' ? 'font-bold text-[#831317]' : 'font-medium text-[#aaa]'
            }`}
          >
            지도
            {view === 'map' && <span className="absolute inset-x-0 bottom-[-1px] h-[3px] bg-[#831317]" />}
          </button>
        </div>

        {view === 'list' ? (
          <>
            <p className="mt-[22px] text-[14px] leading-[20px] text-[#534343]">전체 {visibleWines.length}종</p>

            <div className="mt-[18px]">
              {visibleWines.map((wine) => (
                <div key={wine.id}>
                  <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
                  <button
                    type="button"
                    disabled={wine.type !== 'red' && wine.type !== 'white' && wine.type !== 'rose'}
                    onClick={() => navigate(`/product/${wine.type}/${wine.id}`)}
                    className="flex min-h-[159px] w-full items-center gap-[37px] py-[24px] pl-[24px] text-left disabled:cursor-default"
                  >
                    <div
                      className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full"
                      style={{ backgroundColor: wine.bgColor }}
                    >
                      <img src={wine.image} alt={wine.name} className="h-[85%] w-auto object-contain" />
                    </div>
                    <div className="flex flex-col gap-[8px] pt-[4px]">
                      <div>
                        <p className="text-[20px] leading-[25px] font-semibold text-[#1e1b18]">{wine.name}</p>
                        <p className={`${wine.regionTextSize} leading-[25px] text-[#817f7e]`}>{wine.region}</p>
                      </div>
                      <div className="flex w-[220px] items-center justify-between">
                        <p className="text-[16px] leading-[24px] font-bold text-[#1e1b18]">{wine.price}</p>
                        <div className="flex items-center gap-[4px]">
                          <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
                          <p className="text-[16px] leading-[24px] font-bold text-[#561922]">{wine.rating}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
              <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
            </div>
          </>
        ) : (
          <div className="min-h-0 flex-1">
            <WineMap />
          </div>
        )}
      </main>

      {view === 'list' && (
        <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={setAppliedFilters} />
      )}
    </div>
  )
}

export default List
