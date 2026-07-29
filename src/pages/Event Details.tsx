import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/event/detail-back.svg'
import heroImage from '../assets/event/detail-hero.png'
import wine1 from '../assets/event/detail-wine-1.png'
import wine2 from '../assets/event/detail-wine-2.png'
import wine3 from '../assets/wine-detail-red/hero-wine.png'

const eventInfo = [
  { label: '날짜', value: '2026. 08. 14 (금) 14:00 - 20:00' },
  { label: '장소', value: '서울 성수동 언더스탠드에비뉴' },
  { label: '참가비', value: '무료 (시음권 별도)' },
] as const

const relatedWines = [
  { category: 'RED WINE', name: '샤토 드 보세주르', image: wine1 },
  { category: 'WHITE WINE', name: '클라우디 베이 소비뇽 블랑', image: wine2 },
] as const

function Divider() {
  return <div className="h-px w-full shrink-0 bg-black/12" aria-hidden="true" />
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-1 overflow-hidden rounded-xl bg-[#f2f2f2] px-[18px] py-3.5">
      <p className="text-[12px] leading-[1.2] font-medium text-[#831317]">{label}</p>
      <p className="text-[14px] leading-[1.3] font-normal tracking-[-0.28px] text-[#0d0d0d]">{value}</p>
    </div>
  )
}

function RelatedWineCard({ category, name, image }: { category: string; name: string; image: string }) {
  return (
    <article className="flex shrink-0 snap-start flex-col gap-2.5 overflow-hidden">
      <div className="flex h-[279px] w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f2f2f2]">
        <img src={image} alt={name} className="h-[277px] max-w-[98%] object-contain" />
      </div>
      <p className="text-[12px] leading-[1.2] font-normal tracking-[-0.24px] text-[#737373]">{category}</p>
      <p className="w-[240px] text-[16px] leading-[1.25] font-semibold tracking-[-0.16px] text-[#0d0d0d]">{name}</p>
    </article>
  )
}

function RuffinoCard() {
  return (
    <article className="flex shrink-0 snap-start flex-col gap-2.5 overflow-hidden">
      <div className="flex h-[279px] w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f2f2f2]">
        <img src={wine3} alt="Ruffino Chianti" className="h-[277px] max-w-[98%] object-contain" />
      </div>
      <p className="font-noto text-[10px] leading-[1.2] font-medium tracking-[0.6px] text-[#737373]">RED WINE</p>
      <p className="font-playfair-sc w-[240px] text-[14px] leading-[1.25] font-bold tracking-[-0.14px] text-[#0d0d0d]">Ruffino Chianti</p>
    </article>
  )
}

