import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/product/back.svg'
import heroImage from '../assets/event/hero.png'
import wine1 from '../assets/event/wine-1.png'
import wine2 from '../assets/event/wine-2.png'
import wine3 from '../assets/event/wine-3.png'

const eventInfo = [
  { label: '날짜', value: '2026. 08. 14 (금) 14:00 - 20:00' },
  { label: '장소', value: '서울 성수동 언더스탠드에비뉴' },
  { label: '참가비', value: '무료 (시음권 별도)' },
] as const

const relatedWines = [
  { category: 'RED WINE', name: 'Château de eauséjour', image: wine1 },
  { category: 'WHITE WINE', name: 'Cloudy Bay Sauvignon', image: wine2 },
] as const

function Divider() {
  return <div className="h-px w-full shrink-0 bg-black/12" aria-hidden="true" />
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-xl bg-[#f9f7f6] px-[18px] py-[14px]">
      <p className="text-xs leading-[1.2] font-medium text-[#831317]">{label}</p>
      <p className="text-sm leading-[1.3] font-normal tracking-[-0.28px] text-[#0d0d0d]">{value}</p>
    </div>
  )
}

function RelatedWineCard({ category, name, image }: { category: string; name: string; image: string }) {
  return (
    <div className="flex shrink-0 flex-col gap-2.5">
      <div className="h-[170px] w-[188px] shrink-0 overflow-hidden rounded-xl bg-[#f8f6f4]">
        <div className="mx-auto h-[150px] w-9 translate-y-2.5 overflow-hidden">
          <img src={image} alt={name} className="size-full object-cover" />
        </div>
      </div>
      <p className="text-xs leading-[1.2] font-normal tracking-[-0.24px] text-[#737373]">{category}</p>
      <p className="w-[188px] text-base leading-[1.25] font-semibold tracking-[-0.16px] text-[#0d0d0d]">{name}</p>
    </div>
  )
}

function RuffinoChiantiCard() {
  return (
    <div className="flex shrink-0 flex-col gap-2.5">
      <div className="h-[170px] w-[188px] shrink-0 overflow-hidden rounded-xl bg-[#f8f6f4]">
        <div className="mx-auto h-[150px] w-9 translate-y-2.5 overflow-hidden">
          <img src={wine3} alt="Ruffino Chianti" className="size-full object-cover" />
        </div>
      </div>
      <p className="font-noto text-[10px] leading-[1.2] font-medium tracking-[0.6px] text-[#737373]">RED WINE</p>
      <p className="font-playfair-sc w-[188px] text-sm leading-[1.25] font-bold tracking-[-0.14px] text-[#0d0d0d]">
        Ruffino Chianti
      </p>
    </div>
  )
}

function Event() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white text-[#0d0d0d]" data-node-id="1147:3445">
      <header className="relative flex h-[70px] w-full items-center justify-center bg-white">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="absolute top-5 left-[18px] flex size-6 rotate-180 items-center justify-center"
        >
          <img src={backIcon} alt="" className="size-6" aria-hidden="true" />
        </button>
        <h1 className="font-playfair text-xl leading-none font-bold tracking-[-0.4px] whitespace-nowrap text-[#831317]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          Wine Festival
        </h1>
      </header>

      <div className="h-[280px] w-full shrink-0">
        <img src={heroImage} alt="와인 페스티벌 현장" className="size-full object-cover" />
      </div>

      <main className="flex w-full flex-col gap-7 px-5 pt-6 pb-8">
        <section className="flex flex-col gap-3">
          <span className="flex w-fit items-center rounded-full bg-[#831317] px-3 py-[5px] text-xs leading-none font-medium tracking-[-0.24px] text-white">
            FESTIVAL
          </span>
          <h2 className="font-playfair text-[30px] leading-[1.25] font-bold tracking-[-0.6px] text-[#831317]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            Summer Wine Festival
          </h2>
          <p className="text-sm leading-[1.3] font-normal tracking-[-0.28px] text-[#737373]">2026.08.14 · 서울 성수</p>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">행사 소개</h2>
          <div className="w-full rounded-xl bg-[#f9f7f6] px-[18px] py-4">
            <p className="text-sm leading-[1.65] font-normal tracking-[-0.28px] text-[#595959]">
              국내외 다양한 와인을 직접 시음할 수 있는 행사입니다. 와인 전문가들이 큐레이션한 프리미엄 컬렉션과 함께 성수동의
              세련된 감성을 느껴보세요.
            </p>
          </div>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">행사 정보</h2>
          {eventInfo.map((info) => (
            <InfoCard key={info.label} label={info.label} value={info.value} />
          ))}
        </section>

        <Divider />

        <section className="flex flex-col gap-3.5">
          <div className="flex w-full items-center">
            <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px] whitespace-nowrap">관련 와인</h2>
            <div className="h-px flex-1" />
            <button type="button" className="text-xs leading-none font-normal tracking-[-0.36px] whitespace-nowrap text-[#831317]">
              전체보기
            </button>
          </div>
          <div className={`-mx-5 flex gap-3.5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
            {relatedWines.map((wine) => (
              <RelatedWineCard key={wine.name} category={wine.category} name={wine.name} image={wine.image} />
            ))}
            <RuffinoChiantiCard />
          </div>
        </section>

        <button type="button" className="flex w-full items-center justify-center rounded-xl bg-[#831317] py-[17px] text-base leading-none font-bold text-white">
          참여 신청
        </button>
      </main>
    </div>
  )
}

export default Event
