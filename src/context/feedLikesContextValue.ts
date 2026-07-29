import { createContext, useContext } from 'react'

// 라운지 메인 피드 첫 게시물은 데모에서 이미 좋아요가 눌린 상태로 보여준다.
const INITIAL_LIKED_FEED_KEYS = ['didihyeee']
const STORAGE_KEY = 'wine-app-liked-feeds'

export function loadStoredLikedFeedKeys(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : INITIAL_LIKED_FEED_KEYS
  } catch {
    return INITIAL_LIKED_FEED_KEYS
  }
}

export function storeLikedFeedKeys(likedFeedKeys: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...likedFeedKeys]))
}

export type FeedLikesContextValue = {
  isLiked: (feedKey: string) => boolean
  toggleLike: (feedKey: string) => void
}

export const FeedLikesContext = createContext<FeedLikesContextValue | null>(null)

export function useFeedLikes() {
  const context = useContext(FeedLikesContext)
  if (!context) throw new Error('useFeedLikes must be used within a FeedLikesProvider')
  return context
}
