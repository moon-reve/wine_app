import { useNavigate } from 'react-router-dom'
import bellIcon from '../assets/bell.svg'
import searchIcon from '../assets/search.svg'
import lightBellIcon from '../assets/lounge/bell.svg'
import lightSearchIcon from '../assets/lounge/search.svg'
import Logo from './Logo'

type HeaderProps = {
  tone?: 'dark' | 'light'
  titleColorClassName?: string
}

function Header({ tone = 'dark', titleColorClassName }: HeaderProps) {
  const navigate = useNavigate()
  const isLight = tone === 'light'
  const titleColor = titleColorClassName ?? (isLight ? 'text-[#831317]' : 'text-white')

  return (
    <header
      className="flex w-full items-center justify-between px-5 pt-4.5 pb-3"
      data-node-id="577:105"
    >
      <Logo className={`h-5 w-auto shrink-0 ${titleColor}`} />

      <div className="flex shrink-0 items-center gap-1 overflow-hidden" data-node-id="577:107">
        <button
          type="button"
          aria-label="Search"
          onClick={() => navigate('/search')}
          className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          data-node-id="577:108"
        >
          <img src={isLight ? lightSearchIcon : searchIcon} alt="" className="size-7 shrink-0" data-node-id="577:109" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-8.5 shrink-0 items-center justify-center overflow-hidden"
          data-node-id="577:112"
        >
          <img src={isLight ? lightBellIcon : bellIcon} alt="" className="size-6.75 shrink-0" data-node-id="577:113" />
        </button>
      </div>
    </header>
  )
}

export default Header
