import feeds from '../../dummy data/feeds.json'
import users from '../../dummy data/users.json'
import wines from '../../dummy data/wines.json'

const feedImageModules = import.meta.glob('/src/assets/images/feeds/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export type FeedViewModel = {
  id: string
  userId: string
  wineId: string
  author: string
  profileSource?: string
  wineName: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  time: string
  imageSources: string[]
  imageUrls: string[]
  likeCount: number
  commentCount: number
}

export function formatFeedTime(createdAt: string) {
  const createdTime = new Date(createdAt).getTime()
  const elapsedHours = Math.max(1, Math.floor((Date.now() - createdTime) / (1000 * 60 * 60)))

  if (elapsedHours < 24) return `${elapsedHours}시간 전`

  const elapsedDays = Math.floor(elapsedHours / 24)
  if (elapsedDays < 7) return `${elapsedDays}일 전`

  const created = new Date(createdAt)
  return `${created.getMonth() + 1}월 ${created.getDate()}일`
}

function resolveFeedImage(imageSource: string) {
  const imageUrl = feedImageModules[`/${imageSource}`]

  if (!imageUrl) {
    throw new Error(`피드 이미지를 찾을 수 없습니다: ${imageSource}`)
  }

  return imageUrl
}

export const feedItems: FeedViewModel[] = feeds.map((feed) => {
  const user = users.find((item) => item.id === feed.userId)
  const wine = wines.find((item) => item.id === feed.wineId)
  const wineName = wine?.nameKo ?? '와인 정보 없음'

  return {
    id: feed.id,
    userId: feed.userId,
    wineId: feed.wineId,
    author: user?.nickname ?? '알 수 없는 사용자',
    profileSource: user?.profileImage,
    wineName,
    title: feed.title ?? wineName,
    content: feed.content,
    tags: feed.tags,
    createdAt: feed.createdAt,
    time: formatFeedTime(feed.createdAt),
    imageSources: feed.images,
    imageUrls: feed.images.map(resolveFeedImage),
    likeCount: feed.likeCount,
    commentCount: feed.commentCount,
  }
})

export function getFeedById(feedId?: string) {
  return feedItems.find((feed) => feed.id === feedId)
}
