import { useEffect, useState } from 'react'
import filterBackIcon from '../assets/list/filter-back.svg'

export type WineFilters = {
  types: string[]
  countries: string[]
  grapes: string[]
  maxPrice: number
}

const WINE_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'red', label: '레드' },
  { value: 'white', label: '화이트' },
  { value: 'rose', label: '로제' },
  { value: 'sparkling', label: '스파클링' },
]

// 더미데이터(dummy data/wines.json) 상에서 실제로 등장하는 나라 중 상위 빈도 국가
const COUNTRY_OPTIONS = ['미국', '프랑스', '이탈리아', '칠레', '호주', '스페인', '뉴질랜드']

// 더미데이터 상에서 실제로 등장하는 단일 품종 중 상위 빈도 품종
const GRAPE_OPTIONS = [
  '샤르도네',
  '피노누아',
  '리슬링',
  '소비뇽 블랑',
  '카베르네 소비뇽',
]

const PRICE_STEPS = [10000, 50000, 100000, 300000, 500000, 1000000]
const PRICE_LABELS = ['1만원', '5만원', '10만원', '30만원', '50만원', '100만원']
const DEFAULT_PRICE_INDEX = 3

type FilterSheetProps = {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: WineFilters) => void
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[31px] items-center justify-center rounded-full border px-[21px] text-[14px] leading-5 font-medium whitespace-nowrap shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${
        selected ? 'border-[#831317] bg-[#831317] text-white' : 'border-[#f3f4f6] bg-white text-[#6b7280]'
      }`}
    >
      {label}
    </button>
  )
}

function FilterSheet({ isOpen, onClose, onApply }: FilterSheetProps) {
  const [types, setTypes] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [grapes, setGrapes] = useState<string[]>([])
  const [priceIndex, setPriceIndex] = useState(DEFAULT_PRICE_INDEX)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function handleReset() {
    setTypes([])
    setCountries([])
    setGrapes([])
    setPriceIndex(DEFAULT_PRICE_INDEX)
  }

  function handleApply() {
    onApply({ types, countries, grapes, maxPrice: PRICE_STEPS[priceIndex] })
    onClose()
  }

  const priceHandlePercent = (priceIndex / (PRICE_STEPS.length - 1)) * 100

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        aria-label="필터 닫기"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-[rgba(152,152,152,0.55)] backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 mx-auto h-[min(724px,calc(100dvh/var(--app-zoom)))] w-full max-w-107.5 overflow-hidden rounded-t-[30px] bg-white/70 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-[73px] border-b border-[#f3f4f6]">
          <div className="absolute top-2 left-[194px] h-[3px] w-9 rounded-full bg-[#d9d9d9]" />
          <button type="button" aria-label="필터 닫기" onClick={onClose} className="absolute top-1/2 left-[9px] flex size-10 -translate-y-1/2 items-center justify-center">
            <img src={filterBackIcon} alt="" className="size-6" />
          </button>
          <h2 className="absolute top-1/2 left-1/2 -translate-1/2 text-[18px] leading-7 font-bold text-[#831317]">필터</h2>
          <button type="button" aria-label="필터 닫기" onClick={onClose} className="absolute top-1/2 right-5 flex size-6 -translate-y-1/2 items-center justify-center text-[#831317]">
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>

        <div className="absolute top-[97px] right-5 left-5">
          <section>
            <h3 className="text-[18px] leading-6 font-bold text-[#831317]">가격</h3>
            <div className="mt-4 flex h-4 items-start justify-between text-[12px] leading-4">
              {PRICE_LABELS.map((label, index) => (
                <span key={label} className={index === priceIndex ? 'font-medium text-[#831317]' : 'font-normal text-[#1f2937]'}>
                  {label}
                </span>
              ))}
            </div>
            <div className="relative mt-0.5 h-6">
              <input
                type="range"
                min={0}
                max={PRICE_STEPS.length - 1}
                step={1}
                value={priceIndex}
                onChange={(event) => setPriceIndex(Number(event.target.value))}
                className="absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 cursor-pointer opacity-0"
              />
              <div className="absolute inset-x-0 top-[14px] h-1 rounded-[2px] bg-[#e5e7eb]" />
              <div
                className="absolute top-[14px] h-1 rounded-[2px] bg-[#831317]"
                style={{ width: `${priceHandlePercent}%` }}
              />
              <div
                className="absolute top-2 size-4 -translate-x-1/2 rounded-full border border-[#831317] bg-white"
                style={{ left: `${priceHandlePercent}%` }}
              />
            </div>
          </section>

          <section className="mt-4">
            <h3 className="text-[18px] leading-6 font-bold text-[#831317]">와인 종류</h3>
            <div className="mt-4 flex gap-2.5">
              {WINE_TYPE_OPTIONS.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={types.includes(option.value)}
                  onClick={() => setTypes((prev) => toggleValue(prev, option.value))}
                />
              ))}
            </div>
          </section>

          <section className="mt-[37px]">
            <h3 className="text-[18px] leading-6 font-bold text-[#831317]">나라</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {COUNTRY_OPTIONS.map((country) => (
                <Chip
                  key={country}
                  label={country}
                  selected={countries.includes(country)}
                  onClick={() => setCountries((prev) => toggleValue(prev, country))}
                />
              ))}
            </div>
          </section>

          <section className="mt-[76px]">
            <div className="flex flex-wrap gap-2.5">
              {GRAPE_OPTIONS.map((grape, index) => (
                <Chip
                  key={`${grape}-${index}`}
                  label={grape}
                  selected={grapes.includes(grape)}
                  onClick={() => setGrapes((prev) => toggleValue(prev, grape))}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="absolute top-[631px] right-5 left-5 flex gap-2.5">
          <button
            type="button"
            onClick={handleApply}
            className="h-[38px] flex-1 rounded-[9px] bg-[#851317] text-[12px] font-bold tracking-[-0.24px] text-white"
          >
            적용하기
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="h-[38px] flex-1 rounded-[9px] border border-[#841317] bg-white text-[12px] font-bold tracking-[-0.24px] text-[#6b7280]"
          >
            초기화하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSheet
