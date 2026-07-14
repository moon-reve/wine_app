import { useMemo, useState } from 'react'
import Header from '../components/Header'
import filterIcon from '../assets/list/filter-icon.svg'
import starIcon from '../assets/list/container-star.svg'
import bottleTematata from '../assets/list/bottle-tematata.png'
import bottleFarNiente from '../assets/list/bottle-far-niente.png'
import bottleOysterBay from '../assets/list/bottle-oyster-bay.png'
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

// 기존 큐레이션 4종과 이름이 겹치는 더미데이터 항목(같은 와인의 다른 빈티지)은 중복 노출을 피하기 위해 제외
const DUPLICATE_DUMMY_IDS = new Set(['wine_023', 'wine_031', 'wine_033'])

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

const curatedWines: Wine[] = [
  {
    id: 'tematata',
    name: '테마타 에스테이트',
    region: '뉴질랜드 · 호크스 베이 · 샤도네이',
    regionTextSize: 'text-[11px]',
    price: '₩40,500',
    priceValue: 40500,
    rating: '4.2',
    image: bottleTematata,
    bgColor: WINE_TYPE_BG_COLOR.white,
    type: 'white',
    country: '뉴질랜드',
    grape: '샤도네이',
  },
  {
    id: 'far-niente',
    name: '파 니엔테',
    region: '미국 · 나파 밸리 · 샤도네이',
    regionTextSize: 'text-[12px]',
    price: '₩159,000',
    priceValue: 159000,
    rating: '4.6',
    image: bottleFarNiente,
    bgColor: WINE_TYPE_BG_COLOR.white,
    type: 'white',
    country: '미국',
    grape: '샤도네이',
  },
  {
    id: 'oyster-bay',
    name: '오이스터 베이',
    region: '뉴질랜드 · 말보로 · 소비뇽 블랑',
    regionTextSize: 'text-[12px]',
    price: '₩36,500',
    priceValue: 36500,
    rating: '3.0',
    image: bottleOysterBay,
    bgColor: WINE_TYPE_BG_COLOR.white,
    type: 'white',
    country: '뉴질랜드',
    grape: '소비뇽 블랑',
  },
]

const dummyWineList: Wine[] = (dummyWines as DummyWine[])
  .filter((wine) => !DUPLICATE_DUMMY_IDS.has(wine.id))
  .map((wine) => {
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
  })

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
  const [view, setView] = useState<ListView>('list')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<WineFilters | null>(null)

  const visibleWines = useMemo(
    () => (appliedFilters ? wines.filter((wine) => matchesFilters(wine, appliedFilters)) : wines),
    [appliedFilters],
  )

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="690:403">
      <Header tone="light" titleColorClassName="text-black" />

      <main className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <h1
            className="font-playfair text-[38px] leading-[1.6] font-bold text-[#831317]"
            style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}
          >
            LIST
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
                  <div className="flex items-start gap-[37px] py-[24px] pl-[24px]">
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
                  </div>
                </div>
              ))}
              <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
            </div>
          </>
        ) : (
          <WineMap />
        )}
      </main>

      {view === 'list' && (
        <FilterSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={setAppliedFilters} />
      )}
    </div>
  )
}

export default List
