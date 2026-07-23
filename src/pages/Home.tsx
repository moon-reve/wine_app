import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import heroImage from '../assets/images/hero.png'
import heroTasteImage from '../assets/images/hero-taste.png'
import heroShareImage from '../assets/images/hero-share.png'
import foodPairingImage from '../assets/images/food-pairing.png'
import magazineCard1 from '../assets/images/magazine-card-1.png'
import magazineCard2 from '../assets/images/magazine-card-2.png'
import wineContinentsImage from '../assets/images/wine-continents.png'
import corkIcon from '../assets/images/cork-icon.png'
import corkPile from '../assets/images/cork-pile.png'
import wineNoteImage from '../assets/images/wine-note.png'
import aiSommelierImage from '../assets/images/ai-sommelier-bg.png'
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
import iconHeart from '../assets/images/icon-heart.svg'
import iconShare from '../assets/images/icon-share.svg'
import iconMusicNote2 from '../assets/images/icon-music-note-2.svg'
import Header from '../components/Header'
import WineHotspot from '../components/WineHotspot'
import winesData from '../../dummy data/wines.json'
import { TODAY_PICK_WINE_IDS, type WineType as TodayPickType } from '../data/todayPickData'

const playfairOpsz = { fontVariationSettings: '"opsz" 12' }

type TodayPickWine = {
  id: string
  nameEn: string
  type: TodayPickType
  imageUrl: string
  tastingNotes: string[]
}

const tabs: { label: string; type: TodayPickType }[] = [
  { label: '레드', type: 'red' },
  { label: '화이트', type: 'white' },
  { label: '로제', type: 'rose' },
  { label: '스파클링', type: 'sparkling' },
]

const todayPickWineData = winesData as TodayPickWine[]
const todayPickWineImages = import.meta.glob('../assets/images/wines/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveTodayPickWineImage(wine: TodayPickWine) {
  const fileName = wine.imageUrl.split('/').pop() ?? ''
  return todayPickWineImages[`../assets/images/wines/${fileName}`] ?? ''
}

