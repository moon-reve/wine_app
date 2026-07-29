import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import filterIcon from '../assets/list/filter-icon.svg'
import FilterSheet, { type WineFilters } from '../components/FilterSheet'
import WineListCard from '../components/WineListCard'
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
      <Header tone="light" title="LIST" titleColorClassName="text-[#831317]" wineIcons />

      <main className={`px-5 pt-5 ${view === 'map' ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
        <nav aria-label="리스트 보기 방식" className="relative z-20 grid h-[34px] w-full grid-cols-2 border-b border-black/15 bg-white font-noto">
          <button
            type="button"
            aria-current={view === 'list' ? 'page' : undefined}
            onClick={() => setView('list')}
            className={`relative pb-[11px] text-center text-base leading-[1.3] font-bold tracking-[-0.48px] ${
              view === 'list' ? 'text-[#831317]' : 'text-[#737373]'
            }`}
          >
            리스트
            {view === 'list' && <span className="absolute -bottom-px left-0 h-[3px] w-full bg-[#831317]" />}
          </button>
          <button
            type="button"
            aria-current={view === 'map' ? 'page' : undefined}
            onClick={() => setView('map')}
            className={`relative pb-[11px] text-center text-base leading-[1.3] font-bold tracking-[-0.48px] ${
              view === 'map' ? 'text-[#831317]' : 'text-[#737373]'
            }`}
          >
            지도
            {view === 'map' && <span className="absolute -bottom-px left-0 h-[3px] w-full bg-[#831317]" />}
          </button>
        </nav>

        {view === 'list' ? (
          <>
            <div className="relative mt-5 h-5">
              <p className="text-[14px] leading-5 font-normal text-[#534343]">전체 {visibleWines.length}종</p>
              <button
                type="button"
                aria-label="필터"
                onClick={() => setIsFilterOpen(true)}
                className="absolute top-px right-[7px] h-[18px] w-[19px]"
              >
                <img src={filterIcon} alt="" className="h-[18px] w-[19px]" />
              </button>
            </div>
            <div className="mt-5 h-px" />

            <div className="mt-[34px] mb-[30px]">
              {visibleWines.map((wine, index) => (
                <WineListCard
                  key={wine.id}
                  wine={wine}
                  isLiked={isLiked(wine.id)}
                  showDivider={index < visibleWines.length - 1}
                  onOpen={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)}
                  onToggleLike={() => toggleLike(wine.id)}
                />
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
