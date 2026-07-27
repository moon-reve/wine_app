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
const CURATED_WINE_IDS = ['wine_106', 'wine_033', 'wine_023'] as const
const DUPLICATE_DUMMY_IDS = new Set<string>(CURATED_WINE_IDS)
// 아래 와인들은 리스트에서만 숨기며, 더미데이터 자체는 다른 화면에서도 사용하므로 유지한다.
const HIDDEN_FROM_LIST_IDS = new Set(['wine_003', 'wine_018', 'wine_019', 'wine_068'])

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

      <main className={`px-5 pt-[28px] ${view === 'map' ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        <div className="relative h-[34px] border-b border-[#7b7b7b]">
          <button
            type="button"
            onClick={() => setView('list')}
            className={`absolute top-0 left-[81px] w-[47px] text-center text-[18px] leading-[1.3] tracking-[-0.36px] ${
              view === 'list' ? 'font-bold text-[#831317]' : 'font-medium text-[#7b7b7b]'
            }`}
          >
            리스트
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            className={`absolute top-0 left-[268px] w-[47px] text-center text-[18px] leading-[1.3] tracking-[-0.36px] ${
              view === 'map' ? 'font-bold text-[#831317]' : 'font-medium text-[#7b7b7b]'
            }`}
          >
            지도
          </button>
          {view === 'list' && <span className="absolute bottom-[-1px] left-0 h-[3px] w-[195px] bg-[#831317]" />}
          {view === 'map' && <span className="absolute right-0 bottom-[-1px] h-[3px] w-[195px] bg-[#831317]" />}
        </div>

        {view === 'list' ? (
          <>
            <div className="mt-5 flex h-5 items-center justify-between">
              <p className="text-[14px] leading-5 font-normal text-[#534343]">전체 {visibleWines.length}종</p>
              <button type="button" aria-label="필터" onClick={() => setIsFilterOpen(true)} className="flex h-[18px] w-[19px] items-center justify-center">
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
                  <div className="relative flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <div className="absolute inset-0 opacity-40" style={{ backgroundColor: wine.bgColor }} />
                    <img src={wine.image} alt={wine.name} className="relative h-[85%] w-auto object-contain" />
                  </div>
                  <div className="flex flex-col gap-[8px] pt-[4px]">
                    <div>
                      <p className="text-[20px] leading-[25px] font-semibold text-[#1e1b18]">{wine.name}</p>
                      <p className="text-[12px] leading-[25px] font-normal text-[#817f7e]">{wine.region}</p>
                    </div>
                    <div className="flex w-[220px] items-center justify-between">
                      <div className="flex items-center gap-[10px]">
                        <p className="text-[16px] leading-[24px] font-bold text-[#1e1b18]">{wine.price}</p>
                        <div className="flex items-center gap-[4px]">
                          <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
                          <p className="text-[16px] leading-[24px] font-bold text-[#831317]">{wine.rating}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={isLiked(wine.id) ? `${wine.name} 좋아요 취소` : `${wine.name} 좋아요`}
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleLike(wine.id)
                        }}
                        className="flex h-[17px] w-[19px] shrink-0 items-center justify-center"
                      >
                        <img src={isLiked(wine.id) ? heartFilledIcon : heartEmptyIcon} alt="" className="h-full w-full" />
                      </button>
                    </div>
                  </div>
                  {index < visibleWines.length - 1 && <div className="absolute inset-x-0 top-[134.26px] h-px bg-[#dcdcdc]" />}
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
