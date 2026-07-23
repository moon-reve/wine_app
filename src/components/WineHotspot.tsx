import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import hotspotIcon from '../assets/images/icon-group-2.svg'
import connectorIcon from '../assets/lounge/figma/wine-connector.svg'

type PositionValue = number | string

type WineHotspotProps = {
  name: string
  position: { left: PositionValue; top: PositionValue }
  calloutSide: 'left' | 'right'
  isOpen: boolean
  onToggle: () => void
  detailPath?: string
}

function cssValue(value: PositionValue) {
  return typeof value === 'number' ? `${value}px` : value
}

function offset(value: PositionValue, pixels: number) {
  return `calc(${cssValue(value)} ${pixels >= 0 ? '+' : '-'} ${Math.abs(pixels)}px)`
}

export default function WineHotspot({ name, position, calloutSide, isOpen, onToggle, detailPath }: WineHotspotProps) {
  const buttonPosition: CSSProperties = { left: position.left, top: position.top }
  const calloutTop = offset(position.top, 16)

  return (
    <>
      <button
        type="button"
        aria-label={`${name} 정보 ${isOpen ? '닫기' : '열기'}`}
        aria-expanded={isOpen}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onToggle}
        className="absolute z-20 size-[22px]"
        style={buttonPosition}
      >
        <img src={hotspotIcon} alt="" aria-hidden="true" className="block size-full" />
      </button>

      {isOpen ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          <img
            src={connectorIcon}
            alt=""
            aria-hidden="true"
            className={`absolute h-[14px] w-[49px] ${calloutSide === 'left' ? 'scale-x-[-1]' : ''}`}
            style={{ left: calloutSide === 'right' ? offset(position.left, 17) : offset(position.left, -44), top: offset(position.top, 17) }}
          />
          <div
            onPointerDown={(event) => event.stopPropagation()}
            className="pointer-events-auto absolute rounded-[22px] border border-white/55 bg-black/65 px-3 py-2 text-white backdrop-blur-[2px]"
            style={calloutSide === 'right'
              ? { left: offset(position.left, 65), top: calloutTop }
              : { right: `calc(100% - ${cssValue(position.left)} + 44px)`, top: calloutTop }}
          >
            <p className="text-xs font-medium whitespace-nowrap">#{name}</p>
            {detailPath ? (
              <Link to={detailPath} className="mt-1 block text-xs text-white underline underline-offset-2">와인 상세보기</Link>
            ) : (
              <button type="button" className="mt-1 text-xs text-white underline underline-offset-2">와인 상세보기</button>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
