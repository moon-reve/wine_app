import { useNavigate, useParams } from 'react-router-dom'
import backIcon from '../assets/wine-detail-red/back.svg'
import bookmarkIcon from '../assets/wine-detail-red/bookmark.svg'
import grapes from '../assets/wine-detail-red/grapes.png'
import heartIcon from '../assets/wine-detail-red/heart.svg'
import { formatPrice, formatStars, getWineDetailData, resolveWineImage } from '../data/wineDetailData'

function Divider({ top }: { top: number }) {
  return <div className="absolute left-5 h-px w-[390px] bg-black/12" style={{ top }} />
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <span className={`flex h-6 items-center rounded-[25px] px-3 text-[12px] leading-none font-medium tracking-[-0.24px] whitespace-nowrap ${active ? 'bg-[#851317] text-white' : 'border border-[#d9d9d9] text-[#595959]'}`}>{children}</span>
}

function ReviewAvatar({ src }: { src?: string }) {
  return (
    <span className="block size-8 shrink-0 overflow-hidden rounded-full bg-[#ebe3e0]">
      {src && (
        <img
          src={src}
          alt=""
          className="size-full object-cover"
          onError={(event) => { event.currentTarget.hidden = true }}
        />
      )}
    </span>
  )
}

function Review({ rating, children, avatarSrc }: { rating: number; children: React.ReactNode; avatarSrc?: string }) {
  return (
    <div className="flex gap-2.5">
      <ReviewAvatar src={avatarSrc} />
      <div className="flex flex-col gap-1">
        <p className="font-noto text-[12px] leading-[1.2] font-medium text-[#831317]">{formatStars(rating)}</p>
        <p className="w-[348px] text-[14px] leading-[1.5] tracking-[-0.28px] text-[#595959]">{children}</p>
      </div>
    </div>
  )
}

function PurchaseCard({ type, text, button }: { type: string; text: string; button: string }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-[#f9f7f6] px-[18px] py-4">
      <p className="text-[12px] leading-[1.2] font-medium text-[#831317]">{type}</p>
      <p className="text-[14px] leading-[1.3] font-bold tracking-[-0.28px]">{text}</p>
      <button type="button" className="flex h-10 items-center justify-center rounded-xl border border-[#831317] text-[14px] leading-none font-bold tracking-[-0.28px] text-[#831317]">{button}</button>
    </div>
  )
}