const eventItems = [
  {
    label: '시음회',
    title: '와인 시음회',
    description: '다양한 와인을 직접 시음하며 나만의 취향을 발견해 보세요.',
    path: '/event/summer-wine-festival',
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

const heroWineHotspots = [
  {
    name: '벤볼리오 피노 그리지오 2024',
    detailPath: '/wine_detail/white/wine_107',
    top: 'calc(71.163cqw + 25px)',
    left: '67.209cqw',
    calloutSide: 'left',
  },
] as const

function Home() {
  const navigate = useNavigate()
  const [heroIndex, setHeroIndex] = useState(0)
  const [bestFeedIndex, setBestFeedIndex] = useState(0)
  const [magazineIndex, setMagazineIndex] = useState(0)
  const [todayPickType, setTodayPickType] = useState<TodayPickType>('red')
  const [openHeroWineIndex, setOpenHeroWineIndex] = useState<number | null>(null)
  const heroPointerStart = useRef<number | null>(null)
  const bestFeedScrollRef = useRef<HTMLDivElement>(null)
  const bestFeedDrag = useRef<{ pointerId: number; x: number; scrollLeft: number; startedAt: number } | null>(null)
  const todayPickScrollRef = useRef<HTMLDivElement>(null)
  const todayPickDrag = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null)
  const todayPickDidDrag = useRef(false)
  const challengeScrollRef = useRef<HTMLDivElement>(null)
  const challengeDrag = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null)
  const challengeDidDrag = useRef(false)
  const magazineScrollRef = useRef<HTMLElement>(null)
  const magazineDrag = useRef<{ pointerId: number; x: number; scrollLeft: number; moved: boolean } | null>(null)
  const magazineDidDrag = useRef(false)
  const todayPickWines = TODAY_PICK_WINE_IDS[todayPickType]
    .map((id) => todayPickWineData.find((wine) => wine.id === id))
    .filter((wine): wine is TodayPickWine => Boolean(wine))

  const finishHeroSwipe = (clientX: number) => {
    if (heroPointerStart.current === null) return

    const distance = clientX - heroPointerStart.current
    heroPointerStart.current = null
    if (Math.abs(distance) < 40) return

    setHeroIndex((current) => Math.max(0, Math.min(2, current + (distance < 0 ? 1 : -1))))
  }

  const finishBestFeedDrag = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const drag = bestFeedDrag.current
    const carousel = bestFeedScrollRef.current
    if (!drag || drag.pointerId !== event.pointerId || !carousel) return

    bestFeedDrag.current = null
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId)
    carousel.style.scrollSnapType = ''
    carousel.style.scrollBehavior = ''

    const width = carousel.clientWidth
    if (!width) return

    const startIndex = Math.round(drag.scrollLeft / width)
    const distance = event.clientX - drag.x
    const elapsed = Math.max(performance.now() - drag.startedAt, 1)
    const isFlick = Math.abs(distance) / elapsed >= 0.45
    const shouldMove = !cancelled && (Math.abs(distance) >= 45 || isFlick)
    const targetIndex = shouldMove
      ? Math.max(0, Math.min(bestFeeds.length - 1, startIndex + (distance < 0 ? 1 : -1)))
      : startIndex

    carousel.scrollTo({ left: width * targetIndex, behavior: 'smooth' })
  }

  return (
    <div className="@container mx-auto w-full overflow-hidden bg-white">
      {/* Hero */}
      <section
        className="relative h-[159.767cqw] w-full touch-pan-y overflow-hidden select-none"
        aria-roledescription="carousel"
        aria-label="홈 히어로"
        onPointerDown={(event) => {
          if (event.target instanceof Element && event.target.closest('button, a')) return
          event.preventDefault()
          heroPointerStart.current = event.clientX
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onDragStart={(event) => event.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
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
            <img src={heroImage} alt="와인을 잔에 따르는 모습" draggable={false} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[9.896%] via-[rgba(160,160,160,0)] via-[33.807%] to-[rgba(0,0,0,0.62)] to-[75.606%]" />
            <div className="absolute inset-x-0 top-[31.163cqw] h-[128.605cqw] bg-gradient-to-b from-[rgba(102,102,102,0)] from-[40.145%] to-black to-[115.01%]" />

            {heroWineHotspots.map((wine, index) => (
              <WineHotspot
                key={wine.name}
                name={wine.name}
                position={{ left: wine.left, top: wine.top }}
                calloutSide={wine.calloutSide}
                isOpen={openHeroWineIndex === index}
                onToggle={() => setOpenHeroWineIndex((current) => current === index ? null : index)}
                detailPath={wine.detailPath}
              />
            ))}

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
            <img src={heroTasteImage} alt="와인의 향과 맛을 기록하는 모습" draggable={false} className="absolute top-0 left-0 h-[111.21%] w-full max-w-none" />
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
            <img src={heroShareImage} alt="와인 러버들과 특별한 순간을 나누는 모습" draggable={false} className="absolute inset-0 size-full object-cover" />
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
            className={`relative mt-[5.581cqw] flex h-[113.023cqw] w-full cursor-grab touch-pan-y snap-x snap-mandatory overflow-x-auto overscroll-x-contain select-none active:cursor-grabbing ${noScrollbar}`}
            aria-roledescription="carousel"
            aria-label="베스트 피드"
            onDragStart={(event) => event.preventDefault()}
            onPointerDown={(event) => {
              if (!bestFeedScrollRef.current || (event.pointerType === 'mouse' && event.button !== 0)) return
              if (event.target instanceof Element && event.target.closest('button, a')) return

              event.currentTarget.style.scrollSnapType = 'none'
              event.currentTarget.style.scrollBehavior = 'auto'
              bestFeedDrag.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                scrollLeft: bestFeedScrollRef.current.scrollLeft,
                startedAt: performance.now(),
              }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              const drag = bestFeedDrag.current
              if (!drag || drag.pointerId !== event.pointerId || !bestFeedScrollRef.current) return
              bestFeedScrollRef.current.scrollLeft = drag.scrollLeft - (event.clientX - drag.x)
            }}
            onPointerUp={(event) => finishBestFeedDrag(event)}
            onPointerCancel={(event) => finishBestFeedDrag(event, true)}
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
            {tabs.map((tab) => {
              const isActive = todayPickType === tab.type

              return (
              <button
                key={tab.type}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setTodayPickType(tab.type)
                  todayPickDidDrag.current = false
                  todayPickScrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
                }}
                className={`relative pb-[2.791cqw] text-center font-playfair text-[3.721cqw] leading-[1.3] tracking-[-0.074cqw] ${
                  isActive ? 'font-bold text-[#831317]' : 'font-normal text-[#7b7b7b]'
                }`}
                style={playfairOpsz}
              >
                {tab.label}
                {isActive && <span className="absolute inset-x-0 -bottom-px h-[0.698cqw] w-full bg-[#831317]" />}
              </button>
              )
            })}
          </div>
        </div>

        <div
          ref={todayPickScrollRef}
          className={`mt-[8.372cqw] flex snap-x snap-mandatory gap-[1.860cqw] overflow-x-auto overscroll-x-contain px-[4.651cqw] pb-[0.930cqw] scroll-pl-[4.651cqw] scroll-pr-[4.651cqw] scroll-smooth select-none md:cursor-grab md:active:cursor-grabbing ${noScrollbar}`}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={(event) => {
            todayPickDidDrag.current = false
            if (event.pointerType !== 'mouse' || !todayPickScrollRef.current) return
            todayPickDrag.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              scrollLeft: todayPickScrollRef.current.scrollLeft,
              moved: false,
            }
          }}
          onPointerMove={(event) => {
            const drag = todayPickDrag.current
            if (!drag || drag.pointerId !== event.pointerId || !todayPickScrollRef.current) return

            const distance = event.clientX - drag.x
            if (!drag.moved) {
              if (Math.abs(distance) <= 10) return
              drag.moved = true
              todayPickDidDrag.current = true
              event.currentTarget.setPointerCapture(event.pointerId)
            }

            event.preventDefault()
            todayPickScrollRef.current.scrollLeft = drag.scrollLeft - distance
          }}
          onPointerUp={(event) => {
            if (todayPickDrag.current?.pointerId !== event.pointerId) return
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
            todayPickDrag.current = null
          }}
          onPointerCancel={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
            todayPickDrag.current = null
          }}
        >
          {todayPickWines.map((wine, index) => {
            const cardContent = (
              <>
                <div className="flex h-[64.884cqw] items-center justify-center bg-[#f2f2f2]">
                  <img
                    src={resolveTodayPickWineImage(wine)}
                    alt={wine.nameEn}
                    draggable={false}
                    className="h-[52.326cqw] max-w-[80%] object-contain"
                  />
                </div>
                <p className="font-delmon mt-[3.488cqw] text-[3.488cqw] leading-[1.3] font-normal tracking-[-0.105cqw] text-black">
                  {wine.nameEn}
                </p>
                <p className="mt-[1.163cqw] text-[3.256cqw] leading-[1.3] tracking-[-0.065cqw] text-black/50">
                  {wine.tastingNotes.slice(0, 2).join(', ')}
                </p>
                <div className="mt-[1.163cqw] flex items-center justify-between">
                  <span className="flex h-[4.651cqw] w-fit items-center rounded-full bg-[#831317] px-[1.279cqw] py-[0.465cqw] text-[2.791cqw] leading-[9px] font-medium text-white">
                    {index === 0 ? '#오늘의 와인' : '#AI 소믈리에 추천'}
                  </span>
                  <span className="flex items-center gap-[0.233cqw] text-[2.791cqw] leading-[1.08] tracking-[-0.084cqw] text-[#831317] underline">
                    자세히보기
                    <img src={iconChevronForward} alt="" className="size-[4.186cqw]" />
                  </span>
                </div>
              </>
            )

            return (
              <button
                key={wine.id}
                type="button"
                onClick={() => {
                  if (todayPickDidDrag.current) {
                    todayPickDidDrag.current = false
                    return
                  }
                  navigate(`/wine_detail/${wine.type}/${wine.id}`)
                }}
                className="block w-[55.814cqw] shrink-0 snap-start text-left"
              >
                {cardContent}
              </button>
            )
          })}
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
            challengeDidDrag.current = false
            challengeDrag.current = {
              pointerId: event.pointerId,
              x: event.clientX,
              scrollLeft: challengeScrollRef.current.scrollLeft,
              moved: false,
            }
          }}
          onPointerMove={(event) => {
            const drag = challengeDrag.current
            if (!drag || drag.pointerId !== event.pointerId || !challengeScrollRef.current) return
            const distance = event.clientX - drag.x
            if (Math.abs(distance) > 8) {
              drag.moved = true
              challengeDidDrag.current = true
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.setPointerCapture(event.pointerId)
              }
            }
            if (drag.moved) challengeScrollRef.current.scrollLeft = drag.scrollLeft - distance
          }}
          onPointerUp={(event) => {
            if (challengeDrag.current?.pointerId !== event.pointerId) return
            challengeDrag.current = null
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
          onPointerCancel={(event) => {
            challengeDrag.current = null
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
        >
          <button
            type="button"
            onClick={() => {
              if (challengeDidDrag.current) {
                challengeDidDrag.current = false
                return
              }
              navigate('/challenge/continents')
            }}
            className="relative h-[73.953cqw] w-[72.791cqw] shrink-0 snap-start overflow-hidden text-left"
          >
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
          </button>

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
        }}
        onPointerMove={(event) => {
          const drag = magazineDrag.current
          if (!drag || drag.pointerId !== event.pointerId || !magazineScrollRef.current) return
          const distance = event.clientX - drag.x
          if (!drag.moved && Math.abs(distance) > 8) {
            drag.moved = true
            magazineDidDrag.current = true
            event.currentTarget.setPointerCapture(event.pointerId)
          }
          if (!drag.moved) return
          event.preventDefault()
          magazineScrollRef.current.scrollLeft = drag.scrollLeft - distance
        }}
        onPointerUp={(event) => {
          if (magazineDrag.current?.pointerId !== event.pointerId) return
          magazineDrag.current = null
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
          }
        }}
        onPointerCancel={(event) => {
          magazineDrag.current = null
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
          }
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
