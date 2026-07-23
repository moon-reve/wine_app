import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/images/hero.png'
import heroTasteImage from '../assets/images/hero-taste.png'
import heroShareImage from '../assets/images/hero-share.png'
import heroWineDetailImage from '../assets/images/hero-wine-detail.png'
import sheetCloseIcon from '../assets/images/icon-sheet-close.svg'
import foodPairingImage from '../assets/images/food-pairing.png'
import magazineCard1 from '../assets/images/magazine-card-1.png'
import magazineCard2 from '../assets/images/magazine-card-2.png'
import wineContinentsImage from '../assets/images/wine-continents.png'
import corkIcon from '../assets/images/cork-icon.png'
import corkPile from '../assets/images/cork-pile.png'
import wineNoteImage from '../assets/images/wine-note.png'
import aiSommelierImage from '../assets/images/ai-sommelier-bg.png'
import bottleCasaSmith from '../assets/images/bottle-casa-smith.png'
import bottleKimCrawford from '../assets/images/bottle-kim-crawford.png'
import bestFeedPhoto from '../assets/images/best-feed-photo.png'
import bestFeedPhoto2 from '../assets/images/best-feed-photo-2.png'
import bestFeedPhoto3 from '../assets/images/best-feed-photo-3.png'
import feedAvatarSora from '../assets/images/feed-avatar-sora.png'
import feedAvatarAshlyn from '../assets/images/feed-avatar-ashlyn.png'
import iconArrowForward from '../assets/images/icon-arrow-forward.svg'
import iconArrowForward2 from '../assets/images/icon-arrow-forward-2.svg'
import iconArrowForward5 from '../assets/images/icon-arrow-forward-5.svg'
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
    path: '/event/summer-wine-festival',
  },
]

const magazineCards = [
  {
    image: magazineCard1,
    title: '영동에서 문경까지',
    subtitle: ['오미자가 만드는 K-와인 로드'],
    body: "국산 청포도 '청수'와 세계 유일의 오미자 스파클링 '오미로제'까지, 한국에도 개성 있는 많은 와인이 있습니다. 영동과 문경에서 우리 국산 청포도 '청수'와 세계 유일의 오미자 스파클링 '오미로제'까지, 한국에도 ....",
  },
  {
    image: magazineCard2,
    title: '샤르도네,',
    subtitle: ['하나의 품종이 다양한 맛을', '만드는 이유'],
    body: '샤르도네는 재배 지역과 숙성 방식에 따라 전혀 다른 매력을 보여주는 대표적인 화이트 와인 품종입니다. 서늘한 지역에서는 상큼한 시트러스와 사과 향이, 오크 숙성을 거치면 바닐라와 버터 같은 부드러운 풍미가 더해집니다. 같은 품종이라도 색다른 맛을 경험하는 재미가 있습니다.',
  },
] as const

const bestFeeds = [
  {
    image: bestFeedPhoto3,
    avatar: feedAvatarAshlyn,
    username: 'ashlyn__',
    tags: ['#netflix', '#bingewatching', '#wine', '#raspberry'],
    likes: '1,430',
    shares: '327',
  },
  {
    image: bestFeedPhoto,
    avatar: iconEllipse9,
    username: 'Wine_editor',
    tags: ['#meetings', '#모임', '#와인_야호'],
    likes: '2,460',
    shares: '841',
  },
  {
    image: bestFeedPhoto2,
    avatar: feedAvatarSora,
    username: 'Sora_choi',
    tags: ['#homeinterior', '#꽃', '#와인', '#와인꾸미기'],
    likes: '1,750',
    shares: '643',
  },
] as const

const noScrollbar = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

