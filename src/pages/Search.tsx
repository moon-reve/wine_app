import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dummyWines from '../../dummy data/wines.json'
import starIcon from '../assets/list/container-star.svg'
import heartEmptyIcon from '../assets/list/heart-empty.svg'
import heartFilledIcon from '../assets/list/heart-filled.svg'
import chipCloseIcon from '../assets/search/search-chip-close.svg'
import searchSubmitIcon from '../assets/search/search-submit-figma-original.svg'
import Header from '../components/Header'
import { useLikedWines } from '../context/likedWinesContextValue'
import { TODAY_PICK_WINE_IDS, WINE_TYPE_BG_COLOR, type WineType } from '../data/todayPickData'
import { getWineDetailData, resolveWineImage, type WineDetail } from '../data/wineDetailData'
import { loadKakaoMaps, type KakaoPlace } from '../lib/kakaoMaps'

const TODAY_PICK_TYPES: WineType[] = ['red', 'white', 'rose', 'sparkling']
const WINE_TYPE_SEARCH_LABELS: Record<WineType, string> = {
  red: '레드',
  white: '화이트',
  rose: '로제',
  sparkling: '스파클링',
}

function SearchSubmitIcon() {
  return <img src={searchSubmitIcon} alt="" className="h-[39px] w-[38px]" />
}

const RECENT_SEARCH_STORAGE_KEY = 'wine-app:recent-searches'
const MAX_RECENT_SEARCHES = 8
const DEFAULT_RECENT_SEARCHES = ['Yellow Tail Shiraz', '19 Crimes', 'Oyster Bay', '푸칭 푸딩']
const wineImages = import.meta.glob('../assets/images/wines/*.webp', {
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

    return validSearches
  } catch {
    return DEFAULT_RECENT_SEARCHES
  }
}

type NearbyShop = KakaoPlace & { image: string | null }

function formatDistance(distance: string) {
  const distanceInMeters = Number(distance)
  if (!Number.isFinite(distanceInMeters)) return ''
  if (distanceInMeters < 1000) return `약 ${Math.round(distanceInMeters)}m`
  return `약 ${(distanceInMeters / 1000).toFixed(1)}km`
}

