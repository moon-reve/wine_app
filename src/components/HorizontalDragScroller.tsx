import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

type DragState = {
  pointerId: number
  startX: number
  scrollLeft: number
  moved: boolean
}

type HorizontalDragScrollerProps = {
  children: ReactNode
  className?: string
}

export default function HorizontalDragScroller({ children, className = '' }: HorizontalDragScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const suppressClickRef = useRef(false)

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    if (drag.moved) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragRef.current = null
  }

  return (
    <div
      ref={scrollerRef}
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse' || event.button !== 0 || !scrollerRef.current) return
        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          scrollLeft: scrollerRef.current.scrollLeft,
          moved: false,
        }
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current
        const scroller = scrollerRef.current
        if (!drag || drag.pointerId !== event.pointerId || !scroller) return

        const distance = event.clientX - drag.startX
        if (!drag.moved && Math.abs(distance) > 5) {
          drag.moved = true
          event.currentTarget.setPointerCapture(event.pointerId)
        }
        if (!drag.moved) return

        event.preventDefault()
        scroller.scrollLeft = drag.scrollLeft - distance
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onClickCapture={(event) => {
        if (!suppressClickRef.current) return
        event.preventDefault()
        event.stopPropagation()
        suppressClickRef.current = false
      }}
      className={`cursor-grab select-none active:cursor-grabbing ${className}`}
    >
      {children}
    </div>
  )
}
