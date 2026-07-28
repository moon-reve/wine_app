import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// 라운지 메인 피드 첫 게시물은 데모에서 이미 좋아요가 눌린 상태로 보여준다.
const INITIAL_LIKED_FEED_KEYS = ['didihyeee']

const STORAGE_KEY = 'wine-app-liked-feeds'

function loadStoredLikedFeedKeys(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : INITIAL_LIKED_FEED_KEYS
  } catch {
    return INITIAL_LIKED_FEED_KEYS
  }
}

type FeedLikesContextValue = {
  isLiked: (feedKey: string) => boolean
  toggleLike: (feedKey: string) => void
}

const FeedLikesContext = createContext<FeedLikesContextValue | null>(null)

export function FeedLikesProvider({ children }: { children: ReactNode }) {
  const [likedFeedKeys, setLikedFeedKeys] = useState<Set<string>>(() => new Set(loadStoredLikedFeedKeys()))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...likedFeedKeys]))
    } catch {
      // 저장 공간이 없거나 접근이 막힌 환경에서는 조용히 무시한다.
    }
  }, [likedFeedKeys])

  const isLiked = (feedKey: string) => likedFeedKeys.has(feedKey)

  const toggleLike = (feedKey: string) => {
    setLikedFeedKeys((current) => {
      const next = new Set(current)
      if (next.has(feedKey)) next.delete(feedKey)
      else next.add(feedKey)
      return next
    })
  }

  return <FeedLikesContext.Provider value={{ isLiked, toggleLike }}>{children}</FeedLikesContext.Provider>
}

export function useFeedLikes() {
  const context = useContext(FeedLikesContext)
  if (!context) throw new Error('useFeedLikes must be used within a FeedLikesProvider')
  return context
}
