import { useState } from 'react'
import feedImage1 from '../assets/mypage/feed-1.png'
import feedImage2 from '../assets/mypage/feed-2.png'
import feedImage3 from '../assets/mypage/feed-3.png'
import feedImage4 from '../assets/mypage/feed-4.png'
import feedImage5 from '../assets/mypage/feed-5.png'
import feedImage6 from '../assets/mypage/feed-6.png'
import feedImage7 from '../assets/mypage/feed-7.png'
import settingsIcon from '../assets/mypage/settings.svg'
import summaryArrowIcon from '../assets/mypage/summary-arrow.svg'
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
  feedImage1,
  feedImage2,
  feedImage3,
  feedImage4,
  feedImage5,
  feedImage6,
  feedImage7,
  feedImage1,
  feedImage2,
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

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <path d="M8.5 6.5 9.6 5h4.8l1.1 1.5H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12.5" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <path d="M8 4h8v4.3a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 6H5v1.5A3.5 3.5 0 0 0 8.5 11M16 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 12.3V17m-3 3h6m-5-3h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MedalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <path d="m8 3 2.1 6h3.8L16 3M9.3 3h5.4v6H9.3V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10.2 17.5-.7 3 2.5-1.4 2.5 1.4-.7-3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SummaryCard({ type }: { type: 'challenge' | 'badge' }) {
  const challenge = type === 'challenge'

  return (
    <button
      type="button"
      className="flex h-28 w-[calc(50%-6px)] flex-col items-start justify-between rounded-[14px] bg-[#f9f7f6] p-4 text-left text-[#851317]"
    >
      {challenge ? <TrophyIcon /> : <MedalIcon />}
      <span className="flex w-full items-end justify-between">
        <span className="flex flex-col gap-[5px]">
          <span className="text-[13px] leading-4 font-medium tracking-[-0.26px] text-[#121212]">
            {challenge ? '진행 중인 챌린지' : '획득한 배지'}
          </span>
          <span className="text-xs leading-[normal] font-bold tracking-[-0.24px]">
            {challenge ? '참여 중 1개' : '총 12개'}
          </span>
        </span>
        <img src={summaryArrowIcon} alt="" className="size-4" aria-hidden="true" />
      </span>
    </button>
  )
}

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

function Mypage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'wine' | 'likes'>('feed')

  return (
    <div className="min-h-screen w-full bg-white pb-10 text-[#121212]" data-node-id={activeTab === 'wine' ? '726:315' : activeTab === 'likes' ? '741:446' : '711:285'}>
      <header className="flex h-[54px] items-start justify-between px-5 pt-4 text-[#851317]">
        <p className="font-playfair-display text-xl leading-[normal] font-normal">Wine Sippers</p>
        <button type="button" aria-label="설정" className="flex size-6 items-center justify-center">
          <img src={settingsIcon} alt="" className="size-6" aria-hidden="true" />
        </button>
      </header>

      <main className="px-5 pt-7">
        <section>
          <h1 className="font-playfair-display text-[30px] leading-[normal] font-bold text-[#851317]">My Cellar</h1>
          <p className="mt-[5px] text-sm leading-[normal] font-normal tracking-[-0.28px]">
            나의 와인 취향과 기록을 한곳에서 만나보세요.
          </p>
        </section>

        <section className="mt-[53px]">
          <div className="flex items-center gap-[18px]">
            <button
              type="button"
              aria-label="프로필 사진 변경"
              className="flex size-[76px] shrink-0 items-center justify-center rounded-full bg-[#f9f7f6] text-[#851317]"
            >
              <CameraIcon />
            </button>

            <div className="flex w-[182px] flex-col gap-2.5">
              <div className="flex items-center gap-[21px]">
                <strong className="text-base leading-[normal] font-bold tracking-[-0.32px] whitespace-nowrap">와인러버_김민우</strong>
                <span className="flex h-[26px] w-[59px] shrink-0 items-center justify-center rounded-[13px] bg-[#f9f7f6] text-[11px] leading-[normal] font-bold tracking-[-0.22px] text-[#851317]">
                  Lv. 3
                </span>
              </div>
              <div className="flex w-[99px] justify-between">
                <div className="flex w-[29px] flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">128</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">팔로워</span>
                </div>
                <div className="flex w-[29px] flex-col items-center gap-[5px]">
                  <strong className="text-base leading-[normal] font-semibold tracking-[-0.32px] text-[#851317]">96</strong>
                  <span className="text-[11px] leading-[normal] font-normal tracking-[-0.22px] text-[#6e6e6e]">팔로잉</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-[13px]">
            <p className="text-sm leading-[normal] font-medium tracking-[-0.28px] text-[#61050b]">
              “인생의 쓴맛보다 와인의 쓴맛을 아는 사람”
            </p>
            <div className="flex items-center gap-2">
              {['#레드와인', '#바디감무겁게', '#강남비헌터'].map((tag) => (
                <span
                  key={tag}
                  className="flex h-[30px] items-center justify-center rounded-full bg-[rgba(131,19,23,0.9)] px-3.5 text-[13px] leading-[normal] font-medium tracking-[-0.26px] whitespace-nowrap text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-[50px] flex justify-between gap-3">
            <SummaryCard type="challenge" />
            <SummaryCard type="badge" />
          </div>
        </section>

        <section className="mt-16">
          <div className="grid h-[30px] grid-cols-3 border-b border-black/15">
            <button
              type="button"
              onClick={() => setActiveTab('feed')}
              aria-selected={activeTab === 'feed'}
              className={`relative text-sm leading-[normal] tracking-[-0.28px] ${activeTab === 'feed' ? 'font-bold text-[#851317]' : 'font-normal text-[#6e6e6e]'}`}
            >
              내가 쓴 피드&nbsp; 42
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
            <>
              <div className="mt-5 grid aspect-square w-full grid-cols-3 grid-rows-3 gap-1.5">
                {feedImages.map((image, index) => (
                  <button key={`${image}-${index}`} type="button" className="overflow-hidden rounded-sm">
                    <img src={image} alt={`내 피드 ${index + 1}`} className="size-full object-cover" />
                  </button>
                ))}
              </div>

              <article className="mt-[38px] h-28 rounded-[14px] bg-[#f9f7f7] px-4 pt-4 pb-[17px]">
                <p className="text-[11px] leading-[normal] font-bold tracking-[-0.22px] text-[#851317]">이번 달의 기록</p>
                <p className="mt-[5px] text-sm leading-[normal] font-medium tracking-[-0.28px]">7개의 피드와 12개의 테이스팅 노트를 남겼어요.</p>
                <button type="button" className="mt-[21px] ml-auto flex items-center gap-[5px] text-sm leading-[normal] font-bold tracking-[-0.28px] text-[#851317]">
                  나의 와인 여정 보기
                  <ArrowIcon />
                </button>
              </article>
            </>
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
    </div>
  )
}

export default Mypage
