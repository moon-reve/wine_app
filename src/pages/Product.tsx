import { useNavigate } from 'react-router-dom'
import chateauMargaux from '../assets/product/chateau-margaux.png'
import cabernetSauvignon from '../assets/product/cabernet-sauvignon.png'
import merlot from '../assets/product/merlot.png'
import shiraz from '../assets/product/shiraz.png'
import backIcon from '../assets/product/back.svg'
import reviewAvatar from '../assets/product/review-avatar.svg'

const basicInformation = [
  ['국가', '프랑스'],
  ['생산지역', '보르도 > 마고'],
  ['와이너리', 'Château Margaux'],
  ['품종', '카베르네 소비뇽 75%, 메를로 20%, 카베르네 프랑 5%'],
  ['빈티지', '2018'],
  ['도수', '14.0%'],
  ['용량', '750ml'],
] as const

const tastingNotes = [
  { label: '당도', value: '드라이', width: '20%' },
  { label: '산도', value: '높음', width: '75.13%' },
  { label: '탄닌', value: '높음', width: '80%' },
  { label: '바디감', value: '풍부함', width: '90%' },
  { label: '향', value: '강함', width: '85.13%' },
] as const

const serviceGuide = [
  ['음용 온도', '16 ~ 18°C'],
  ['디캔팅', '20 ~ 30분'],
  ['시음 적기', '2026 ~ 2032'],
  ['추천 글라스', '보르도 글라스'],
  ['오픈 후 보관', '3 ~ 5일'],
] as const

const similarWines = [
  { name: 'Cabernet Sauvignon', detail: '★ 4.6 · KRW 120,000', image: cabernetSauvignon },
  { name: 'Merlot', detail: '★ 4.5 · KRW 95,000', image: merlot },
  { name: 'Shiraz', detail: '★ 4.4 · KRW 88,000', image: shiraz },
] as const

const noScrollbar = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

function Divider() {
  return <div className="h-px w-full shrink-0 bg-black/12" aria-hidden="true" />
}

function OutlineChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-6 shrink-0 items-center rounded-[25px] border border-[#d9d9d9] px-3 text-xs leading-none font-medium tracking-[-0.24px] whitespace-nowrap text-[#595959]">
      {children}
    </span>
  )
}

