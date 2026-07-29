import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  INITIAL_LIKED_WINE_IDS,
  LikedWinesContext,
  type LikedWinesContextValue,
} from './likedWinesContextValue'

const STORAGE_KEY = 'wine-app-liked-wines'

export function LikedWinesProvider({ children }: { children: ReactNode }) {
  const [likedWineIds, setLikedWineIds] = useState<Set<string>>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) return new Set(INITIAL_LIKED_WINE_IDS)
      const wineIds = JSON.parse(stored) as unknown
      return Array.isArray(wineIds) ? new Set(wineIds.filter((wineId): wineId is string => typeof wineId === 'string')) : new Set(INITIAL_LIKED_WINE_IDS)
    } catch {
      return new Set(INITIAL_LIKED_WINE_IDS)
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...likedWineIds]))
  }, [likedWineIds])

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
