import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/magazine-detail/back.svg'
import berriesLeft from '../assets/magazine-detail/berries-left.webp'
import berriesRight from '../assets/magazine-detail/berries-right.webp'
import epilogueBackground from '../assets/magazine-detail/epilogue-bg.webp'
import heroImage from '../assets/magazine-detail/hero.webp'
import illustration from '../assets/magazine-detail/illustration-original-hq-clean.webp'
import omynaraWinery from '../assets/magazine-detail/omynara-winery.webp'
import product1 from '../assets/magazine-detail/product-1.webp'
import product2 from '../assets/magazine-detail/product-2.webp'
import product3 from '../assets/magazine-detail/product-3.webp'
import sinabroWinery from '../assets/magazine-detail/sinabro-winery.webp'
import { getWineDetailData } from '../data/wineDetailData'

const wineCardVisuals = [
  { id: 'wine_091', image: product1, name: '시나브로 청수 화이트 와인', price: '₩ 40,000원' },
  { id: 'wine_081', image: product2, name: '오미로제, 결', price: '₩ 150,000원' },
  { id: 'wine_082', image: product3, name: '오미로제 프리미엄', price: '₩ 43,000원' },
] as const

const wines = wineCardVisuals.map((visual) => {
  const { wine } = getWineDetailData(visual.id)
  return { ...visual, type: wine.type }
})

