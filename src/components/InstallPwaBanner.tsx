import { useState } from 'react'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

const DISMISS_KEY = 'wine-app-install-banner-dismissed-at'
const DISMISS_DAYS = 14

function wasRecentlyDismissed() {
  const dismissedAt = Number(localStorage.getItem(DISMISS_KEY))
  if (!dismissedAt) return false
  return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000
}

export default function InstallPwaBanner() {
  const { canInstall, promptInstall } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(wasRecentlyDismissed)

  if (!canInstall || dismissed) return null

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
    setDismissed(true)
  }

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-[130px] z-40 mx-auto flex w-[calc(100%-40px)] max-w-107.5 items-center gap-3 rounded-xl bg-[#202024] px-4 py-3 text-white shadow-lg"
    >
      <span className="flex-1 text-sm font-medium">홈 화면에 Viner를 추가하고 더 빠르게 만나보세요</span>
      <button
        type="button"
        onClick={async () => {
          const accepted = await promptInstall()
          if (accepted) dismiss()
        }}
        className="shrink-0 rounded-lg bg-[#98151b] px-3 py-2 text-xs font-bold"
      >
        설치
      </button>
      <button type="button" onClick={dismiss} aria-label="닫기" className="shrink-0 text-white/60">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
