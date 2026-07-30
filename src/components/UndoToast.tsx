import { useEffect } from 'react'

type UndoToastProps = {
  open: boolean
  message: string
  onUndo: () => void
  onDismiss: () => void
  duration?: number
  aboveBottomNavigation?: boolean
}

export default function UndoToast({
  open,
  message,
  onUndo,
  onDismiss,
  duration = 5000,
  aboveBottomNavigation = false,
}: UndoToastProps) {
  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(onDismiss, duration)
    return () => window.clearTimeout(timer)
  }, [duration, onDismiss, open])

  if (!open) return null

  return (
    <div className={`fixed inset-x-5 z-110 flex min-h-14 items-center justify-between gap-4 rounded-[12px] bg-[#252525] px-4 py-3 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] ${aboveBottomNavigation ? 'bottom-[calc(128px+env(safe-area-inset-bottom))]' : 'bottom-[max(24px,calc(env(safe-area-inset-bottom)+16px))]'}`} role="status" aria-live="polite">
      <span className="text-[14px] leading-5">{message}</span>
      <button type="button" onClick={onUndo} className="shrink-0 text-[14px] font-bold text-[#f2b8ba] underline underline-offset-2">
        실행 취소
      </button>
    </div>
  )
}
