import { useNavigate } from 'react-router-dom'
import feedSearch from '../assets/lounge/figma/feed-search.svg'
import NotificationBellIcon from './NotificationBellIcon'

export default function LoungeHeader() {
  const navigate = useNavigate()

  return (
    <header className="flex h-[calc(52px+max(18px,env(safe-area-inset-top)))] w-full items-center justify-between px-5 pt-[max(18px,env(safe-area-inset-top))] pb-3">
      <h1 className="h-10 shrink-0 font-delmon text-[32px] leading-[1.6] font-normal text-[#831317]">Lounge</h1>
      <div className="flex items-center gap-1">
        <button type="button" aria-label="검색" onClick={() => navigate('/search')} className="flex h-10 w-[34px] items-center justify-center overflow-hidden">
          <span className="relative block size-7 shrink-0 overflow-hidden">
            <img src={feedSearch} alt="" aria-hidden="true" className="absolute inset-0 block size-7 max-h-7 max-w-7" />
          </span>
        </button>
        <button type="button" aria-label="알림" onClick={() => navigate('/notifications')} className="flex h-10 w-[34px] items-center justify-center overflow-hidden">
          <span className="relative block size-[27px] shrink-0 overflow-hidden">
            <NotificationBellIcon tone="wine" className="absolute inset-0 block size-[27px] max-h-[27px] max-w-[27px]" />
          </span>
        </button>
      </div>
    </header>
  )
}
