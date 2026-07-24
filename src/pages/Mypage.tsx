import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatarImage from '../assets/mypage/figma-profile-photo.png'
import profileStoryRing from '../assets/mypage/profile-story-ring.svg'
import challengeCircleImage from '../assets/mypage/mypage-challenge-circle.png'
import challengeRingImage from '../assets/mypage/challenge-ring.png'
import badgesCircleImage from '../assets/mypage/badges-circle.png'
import highlightsCircleImage from '../assets/mypage/highlights-circle.png'
import lightSearchIcon from '../assets/lounge/search.svg'
import feedThumb1 from '../assets/mypage/figma-feed-01.png'
import feedThumb2 from '../assets/mypage/figma-feed-02.png'
import feedThumb3 from '../assets/mypage/figma-feed-03.png'
import feedThumb4 from '../assets/mypage/figma-feed-04.png'
import feedThumb5 from '../assets/mypage/figma-feed-05.png'
import feedThumb6 from '../assets/mypage/figma-feed-06.png'
import feedThumb7 from '../assets/mypage/figma-feed-07.png'
import feedThumb8 from '../assets/mypage/figma-feed-08.png'
import feedThumb9 from '../assets/mypage/figma-feed-09.png'
import feedThumb10 from '../assets/mypage/figma-feed-10.png'
import feedThumb11 from '../assets/mypage/figma-feed-11.png'
import feedThumb12 from '../assets/mypage/figma-feed-12.png'
import multipleFeedIcon from '../assets/mypage/multiple-feed-icon.svg'
import settingsIcon from '../assets/mypage/settings-outline.svg'
import wineImage1 from '../assets/mypage/figma-wine-review-01.png'
import wineImage2 from '../assets/mypage/figma-wine-review-02.png'
import wineImage3 from '../assets/mypage/figma-wine-review-03.png'
import likedHeartIcon from '../assets/mypage/liked-heart.svg'
import ratingStarIcon from '../assets/mypage/rating-star.svg'
import Logo from '../components/Logo'
import { dummyWineData, toListWine, type DummyWine, type Wine } from '../data/wineCatalog'
import { useLikedWines } from '../context/LikedWinesContext'

const feedImages = [
  feedThumb1,
  feedThumb2,
  feedThumb3,
  feedThumb4,
  feedThumb5,
  feedThumb6,
  feedThumb7,
  feedThumb8,
  feedThumb9,
  feedThumb10,
  feedThumb11,
  feedThumb12,
]

const feedItems = [
  { image: feedThumb1, crop: 'absolute top-[-21.13%] left-[-7.75%] h-[204.57%] w-[115.11%] max-w-none', multiple: true },
  { image: feedThumb2, crop: 'absolute inset-0 size-full object-cover', multiple: false },
  { image: feedThumb3, crop: 'absolute top-[-2.01%] left-0 h-[111.98%] w-[100.26%] max-w-none', multiple: true },
  { image: feedThumb4, crop: 'absolute top-[-3.63%] left-[-12.22%] h-[125.47%] w-[112.1%] max-w-none', multiple: false },
  { image: feedThumb5, crop: 'absolute top-[0.22%] left-[-0.26%] h-[144.28%] w-[100.26%] max-w-none', multiple: false },
  { image: feedThumb6, crop: 'absolute top-0 left-[-0.34%] h-[111.69%] w-[100.16%] max-w-none', multiple: true },
  { image: feedThumb7, crop: 'absolute top-[-3.62%] left-[-1.91%] h-[117.42%] w-[105.26%] max-w-none', multiple: false },
  { image: feedThumb8, crop: 'absolute top-[0.17%] left-[-12.03%] h-[125.08%] w-[112.13%] max-w-none', multiple: true },
  { image: feedThumb9, crop: 'absolute inset-0 size-full object-cover object-bottom', multiple: false },
  { image: feedThumb10, crop: 'absolute top-[-0.09%] left-[-0.52%] h-[121.6%] w-full max-w-none', multiple: true },
  { image: feedThumb11, crop: 'absolute top-[-0.22%] left-[-0.26%] h-[104.98%] w-[100.26%] max-w-none', multiple: false },
  { image: feedThumb12, crop: 'absolute top-[-8.05%] left-[-0.26%] h-[111.98%] w-[100.26%] max-w-none', multiple: false },
] as const

