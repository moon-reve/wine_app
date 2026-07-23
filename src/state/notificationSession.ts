import { useSyncExternalStore } from 'react'

export const notificationIds = [
  'notification-feed-comment',
  'notification-feed-like',
  'notification-qna-answer',
  'notification-meeting-confirmed',
  'notification-magazine-published',
] as const

const readNotificationIds = new Set<string>()
const listeners = new Set<() => void>()
let version = 0

function emitChange() {
  version += 1
  listeners.forEach((listener) => listener())
}

export function markNotificationRead(id: string) {
  if (readNotificationIds.has(id)) return
  readNotificationIds.add(id)
  emitChange()
}

export function markAllNotificationsRead() {
  let changed = false

  notificationIds.forEach((id) => {
    if (!readNotificationIds.has(id)) {
      readNotificationIds.add(id)
      changed = true
    }
  })

  if (changed) emitChange()
}

export function getReadNotificationIds() {
  return new Set(readNotificationIds)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getVersion() {
  return version
}

function getHasUnreadNotifications() {
  return notificationIds.some((id) => !readNotificationIds.has(id))
}

export function useNotificationSessionVersion() {
  return useSyncExternalStore(subscribe, getVersion, getVersion)
}

export function useHasUnreadNotifications() {
  return useSyncExternalStore(subscribe, getHasUnreadNotifications, getHasUnreadNotifications)
}