function WineryInfo({ name, address, description, image }: { name: string; address: string; description: string; image: string }) {
  return (
    <div className="mt-8 flex items-start gap-3">
      <img src={image} alt={`${name} 전경`} className="size-[76px] shrink-0 rounded object-cover" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-[18px] leading-normal font-bold text-[#111]">{name}</h3>
        <p className="text-[14px] leading-[1.45] tracking-[-0.28px] text-[#666]">{address}</p>
        <p className="text-[14px] leading-[1.45] tracking-[-0.28px] text-[#666]">{description}</p>
      </div>
    </div>
  )
}

function WineCard({ wine, onClick }: { wine: (typeof wines)[number]; onClick: () => void }) {
  return (
    <button type="button" data-wine-card onClick={onClick} className="relative h-[250px] w-[215px] shrink-0 snap-start overflow-hidden rounded-xl text-left">
      <img src={wine.image} alt={wine.name} draggable={false} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black/55" />
      <span className="glass-tab absolute top-5 left-[17px] flex h-8 items-center justify-center rounded-full px-4 text-[12px] leading-4 font-medium text-white">
        Korea
      </span>
      <div className="absolute right-[17px] bottom-5 left-[17px] flex flex-col gap-1 text-white">
        <p className="text-[12px] leading-[1.3] font-semibold">{wine.name}</p>
        <p className="text-[10px] leading-[1.3]">{wine.price}</p>
      </div>
    </button>
  )
}

function ChapterHeading({ children }: { children: React.ReactNode }) {
  return <p className="font-['Delmon_Delicate','Playfair_Display',serif] text-[18px] leading-[1.3] text-[#8c2131]">{children}</p>
}

function MagazineDetail() {
  const navigate = useNavigate()
  const wineCarouselRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; clientX: number; scrollLeft: number; moved: boolean } | null>(null)
  const didDragRef = useRef(false)

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    dragRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    }
    didDragRef.current = false
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const distance = event.clientX - drag.clientX
    if (!drag.moved && Math.abs(distance) > 8) {
      drag.moved = true
      didDragRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (!drag.moved) return
    event.preventDefault()
    event.currentTarget.scrollLeft = drag.scrollLeft - distance
  }

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const card = event.currentTarget.querySelector<HTMLElement>('[data-wine-card]')
    if (!card) return
    const gap = Number.parseFloat(window.getComputedStyle(event.currentTarget).columnGap) || 0
    const step = card.offsetWidth + gap
    event.currentTarget.scrollTo({ left: Math.round(event.currentTarget.scrollLeft / step) * step, behavior: 'smooth' })
  }

  return (
    <div className="w-screen overflow-x-hidden bg-white text-black" data-node-id="1829:6187">
      <section className="relative h-[646px] w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[327px] overflow-hidden">
          <img src={heroImage} alt="수확한 오미자를 선별하는 모습" className="size-full object-cover" />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        </div>
        <div className="absolute inset-x-0 top-[286px] flex h-[360px] items-center justify-center bg-[#831317] px-5 text-center text-white">
          <div className="flex max-w-full flex-col items-center">
            <p className="text-[18px] leading-[1.25] font-medium tracking-[-0.63px]">영동에서 문경까지 오미자가 만드는</p>
            <h2 className="mt-1 font-['Delmon_Delicate','Playfair_Display',serif] text-[41px] leading-[1.25] tracking-[-1.435px]">K-Wine Road</h2>
            <p className="mt-5 text-[16px] leading-[1.5]">국산 청포도 '청수'와<br />세계 유일의 오미자 스파클링 '오미로제'까지</p>
          </div>
        </div>

        <header className="absolute inset-x-0 top-0 z-10 h-[calc(70px+env(safe-area-inset-top))]">
          <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] flex h-[70px] items-center justify-center">
            <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute left-[18px] flex size-6 items-center justify-center">
              <img src={backIcon} alt="" className="size-6 rotate-180" />
            </button>
            <h1 className="text-[18px] leading-none font-bold tracking-[-0.54px] text-white">메거진</h1>
          </div>
        </header>
      </section>

      <main className="px-5 pt-[88px] pb-[137px]">
        <section>
          <ChapterHeading>Chapter 01</ChapterHeading>
          <h2 className="mt-3 text-[24px] leading-[1.3] font-medium text-[#1a1a1a]">영동, '청수'라는 이름의<br />소비뇽 블랑</h2>
          <p className="mt-7 text-[16px] leading-[1.6] tracking-[-0.32px]">
            영동은 40여 개의 농가형 와이너리가 모인 국내 최대 포도 산지입니다. 주인공은 국산 청포도 품종 '청수(淸水)'. 시나브로 와이너리의 '청수 화이트'는 시트러스와 흰 꽃 향이 겹겹이 피어나는 드라이 화이트로, 아시아 와인트로피 금상을 여러 해 수상하며 국산 화이트의 기준이 됐습니다.
          </p>
          <img src={illustration} alt="충청북도 영동군 와인 지도" className="mx-auto mt-6 h-auto w-full max-w-[300px]" />
          <WineryInfo name="시나브로 와이너리" address="충북 영동군 심천면 약목2길 26" description="농가형 와이너리 최초 HACCP 인증 · 가족 소믈리에" image={sinabroWinery} />
        </section>

        <div className="my-9 h-px w-full bg-black/12" />

        <section className="relative">
          <img src={berriesLeft} alt="" className="pointer-events-none absolute top-0 left-[-105px] h-auto w-[205px] opacity-35" />
          <div className="relative z-10 text-right">
            <ChapterHeading>Chapter 02</ChapterHeading>
            <h2 className="mt-3 text-[24px] leading-[1.3] font-medium text-[#1a1a1a]">문경, 다섯 가지 맛으로<br />빚은 스파클링</h2>
          </div>
          <p className="relative z-10 mt-7 text-right text-[16px] leading-[1.6] tracking-[-0.32px]">
            추풍령을 넘으면 문경새재 초입의 오미나라. 위스키 마스터 블렌더 출신 이종기 박사가 다섯 가지 맛의 오미자를 정통 샴페인 공법으로 발효시켜 세계 최초의 오미자 스파클링 '오미로제'를 빚었습니다. 2012년 서울 핵안보정상회의 만찬주에 올랐고, 올해 한·불 수교 140주년 국빈 만찬주로도 선정됐습니다.
          </p>
          <div className="relative mt-8">
            <img src={berriesRight} alt="" className="pointer-events-none absolute right-[-80px] bottom-[-30px] h-auto w-[160px] opacity-35" />
            <WineryInfo name="오미나라" address="경북 문경시 문경읍 새재로 609" description="세계 최초 오미자 스파클링 · 증류소 병설" image={omynaraWinery} />
          </div>
        </section>

        <div className="my-9 h-px w-full bg-black/12" />

        <section className="relative overflow-hidden py-2 text-center">
          <img src={epilogueBackground} alt="" className="pointer-events-none absolute inset-0 size-full object-cover opacity-10" />
          <div className="relative">
            <ChapterHeading>Epilogue</ChapterHeading>
            <h2 className="mt-3 text-[24px] leading-[1.3] font-medium text-[#1a1a1a]">한국 와인을 마신다는 것</h2>
            <p className="mt-7 text-[16px] leading-[1.6] tracking-[-0.32px]">
              영동의 청수 한 잔과 문경의 오미로제 한 잔,<br /><br />두 잔 사이 6km는 한국 와인이 걸어온 거리입니다.<br /><br />이번 주말, 냉장고 속 소비뇽 블랑 대신 청수 한 병을 골라보는 건 어떨까요.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-center font-['Delmon_Delicate','Playfair_Display',serif] text-[26px] leading-[1.3] text-[#8c2131]">Wine in <span className="text-[#831317]">Magazines</span></h2>
          <div
            ref={wineCarouselRef}
            role="region"
            aria-label="매거진 와인 가로 목록"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className="-mx-5 mt-8 flex cursor-grab touch-pan-x snap-x snap-proximity gap-2 overflow-x-auto px-5 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {wines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                onClick={() => {
                  if (didDragRef.current) {
                    didDragRef.current = false
                    return
                  }
                  navigate(`/wine_detail/${wine.type}/${wine.id}`)
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default MagazineDetail