const wineReviews = [
  {
    name: '샤토 라퐁 로셰 2015',
    date: '2026.07.01',
    rating: '5.0',
    review: '친구들과 저녁을 먹으며 천천히 마셨다. 묵직한 가죽 향 뒤로 잘 익은 베리 향이 올라와 마지막 잔까지 편안하게 즐겼다.',
    image: wineImage1,
    crop: 'absolute top-[-9.47%] left-[-9.01%] h-[116.41%] w-[116.46%] max-w-none',
  },
  {
    name: '클라우디 베이 소비뇽 블랑',
    date: '2026.06.25',
    rating: '4.0',
    review: '더운 날 차갑게 식혀 마시니 시트러스한 산미가 무척 상쾌했다. 은은한 열대 과실 향이 오래 남아 해산물 요리와 잘 어울렸다.',
    image: wineImage2,
    crop: 'absolute top-[-21.09%] left-[-14.79%] h-[136.83%] w-[129.44%] max-w-none',
  },
  {
    name: '투 핸즈 엔젤스 쉐어 쉬라즈',
    date: '2026.06.10',
    rating: '4.5',
    review: '집에서 음악을 들으며 마셨다. 진한 자두와 블랙베리 풍미가 풍성했고 탄닌도 부드러웠다. 다음에는 스테이크와 다시 마시고 싶다.',
    image: wineImage3,
    crop: 'absolute top-[-29.28%] left-[-20.38%] h-[149.77%] w-[141.59%] max-w-none',
  },
] as const

function WineReviewCard({ review }: { review: (typeof wineReviews)[number] }) {
  return (
    <article className="flex h-[166px] w-full items-start gap-[18px] rounded-[14px] border border-[#e3dede] bg-white px-4 py-[18px]">
      <div className="relative h-[130px] w-[94px] shrink-0 overflow-hidden rounded-lg">
        <img src={review.image} alt={review.name} className={review.crop} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="min-w-0 truncate text-xl leading-[25px] font-semibold whitespace-nowrap text-[#1e1b18]">{review.name}</h2>
          <p className="shrink-0 text-base leading-6 font-bold whitespace-nowrap text-[#831317]">★ {review.rating}</p>
        </div>
        <time className="mt-1 text-[10px] leading-[normal] font-normal tracking-[-0.2px] text-[#9e9e9e]">{review.date}</time>
        <p className="mt-4 line-clamp-3 text-xs leading-[1.5] font-normal tracking-[-0.24px] text-[#8a8a8a]">{review.review}</p>
      </div>
    </article>
  )
}

function LikedWineCard({
  wine,
  onSelect,
  onUnlike,
}: {
  wine: Wine
  onSelect: () => void
  onUnlike: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSelect()
      }}
      aria-label={`${wine.name} 상세보기`}
      className="flex min-h-[159px] w-full cursor-pointer items-center gap-[37px] py-[24px] pl-[24px] text-left"
    >
      <div
        className="flex size-[89px] shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: wine.bgColor }}
      >
        <img src={wine.image} alt={wine.name} className="h-[85%] w-auto object-contain" />
      </div>
      <div className="flex flex-col gap-[8px] pt-[4px]">
        <div>
          <p className="text-[20px] leading-[25px] font-semibold text-[#1e1b18]">{wine.name}</p>
          <p className={`${wine.regionTextSize} leading-[25px] text-[#817f7e]`}>{wine.region}</p>
        </div>
        <div className="flex w-[220px] items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <p className="text-[16px] leading-[24px] font-bold text-[#1e1b18]">{wine.price}</p>
            <div className="flex items-center gap-[4px]">
              <img src={ratingStarIcon} alt="" className="h-[14.25px] w-[15px]" aria-hidden="true" />
              <p className="text-[16px] leading-[24px] font-bold text-[#831317]">{wine.rating}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label={`${wine.name} 좋아요 취소`}
            onClick={(event) => {
              event.stopPropagation()
              onUnlike()
            }}
            className="flex h-[17px] w-[19px] shrink-0 items-center justify-center"
          >
            <img src={likedHeartIcon} alt="" className="h-full w-full" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

type FeedLightboxProps = {
  selectedIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

function FeedLightbox({ selectedIndex, onClose, onPrevious, onNext }: FeedLightboxProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNext, onPrevious])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`내 피드 ${selectedIndex + 1} 확대 보기`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-5 py-20"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="확대 화면 닫기"
        onClick={onClose}
        className="absolute top-[calc(20px+env(safe-area-inset-top))] right-5 flex size-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
          <path d="M5 5 19 19M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="이전 피드 보기"
        onClick={(event) => {
          event.stopPropagation()
          onPrevious()
        }}
        className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
          <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <img
        src={feedImages[selectedIndex]}
        alt={`내 피드 ${selectedIndex + 1}`}
        className="max-h-full max-w-full rounded-lg object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      <button
        type="button"
        aria-label="다음 피드 보기"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="absolute bottom-[calc(24px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-sm font-medium tracking-[-0.28px] text-white">
        {selectedIndex + 1} / {feedImages.length}
      </p>
    </div>
  )
}

