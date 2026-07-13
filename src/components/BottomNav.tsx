import type { ButtonHTMLAttributes } from 'react'

type NavItem = {
  label: string
  icon: string
}

type NavProps = {
  activeItem?: string
  onItemClick?: (label: string) => void
  onAddClick?: () => void
  className?: string
}

const navItems: NavItem[] = [
  { label: '홈', icon: '/nav-assets/home.svg' },
  { label: '리스트', icon: '/nav-assets/list.svg' },
  { label: '라운지', icon: '/nav-assets/lounge.svg' },
  { label: 'MY', icon: '/nav-assets/person.svg' },
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
      className="flex h-14 min-w-12 flex-col items-center justify-center gap-0.5 text-xs text-[#b2b2b2] transition hover:text-neutral-700 focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
      {...props}
    >
      <img className="size-6" src={item.icon} alt="" aria-hidden="true" />
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
      className={`relative mx-auto h-[68px] w-full max-w-107.5 ${className}`}
    >
      <div className="absolute inset-x-0 bottom-0 h-14 rounded-full bg-[rgba(215,215,215,0.28)] shadow-[0_0_10px_4px_rgba(176,176,176,0.25)] backdrop-blur-[25px]" />

      <div className="absolute inset-x-5 bottom-0 grid h-14 grid-cols-[1fr_1fr_72px_1fr_1fr] items-center">
        {navItems.slice(0, 2).map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}

        <button
          type="button"
          aria-label="추가"
          onClick={onAddClick}
          className="relative -top-1 mx-auto size-16 rounded-full transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
        >
          <img className="absolute inset-[-6px] size-[76px] max-w-none" src="/nav-assets/add-background.svg" alt="" aria-hidden="true" />
          <img className="absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2" src="/nav-assets/add.svg" alt="" aria-hidden="true" />
        </button>

        {navItems.slice(2).map((item) => (
          <NavButton
            key={item.label}
            item={item}
            active={activeItem === item.label}
            onClick={() => onItemClick?.(item.label)}
          />
        ))}
      </div>
    </nav>
  )
}
