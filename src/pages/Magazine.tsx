import heroImage from '../assets/magazine/hero.png'
import decorativeBerries from '../assets/magazine/decorative-berries.png'
import decorativeTexture from '../assets/magazine/decorative-texture.png'
import product1 from '../assets/magazine/product-1.png'
import product2 from '../assets/magazine/product-2.png'
import product3 from '../assets/magazine/product-3.png'

const noScrollbar = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

const magazineWines = [
  { name: '시나브로 청수 화이트 와인', price: '₩ 40,000원', image: product1, imageClassName: 'h-[148px]' },
  { name: '오미로제, 결', price: '₩ 150,000원', image: product2, imageClassName: 'h-[160px]' },
  { name: '오미로제 프리미엄', price: '₩ 43,000원', image: product3, imageClassName: 'h-[148px]' },
] as const

function SectionDivider() {
  return <div className="h-px w-full shrink-0 bg-black/12" aria-hidden="true" />
}

function ChapterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-playfair text-[28px] leading-[35.308px] font-bold text-[#8c2131]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
      {children}
    </h2>
  )
}

function ChapterSubheading({ children }: { children: React.ReactNode }) {
  return <p className="font-noto mt-1 text-[20px] leading-[30.895px] font-medium text-[#1a1a1a]">{children}</p>
}

function WineryInfo({ name, address, description }: { name: string; address: string; description: string }) {
  return (
    <div className="mt-[43px] flex items-start gap-3">
      <div className="flex size-[76px] shrink-0 items-center justify-center rounded-[4px] border border-[#ccc] bg-[#eee]">
        <p className="text-[11px] text-[#999]">IMG</p>
      </div>
      <div className="flex flex-col gap-[9px]">
        <div className="flex flex-col gap-[7px]">
          <p className="text-[18px] leading-[normal] font-bold text-[#111]">{name}</p>
          <p className="text-[13px] leading-[normal] font-normal text-[#666]">{address}</p>
        </div>
        <p className="text-[13px] leading-[normal] font-normal text-[#666]">{description}</p>
      </div>
    </div>
  )
}

function MagazineWineCard({ wine }: { wine: (typeof magazineWines)[number] }) {
  return (
    <div className="relative h-[263px] w-[167px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-white/10 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <div className={`relative w-full ${wine.imageClassName}`}>
        <img src={wine.image} alt={wine.name} className="absolute inset-0 size-full rounded-t-[20px] object-cover" />
        <span className="absolute bottom-0 left-2 flex h-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-[#e1dfdb]/10 px-4 py-2 backdrop-blur-sm">
          <span className="font-playfair text-[12px] leading-4 font-bold tracking-[0.96px] whitespace-nowrap text-white" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            Korea
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-[7px] px-3 pt-[14px]">
        <p className="text-[12px] leading-[normal] font-semibold text-[#111]">{wine.name}</p>
        <p className="text-[10px] leading-[normal] font-normal text-[#666]">{wine.price}</p>
      </div>
      <button
        type="button"
        className="absolute bottom-[15px] left-3 flex h-8 w-[141px] items-center justify-center rounded-[9px] bg-[#851317] text-[10px] leading-[normal] font-medium tracking-[-0.2px] text-white"
      >
        판매 사이트로 이동하기
      </button>
    </div>
  )
}

function Magazine() {
  return (
    <div className="relative w-full overflow-hidden bg-white text-[#0d0d0d]" data-node-id="835:4530" data-name="MAGAZINE">
      <div className="relative h-[490px] w-full overflow-hidden">
        <img src={heroImage} alt="포도를 압착하는 모습" className="absolute inset-0 size-full object-cover" />
        <p
          className="font-playfair-sc absolute inset-x-0 top-2 text-center text-[75px] leading-[1.3] tracking-[-1.5px] text-[#831317]"
        >
          Magazine
        </p>
      </div>

      <main className="relative px-5 pt-7 pb-8">
        <img
          src={decorativeTexture}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-[10px] left-[53px] h-[513px] w-[510px] object-cover opacity-50"
        />

        <section className="relative">
          <ChapterHeading>Chapter 01</ChapterHeading>
          <ChapterSubheading>영동, '청수'라는 이름의 소비뇽 블랑</ChapterSubheading>
          <p className="mt-[26px] text-[16px] leading-[24px] font-normal tracking-[-0.32px] text-black">
            영동은 40여 개의 농가형 와이너리가 모인 국내 최대 포도 산지입니다. 주인공은 국산 청포도 품종 '청수(淸水)'. 시나브로
            와이너리의 '청수 화이트'는 시트러스와 흰 꽃 향이 겹겹이 피어나는 드라이 화이트로, 아시아 와인트로피 금상을 여러 해
            수상하며 국산 화이트의 기준이 됐습니다.
          </p>
          <WineryInfo
            name="시나브로 와이너리"
            address="충북 영동군 심천면 약목2길 26"
            description="농가형 와이너리 최초 HACCP 인증 · 가족 소믈리에"
          />
        </section>

        <SectionDivider />
        <div className="mt-[31px]">
          <ChapterHeading>Chapter 02</ChapterHeading>
        </div>
        <ChapterSubheading>문경, 다섯 가지 맛으로 빚은 스파클링</ChapterSubheading>
        <p className="mt-[26px] text-[16px] leading-[24px] font-normal text-black">
          추풍령을 넘으면 문경새재 초입의 오미나라. 위스키 마스터 블렌더 출신 이종기 박사가 다섯 가지 맛의 오미자를 정통 샴페인
          공법으로 발효시켜 세계 최초의 오미자 스파클링 '오미로제'를 빚었습니다. 2012년 서울 핵안보정상회의 만찬주에 올랐고,
          올해 한·불 수교 140주년 국빈 만찬주로도 선정됐습니다.
        </p>
        <WineryInfo
          name="오미나라"
          address="경북 문경시 문경읍 새재로 609"
          description="세계 최초 오미자 스파클링 · 증류소 병설"
        />
        <img
          src={decorativeBerries}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-[-49px] right-[-131px] h-[271px] w-[162px] object-cover"
        />

        <div className="mt-[30px]">
          <SectionDivider />
        </div>
        <div className="mt-[31px]">
          <ChapterHeading>Epilogue</ChapterHeading>
        </div>
        <ChapterSubheading>한국 와인을 마신다는 것</ChapterSubheading>
        <p className="mt-[26px] text-[16px] leading-[24px] font-normal text-black">
          영동의 청수 한 잔과 문경의 오미로제 한 잔, 두 잔 사이 6km는 한국 와인이 걸어온 거리입니다. 이번 주말, 냉장고 속
          소비뇽 블랑 대신 청수 한 병을 골라보는 건 어떨까요.
        </p>

        <div className="mt-[31px]">
          <SectionDivider />
        </div>
        <h2 className="font-playfair mt-[31px] text-[28px] leading-[35.308px] font-bold text-[#8c2131]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          Wine in <span className="text-[#841317]">Magazines</span>
        </h2>

        <div className={`mt-[44px] -mx-5 flex snap-x snap-mandatory gap-[9px] overflow-x-auto px-5 pb-1 scroll-pl-5 ${noScrollbar}`}>
          {magazineWines.map((wine) => (
            <MagazineWineCard key={wine.name} wine={wine} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Magazine
