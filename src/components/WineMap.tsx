import { useState } from 'react'
import mapBackground from '../assets/map/figma-grape-map.png'
import grapeMarker from '../assets/map/grape-marker.png'
import placeCardPhoto from '../assets/map/place-card-photo.png'

const SORT_OPTIONS = ['인기순', '최신순', '평점순', '가격순']
const GRAPE_MARKERS = [
  { left: 29.77, top: 7.49 },
  { left: 76.05, top: 17.28 },
  { left: 38.37, top: 29.61 },
  { left: 87.44, top: 48.73 },
  { left: 65.12, top: 58.64 },
  { left: 68.84, top: 77.88 },
  { left: 29.3, top: 84.22 },
] as const

function WineMap() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS[0])
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null)

  return (
    <div className="relative -mx-5 h-full min-h-0 w-[calc(100%+40px)] overflow-hidden" data-node-id="1546:4174">
      <img src={mapBackground} alt="주변 와인 매장 지도" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0" data-node-id="1655:1685">
        {GRAPE_MARKERS.map((marker, index) => (
          <button
            key={`${marker.left}-${marker.top}`}
            type="button"
            aria-label={`${index + 1}번째 와인바 정보 보기`}
            aria-pressed={selectedMarker === index}
            onClick={() => setSelectedMarker(index)}
            className={`absolute h-[38px] w-[31px] transition-transform duration-300 ease-out ${
              selectedMarker === index ? 'z-10 scale-[1.55]' : 'scale-100'
            }`}
            style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
            data-marker-index={index}
          >
            <img src={grapeMarker} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>

      <div className="absolute top-0 right-[41px] left-7 z-10 flex h-[66px] items-center gap-[11px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-node-id="1546:4204">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            className={`shrink-0 rounded-full border px-[16px] py-[8px] text-[12px] leading-4 font-medium tracking-[0.96px] whitespace-nowrap shadow-[0_0_2.5px_rgba(0,0,0,0.25)] ${
              activeSort === option ? 'border-[#831317] bg-[#831317] text-white' : 'border-white/50 bg-[#f9f7f6] text-[#444141]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedMarker !== null && <article className="wine-map-card-rise fixed bottom-[92px] left-1/2 z-40 h-[342px] w-[calc(100%-69px)] max-w-[361px] overflow-hidden rounded-[33px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.05)]" data-node-id="1546:4233">
        <div className="absolute top-[15px] right-4 left-[18px] h-[208px] overflow-hidden rounded-[20px]" data-node-id="1546:4244">
          <img src={placeCardPhoto} alt="나라셀라 리저브" className="absolute top-[-118.02%] left-[-0.05%] h-[236.06%] w-[100.1%] max-w-none object-cover" />
          <span className="absolute top-[11px] left-[6px] flex h-[27px] items-center justify-center rounded-full bg-[#e1dfdb]/10 px-4 text-[12px] leading-4 font-medium tracking-[0.96px] text-white backdrop-blur-[2px]">
            Trending
          </span>
        </div>
        <div className="absolute top-[238px] right-[22px] left-[22px]">
          <h2 className="text-[20px] leading-[25px] font-semibold whitespace-nowrap text-[#1e1b18]">나라셀라 리저브</h2>
          <p className="mt-1 text-[14px] leading-5 text-black">서울 강남구 논현로152길 9 도운빌딩 지하1층, 1층</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-[#831317] px-3 py-1 text-[11px] leading-4 tracking-[0.96px] text-white">예약가능</span>
            <span className="rounded-full bg-[#831317] px-3 py-1 text-[11px] leading-4 tracking-[0.96px] text-white">주차가능</span>
          </div>
        </div>
      </article>}
    </div>
  )
}

export default WineMap
