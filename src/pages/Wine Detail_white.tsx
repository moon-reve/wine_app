import { useNavigate } from 'react-router-dom'
import avatar from '../assets/wine-detail-white/avatar.svg'
import backIcon from '../assets/wine-detail-white/back.svg'
import bookmarkIcon from '../assets/wine-detail-white/bookmark.svg'
import grapes from '../assets/wine-detail-white/grapes.png'
import heartIcon from '../assets/wine-detail-white/heart.svg'
import heroWine from '../assets/wine-detail-white/hero-wine.png'
import recommend1 from '../assets/wine-detail-white/recommend-1.png'
import recommend3 from '../assets/wine-detail-white/recommend-3.png'

const info = [
  ['국가', '프랑스'], ['생산지역', '부르고뉴'], ['와이너리', 'Vin De Rolfcgone'],
  ['품종', '샤르도네'], ['빈티지', '2019'], ['도수', '12.0%'], ['용량', '850ml'],
] as const

const tasting = [
  ['당도', '드라이', '221px'], ['산도', '낮음', '148px'], ['탄닌', '중간', '191px'],
  ['바디감', '풍부함', '356px'], ['향', '강함', '291px'],
] as const

const service = [
  ['음용 온도', '8 ~ 12°C'], ['디캔팅', '10 ~ 20분'], ['시음 적기', '2026 ~ 2029'],
  ['추천 글라스', '부르고뉴 글라스'], ['오픈 후 보관', '3 ~ 5일'],
] as const

const similar = [
  ['테 마타 에스테이트 샤르도네', '★ 4.6 · KRW 120,000', recommend1],
  ['카베르네 소비뇽', '★ 4.5 · KRW 95,000', heroWine],
  ['Shiraz', '★ 4.4 · KRW 88,000', recommend3],
] as const

function Divider({ top }: { top: number }) {
  return <div className="absolute left-5 h-px w-[390px] bg-black/12" style={{ top }} />
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <span className={`flex h-6 items-center rounded-[25px] px-3 text-[12px] leading-none font-medium tracking-[-0.24px] whitespace-nowrap ${active ? 'bg-[#851317] text-white' : 'border border-[#d9d9d9] text-[#595959]'}`}>{children}</span>
}

