import { useState } from 'react'
import mapBackground from '../assets/map/map-background.png'
import placeCardPhoto from '../assets/map/place-card-photo.png'

const SORT_OPTIONS = ['인기순', '최신순', '평점순', '가격순'] as const

function WineMap() {
  const [activeSort, setActiveSort] = useState<(typeof SORT_OPTIONS)[number]>('인기순')

  return (
    <div
      className="relative -mx-5 -mt-[2px] h-[calc(100%+2px)] min-h-0 w-[calc(100%+40px)] overflow-hidden bg-white"
      data-node-id="1829:9571"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={mapBackground}
          alt="강남 주변 와인숍 지도"
          className="absolute top-[0.05%] left-[-46.37%] h-[99.95%] w-[192.53%] max-w-none"
        />
      </div>

      <div
        className="absolute top-0 right-[41px] left-7 z-10 h-[66px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-node-id="1829:9573"
      >
        {SORT_OPTIONS.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            style={{ left: [0, 75, 148, 221][index] }}
            className={`absolute top-[17px] h-8 w-16 rounded-full border px-4 text-center text-[12px] leading-4 font-medium tracking-[0.96px] whitespace-nowrap shadow-[0_0_2.5px_rgba(0,0,0,0.25)] ${
              activeSort === option
                ? 'border-[#831317] bg-[#831317] text-white'
                : 'border-white/50 bg-[#f9f7f6] text-[#444141]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <article
        className="absolute bottom-[137px] left-1/2 z-20 h-[342px] w-[361px] max-w-[calc(100%-69px)] -translate-x-1/2 overflow-hidden rounded-[33px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.05)]"
        data-node-id="1829:9601"
      >
        <div
          className="absolute top-[15px] left-[18px] h-[208px] w-[327px] overflow-hidden rounded-[20px]"
          data-node-id="1829:9612"
        >
          <img
            src={placeCardPhoto}
            alt="나라셀라 리저브"
            className="absolute top-[-118.02%] left-[-0.05%] h-[236.06%] w-[100.1%] max-w-none"
          />
          <span className="absolute top-[11px] left-[6px] flex h-[27px] w-[69px] items-center justify-center rounded-full bg-[rgba(225,223,219,0.1)] px-4 text-center text-[12px] leading-4 font-medium tracking-[0.96px] whitespace-nowrap text-white">
            Trending
          </span>
        </div>

        <div className="absolute top-[238px] left-[22px] w-[314px]">
          <h2 className="text-[20px] leading-[25px] font-semibold whitespace-nowrap text-[#1e1b18]">
            나라셀라 리저브
          </h2>
          <p className="text-[14px] leading-5 font-normal text-black">
            서울 강남구 논현로152길 9 도운빌딩 지하1층, 1층
          </p>
          <div className="mt-3 flex items-start gap-2">
            <span className="rounded-full bg-[#831317] px-3 py-1 text-[11px] leading-4 font-normal tracking-[0.96px] whitespace-nowrap text-white">
              예약가능
            </span>
            <span className="rounded-full bg-[#831317] px-3 py-1 text-[11px] leading-4 font-normal tracking-[0.96px] whitespace-nowrap text-white">
              주차가능
            </span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default WineMap