function Home() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [bestFeedIndex, setBestFeedIndex] = useState(0)
  const [magazineIndex, setMagazineIndex] = useState(0)
  const [isWineSheetOpen, setIsWineSheetOpen] = useState(false)
  const heroPointerStart = useRef<number | null>(null)
  const bestFeedScrollRef = useRef<HTMLDivElement>(null)
  const bestFeedDrag = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null)
  const todayPickScrollRef = useRef<HTMLDivElement>(null)
  const todayPickDrag = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null)
  const todayPickDidDrag = useRef(false)
  const challengeScrollRef = useRef<HTMLDivElement>(null)
  const challengeDrag = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null)
  const magazineScrollRef = useRef<HTMLElement>(null)
  const magazineDrag = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null)
  const magazineDidDrag = useRef(false)

  useEffect(() => {
    if (!isWineSheetOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsWineSheetOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isWineSheetOpen])

  const finishHeroSwipe = (clientX: number) => {
    if (heroPointerStart.current === null) return

    const distance = clientX - heroPointerStart.current
    heroPointerStart.current = null
    if (Math.abs(distance) < 40) return

    setHeroIndex((current) => Math.max(0, Math.min(2, current + (distance < 0 ? 1 : -1))))
  }

  return (
    <div className="@container mx-auto w-full overflow-hidden bg-white">
      {/* Hero */}
      <section
        className="relative h-[159.767cqw] w-full touch-pan-y overflow-hidden"
        aria-roledescription="carousel"
        aria-label="홈 히어로"
        onPointerDown={(event) => {
          heroPointerStart.current = event.clientX
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerUp={(event) => finishHeroSwipe(event.clientX)}
        onPointerCancel={() => {
          heroPointerStart.current = null
        }}
      >
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          <div className="relative h-full w-full shrink-0" aria-hidden={heroIndex !== 0}>
            <img src={heroImage} alt="와인을 잔에 따르는 모습" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[9.896%] via-[rgba(160,160,160,0)] via-[33.807%] to-[rgba(0,0,0,0.62)] to-[75.606%]" />
            <div className="absolute inset-x-0 top-[31.163cqw] h-[128.605cqw] bg-gradient-to-b from-[rgba(102,102,102,0)] from-[40.145%] to-black to-[115.01%]" />

            <button
              type="button"
              aria-label="추천 와인 정보 보기"
              onClick={() => setIsWineSheetOpen(true)}
              className="absolute top-[44.419cqw] left-[68.605cqw] size-[5.116cqw]"
            >
              <img src={iconGroup2} alt="" aria-hidden className="size-full" />
            </button>
            <button
              type="button"
              aria-label="추천 와인 정보 보기"
              onClick={() => setIsWineSheetOpen(true)}
              className="absolute top-[49.070cqw] left-[25.349cqw] size-[5.116cqw]"
            >
              <img src={iconGroup2} alt="" aria-hidden className="size-full" />
            </button>

            <p className="absolute top-[88.837cqw] left-[calc(50%-6.163cqw)] -translate-x-1/2 whitespace-nowrap font-delmon text-[13.023cqw] leading-[1.1] font-normal tracking-[-0.260cqw] text-white">
              Every Bottle
            </p>
            <p className="absolute top-[102.791cqw] left-[calc(50%+7.674cqw)] -translate-x-1/2 whitespace-nowrap font-delmon text-[13.023cqw] leading-[1.1] font-normal tracking-[-0.260cqw] text-white">
              Has a Story
            </p>
            <p className="absolute inset-x-0 top-[122.093cqw] px-[5.581cqw] text-center text-[3.721cqw] leading-[1.3] tracking-[-0.074cqw] text-white">
              당신의 취향으로 시작되는 와인 이야기
              <br />
              좋아하는 맛을 발견하고, 특별한 순간을 나눠보세요.
            </p>
          </div>

          <div className="relative h-full w-full shrink-0" aria-hidden={heroIndex !== 1}>
            <img src={heroTasteImage} alt="와인의 향과 맛을 기록하는 모습" className="absolute top-0 left-0 h-[111.21%] w-full max-w-none" />
            <div className="absolute inset-x-0 top-[31.163cqw] h-[128.605cqw] bg-gradient-to-b from-[rgba(102,102,102,0)] from-[40.145%] to-black to-[115.01%]" />
            <div className="absolute inset-x-0 top-[88.837cqw] text-center font-delmon text-[11.628cqw] leading-[1.1] font-normal tracking-[-0.233cqw] text-white">
              <p className="relative -left-[6.279cqw]">Taste What</p>
              <p className="relative left-[7.791cqw] mt-[1.163cqw]">Moves You</p>
            </div>
            <p className="absolute inset-x-0 top-[122.093cqw] text-center text-[3.721cqw] leading-[1.3] tracking-[-0.074cqw] text-white">
              향과 맛을 기록하고,
              <br />
              나만의 와인 취향을 찾아보세요.
            </p>
          </div>

          <div className="relative h-full w-full shrink-0" aria-hidden={heroIndex !== 2}>
            <img src={heroShareImage} alt="와인 러버들과 특별한 순간을 나누는 모습" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-x-0 top-[31.163cqw] h-[128.605cqw] bg-gradient-to-b from-[rgba(102,102,102,0)] from-[40.145%] to-black to-[115.01%]" />
            <div className="absolute inset-x-0 top-[88.837cqw] text-center font-delmon text-[11.628cqw] leading-[1.1] font-normal tracking-[-0.233cqw] text-white">
              <p className="relative -left-[5.465cqw]">Share the</p>
              <p className="relative left-[8.372cqw] mt-[1.163cqw]">Moment</p>
            </div>
            <p className="absolute inset-x-0 top-[122.093cqw] text-center text-[3.721cqw] leading-[1.3] tracking-[-0.074cqw] text-white">
              좋아하는 와인을 추천하고,
              <br />
              와인 러버들과 특별한 순간을 나눠보세요.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 z-20">
          <Header />
        </div>
        {/* 하단 섹션(#151515)과 완전히 같은 색으로 끝나는 페이드를 추가해 경계선이 안 보이게 함 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[23.256cqw] bg-gradient-to-b from-transparent to-[#151515]" />
        <div
          className="absolute top-[146.977cqw] left-1/2 z-30 flex h-[2.326cqw] w-[13.953cqw] -translate-x-1/2 items-center gap-[3.488cqw]"
          role="group"
          aria-label={`히어로 슬라이드 ${heroIndex + 1} / 3`}
          data-node-id="610:318"
        >
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}번 히어로 보기`}
              aria-current={heroIndex === index ? 'true' : undefined}
              onClick={() => setHeroIndex(index)}
              className={`size-[2.326cqw] shrink-0 rounded-full ${heroIndex === index ? 'bg-[#9a0707]' : 'bg-[#d9d9d9]'}`}
            />
          ))}
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[100] flex items-end justify-center transition-[visibility] duration-300 ${isWineSheetOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!isWineSheetOpen}
      >
        <button
          type="button"
          aria-label="와인 정보 닫기"
          tabIndex={isWineSheetOpen ? 0 : -1}
          onClick={() => setIsWineSheetOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isWineSheetOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-wine-title"
          className={`@container relative h-[92.558cqw] max-h-[398px] w-full max-w-107.5 overflow-hidden rounded-t-[4.651cqw] bg-[#2b2b33] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${isWineSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div aria-hidden className="absolute top-[3.721cqw] left-1/2 h-[1.395cqw] w-[12.791cqw] -translate-x-1/2 rounded-full bg-[#d9d9d9]/50" />

          <button
            type="button"
            aria-label="닫기"
            onClick={() => setIsWineSheetOpen(false)}
            className="absolute top-[4.884cqw] right-[5.581cqw] z-20 size-[3.488cqw]"
          >
            <img src={sheetCloseIcon} alt="" aria-hidden className="size-full" />
          </button>

          <div aria-hidden className="absolute top-[30.233cqw] left-[7.674cqw] size-[36.047cqw] overflow-hidden rounded-full bg-[#831317]">
            <div className="absolute top-[-24.419cqw] left-[8.605cqw] h-[78.372cqw] w-[19.070cqw] overflow-hidden">
              <img
                src={heroWineDetailImage}
                alt=""
                className="absolute top-0 left-[-17.070cqw] h-[78.372cqw] w-[53.721cqw] max-w-none"
              />
            </div>
          </div>
          <div className="absolute top-[5.814cqw] left-[16.279cqw] h-[46.047cqw] w-[19.070cqw] overflow-hidden">
            <img
              src={heroWineDetailImage}
              alt="Benvolo 1963 와인 병"
              className="absolute top-0 left-[-17.070cqw] h-[78.372cqw] w-[53.721cqw] max-w-none"
            />
          </div>

          <h2 id="hero-wine-title" className="absolute top-[37.907cqw] left-[48.140cqw] font-delmon text-[5.814cqw] leading-[0.91] font-normal whitespace-nowrap">
            BENVOLO 1963
          </h2>
          <p className="absolute top-[45.581cqw] left-[48.140cqw] text-[2.791cqw] leading-[1.5] font-light whitespace-nowrap">
            이 와인은 이탈리아 북부에서
            <br />
            만들어진 산뜻한 화이트 와인입니다.
            <br />
            뭔가 설명이 더 있으면 좋긴 하겠음
          </p>
          <div className="absolute top-[60.698cqw] left-[48.140cqw] flex gap-[0.930cqw]">
            {['# Moscato', '# Cheese', '# Aperitif'].map((tag) => (
              <span key={tag} className="flex h-[4.186cqw] items-center rounded-full border-[0.5px] border-white/50 px-[1.395cqw] text-[2.326cqw] leading-none font-light">
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="absolute top-[74.419cqw] left-[11.628cqw] flex h-[12.326cqw] w-[76.512cqw] items-center justify-center rounded-[2.326cqw] bg-[#670e10] text-[3.488cqw] leading-[1.5] font-medium"
          >
            자세히 보러가기
          </button>
        </section>
      </div>

      {/* BEST Feed — 어두운 배경은 섹션 전체가 아니라 위쪽 391px(90.930cqw)까지만 */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-[90.930cqw] bg-[#151515]" />
        <div className="relative px-[4.651cqw] pt-[14.884cqw]">
          <h2 className="font-delmon text-[8.837cqw] leading-[1.3] font-normal tracking-[-0.177cqw] text-white">
            Best Feed
          </h2>
          <p className="mt-[1.860cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-white">
            최신 베스트 피드를 확인해보세요!
          </p>

          <div
            ref={bestFeedScrollRef}
            className={`relative mt-[5.581cqw] flex h-[113.023cqw] w-full touch-pan-y snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth select-none ${noScrollbar}`}
            aria-roledescription="carousel"
            aria-label="베스트 피드"
            onDragStart={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              if (!bestFeedScrollRef.current) return
              bestFeedDrag.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                scrollLeft: bestFeedScrollRef.current.scrollLeft,
              }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              const drag = bestFeedDrag.current
              if (!drag || drag.pointerId !== event.pointerId || !bestFeedScrollRef.current) return
              bestFeedScrollRef.current.scrollLeft = drag.scrollLeft - (event.clientX - drag.x)
            }}
            onPointerUp={(event) => {
              if (bestFeedDrag.current?.pointerId !== event.pointerId || !bestFeedScrollRef.current) return
              bestFeedDrag.current = null
              const width = bestFeedScrollRef.current.clientWidth
              const nextIndex = Math.round(bestFeedScrollRef.current.scrollLeft / width)
              bestFeedScrollRef.current.scrollTo({ left: width * nextIndex, behavior: 'smooth' })
            }}
            onPointerCancel={() => {
              bestFeedDrag.current = null
            }}
            onScroll={(event) => {
              const width = event.currentTarget.clientWidth
              if (!width) return
              const nextIndex = Math.round(event.currentTarget.scrollLeft / width)
              if (nextIndex !== bestFeedIndex) setBestFeedIndex(nextIndex)
            }}
          >
            {bestFeeds.map((feed, index) => (
                <article key={feed.username} className="relative h-full w-full shrink-0 snap-start overflow-hidden" aria-hidden={bestFeedIndex !== index}>
                  <img src={feed.image} alt={`${feed.username}의 와인 피드`} className="pointer-events-none absolute inset-0 size-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/55 to-transparent" />

                  <div className="absolute inset-x-[4.651cqw] top-[4.651cqw] flex items-center gap-[2.326cqw]">
                    <img src={feed.avatar} alt="" className="size-[9.302cqw] shrink-0 rounded-full border-[0.5px] border-[#831317] object-cover object-top" />
                    <div className="min-w-0 flex-1">
                      <p className="font-playfair-display text-[3.721cqw] leading-[1.2] font-semibold text-white">{feed.username}</p>
                      <p className="flex items-center gap-[0.233cqw] truncate text-[2.791cqw] leading-[1.2] font-medium text-white">
                        <img src={iconMusicNote2} alt="" className="size-[5.581cqw] shrink-0" />
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

                  <div className="absolute inset-x-[4.651cqw] bottom-[14.419cqw] flex gap-[1.163cqw]">
                    {feed.tags.map((tag) => (
                      <span key={tag} className="flex h-[5.581cqw] items-center rounded-full bg-white/10 px-[1.279cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium whitespace-nowrap text-white">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-x-[4.651cqw] bottom-[4.651cqw] flex items-center gap-[3.721cqw] text-white">
                    <span className="flex items-center gap-[0.930cqw] text-[2.791cqw] leading-[9px] font-medium">
                      <img src={iconHeart} alt="" className="size-[4.651cqw]" />
                      {feed.likes}
                    </span>
                    <span className="flex items-center gap-[0.930cqw] text-[2.791cqw] leading-[9px] font-medium">
                      <img src={iconShare} alt="" className="size-[4.651cqw]" />
                      {feed.shares}
                    </span>
                  </div>
                </article>
              ))}
          </div>

          <div
            className="mt-[5.581cqw] flex items-center justify-center gap-[3.488cqw]"
            role="group"
            aria-label={`베스트 피드 슬라이드 ${bestFeedIndex + 1} / 3`}
          >
            {bestFeeds.map((feed, index) => (
              <button
                key={feed.username}
                type="button"
                aria-label={`${index + 1}번 베스트 피드 보기`}
                aria-current={bestFeedIndex === index ? 'true' : undefined}
                onClick={() => {
                  bestFeedScrollRef.current?.scrollTo({ left: bestFeedScrollRef.current.clientWidth * index, behavior: 'smooth' })
                }}
                className={`size-[2.326cqw] shrink-0 rounded-full ${bestFeedIndex === index ? 'bg-[#9a0707]' : 'bg-[#d9d9d9]'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Today's Pick */}
      <section className="pt-[6.977cqw]">
        <div className="flex items-center justify-between px-[4.651cqw]">
          <div>
            <h2 className="font-delmon text-[8.837cqw] leading-[1.3] font-normal tracking-[-0.177cqw] text-[#831317]">
              Today’s Pick
            </h2>
            <p className="mt-[1.163cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">
              오늘의 와인을 추천합니다.
            </p>
          </div>
          <Link to="/todays-pick" aria-label="오늘의 추천 전체보기">
            <img src={iconArrowForward5} alt="" className="size-[3.721cqw]" />
          </Link>
        </div>

        <div className="mt-[6.140cqw] px-[4.651cqw]">
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

        <div
          ref={todayPickScrollRef}
          className={`mt-[8.372cqw] flex snap-x snap-mandatory gap-[1.860cqw] overflow-x-auto overscroll-x-contain px-[4.651cqw] pb-[0.930cqw] scroll-pl-[4.651cqw] scroll-pr-[4.651cqw] scroll-smooth select-none md:cursor-grab md:active:cursor-grabbing ${noScrollbar}`}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse' || !todayPickScrollRef.current) return
            todayPickDrag.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              scrollLeft: todayPickScrollRef.current.scrollLeft,
              moved: false,
            }
            todayPickDidDrag.current = false
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            const drag = todayPickDrag.current
            if (!drag || drag.pointerId !== event.pointerId || !todayPickScrollRef.current) return
            if (Math.abs(event.clientX - drag.x) > 5) {
              drag.moved = true
              todayPickDidDrag.current = true
            }
            todayPickScrollRef.current.scrollLeft = drag.scrollLeft - (event.clientX - drag.x)
          }}
          onPointerUp={(event) => {
            if (todayPickDrag.current?.pointerId === event.pointerId) todayPickDrag.current = null
          }}
          onPointerCancel={() => {
            todayPickDrag.current = null
          }}
        >
          <Link
            to="/product/chateau-margaux-2018"
            onClick={(event) => {
              if (todayPickDidDrag.current) {
                event.preventDefault()
                todayPickDidDrag.current = false
              }
            }}
            className="block w-[55.814cqw] shrink-0 snap-start text-left no-underline"
          >
            <div className="flex h-[64.884cqw] items-center justify-center bg-[#f2f2f2]">
              <img src={bottleCasaSmith} alt="Casa Smith ViNO Rosso" className="h-[52.326cqw] w-auto object-contain" />
            </div>
            <p className="font-delmon mt-[3.488cqw] text-[3.721cqw] leading-[1.3] font-normal tracking-[-0.112cqw] text-black">
              Casa Smith ViNO Rosso
            </p>
            <p className="mt-[1.163cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">포도향, 떫음</p>
            <div className="mt-[1.163cqw] flex items-center justify-between">
              <span className="flex h-[4.651cqw] items-center rounded-full bg-[#831317] px-[1.279cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-normal text-white">
                #오늘의 와인
              </span>
              <span className="flex items-center gap-[0.233cqw] text-[2.791cqw] leading-[1.08] tracking-[-0.084cqw] text-[#831317] underline">
                자세히보기
                <img src={iconChevronForward} alt="" className="size-[4.186cqw]" />
              </span>
            </div>
          </Link>
          <div className="w-[55.814cqw] shrink-0 snap-start">
            <div className="flex h-[64.884cqw] items-center justify-center bg-[#f2f2f2]">
              <img src={bottleKimCrawford} alt="Kim CrawFord Pinot Noir" className="h-[50.930cqw] w-auto object-contain" />
            </div>
            <p className="font-delmon mt-[3.488cqw] text-[3.488cqw] leading-[1.3] font-normal tracking-[-0.105cqw] text-black">
              Kim CrawFord Pinot Noir
            </p>
            <p className="mt-[1.163cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">꽃향, 부드러움</p>
            <div className="mt-[1.163cqw]">
              <span className="flex h-[4.651cqw] w-fit items-center rounded-full bg-[#831317] px-[2.326cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium text-white">
                #AI 소믈리에 추천
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="pt-[11.163cqw]">
        <div className="flex items-center justify-between px-[4.651cqw]">
          <h2 className="font-delmon text-[8.837cqw] leading-[1.3] font-normal tracking-[-0.177cqw] text-[#831317]">
            Challenge
          </h2>
          <Link to="/challenge/continents" aria-label="챌린지 상세보기">
            <img src={iconArrowForward} alt="" className="size-[3.721cqw]" />
          </Link>
        </div>

        <div
          ref={challengeScrollRef}
          className={`mt-[2.558cqw] flex snap-x snap-mandatory gap-[1.860cqw] overflow-x-auto overscroll-x-contain px-[4.651cqw] pb-[0.930cqw] scroll-pl-[4.651cqw] scroll-pr-[4.651cqw] scroll-smooth select-none md:cursor-grab md:active:cursor-grabbing ${noScrollbar}`}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse' || !challengeScrollRef.current) return
            challengeDrag.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              scrollLeft: challengeScrollRef.current.scrollLeft,
            }
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            const drag = challengeDrag.current
            if (!drag || drag.pointerId !== event.pointerId || !challengeScrollRef.current) return
            challengeScrollRef.current.scrollLeft = drag.scrollLeft - (event.clientX - drag.x)
          }}
          onPointerUp={(event) => {
            if (challengeDrag.current?.pointerId === event.pointerId) challengeDrag.current = null
          }}
          onPointerCancel={() => {
            challengeDrag.current = null
          }}
        >
          <div className="relative h-[73.953cqw] w-[72.791cqw] shrink-0 snap-start overflow-hidden">
            <img src={wineContinentsImage} alt="오대륙 와인 마셔보기" className="absolute inset-0 size-full object-cover" />
            <p className="absolute top-[7.442cqw] left-[5.581cqw] text-[5.581cqw] leading-[1.3] font-medium tracking-[-0.112cqw] text-white">
              오대륙 와인 마셔보기
            </p>
            <p className="absolute top-[16.512cqw] left-[5.581cqw] whitespace-nowrap text-[3.256cqw] leading-[1.45] tracking-[-0.065cqw] text-white/80">
              대륙별 와인을 경험하고 나만의 와인 취향 찾기
            </p>
            <div className="absolute top-[62.326cqw] left-[4.884cqw] h-[3.953cqw] w-[62.791cqw] overflow-hidden rounded-[14.884cqw] border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur-[12px]">
              <div className="h-full w-[27.209cqw] rounded-[14.884cqw] bg-[#831317]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]" />
            </div>
            <div className="absolute top-[62.326cqw] left-[4.884cqw] flex h-[3.953cqw] w-[62.791cqw] items-center justify-between pr-[1.395cqw] pl-[2.093cqw] text-[2.791cqw] leading-none font-normal tracking-[-0.056cqw] text-white">
              <span className="font-playfair font-normal" style={playfairOpsz}>
                In Progress
              </span>
              <span>45%</span>
            </div>
          </div>

          <div className="relative h-[73.953cqw] w-[71.860cqw] shrink-0 snap-start overflow-hidden">
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
        <h2 className="font-delmon text-[8.837cqw] leading-[1.3] font-normal tracking-[-0.177cqw] text-[#831317]">
          Event
        </h2>
        <div className="mt-[4.651cqw] divide-y divide-black/20">
          {eventItems.map((item) => {
            const content = (
              <>
                <div>
                  <p className="text-[2.791cqw] leading-[1.55] font-medium tracking-[-0.056cqw] text-[#831317]">{item.label}</p>
                  <p className="mt-[0.558cqw] text-[4.186cqw] leading-[1.18] font-semibold tracking-[-0.147cqw] text-black">
                    {item.title}
                  </p>
                  <p className="mt-[1.572cqw] text-[2.791cqw] leading-[1.55] tracking-[-0.056cqw] text-black">{item.description}</p>
                </div>
                <img src={iconArrowForward2} alt="" className="size-[3.721cqw] shrink-0" />
              </>
            )

            return item.path ? (
              <Link
                key={item.label}
                to={item.path}
                className="flex w-full items-center justify-between py-[4.651cqw] text-left no-underline"
              >
                {content}
              </Link>
            ) : (
              <button key={item.label} type="button" className="flex w-full items-center justify-between py-[4.651cqw] text-left">
                {content}
              </button>
            )
          })}
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
          <div className="absolute inset-0 bg-gradient-to-r from-black from-[24.525%] to-[rgba(29,4,5,0)] to-[79.087%]" />
          <div className="absolute inset-0 bg-[#575757]/20" />
          <div className="relative z-10 flex h-full flex-col justify-center px-[4.651cqw]">
            <p className="text-[5.581cqw] leading-[1.3] font-bold tracking-[-0.112cqw] text-white">페어링하기 좋은 음식찾기</p>
            <p className="mt-[0.233cqw] text-[3.256cqw] leading-[1.45] tracking-[-0.065cqw] text-white">
              매주 지정 음식에 어울리는 와인을 추천하고 투표받기
            </p>
          </div>
        </div>
      </section>

      {/* Wine Story */}
      <section className="px-[4.651cqw] pt-[11.163cqw]">
        <div className="relative h-[92.791cqw] w-full">
          <p className="absolute inset-x-0 top-[2.326cqw] text-center text-[3.256cqw] leading-[9px] tracking-[-0.065cqw] text-black/50">
            2026.07.10
          </p>
          <h2 className="font-delmon absolute inset-x-0 top-[4.651cqw] text-center text-[8.837cqw] leading-[1.3] font-normal tracking-[-0.177cqw] text-[#831317]">
            Wine Story
          </h2>
          <p className="absolute top-[19.302cqw] left-1/2 w-[64.651cqw] -translate-x-1/2 text-center text-[3.256cqw] leading-[1.3] font-light tracking-[-0.098cqw] text-black">
            많은 사람들이 오래된 와인이 더 맛있다고 생각하지만 사실은 그렇지 않다. 전 세계 와인의 약 90%는 1~3년
            안에 마시는 것이 가장 맛있다. 숙성이 필요한 와인은 극히 일부의 프리미엄 와인뿐이다.
          </p>
          <img
            src={wineNoteImage}
            alt="와인과 포도"
            className="absolute top-[46.512cqw] left-1/2 h-[40.233cqw] w-[26.744cqw] -translate-x-1/2 object-cover"
          />
        </div>
      </section>

      {/* Magazine — 다른 섹션과 동일하게 좌측 4.651cqw부터 시작, 스크롤바 숨김
          scroll-snap 컨테이너는 scroll-padding이 없으면 시작 padding을 무시하고
          첫 카드를 화면 맨 왼쪽에 스냅시키는 브라우저 동작이 있어 scroll-pl로 보정 */}
      <section
        ref={magazineScrollRef}
        aria-label="메인 매거진 가로 목록"
        className={`mt-[11.163cqw] flex touch-pan-x snap-x snap-proximity scroll-smooth gap-[1.860cqw] overflow-x-auto overscroll-x-contain px-[4.651cqw] pb-[1.860cqw] scroll-pl-[4.651cqw] scroll-pr-[4.651cqw] select-none [-webkit-overflow-scrolling:touch] md:cursor-grab md:active:cursor-grabbing ${noScrollbar}`}
        onDragStart={(event) => event.preventDefault()}
        onScroll={(event) => {
          const carousel = event.currentTarget
          const firstCard = carousel.firstElementChild as HTMLElement | null
          if (!firstCard) return
          const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0
          setMagazineIndex(Math.round(carousel.scrollLeft / (firstCard.offsetWidth + gap)))
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' || !magazineScrollRef.current) return
          magazineDrag.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            scrollLeft: magazineScrollRef.current.scrollLeft,
            moved: false,
          }
          magazineDidDrag.current = false
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          const drag = magazineDrag.current
          if (!drag || drag.pointerId !== event.pointerId || !magazineScrollRef.current) return
          if (Math.abs(event.clientX - drag.x) > 5) {
            drag.moved = true
            magazineDidDrag.current = true
          }
          magazineScrollRef.current.scrollLeft = drag.scrollLeft - (event.clientX - drag.x)
        }}
        onPointerUp={(event) => {
          if (magazineDrag.current?.pointerId === event.pointerId) magazineDrag.current = null
        }}
        onPointerCancel={() => {
          magazineDrag.current = null
        }}
      >
        {magazineCards.map((card) => (
          <Link
            key={card.title}
            to="/magazine/k-wine-road"
            aria-label="매거진 자세히 보기"
            onClick={(event) => {
              if (magazineDidDrag.current) {
                event.preventDefault()
                magazineDidDrag.current = false
              }
            }}
            className="relative block h-[114.884cqw] w-[90.698cqw] shrink-0 snap-start overflow-hidden no-underline"
          >
            <img src={card.image} alt="Magazine" draggable={false} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/65 from-[14.07%] to-[rgba(102,102,102,0)]" />
            <div className="absolute inset-0 bg-black/[0.14]" />

            <span aria-hidden="true" className="absolute top-[36.512cqw] right-[4.651cqw] size-[5.581cqw]">
              <img src={iconArrowForward} alt="" className="size-full" />
            </span>
            <p className="absolute inset-x-[4.651cqw] top-[59.302cqw] text-[6.512cqw] leading-[1.18] font-bold tracking-[-0.228cqw] text-white">
              {card.title}
            </p>
            <div className="absolute inset-x-[4.651cqw] top-[66.977cqw] text-[5.581cqw] leading-[1.55] tracking-[-0.112cqw] text-white">
              {card.subtitle.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="absolute inset-x-[4.651cqw] top-[86.047cqw] w-[79.302cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-white">
              {card.body}
            </p>
          </Link>
        ))}
      </section>

      <div
        className="mt-[3.721cqw] flex items-center justify-center gap-[3.488cqw]"
        role="img"
        aria-label={`매거진 슬라이드 ${magazineIndex + 1} / ${magazineCards.length}`}
      >
        {magazineCards.map((card, index) => (
          <span
            key={card.title}
            className={`size-[2.326cqw] shrink-0 rounded-full transition-colors ${magazineIndex === index ? 'bg-[#9a0707]' : 'bg-[#d9d9d9]'}`}
          />
        ))}
      </div>

      {/* Collect Corks */}
      <section className="relative mt-[12.093cqw] h-[120.465cqw] w-full overflow-hidden bg-white">
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
          className="absolute top-[45.116cqw] left-[38.605cqw] z-10 h-[10.698cqw] w-[15.470cqw] -scale-y-100 rotate-[103.79deg] opacity-30"
        />
        <img
          src={corkIcon}
          alt=""
          aria-hidden
          className="absolute top-[68.435cqw] left-[58.179cqw] z-10 h-[12.055cqw] w-[17.433cqw] -scale-y-100 rotate-[-80.67deg] opacity-70"
        />

        <p className="absolute top-[28.837cqw] left-1/2 -translate-x-1/2 whitespace-nowrap font-delmon text-[13.488cqw] leading-none font-normal tracking-[-0.405cqw] text-[#831317]">
          Collect Corks
        </p>
        <p className="absolute top-[65.814cqw] left-1/2 -translate-x-1/2 text-center text-[3.256cqw] leading-[1.3] font-light tracking-[-0.098cqw] text-black">
          매일매일 출석해 코르크를 모아보세요
        </p>

        <button
          type="button"
          className="absolute top-[50.000cqw] left-1/2 z-20 flex h-[10.930cqw] w-[33.953cqw] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-white/55 bg-white/[0.06] text-[3.721cqw] leading-[1.2] font-semibold tracking-[-0.074cqw] text-[#831317] shadow-[0_8px_24px_rgba(80,45,30,0.12),0_0_20px_4px_rgba(176,176,176,0.22),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(255,255,255,0.2)] backdrop-blur-[6px] backdrop-saturate-150"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-white/[0.08]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[0.435cqw] inset-y-[0.649cqw] rounded-full"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[0.870cqw] inset-y-[1.298cqw] rounded-full shadow-[inset_0_1px_6px_rgba(255,255,255,0.18)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-[0.698cqw] right-[3.488cqw] left-[3.488cqw] h-px rounded-full bg-white/70 blur-[0.5px]"
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
          <div
            className="absolute inset-x-0 bottom-0 h-[40.698cqw]"
            style={{
              backgroundImage:
                'linear-gradient(180.6631deg, rgba(255,255,255,0) 1.3505%, rgba(68,62,62,0.495) 42.333%, rgb(0,0,0) 92.106%)',
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default Home
