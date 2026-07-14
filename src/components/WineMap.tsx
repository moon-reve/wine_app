import { useState } from 'react'
import mapBackground from '../assets/map/map-background.png'
import placeCardPhoto from '../assets/map/place-card-photo.png'

const SORT_OPTIONS = ['인기순', '최신순', '평점순', '가격순']

function WineMap() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS[0])

  return (
    <div className="relative -mx-5 h-[calc(100vh-310px)] min-h-[420px] overflow-hidden">
      <img src={mapBackground} alt="주변 와인 매장 지도" className="absolute inset-0 size-full object-cover" />

      <div className="absolute inset-x-5 top-[16px] flex gap-[11px] overflow-x-auto">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            className={`shrink-0 rounded-full px-[16px] py-[8px] text-[12px] font-medium tracking-[0.96px] whitespace-nowrap ${
              activeSort === option ? 'bg-[#831317] text-white' : 'bg-[rgba(225,223,219,0.6)] text-black'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-[16px] overflow-hidden rounded-[24px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.15)]">
        <div className="relative h-[155px] w-full">
          <img src={placeCardPhoto} alt="나라셀라 리저브" className="size-full object-cover" />
          <span className="absolute top-[12px] left-[12px] rounded-full bg-[rgba(225,223,219,0.6)] px-[12px] py-[6px] text-[12px] font-medium tracking-[0.7px] text-white">
            Trending
          </span>
        </div>
        <div className="px-[16px] py-[14px]">
          <p className="text-[16px] leading-[20px] font-semibold text-[#1e1b18]">나라셀라 리저브</p>
          <p className="mt-[6px] text-[12px] leading-[16px] text-[#434343]">서울 강남구 논현로152길 9 도운빌딩 지하1층, 1층</p>
          <div className="mt-[10px] flex gap-[6px]">
            <span className="rounded-full border border-black px-[10px] py-[4px] text-[10px] font-medium text-[#434343]">예약가능</span>
            <span className="rounded-full border border-black px-[10px] py-[4px] text-[10px] font-medium text-[#434343]">주차가능</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WineMap
