import { useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent, type UIEvent } from 'react'
import feedActions from '../assets/lounge/figma/feed-actions.svg'
import heartOutline from '../../icon/Heart.svg'
import heartFilled from '../../icon/Activated_Heart.svg'
import feedAvatar1 from '../assets/lounge/figma/feed-avatar-1.png'
import feedAvatar2 from '../assets/lounge/figma/feed-avatar-2.png'
import feedAvatar3 from '../assets/lounge/figma/feed-avatar-3.png'
import feedAvatar4 from '../assets/lounge/figma/feed-avatar-4.png'
import feedGrid1 from '../assets/lounge/figma/feed-grid-1.png'
import feedGrid2 from '../assets/lounge/figma/feed-grid-2.png'
import feedGrid3 from '../assets/lounge/figma/feed-grid-3.png'
import feedGrid4 from '../assets/lounge/figma/feed-grid-4.png'
import feedGrid5 from '../assets/lounge/figma/feed-grid-5.png'
import feedGrid6 from '../assets/lounge/figma/feed-grid-6.png'
import feedGrid7 from '../assets/lounge/figma/feed-grid-7.png'
import feedGrid8 from '../assets/lounge/figma/feed-grid-8.png'
import feedList1 from '../assets/lounge/figma/feed-list-1.png'
import feedList2 from '../assets/lounge/figma/feed-list-2.png'
import feedList3 from '../assets/lounge/figma/feed-list-3.png'
import feedList4 from '../assets/lounge/figma/feed-list-4.png'
import wineConnector from '../assets/lounge/figma/wine-connector.svg'
import winePinInner from '../assets/lounge/figma/wine-pin-inner.svg'
import winePinOuter from '../assets/lounge/figma/wine-pin-outer.svg'
import feedViewToggleIcon from '../assets/lounge/feed-view-toggle.svg'
import LoungeTabs from '../components/LoungeTabs'
import LoungeHeader from '../components/LoungeHeader'
import AppBottomSheet from '../components/AppBottomSheet'
import carouselPhoto01 from '../assets/images/feeds/feed_021_1.jpg'
import carouselPhoto02 from '../assets/images/feeds/feed_021_2.jpg'
import carouselPhoto03 from '../assets/images/feeds/feed_021_3.jpg'
import carouselPhoto04 from '../assets/images/feeds/feed_022_1.jpg'
import carouselPhoto05 from '../assets/images/feeds/feed_022_2.jpg'
import carouselPhoto06 from '../assets/images/feeds/feed_022_3.jpg'
import carouselPhoto07 from '../assets/images/feeds/feed_022_4.jpg'
import carouselPhoto08 from '../assets/images/feeds/feed_023_1.jpg'
import carouselPhoto09 from '../assets/images/feeds/feed_024_1.jpg'
import carouselPhoto10 from '../assets/images/feeds/feed_024_2.jpg'

type WinePin = {
  name: string
  left: number
  top: number
  calloutSide: 'left' | 'right'
}

type FigmaFeed = {
  author: string
  time: string
  avatar: string
  images: string[]
  imagePosition: string
  content: string
  tags: string[]
  wine?: WinePin
}

const figmaFeeds: FigmaFeed[] = [
  {
    author: 'didihyeee',
    time: '2시간 전',
    avatar: feedAvatar1,
    images: [
      feedList1,
      carouselPhoto01,
      carouselPhoto02,
      carouselPhoto03,
      carouselPhoto04,
      carouselPhoto05,
      carouselPhoto06,
      carouselPhoto07,
      carouselPhoto08,
    ],
    imagePosition: 'center 28%',
    content: '어제는 와인 한 잔과 함께 향과 이야기를 천천히 음미했던 시간. 잔에 담긴 작은 취향을 발견하며, 와인을 조금 더 깊이 알아갈 수 있었어요.',
    tags: ['마스 풀라키에, 로랑주 아 라 메르 2021', '프랑스_파리', '페어링_굴'],
    wine: { name: '마스 풀라키에, 로랑주 아 라 메르 2021', left: 95, top: 164, calloutSide: 'right' },
  },
  {
    author: '와인맛 감자칩',
    time: '5시간 전',
    avatar: feedAvatar2,
    images: [feedList2, carouselPhoto09, carouselPhoto10],
    imagePosition: 'center 29%',
    content: '어제는 와인 한 잔과 함께 향과 이야기를 천천히 음미했던 시간. 잔에 담긴 작은 취향을 발견하며, 와인을 조금 더 깊이 알아갈 수 있었어요.',
    tags: ['루이 막스 코트 드 뉘 빌라주 2022', '대구_바바돌체'],
    wine: { name: '루이 막스 코트 드 뉘 빌라주 2022', left: 317, top: 208, calloutSide: 'left' },
  },
  {
    author: 'Nelly Neverova',
    time: '어제',
    avatar: feedAvatar3,
    images: [feedList3],
    imagePosition: 'center',
    content: '작년에 작은 와인바에서 자만추한 로제와인. 너무 향긋하고 풍미가 좋았다. 무슨 와인인지 아시는 분 있나요...?',
    tags: ['부산_리타르단도_와인샵', '아시는_분'],
  },
  {
    author: '와인페어리너',
    time: '어제',
    avatar: feedAvatar4,
    images: [feedList4],
    imagePosition: 'center',
    content: '오이 앤초비 카나페를 만들어 스파클링 와인과 함께 먹었다. 환상의 조합...!! 레시피 공유 해요 ... 더보기',
    tags: ['오이_앤초비_카나페', '와인_페어링', 'Cucumber Ricotta Anchovy Bites'],
  },
]

