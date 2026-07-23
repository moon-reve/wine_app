import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/magazine-detail/back.svg'
import berriesLeft from '../assets/magazine-detail/berries-left.png'
import berriesRight from '../assets/magazine-detail/berries-right.png'
import epilogueBackground from '../assets/magazine-detail/epilogue-bg.png'
import heroImage from '../assets/magazine-detail/hero.png'
import illustrationMask from '../assets/magazine-detail/illustration-mask.svg'
import illustration from '../assets/magazine-detail/illustration.png'
import placeholderFrame from '../assets/magazine-detail/placeholder.svg'
import product1 from '../assets/magazine-detail/product-1.png'
import product2 from '../assets/magazine-detail/product-2.png'
import product3 from '../assets/magazine-detail/product-3.png'

const wines = [
  { name: '시나브로 청수 화이트 와인', price: '₩ 40,000원', image: product1, imageClassName: 'h-[100.38%] left-[0.03%] top-0 w-full' },
  { name: '오미로제, 결', price: '₩ 150,000원', image: product2, imageClassName: 'h-[105.81%] left-[-39.96%] top-[-2.95%] w-[139.96%]' },
  { name: '오미로제 프리미엄', price: '₩ 43,000원', image: product3, imageClassName: 'h-full left-[-28.79%] top-[0.15%] w-[132.35%]' },
] as const