function EventDetails() {
  const navigate = useNavigate()
  const [applicationComplete, setApplicationComplete] = useState(false)
  const relatedWineScrollRef = useRef<HTMLDivElement>(null)
  const relatedWineDrag = useRef<{ pointerId: number; startX: number; scrollLeft: number; moved: boolean } | null>(null)

  const applyForEvent = () => {
    setApplicationComplete(true)
  }

  const stopRelatedWineDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (relatedWineDrag.current?.pointerId !== event.pointerId) return
    relatedWineDrag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-white text-[#0d0d0d]" data-node-id="1546:6475">
      <header className="relative z-10 h-[calc(70px+env(safe-area-inset-top))] w-full overflow-hidden bg-white" data-node-id="1546:6476">
        <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] h-17.5">
          <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-4.5 flex size-6 items-center justify-center">
            <img src={backIcon} alt="" className="size-6 rotate-180" />
          </button>
          <h1 className="absolute top-[25px] left-[calc(50%+1px)] -translate-x-1/2 text-center text-[20px] leading-none font-bold tracking-[-0.4px] whitespace-nowrap text-[#831317]">
            이벤트
          </h1>
        </div>
      </header>

      <section className="relative h-[363px] w-full overflow-hidden" aria-label="Summer Wine Festival">
        <img src={heroImage} alt="와인 잔을 들고 건배하는 Summer Wine Festival 참가자들" className="absolute top-[-160px] left-0 h-auto w-full max-w-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[32.645%] from-transparent to-black/30" aria-hidden="true" />
        <div className="absolute right-5 bottom-5 left-5 flex flex-col items-start gap-3 overflow-hidden">
          <span className="rounded-[25px] bg-[#831317] px-3 py-[5px] text-[12px] leading-none font-medium tracking-[-0.24px] text-white">FESTIVAL</span>
          <h2 className="w-full font-['Delmon_Delicate','Playfair_Display',serif] text-[32px] leading-[1.25] font-normal tracking-[-0.64px] text-white">
            Summer Wine Festival
          </h2>
        </div>
      </section>

      <main className="flex w-full flex-col items-start gap-7 overflow-hidden px-5 pt-6 pb-8">
        <section className="flex w-full flex-col gap-3 overflow-hidden">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">행사 소개</h2>
          <div className="w-full overflow-hidden rounded-xl bg-[#f2f2f2] px-[18px] py-4">
            <p className="w-full text-[14px] leading-[1.6] font-normal tracking-[-0.28px] text-[#595959]">
              국내외 다양한 와인을 직접 시음할 수 있는 행사입니다. 와인 전문가들이 큐레이션한 프리미엄 컬렉션과 함께 성수동의 세련된 감성을 느껴보세요.
            </p>
          </div>
        </section>

        <Divider />

        <section className="flex w-full flex-col gap-3 overflow-hidden">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">행사 정보</h2>
          {eventInfo.map((info) => <InfoCard key={info.label} label={info.label} value={info.value} />)}
        </section>

        <Divider />

        <section className="flex w-full flex-col gap-3.5">
          <div className="flex w-full items-center overflow-hidden">
            <h2 className="shrink-0 text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">관련 와인</h2>
            <span className="flex-1" />
            <button type="button" className="shrink-0 text-[12px] leading-none font-normal tracking-[-0.36px] text-[#831317]">전체보기</button>
          </div>
          <div
            ref={relatedWineScrollRef}
            onDragStart={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              if (event.pointerType !== 'mouse' || !relatedWineScrollRef.current) return
              relatedWineDrag.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                scrollLeft: relatedWineScrollRef.current.scrollLeft,
                moved: false,
              }
            }}
            onPointerMove={(event) => {
              const drag = relatedWineDrag.current
              const scroller = relatedWineScrollRef.current
              if (!drag || drag.pointerId !== event.pointerId || !scroller) return
              const distance = event.clientX - drag.startX
              if (!drag.moved && Math.abs(distance) > 8) {
                drag.moved = true
                event.currentTarget.setPointerCapture(event.pointerId)
              }
              if (!drag.moved) return
              event.preventDefault()
              scroller.scrollLeft = drag.scrollLeft - distance
            }}
            onPointerUp={stopRelatedWineDrag}
            onPointerCancel={stopRelatedWineDrag}
            className="-mx-5 flex w-[calc(100%+40px)] shrink-0 snap-x snap-mandatory cursor-grab gap-3.5 overflow-x-auto overscroll-x-contain px-5 pb-1 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-pl-5 scroll-pr-5"
          >
            {relatedWines.map((wine) => <RelatedWineCard key={wine.name} {...wine} />)}
            <RuffinoCard />
          </div>
        </section>

        <button type="button" onClick={applyForEvent} className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#831317] py-[17px] text-[16px] leading-none font-bold text-white">
          참여 신청
        </button>
      </main>

      {applicationComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5">
          <div role="dialog" aria-modal="true" aria-labelledby="application-complete-title" className="flex w-full max-w-[320px] flex-col items-center overflow-hidden rounded-xl bg-white px-6 pt-7 pb-5 shadow-xl">
            <p id="application-complete-title" className="text-center text-[16px] leading-[1.4] font-bold tracking-[-0.32px] text-[#0d0d0d]">
              신청이 완료되었습니다.
            </p>
            <button type="button" onClick={() => setApplicationComplete(false)} className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#831317] py-3.5 text-[14px] leading-none font-bold text-white">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetails
