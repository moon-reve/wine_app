import type { ButtonHTMLAttributes } from 'react'
import activatedHomeIcon from '../../icon/Activated_Home.svg'
import activatedListIcon from '../../icon/Activated_List.svg'
import activatedLoungeIcon from '../../icon/Activated_Lounge.svg'
import activatedMyIcon from '../../icon/Activated_My.svg'

type NavItem = {
  label: string
  icon: string
  activeIcon?: string
}

type NavProps = {
  activeItem?: string
  onItemClick?: (label: string) => void
  onAddClick?: () => void
  className?: string
}

const navItems: NavItem[] = [
  { label: '홈', icon: '/nav-assets/home.svg', activeIcon: activatedHomeIcon },
  { label: '리스트', icon: '/nav-assets/list.svg', activeIcon: activatedListIcon },
  { label: '라운지', icon: '/nav-assets/lounge.svg', activeIcon: activatedLoungeIcon },
  { label: 'MY', icon: '/nav-assets/person.svg', activeIcon: activatedMyIcon },
]

function NavButton({
  item,
  active,
  ...props
}: { item: NavItem; active: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={`flex h-[41px] min-w-12 flex-col items-center justify-start gap-0.5 text-xs transition hover:text-neutral-700 focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700 ${active ? 'text-[#831317]' : 'text-[#b2b2b2]'}`}
      {...props}
    >
      <img className="size-6" src={active && item.activeIcon ? item.activeIcon : item.icon} alt="" aria-hidden="true" />
      <span>{item.label}</span>
    </button>
  )
}

export default function BottomNav({
  activeItem = '홈',
  onItemClick,
  onAddClick,
  className = '',
}: NavProps) {
  return (
    <nav
      aria-label="하단 메뉴"
      data-node-id="595:511"
      className={`fixed right-5 bottom-[calc(20px+env(safe-area-inset-bottom))] left-5 z-50 mx-auto h-16 max-w-[390px] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-[4.56px] bottom-3 rounded-full blur-[37px]" />
      <div className="pointer-events-none absolute inset-x-0 top-1 bottom-[12.56px] rounded-full backdrop-blur-[25px]" />
      <div className="pointer-events-none absolute inset-x-[5px] top-[6.79px] bottom-[15.35px] rounded-full backdrop-blur-[25px]" />
      <div className="pointer-events-none absolute inset-x-2.5 top-[9.58px] bottom-[18.14px] rounded-full backdrop-blur-[25px]" />
      <div className="pointer-events-none absolute inset-x-[15px] top-[12.37px] bottom-[20.93px] rounded-full blur-[5px] backdrop-blur-[0.5px]" />
      <div className="pointer-events-none absolute inset-x-0 inset-y-1 rounded-full bg-[rgba(215,215,215,0.28)] shadow-[0_0_10px_4px_rgba(176,176,176,0.25)]" />

      <div className="absolute inset-x-5 top-[11px] grid h-[41px] grid-cols-[1fr_1fr_72px_1fr_1fr] items-start">
        {navItems.slice(0, 2).map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}

        <div aria-hidden />

        {navItems.slice(2).map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}
      </div>

      <button
          type="button"
          aria-label="추가"
          onClick={onAddClick}
          className="absolute bottom-0 left-1/2 size-16 -translate-x-1/2 rounded-full transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
        >
          <img className="absolute inset-[-6px] size-[76px] max-w-none" src="/nav-assets/add-background.svg" alt="" aria-hidden="true" />
          <img
            className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2"
            src="/nav-assets/add.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
    </nav>
  )
}