function WineryInfo({ top, left, name, address, description }: { top: number; left: number; name: string; address: string; description: string }) {
  return (
    <div className="absolute flex flex-col items-start gap-3" style={{ top, left }}>
      <div className="relative size-[76px] shrink-0">
        <img src={placeholderFrame} alt="" className="absolute inset-[-0.66%] size-[101.32%] max-w-none" />
        <span className="absolute top-[31px] left-7 text-center font-['Arial',sans-serif] text-[11px] leading-normal text-[#999]">IMG</span>
      </div>
      <div className="flex flex-col items-start gap-3.5">
        <h3 className="text-[18px] leading-normal font-bold whitespace-nowrap text-[#111]">{name}</h3>
        <div className="flex flex-col gap-1 text-[14px] leading-normal font-normal tracking-[-0.28px] whitespace-nowrap text-[#666]">
          <p>{address}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

function WineCard({ wine }: { wine: (typeof wines)[number] }) {
  return (
    <article className="relative h-[175px] w-44 shrink-0 snap-start overflow-hidden rounded-xl">
      <img src={wine.image} alt={wine.name} draggable={false} className={`absolute max-w-none ${wine.imageClassName}`} />
      <div className="absolute inset-x-0 bottom-0 h-[88px] rounded-xl bg-gradient-to-b from-transparent to-black/50" />
      <span className="absolute top-3.5 left-3.5 flex h-[22px] w-[69px] items-center justify-center rounded-full bg-white/50 text-center text-[12px] leading-4 font-medium text-black backdrop-blur-[2px]">Korea</span>
      <div className="absolute top-[133px] left-3.5 flex w-[145px] flex-col items-start gap-[3px] leading-normal whitespace-nowrap text-white">
        <p className="text-[12px] font-semibold">{wine.name}</p>
        <p className="text-[10px] font-normal">{wine.price}</p>
      </div>
    </article>
  )
}

function MagazineDetail() {
  const navigate = useNavigate()
  const wineCarouselRef = useRef<HTMLDivElement>(null)
  const wineCarouselDragRef = useRef<{ pointerId: number; clientX: number; scrollLeft: number } | null>(null)

  const handleCarouselPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    wineCarouselDragRef.current = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.style.cursor = 'grabbing'
  }

  const handleCarouselPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = wineCarouselDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    event.preventDefault()
    event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.clientX)
  }

  const handleCarouselPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = wineCarouselDragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    wineCarouselDragRef.current = null
    event.currentTarget.style.cursor = 'grab'
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const card = event.currentTarget.querySelector<HTMLElement>('article')
    if (!card) return
    const gap = Number.parseFloat(window.getComputedStyle(event.currentTarget).columnGap) || 0
    const cardStep = card.offsetWidth + gap
    const targetIndex = Math.round(event.currentTarget.scrollLeft / cardStep)
    event.currentTarget.scrollTo({ left: targetIndex * cardStep, behavior: 'smooth' })
  }

  return (
    <div className="relative mx-auto min-h-[3139px] w-full max-w-107.5 overflow-hidden bg-white text-black" data-node-id="1546:7825">
      <img src={heroImage} alt="수확한 오미자를 선별하는 모습" className="absolute top-[-211px] left-0 h-[538px] w-[430px] max-w-none" />
      <div className="absolute top-[286px] left-0 h-[360px] w-[431px] bg-[linear-gradient(150.82deg,#6a0a0d_51.022%,#950509_106.82%)]" />

      <header className="absolute top-0 left-0 z-10 h-17.5 w-full overflow-hidden">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-4.5 flex size-6 items-center justify-center">
          <img src={backIcon} alt="" className="size-6 rotate-180" />
        </button>
        <h1 className="absolute top-6.5 left-[190.5px] text-[18px] leading-none font-bold tracking-[-0.54px] whitespace-nowrap text-white">메거진</h1>
      </header>

      <div className="absolute top-[345px] left-5 text-[25px] leading-[1.25] font-semibold tracking-[-0.875px] whitespace-nowrap text-white">
        <p>영동에서 문경까지</p>
        <p>오미자가 만드는</p>
      </div>
      <p className="absolute top-[408px] left-5 font-['Delmon_Delicate','Playfair_Display',serif] text-[41px] leading-[1.25] font-normal tracking-[-1.435px] whitespace-nowrap text-white">K-Wine Road</p>
      <div className="absolute top-[475px] left-5 w-[316px] text-[14px] leading-[1.5] font-normal text-white">
        <p>국산 청포도 '청수'와 세계 유일의 오미자</p>
        <p>스파클링 '오미로제'까지</p>
      </div>

      <p className="font-delmon-script absolute top-[663px] left-[calc(50%-37px)] -translate-x-1/2 text-center text-[100px] leading-[1.3] font-normal tracking-[-2px] whitespace-nowrap text-black/5">Chapter 01</p>
      <p className="absolute top-[739px] left-5 font-['Delmon_Delicate','Playfair_Display',serif] text-[18px] leading-[1.3] font-normal whitespace-nowrap text-[#8c2131]">Chapter 01</p>
      <div className="absolute top-[774px] left-[22px] text-[24px] leading-[1.3] font-medium whitespace-nowrap text-[#1a1a1a]">
        <p>영동, '청수'라는 이름의</p>
        <p>소비뇽 블랑</p>
      </div>
      <div className="absolute top-[930px] left-[18px] w-[393px] text-[16px] leading-[1.6] font-normal tracking-[-0.32px] text-black">
        <p>영동은 40여 개의 농가형</p><p>와이너리가 모인 국내 최대</p><p>포도 산지입니다. 주인공은</p><p>국산 청포도 품종 '청수(淸水)'.</p><p>시나브로 와이너리의 '청수</p><p>화이트'는 시트러스와 흰 꽃</p><p>향이 겹겹이 피어나는 드라이</p><p>화이트로, 아시아 와인트로피 금상</p><p>을 여러 해 수상하며 국산 화이트의</p><p>기준이 됐습니다.</p>
      </div>
      <div
        className="absolute top-[806px] left-[193px] h-[416px] w-[443.524px] overflow-hidden"
        style={{
          WebkitMaskImage: `url(${illustrationMask})`,
          maskImage: `url(${illustrationMask})`,
          WebkitMaskSize: '443.524px 416px',
          maskSize: '443.524px 416px',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <img
          src={illustration}
          alt="충청북도 영동군 와인 지도"
          className="absolute top-[-1.141px] left-[0.365px] h-[410.141px] w-[240.5px] max-w-none object-cover"
        />
      </div>
      <WineryInfo top={1271} left={22} name="시나브로 와이너리" address="충북 영동군 심천면 약목2길 26" description="농가형 와이너리 최초 HACCP 인증 · 가족 소믈리에" />

      <p className="font-delmon-script absolute top-[1482px] left-[calc(50%+30px)] -translate-x-1/2 text-center text-[100px] leading-[1.3] font-normal tracking-[-2px] whitespace-nowrap text-black/5">Chapter 02</p>
      <img src={berriesLeft} alt="" className="absolute top-[1561px] left-[-104px] h-[273px] w-[205px] object-cover opacity-90" />
      <p className="absolute top-[1573px] left-[318px] font-['Delmon_Delicate','Playfair_Display',serif] text-[18px] leading-[1.3] font-normal whitespace-nowrap text-[#8c2131]">Chapter 02</p>
      <div className="absolute top-[1609px] right-5 text-right font-noto text-[24px] leading-[1.3] font-medium whitespace-nowrap text-[#1a1a1a]">
        <p>문경, 다섯 가지 맛으로</p><p>빚은 스파클링</p>
      </div>
      <div className="absolute top-[1765px] right-5 w-[397px] text-right text-[16px] leading-[1.6] font-normal tracking-[-0.32px] text-black">
        <p>추풍령을 넘으면 문경새재 초입의 오미나라.</p><p>위스키 마스터 블렌더 출신 이종기 박사가</p><p>다섯 가지 맛의 오미자를 정통 샴페인 공법으로 발효시켜</p><p>세계 최초의 오미자 스파클링 '오미로제'를 빚었습니다.</p><p>2012년 서울 핵안보정상회의 만찬주에 올랐고,</p><p>올해 한·불 수교 140주년 국빈 만찬주로도 선정됐습니다.</p>
      </div>
      <img src={berriesRight} alt="" className="absolute top-[1964px] left-[299px] h-[280px] w-[200px] max-w-none object-cover" />
      <WineryInfo top={2035} left={20} name="오미나라" address="경북 문경시 문경읍 새재로 609" description="세계 최초 오미자 스파클링 · 증류소 병설" />

      <p className="font-delmon-script absolute top-[2266px] left-[calc(50%-0.5px)] -translate-x-1/2 text-center text-[100px] leading-[1.3] font-normal tracking-[-2px] whitespace-nowrap text-black/5">Epilogue</p>
      <p className="absolute top-[2339px] left-[calc(50%-36px)] font-['Delmon_Delicate','Playfair_Display',serif] text-[18px] leading-[1.3] font-normal whitespace-nowrap text-[#8c2131]">Epilogue</p>
      <p className="absolute top-[2375px] left-[calc(50%-119px)] font-noto text-[24px] leading-[30.895px] font-medium whitespace-nowrap text-[#1a1a1a]">한국 와인을 마신다는 것</p>
      <img src={epilogueBackground} alt="" className="absolute top-[2534px] left-[-3px] h-[291px] w-[436px] object-cover opacity-10" />
      <div className="absolute top-[2499px] left-1/2 w-[377px] -translate-x-1/2 text-center text-[16px] leading-[1.6] font-normal tracking-[-0.32px] text-black">
        <p>영동의 청수 한 잔과</p><p>문경의 오미로제 한 잔,</p><p>&nbsp;</p><p>두 잔 사이 6km는</p><p>한국 와인이 걸어온 거리입니다.</p><p>&nbsp;</p><p>이번 주말, 냉장고 속 소비뇽 블랑 대신</p><p>청수 한 병을 골라보는 건 어떨까요.</p>
      </div>

      <p className="absolute top-[2873px] left-[104px] font-['Delmon_Delicate','Playfair_Display',serif] text-[26px] leading-[1.3] font-normal whitespace-nowrap text-[#8c2131]">Wine in <span className="text-[#841317]">Magazines</span></p>
      <div
        ref={wineCarouselRef}
        role="region"
        aria-label="매거진 와인 가로 목록"
        onPointerDown={handleCarouselPointerDown}
        onPointerMove={handleCarouselPointerMove}
        onPointerUp={handleCarouselPointerEnd}
        onPointerCancel={handleCarouselPointerEnd}
        className="absolute top-[2931px] right-0 left-5 flex cursor-grab touch-pan-x snap-x snap-proximity scroll-smooth gap-1.5 overflow-x-auto overscroll-x-contain pr-5 select-none [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {wines.map((wine) => <WineCard key={wine.name} wine={wine} />)}
      </div>
    </div>
  )
}

export default MagazineDetail
