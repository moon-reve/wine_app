import { useNavigate } from 'react-router-dom'
import searchIcon from '../assets/search.svg'
import lightSearchIcon from '../assets/lounge/search.svg'
import wineSearchIcon from '../assets/search/header-search.svg'
import backIcon from '../assets/todayspick/back.svg'
import Logo from './Logo'
import NotificationBellIcon from './NotificationBellIcon'

type HeaderProps = {
  tone?: 'dark' | 'light'
  titleColorClassName?: string
  wineIcons?: boolean
  showBackButton?: boolean
}

function Header({ tone = 'dark', titleColorClassName, wineIcons = false, showBackButton = false }: HeaderProps) {
  const navigate = useNavigate()
  const isLight = tone === 'light'
  const titleColor = titleColorClassName ?? (isLight ? 'text-[#831317]' : 'text-white')
  const searchIconSource = wineIcons ? wineSearchIcon : isLight ? lightSearchIcon : searchIcon
  const bellTone = wineIcons ? 'wine' : isLight ? 'light' : 'dark'

  return (
    <header
      className="flex w-full items-center justify-between px-5 pt-4.5 pb-3"
      data-node-id="577:105"
    >
      {showBackButton ? (
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="-mt-[3px] -ml-0.5 flex size-6 shrink-0 items-center justify-center"
        >
          <img src={backIcon} alt="" className="size-6 rotate-180" />
        </button>
      ) : (
        <Logo className={`h-5 w-auto shrink-0 ${titleColor}`} />
      )}

      <div className="flex shrink-0 items-center gap-1 overflow-hidden" data-node-id="577:107">
        <button
          type="button"
          aria-label="Search"
          onClick={() => navigate('/search')}
          className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          data-node-id="577:108"
        >
          <img src={searchIconSource} alt="" className="size-7 shrink-0" data-node-id="577:109" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          onClick={() => navigate('/notifications')}
          className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          data-node-id="577:112"
        >
          <NotificationBellIcon tone={bellTone} className="size-6.75 shrink-0" />
        </button>
      </div>
    </header>
  )
}

export default Header