function Mypage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'feed' | 'wine' | 'likes'>('feed')
  const [selectedFeedIndex, setSelectedFeedIndex] = useState<number | null>(null)
  const { likedWineIds, unlike } = useLikedWines()

  const likedWines = useMemo<Wine[]>(
    () =>
      Array.from(likedWineIds)
        .map((id) => dummyWineData.find((wine) => wine.id === id))
        .filter((wine): wine is DummyWine => Boolean(wine))
        .map(toListWine),
    [likedWineIds],
  )

  const showPreviousFeed = () => {
    setSelectedFeedIndex((current) => current === null ? null : (current - 1 + feedImages.length) % feedImages.length)
  }

  const showNextFeed = () => {
    setSelectedFeedIndex((current) => current === null ? null : (current + 1) % feedImages.length)
  }

  return (
    <div className="min-h-screen w-full bg-white pb-10 text-[#121212]" data-node-id={activeTab === 'wine' ? '1546:4825' : activeTab === 'likes' ? '1546:5430' : '1546:5323'}>
      <header className="flex w-full items-center justify-between px-5 pt-4.5 pb-3 text-[#851317]" data-node-id="577:105">
        <Logo className="h-5 w-auto shrink-0 text-[#851317]" />

        <div className="flex shrink-0 items-center gap-1 overflow-hidden" data-node-id="577:107">
          <button
            type="button"
            aria-label="Search"
            onClick={() => navigate('/search')}
            className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          >
            <img src={lightSearchIcon} alt="" className="size-7 shrink-0" />
          </button>
          <button
            type="button"
            aria-label="설정"
            onClick={() => navigate('/mypage/settings')}
            className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          >
            <img src={settingsIcon} alt="" className="size-8 max-w-none shrink-0" aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="px-5 pt-7">
        <section>
          <h1 className="font-playfair text-[32px] leading-[1.3] font-normal tracking-[-0.64px] text-[#851317]">My Cellar</h1>
        </section>

        <section className={activeTab === 'feed' ? 'mt-[53px]' : 'mt-[51px]'}>
          <div className="flex items-start gap-[3px]">
            <div className="relative size-[111px] shrink-0" data-node-id="1546:5583">
              <img src={profileStoryRing} alt="" className="absolute inset-0 size-[111px] max-w-none" aria-hidden="true" />
              <div className="absolute top-1.5 left-[7px] h-[99px] w-[97px] overflow-hidden rounded-[50px]" data-node-id="1546:5566">
                <img
                  src={avatarImage}
                  alt="Sora Choi"
                  className="absolute top-[0.47%] left-[-6.93%] h-[146.46%] w-[119.59%] max-w-none"
                />
              </div>
            </div>

            <div className="mt-[21px] flex flex-1 flex-col gap-[11px]">
              <strong className="ml-[14px] text-base leading-[normal] font-bold tracking-[-0.32px] whitespace-nowrap text-[#121212]">Sora Choi</strong>
              <div className="flex items-center justify-between">
                <div className="flex w-[57px] flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">12</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">피드</span>
                </div>
                <div className="flex w-[58px] flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">128</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">팔로워</span>
                </div>
                <div className="flex w-[57px] flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">96</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">팔로잉</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[21px] flex flex-col">
            <p className="text-[12px] leading-[normal] font-normal tracking-[-0.24px] whitespace-pre text-[#a8a8a8]">{`#레드와인  #소비뇽  #과일안주러버`}</p>
            <p className="mt-[4px] text-sm leading-[normal] font-normal tracking-[-0.28px] text-[#717171]">“Good wine, Good mood”</p>
          </div>

          <div className="mt-[19px] grid grid-cols-2 gap-[4px]">
            <button type="button" onClick={() => navigate('/profile/settings')} className="h-[34px] rounded-lg bg-[#f9f7f6] text-[13px] leading-[normal] font-normal tracking-[-0.26px] text-black">프로필 편집</button>
            <button type="button" className="h-[34px] rounded-lg bg-[#f9f7f6] text-[13px] leading-[normal] font-normal tracking-[-0.26px] text-black">프로필 공유</button>
          </div>

          <div className="mt-[25px] flex gap-[15px]">
            <div className="flex w-[78px] flex-col items-center gap-[7px]">
              <img src={badgesCircleImage} alt="" className="size-[78px] rounded-full object-cover" aria-hidden="true" />
              <span className="text-sm leading-[normal] font-normal tracking-[-0.28px] text-black">Badges</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/challenge/continents')}
              aria-label="챌린지 보기"
              className="flex w-[86px] flex-col items-center gap-[4px]"
            >
              <div className="relative -top-1 h-[85px] w-[86px] shrink-0" data-node-id="1546:5406">
                <img src={challengeRingImage} alt="" className="absolute inset-0 h-[85px] w-[86px] max-w-none" aria-hidden="true" />
                <div className="absolute top-1 left-1 h-[77px] w-[78px] overflow-hidden rounded-[50px]" data-node-id="1546:5407">
                  <img
                    src={challengeCircleImage}
                    alt=""
                    className="absolute top-[0.08%] left-[-16.67%] h-[168.83%] w-[134.62%] max-w-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <span className="text-sm leading-[normal] font-normal tracking-[-0.28px] text-black">Challenges</span>
            </button>
            <div className="flex w-[78px] flex-col items-center gap-[7px]">
              <img src={highlightsCircleImage} alt="" className="size-[78px] rounded-full object-cover" aria-hidden="true" />
              <span className="text-sm leading-[normal] font-normal tracking-[-0.28px] text-black">Highlights</span>
            </div>
          </div>
        </section>

        <section className="mt-[49px]">
          <div className="grid h-[30px] grid-cols-3 border-b border-black/15">
            <button
              type="button"
              onClick={() => setActiveTab('feed')}
              aria-selected={activeTab === 'feed'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'feed' ? 'font-bold text-[#851317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              내가 쓴 피드
              {activeTab === 'feed' && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#851317]" />}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wine')}
              aria-selected={activeTab === 'wine'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'wine' ? 'font-bold text-[#831317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              와인 기록
              {activeTab === 'wine' && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#851317]" />}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('likes')}
              aria-selected={activeTab === 'likes'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'likes' ? 'font-bold text-[#851317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              좋아요
              {activeTab === 'likes' && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#851317]" />}
            </button>
          </div>

          {activeTab === 'feed' ? (
            <div className="mt-5 grid w-full grid-cols-3 gap-px">
              {feedItems.map((item, index) => (
                <button
                  key={`${item.image}-${index}`}
                  type="button"
                  aria-label={`내 피드 ${index + 1} 확대 보기`}
                  onClick={() => setSelectedFeedIndex(index)}
                  className="relative h-[154.333px] overflow-hidden"
                >
                  <img src={item.image} alt={`내 피드 ${index + 1}`} className={item.crop} />
                  {item.multiple && (
                    <span className="absolute top-[9px] right-[7px] size-[17px]" aria-hidden="true">
                      <span className="absolute top-0 left-0 size-[13px] rounded-[3px] bg-white" />
                      <img src={multipleFeedIcon} alt="" className="absolute top-[5px] left-[4.5px] h-[10px] w-[10.5px] max-w-none" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : activeTab === 'wine' ? (
            <div className="mt-5 flex flex-col gap-3.5">
              {wineReviews.map((review) => <WineReviewCard key={review.name} review={review} />)}
              <button type="button" onClick={() => navigate('/record')} className="flex h-[50px] w-full items-center justify-center rounded-xl bg-[#831317] text-base leading-none font-bold text-white">
                기록쓰기
              </button>
            </div>
          ) : (
            <div className="mt-[23px]">
              <p className="h-5 text-[11px] leading-5 font-normal text-[#534343]">전체 {likedWines.length}종</p>
              <div className="mt-5">
                {likedWines.map((wine) => (
                  <div key={wine.id}>
                    <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
                    <LikedWineCard
                      wine={wine}
                      onSelect={() => navigate(`/wine_detail/${wine.type}/${wine.id}`)}
                      onUnlike={() => unlike(wine.id)}
                    />
                  </div>
                ))}
                <hr className="m-0 h-0 border-0 border-t border-[#c3c3c3]" />
              </div>
            </div>
          )}
        </section>
      </main>

      {selectedFeedIndex !== null && (
        <FeedLightbox
          selectedIndex={selectedFeedIndex}
          onClose={() => setSelectedFeedIndex(null)}
          onPrevious={showPreviousFeed}
          onNext={showNextFeed}
        />
      )}
    </div>
  )
}

export default Mypage
