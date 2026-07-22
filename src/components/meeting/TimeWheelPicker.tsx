import { useEffect, useState } from 'react'

type TimeWheelPickerProps = {
  open: boolean
  title: string
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

const hours = Array.from({ length: 12 }, (_, index) => index + 1)
const minutes = Array.from({ length: 60 }, (_, index) => index)

function parseTime(value: string) {
  const [hourText = '19', minuteText = '0'] = value.split(':')
  const hour24 = Number(hourText)
  return {
    period: hour24 >= 12 ? '오후' : '오전',
    hour: hour24 % 12 || 12,
    minute: Number(minuteText) || 0,
  }
}

export default function TimeWheelPicker({ open, title, value, onChange, onClose }: TimeWheelPickerProps) {
  const initial = parseTime(value)
  const [period, setPeriod] = useState(initial.period)
  const [hour, setHour] = useState(initial.hour)
  const [minute, setMinute] = useState(initial.minute)

  useEffect(() => {
    if (!open) return
    const next = parseTime(value)
    setPeriod(next.period)
    setHour(next.hour)
    setMinute(next.minute)
  }, [open, value])

  if (!open) return null

  const confirm = () => {
    const hour24 = period === '오후' ? (hour % 12) + 12 : hour % 12
    onChange(`${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
    onClose()
  }

  const wheelClass = 'h-44 snap-y snap-mandatory overflow-y-auto rounded-[14px] bg-[#f8f7f6] py-[66px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
  const itemClass = (selected: boolean) => `flex h-11 w-full snap-center items-center justify-center rounded-[10px] text-[16px] ${selected ? 'bg-white font-bold text-[#831317] shadow-sm' : 'text-[#9a9a9a]'}`

  return (
    <div className="fixed inset-0 z-110 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="시간 선택 닫기" onClick={onClose} className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      <section className="relative z-10 w-full max-w-[430px] rounded-t-[24px] bg-white px-5 pt-6 pb-[max(28px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#d9d9d9]" />
        <h2 className="text-center text-[18px] font-bold text-[#0d0d0d]">{title}</h2>
        <div className="relative mt-5 grid grid-cols-[0.8fr_1fr_1fr] gap-2">
          <div className={wheelClass} aria-label="오전 오후 선택">
            {['오전', '오후'].map((item) => (
              <button key={item} type="button" onClick={() => setPeriod(item)} className={itemClass(period === item)}>{item}</button>
            ))}
          </div>
          <div className={wheelClass} aria-label="시 선택">
            {hours.map((item) => (
              <button key={item} type="button" onClick={() => setHour(item)} className={itemClass(hour === item)}>{String(item).padStart(2, '0')}시</button>
            ))}
          </div>
          <div className={wheelClass} aria-label="분 선택">
            {minutes.map((item) => (
              <button key={item} type="button" onClick={() => setMinute(item)} className={itemClass(minute === item)}>{String(item).padStart(2, '0')}분</button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className="h-12 rounded-[12px] border border-[#d9d9d9] text-[15px] font-bold text-[#595959]">취소</button>
          <button type="button" onClick={confirm} className="h-12 rounded-[12px] bg-[#831317] text-[15px] font-bold text-white">선택 완료</button>
        </div>
      </section>
    </div>
  )
}
