import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatarImage from '../assets/mypage/figma-profile-photo.png'
import profileStoryRing from '../assets/mypage/profile-story-ring.svg'
import challengeCircleImage from '../assets/mypage/mypage-challenge-circle.png'
import challengeRingImage from '../assets/mypage/challenge-ring.png'
import badgesCircleImage from '../assets/mypage/badges-circle.png'
import highlightsCircleImage from '../assets/mypage/highlights-circle.png'
import wineSippersLogo from '../assets/mypage/wine-sippers-logo.png'
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
import settingsIcon from '../assets/mypage/settings.svg'
import wineImage1 from '../assets/mypage/figma-wine-review-01.png'
import wineImage2 from '../assets/mypage/figma-wine-review-02.png'
import wineImage3 from '../assets/mypage/figma-wine-review-03.png'
import likedWineImage1 from '../assets/mypage/figma-liked-wine-01.png'
import likedWineImage2 from '../assets/mypage/figma-liked-wine-02.png'
import likedWineImage3 from '../assets/mypage/figma-liked-wine-03.png'
import likedWineImage4 from '../assets/mypage/figma-liked-wine-04.png'
import likedHeartIcon from '../assets/mypage/liked-heart.svg'
import ratingStarIcon from '../assets/mypage/rating-star.svg'

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
    review: '묵직하고 가죽 향과 베리 향의 조화가 완벽합니다.',
    image: wineImage1,
    crop: 'absolute top-[-9.47%] left-[-9.01%] h-[116.41%] w-[116.46%] max-w-none',
  },
  {
    name: '클라우디 베이 소비뇽 블랑',
    date: '2026.06.25',
    rating: '4.0',
    review: '시트러스한 산미와 열대 과실의 여운이 매력적이에요.',
    image: wineImage2,
    crop: 'absolute top-[-21.09%] left-[-14.79%] h-[136.83%] w-[129.44%] max-w-none',
  },
  {
    name: '투 핸즈 엔젤스 쉐어 쉬라즈',
    date: '2026.06.10',
    rating: '4.5',
    review: '진한 자두와 블랙베리 풍미, 부드러운 탄닌이 좋아요.',
    image: wineImage3,
    crop: 'absolute top-[-29.28%] left-[-20.38%] h-[149.77%] w-[141.59%] max-w-none',
  },
] as const

const likedWines = [
  {
    name: '돔 페리뇽 2012',
    detail: '프랑스 · 샹파뉴 · 피노누아',
    price: '₩40,500',
    rating: '4.8',
    image: likedWineImage1,
  },
  {
    name: '샤또 몬텔레나',
    detail: '미국 · 나파 밸리 · 카베르네 소비뇽',
    price: '₩89,000',
    rating: '5.0',
    image: likedWineImage2,
  },
  {
    name: '오퍼스 원 2018',
    detail: '미국 · 나파밸리 · 카베르네 소비뇽',
    price: '₩159,000',
    rating: '4.9',
    image: likedWineImage3,
  },
  {
    name: '오이스터 베이',
    detail: '뉴질랜드 · 말보로 · 소비뇽 블랑',
    price: '₩36,500',
    rating: '3.0',
    image: likedWineImage4,
  },
] as const

function WineReviewCard({ review }: { review: (typeof wineReviews)[number] }) {
  return (
    <article className="flex h-[166px] w-full items-start gap-[18px] rounded-[14px] border border-[#e3dede] bg-white px-4 py-[18px]">
      <div className="relative h-[130px] w-[94px] shrink-0 overflow-hidden rounded-lg">
        <img src={review.image} alt={review.name} className={review.crop} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="text-[15px] leading-[normal] font-bold tracking-[-0.3px] whitespace-nowrap">{review.name}</h2>
          <time className="shrink-0 text-[10px] leading-[normal] font-normal tracking-[-0.2px] text-[#9e9e9e]">{review.date}</time>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[13px] leading-[normal] font-bold tracking-[-0.26px] text-[#831317]">★ {review.rating}</p>
          <p className="text-xs leading-[normal] font-normal tracking-[-0.24px] whitespace-nowrap text-[#6e6e6e]">{review.review}</p>
        </div>
      </div>
    </article>
  )
}

function LikedWineCard({ wine }: { wine: (typeof likedWines)[number] }) {
  return (
    <article className="relative h-[150px] w-full">
      <img src={wine.image} alt={wine.name} className="absolute top-0 left-6 size-[89.26px] max-w-none" />
      <div className="absolute top-1 left-[150px] flex w-[220px] flex-col gap-2">
        <div className="flex w-full items-start justify-between">
          <div className="flex min-w-0 flex-col">
            <h2 className="text-xl leading-[25px] font-semibold whitespace-nowrap text-[#1e1b18]">{wine.name}</h2>
            <p className="text-xs leading-[25px] font-normal whitespace-nowrap text-[#817f7e]">{wine.detail}</p>
          </div>
          <button type="button" aria-label={`${wine.name} 좋아요 취소`} className="flex h-[17.726px] w-[19.008px] shrink-0 items-center justify-center">
            <img src={likedHeartIcon} alt="" className="size-full" aria-hidden="true" />
          </button>
        </div>
        <div className="flex w-full items-center justify-between">
          <strong className="text-base leading-6 font-bold whitespace-nowrap text-[#1e1b18]">{wine.price}</strong>
          <span className="flex items-center gap-1 text-base leading-6 font-bold whitespace-nowrap text-[#831317]">
            <img src={ratingStarIcon} alt="" className="h-[14.25px] w-[15px]" aria-hidden="true" />
            {wine.rating}
          </span>
        </div>
      </div>
      <div className="absolute top-[119.26px] right-0 left-0 h-px bg-[#e5e5e5]" aria-hidden="true" />
    </article>
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

  const showPreviousFeed = () => {
    setSelectedFeedIndex((current) => current === null ? null : (current - 1 + feedImages.length) % feedImages.length)
  }

  const showNextFeed = () => {
    setSelectedFeedIndex((current) => current === null ? null : (current + 1) % feedImages.length)
  }

  return (
    <div className="min-h-screen w-full bg-white pb-10 text-[#121212]" data-node-id={activeTab === 'wine' ? '1546:4825' : activeTab === 'likes' ? '1546:5430' : '1546:5323'}>
      <header className="flex h-[54px] items-start justify-between px-5 pt-[18px] text-[#851317]">
        <img src={wineSippersLogo} alt="Wine Sippers" className="mt-0.5 h-5 w-[106.508px] object-contain object-left" />
        <button type="button" aria-label="설정" onClick={() => navigate('/mypage/settings')} className="flex size-6 items-center justify-center">
          <img src={settingsIcon} alt="" className="size-6" aria-hidden="true" />
        </button>
      </header>

      <main className="px-5 pt-7">
        <section>
          <h1 className={`font-playfair-display leading-[normal] font-normal text-[#851317] ${activeTab === 'feed' ? 'text-[30px]' : 'text-[32px]'}`}>My Cellar</h1>
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
            <div className="flex w-[86px] flex-col items-center gap-[4px]">
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
            </div>
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
              <button type="button" className="flex h-[50px] w-full items-center justify-center rounded-xl bg-[#831317] text-base leading-none font-bold text-white">
                기록쓰기
              </button>
            </div>
          ) : (
            <div className="mt-[23px]">
              <p className="h-5 text-[11px] leading-5 font-normal text-[#534343]">전체 24종</p>
              <div className="mt-5">
                {likedWines.map((wine) => <LikedWineCard key={wine.name} wine={wine} />)}
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
