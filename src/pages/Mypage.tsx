import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import avatarImage from '../assets/mypage/mypage-avatar.png'
import challengeCircleImage from '../assets/mypage/mypage-challenge-circle.png'
import feedThumb1 from '../assets/mypage/feed-thumb-1.png'
import feedThumb2 from '../assets/mypage/feed-thumb-2.png'
import feedThumb3 from '../assets/mypage/feed-thumb-3.png'
import feedThumb4 from '../assets/mypage/feed-thumb-4.png'
import feedThumb5 from '../assets/mypage/feed-thumb-5.png'
import feedThumb6 from '../assets/mypage/feed-thumb-6.png'
import feedThumb7 from '../assets/mypage/feed-thumb-7.png'
import feedThumb8 from '../assets/mypage/feed-thumb-8.png'
import feedThumb9 from '../assets/mypage/feed-thumb-9.png'
import feedThumb10 from '../assets/mypage/feed-thumb-10.png'
import feedThumb11 from '../assets/mypage/feed-thumb-11.png'
import feedThumb12 from '../assets/mypage/feed-thumb-12.png'
import settingsIcon from '../assets/mypage/settings.svg'
import badgeIcon from '../assets/mypage/badge.svg'
import wineImage1 from '../assets/mypage/wine-1.png'
import wineImage2 from '../assets/mypage/wine-2.png'
import wineImage3 from '../assets/mypage/wine-3.png'
import wineImage4Base from '../assets/mypage/wine-4-base.png'
import wineImage4 from '../assets/mypage/wine-4.png'
import likedWineImage1 from '../assets/mypage/liked-wine-1.png'
import likedWineImage2 from '../assets/mypage/liked-wine-2.png'
import likedWineImage3 from '../assets/mypage/liked-wine-3.png'
import likedWineImage4 from '../assets/mypage/liked-wine-4.png'

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

const wineReviews = [
  {
    name: '샤토 라퐁 로셰 2015',
    date: '2026.07.01',
    rating: '5.0',
    review: '묵직하고 가죽 향과 베리 향의 조화가 완벽합니다.',
    image: wineImage1,
  },
  {
    name: '클라우디 베이 소비뇽 블랑',
    date: '2026.06.25',
    rating: '4.0',
    review: '시트러스한 산미와 열대 과실의 여운이 매력적이에요.',
    image: wineImage2,
  },
  {
    name: '투 핸즈 엔젤스 쉐어 쉬라즈',
    date: '2026.06.10',
    rating: '4.5',
    review: '진한 자두와 블랙베리 풍미, 부드러운 탄닌이 좋아요.',
    image: wineImage3,
  },
] as const

const likedWines = [
  {
    name: '돔 페리뇽 2012',
    detail: '프랑스 · 스파클링 와인',
    rating: '4.8',
    reviewCount: '2,401',
    image: likedWineImage1,
  },
  {
    name: '몬테스 알파 카베르네 소비뇽',
    detail: '칠레 · 레드 와인',
    rating: '4.1',
    reviewCount: '15,230',
    image: likedWineImage2,
  },
  {
    name: '오퍼스 원 2018',
    detail: '미국 · 레드 와인',
    rating: '4.9',
    reviewCount: '1,102',
    image: likedWineImage3,
  },
  {
    name: '클라우디 베이 소비뇽 블랑',
    detail: '뉴질랜드 · 화이트 와인',
    rating: '4.5',
    reviewCount: '3,852',
    image: likedWineImage4,
    wideCrop: true,
  },
] as const

