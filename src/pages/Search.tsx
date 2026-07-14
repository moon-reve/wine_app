import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import searchIcon from '../assets/lounge/search.svg'
import shopWinePairing from '../assets/search/shop-wine-pairing.jpg'
import shopWineTerrace from '../assets/search/shop-wine-terrace.jpg'

const RECENT_SEARCHES = ['Yellow Tail Shiraz', '19 Crimes', 'Oyster Bay']

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

function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]">
      <Header tone="light" titleColorClassName="text-black" />

      <main className="px-5 pt-[21px]">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex h-[48px] items-center gap-[10px] rounded-[50px] border border-[#831317] bg-white pr-[16px] pl-[14px]"
        >
          <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="flex size-[24px] shrink-0 items-center justify-center text-[#333]">
            <svg viewBox="0 0 24 24" className="size-[14px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 19 8 12 15 5" />
            </svg>
          </button>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="와인명을 검색해보세요"
            className="min-w-0 flex-1 text-[14px] text-black placeholder:text-[#111] focus:outline-none"
          />
          <button type="submit" aria-label="검색" className="flex size-[20px] shrink-0 items-center justify-center">
            <img src={searchIcon} alt="" className="size-[16px]" />
          </button>
        </form>

        <hr className="mt-[26px] h-0 border-0 border-t border-[#e5e5e5]" />

        <section className="pt-[26px]">
          <h2 className="text-[18px] font-bold text-[#111]">최근 검색</h2>
          <div className="mt-[18px] flex gap-[12px] overflow-x-auto">
            {RECENT_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="h-[36px] shrink-0 rounded-[37px] border border-[#999] bg-white px-[18px] text-[13px] whitespace-nowrap text-[#333]"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        <hr className="mt-[26px] h-0 border-0 border-t border-[#e5e5e5]" />

        <section className="pt-[24px]">
          <h2 className="text-[18px] font-bold text-[#111]">내 주변 와인숍</h2>
          <div className="mt-[20px] flex flex-col gap-[20px]">
            {NEARBY_SHOPS.map((shop) => (
              <div key={shop.id} className="flex items-center gap-[12px]">
                <img src={shop.image} alt={shop.name} className="size-[76px] shrink-0 rounded-[8px] object-cover" />
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

        <hr className="mt-[24px] h-0 border-0 border-t border-[#e5e5e5]" />

        <section className="pt-[24px] pb-[24px]">
          <h2 className="text-[16px] font-bold text-[#111]">🔥 인기 급상승 검색어</h2>
          <ol className="mt-[16px] flex flex-col gap-[15px]">
            {TRENDING_SEARCHES.map((item, index) => {
              const trend = TREND_STYLE[item.trend]
              return (
                <li key={item.text}>
                  <button
                    type="button"
                    onClick={() => setQuery(item.text)}
                    className="flex items-center gap-[6px] text-left text-[14px] text-[#333]"
                  >
                    <span>
                      {index + 1}. {item.text}
                    </span>
                    <span className={`text-[10px] ${trend.className}`}>{trend.symbol}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      </main>
    </div>
  )
}

export default Search
