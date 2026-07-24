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

const glassGeometry: CSSProperties = {
  left: '-20.16px',
  bottom: '-20.16px',
  width: 'calc(100% + 40.31px)',
  height: '106.82px',
}

const glassMaskSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427 106"><path d="M371.828 20H281.054C267.509 20 254.819 26.4598 247.871 37.2425C240.887 48.0747 228.107 55.3348 213.5 55.3348C198.893 55.3348 186.122 48.083 179.129 37.2425C172.181 26.4598 159.491 20 145.946 20H55.172C35.75 20.4208 20 35.0975 20 53C20 70.9025 35.75 85.5793 55.172 86H371.828C391.25 85.5793 407 70.9025 407 53C407 35.0975 391.25 20.4208 371.828 20Z" fill="#fff"/></svg>'

const glassMaskDataUri = `url("data:image/svg+xml,${encodeURIComponent(glassMaskSvg)}")`

const ringMaskSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427 106"><path d="M371.828 20H281.054C267.509 20 254.819 26.4598 247.871 37.2425C240.887 48.0747 228.107 55.3348 213.5 55.3348C198.893 55.3348 186.122 48.083 179.129 37.2425C172.181 26.4598 159.491 20 145.946 20H55.172C35.75 20.4208 20 35.0975 20 53C20 70.9025 35.75 85.5793 55.172 86H371.828C391.25 85.5793 407 70.9025 407 53C407 35.0975 391.25 20.4208 371.828 20Z" fill="none" stroke="#fff" stroke-width="0.8"/></svg>'

const ringMaskDataUri = `url("data:image/svg+xml,${encodeURIComponent(ringMaskSvg)}")`

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
    width: 20.42,
    height: 20,
    centerX: 52.5,
    iconTop: 62.63,
    labelTop: 26.02,
  },
  {
    label: '리스트',
    icon: '/nav-assets/list-figma.svg',
    width: 20,
    height: 20,
    centerX: 126,
    iconTop: 62.63,
    labelTop: 26.02,
  },
  {
    label: '라운지',
    icon: '/nav-assets/lounge-figma.svg',
    width: 22.22,
    height: 20,
    centerX: 303,
    iconTop: 65.65,
    labelTop: 23,
  },
  {
    label: '마이',
    icon: '/nav-assets/person-figma.svg',
    width: 15,
    height: 20,
    centerX: 380,
    iconTop: 65.65,
    labelTop: 23,
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
      className={`absolute flex h-[48px] w-16 -translate-x-1/2 flex-col items-center text-[12px] leading-[1.55] tracking-[-0.24px] transition-colors focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
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
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-medium"
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
  return (
    <nav
      aria-label="하단 메뉴"
      data-node-id="1542:1659"
      className={`fixed inset-x-0 bottom-[15px] z-50 mx-auto h-28 w-full max-w-[390px] ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute" style={glassGeometry}>
        <img
          src="/nav-assets/bottom-nav-glow.svg"
          alt=""
          className="absolute inset-0 size-full max-w-none"
        />
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: glassMaskDataUri,
            maskImage: glassMaskDataUri,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            backgroundColor: 'rgba(0,0,0,0.01)',
            WebkitBackdropFilter: 'blur(1px)',
            backdropFilter: 'blur(1px)',
          } as CSSProperties}
        />
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: ringMaskDataUri,
            maskImage: ringMaskDataUri,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.25) 100%)',
          } as CSSProperties}
        />
      </div>

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
        aria-label={expanded ? 'AI 챗봇 열기' : '빠른 메뉴 열기'}
        aria-expanded={expanded}
        aria-controls="bottom-nav-quick-actions"
        onClick={() => {
          if (expanded) onChatbotOpen?.()
          else onAddClick?.()
        }}
        className={`absolute left-1/2 -translate-x-1/2 select-none rounded-full transition-[transform,filter] duration-100 ease-out hover:scale-105 active:scale-[0.95] active:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
          expanded ? '-top-3 size-[88px] touch-manipulation' : 'top-[7.2px] size-16 touch-manipulation'
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
