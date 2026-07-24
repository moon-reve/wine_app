import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

// 마이페이지 '좋아요' 탭 데모용 초기 좋아요 목록.
const INITIAL_LIKED_WINE_IDS = ['wine_041', 'wine_031', 'wine_023']

type LikedWinesContextValue = {
  likedWineIds: Set<string>
  isLiked: (wineId: string) => boolean
  toggleLike: (wineId: string) => void
  unlike: (wineId: string) => void
}

const LikedWinesContext = createContext<LikedWinesContextValue | null>(null)

export function LikedWinesProvider({ children }: { children: ReactNode }) {
  const [likedWineIds, setLikedWineIds] = useState<Set<string>>(() => new Set(INITIAL_LIKED_WINE_IDS))

  const value = useMemo<LikedWinesContextValue>(() => ({
    likedWineIds,
    isLiked: (wineId) => likedWineIds.has(wineId),
    toggleLike: (wineId) => {
      setLikedWineIds((current) => {
        const next = new Set(current)
        if (next.has(wineId)) next.delete(wineId)
        else next.add(wineId)
        return next
      })
    },
    unlike: (wineId) => {
      setLikedWineIds((current) => {
        const next = new Set(current)
        next.delete(wineId)
        return next
      })
    },
  }), [likedWineIds])

  return <LikedWinesContext.Provider value={value}>{children}</LikedWinesContext.Provider>
}

export function useLikedWines() {
  const context = useContext(LikedWinesContext)
  if (!context) throw new Error('useLikedWines must be used within a LikedWinesProvider')
  return context
}
