import heroImage from '../assets/images/hero.png'
import foodPairingImage from '../assets/images/food-pairing.png'
import magazineCard1 from '../assets/images/magazine-card-1.png'
import magazineCard2 from '../assets/images/magazine-card-2.png'
import corkIcon from '../assets/images/cork-icon.png'
import corkPile from '../assets/images/cork-pile.png'
import wineNoteImage from '../assets/images/wine-note.png'
import aiSommelierImage from '../assets/images/ai-sommelier-bg.png'
import bottleCasaSmith from '../assets/images/bottle-casa-smith.png'
import bottleKimCrawford from '../assets/images/bottle-kim-crawford.png'
import bestFeedPhoto from '../assets/images/best-feed-photo.png'
import iconArrowForward from '../assets/images/icon-arrow-forward.svg'
import iconArrowForward2 from '../assets/images/icon-arrow-forward-2.svg'
import iconArrowForward4 from '../assets/images/icon-arrow-forward-4.svg'
import iconArrowForward5 from '../assets/images/icon-arrow-forward-5.svg'
import iconArrowForward6 from '../assets/images/icon-arrow-forward-6.svg'
import iconChevronForward from '../assets/images/icon-chevron-forward.svg'
import iconEllipse9 from '../assets/images/icon-ellipse-9.svg'
import iconGroup2 from '../assets/images/icon-group-2.svg'
import iconHeart from '../assets/images/icon-heart.svg'
import iconShare from '../assets/images/icon-share.svg'
import iconMusicNote2 from '../assets/images/icon-music-note-2.svg'
import Header from '../components/Header'

const playfairOpsz = { fontVariationSettings: '"opsz" 12' }

// Figma 디자인 기준 폭 430px = 100cqw. 모든 치수는 이 기준으로 환산.
const tabs = ['레드', '화이트', '로제', '스파클링'] as const

const eventItems = [
  {
    label: '시음회',
    title: '와인 시음회',
    description: '다양한 와인을 직접 시음하며 나만의 취향을 발견해 보세요.',
  },
  {
    label: '팝업',
    title: '와인 팝업',
    description: '새로운 브랜드와 특별한 와인 경험을 가까이에서 만나보세요.',
  },
  {
    label: '페어',
    title: '와인 페어',
    description: '다양한 와인과 와인 러버가 함께하는 특별한 축제를 즐겨보세요.',
  },
]

const noScrollbar = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

