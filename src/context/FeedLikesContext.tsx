import { useEffect, useState, type ReactNode } from 'react'
import {
  FeedLikesContext,
  loadStoredLikedFeedKeys,
  storeLikedFeedKeys,
} from './feedLikesContextValue'

export function FeedLikesProvider({ children }: { children: ReactNode }) {
  const [likedFeedKeys, setLikedFeedKeys] = useState<Set<string>>(() => new Set(loadStoredLikedFeedKeys()))

  useEffect(() => {
    try {
      storeLikedFeedKeys(likedFeedKeys)
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