function formatCategory(categoryName: string) {
  return categoryName.split('>').map((category) => category.trim()).filter(Boolean).at(-1) || '와인숍'
}

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
    <button type="button" onClick={onClick} className="flex min-w-0 flex-col items-center gap-3">
      <div
        className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: WINE_TYPE_BG_COLOR[wine.type] }}
      >
        <img src={resolveWineImage(wine)} alt={wine.nameKo} className="h-[85%] w-auto max-w-[75%] object-contain" />
      </div>
      <p className="line-clamp-2 w-full text-center text-[12px] leading-[16px] font-medium tracking-[-0.5px] text-[#6b6b6b]">{wine.nameKo}</p>
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
      data-guide-target
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
  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>(loadRecentSearches)
  const [nearbyShops, setNearbyShops] = useState<NearbyShop[]>([])
  const [nearbyShopStatus, setNearbyShopStatus] = useState('현재 위치 주변의 와인숍을 찾고 있어요.')

  useEffect(() => {
    localStorage.setItem(RECENT_SEARCH_STORAGE_KEY, JSON.stringify(recentSearches))
  }, [recentSearches])

  useEffect(() => {
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY?.trim()
    let cancelled = false

    if (!appKey) {
      setNearbyShopStatus('카카오 지도 키가 설정되지 않았습니다.')
      return
    }

    if (!navigator.geolocation) {
      setNearbyShopStatus('현재 위치를 확인할 수 없는 기기입니다.')
      return
    }

    const getCurrentPosition = () => new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000,
      })
    })

    void Promise.all([loadKakaoMaps(appKey), getCurrentPosition()])
      .then(([kakaoMaps, position]) => {
        if (cancelled) return

        const placeService = new kakaoMaps.services.Places()
        const options = {
          location: new kakaoMaps.LatLng(position.coords.latitude, position.coords.longitude),
          radius: 20000,
          sort: kakaoMaps.services.SortBy.DISTANCE,
        }

        const searchPlaces = (keyword: string) => new Promise<KakaoPlace[]>((resolve) => {
          placeService.keywordSearch(keyword, (places, status) => {
            resolve(status === kakaoMaps.services.Status.OK ? places : [])
          }, options)
        })

        return searchPlaces('와인샵').then((wineShops) => (
          wineShops.length > 0 ? wineShops : searchPlaces('와인바')
        ))
      })
      .then((places) => {
        if (cancelled || !places) return

        const nearestPlaces = places.slice(0, 2)
        setNearbyShops(nearestPlaces.map((place) => ({ ...place, image: null })))
        setNearbyShopStatus(nearestPlaces.length > 0 ? '' : '현재 위치 주변에 검색된 와인숍이 없습니다.')

        nearestPlaces.forEach((place) => {
          void fetch(`/api/place-image?v=4&url=${encodeURIComponent(place.place_url)}`)
            .then((response) => (response.ok ? response.json() : { image: null }))
            .then((data: { image: string | null }) => {
              if (cancelled) return
              setNearbyShops((current) => current.map((shop) => (
                shop.id === place.id ? { ...shop, image: data.image } : shop
              )))
            })
            .catch(() => undefined)
        })
      })
      .catch(() => {
        if (!cancelled) setNearbyShopStatus('주변 와인숍을 보려면 위치 권한을 허용해주세요.')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const searchResults = useMemo(() => {
    if (!searchedQuery) return []
    const searchTerms = searchedQuery.toLocaleLowerCase().split(/\s+/).filter(Boolean)

    return searchWineData.filter((wine) => {
      const searchableText = [
        wine.nameKo,
        wine.nameEn,
        wine.type,
        WINE_TYPE_SEARCH_LABELS[wine.type],
        wine.grape,
        wine.country,
        wine.region,
        wine.region.includes('샹파뉴') ? '샴페인 champagne' : '',
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
    if ((event.target as HTMLElement).closest('button')) return

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

  return (
    <div className="min-h-screen w-full bg-[#f9f7f7] text-[#0d0d0d]">
      <Header tone="light" wineIcons showBackButton showSearchButton={false} />

      <main className="px-5 pt-1.5 pb-8">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            executeSearch(query)
          }}
          className="relative flex h-[51px] items-center gap-2.5 rounded-[32px] border-2 border-[#831317] bg-white pr-3.5 pl-2.5"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (!event.target.value.trim()) setSearchedQuery(null)
            }}
            placeholder="상품명을 입력하세요."
            className="absolute top-0 right-[68px] left-3.5 h-full min-w-0 bg-transparent text-[16px] leading-[25px] font-normal tracking-[0.3px] text-black placeholder:text-[16px] placeholder:text-black/20 focus:outline-none"
          />
          <button type="submit" aria-label="검색" className="absolute top-1 right-5 flex h-[39px] w-[38px] items-center justify-center">
            <SearchSubmitIcon />
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
                        className={`text-[14px] leading-[21.393px] font-normal tracking-[0.25px] whitespace-nowrap ${
                          term === '푸칭 푸딩' ? 'text-[#6b6b6b]' : 'text-[#333]'
                        }`}
                      >
                        {term}
                      </button>
                      <button
                        type="button"
                        aria-label={`${term} 최근 검색어 삭제`}
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation()
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
              <div className="mt-5 grid w-full grid-cols-4 gap-4">
                {todayPickWines.map((wine) => (
                  <TodayPickItem
                    key={wine.id}
                    wine={wine}
                    onClick={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)}
                  />
                ))}
              </div>
            </section>

            <section className="-mx-5 mt-3 bg-white px-5 pt-7 pb-[30px]">
              <h2 className="text-[20px] font-medium tracking-[-0.53px]">
                <span className="text-[#831317]">내 주변</span> 와인숍
              </h2>
              {nearbyShops.length > 0 ? (
                <div className="mt-8 flex flex-col gap-[29px]">
                  {nearbyShops.map((shop) => {
                    const address = shop.road_address_name || shop.address_name
                    return (
                      <a
                        key={shop.id}
                        href={shop.place_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-[110px] items-center gap-[17px]"
                      >
                        <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[13px] bg-[#f2f2f2]">
                          {shop.image ? (
                            <img src={shop.image} alt={shop.place_name} className="size-full object-cover" />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center text-[12px] text-[#aaa]">사진 없음</span>
                          )}
                        </div>
                        <div className="flex h-[93px] min-w-0 flex-1 flex-col justify-between">
                          <div className="flex min-w-0 flex-col gap-1.5">
                            <p className="truncate text-[20px] leading-none font-medium tracking-[-0.5348px] text-[#222]">{shop.place_name}</p>
                            <p className="line-clamp-2 text-[13px] leading-[115.045%] font-medium text-[#aaa]">{address}</p>
                          </div>
                          <div className="flex min-w-0 items-center justify-between gap-2">
                            <p className="truncate text-[13px] text-[#666]">{formatCategory(shop.category_name)}</p>
                            <p className="shrink-0 text-[16px] leading-none font-medium tracking-[-0.5348px] whitespace-nowrap text-[#6b6b6b]">
                              {formatDistance(shop.distance)}
                            </p>
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-8 py-8 text-center text-[13px] text-[#999]">{nearbyShopStatus}</p>
              )}
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