const feedGridImages = [feedGrid1, feedGrid5, feedGrid2, feedGrid6, feedGrid4, feedGrid8, feedGrid3, feedGrid7]

type KakaoSdk = {
  isInitialized: () => boolean
  init: (key: string) => void
  Share: {
    sendDefault: (settings: {
      objectType: 'text'
      text: string
      link: { mobileWebUrl: string; webUrl: string }
    }) => void
  }
}

async function loadKakaoSdk() {
  const kakaoWindow = window as typeof window & { Kakao?: KakaoSdk }
  if (kakaoWindow.Kakao) return kakaoWindow.Kakao

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-viner-kakao-sdk]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Kakao SDK load failed')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    script.async = true
    script.dataset.vinerKakaoSdk = 'true'
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Kakao SDK load failed')), { once: true })
    document.head.appendChild(script)
  })

  return kakaoWindow.Kakao
}

function FeedPost({ feed, index }: { feed: FigmaFeed; index: number }) {
  const [isWineOpen, setIsWineOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [liked, setLiked] = useState(index === 0)
  const [saved, setSaved] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Array<{ id: number; author: string; content: string }>>([])
  const [shareNotice, setShareNotice] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartScrollLeftRef = useRef(0)

  const handleCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget
    if (!carousel.clientWidth) return
    const nextIndex = Math.round(carousel.scrollLeft / carousel.clientWidth)
    setActiveImageIndex(Math.max(0, Math.min(feed.images.length - 1, nextIndex)))
    if (nextIndex !== 0) setIsWineOpen(false)
  }

  const moveToImage = (nextIndex: number) => {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollTo({ left: carousel.clientWidth * nextIndex, behavior: 'smooth' })
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const carousel = event.currentTarget
    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartScrollLeftRef.current = carousel.scrollLeft
    carousel.setPointerCapture(event.pointerId)
    carousel.style.cursor = 'grabbing'
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || event.pointerType !== 'mouse') return
    event.preventDefault()
    event.currentTarget.scrollLeft = dragStartScrollLeftRef.current - (event.clientX - dragStartXRef.current)
  }

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || event.pointerType !== 'mouse') return
    const carousel = event.currentTarget
    isDraggingRef.current = false
    carousel.style.cursor = 'grab'
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId)
    const nextIndex = Math.round(carousel.scrollLeft / carousel.clientWidth)
    moveToImage(Math.max(0, Math.min(feed.images.length - 1, nextIndex)))
  }

  const handleShare = async () => {
    const shareUrl = window.location.href
    const shareTitle = `${feed.author}님의 Viner 피드`
    const shareText = feed.content
    const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY as string | undefined

    try {
      if (kakaoKey) {
        const kakao = await loadKakaoSdk()
        if (!kakao) throw new Error('Kakao SDK is unavailable')
        if (!kakao.isInitialized()) kakao.init(kakaoKey)
        kakao.Share.sendDefault({
          objectType: 'text',
          text: `${shareTitle}\n${shareText}`,
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        })
        return
      }

      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl })
        return
      }

      await navigator.clipboard.writeText(`${shareTitle}\n${shareText}\n${shareUrl}`)
      setShareNotice('공유할 내용이 복사되었습니다. 카카오톡에 붙여넣어 주세요.')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareNotice('공유를 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.')
    }
  }

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = comment.trim()
    if (!value) return
    setComments((current) => [...current, { id: Date.now(), author: '나', content: value }])
    setComment('')
  }

  return (
    <article className="font-sans">
      <div className="flex h-9 items-center gap-2.5">
        <img src={feed.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" />
        <div className="flex flex-col gap-0.5 leading-[1.2]">
          <p className="text-sm font-medium tracking-[-0.28px] text-[#0d0d0d]">{feed.author}</p>
          <p className="text-xs tracking-[-0.24px] text-[#737373]">{feed.time}</p>
        </div>
      </div>

      <div className="relative mt-4 h-[534px] w-full overflow-hidden">
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointerDrag}
          onPointerCancel={finishPointerDrag}
          className="flex size-full cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={`${feed.author}의 사진 ${feed.images.length}장`}
        >
          {feed.images.map((image, imageIndex) => (
            <img
              key={`${feed.author}-${imageIndex}`}
              src={image}
              alt={`${feed.author}의 피드 사진 ${imageIndex + 1}`}
              draggable={false}
              className="size-full shrink-0 snap-center object-cover"
              style={{ objectPosition: imageIndex === 0 ? feed.imagePosition : 'center' }}
            />
          ))}
        </div>

        {feed.images.length > 1 ? (
          <span className="absolute top-5 right-5 rounded-[14px] bg-black/40 px-3 py-1 text-xs leading-[1.2] text-white">
            {activeImageIndex + 1}/{feed.images.length}
          </span>
        ) : null}

        {feed.wine && activeImageIndex === 0 ? (
          <>
            <button
              type="button"
              aria-label={`${feed.wine.name} 정보 ${isWineOpen ? '닫기' : '열기'}`}
              aria-expanded={isWineOpen}
              onClick={() => setIsWineOpen((open) => !open)}
              className="absolute z-20 size-[14px] overflow-hidden rounded-full"
              style={{ left: feed.wine.left, top: feed.wine.top }}
            >
              <img src={winePinOuter} alt="" aria-hidden="true" className="absolute inset-0 block size-[14px] max-h-[14px] max-w-[14px]" />
              <img src={winePinInner} alt="" aria-hidden="true" className="absolute top-[5px] left-[5px] block size-1 max-h-1 max-w-1" />
            </button>

            {isWineOpen ? (
              <div className="absolute inset-0 z-10">
                {feed.wine.calloutSide === 'right' ? (
                  <>
                    <img src={wineConnector} alt="" className="absolute h-[14px] w-[49px]" style={{ left: feed.wine.left + 11, top: feed.wine.top + 12 }} />
                    <div className="absolute rounded-[22px] border border-white/55 bg-black/65 px-3 py-2 text-white backdrop-blur-[2px]" style={{ left: feed.wine.left + 60, top: feed.wine.top + 11 }}>
                      <p className="text-xs font-medium whitespace-nowrap">#{feed.wine.name}</p>
                      <button type="button" className="mt-1 text-xs text-white underline underline-offset-2">와인 상세보기</button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={wineConnector} alt="" className="absolute h-[14px] w-[49px] scale-x-[-1]" style={{ left: feed.wine.left - 46, top: feed.wine.top + 12 }} />
                    <div className="absolute rounded-[22px] border border-white/55 bg-black/65 px-3 py-2 text-white backdrop-blur-[2px]" style={{ right: 80, top: feed.wine.top + 11 }}>
                      <p className="text-xs font-medium whitespace-nowrap">#{feed.wine.name}</p>
                      <button type="button" className="mt-1 text-xs text-white underline underline-offset-2">와인 상세보기</button>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {feed.images.length > 1 ? (
        <div className="relative h-[54px]">
          <div
            className="absolute top-6 left-1/2 flex h-1.5 -translate-x-1/2 items-center justify-between"
            style={{ width: feed.images.length === 9 ? 63 : 26 }}
            aria-label={`현재 사진 ${activeImageIndex + 1}/${feed.images.length}`}
          >
            {feed.images.map((_, imageIndex) => (
              <button
                key={imageIndex}
                type="button"
                aria-label={`${imageIndex + 1}번째 사진 보기`}
                aria-current={imageIndex === activeImageIndex ? 'true' : undefined}
                onClick={() => moveToImage(imageIndex)}
                className={`size-1.5 shrink-0 rounded-full ${imageIndex === activeImageIndex ? 'bg-[#98151b]' : 'bg-[#dedede]'}`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="relative h-[30px] w-full">
        <img src={feedActions} alt="" aria-hidden="true" className="h-[30px] w-full" />
        <button
          type="button"
          aria-label={liked ? '좋아요 취소' : '좋아요'}
          aria-pressed={liked}
          onClick={() => setLiked((current) => !current)}
          className="absolute top-0 left-0 flex size-[30px] items-center justify-center bg-white"
        >
          <img src={liked ? heartFilled : heartOutline} alt="" aria-hidden="true" className="size-6 object-fill" />
        </button>
        <button type="button" aria-label="카카오톡으로 공유" onClick={() => void handleShare()} className="absolute top-0 left-[42px] h-[30px] w-[31px]" />
        <button
          type="button"
          aria-label={commentsOpen ? '댓글 닫기' : '댓글 보기'}
          aria-expanded={commentsOpen}
          onClick={() => setCommentsOpen((current) => !current)}
          className="absolute top-0 left-[88px] h-[30px] w-[34px]"
        />
        <button
          type="button"
          aria-label={saved ? '저장 취소' : '저장'}
          aria-pressed={saved}
          onClick={() => setSaved((current) => !current)}
          className="absolute top-0 right-0 h-[30px] w-[30px] overflow-hidden bg-white"
        >
          <img
            src={feedActions}
            alt=""
            aria-hidden="true"
            className="absolute top-[2px] right-0 h-[25px] w-[391px] max-w-none transition-[filter]"
            style={{ filter: saved ? 'brightness(0) saturate(100%) invert(12%) sepia(48%) saturate(3658%) hue-rotate(341deg) brightness(87%) contrast(95%)' : 'none' }}
          />
          <span className="sr-only">{saved ? '저장됨' : '저장 안 됨'}</span>
        </button>
      </div>

      <p className="mt-1.5 text-sm leading-[1.3] tracking-[-0.28px] text-[#595959]">
        <strong className="font-medium text-black">{feed.author} </strong>
        {feed.content}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium leading-none tracking-[-0.24px] text-[#aaa]">
        {feed.tags.map((tag) => <span key={tag}>#{tag}</span>)}
      </div>

      {commentsOpen ? (
        <section className="mt-4 border-t border-black/10 pt-3" aria-label="댓글">
          <div className="flex flex-col gap-2" aria-live="polite">
            {comments.map((item) => (
              <p key={item.id} className="text-[13px] leading-[1.45] text-[#595959]">
                <strong className="mr-1.5 font-semibold text-[#0d0d0d]">{item.author}</strong>
                {item.content}
              </p>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className={`${comments.length ? 'mt-3' : ''} flex h-10 items-center gap-2 rounded-full bg-[#f6f5f4] px-4`}>
            <label htmlFor={`feed-comment-${index}`} className="sr-only">댓글 입력</label>
            <input
              id={`feed-comment-${index}`}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="댓글을 입력하세요..."
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#aaa]"
            />
            <button type="submit" disabled={!comment.trim()} className="text-[13px] font-bold text-[#831317] disabled:text-[#c8c8c8]">
              등록
            </button>
          </form>
        </section>
      ) : null}
      <div className="h-[48px]" />
      <AppBottomSheet
        open={shareNotice !== null}
        title={shareNotice ?? ''}
        confirmLabel="확인"
        onClose={() => setShareNotice(null)}
        onConfirm={() => setShareNotice(null)}
      />
    </article>
  )
}

function Feed() {
  const [isGridView, setIsGridView] = useState(false)

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id={isGridView ? '1546:4105' : '1546:3969'}>
      <LoungeHeader />
      <main className="w-full px-5 pt-5 pb-8">
        <h1 className="font-playfair-display text-[32px] leading-[1.3] font-normal tracking-[-0.64px] text-[#831317]">Lounge</h1>

        <div className="mt-[57px]"><LoungeTabs activeTab="피드" /></div>

        <div className="mt-5 flex justify-end">
          <button type="button" aria-label={isGridView ? '피드 목록으로 보기' : '피드 모아 보기'} aria-pressed={isGridView} onClick={() => setIsGridView((current) => !current)} className="h-[19px] w-[18px]">
            <img src={feedViewToggleIcon} alt="" className={`h-[19px] w-[18px] ${isGridView ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {isGridView ? (
          <div className="mt-7 grid grid-cols-2 gap-[3px]">
            {feedGridImages.map((image, index) => <img key={image} src={image} alt={`피드 모아보기 ${index + 1}`} className="h-[268px] w-full object-cover" />)}
          </div>
        ) : (
          <div className="mt-7">
            {figmaFeeds.map((feed, index) => <FeedPost key={feed.author} feed={feed} index={index} />)}
          </div>
        )}
      </main>
    </div>
  )
}

export default Feed
