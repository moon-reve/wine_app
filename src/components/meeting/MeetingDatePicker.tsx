import { useEffect, useState } from 'react'

type MeetingDatePickerProps = {
  open: boolean
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

function toDateValue(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function MeetingDatePicker({ open, value, onChange, onClose }: MeetingDatePickerProps) {
  const [calendarMonth, setCalendarMonth] = useState(() => (value ? new Date(value) : new Date()))

  useEffect(() => {
    if (!open) return
    setCalendarMonth(value ? new Date(value) : new Date())
  }, [open, value])

  if (!open) return null

  const year = calendarMonth.getFullYear()
  const monthIndex = calendarMonth.getMonth()
  const firstDay = new Date(year, monthIndex, 1).getDay()
  const lastDate = new Date(year, monthIndex + 1, 0).getDate()
  const calendarDays = [...Array(firstDay).fill(null), ...Array.from({ length: lastDate }, (_, index) => index + 1)]

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/25 px-3"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="날짜 선택"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[406px] rounded-[20px] bg-white px-5 pb-5 pt-4 text-[#121212] shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
      >
        <div className="mb-4 flex items-center justify-between px-1">
          <strong className="text-[15px]">{year}년 {monthIndex + 1}월</strong>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="이전 달"
              onClick={() => setCalendarMonth(new Date(year, monthIndex - 1, 1))}
              className="flex size-9 items-center justify-center rounded-full bg-[#f6f3f3] text-lg text-[#831317]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="다음 달"
              onClick={() => setCalendarMonth(new Date(year, monthIndex + 1, 1))}
              className="flex size-9 items-center justify-center rounded-full bg-[#f6f3f3] text-lg text-[#831317]"
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-1 text-center text-[13px]">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <span key={day} className="py-1 font-medium text-black/55">{day}</span>
          ))}
          {calendarDays.map((day, index) => {
            if (!day) return <span key={`empty-${index}`} className="size-10" />
            const dayValue = toDateValue(year, monthIndex + 1, day)
            return (
              <button
                type="button"
                key={dayValue}
                onClick={() => {
                  onChange(dayValue)
                  onClose()
                }}
                className={`mx-auto flex size-10 items-center justify-center rounded-full text-[14px] ${
                  value === dayValue ? 'bg-[#831317] font-semibold text-white' : 'hover:bg-[#f6f3f3]'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex justify-between border-t border-black/10 pt-3">
          <button type="button" onClick={() => onChange('')} className="px-2 py-1 text-[13px] text-black/45">
            삭제
          </button>
          <button
            type="button"
            onClick={() => {
              const today = new Date()
              setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1))
              onChange(toDateValue(today.getFullYear(), today.getMonth() + 1, today.getDate()))
              onClose()
            }}
            className="px-2 py-1 text-[13px] font-medium text-[#831317]"
          >
            오늘
          </button>
        </div>
      </section>
    </div>
  )
}