export default function WineDetailRed() {
  const navigate = useNavigate()
  const { wineId } = useParams()
  const { wine, wineReviews, similarWines, reviewKeywords, typeLabel } = getWineDetailData(wineId ?? 'wine_018')
  const heroWineImage = resolveWineImage(wine)
  const info = [
    ['국가', wine.country], ['생산지역', wine.region], ['와이너리', wine.winery],
    ['품종', wine.grapeComposition], ['빈티지', wine.vintage], ['도수', `${wine.alcohol.toFixed(1)}%`], ['용량', `${wine.volumeMl}ml`],
  ] as const
  const tasting = [
    ['당도', wine.tasting.sweetness], ['산도', wine.tasting.acidity], ['탄닌', wine.tasting.tannin],
    ['바디감', wine.tasting.body], ['향', wine.tasting.aroma],
  ] as const
  const service = [
    ['음용 온도', wine.service.servingTemperature], ['디캔팅', wine.service.decanting], ['시음 적기', wine.service.drinkingWindow],
    ['추천 글라스', wine.service.glass], ['오픈 후 보관', wine.service.afterOpening],
  ] as const

  return (
    <div className="relative mx-auto h-[3301px] w-full max-w-[430px] overflow-hidden bg-white font-pretendard text-[#0d0d0d]" data-node-id="1546:5755">
      <header className="absolute top-0 left-0 z-10 h-[70px] w-full bg-white">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-[18px] flex size-6 rotate-180 items-center justify-center">
          <img src={backIcon} alt="" className="size-6" />
        </button>
        <h1 className="absolute top-[26px] left-1/2 -translate-x-1/2 text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">와인 정보</h1>
      </header>

      <p className="absolute top-[169px] right-5 text-[12px] leading-[1.2] font-medium tracking-[-0.24px] whitespace-nowrap text-[#737373]"><span className="text-[#831317]">{formatStars(wine.rating)} {wine.rating.toFixed(1)}</span> · 리뷰 {wine.reviewCount.toLocaleString()} · 저장 {wine.saveCount.toLocaleString()}</p>
      <p className="absolute top-[188px] right-5 w-[255px] text-right font-['Delmon_Delicate','Playfair_Display',serif] text-[42px] leading-[1.3] tracking-[-1.26px]">{wine.nameEn}</p>
      <h2 className="absolute top-[319px] right-5 max-w-[270px] text-right text-[24px] leading-[1.2] font-bold tracking-[-0.48px]">{wine.nameKo} {wine.vintage}</h2>
      <p className="absolute top-[351px] right-5 text-[22px] leading-[1.2] font-bold whitespace-nowrap text-[#831317]">{formatPrice(wine.price)}</p>
      <div className="absolute top-[398px] right-5 flex gap-2">{wine.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>

      <div className="absolute top-[169px] left-[23px] h-[556px] w-36 overflow-hidden">
        <img src={heroWineImage} alt={`${wine.nameKo} ${wine.vintage}`} className="size-full object-contain" />
      </div>
      <div className="absolute top-[504.36px] left-[83px] flex h-[287.943px] w-[373.32px] items-center justify-center">
        <div className="h-[222.763px] w-[333.981px] rotate-[12.12deg]">
          <img src={grapes} alt="" className="size-full max-w-none object-cover" />
        </div>
      </div>

      <main className="absolute top-[746px] left-0 h-[2571px] w-full overflow-hidden">
        <section className="absolute top-3 left-5 h-[402px] w-[390px]">
          <div className="absolute top-[18px] left-0 flex h-6 w-full items-center justify-between">
            <h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">기본 정보</h2>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="찜하기" className="flex size-6 items-center justify-center"><img src={heartIcon} alt="" className="size-[19px]" /></button>
              <button type="button" aria-label="공유하기" className="flex size-6 items-center justify-center"><img src={bookmarkIcon} alt="" className="h-[19px] w-[17px]" /></button>
            </div>
          </div>
          <p className="absolute top-[54px] left-0 text-[12px] leading-[1.2] tracking-[-0.24px] text-black/60">{typeLabel} &gt; {wine.country} &gt; {wine.region}</p>
          <div className="absolute top-[84px] left-0 flex w-full flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px] text-[14px] leading-[1.45]">
            {info.map(([label, value]) => <div key={label} className="flex gap-4"><span className="w-[60px] shrink-0 font-medium text-[#737373]">{label}</span><span className="w-[278px] tracking-[-0.28px]">{value}</span></div>)}
          </div>
          <div className="absolute top-[364px] left-0 flex h-[38px] items-center gap-3"><span className="h-full w-[3px] bg-[#831317]" /><p className="w-[360px] text-[12px] leading-[1.6] tracking-[-0.24px] text-[#595959]">{wine.description}</p></div>
        </section>

        <Divider top={448} />
        <section className="absolute top-[483px] left-5 flex w-[390px] flex-col gap-4">
          <div className="flex flex-col gap-1"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">테이스팅 노트</h2><p className="text-[12px] leading-[1.3] tracking-[-0.24px] text-[#737373]">어떤 맛과 향이 나는지 확인해보세요.</p></div>
          {tasting.map(([label, value]) => <div key={label} className="flex flex-col gap-2"><div className="flex justify-between"><strong className="text-[14px] leading-[1.2] tracking-[-0.28px]">{label}</strong><span className="text-[12px] leading-[1.2] text-[#737373]">{value.label}</span></div><div className="h-1.5 rounded-full bg-[#e2e2e2]"><div className="h-full rounded-full bg-[#831317]" style={{ width: `${value.score * 20}%` }} /></div></div>)}
          <h3 className="text-[14px] leading-[1.3] font-bold tracking-[-0.28px]">노트</h3>
          <div className="flex gap-2">{wine.tastingNotes.map((note) => <Chip key={note}>{note}</Chip>)}</div>
        </section>

        <Divider top={868} />
        <section className="absolute top-[903px] left-5 flex w-[390px] flex-col gap-3.5">
          <div className="flex items-center justify-between"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.32px]">리뷰</h2><strong className="text-[16px] leading-[1.2] text-[#831317]">★ {wine.rating.toFixed(1)}</strong></div>
          <p className="text-[12px] leading-[1.2] font-medium tracking-[-0.24px] text-[#737373]">많이 언급된 키워드</p>
          {reviewKeywords.length > 0 && (
            <div className="flex gap-2">
              {reviewKeywords.map((keyword) => <Chip key={keyword} active>#{keyword}</Chip>)}
            </div>
          )}
          {wineReviews.slice(0, 2).map((review) => <Review key={review.id} rating={review.rating}>{review.content}</Review>)}
          <button type="button" className="flex h-10 items-center justify-center rounded-xl border border-[#831317] text-[14px] leading-none font-bold tracking-[-0.28px] text-[#831317]">리뷰 더보기</button>
        </section>

        <Divider top={1186} />
        <section className="absolute top-[1221px] left-5 flex w-[390px] flex-col gap-3">
          <h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">서비스 가이드</h2>
          <div className="flex flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px] text-[14px] leading-[1.45] tracking-[-0.28px]">{service.map(([label, value]) => <div key={label} className="flex gap-4"><span className="w-[86px] shrink-0 font-medium text-[#737373]">{label}</span><span>{value}</span></div>)}</div>
        </section>

        <Divider top={1466} />
        <section className="absolute top-[1501px] left-5 flex w-[390px] flex-col gap-3"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">푸드 페어링</h2><div className="flex gap-2">{wine.foodPairings.map((food) => <Chip key={food}>{food}</Chip>)}</div></section>

        <section className="absolute top-[1593px] left-5 w-[390px] rounded-xl bg-[#851317] p-5">
          <p className="w-full text-[14px] leading-[1.6] tracking-[-0.28px] text-[#f7f0f0]">{wine.aiRecommendation}</p>
          <button type="button" className="mt-3.5 flex h-10 w-full items-center justify-center rounded-[10px] bg-white text-[14px] leading-none font-bold text-[#851317]">AI에게 질문하기</button>
        </section>

        <Divider top={1766} />
        <section className="absolute top-[1802px] left-5 flex w-[390px] flex-col gap-3"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">구매 정보</h2><PurchaseCard type="온라인" text={`${formatPrice(wine.purchase.onlineFrom)} ~`} button="판매처 보기" /><PurchaseCard type="오프라인" text={wine.purchase.offlineAvailable ? '가까운 매장에서 구매 가능' : '온라인 구매만 가능'} button="지도 보기" /></section>

        <Divider top={2138} />
        <section className="absolute top-[2173px] left-5 flex w-[390px] flex-col gap-3.5 overflow-visible">
          <div className="flex flex-col gap-1"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">비슷한 와인 추천</h2><p className="text-[14px] leading-[1.3] tracking-[-0.28px] text-[#737373]">이 와인과 비슷한 스타일의 와인을 추천해드려요.</p></div>
          <div className="flex gap-3.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {similarWines.map((item) => <article key={item.id} className="flex w-[188px] shrink-0 flex-col gap-2"><div className="flex h-[170px] w-[188px] items-center justify-center overflow-hidden rounded-xl bg-[#f8f6f4]"><img src={resolveWineImage(item)} alt={item.nameKo} className="h-[150px] max-w-[80px] object-contain" /></div><h3 className="w-[188px] text-[14px] leading-[1.25] font-semibold tracking-[-0.14px]">{item.nameKo}</h3><p className="text-[12px] leading-[1.2] font-medium whitespace-nowrap text-[#737373]">★ {item.rating.toFixed(1)} · {formatPrice(item.price)}</p></article>)}
          </div>
        </section>
      </main>
    </div>
  )
}
