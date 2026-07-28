import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import ChatbotOrb from './ChatbotOrb'

export type QuickAction = '기록' | '피드' | '찾기'

type NavItem = {
  label: string
  outlineWidth: number
  outlineHeight: number
  filledWidth: number
  filledHeight: number
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
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427 106"><path d="M371.828 20H281.054C267.509 20 254.819 26.4598 247.871 37.2425C240.887 48.0747 228.107 55.3348 213.5 55.3348C198.893 55.3348 186.122 48.083 179.129 37.2425C172.181 26.4598 159.491 20 145.946 20H55.172C35.75 20.4208 20 35.0975 20 53C20 70.9025 35.75 85.5793 55.172 86H371.828C391.25 85.5793 407 70.9025 407 53C407 35.0975 391.25 20.4208 371.828 20Z" fill="none" stroke="#fff" stroke-width="0.7"/></svg>'

const ringMaskDataUri = `url("data:image/svg+xml,${encodeURIComponent(ringMaskSvg)}")`

const quickActions: Array<{
  label: QuickAction
  left: number
  top: number
}> = [
  { label: '기록', left: 133, top: -38 },
  { label: '피드', left: 215, top: -85 },
  { label: '찾기', left: 297, top: -38 },
]

const navItems: NavItem[] = [
  {
    label: '홈',
    outlineWidth: 20,
    outlineHeight: 20,
    filledWidth: 20.6,
    filledHeight: 20.19,
    centerX: 52.5,
    iconTop: 62.63,
    labelTop: 26.02,
  },
  {
    label: '리스트',
    outlineWidth: 12,
    outlineHeight: 20,
    filledWidth: 12.6,
    filledHeight: 20.6,
    centerX: 126,
    iconTop: 62.63,
    labelTop: 26.02,
  },
  {
    label: '라운지',
    outlineWidth: 20,
    outlineHeight: 18,
    filledWidth: 20.6,
    filledHeight: 19.6,
    centerX: 303,
    iconTop: 65.65,
    labelTop: 23,
  },
  {
    label: '마이',
    outlineWidth: 15,
    outlineHeight: 20,
    filledWidth: 15.6,
    filledHeight: 20.6,
    centerX: 380,
    iconTop: 65.65,
    labelTop: 23,
  },
]

function NavIcon({ label, active }: { label: string; active: boolean }) {
  if (label === '홈') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-full">
        {active ? (
          <path d="M10 12.24c1.38 0 2.5 1.1 2.5 2.45v4.9h-5v-4.9c0-1.35 1.12-2.45 2.5-2.45Zm-2.45-11.2a3.44 3.44 0 0 1 4.9.19l7.08 7.5c.3.3.47.71.47 1.13v7.45c0 1.35-1.12 2.45-2.5 2.45h-3.33v-5.05a4.12 4.12 0 0 0-4.07-3.95 4.12 4.12 0 0 0-4.27 3.95v5.05H2.5C1.12 19.76 0 18.66 0 17.31V9.88c0-.43.17-.84.48-1.15l7.07-7.5.2-.19Z" />
        ) : (
          <path d="m19.27 7.54-6.32-6.32A4.17 4.17 0 0 0 10 0a4.17 4.17 0 0 0-2.95 1.22L.73 7.54A2.5 2.5 0 0 0 0 9.31v8.19A2.5 2.5 0 0 0 2.5 20h15a2.5 2.5 0 0 0 2.5-2.5V9.31a2.5 2.5 0 0 0-.73-1.77ZM12.5 18.33h-5v-3.28a2.5 2.5 0 0 1 5 0v3.28Zm5.83-.83c0 .46-.37.83-.83.83h-3.33v-3.28a4.17 4.17 0 0 0-8.34 0v3.28H2.5a.83.83 0 0 1-.83-.83V9.31c0-.22.09-.43.24-.59L8.23 2.4a2.5 2.5 0 0 1 3.54 0l6.32 6.33c.15.15.24.37.24.58v8.19Z" />
        )}
      </svg>
    )
  }

  if (label === '리스트') {
    return (
      <svg viewBox="0 0 12 20" fill="currentColor" aria-hidden="true" className="size-full">
        {active ? (
          <path d="M8.59 0a2.58 2.58 0 0 1 2.58 2.41l.17 1.84H.66l.17-1.84A2.58 2.58 0 0 1 3.41 0h5.18ZM12 10.2a5.94 5.94 0 0 1-4.89 5.52v2.23h2.3a.98.98 0 1 1 0 1.9H2.88a.98.98 0 1 1 0-1.9h2.3v-2.23A5.98 5.98 0 0 1 0 10l.37-4.03h11.26L12 10.2Z" />
        ) : (
          <path d="M9.43 18.33H6.86v-2.57A5.9 5.9 0 0 0 12 9.91l-.72-7.64A2.56 2.56 0 0 0 8.72 0H3.28A2.56 2.56 0 0 0 .72 2.27L0 9.98a5.9 5.9 0 0 0 5.14 5.78v2.57H2.57a.84.84 0 0 0 0 1.67h6.86a.84.84 0 0 0 0-1.67ZM3.28 1.67h5.44c.45 0 .82.32.86.75l.16 1.75H2.26l.17-1.75c.04-.43.4-.75.85-.75ZM1.71 10.06l.4-4.23H9.9l.39 4.15a4.29 4.29 0 0 1-8.58.08Z" />
        )}
      </svg>
    )
  }

  if (label === '라운지') {
    return (
      <svg viewBox="0 0 20 18" fill="currentColor" aria-hidden="true" className="size-full">
        {active ? (
          <path d="M17.8 7.3A1.8 1.8 0 0 1 20 9.1v3.18c0 1.32-.64 2.5-1.62 3.25v1.53a.96.96 0 1 1-1.92 0v-.71c-.22.03-.44.05-.67.05H4.42c-.23 0-.45-.02-.67-.05v.71a.96.96 0 1 1-1.92 0v-1.53A4.07 4.07 0 0 1 .2 12.28V9.1a1.8 1.8 0 0 1 2.2-1.8c.89.14 1.48.95 1.48 1.8v3.1c0 .37.3.66.67.66h11.38c.36 0 .67-.3.67-.66V9.1c0-.85.59-1.66 1.48-1.8ZM13.36.14c2.78 0 5.02 2.2 5.02 4.92V6h-.15a3.15 3.15 0 0 0-3.1 3.05v2.53H5.08V9.05A3.15 3.15 0 0 0 1.98 6h-.15v-.94c0-2.71 2.25-4.92 5.03-4.92h6.5Z" />
        ) : (
          <path d="M18.33 6.69V4.91A5 5 0 0 0 13.33 0H6.67a5 5 0 0 0-5 4.91v1.78A2.45 2.45 0 0 0 0 9v3.27c0 1.34.66 2.53 1.67 3.27v1.64a.83.83 0 1 0 1.66 0v-.9c.27.06.55.08.84.08h11.66c.29 0 .57-.02.84-.08v.9a.83.83 0 1 0 1.66 0v-1.64A4.08 4.08 0 0 0 20 12.27V9c0-1.07-.7-1.98-1.67-2.31ZM6.67 1.64h6.66a3.32 3.32 0 0 1 3.34 3.27v1.78A2.45 2.45 0 0 0 15 9v1.64H5V9c0-1.07-.7-1.98-1.67-2.31V4.91a3.32 3.32 0 0 1 3.34-3.27Zm11.66 10.63a2.48 2.48 0 0 1-2.5 2.46H4.17a2.48 2.48 0 0 1-2.5-2.46V9a.83.83 0 1 1 1.66 0v2.45c0 .45.38.82.84.82h11.66c.46 0 .84-.37.84-.82V9a.83.83 0 1 1 1.66 0v3.27Z" />
        )}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 15 20" fill="currentColor" aria-hidden="true" className="size-full">
      {active ? (
        <path d="M7.5 11.47A7.5 7.5 0 0 1 15 19a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1 7.5 7.5 0 0 1 7.5-7.53ZM7.5 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
      ) : (
        <>
          <path d="M7.5 9.8a5 5 0 1 0 0-9.8 5 5 0 0 0 0 9.8Zm0-8.17a3.27 3.27 0 1 1 0 6.53 3.27 3.27 0 0 1 0-6.53Z" />
          <path d="M7.5 11.43A7.6 7.6 0 0 0 0 19.14a.84.84 0 0 0 1.67 0 5.84 5.84 0 1 1 11.66 0 .84.84 0 0 0 1.67 0 7.6 7.6 0 0 0-7.5-7.71Z" />
        </>
      )}
    </svg>
  )
}

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
      className={`absolute z-10 flex h-[48px] w-16 -translate-x-1/2 flex-col items-center text-[12px] leading-[1.55] tracking-[-0.24px] transition-colors focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e000e] ${
        active ? 'text-[#4e000e]' : 'text-[#b2b2b2]'
      }`}
      style={position}
      {...props}
    >
      <span
        aria-hidden="true"
        className="block shrink-0"
        style={{
          width: active ? item.filledWidth : item.outlineWidth,
          height: active ? item.filledHeight : item.outlineHeight,
        }}
      >
        <NavIcon label={item.label} active={active} />
      </span>
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
            WebkitBackdropFilter: 'blur(3px)',
            backdropFilter: 'blur(3px)',
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
              'conic-gradient(from 0deg, rgb(255 255 255 / 12%) 0deg, rgb(255 255 255 / 8%) 60deg, rgb(255 255 255 / 100%) 120deg, rgb(255 255 255 / 20%) 180deg, rgb(255 255 255 / 8%) 240deg, rgb(255 255 255 / 100%) 300deg, rgb(255 255 255 / 12%) 360deg)',
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
              className="glass-tab absolute z-10 flex size-[69px] -translate-x-1/2 items-center justify-center rounded-full text-xs font-medium tracking-[-0.24px] text-white transition-[transform,filter,background-color,border-color,box-shadow] duration-100 ease-out hover:scale-105 active:scale-[0.94] active:border-white/30 active:bg-white/[0.04] active:brightness-90 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.18),inset_1px_1px_0_rgba(255,255,255,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
        className={`absolute left-1/2 z-20 -translate-x-1/2 select-none rounded-full transition-[transform,filter] duration-100 ease-out hover:scale-105 active:scale-[0.95] active:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
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