function Review({ stars, children }: { stars: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <img src={avatar} alt="" className="size-8 shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="font-noto text-[12px] leading-[1.2] font-medium text-[#831317]">{stars}</p>
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

export default function WineDetailWhite() {
  const navigate = useNavigate()

  return (
    <div className="relative mx-auto h-[3301px] w-full max-w-[430px] overflow-hidden bg-white font-pretendard text-[#0d0d0d]" data-node-id="1546:5963">
      <header className="absolute top-0 left-0 z-10 h-[70px] w-full bg-white">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-[18px] flex size-6 rotate-180 items-center justify-center">
          <img src={backIcon} alt="" className="size-6" />
        </button>
        <h1 className="absolute top-[26px] left-1/2 -translate-x-1/2 text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">와인 정보</h1>
      </header>

      <p className="absolute top-[169px] left-[221px] text-[12px] leading-[1.2] font-medium tracking-[-0.24px] whitespace-nowrap text-[#737373]"><span className="text-[#831317]">★★★★☆ 4.7</span> · 리뷰 250 · 저장 1,200</p>
      <div className="absolute top-[188px] right-5 w-[293px] text-right font-['Delmon_Delicate','Playfair_Display',serif] text-[42px] leading-[1.25] tracking-[-0.42px]"><p>Char</p><p>donnay</p></div>
      <h2 className="absolute top-[313px] left-[328px] text-[24px] leading-[1.2] font-bold tracking-[-0.48px] whitespace-nowrap">샤르도네</h2>
      <p className="absolute top-[345px] left-[263px] text-[22px] leading-[1.2] font-bold whitespace-nowrap text-[#831317]">KRW 350,000</p>
      <div className="absolute top-[392px] left-[236px] flex gap-2"><Chip>홈파티</Chip><Chip>샐러드와 먹기 좋은</Chip></div>

      <div className="absolute top-[169px] left-[26px] h-[556px] w-[136px] overflow-hidden">
        <img src={heroWine} alt="샤르도네" className="absolute top-[-18.97%] left-[-143.89%] h-[142.46%] w-[387.79%] max-w-none" />
      </div>
      <div className="absolute top-[496px] left-[31px] flex h-[305.537px] w-[412.388px] items-center justify-center">
        <div className="h-[252.518px] w-[379.394px] -rotate-[8.45deg]">
          <img src={grapes} alt="" className="size-full max-w-none object-cover" />
        </div>
      </div>

      <main className="absolute top-[730px] left-0 h-[2571px] w-full overflow-hidden">
        <section className="absolute top-3 left-5 h-[402px] w-[390px]">
          <div className="absolute top-[18px] left-0 flex h-6 w-full items-center justify-between">
            <h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">기본 정보</h2>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="찜하기" className="flex size-6 items-center justify-center"><img src={heartIcon} alt="" className="size-[19px]" /></button>
              <button type="button" aria-label="공유하기" className="flex size-6 items-center justify-center"><img src={bookmarkIcon} alt="" className="h-[19px] w-[17px]" /></button>
            </div>
          </div>
          <p className="absolute top-[54px] left-0 text-[12px] leading-[1.2] tracking-[-0.24px] text-black/60">레드와인 &gt; 프랑스 &gt; 베르뇽</p>
          <div className="absolute top-[84px] left-0 flex w-full flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px] text-[14px] leading-[1.45]">
            {info.map(([label, value]) => <div key={label} className="flex gap-4"><span className="w-[60px] shrink-0 font-medium text-[#737373]">{label}</span><span className="w-[278px] tracking-[-0.28px]">{value}</span></div>)}
          </div>
          <div className="absolute top-[364px] left-0 flex h-[38px] gap-3"><span className="h-full w-[3px] bg-[#831317]" /><p className="w-[360px] text-[12px] leading-[1.6] tracking-[-0.24px] text-[#595959]">부르고뉴 와이너리의 대표 와인. 미네랄감과 깔끔한 산미를 지니고 있습니다.<br />또한 꽃향을 지니고 있어 과일하고 같이 마시기 좋습니다.</p></div>
        </section>

        <Divider top={448} />
        <section className="absolute top-[483px] left-5 flex w-[390px] flex-col gap-4">
          <div className="flex flex-col gap-1"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">테이스팅 노트</h2><p className="text-[12px] leading-[1.3] tracking-[-0.24px] text-[#737373]">어떤 맛과 향이 나는지 확인해보세요.</p></div>
          {tasting.map(([label, value, width]) => <div key={label} className="flex flex-col gap-2"><div className="flex justify-between"><strong className="text-[14px] leading-[1.2] tracking-[-0.28px]">{label}</strong><span className="text-[12px] leading-[1.2] text-[#737373]">{value}</span></div><div className="h-1.5 rounded-full bg-[#e2e2e2]"><div className="h-full rounded-full bg-[#831317]" style={{ width }} /></div></div>)}
          <h3 className="text-[14px] leading-[1.3] font-bold tracking-[-0.28px]">노트</h3>
          <div className="flex gap-2"><Chip>청서과</Chip><Chip>레몬</Chip><Chip>배</Chip><Chip>헤이즐넛</Chip></div>
        </section>

        <Divider top={868} />
        <section className="absolute top-[903px] left-5 flex w-[390px] flex-col gap-3.5">
          <div className="flex items-center justify-between"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.32px]">리뷰</h2><strong className="text-[16px] leading-[1.2] text-[#831317]">★ 4.8</strong></div>
          <p className="text-[12px] leading-[1.2] font-medium tracking-[-0.24px] text-[#737373]">많이 언급된 키워드</p>
          <div className="flex gap-2"><Chip active>#꽃향</Chip><Chip active>#깔끔한산미</Chip><Chip active>#홈파티</Chip><Chip active>#가성비</Chip></div>
          <Review stars="★★★★★">꽃향이 정말 풍부하고 홈파티용으로도 만족스러웠어요.</Review>
          <Review stars="★★★★☆">과일하고 정말 잘 어울렸습니다.</Review>
          <button type="button" className="flex h-10 items-center justify-center rounded-xl border border-[#831317] text-[14px] leading-none font-bold tracking-[-0.28px] text-[#831317]">리뷰 더보기</button>
        </section>

        <Divider top={1186} />
        <section className="absolute top-[1221px] left-5 flex w-[390px] flex-col gap-3">
          <h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">서비스 가이드</h2>
          <div className="flex flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px] text-[14px] leading-[1.45] tracking-[-0.28px]">{service.map(([label, value]) => <div key={label} className="flex gap-4"><span className="w-[86px] shrink-0 font-medium text-[#737373]">{label}</span><span>{value}</span></div>)}</div>
        </section>

        <Divider top={1466} />
        <section className="absolute top-[1501px] left-5 flex w-[390px] flex-col gap-3"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">푸드 페어링</h2><div className="flex gap-2"><Chip>신선한 굴</Chip><Chip>버섯 리조또</Chip><Chip>닭고기 요리</Chip><Chip>구운 생선</Chip></div></section>

        <section className="absolute top-[1593px] left-5 w-[390px] rounded-xl bg-[#851317] p-5">
          <p className="w-full text-[14px] leading-[1.6] tracking-[-0.28px] text-[#f7f0f0]">이 와인은 풍부한 꽃향이 특징입니다. 버섯 리조또, 닭고기와 특히 잘 어울립니다.</p>
          <button type="button" className="mt-3.5 flex h-10 w-full items-center justify-center rounded-[10px] bg-white text-[14px] leading-none font-bold text-[#851317]">AI에게 질문하기</button>
        </section>

        <Divider top={1766} />
        <section className="absolute top-[1802px] left-5 flex w-[390px] flex-col gap-3"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">구매 정보</h2><PurchaseCard type="온라인" text="KRW 350,000 ~" button="판매처 보기" /><PurchaseCard type="오프라인" text="가까운 매장에서 구매 가능" button="지도 보기" /></section>

        <Divider top={2138} />
        <section className="absolute top-[2173px] left-5 flex w-[390px] flex-col gap-3.5 overflow-visible">
          <div className="flex flex-col gap-1"><h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">비슷한 와인 추천</h2><p className="text-[14px] leading-[1.3] tracking-[-0.28px] text-[#737373]">이 와인과 비슷한 스타일의 와인을 추천해드려요.</p></div>
          <div className="flex gap-3.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {similar.map(([name, detail, image], index) => <article key={name} className="flex w-[188px] shrink-0 flex-col gap-2"><div className="flex h-[170px] w-[188px] items-center justify-center overflow-hidden rounded-xl bg-[#f8f6f4]"><img src={image} alt={name} className={index === 0 ? 'h-[107px] w-[29px] object-cover' : index === 1 ? 'h-[153px] w-9 object-cover' : 'h-[150px] w-9 object-cover'} /></div><h3 className={`w-[188px] text-[14px] leading-[1.25] font-semibold tracking-[-0.14px] ${name === 'Shiraz' ? 'font-playfair-sc font-bold' : ''}`}>{name}</h3><p className="text-[12px] leading-[1.2] font-medium whitespace-nowrap text-[#737373]">{detail}</p></article>)}
          </div>
        </section>
      </main>
    </div>
  )
}
