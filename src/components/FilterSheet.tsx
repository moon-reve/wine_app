import { useEffect, useState } from 'react'

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
const COUNTRY_OPTIONS = ['프랑스', '한국', '이탈리아', '미국', '칠레', '호주', '뉴질랜드', '스페인', '독일', '포르투갈']

// 더미데이터 상에서 실제로 등장하는 단일 품종 중 상위 빈도 품종
const GRAPE_OPTIONS = [
  '샤르도네',
  '캠벨얼리',
  '카베르네 소비뇽',
  '소비뇽 블랑',
  '모스카토',
  '쉬라즈',
  '리슬링',
  '오미자',
  '청수',
  '산머루',
  '거봉',
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
      className={`rounded-full border px-[21px] py-[11px] text-[14px] leading-[20px] font-medium whitespace-nowrap ${
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
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button
        type="button"
        aria-label="필터 닫기"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-[rgba(59,59,59,0.5)] backdrop-blur-[3.5px] transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] w-full max-w-107.5 flex-col overflow-hidden rounded-t-[30px] bg-white transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex shrink-0 flex-col items-center pt-[8px]">
          <div className="h-[3px] w-[36px] rounded-full bg-[#d9d9d9]" />
          <div className="relative flex w-full items-center justify-center py-[16px]">
            <p className="text-[18px] leading-[28px] font-bold text-[#831317]">필터</p>
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="absolute right-[20px] flex size-[24px] items-center justify-center text-[#831317]"
            >
              <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <div className="h-px w-full bg-[#f3f4f6]" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-[20px]">
          <section className="pt-[20px]">
            <h2 className="text-[18px] leading-[24px] font-bold text-[#831317]">가격</h2>
            <div className="mt-[16px] flex items-start justify-between text-[12px] leading-[16px]">
              {PRICE_LABELS.map((label, index) => (
                <span key={label} className={index === priceIndex ? 'font-medium text-[#831317]' : 'text-[#1f2937]'}>
                  {label}
                </span>
              ))}
            </div>
            <div className="relative mt-[18px] h-[24px]">
              <input
                type="range"
                min={0}
                max={PRICE_STEPS.length - 1}
                step={1}
                value={priceIndex}
                onChange={(event) => setPriceIndex(Number(event.target.value))}
                className="absolute inset-x-0 top-1/2 z-10 w-full -translate-y-1/2 cursor-pointer opacity-0"
              />
              <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-[2px] bg-[#e5e7eb]" />
              <div
                className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-[2px] bg-[#831317]"
                style={{ width: `${priceHandlePercent}%` }}
              />
              <div
                className="absolute top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#831317] bg-white"
                style={{ left: `${priceHandlePercent}%` }}
              />
            </div>
          </section>

          <section className="pt-[24px]">
            <h2 className="text-[18px] leading-[24px] font-bold text-[#831317]">와인 종류</h2>
            <div className="mt-[16px] flex flex-wrap gap-[10px]">
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

          <section className="pt-[24px]">
            <h2 className="text-[18px] leading-[24px] font-bold text-[#831317]">나라</h2>
            <div className="mt-[16px] flex flex-wrap gap-[10px]">
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

          <section className="pt-[24px]">
            <h2 className="text-[18px] leading-[24px] font-bold text-[#831317]">품종</h2>
            <div className="mt-[16px] flex flex-wrap gap-[10px]">
              {GRAPE_OPTIONS.map((grape) => (
                <Chip
                  key={grape}
                  label={grape}
                  selected={grapes.includes(grape)}
                  onClick={() => setGrapes((prev) => toggleValue(prev, grape))}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="flex shrink-0 gap-[10px] border-t border-[#f3f4f6] px-5 py-[16px]">
          <button
            type="button"
            onClick={handleReset}
            className="h-[48px] flex-1 rounded-[9px] bg-white text-[12px] font-bold tracking-[-0.24px] text-[#6b7280] shadow-[0_1px_1px_rgba(0,0,0,0.05)] ring-1 ring-[#f3f4f6]"
          >
            초기화하기
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="h-[48px] flex-1 rounded-[9px] bg-[#831317] text-[12px] font-bold tracking-[-0.24px] text-white"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSheet
