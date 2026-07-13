import { useRef, useState, type FormEvent } from 'react'
import backIcon from '../assets/images/icon-chevron-forward.svg'
import feedPhoto from '../assets/images/feed-detail-photo.png'
import authorAvatar from '../assets/images/feed-author-avatar.svg'
import commentAvatar from '../assets/images/feed-comment-avatar.svg'

type Comment = {
  id: number
  author: string
  time: string
  content: string
}

type FeedDetailProps = {
  onBack?: () => void
  onFollow?: () => void
  onSubmitComment?: (comment: string) => void
  className?: string
}

const tags = ['#보르도', '#2018빈티지', '#테이스팅노트']

const initialComments: Comment[] = [
  {
    id: 1,
    author: '마커스 바인',
    time: '1시간 전',
    content: '산도에 대해 전적으로 동의합니다. 단순히 높은 알코올 도수에 의존하지 않는 빈티지를 보니 신선하네요.',
  },
  {
    id: 2,
    author: '사라 C.',
    time: '45분 전',
    content: '혹시 2018 샤토 마르고를 드셔보셨나요? 플로럴 노트가 예외적으로 훌륭합니다.',
  },
]

const initialCommentCount = 18
const initialLikeCount = 124

export default function FeedDetail({
  onBack,
  onFollow,
  onSubmitComment,
  className = '',
}: FeedDetailProps) {
  const [comment, setComment] = useState('')
  const [commentItems, setCommentItems] = useState<Comment[]>(initialComments)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [liked, setLiked] = useState(false)
  const [following, setFollowing] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)

  const commentCount = initialCommentCount + commentItems.length - initialComments.length

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    window.history.back()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = comment.trim()
    if (!value) return

    setCommentItems((currentComments) => [
      ...currentComments,
      {
        id: Date.now(),
        author: '나',
        time: '방금 전',
        content: value,
      },
    ])
    onSubmitComment?.(value)
    setComment('')
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((currentCount) => currentCount + (liked ? -1 : 1))
  }

  const handleFollow = () => {
    setFollowing((currentFollowing) => !currentFollowing)
    onFollow?.()
  }

  return (
    <article
      data-node-id="618:50"
      className={`mx-auto min-h-screen w-full max-w-[430px] bg-white text-[#0d0d0d] ${className}`}
    >
      <header
        data-node-id="618:51"
        className="relative flex h-[70px] w-full shrink-0 items-center justify-center"
      >
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={handleBack}
          className="absolute left-5 top-[23px] flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
        >
          <img src={backIcon} alt="" aria-hidden="true" className="size-6 rotate-180" />
        </button>
        <h1 className="text-[18px] leading-none font-bold tracking-[-0.54px]">피드</h1>
      </header>

      <div data-node-id="618:56" className="flex w-full flex-col gap-5 px-5 pt-3 pb-8">
        <section className="flex w-full items-center gap-2.5" aria-label="작성자 정보">
          <img src={authorAvatar} alt="" className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-0.5 leading-[1.2]">
            <p className="text-[15px] font-bold tracking-[-0.3px]">알렉스 소믈리에</p>
            <p className="text-xs tracking-[-0.24px] text-[#737373]">2시간 전</p>
          </div>
          <button
            type="button"
            aria-pressed={following}
            onClick={handleFollow}
            className={`ml-auto flex h-[30px] shrink-0 items-center justify-center rounded-full border border-[#831317] px-[11px] text-xs leading-none font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
              following
                ? 'bg-[#831317] text-white hover:bg-[#670e10]'
                : 'bg-white text-[#831317] hover:bg-[#831317] hover:text-white'
            }`}
          >
            {following ? '팔로잉' : '팔로우'}
          </button>
        </section>

        <img
          data-node-id="618:65"
          src={feedPhoto}
          alt="2018 생테밀리옹 와인병과 레드 와인잔"
          className="aspect-[13/10] w-full object-cover"
        />

        <h2 className="text-[22px] leading-[1.3] font-bold tracking-[-0.66px]">
          2018 빈티지: 밸런스의 정수
        </h2>

        <p className="text-sm leading-[1.6] tracking-[-0.28px] text-[#595959]">
          오늘 2018 보르도 수확의 미묘한 뉘앙스를 탐구합니다. 순수한 과일 향보다 산도를 우선시하는 놀라운 구조적
          집중도가 돋보입니다. 팔레트의 정보량이 풍부하면서도 결코 무겁지 않은, 밸런스의 정수를 보여주는
          빈티지입니다.
        </p>

        <div className="flex flex-wrap gap-2" aria-label="피드 태그">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex h-6 items-center rounded-full bg-[#831317] px-3 text-xs leading-none font-medium text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs leading-[1.2] tracking-[-0.24px] text-[#737373]">
          <button
            type="button"
            aria-pressed={liked}
            onClick={handleLike}
            className={`focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${liked ? 'font-medium text-[#831317]' : ''}`}
          >
            좋아요 {likeCount}
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => commentInputRef.current?.focus()}
            className="focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
          >
            댓글 {commentCount}
          </button>
        </div>

        <div className="h-px w-full bg-black/12" />

        <section aria-labelledby="feed-comments-title" className="flex flex-col gap-5">
          <h3 id="feed-comments-title" className="text-base leading-[1.3] font-bold tracking-[-0.48px]">
            댓글 {commentCount}
          </h3>

          <div className="flex flex-col gap-5" aria-live="polite">
            {commentItems.map((item) => (
              <article key={item.id} className="flex items-start gap-2.5">
                <img src={commentAvatar} alt="" className="size-8 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 leading-[1.2]">
                    <p className="text-[13px] font-bold tracking-[-0.26px]">{item.author}</p>
                    <time className="text-[11px] tracking-[-0.22px] text-[#737373]">{item.time}</time>
                  </div>
                  <p className="mt-1 text-[13px] leading-[1.5] tracking-[-0.26px] text-[#595959]">
                    {item.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-[46px] w-full items-center gap-2.5 rounded-full bg-[#f6f5f4] px-[18px] py-3.5"
        >
          <label htmlFor="feed-comment" className="sr-only">
            댓글 입력
          </label>
          <input
            ref={commentInputRef}
            id="feed-comment"
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="댓글을 입력하세요..."
            className="min-w-0 flex-1 bg-transparent text-[13px] leading-none tracking-[-0.26px] text-[#0d0d0d] outline-none placeholder:text-[#737373]"
          />
          <button
            type="submit"
            className="shrink-0 text-[13px] leading-none font-bold tracking-[-0.26px] text-[#831317] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
          >
            등록
          </button>
        </form>
      </div>
    </article>
  )
}