function WineReviewCard({ review }: { review: (typeof wineReviews)[number] }) {
  return (
    <article className="flex h-[166px] w-full items-start gap-[18px] rounded-[14px] border border-[#e3dede] bg-white px-4 py-[18px]">
      <img src={review.image} alt={review.name} className="h-[130px] w-[94px] shrink-0 rounded-lg object-cover" />
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

function EmptyWineReviewCard() {
  return (
    <article className="flex h-[166px] w-full items-start gap-[18px] rounded-[14px] border border-[#e3dede] bg-white px-4 py-[18px]">
      <div className="relative h-[130px] w-[94px] shrink-0 overflow-hidden rounded-lg">
        <img src={wineImage4Base} alt="" className="absolute inset-0 size-full object-cover" aria-hidden="true" />
        <img src={wineImage4} alt="보르도 블렌드 2018" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="text-[15px] leading-[normal] font-bold tracking-[-0.3px] whitespace-nowrap">보르도 블렌드 2018</h2>
          <time className="shrink-0 text-[10px] leading-[normal] font-normal tracking-[-0.2px] text-[#9e9e9e]">2026.05.20</time>
        </div>
        <p className="mt-5 text-xs leading-[normal] font-normal tracking-[-0.24px] text-[#9e9e9e]">아직 작성된 리뷰가 없습니다.</p>
        <button type="button" className="mt-[24px] h-[38px] w-full rounded-[9px] bg-[#851317] text-xs leading-[normal] font-bold tracking-[-0.24px] text-white">
          리뷰 쓰기
        </button>
      </div>
    </article>
  )
}

function LikedWineCard({ wine }: { wine: (typeof likedWines)[number] }) {
  const wideCrop = 'wideCrop' in wine && wine.wideCrop

  return (
    <article className="flex h-[126px] w-full items-start gap-[18px] rounded-[14px] border border-[#e3dede] bg-white px-4 py-[18px]">
      <div className="relative h-[90px] w-[88px] shrink-0 overflow-hidden rounded-lg">
        <img
          src={wine.image}
          alt={wine.name}
          className={wideCrop ? 'absolute top-0 left-[-37.17%] h-full w-[153.41%] max-w-none object-cover' : 'size-full object-cover'}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-start justify-between">
        <div className="flex min-w-0 flex-col gap-2.5">
          <h2 className="text-[15px] leading-[normal] font-bold tracking-[-0.3px] whitespace-nowrap">{wine.name}</h2>
          <div className="flex flex-col gap-[13px]">
            <p className="text-xs leading-[normal] font-normal tracking-[-0.24px] whitespace-nowrap text-[#6e6e6e]">{wine.detail}</p>
            <p className="text-xs leading-[normal] font-bold tracking-[-0.24px] whitespace-nowrap text-[#851317]">★ {wine.rating}&nbsp; ({wine.reviewCount})</p>
          </div>
        </div>
        <button type="button" aria-label={`${wine.name} 좋아요 취소`} className="mt-[30px] flex w-[22px] shrink-0 items-center justify-center font-noto text-[22px] leading-[normal] font-bold text-[#851317]">
          ♥
        </button>
      </div>
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
    <div className="min-h-screen w-full bg-white pb-10 text-[#121212]" data-node-id={activeTab === 'wine' ? '726:315' : activeTab === 'likes' ? '741:446' : '1036:1742'}>
      <header className="flex h-[54px] items-start justify-between px-5 pt-4 text-[#851317]">
        <p className="font-playfair-display text-xl leading-[normal] font-normal">Wine Sippers</p>
        <button type="button" aria-label="설정" onClick={() => navigate('/mypage/settings')} className="flex size-6 items-center justify-center">
          <img src={settingsIcon} alt="" className="size-6" aria-hidden="true" />
        </button>
      </header>

      <main className="px-5 pt-7">
        <section>
          <h1 className="font-playfair-display text-[30px] leading-[normal] font-bold text-[#851317]">My Cellar</h1>
        </section>

        <section className="mt-[34px]">
          <div className="flex items-start gap-[22px]">
            <div className="relative size-[111px] shrink-0">
              <div className="absolute inset-0 rounded-full border-[3.33px] border-[#841317]" aria-hidden="true" />
              <img src={avatarImage} alt="Sora Choi" className="absolute inset-[6px] size-[99px] rounded-full object-cover" />
            </div>

            <div className="mt-[21px] flex flex-col gap-[11px]">
              <strong className="text-base leading-[normal] font-bold tracking-[-0.32px] whitespace-nowrap text-[#121212]">Sora Choi</strong>
              <div className="flex items-center gap-[26px]">
                <div className="flex flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">128</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">팔로워</span>
                </div>
                <div className="flex flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">12</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">포스트</span>
                </div>
                <div className="flex flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">96</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">팔로잉</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[21px] flex flex-col gap-1">
            <p className="text-[12px] leading-[normal] font-normal tracking-[-0.24px] whitespace-pre text-[#a8a8a8]">{`#레드와인  #소비뇽  #과일안주러버`}</p>
            <p className="mt-[5px] text-sm leading-[normal] font-normal tracking-[-0.28px] text-[#717171]">양재역 바이너들 dm</p>
          </div>

          <div className="mt-[25px] flex gap-[19px]">
            <div className="flex w-[78px] flex-col items-center gap-[3px]">
              <div className="flex size-[78px] flex-col items-center justify-center gap-1 rounded-full bg-[#f9f7f6]">
                <img src={badgeIcon} alt="" className="size-6" aria-hidden="true" />
                <span className="text-[12px] leading-[normal] font-normal tracking-[-0.24px] text-[#851317]">12개</span>
              </div>
              <span className="text-sm leading-[normal] font-normal tracking-[-0.28px] text-black">Badges</span>
            </div>

            <div className="flex w-[78px] flex-col items-center gap-[3px]">
              <div className="relative size-[78px] shrink-0 overflow-hidden rounded-full">
                <img src={challengeCircleImage} alt="" className="absolute inset-0 size-full object-cover" aria-hidden="true" />
                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <span className="absolute inset-0 flex items-center justify-center text-[12px] leading-[normal] font-medium tracking-[-0.24px] text-white">참여중</span>
              </div>
              <span className="text-sm leading-[normal] font-normal tracking-[-0.28px] text-black">Challenges</span>
            </div>

            <div className="flex w-[78px] flex-col items-center gap-[3px]">
              <div className="size-[78px] shrink-0 rounded-full bg-[#d9d9d9]" aria-hidden="true" />
              <span className="text-sm leading-[normal] font-normal tracking-[-0.28px] text-black">My snaps</span>
            </div>
          </div>
        </section>

        <section className="mt-[42px]">
          <div className="grid h-[30px] grid-cols-3 border-b border-black/15">
            <button
              type="button"
              onClick={() => setActiveTab('feed')}
              aria-selected={activeTab === 'feed'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'feed' ? 'font-bold text-[#851317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              내가 쓴 피드&nbsp; 12
              {activeTab === 'feed' && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#851317]" />}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wine')}
              aria-selected={activeTab === 'wine'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'wine' ? 'font-bold text-[#831317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              마신 와인&nbsp; 156
              {activeTab === 'wine' && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#851317]" />}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('likes')}
              aria-selected={activeTab === 'likes'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'likes' ? 'font-bold text-[#851317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              좋아요&nbsp; 89
              {activeTab === 'likes' && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[#851317]" />}
            </button>
          </div>

          {activeTab === 'feed' ? (
            <div className="mt-5 grid w-full grid-cols-3 gap-px">
              {feedImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  aria-label={`내 피드 ${index + 1} 확대 보기`}
                  onClick={() => setSelectedFeedIndex(index)}
                  className="aspect-[129.333/154.333] overflow-hidden"
                >
                  <img src={image} alt={`내 피드 ${index + 1}`} className="size-full object-cover" />
                </button>
              ))}
            </div>
          ) : activeTab === 'wine' ? (
            <div className="mt-5 flex flex-col gap-3.5">
              {wineReviews.map((review) => <WineReviewCard key={review.name} review={review} />)}
              <EmptyWineReviewCard />
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-3.5">
              {likedWines.map((wine) => <LikedWineCard key={wine.name} wine={wine} />)}
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
