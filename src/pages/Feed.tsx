import { Link } from 'react-router-dom'
import profileImage from '../assets/lounge/profile.svg'
import Header from '../components/Header'
import LoungeTabs from '../components/LoungeTabs'
import { feedItems, type FeedViewModel } from '../data/feedData'

type FeedCardProps = FeedViewModel

function FeedCard({
  id,
  author,
  profileSource,
  time,
  imageSources,
  imageUrls,
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
      <article className="flex w-full flex-col gap-3.5 font-noto" data-feed-source={imageSources[0]}>
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

        {imageUrls[0] ? (
          <img src={imageUrls[0]} alt={title} className="aspect-[13/8] w-full object-cover" />
        ) : null}

        <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px] text-[#0d0d0d]">{title}</h2>
        <p className="line-clamp-2 min-h-[42px] text-sm leading-[1.5] font-normal tracking-[-0.28px] text-[#595959]">{content}</p>
        <div className="flex flex-wrap items-start gap-2">
          {tags.map((tag) => (
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

        {feedItems.map((feed, index) => (
          <div key={feed.id} className="contents">
            <FeedCard {...feed} />
            {index < feedItems.length - 1 ? <hr className="m-0 h-px w-full border-0 bg-black/12" /> : null}
          </div>
        ))}
      </main>
    </div>
  )
}

export default Feed
