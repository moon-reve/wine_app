import { useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/todayspick/back.svg'
import chevronIcon from '../assets/todayspick/chevron.svg'
import mainWine from '../assets/todayspick/main-wine.png'
import { formatPrice, formatStars, getWineDetailData, resolveWineImage, type WineDetail } from '../data/wineDetailData'
import { TODAY_PICK_WINE_IDS, WINE_TYPE_BG_COLOR } from '../data/todayPickData'

const todayPickWineId = 'wine_018'
const recommendationTypes = ['red', 'white', 'sparkling'] as const

const filters = [
  { title: '음식', options: ['스테이크', '파스타', '해산물', '치즈'], selected: '스테이크' },
  { title: '분위기', options: ['혼술', '데이트', '기념일', '친구들과'], selected: '데이트' },
  { title: '가격대', options: ['2만원 이하', '2~5만원', '5~10만원', '10만원 이상'], selected: '2~5만원' },
] as const

function RecommendationItem({ wine, onClick }: { wine: WineDetail; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-[132px] shrink-0 flex-col items-center gap-3">
      <div
        className="flex size-[89.26px] shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: WINE_TYPE_BG_COLOR[wine.type] }}
      >
        <img src={resolveWineImage(wine)} alt={wine.nameKo} className="h-[85%] w-auto max-w-[75%] object-contain" />
      </div>
      <p className="line-clamp-2 w-[89.26px] text-center text-[14px] leading-[18px] font-medium tracking-[-0.5px] text-[#6b6b6b]">{wine.nameKo}</p>
    </button>
  )
}

function FilterGroup({
  group,
  selected,
  onSelect,
}: {
  group: (typeof filters)[number]
  selected: string
  onSelect: (option: string) => void
}) {
  return (
    <div className="flex w-full flex-col gap-2.5 overflow-hidden">
      <h3 className="text-[13px] leading-[1.2] font-medium text-[#831317]">{group.title}</h3>
      <div className="flex w-full flex-wrap items-start gap-2 overflow-hidden">
        {group.options.map((option) => {
          const isSelected = option === selected
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(option)}
              className={`rounded-[25px] px-3.5 py-[7px] text-[12px] leading-none font-medium whitespace-nowrap transition-colors ${isSelected ? 'bg-[#831317] text-white' : 'border border-[#d9d9d9] bg-white text-[#737373]'}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TodaysPick() {
  const navigate = useNavigate()
  const { wine } = getWineDetailData(todayPickWineId)
  const recommendations = recommendationTypes.map((type) => {
    const recommendationId = TODAY_PICK_WINE_IDS[type][0]
    return getWineDetailData(recommendationId).wine
  })
  const recommendationScroller = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const recommendationDidDrag = useRef(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((group) => [group.title, group.selected])),
  )

  const startRecommendationDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const scroller = recommendationScroller.current
    if (!scroller) return
    recommendationDidDrag.current = false
    dragState.current = { active: true, startX: event.clientX, scrollLeft: scroller.scrollLeft }
    scroller.setPointerCapture(event.pointerId)
  }

  const moveRecommendationDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return
    const scroller = recommendationScroller.current
    if (!scroller) return
    if (Math.abs(event.clientX - dragState.current.startX) > 8) recommendationDidDrag.current = true
    scroller.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX)
  }

  const stopRecommendationDrag = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = recommendationScroller.current
    dragState.current.active = false
    if (scroller?.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId)
  }

  const scrollRecommendationsWithWheel = (event: WheelEvent<HTMLDivElement>) => {
    const scroller = recommendationScroller.current
    if (!scroller) return
    scroller.scrollLeft += Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
  }

  return (
    <div className="relative mx-auto min-h-[1307px] w-full max-w-107.5 overflow-hidden bg-white text-[#0d0d0d]" data-node-id="1546:6383">
      <header className="absolute top-0 left-0 h-17.5 w-full overflow-hidden bg-white">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-[23px] left-4.5 flex size-6 items-center justify-center">
          <img src={backIcon} alt="" className="size-6 rotate-180" />
        </button>
        <h1 className="absolute top-6.5 left-43 w-[85px] text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">오늘의 추천</h1>
      </header>

      <section className="absolute top-[103px] left-0 h-[395px] w-full" aria-label="오늘의 추천 와인">
        <p className="absolute top-0 left-[217px] text-[12px] leading-[1.2] font-medium tracking-[-0.24px] whitespace-nowrap text-[#737373]">
          <span className="text-[#831317]">{formatStars(wine.rating)} {wine.rating.toFixed(1)}</span> · 리뷰 {wine.reviewCount.toLocaleString()} · 저장 {wine.saveCount.toLocaleString()}
        </p>
        <p className="absolute top-[19px] right-[25px] w-[255px] text-right font-['Delmon_Delicate','Playfair_Display',serif] text-[42px] leading-[1.3] font-normal tracking-[-1.26px] text-black">
          {wine.nameEn}
        </p>
        <p className="font-delmon-script absolute top-[104px] left-5 w-[255px] text-right text-[100px] leading-[0.87] font-normal tracking-[-3px] text-black/5" data-node-id="1546:6469">
          Chateau<br />Marg<br />aux
        </p>
        <div className="absolute top-0 left-8 h-[395px] w-[92px] overflow-hidden">
          <img src={mainWine} alt={`${wine.nameKo} ${wine.vintage}`} className="absolute top-[-49.6px] left-[-112.4px] h-[485.5px] w-[316.9px] max-w-none" />
        </div>
        <p className="absolute top-[150px] right-[25px] text-right text-[24px] leading-[1.2] font-bold tracking-[-0.48px] whitespace-nowrap">{wine.nameKo} {wine.vintage}</p>
        <p className="absolute top-[182px] right-[25px] text-right text-[22px] leading-[1.2] font-bold whitespace-nowrap text-[#831317]">{formatPrice(wine.price)}</p>
        <div className="absolute top-[229px] left-[259px] flex items-start gap-2 overflow-hidden">
          {wine.tags.map((tag) => (
            <span key={tag} className="rounded-[25px] border border-[#d9d9d9] px-3 py-1.5 text-[12px] leading-none font-medium tracking-[-0.24px] whitespace-nowrap text-[#595959]">{tag}</span>
          ))}
        </div>
        <p className="font-playfair-sc absolute top-[241px] left-[154px] -translate-x-1/2 text-center text-[150px] leading-[1.08] font-bold tracking-[-3px] whitespace-nowrap text-[#831317]">01</p>
        <button type="button" onClick={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)} className="absolute top-[371px] left-[316px] flex items-center text-[14px] leading-none font-bold whitespace-nowrap text-[#831317]">
          와인 상세 보기
          <img src={chevronIcon} alt="" className="ml-1 h-3 w-[7px]" />
        </button>
      </section>

      <div className="absolute top-[541px] left-5 h-px w-[390px] bg-black/12" />
      <section className="absolute top-[570px] left-[26px] w-[362px]">
        <h2 className="text-[14px] leading-[1.2] font-medium text-[#831317]">AI 추천 이유</h2>
        <p className="mt-[5px] text-[14px] leading-[1.6] font-normal tracking-[-0.28px] text-[#595959]">
          최근 저장한 레드와인과 비슷한 스타일이며, 평소 선호하는 부드러운 탄닌을 기반으로 추천드렸어요.
        </p>
      </section>
      <div className="absolute top-[659px] left-5 h-px w-[390px] bg-black/12" />

      <section className="absolute top-[671px] left-0 h-[249px] w-full overflow-hidden bg-white">
        <h2 className="absolute top-7 left-6 text-[20px] leading-none font-medium tracking-[-0.5348px] text-[#222]">다른 추천, <span className="text-[#851317]">와인</span></h2>
        <div
          ref={recommendationScroller}
          onPointerDown={startRecommendationDrag}
          onPointerMove={moveRecommendationDrag}
          onPointerUp={stopRecommendationDrag}
          onPointerCancel={stopRecommendationDrag}
          onWheel={scrollRecommendationsWithWheel}
          className="absolute top-[79px] right-0 left-[-1px] flex cursor-grab touch-pan-x items-start overflow-x-auto overscroll-x-contain select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {recommendations.map((recommendationWine, index) => (
            <div key={recommendationWine.id} className={index === 0 ? '' : '-ml-4'}>
              <RecommendationItem
                wine={recommendationWine}
                onClick={() => {
                  if (recommendationDidDrag.current) {
                    recommendationDidDrag.current = false
                    return
                  }
                  navigate(`/wine_detail/${recommendationWine.type}/${recommendationWine.id}`)
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <h2 className="absolute top-[931px] left-6 text-[20px] leading-none font-medium tracking-[-0.5348px] text-[#851317]">
        원하는 조건<span className="text-[#222]">으로 다시 추천받기</span>
      </h2>
      <section className="absolute top-[973px] left-5 flex w-[390px] flex-col items-start gap-[18px] overflow-hidden rounded-xl bg-[#f9f7f6] px-[18px] py-5">
        {filters.map((group) => (
          <FilterGroup
            key={group.title}
            group={group}
            selected={selectedFilters[group.title]}
            onSelect={(option) => setSelectedFilters((current) => ({ ...current, [group.title]: option }))}
          />
        ))}
      </section>
      <button type="button" className="absolute top-[1227px] left-[19px] flex w-[390px] items-center justify-center overflow-hidden rounded-xl bg-[#831317] py-[17px] text-[16px] leading-none font-bold text-white">
        AI 추천받기
      </button>
    </div>
  )
}

export default TodaysPick