function Home() {
  return (
    <div className="@container mx-auto w-full overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative h-[159.767cqw] w-full overflow-hidden">
        <img src={heroImage} alt="와인을 잔에 따르는 모습" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[9.896%] via-[rgba(160,160,160,0)] via-[33.807%] to-[rgba(0,0,0,0.62)] to-[75.606%]" />
        <div className="absolute inset-x-0 top-[31.163cqw] h-[128.605cqw] bg-gradient-to-b from-[rgba(102,102,102,0)] from-[40.145%] to-black to-[115.01%]" />
        <div className="absolute inset-x-0 top-0 z-10">
          <Header />
        </div>
        {/* 하단 섹션(#151515)과 완전히 같은 색으로 끝나는 페이드를 추가해 경계선이 안 보이게 함 */}
        <div className="absolute inset-x-0 bottom-0 h-[23.256cqw] bg-gradient-to-b from-transparent to-[#151515]" />

        <img src={iconGroup2} alt="" aria-hidden className="absolute top-[44.419cqw] left-[68.605cqw] size-[5.116cqw]" />
        <img src={iconGroup2} alt="" aria-hidden className="absolute top-[49.070cqw] left-[25.349cqw] size-[5.116cqw]" />

        <p className="absolute top-[88.837cqw] left-[calc(50%-6.163cqw)] -translate-x-1/2 whitespace-nowrap font-playfair-display text-[11.628cqw] leading-[1.1] font-semibold tracking-[-0.233cqw] text-white">
          Every Bottle
        </p>
        <p className="absolute top-[102.791cqw] left-[calc(50%+7.674cqw)] -translate-x-1/2 whitespace-nowrap font-playfair-display text-[11.628cqw] leading-[1.1] font-semibold tracking-[-0.233cqw] text-white">
          Has a Story
        </p>

        <p className="absolute inset-x-0 top-[122.093cqw] px-[5.581cqw] text-center text-[3.721cqw] leading-[1.3] tracking-[-0.074cqw] text-white">
          당신의 취향으로 시작되는 와인 이야기
          <br />
          좋아하는 맛을 발견하고, 특별한 순간을 나눠보세요.
        </p>
        <div
          className="absolute top-[146.977cqw] left-1/2 flex h-[2.326cqw] w-[13.953cqw] -translate-x-1/2 items-center gap-[3.488cqw]"
          role="img"
          aria-label="히어로 슬라이드 1 / 3"
          data-node-id="610:318"
        >
          <span className="size-[2.326cqw] shrink-0 rounded-full bg-[#9a0707]" data-node-id="610:319" />
          <span className="size-[2.326cqw] shrink-0 rounded-full bg-[#d9d9d9]" data-node-id="610:320" />
          <span className="size-[2.326cqw] shrink-0 rounded-full bg-[#d9d9d9]" data-node-id="610:321" />
        </div>
      </section>

      {/* BEST Feed — 어두운 배경은 섹션 전체가 아니라 위쪽 391px(90.930cqw)까지만 */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-[90.930cqw] bg-[#151515]" />
        <div className="relative px-[4.651cqw] pt-[14.884cqw] pb-[13.023cqw]">
          <h2
            className="font-playfair text-[8.837cqw] leading-[1.3] font-bold tracking-[-0.177cqw] text-white"
            style={playfairOpsz}
          >
            BEST Feed
          </h2>
          <p className="mt-[1.860cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-white">
            최신 베스트 피드를 확인해보세요!
          </p>

          <div className="relative mt-[5.581cqw] h-[113.023cqw] w-full overflow-hidden">
            <img src={bestFeedPhoto} alt="와인 피드 사진" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/55 to-transparent" />

            <div className="absolute inset-x-[4.651cqw] top-[4.651cqw] flex items-center gap-[2.326cqw]">
              <img src={iconEllipse9} alt="" className="size-[9.302cqw] shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-playfair-display text-[3.721cqw] leading-[1.2] font-semibold text-white">
                  Wine_editor
                </p>
                <p className="flex items-center gap-[0.930cqw] text-[2.791cqw] leading-[1.2] font-medium text-white">
                  <img src={iconMusicNote2} alt="" className="size-[5.581cqw]" />
                  낭만적인 여름밤 당신의 눈동자에 치얼쓰~
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-[2.326cqw] border-[0.5px] border-white px-[1.512cqw] py-[0.814cqw] text-[2.791cqw] leading-[1.2] font-medium text-white"
              >
                팔로우
              </button>
            </div>

            <button
              type="button"
              aria-label="다음 피드 보기"
              className="absolute top-1/2 right-[2.791cqw] flex size-[6.977cqw] -translate-y-1/2 items-center justify-center rounded-full bg-white/20"
            >
              <img src={iconArrowForward6} alt="" className="size-[3.721cqw]" />
            </button>

            <div className="absolute inset-x-[4.651cqw] bottom-[13.023cqw] flex flex-col gap-[1.860cqw]">
              <div className="flex gap-[1.860cqw]">
                {['#와인이름', '#모임', '#샴페인_야호'].map((tag) => (
                  <span
                    key={tag}
                    className="flex h-[5.581cqw] items-center rounded-full bg-white/10 px-[1.279cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-[1.860cqw]">
                {['#샴페인_야호', '#파티'].map((tag) => (
                  <span
                    key={tag}
                    className="flex h-[5.581cqw] items-center rounded-full bg-white/10 px-[1.279cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute inset-x-[4.651cqw] bottom-[4.651cqw] flex items-center gap-[3.721cqw] text-white">
              <span className="flex items-center gap-[0.930cqw] text-[2.791cqw] leading-[9px] font-medium">
                <img src={iconHeart} alt="" className="size-[4.651cqw]" />
                2,460
              </span>
              <span className="flex items-center gap-[0.930cqw] text-[2.791cqw] leading-[9px] font-medium">
                <img src={iconShare} alt="" className="size-[4.651cqw]" />
                841
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Pick */}
      <section className="pt-[8.372cqw]">
        <div className="flex items-center justify-between px-[4.651cqw]">
          <div>
            <h2
              className="font-playfair text-[8.837cqw] leading-[1.3] font-bold tracking-[-0.177cqw] text-[#831317]"
              style={playfairOpsz}
            >
              Today’s Pick
            </h2>
            <p className="mt-[0.233cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">
              오늘의 와인을 추천합니다.
            </p>
          </div>
          <img src={iconArrowForward5} alt="" className="size-[3.721cqw]" />
        </div>

        <div className="mt-[8.372cqw] px-[4.651cqw]">
          <div className="grid grid-cols-4 border-b border-[#7b7b7b]">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={`relative pb-[2.791cqw] text-center font-playfair text-[3.721cqw] leading-[1.3] tracking-[-0.074cqw] ${
                  i === 0 ? 'font-bold text-[#831317]' : 'font-normal text-[#7b7b7b]'
                }`}
                style={playfairOpsz}
              >
                {tab}
                {i === 0 && <span className="absolute inset-x-0 -bottom-px h-[0.698cqw] w-full bg-[#831317]" />}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-[5.581cqw] flex gap-[1.860cqw] overflow-x-auto px-[4.651cqw] pb-[0.930cqw] ${noScrollbar}`}>
          <div className="w-[55.814cqw] shrink-0">
            <div className="flex h-[64.884cqw] items-center justify-center bg-[#f2f2f2]">
              <img src={bottleCasaSmith} alt="Casa Smith ViNO Rosso" className="h-[52.326cqw] w-auto object-contain" />
            </div>
            <p className="font-playfair-sc mt-[3.488cqw] text-[3.721cqw] leading-[1.3] font-bold tracking-[-0.112cqw] text-black">
              Casa Smith ViNO Rosso
            </p>
            <p className="mt-[1.163cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">포도향, 떫음</p>
            <div className="mt-[1.163cqw] flex items-center gap-[1.860cqw]">
              <span className="flex h-[4.651cqw] items-center rounded-full bg-[#831317] px-[1.279cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium text-white">
                #오늘의 와인
              </span>
              <button
                type="button"
                className="flex shrink-0 items-center gap-[0.233cqw] text-[2.791cqw] leading-[1.08] tracking-[-0.084cqw] text-[#831317] underline"
              >
                자세히보기
                <img src={iconChevronForward} alt="" className="size-[4.186cqw]" />
              </button>
            </div>
          </div>
          <div className="w-[55.814cqw] shrink-0">
            <div className="flex h-[64.884cqw] items-center justify-center bg-[#f2f2f2]">
              <img src={bottleKimCrawford} alt="Kim CrawFord Pinot Noir" className="h-[50.930cqw] w-auto object-contain" />
            </div>
            <p className="font-playfair-sc mt-[3.488cqw] text-[3.488cqw] leading-[1.3] font-bold tracking-[-0.105cqw] text-black">
              Kim CrawFord Pinot Noir
            </p>
            <p className="mt-[1.163cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">꽃향, 부드러움</p>
            <div className="mt-[1.163cqw]">
              <span className="flex h-[4.651cqw] w-fit items-center rounded-full bg-[#831317] px-[2.326cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium text-white">
                #AI 소믈리에 추천
              </span>
              <button
                type="button"
                className="flex shrink-0 items-center gap-[0.233cqw] text-[2.791cqw] leading-[1.08] tracking-[-0.084cqw] text-[#831317] underline"
              >
                자세히보기
                <img src={iconChevronForward} alt="" className="size-[4.186cqw]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="pt-[11.163cqw]">
        <div className="flex items-center justify-between px-[4.651cqw]">
          <h2
            className="font-playfair text-[8.837cqw] leading-[1.3] font-bold tracking-[-0.177cqw] text-[#831317]"
            style={playfairOpsz}
          >
            Challenge
          </h2>
          <img src={iconArrowForward4} alt="" className="size-[3.721cqw]" />
        </div>

        <div className={`mt-[3.721cqw] flex gap-[1.860cqw] overflow-x-auto px-[4.651cqw] pb-[0.930cqw] ${noScrollbar}`}>
          <div className="relative h-[73.953cqw] w-[72.791cqw] shrink-0 overflow-hidden">
            <img src={foodPairingImage} alt="페어링하기 좋은 음식찾기" className="absolute inset-0 size-full object-cover" />
            <p className="absolute top-[7.442cqw] left-[5.581cqw] text-[5.581cqw] leading-[1.3] font-medium tracking-[-0.112cqw] text-white">
              페어링하기 좋은 음식찾기
            </p>
            <div className="absolute top-[16.512cqw] left-[5.581cqw] text-[3.256cqw] leading-[1.45] tracking-[-0.065cqw] text-white/80">
              <p>매주 지정 음식에 어울리는 와인을</p>
              <p>추천하고 투표받기</p>
            </div>
            <div className="absolute top-[57.442cqw] left-[4.884cqw] flex w-[62.791cqw] items-center justify-between text-[2.791cqw] leading-[1.55] font-medium tracking-[-0.056cqw] text-white">
              <span className="font-playfair" style={playfairOpsz}>
                In Progress
              </span>
              <span>45%</span>
            </div>
            <div className="absolute top-[62.791cqw] left-[4.884cqw] h-[2.093cqw] w-[62.791cqw] rounded-[14.884cqw] bg-[#e2e2e2]">
              <div className="h-full w-[27.209cqw] rounded-[14.884cqw] bg-[#831317]" />
            </div>
          </div>

          <div className="relative h-[73.953cqw] w-[71.860cqw] shrink-0 overflow-hidden">
            <img src={aiSommelierImage} alt="AI 소믈리에랑 대결하기" className="absolute inset-0 size-full object-cover" />
            <div className="absolute top-[10.000cqw] right-0 bottom-0 left-0 bg-gradient-to-b from-white/0 from-0% via-transparent via-50% to-[#0c0c0c] to-100%" />
            <p className="absolute top-[6.977cqw] left-[4.651cqw] w-[52.326cqw] text-[5.581cqw] leading-[1.3] font-medium tracking-[-0.112cqw] text-white">
              AI 소믈리에랑 대결하기
            </p>
            <div className="absolute top-[16.279cqw] left-[4.651cqw] w-[52.326cqw] text-[3.256cqw] leading-[1.45] tracking-[-0.065cqw] text-white/85">
              <p>내가 고른 와인과 AI 추천을 비교해서</p>
              <p>공유해보세요</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event */}
      <section className="px-[4.651cqw] pt-[11.163cqw]">
        <h2
          className="font-playfair text-[8.837cqw] leading-[1.3] font-bold tracking-[-0.177cqw] text-[#831317]"
          style={playfairOpsz}
        >
          Event
        </h2>
        <div className="mt-[4.651cqw] divide-y divide-black/20">
          {eventItems.map((item) => (
            <button key={item.label} type="button" className="flex w-full items-center justify-between py-[4.651cqw] text-left">
              <div>
                <p className="text-[2.791cqw] leading-[1.55] font-medium tracking-[-0.056cqw] text-[#831317]">{item.label}</p>
                <p className="mt-[0.558cqw] text-[4.186cqw] leading-[1.18] font-semibold tracking-[-0.147cqw] text-black">
                  {item.title}
                </p>
                <p className="mt-[1.572cqw] text-[2.791cqw] leading-[1.55] tracking-[-0.056cqw] text-black">{item.description}</p>
              </div>
              <img src={iconArrowForward2} alt="" className="size-[3.721cqw] shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Promo banner — Figma 원본은 좌우 패딩 없이 화면 전체 폭에 꽉 채움 */}
      <section className="pt-[14.884cqw]">
        <div className="relative h-[29.767cqw] w-full overflow-hidden">
          <img
            src={foodPairingImage}
            alt="페어링하기 좋은 음식찾기"
            className="absolute top-[-252.57%] left-0 w-full max-w-none h-[447.92%]"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#831317] from-[24.525%] to-[rgba(131,19,23,0)] to-[79.087%]" />
          <div className="relative z-10 flex h-full flex-col justify-center px-[4.651cqw]">
            <p className="text-[5.581cqw] leading-[1.3] font-bold tracking-[-0.112cqw] text-white">페어링하기 좋은 음식찾기</p>
            <p className="mt-[0.233cqw] text-[3.256cqw] leading-[1.45] tracking-[-0.065cqw] text-white">
              매주 지정 음식에 어울리는 와인을 추천하고 투표받기
            </p>
          </div>
        </div>
      </section>

      {/* Wine Note — Figma Frame 274(x21,y3023,w389,h289) 좌표를 그대로 절대배치로 재현 */}
      <section className="px-[4.651cqw] pt-[11.163cqw]">
        <div className="relative h-[67.209cqw] w-full">
          <span className="absolute top-0 left-0 flex h-[4.651cqw] items-center rounded-full bg-[#831317] px-[1.512cqw] py-[0.930cqw] text-[2.791cqw] leading-[9px] font-medium text-white">
            2026.07.10
          </span>
          <p className="absolute top-[7.209cqw] left-0 text-[3.721cqw] leading-[1.3] font-bold tracking-[-0.112cqw] text-black/50">
            오늘의 와인 꿀팁
          </p>
          <p
            className="font-playfair absolute top-[12.093cqw] left-0 text-[14.884cqw] leading-none font-bold tracking-[-0.298cqw] whitespace-nowrap text-[#831317]"
            style={playfairOpsz}
          >
            Wine Note
          </p>
          <p className="absolute top-[31.860cqw] left-0 w-[64.651cqw] text-[3.256cqw] leading-[1.3] font-light tracking-[-0.098cqw] text-black">
            많은 사람들이 오래된 와인이 더 맛있다고 생각하지만 사실은 그렇지 않다. 전 세계 와인의 약 90%는 1~3년
            안에 마시는 것이 가장 맛있다. 숙성이 필요한 와인은 극히 일부의 프리미엄 와인뿐이다.
          </p>
          <img
            src={wineNoteImage}
            alt="와인과 포도"
            className="absolute top-[26.977cqw] left-[63.721cqw] h-[40.233cqw] w-[26.744cqw] object-cover"
          />
        </div>
      </section>

      {/* Magazine — 다른 섹션과 동일하게 좌측 4.651cqw부터 시작, 스크롤바 숨김
          scroll-snap 컨테이너는 scroll-padding이 없으면 시작 padding을 무시하고
          첫 카드를 화면 맨 왼쪽에 스냅시키는 브라우저 동작이 있어 scroll-pl로 보정 */}
      <section
        className={`mt-[11.163cqw] flex snap-x snap-mandatory gap-[1.860cqw] overflow-x-auto px-[4.651cqw] pb-[1.860cqw] scroll-pl-[4.651cqw] ${noScrollbar}`}
      >
        {[
          { image: magazineCard1, hasBody: true },
          { image: magazineCard2, hasBody: false },
        ].map((card, i) => (
          <div key={i} className="relative h-[114.884cqw] w-[90.698cqw] shrink-0 snap-start overflow-hidden">
            <img src={card.image} alt="Magazine" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/65 from-[14.07%] to-[rgba(102,102,102,0)]" />
            <div className="absolute inset-0 bg-black/[0.14]" />

            <p className="font-playfair-sc absolute inset-x-0 top-0 text-center text-[16.279cqw] leading-[1.3] tracking-[-0.326cqw] text-white">
              Magazine
            </p>
            <button type="button" aria-label="매거진 자세히 보기" className="absolute top-[36.512cqw] right-[4.651cqw] size-[5.581cqw]">
              <img src={iconArrowForward} alt="" className="size-full" />
            </button>
            <div className="absolute inset-x-[4.651cqw] bottom-[6.977cqw]">
              <p className="text-[6.512cqw] leading-[1.18] font-bold tracking-[-0.228cqw] text-white">영동에서 문경까지</p>
              <p className="mt-[0.233cqw] text-[5.581cqw] leading-[1.55] tracking-[-0.112cqw] text-white">
                오미자가 만드는 K-와인 로드
              </p>
              {card.hasBody ? (
                <p className="mt-[0.698cqw] w-[79.302cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-white">
                  국산 청포도 '청수'와 세계 유일의 오미자 스파클링 '오미로제'까지, 한국에도 개성 있는 많은 와인이
                  있습니다. 영동과 문경에서 우리 국산 청포도 '청수'와 세계 유일의 오미자 스파클링 '오미로제'까지,
                  한국에도 ....
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      {/* Collect Corks */}
      <section className="relative mt-[11.163cqw] h-[120.465cqw] w-full overflow-hidden bg-white">
        <img
          src={corkIcon}
          alt=""
          aria-hidden
          className="absolute top-[-1.970cqw] left-[37.380cqw] h-[10.698cqw] w-[15.470cqw] rotate-[-43.16deg] opacity-10"
        />
        <img
          src={corkIcon}
          alt=""
          aria-hidden
          className="absolute top-[18.455cqw] left-[18.800cqw] h-[10.698cqw] w-[15.470cqw] -scale-y-100 rotate-[-137.94deg] opacity-20"
        />
        <img
          src={corkIcon}
          alt=""
          aria-hidden
          className="absolute top-[48.555cqw] left-[37.908cqw] h-[10.698cqw] w-[15.470cqw] -scale-y-100 rotate-[103.79deg] opacity-30"
        />
        <img
          src={corkIcon}
          alt=""
          aria-hidden
          className="absolute top-[68.435cqw] left-[58.179cqw] z-10 h-[12.055cqw] w-[17.433cqw] -scale-y-100 rotate-[-80.67deg] opacity-70"
        />
        <img
          src={corkIcon}
          alt=""
          aria-hidden
          className="absolute top-[84.026cqw] left-[33.404cqw] z-10 h-[21.723cqw] w-[31.414cqw] -scale-y-100 rotate-[-52.48deg]"
        />

        <p
          className="absolute top-[28.837cqw] left-1/2 -translate-x-1/2 whitespace-nowrap font-playfair text-[14.884cqw] leading-none font-bold tracking-[-0.298cqw] text-[#831317]"
          style={playfairOpsz}
        >
          Collect Corks
        </p>
        <p className="absolute top-[65.814cqw] left-1/2 -translate-x-1/2 text-center text-[3.256cqw] leading-[1.3] font-light tracking-[-0.098cqw] text-black">
          매일매일 출석해 코르크를 모아보세요
        </p>

        <button
          type="button"
          className="absolute top-[50.000cqw] left-1/2 flex h-[10.930cqw] w-[33.953cqw] -translate-x-1/2 items-center justify-center rounded-full border border-white/60 bg-white/25 text-[3.721cqw] leading-[1.2] font-semibold tracking-[-0.074cqw] text-[#831317] shadow-[0px_0px_20px_4px_rgba(176,176,176,0.25)] backdrop-blur-xl"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full shadow-[0px_0px_20px_4px_rgba(176,176,176,0.25)]"
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full backdrop-blur-[25px]" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[0.435cqw] inset-y-[0.649cqw] rounded-full backdrop-blur-[25px]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[0.870cqw] inset-y-[1.298cqw] rounded-full backdrop-blur-[25px]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[1.306cqw] inset-y-[1.947cqw] rounded-full blur-[5px] backdrop-blur-[0.5px]"
          />
          <span className="relative z-10 whitespace-nowrap" data-node-id="576:216">
            코르크 하루 추가
          </span>
        </button>

        <div className="absolute inset-x-0 bottom-0 h-[47.209cqw] overflow-hidden">
          <img
            src={corkPile}
            alt="쌓여있는 와인 코르크 마개"
            className="absolute top-0 left-0 h-[141.26%] w-full max-w-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-black/30 to-black" />
        </div>
      </section>
    </div>
  )
}

export default Home
