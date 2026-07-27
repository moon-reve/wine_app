import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dummyWines from '../../dummy data/wines.json'
import starIcon from '../assets/list/container-star.svg'
import heartEmptyIcon from '../assets/list/heart-empty.svg'
import heartFilledIcon from '../assets/list/heart-filled.svg'
import searchBackIcon from '../assets/search/search-back-button.svg'
import searchSubmitIcon from '../assets/search/search-submit-button.svg'
import chipCloseIcon from '../assets/search/search-chip-close.svg'
import shopWinePairing from '../assets/search/shop-wine-pairing.jpg'
import shopWineTerrace from '../assets/search/shop-wine-terrace.jpg'
import Header from '../components/Header'
import { useLikedWines } from '../context/LikedWinesContext'
import { TODAY_PICK_WINE_IDS, WINE_TYPE_BG_COLOR, type WineType } from '../data/todayPickData'
import { getWineDetailData, resolveWineImage, type WineDetail } from '../data/wineDetailData'

const TODAY_PICK_TYPES: WineType[] = ['red', 'white', 'rose', 'sparkling']

const RECENT_SEARCH_STORAGE_KEY = 'wine-app:recent-searches'
const MAX_RECENT_SEARCHES = 8
const DEFAULT_RECENT_SEARCHES = ['Yellow Tail Shiraz', '19 Crimes', 'Oyster Bay', '푸칭 푸딩']
const wineImages = import.meta.glob('../assets/images/wines/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

type SearchWine = {
  id: string
  nameKo: string
  nameEn: string
  type: WineType
  country: string
  region: string
  grape: string
  vintage: string
  winery: string
  price: number
  rating: number
  imageUrl: string
  tastingNotes: string[]
  tags: string[]
}

const searchWineData = dummyWines as SearchWine[]

function loadRecentSearches() {
  try {
    const storedValue = localStorage.getItem(RECENT_SEARCH_STORAGE_KEY)
    if (!storedValue) return DEFAULT_RECENT_SEARCHES

    const storedSearches = JSON.parse(storedValue)
    const validSearches = Array.isArray(storedSearches)
      ? storedSearches.filter((term): term is string => typeof term === 'string').slice(0, MAX_RECENT_SEARCHES)
      : []

    return validSearches.length > 0 ? validSearches : DEFAULT_RECENT_SEARCHES
  } catch {
    return DEFAULT_RECENT_SEARCHES
  }
}

const NEARBY_SHOPS = [
  {
    id: 'wine-pairing',
    name: '와인 페어링',
    address: '서울 강남구 서초동',
    distance: '약 + 4.3 m',
    rating: '★★★★☆ 4.7',
    image: shopWinePairing,
    imageClassName: 'left-[-29.91%] w-[129.94%]',
  },
  {
    id: 'wine-terrace',
    name: '와인 테라스',
    address: '서울 강남구 역삼동',
    distance: '약 + 10.6 m',
    rating: '★★★★☆ 4.7',
    image: shopWineTerrace,
    imageClassName: 'left-[-18.32%] w-[136.72%]',
  },
]

type Trend = 'up' | 'down' | 'flat'

const TREND_STYLE: Record<Trend, { symbol: string; className: string }> = {
  up: { symbol: '▲', className: 'text-[#e11d2e]' },
  down: { symbol: '▼', className: 'text-[#2563eb]' },
  flat: { symbol: '－', className: 'text-[#9ca3af]' },
}

const TRENDING_SEARCHES: { text: string; trend: Trend }[] = [
  { text: '오린 스위프트 머큐리 헤드 까베르네 쇼비뇽 2021', trend: 'up' },
  { text: '샤또 디켐 2009', trend: 'down' },
  { text: '피에르 제르베 그랑 드 쎌르 NV', trend: 'flat' },
  { text: '플뢰리 쎄빠주 블랑 블랑 드 블랑 엑스트라 브뤼 2011', trend: 'up' },
  { text: '돔 페리뇽 2002', trend: 'up' },
]

function TodayPickItem({ wine, onClick }: { wine: WineDetail; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-[89px] shrink-0 flex-col items-center gap-3">
      <div
        className="flex size-[89.26px] shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: WINE_TYPE_BG_COLOR[wine.type] }}
      >
        <img src={resolveWineImage(wine)} alt={wine.nameKo} className="h-[85%] w-auto max-w-[75%] object-contain" />
      </div>
      <p className="line-clamp-2 w-[89px] text-center text-[14px] leading-[18px] font-medium tracking-[-0.5px] text-[#6b6b6b]">{wine.nameKo}</p>
    </button>
  )
}

function WineResultCard({ wine, index, onClick }: { wine: SearchWine; index: number; onClick: () => void }) {
  const { isLiked, toggleLike } = useLikedWines()
  const fileName = wine.imageUrl.split('/').pop() ?? ''
  const image = wineImages[`../assets/images/wines/${fileName}`] ?? ''
  const subRegion = wine.region.startsWith(wine.country)
    ? wine.region.slice(wine.country.length).trim()
    : wine.region
  const region = subRegion
    ? `${wine.country} · ${subRegion} · ${wine.grape}`
    : `${wine.country} · ${wine.grape}`

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onClick()
      }}
      className={`flex w-full cursor-pointer items-center gap-[37px] border-[#dcdcdc] py-[15px] pl-[24px] text-left ${
        index === 0 ? '' : 'border-t-[0.5px]'
      }`}
    >
      <div
        className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: WINE_TYPE_BG_COLOR[wine.type] }}
      >
        <img src={image} alt={wine.nameKo} className="h-[85%] w-auto object-contain" />
      </div>
      <div className="flex flex-col gap-[8px] pt-[4px]">
        <div>
          <p className="text-[18px] leading-[25px] font-semibold text-[#1e1b18]">{wine.nameKo}</p>
          <p className={`${region.length > 18 ? 'text-[11px]' : 'text-[12px]'} leading-[25px] text-[#817f7e]`}>{region}</p>
        </div>
        <div className="flex w-[220px] items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <p className="text-[16px] leading-[24px] font-bold text-[#1e1b18]">₩{wine.price.toLocaleString()}</p>
            <div className="flex items-center gap-[4px]">
              <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
              <p className="text-[16px] leading-[24px] font-bold text-[#561922]">{wine.rating.toFixed(1)}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label={isLiked(wine.id) ? `${wine.nameKo} 좋아요 취소` : `${wine.nameKo} 좋아요`}
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
    </div>
  )
}

