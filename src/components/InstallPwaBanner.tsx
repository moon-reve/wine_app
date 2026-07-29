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
      className="wine-install-banner-drop fixed inset-x-0 top-0 z-50 w-screen px-2.5 pt-[calc(10px+env(safe-area-inset-top))]"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-[#202024] shadow-[0_4px_20px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        <img src="/pwa-192x192.png" alt="" className="size-11 shrink-0 rounded-[12px]" />
        <div className="min-w-0 flex-1">
          <p className="break-keep text-[15px] font-bold leading-[1.3]">Viner 앱 설치</p>
          <p className="mt-0.5 break-keep text-[13px] leading-[1.4] text-[#6e6e6e]">홈 화면에 추가하고 더 빠르게 만나보세요</p>
        </div>
        <button
          type="button"
          onClick={async () => {
            const accepted = await promptInstall()
            if (accepted) dismiss()
          }}
          className="shrink-0 rounded-lg bg-[#831317] px-3.5 py-2 text-[13px] font-bold text-white"
        >
          설치
        </button>
        <button type="button" onClick={dismiss} aria-label="닫기" className="shrink-0 p-1 text-[#9a9a9a]">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