function TastingGauge({ label, value, width }: (typeof tastingNotes)[number]) {
  return (
    <div className="flex h-[31px] w-full flex-col gap-2">
      <div className="flex items-start justify-between">
        <strong className="text-sm leading-[1.2] font-bold tracking-[-0.28px]">{label}</strong>
        <span className="text-xs leading-[1.2] text-[#737373]">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-[64px] bg-[#e2e2e2]">
        <div className="h-full rounded-[64px] bg-[#831317]" style={{ width }} />
      </div>
    </div>
  )
}

function Review({ rating, children }: { rating: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[39px] w-full items-start gap-2.5">
      <img src={reviewAvatar} alt="" className="size-8 shrink-0 rounded-full" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <p className="font-noto text-xs leading-[1.2] font-medium text-[#831317]">{rating}</p>
        <p className="text-sm leading-[1.5] tracking-[-0.28px] text-[#595959]">{children}</p>
      </div>
    </div>
  )
}

function PurchaseCard({ channel, description, buttonLabel }: { channel: string; description: string; buttonLabel: string }) {
  return (
    <div className="flex h-32 w-full flex-col gap-3 rounded-xl bg-[#f9f7f6] px-[18px] py-4">
      <p className="text-xs leading-[1.2] font-medium text-[#831317]">{channel}</p>
      <p className="text-sm leading-[1.3] font-bold tracking-[-0.28px]">{description}</p>
      <button type="button" className="flex h-10 w-full items-center justify-center rounded-xl border border-[#831317] text-sm leading-none font-bold tracking-[-0.28px] text-[#831317]">
        {buttonLabel}
      </button>
    </div>
  )
}

function Product() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white text-[#0d0d0d]" data-node-id="835:4632">
      <header className="relative h-[70px] w-full bg-white">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-[18px] flex size-6 rotate-180 items-center justify-center">
          <img src={backIcon} alt="" className="size-6" aria-hidden="true" />
        </button>
        <h1 className="absolute top-[26px] left-1/2 -translate-x-1/2 text-lg leading-none font-bold tracking-[-0.54px] whitespace-nowrap">와인 정보</h1>
      </header>

      <main className="flex w-full flex-col gap-[34px] overflow-hidden px-5 pt-3 pb-8">
        <section className="flex h-[477px] w-full flex-col items-center gap-4 overflow-hidden">
          <div className="relative h-80 w-full shrink-0 overflow-hidden rounded-xl bg-[#f8f6f4]">
            <div className="absolute top-[21px] left-1/2 h-[278px] w-[72px] -translate-x-1/2 overflow-hidden">
              <img src={chateauMargaux} alt="Château Margaux 2018" className="absolute top-[-12.56%] left-[-122.22%] h-[122.91%] w-[344.44%] max-w-none" />
            </div>
          </div>
          <p className="text-xs leading-[1.2] font-medium tracking-[-0.24px] text-[#737373]">★★★★☆ 4.8 · 리뷰 248 · 저장 1,329</p>
          <h2 className="font-playfair-sc text-2xl leading-[1.2] font-bold tracking-[-0.48px] whitespace-nowrap">Château Margaux 2018</h2>
          <p className="text-[22px] leading-[1.2] font-bold text-[#831317]">KRW 320,000</p>
          <div className="flex gap-2">
            <OutlineChip>혼술</OutlineChip>
            <OutlineChip>선물하기 좋은</OutlineChip>
          </div>
        </section>

        <Divider />

        <section className="flex h-[364px] flex-col gap-6">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">기본 정보</h2>
          <div className="flex h-64 flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px] text-[14px] leading-[1.45] tracking-[-0.28px]">
            {basicInformation.map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <span className="w-[60px] shrink-0 text-[13px] font-medium tracking-normal text-[#737373]">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex h-[38px] gap-3">
            <span className="h-full w-[3px] shrink-0 bg-[#831317]" />
            <p className="text-xs leading-[1.6] tracking-[-0.24px] text-[#595959]">보르도 1등급 와이너리의 대표 와인. 우아함과 섬세함이 특징이며, 긴 숙성 잠재력을 지니고 있습니다.</p>
          </div>
        </section>

        <Divider />

        <section className="flex h-[351px] flex-col gap-4">
          <div className="flex h-[42px] flex-col gap-1">
            <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">테이스팅 노트</h2>
            <p className="text-xs leading-[1.3] tracking-[-0.24px] text-[#737373]">어떤 맛과 향이 나는지 확인해보세요.</p>
          </div>
          {tastingNotes.map((note) => <TastingGauge key={note.label} {...note} />)}
          <h3 className="text-sm leading-[1.3] font-bold tracking-[-0.28px]">노트</h3>
          <div className="flex gap-2">
            {['블랙체리', '바닐라', '초콜릿', '허브'].map((note) => <OutlineChip key={note}>{note}</OutlineChip>)}
          </div>
        </section>

        <Divider />

        <section className="flex h-[249px] flex-col gap-3.5">
          <div className="flex h-[23px] items-center justify-between">
            <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px]">리뷰</h2>
            <strong className="font-noto text-base leading-[1.2] font-bold text-[#831317]">★ 4.8</strong>
          </div>
          <p className="text-xs leading-[1.2] font-medium text-[#737373]">많이 언급된 키워드</p>
          <div className="flex gap-2">
            {['#과실향', '#부드러운탄닌', '#선물용', '#가성비'].map((tag) => (
              <span key={tag} className="flex h-6 items-center rounded-[25px] bg-[#851317] px-3 text-xs leading-none font-medium tracking-[-0.24px] text-white">{tag}</span>
            ))}
          </div>
          <Review rating="★★★★★">향이 정말 풍부하고 선물용으로도 만족스러웠어요.</Review>
          <Review rating="★★★★☆">스테이크랑 정말 잘 어울렸습니다.</Review>
          <button type="button" className="flex h-10 w-full items-center justify-center rounded-xl border border-[#831317] text-sm leading-none font-bold tracking-[-0.28px] text-[#831317]">리뷰 더보기</button>
        </section>

        <Divider />

        <section className="flex h-[211px] flex-col gap-3">
          <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px]">서비스 가이드</h2>
          <div className="flex h-44 flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px] text-sm leading-[1.45] tracking-[-0.28px]">
            {serviceGuide.map(([label, value]) => (
              <div key={label} className="flex gap-4">
                <span className="w-[86px] shrink-0 font-medium text-[#737373]">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        <section className="flex h-[58px] flex-col gap-3">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">푸드 페어링</h2>
          <div className="flex gap-2">
            {['채끝 스테이크', '양갈비', '숙성 치즈', '다크 초콜릿'].map((food) => <OutlineChip key={food}>{food}</OutlineChip>)}
          </div>
        </section>

        <Divider />

        <section className="flex h-[194px] flex-col gap-3">
          <div className="flex h-11 flex-col gap-1">
            <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">AI 소믈리에</h2>
            <p className="text-sm leading-[1.3] tracking-[-0.28px] text-[#737373]">AI 소믈리에가 이 와인을 분석하고 추천해드립니다.</p>
          </div>
          <div className="flex h-[138px] flex-col gap-3.5 rounded-xl bg-[#851317] p-5">
            <p className="w-[310px] text-sm leading-[1.6] tracking-[-0.28px] text-[#f7f0f0]">이 와인은 풍부한 과실향과 은은한 오크향이 특징입니다. 채끝 스테이크, 양갈비와 특히 잘 어울립니다.</p>
            <button type="button" className="flex h-10 w-full items-center justify-center rounded-[10px] bg-white text-sm leading-none font-bold text-[#851317]">AI에게 질문하기</button>
          </div>
        </section>

        <Divider />

        <section className="flex h-[302px] flex-col gap-3">
          <h2 className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">구매 정보</h2>
          <PurchaseCard channel="온라인" description="KRW 298,000 ~" buttonLabel="판매처 보기" />
          <PurchaseCard channel="오프라인" description="가까운 매장에서 구매 가능" buttonLabel="지도 보기" />
        </section>

        <Divider />

        <section className="flex h-[277px] flex-col gap-3.5 overflow-hidden">
          <div className="flex h-[45px] flex-col gap-1">
            <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px]">비슷한 와인 추천</h2>
            <p className="text-sm leading-[1.3] tracking-[-0.28px] text-[#737373]">이 와인과 비슷한 스타일의 와인을 추천해드려요.</p>
          </div>
          <div className={`flex w-full gap-3.5 overflow-x-auto ${noScrollbar}`}>
            {similarWines.map((wine) => (
              <article key={wine.name} className="flex w-[188px] shrink-0 flex-col gap-2">
                <div className="flex h-[170px] w-[188px] items-center justify-center overflow-hidden rounded-xl bg-[#f8f6f4]">
                  <img src={wine.image} alt={wine.name} className="h-[150px] w-9 object-cover" />
                </div>
                <h3 className="font-playfair-sc w-[188px] text-sm leading-[1.25] font-bold tracking-[-0.14px]">{wine.name}</h3>
                <p className="text-xs leading-[1.2] font-medium whitespace-nowrap text-[#737373]">{wine.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Product
