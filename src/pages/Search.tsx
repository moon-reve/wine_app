import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dummyWines from '../../dummy data/wines.json'
import searchIcon from '../assets/lounge/search.svg'
import starIcon from '../assets/list/container-star.svg'
import shopWinePairing from '../assets/search/shop-wine-pairing.jpg'
import shopWineTerrace from '../assets/search/shop-wine-terrace.jpg'
import Header from '../components/Header'
import { WINE_TYPE_BG_COLOR, type WineType } from '../data/todayPickData'

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
  { id: 'wine-pairing', name: '와인 페어링', address: '서울 강남구 서초동 · 480m', rating: '★★★★☆ 4.7', image: shopWinePairing },
  { id: 'wine-terrace', name: '와인 테라스(Wine Terrace)', address: '서울 강남구 역삼동 · 320m', rating: '★★★★☆ 4.5', image: shopWineTerrace },
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
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]">
      <Header tone="light" wineIcons showBackButton />

      <main className="px-5 pt-[21px]">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            executeSearch(query)
          }}
          className="flex h-12 items-center gap-2.5 rounded-[50px] border border-[#831317] bg-white pr-4 pl-3.5"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (!event.target.value.trim()) setSearchedQuery(null)
            }}
            placeholder="와인명을 검색해보세요"
            className="min-w-0 flex-1 text-[14px] text-black placeholder:text-[#111] focus:outline-none"
          />
          <button type="submit" aria-label="검색" className="flex size-5 shrink-0 items-center justify-center">
            <img src={searchIcon} alt="" className="size-4" />
          </button>
        </form>

        <hr className="mt-[26px] h-0 border-0 border-t border-[#e5e5e5]" />

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
                <h2 className="text-[18px] font-bold text-[#111]">최근 검색</h2>
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
                <div className="mt-[18px] flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {recentSearches.map((term) => (
                    <div key={term} className="flex h-9 shrink-0 items-center rounded-[37px] border border-[#999] bg-white">
                      <button
                        type="button"
                        onClick={() => executeSearch(term)}
                        className="h-full pl-[18px] text-[13px] whitespace-nowrap text-[#333]"
                      >
                        {term}
                      </button>
                      <button
                        type="button"
                        aria-label={`${term} 최근 검색어 삭제`}
                        onClick={() => removeRecentSearch(term)}
                        className="flex h-full w-9 items-center justify-center text-[18px] leading-none font-light text-[#999]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-[18px] text-[13px] text-[#999]">최근 검색어가 없습니다.</p>
              )}
            </section>

            <hr className="mt-[26px] h-0 border-0 border-t border-[#e5e5e5]" />

            <section className="pt-6">
              <h2 className="text-[18px] font-bold text-[#111]">내 주변 와인숍</h2>
              <div className="mt-5 flex flex-col gap-5">
                {NEARBY_SHOPS.map((shop) => (
                  <div key={shop.id} className="flex items-center gap-3">
                    <img src={shop.image} alt={shop.name} className="size-[76px] shrink-0 rounded-lg object-cover" />
                    <div className="flex flex-col gap-[9px]">
                      <div className="flex flex-col gap-[7px]">
                        <p className="text-[18px] font-bold text-[#111]">{shop.name}</p>
                        <p className="text-[13px] text-[#666]">{shop.address}</p>
                      </div>
                      <p className="text-[13px] text-[#666]">{shop.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="mt-6 h-0 border-0 border-t border-[#e5e5e5]" />

            <section className="pb-6 pt-6">
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
