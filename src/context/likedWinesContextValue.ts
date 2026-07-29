import { createContext, useContext } from 'react'

// 마이페이지 '좋아요' 탭 데모용 초기 좋아요 목록.
export const INITIAL_LIKED_WINE_IDS = ['wine_041', 'wine_031', 'wine_023']

export type LikedWinesContextValue = {
  likedWineIds: Set<string>
  isLiked: (wineId: string) => boolean
  toggleLike: (wineId: string) => void
  unlike: (wineId: string) => void
}

export const LikedWinesContext = createContext<LikedWinesContextValue | null>(null)

export function useLikedWines() {
  const context = useContext(LikedWinesContext)
  if (!context) throw new Error('useLikedWines must be used within a LikedWinesProvider')
  return context
}
