import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dummyWines from '../../dummy data/wines.json'
import starIcon from '../assets/list/container-star.svg'
import searchBackIcon from '../assets/search/search-back-button.svg'
import searchSubmitIcon from '../assets/search/search-submit-button.svg'
import chipCloseIcon from '../assets/search/search-chip-close.svg'
import shopWinePairing from '../assets/search/shop-wine-pairing.jpg'
import shopWineTerrace from '../assets/search/shop-wine-terrace.jpg'
import Header from '../components/Header'
import { TODAY_PICK_WINE_IDS, WINE_TYPE_BG_COLOR, type WineType } from '../data/todayPickData'
import { getWineDetailData, resolveWineImage, type WineDetail } from '../data/wineDetailData'

const TODAY_PICK_TYPES: WineType[] = ['red', 'white', 'rose', 'sparkling']

const RECENT_SEARCH_STORAGE_KEY = 'wine-app:recent-searches'
const MAX_RECENT_SEARCHES = 8
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
    const storedSearches = JSON.parse(localStorage.getItem(RECENT_SEARCH_STORAGE_KEY) ?? '[]')
    return Array.isArray(storedSearches)
      ? storedSearches.filter((term): term is string => typeof term === 'string').slice(0, MAX_RECENT_SEARCHES)
      : []
  } catch {
    return []
  }
}

const NEARBY_SHOPS = [
  { id: 'wine-pairing', name: '와인 페어링', address: '서울 강남구 서초동', distance: '480m', rating: '★★★★☆ 4.7', image: shopWinePairing },
  { id: 'wine-terrace', name: '와인 테라스', address: '서울 강남구 역삼동', distance: '320m', rating: '★★★★☆ 4.5', image: shopWineTerrace },
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

function WineResultCard({ wine, onClick }: { wine: SearchWine; onClick: () => void }) {
  const fileName = wine.imageUrl.split('/').pop() ?? ''
  const image = wineImages[`../assets/images/wines/${fileName}`] ?? ''
  const subRegion = wine.region.startsWith(wine.country)
    ? wine.region.slice(wine.country.length).trim()
    : wine.region
  const region = subRegion
    ? `${wine.country} · ${subRegion} · ${wine.grape}`
    : `${wine.country} · ${wine.grape}`

  return (
    <div>
      <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-[159px] w-full items-center gap-[37px] py-6 pl-6 text-left"
      >
        <div
          className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: WINE_TYPE_BG_COLOR[wine.type] }}
        >
          <img src={image} alt={wine.nameKo} className="h-[85%] w-auto object-contain" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
          <div>
            <p className="text-[20px] leading-[25px] font-semibold text-[#1e1b18]">{wine.nameKo}</p>
            <p className={`${region.length > 18 ? 'text-[11px]' : 'text-[12px]'} leading-[25px] text-[#817f7e]`}>{region}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-[16px] leading-6 font-bold text-[#1e1b18]">₩{wine.price.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <img src={starIcon} alt="" className="h-[14.25px] w-[15px]" />
              <p className="text-[16px] leading-6 font-bold text-[#561922]">{wine.rating.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

function Search() {
  const navigate = useNavigate()
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

  return (
    <div className="min-h-screen w-full bg-[#f9f7f7] text-[#0d0d0d]">
      <Header tone="light" wineIcons />

      <main className="px-5 pt-[21px] pb-8">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            executeSearch(query)
          }}
          className="flex h-[51px] items-center gap-2.5 rounded-[32px] border-2 border-[#851317] bg-white pr-3.5 pl-2.5"
        >
          <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="flex h-8 w-6.5 shrink-0 items-center justify-center">
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
            className="min-w-0 flex-1 text-[15px] text-black placeholder:text-black/20 focus:outline-none"
          />
          <button type="submit" aria-label="검색" className="flex h-[39px] w-[38px] shrink-0 items-center justify-center">
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
                {searchResults.map((wine) => (
                  <WineResultCard
                    key={wine.id}
                    wine={wine}
                    onClick={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)}
                  />
                ))}
                <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
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
            <section className="pt-[26px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-medium text-[#6b6b6b]">최근 검색 기록</h2>
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setRecentSearches([])}
                    className="text-[12px] font-medium text-[#737373]"
                  >
                    전체 삭제
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <div className="mt-[18px] flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="flex shrink-0 items-center justify-center gap-1.5 rounded-[28px] bg-white py-1.5 pr-3.5 pl-[19px] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                    >
                      <button
                        type="button"
                        onClick={() => executeSearch(term)}
                        className="text-[15px] font-semibold tracking-[0.25px] whitespace-nowrap text-[#333]"
                      >
                        {term}
                      </button>
                      <button
                        type="button"
                        aria-label={`${term} 최근 검색어 삭제`}
                        onClick={() => removeRecentSearch(term)}
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
                오늘 추천, <span className="text-[#851317]">와인</span>
              </h2>
              <div className="mt-5 flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                <span className="text-[#851317]">내 주변</span> 와인숍
              </h2>
              <div className="mt-5 flex flex-col gap-7">
                {NEARBY_SHOPS.map((shop) => (
                  <div key={shop.id} className="flex items-center gap-[27px]">
                    <img src={shop.image} alt={shop.name} className="size-[110px] shrink-0 rounded-[13px] object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[20px] font-medium tracking-[-0.53px] text-[#222]">{shop.name}</p>
                        <p className="text-[13px] text-[#d9d9d9]">{shop.address}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-[#666]">{shop.rating}</p>
                        <p className="text-[16px] font-medium tracking-[-0.53px] text-[#6b6b6b]">{shop.distance}</p>
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
