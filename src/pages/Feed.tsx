import { Link } from 'react-router-dom'
import feeds from '../../dummy data/feeds.json'
import users from '../../dummy data/users.json'
import wines from '../../dummy data/wines.json'
import feedImage1 from '../assets/lounge/feed-1.png'
import feedImage2 from '../assets/lounge/feed-2.png'
import feedImage3 from '../assets/lounge/feed-3.png'
import profileImage from '../assets/lounge/profile.svg'
import Header from '../components/Header'
import LoungeTabs from '../components/LoungeTabs'

const fallbackImages = [feedImage1, feedImage2, feedImage3]

function formatFeedTime(createdAt: string) {
  const createdTime = new Date(createdAt).getTime()
  const elapsedHours = Math.max(1, Math.floor((Date.now() - createdTime) / (1000 * 60 * 60)))

  if (elapsedHours < 24) return `${elapsedHours}시간 전`

  const elapsedDays = Math.floor(elapsedHours / 24)
  if (elapsedDays < 7) return `${elapsedDays}일 전`

  const created = new Date(createdAt)
  return `${created.getMonth() + 1}월 ${created.getDate()}일`
}

const figmaCardCopy = [
  {
    author: '알렉스 소믈리에',
    time: '2시간 전',
    title: '발견: 2018 생테밀리옹',
    content: '올해 탄닌은 놀라울 정도로 부드럽습니다. 플럼과 시더 노트가 지배적이며 피니시가 길게 이어집니다.',
    tags: ['보르도', '리뷰'],
    likeCount: 124,
    commentCount: 18,
  },
  {
    author: '클레어 V.',
    time: '5시간 전',
    title: '완벽한 셀러 레이아웃',
    content: '새로운 화이트 와인 섹션 정리를 막 끝냈습니다. 수직적 리듬이 셀러의 분위기를 완전히 바꿔놓았어요.',
    tags: ['정리', '셀러'],
    likeCount: 89,
    commentCount: 4,
  },
  {
    author: '와인맛 감자칩',
    time: '어제',
    title: '영동에서 문경까지, K-와인 로드',
    content: "국산 청포도 '청수'와 오미자 스파클링 '오미로제'까지, 한국에도 개성 있는 와인이 많았습니다.",
    tags: ['K와인', '투어'],
    likeCount: 56,
    commentCount: 9,
  },
] as const

const feedCards = feeds.slice(0, 3).map((feed, index) => {
  const user = users.find((item) => item.id === feed.userId)
  const wine = wines.find((item) => item.id === feed.wineId)
  const figmaCopy = figmaCardCopy[index]
  const useFigmaCopy = index <= 2

  return {
    id: feed.id,
    author: figmaCopy.author,
    profileSource: user?.profileImage,
    time: formatFeedTime(feed.createdAt),
    imageSource: feed.images[0],
    fallbackImage: fallbackImages[index],
    title: useFigmaCopy ? figmaCopy.title : (wine?.nameKo ?? figmaCopy.title),
    content: useFigmaCopy ? figmaCopy.content : (feed.content || figmaCopy.content),
    tags: useFigmaCopy ? figmaCopy.tags : (feed.tags.length ? feed.tags.slice(0, 2) : figmaCopy.tags),
    likeCount: useFigmaCopy ? figmaCopy.likeCount : feed.likeCount,
    commentCount: useFigmaCopy ? figmaCopy.commentCount : feed.commentCount,
  }
})

type FeedCardProps = (typeof feedCards)[number]

function FeedCard({
  id,
  author,
  profileSource,
  time,
  imageSource,
  fallbackImage,
  title,
  content,
  tags,
  likeCount,
  commentCount,
}: FeedCardProps) {
  return (
    <Link
      to={`/feed/${id}`}
      aria-label={`${title} 피드 상세 보기`}
      className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#831317]"
    >
      <article className="flex w-full flex-col gap-3.5 font-noto" data-feed-source={imageSource}>
      <div className="flex items-center gap-2.5">
        <img
          src={profileImage}
          data-original-src={profileSource}
          alt={`${author} 프로필`}
          className="size-9 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col gap-0.5 leading-[1.2]">
          <p className="text-sm font-bold tracking-[-0.28px] text-[#0d0d0d]">{author}</p>
          <p className="text-xs font-normal tracking-[-0.24px] text-[#737373]">{time}</p>
        </div>
      </div>

      <img src={fallbackImage} data-original-src={imageSource} alt={title} className="aspect-[13/8] w-full object-cover" />

      <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px] text-[#0d0d0d]">{title}</h2>
      <p className="line-clamp-2 min-h-[42px] text-sm leading-[1.5] font-normal tracking-[-0.28px] text-[#595959]">{content}</p>
      <div className="flex items-start gap-2">
        {tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-[25px] bg-[#831317] px-3 py-1.5 text-xs leading-none font-medium whitespace-nowrap text-white">
            #{tag}
          </span>
        ))}
      </div>
      <p className="text-xs leading-[1.2] tracking-[-0.24px] text-[#737373]">
        좋아요 {likeCount} · 댓글 {commentCount}
      </p>
      </article>
    </Link>
  )
}

function Feed() {
  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="617:13">
      <Header tone="light" />

      <main className="flex w-full flex-col gap-7 px-5 pt-5 pb-8">
        <div className="flex flex-col items-start gap-1.5 leading-[1.3] whitespace-nowrap">
          <h1 className="font-playfair text-[38px] font-bold tracking-[-0.76px] text-[#831317]">Lounge</h1>
          <p className="font-noto text-sm tracking-[-0.28px]">와인 러버들의 이야기가 모이는 공간</p>
        </div>

        <LoungeTabs activeTab="피드" />

        {feedCards.map((feed, index) => (
          <div key={feed.id} className="contents">
            <FeedCard {...feed} />
            {index < feedCards.length - 1 ? <hr className="m-0 h-px w-full border-0 bg-black/12" /> : null}
          </div>
        ))}
      </main>
    </div>
  )
}

export default Feed
