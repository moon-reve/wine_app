import { useEffect, useRef } from 'react'
import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import ChatbotOrb from './ChatbotOrb'

export type QuickAction = '기록' | '피드' | '찾기'

type NavItem = {
  label: string
  icon: string
  width: number
  height: number
  centerX: number
  iconTop: number
  labelTop: number
}

type NavProps = {
  activeItem?: string
  onItemClick?: (label: string) => void
  onAddClick?: () => void
  onQuickActionClick?: (action: QuickAction) => void
  onChatbotOpen?: () => void
  expanded?: boolean
  className?: string
}

const quickActions: Array<{
  label: QuickAction
  left: number
  top: number
}> = [
  { label: '기록', left: 142, top: -53 },
  { label: '피드', left: 215, top: -78 },
  { label: '찾기', left: 288, top: -53 },
]

const navItems: NavItem[] = [
  {
    label: '홈',
    icon: '/nav-assets/home-figma.svg',
    width: 24.75,
    height: 24.24,
    centerX: 52.5,
    iconTop: 51,
    labelTop: 27,
  },
  {
    label: '리스트',
    icon: '/nav-assets/list-figma.svg',
    width: 24.24,
    height: 24.24,
    centerX: 126,
    iconTop: 51,
    labelTop: 27,
  },
  {
    label: '라운지',
    icon: '/nav-assets/lounge-figma.svg',
    width: 26.26,
    height: 24.24,
    centerX: 303,
    iconTop: 54,
    labelTop: 24,
  },
  {
    label: '마이',
    icon: '/nav-assets/person-figma.svg',
    width: 18.18,
    height: 24.24,
    centerX: 380,
    iconTop: 51,
    labelTop: 27,
  },
]

function NavButton({
  item,
  active,
  ...props
}: {
  item: NavItem
  active: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const position = {
    left: `${(item.centerX / 430) * 100}%`,
    top: item.iconTop,
  } satisfies CSSProperties

  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={`absolute flex h-[48px] w-16 -translate-x-1/2 flex-col items-center text-[10px] leading-[15.5px] tracking-[-0.2px] transition-colors focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
        active ? 'text-[#831317]' : 'text-[#b2b2b2]'
      }`}
      style={position}
      {...props}
    >
      <span
        aria-hidden="true"
        className="block shrink-0 bg-current"
        style={{
          width: item.width,
          height: item.height,
          WebkitMaskImage: `url(${item.icon})`,
          maskImage: `url(${item.icon})`,
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
      <span
        className="absolute whitespace-nowrap font-medium"
        style={{ top: item.labelTop }}
      >
        {item.label}
      </span>
    </button>
  )
}

export default function BottomNav({
  activeItem = '홈',
  onItemClick,
  onAddClick,
  onQuickActionClick,
  onChatbotOpen,
  expanded = false,
  className = '',
}: NavProps) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  const cancelLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    longPressTimer.current = null
  }

  const startLongPress = () => {
    if (!expanded) return

    cancelLongPress()
    didLongPress.current = false
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true
      onChatbotOpen?.()
    }, 600)
  }

  useEffect(() => cancelLongPress, [])

  return (
    <nav
      aria-label="하단 메뉴"
      data-node-id="1542:1659"
      className={`fixed inset-x-0 bottom-0 z-50 mx-auto h-28 w-full max-w-[430px] ${className}`}
    >
      <img
        src="/nav-assets/bottom-nav-bg.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-[92px] w-[calc(100%+12px)] max-w-none"
      />

      {navItems.map((item) => (
        <NavButton
          key={item.label}
          item={item}
          active={activeItem === item.label || (item.label === '마이' && activeItem === 'MY')}
          onClick={() => onItemClick?.(item.label === '마이' ? 'MY' : item.label)}
        />
      ))}

      {expanded ? (
        <div id="bottom-nav-quick-actions" aria-label="빠른 메뉴">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onQuickActionClick?.(action.label)}
              className="absolute z-10 flex size-[69px] -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-medium tracking-[-0.24px] text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.22),inset_-1px_-1px_0_rgba(255,255,255,0.06),0_4px_14px_rgba(0,0,0,0.08)] backdrop-blur-[12px] backdrop-saturate-150 transition-[transform,filter,background-color,border-color,box-shadow] duration-100 ease-out hover:scale-105 active:scale-[0.94] active:border-white/30 active:bg-white/[0.04] active:brightness-90 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.18),inset_1px_1px_0_rgba(255,255,255,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{
                left: `${(action.left / 430) * 100}%`,
                top: action.top,
              }}
            >
              <span className="relative z-10">{action.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        aria-label={expanded ? '빠른 메뉴 닫기' : '빠른 메뉴 열기'}
        aria-expanded={expanded}
        aria-controls="bottom-nav-quick-actions"
        onClick={() => {
          if (didLongPress.current) {
            didLongPress.current = false
            return
          }
          onAddClick?.()
        }}
        onPointerDown={startLongPress}
        onPointerUp={cancelLongPress}
        onPointerCancel={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onContextMenu={(event) => {
          if (expanded) event.preventDefault()
        }}
        className={`absolute left-1/2 -translate-x-1/2 select-none rounded-full transition-[transform,filter] duration-100 ease-out hover:scale-105 active:scale-[0.95] active:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
          expanded ? '-top-3 size-[88px] touch-none' : 'top-0 size-16 touch-manipulation'
        }`}
      >
        {expanded ? (
          <ChatbotOrb
            size={88}
            dataNodeId="1599:1054"
            edgeSweep
            spinFrames
          />
        ) : (
          <>
            <img
              src="/nav-assets/add-background-figma.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-16"
            />
            <img
              src="/nav-assets/add-figma.svg"
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-[19.83px] -translate-x-1/2 -translate-y-1/2"
            />
          </>
        )}
      </button>
    </nav>
  )
}
