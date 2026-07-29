import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import backIcon from '../assets/images/icon-chevron-forward.svg'
import avatarImage from '../assets/mypage/figma-profile-photo.webp'
import feedThumb1 from '../assets/mypage/figma-feed-01.webp'
import feedThumb2 from '../assets/mypage/figma-feed-02.webp'
import feedThumb3 from '../assets/mypage/figma-feed-03.webp'
import feedThumb4 from '../assets/mypage/figma-feed-04.webp'
import feedThumb5 from '../assets/mypage/figma-feed-05.webp'
import feedThumb6 from '../assets/mypage/figma-feed-06.webp'
import feedThumb7 from '../assets/mypage/figma-feed-07.webp'
import feedThumb8 from '../assets/mypage/figma-feed-08.webp'
import feedThumb9 from '../assets/mypage/figma-feed-09.webp'
import feedThumb10 from '../assets/mypage/figma-feed-10.webp'
import feedThumb11 from '../assets/mypage/figma-feed-11.webp'
import feedThumb12 from '../assets/mypage/figma-feed-12.webp'
import { FeedPost, ImageLightbox, type FigmaFeed, type ImagePreview } from './LoungeFeed'
import { getUserFeeds } from '../data/userFeeds'

// 마이페이지 그리드 썸네일과 정확히 같은 크롭으로 보이도록, 그리드 셀 비율(129.3:154.3)과
// 크롭 클래스를 그대로 재사용한다 — 비율이 다르면 같은 퍼센트 크롭이라도 다른 부분이 보인다.
const IMAGE_BOX_CLASS_NAME = 'aspect-[390/465] h-auto'

const feedThumbItems = [
  { image: feedThumb1, crop: 'absolute top-[-21.13%] left-[-7.75%] h-[204.57%] w-[115.11%] max-w-none' },
  { image: feedThumb2, crop: 'absolute inset-0 size-full object-cover' },
  { image: feedThumb3, crop: 'absolute top-[-2.01%] left-0 h-[111.98%] w-[100.26%] max-w-none' },
  { image: feedThumb4, crop: 'absolute top-[-3.63%] left-[-12.22%] h-[125.47%] w-[112.1%] max-w-none' },
  { image: feedThumb5, crop: 'absolute top-[0.22%] left-[-0.26%] h-[144.28%] w-[100.26%] max-w-none' },
  { image: feedThumb6, crop: 'absolute top-0 left-[-0.34%] h-[111.69%] w-[100.16%] max-w-none' },
  { image: feedThumb7, crop: 'absolute top-[-3.62%] left-[-1.91%] h-[117.42%] w-[105.26%] max-w-none' },
  { image: feedThumb8, crop: 'absolute top-[0.17%] left-[-12.03%] h-[125.08%] w-[112.13%] max-w-none' },
  { image: feedThumb9, crop: 'absolute inset-0 size-full object-fill' },
  { image: feedThumb10, crop: 'absolute top-[-0.09%] left-[-0.52%] h-[121.6%] w-full max-w-none' },
  { image: feedThumb11, crop: 'absolute top-[-0.22%] left-[-0.26%] h-[104.98%] w-[100.26%] max-w-none' },
  { image: feedThumb12, crop: 'absolute top-[-8.05%] left-[-0.26%] h-[111.98%] w-[100.26%] max-w-none' },
] as const

const demoFeeds: Array<{ feed: FigmaFeed; crop: string }> = feedThumbItems.map(({ image, crop }) => ({
  feed: {
    author: 'Sora Choi',
    time: '2시간 전',
    avatar: avatarImage,
    images: [image],
    imagePosition: 'center',
    content:
      '어제는 와인 한 잔과 함께 향과 이야기를 천천히 음미했던 시간. 잔에 담긴 작은 취향을 발견하며, 와인을 조금 더 깊이 알아갈 수 있었어요.',
    tags: ['마스 풀라키에, 로랑주 아 라 메르 2021', '프랑스_파리', '페어링_굴'],
  },
  crop,
}))

function MyFeed() {
  const navigate = useNavigate()
  const location = useLocation()
  const targetIndex = (location.state as { index?: number } | null)?.index ?? 0
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null)
  const [myFeeds] = useState(() => [
    ...getUserFeeds().map((feed) => ({ feed, crop: 'absolute inset-0 size-full object-cover' })),
    ...demoFeeds,
  ])
  const postRefs = useRef<Array<HTMLDivElement | null>>([])

  useLayoutEffect(() => {
    postRefs.current[targetIndex]?.scrollIntoView({ block: 'start' })
  }, [targetIndex])

  return (
    <div className="min-h-screen w-screen bg-white text-[#0d0d0d]">
      <header className="relative z-10 h-[calc(70px+env(safe-area-inset-top))] w-full shrink-0 bg-white">
        <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] flex h-[70px] items-center justify-center">
          <button
            type="button"
            aria-label="뒤로 가기"
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
          >
            <img src={backIcon} alt="" aria-hidden="true" className="size-6 rotate-180" />
          </button>
          <h1 className="text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">내가 쓴 피드</h1>
        </div>
      </header>

      <div className="px-5 pb-8">
        {myFeeds.map(({ feed, crop }, index) => (
          <div key={index} ref={(element) => { postRefs.current[index] = element }}>
            <FeedPost
              feed={feed}
              index={index}
              onOpenImage={setImagePreview}
              imageBoxClassName={feed.preserveImageAspectRatio || feed.id?.startsWith('user-feed-') ? undefined : IMAGE_BOX_CLASS_NAME}
              imageClassName={crop}
            />
          </div>
        ))}
      </div>

      {imagePreview ? (
        <ImageLightbox
          preview={imagePreview}
          onClose={() => setImagePreview(null)}
          onIndexChange={(index) => setImagePreview((current) => (current ? { ...current, index } : current))}
        />
      ) : null}
    </div>
  )
}

export default MyFeed
