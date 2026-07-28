import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import filterIcon from '../assets/list/filter-icon.svg'
import starIcon from '../assets/list/container-star.svg'
import heartEmptyIcon from '../assets/list/heart-empty.svg'
import heartFilledIcon from '../assets/list/heart-filled.svg'
import FilterSheet, { type WineFilters } from '../components/FilterSheet'
import WineMap from '../components/WineMap'
import { dummyWineData, toListWine, type DummyWine, type Wine } from '../data/wineCatalog'
import { useLikedWines } from '../context/LikedWinesContext'

// 상단 큐레이션 와인은 더미데이터의 ID로 직접 연결하고, 일반 목록에서는 중복 노출하지 않는다.
const CURATED_WINE_IDS = ['wine_106', 'wine_031', 'wine_033', 'wine_023'] as const
const DUPLICATE_DUMMY_IDS = new Set<string>(CURATED_WINE_IDS)
// 아래 와인들은 리스트에서만 숨기며, 더미데이터 자체는 다른 화면에서도 사용하므로 유지한다.
const HIDDEN_FROM_LIST_IDS = new Set(['wine_003', 'wine_018', 'wine_019', 'wine_068'])

const curatedWines: Wine[] = CURATED_WINE_IDS
  .map((id) => dummyWineData.find((wine) => wine.id === id))
  .filter((wine): wine is DummyWine => Boolean(wine))
  .map(toListWine)
  .map((wine) => {
    const figmaValues: Partial<Record<(typeof CURATED_WINE_IDS)[number], Partial<Wine>>> = {
      wine_106: {
        name: '테마타 에스테이트',
        region: '뉴질랜드 · 호크스 베이 · 샤도네이',
        price: '₩40,500',
        priceValue: 40500,
        rating: '4.2',
      },
      wine_031: {
        name: '샤또 몬텔레나',
        region: '미국 · 나파 밸리 · 카베르네 소비뇽',
        price: '₩89,000',
        priceValue: 89000,
        rating: '5.0',
      },
      wine_033: {
        name: '파 니엔테',
        region: '미국 · 나파 밸리 · 샤도네이',
        price: '₩159,000',
        priceValue: 159000,
        rating: '4.6',
      },
      wine_023: {
        name: '오이스터 베이',
        region: '뉴질랜드 · 말보로 · 소비뇽 블랑',
        price: '₩36,500',
        priceValue: 36500,
        rating: '3.0',
      },
    }

    return { ...wine, ...figmaValues[wine.id as (typeof CURATED_WINE_IDS)[number]] }
  })

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
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setViewState] = useState<ListView>(() => (searchParams.get('view') === 'map' ? 'map' : 'list'))
  const setView = (next: ListView) => {
    setViewState(next)
    setSearchParams((params) => {
      if (next === 'map') params.set('view', 'map')
      else params.delete('view')
      return params
    }, { replace: true })
  }
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<WineFilters | null>(null)
  const { isLiked, toggleLike } = useLikedWines()

  const visibleWines = useMemo(
    () => (appliedFilters ? wines.filter((wine) => matchesFilters(wine, appliedFilters)) : wines),
    [appliedFilters],
  )

  return (
    <div
      className={`${view === 'map' ? 'flex h-dvh-zoomed min-h-0 flex-col overflow-hidden' : 'min-h-screen pb-20'} w-full bg-white text-[#0d0d0d]`}
      data-node-id="690:403"
    >
      <Header tone="light" title="LIST" titleColorClassName="text-[#831317]" wineIcons fixedFigmaTop />

      <main className={`px-5 pt-[46px] ${view === 'map' ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        <div className="relative z-20 h-[34px] border-b border-[#7b7b7b] bg-white">
          <button
            type="button"
            onClick={() => setView('list')}
            className={`absolute top-0 w-[47px] text-center text-[18px] leading-[1.3] tracking-[-0.36px] ${
              view === 'map' ? 'left-[81px]' : 'left-[64.5px]'
            } ${
              view === 'list' ? 'font-bold text-[#831317]' : 'font-medium text-[#7b7b7b]'
            }`}
          >
            리스트
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            className={`absolute top-0 text-center text-[18px] leading-[1.3] tracking-[-0.36px] ${
              view === 'map' ? 'left-[268px] w-[47px]' : 'left-[259px] w-[48px]'
            } ${
              view === 'map' ? 'font-bold text-[#831317]' : 'font-medium text-[#aaa]'
            }`}
          >
            지도
          </button>
          {view === 'list' && <span className="absolute bottom-[-1px] left-0 z-10 h-[3px] w-[195px] bg-[#831317]" />}
          {view === 'map' && <span className="absolute right-0 bottom-[-1px] z-10 h-[3px] w-[195px] bg-[#831317]" />}
        </div>

        {view === 'list' ? (
          <>
            <div className="relative mt-5 h-5">
              <p className="text-[14px] leading-5 font-normal text-[#534343]">전체 128종</p>
              <button
                type="button"
                aria-label="필터"
                onClick={() => setIsFilterOpen(true)}
                className="absolute top-px right-[7px] h-[18px] w-[19px]"
              >
                <img src={filterIcon} alt="" className="h-[18px] w-[19px]" />
              </button>
            </div>

            <div className="mt-[34px] mb-[30px]">
              {visibleWines.map((wine, index) => (
                <div
                  key={wine.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') navigate(`/wine_detail/${wine.type}/${wine.id}`)
                  }}
                  className="relative flex h-[149.26px] w-full cursor-pointer items-start gap-[37px] pl-[24px] pt-[15px] text-left"
                >
                  <div
                    className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full"
                    style={{ backgroundColor: wine.bgColor }}
                  >
                    <img src={wine.image} alt={wine.name} className="h-[85%] w-auto object-contain" />
                  </div>
                  <div className="relative flex w-[220px] flex-col gap-[8px] pt-[4px]">
                    <div>
                      <p className="text-[20px] leading-[25px] font-semibold text-[#1e1b18]">{wine.name}</p>
                      <p className="text-[12px] leading-[25px] font-normal text-[#817f7e]">{wine.region}</p>
                    </div>
                    <div className="flex w-[220px] items-center justify-between">
                      <p className="text-[16px] leading-[24px] font-bold text-[#1e1b18]">{wine.price}</p>
                      <div className="flex items-center gap-[4px]">
                        <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
                        <p className="text-[16px] leading-[24px] font-bold text-[#831317]">{wine.rating}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={isLiked(wine.id) ? `${wine.name} 좋아요 취소` : `${wine.name} 좋아요`}
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleLike(wine.id)
                    }}
                    className="absolute top-[22px] left-[351px] flex h-[19px] w-[19px] items-center justify-center"
                  >
                    <img src={isLiked(wine.id) ? heartFilledIcon : heartEmptyIcon} alt="" className="h-full w-full" />
                  </button>
                  {index < visibleWines.length - 1 && <div className="absolute inset-x-0 top-[134.26px] h-px bg-[#d9d9d9]" />}
                </div>
              ))}
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
