import type { FigmaFeed } from '../pages/LoungeFeed'

const STORAGE_KEY = 'wine-app-user-feeds'
const EDITS_STORAGE_KEY = 'wine-app-feed-edits'

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

export function deleteUserFeed(feedId: string) {
  if (typeof window === 'undefined') return

  const next = loadUserFeeds().filter((feed) => feed.id !== feedId)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function restoreUserFeed(feed: FigmaFeed, index = 0) {
  if (typeof window === 'undefined' || !feed.id) return

  const current = loadUserFeeds().filter((item) => item.id !== feed.id)
  const safeIndex = Math.max(0, Math.min(index, current.length))
  const next = [...current.slice(0, safeIndex), feed, ...current.slice(safeIndex)]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

function loadFeedEdits(): Record<string, Partial<FigmaFeed>> {
  if (typeof window === 'undefined') return {}

  try {
    const raw = window.localStorage.getItem(EDITS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, Partial<FigmaFeed>>) : {}
  } catch {
    return {}
  }
}

export function getFeedEdit(feedId: string) {
  return loadFeedEdits()[feedId]
}

export function updateUserFeed(feed: FigmaFeed) {
  if (typeof window === 'undefined' || !feed.id) return

  const userFeeds = loadUserFeeds()
  const userFeedIndex = userFeeds.findIndex((item) => item.id === feed.id)
  if (userFeedIndex >= 0) {
    const next = [...userFeeds]
    next[userFeedIndex] = feed
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return
  }

  const edits = loadFeedEdits()
  const {
    content,
    tags,
    wineTags,
    personTags,
    hashtags,
    locationTag,
    privacy,
    commentsEnabled,
  } = feed
  window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify({
    ...edits,
    [feed.id]: {
      content,
      tags,
      wineTags,
      personTags,
      hashtags,
      locationTag,
      privacy,
      commentsEnabled,
    },
  }))
}
