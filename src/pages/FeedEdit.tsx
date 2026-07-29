import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getUserFeeds } from '../data/userFeeds'
import { FeedComposer } from './FeedCreateFlow'
import type { FigmaFeed } from './LoungeFeed'

type FeedEditLocationState = {
  feed?: FigmaFeed
}

export default function FeedEdit() {
  const navigate = useNavigate()
  const location = useLocation()
  const { feedId = '' } = useParams()
  const stateFeed = (location.state as FeedEditLocationState | null)?.feed
  const feed =
    (stateFeed?.id === feedId ? stateFeed : undefined) ??
    getUserFeeds().find((item) => item.id === feedId)

  if (!feed) {
    return (
      <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 bg-white px-5 text-[#121212]">
        <p className="text-sm text-[#737373]">수정할 피드를 찾을 수 없어요.</p>
        <button type="button" onClick={() => navigate('/mypage/feed', { replace: true })} className="h-11 rounded-[10px] bg-[#831317] px-6 text-sm font-bold text-white">
          내가 쓴 피드로 돌아가기
        </button>
      </main>
    )
  }

  return <FeedComposer photo={feed.images[0]} existingFeed={feed} onBack={() => navigate(-1)} />
}