function Search() {
  const navigate = useNavigate()
  const recentSearchScrollRef = useRef<HTMLDivElement>(null)
  const recentSearchDragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const todayPickScrollRef = useRef<HTMLDivElement>(null)
  const todayPickDragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches)

  useEffect(() => {
    localStorage.setItem(RECENT_SEARCH_STORAGE_KEY, JSON.stringify(recentSearches))
  }, [recentSearches])

  const searchResults = useMemo(() => {
    if (!searchedQuery) return []
    const searchTerms = searchedQuery.toLocaleLowerCase().split(/\s+/).filter(Boolean)

    return searchWineData.filter((wine) => {
      const searchableText = [
        wine.nameKo,
        wine.nameEn,
        wine.grape,
        wine.country,
        wine.region,
        wine.winery,
        wine.vintage,
        ...wine.tastingNotes,
        ...wine.tags,
      ].join(' ').toLocaleLowerCase()

      return searchTerms.every((term) => searchableText.includes(term))
    })
  }, [searchedQuery])

  const todayPickWines = useMemo(
    () => TODAY_PICK_TYPES.map((type) => getWineDetailData(TODAY_PICK_WINE_IDS[type][0]).wine),
    [],
  )

  const executeSearch = (term: string) => {
    const normalizedTerm = term.trim()
    if (!normalizedTerm) {
      setSearchedQuery(null)
      return
    }

    setQuery(normalizedTerm)
    setSearchedQuery(normalizedTerm)
    setRecentSearches((current) => [
      normalizedTerm,
      ...current.filter((recentTerm) => recentTerm !== normalizedTerm),
    ].slice(0, MAX_RECENT_SEARCHES))
  }

  const removeRecentSearch = (term: string) => {
    setRecentSearches((current) => current.filter((recentTerm) => recentTerm !== term))
  }

  const startRecentSearchDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !recentSearchScrollRef.current) return

    recentSearchDragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: recentSearchScrollRef.current.scrollLeft,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveRecentSearchDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = recentSearchDragRef.current
    if (!drag.active || !recentSearchScrollRef.current) return

    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) drag.moved = true
    recentSearchScrollRef.current.scrollLeft = drag.scrollLeft - distance
  }

  const endRecentSearchDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!recentSearchDragRef.current.active) return
    recentSearchDragRef.current.active = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const startTodayPickDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !todayPickScrollRef.current) return

    todayPickDragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: todayPickScrollRef.current.scrollLeft,
      moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveTodayPickDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = todayPickDragRef.current
    if (!drag.active || !todayPickScrollRef.current) return

    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) drag.moved = true
    todayPickScrollRef.current.scrollLeft = drag.scrollLeft - distance
  }

  const endTodayPickDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!todayPickDragRef.current.active) return
    todayPickDragRef.current.active = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#f9f7f7] text-[#0d0d0d]">
      <Header tone="light" wineIcons />

      <main className="px-5 pt-1.5 pb-8">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            executeSearch(query)
          }}
          className="flex h-[51px] items-center gap-2.5 rounded-[32px] border-2 border-[#831317] bg-white pr-3.5 pl-2.5"
        >
          <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-2 left-[9px] flex h-8 w-6.5 items-center justify-center">
            <img src={searchBackIcon} alt="" className="h-8 w-6.5" />
          </button>
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (!event.target.value.trim()) setSearchedQuery(null)
            }}
            placeholder="상품명을 입력하세요."
            className="absolute top-0 right-[51px] left-8 h-full min-w-0 bg-transparent text-[18px] leading-[25px] font-normal tracking-[0.3px] text-black placeholder:text-black/20 focus:outline-none"
          />
          <button type="submit" aria-label="검색" className="absolute top-1 left-[330px] flex h-[39px] w-[38px] items-center justify-center">
            <img src={searchSubmitIcon} alt="" className="h-[39px] w-[38px]" />
          </button>
        </form>

        {searchedQuery ? (
          <section className="pb-6 pt-[22px]">
            <p className="text-[14px] leading-5 text-[#534343]">
              ‘{searchedQuery}’ 검색 결과 {searchResults.length}종
            </p>
            {searchResults.length > 0 ? (
              <div className="mt-[18px]">
                {searchResults.map((wine, index) => (
                  <WineResultCard
                    key={wine.id}
                    wine={wine}
                    index={index}
                    onClick={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-60 flex-col items-center justify-center text-center">
                <p className="text-[16px] font-semibold text-[#333]">검색 결과가 없습니다.</p>
                <p className="mt-2 text-[13px] text-[#999]">다른 와인명이나 품종으로 검색해보세요.</p>
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="pt-[13px]">
              <h2 className="ml-1 text-[15px] leading-[163.65%] font-medium text-[#6b6b6b]">최근 검색 기록</h2>
              {recentSearches.length > 0 ? (
                <div
                  ref={recentSearchScrollRef}
                  onPointerDown={startRecentSearchDrag}
                  onPointerMove={moveRecentSearchDrag}
                  onPointerUp={endRecentSearchDrag}
                  onPointerCancel={endRecentSearchDrag}
                  className="mt-3 flex cursor-grab touch-pan-x gap-2.5 overflow-x-scroll overscroll-x-contain pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="flex shrink-0 items-center justify-center gap-[7px] rounded-[28px] bg-white py-1.5 pr-[13px] pl-[19px]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (recentSearchDragRef.current.moved) {
                            recentSearchDragRef.current.moved = false
                            return
                          }
                          executeSearch(term)
                        }}
                        className={`text-[15px] leading-[21.393px] font-semibold tracking-[0.25px] whitespace-nowrap ${
                          term === '푸칭 푸딩' ? 'text-[#6b6b6b]' : 'text-[#333]'
                        }`}
                      >
                        {term}
                      </button>
                      <button
                        type="button"
                        aria-label={`${term} 최근 검색어 삭제`}
                        onClick={() => {
                          if (recentSearchDragRef.current.moved) {
                            recentSearchDragRef.current.moved = false
                            return
                          }
                          removeRecentSearch(term)
                        }}
                        className="flex size-[18px] shrink-0 items-center justify-center"
                      >
                        <img src={chipCloseIcon} alt="" className="size-full" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-[18px] text-[13px] text-[#999]">최근 검색어가 없습니다.</p>
              )}
            </section>

            <section className="-mx-5 mt-6 bg-white px-5 pt-7 pb-[30px]">
              <h2 className="text-[20px] font-medium tracking-[-0.53px]">
                오늘 추천, <span className="text-[#831317]">와인</span>
              </h2>
              <div
                ref={todayPickScrollRef}
                onPointerDown={startTodayPickDrag}
                onPointerMove={moveTodayPickDrag}
                onPointerUp={endTodayPickDrag}
                onPointerCancel={endTodayPickDrag}
                className="mt-5 w-full cursor-grab touch-pan-x overflow-x-scroll overscroll-x-contain pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex w-max min-w-full gap-4 pr-5">
                  {todayPickWines.map((wine) => (
                    <TodayPickItem
                      key={wine.id}
                      wine={wine}
                      onClick={() => {
                        if (todayPickDragRef.current.moved) {
                          todayPickDragRef.current.moved = false
                          return
                        }
                        navigate(`/wine_detail/${wine.type}/${wine.id}`)
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="-mx-5 mt-3 bg-white px-5 pt-7 pb-[30px]">
              <h2 className="text-[20px] font-medium tracking-[-0.53px]">
                <span className="text-[#831317]">내 주변</span> 와인숍
              </h2>
              <div className="mt-8 flex flex-col gap-[29px]">
                {NEARBY_SHOPS.map((shop) => (
                  <div key={shop.id} className="flex h-[110px] items-center gap-[17px]">
                    <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[13px]">
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className={`absolute top-0 h-full max-w-none ${shop.imageClassName}`}
                      />
                    </div>
                    <div className="flex h-[93px] min-w-0 flex-1 flex-col justify-between">
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[20px] leading-none font-medium tracking-[-0.5348px] text-[#222]">{shop.name}</p>
                        <p className="text-[13px] leading-[115.045%] font-medium text-[#d9d9d9]">{shop.address}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-[#666]">{shop.rating}</p>
                        <p className="text-[16px] leading-none font-medium tracking-[-0.5348px] whitespace-nowrap text-[#6b6b6b]">{shop.distance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="-mx-5 mt-3 bg-white px-5 pt-7 pb-[30px]">
              <h2 className="text-[16px] font-bold text-[#111]">🔥 인기 급상승 검색어</h2>
              <ol className="mt-4 flex flex-col gap-[15px]">
                {TRENDING_SEARCHES.map((item, index) => {
                  const trend = TREND_STYLE[item.trend]
                  return (
                    <li key={item.text}>
                      <button
                        type="button"
                        onClick={() => executeSearch(item.text)}
                        className="flex items-center gap-1.5 text-left text-[14px] text-[#333]"
                      >
                        <span>{index + 1}. {item.text}</span>
                        <span className={`text-[10px] ${trend.className}`}>{trend.symbol}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default Search
