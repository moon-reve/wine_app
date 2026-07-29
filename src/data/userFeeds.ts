import type { FigmaFeed } from '../pages/LoungeFeed'

const STORAGE_KEY = 'wine-app-user-feeds'

function loadUserFeeds(): FigmaFeed[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as FigmaFeed[]) : []
  } catch {
    return []
  }
}

export function getUserFeeds() {
  return loadUserFeeds()
}

export function addUserFeed(feed: FigmaFeed) {
  if (typeof window === 'undefined') return

  const next = [feed, ...loadUserFeeds()]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
