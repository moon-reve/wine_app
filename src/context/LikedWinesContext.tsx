import { useMemo, useState, type ReactNode } from 'react'
import {
  INITIAL_LIKED_WINE_IDS,
  LikedWinesContext,
  type LikedWinesContextValue,
} from './likedWinesContextValue'

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
