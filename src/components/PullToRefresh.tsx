import { useEffect, useRef, useState } from 'react'

const TRIGGER_DISTANCE = 90
const MAX_INDICATOR_DISTANCE = 64

function canStartPull(target: EventTarget | null) {
  if (!(target instanceof Element) || window.scrollY > 0) return false

  if (target.closest('input, textarea, select, [contenteditable="true"]')) {
    return false
  }

  let element: Element | null = target

  while (element && element !== document.body) {
    const style = window.getComputedStyle(element)
    const scrollable = /(auto|scroll)/.test(style.overflowY)

    if (scrollable && element.scrollHeight > element.clientHeight + 1) {
      return element.scrollTop <= 0
    }

    element = element.parentElement
  }

  return true
}

export default function PullToRefresh() {
  const gestureRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    rawDistance: 0,
  })
  const [distance, setDistance] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const reset = () => {
      gestureRef.current.active = false
      gestureRef.current.rawDistance = 0
      setDistance(0)
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (refreshing || event.touches.length !== 1 || !canStartPull(event.target)) {
        return
      }

      const touch = event.touches[0]
      gestureRef.current = {
        active: true,
        startX: touch.clientX,
        startY: touch.clientY,
        rawDistance: 0,
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      const gesture = gestureRef.current
      if (!gesture.active || event.touches.length !== 1) return

      const touch = event.touches[0]
      const deltaX = touch.clientX - gesture.startX
      const deltaY = touch.clientY - gesture.startY

      if (deltaY <= 0 || Math.abs(deltaX) > Math.abs(deltaY)) {
        reset()
        return
      }

      gesture.rawDistance = deltaY

      if (deltaY > 6) {
        event.preventDefault()
        setDistance(Math.min(deltaY * 0.55, MAX_INDICATOR_DISTANCE))
      }
    }

    const handleTouchEnd = () => {
      const shouldRefresh =
        gestureRef.current.active &&
        gestureRef.current.rawDistance >= TRIGGER_DISTANCE

      if (!shouldRefresh) {
        reset()
        return
      }

      gestureRef.current.active = false
      setRefreshing(true)
      setDistance(48)
      window.setTimeout(() => window.location.reload(), 150)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', reset, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', reset)
    }
  }, [refreshing])

  if (distance === 0 && !refreshing) return null

  return (
    <div
      role="status"
      aria-label={refreshing ? '새로고침 중' : '아래로 당겨 새로고침'}
      className="pointer-events-none fixed top-[calc(env(safe-area-inset-top)+8px)] left-1/2 z-[200] flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-white/95 text-xl text-[#831317] shadow-[0_3px_14px_rgba(0,0,0,0.18)]"
      style={{
        opacity: Math.min(distance / 28, 1),
        transform: `translate(-50%, ${distance - 48}px) rotate(${refreshing ? 0 : distance * 3}deg)`,
      }}
    >
      <span aria-hidden="true" className={refreshing ? 'animate-spin' : ''}>
        ↻
      </span>
    </div>
  )
}
