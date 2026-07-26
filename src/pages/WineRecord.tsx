import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import wineImage from '../assets/quick-flow/record-wine.png'
import aiIcon from '../assets/quick-flow/ai.svg'
import profileModalClose from '../assets/quick-flow/profile-modal-close.svg'
import { useWineRecords, type WineRecordEntry } from '../context/WineRecordsContext'

const MAX_WINE_IMAGES = 3

const profiles = [
  ['바디', 'Light', 'Medium', 'Full'], ['탄닌', 'Smooth', 'Medium', 'Strong'],
  ['산도', 'Soft', 'Medium', 'Acidic'], ['단맛', 'Dry', 'Off-Dry', 'Sweet'],
]

const DEFAULT_PROFILE_VALUES: Record<string, number> = { 바디: 20, 탄닌: 20, 산도: 20, 단맛: 20 }
const DEFAULT_TASTING_NOTES = { 향: '', 풍미: '', 여운: '' }
const DRAFT_STORAGE_KEY = 'wine-record-draft'

type DraftFields = {
  wineName: string
  drankDate: string
  location: string
  companions: string
  profileValues: Record<string, number>
  tastingNotes: typeof DEFAULT_TASTING_NOTES
  pairing: string
  oneLineNote: string
  detailNote: string
  rating: number
  privacy: string
}

function loadDraft(): DraftFields {
  const fallback: DraftFields = {
    wineName: '',
    drankDate: '',
    location: '',
    companions: '',
    profileValues: DEFAULT_PROFILE_VALUES,
    tastingNotes: DEFAULT_TASTING_NOTES,
    pairing: '',
    oneLineNote: '',
    detailNote: '',
    rating: 4,
    privacy: '나만보기',
  }
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<DraftFields>
    return { ...fallback, ...parsed }
  } catch {
    return fallback
  }
}

function Field({
  label,
  placeholder,
  tall = false,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  tall?: boolean
  value?: string
  onChange?: (value: string) => void
}) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-black/90">{label}</span>{tall ? <textarea placeholder={placeholder} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} className="h-[117px] w-full resize-none rounded-[10px] border border-[#d6d6d6] px-[10px] py-4 text-[13px] outline-[#831317] placeholder:text-black/20" /> : <input placeholder={placeholder} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} className="h-12 w-full rounded-[10px] border border-[#d6d6d6] px-[10px] text-[13px] outline-[#831317] placeholder:text-black/20" />}</label>
}

export default function WineRecord() {
  const navigate = useNavigate()
  const { addRecord } = useWineRecords()
  const [initialDraft] = useState(loadDraft)
  const [wineName, setWineName] = useState(initialDraft.wineName)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generateError, setGenerateError] = useState('')
  const [privacy, setPrivacy] = useState(initialDraft.privacy)
  const [profileValues, setProfileValues] = useState<Record<string, number>>(initialDraft.profileValues)
  const [tastingNotes, setTastingNotes] = useState(initialDraft.tastingNotes)
  const [location, setLocation] = useState(initialDraft.location)
  const [companions, setCompanions] = useState(initialDraft.companions)
  const [pairing, setPairing] = useState(initialDraft.pairing)
  const [oneLineNote, setOneLineNote] = useState(initialDraft.oneLineNote)
  const [detailNote, setDetailNote] = useState(initialDraft.detailNote)
  const [isDraftSaved, setIsDraftSaved] = useState(false)
  const [isProfileHelpOpen, setIsProfileHelpOpen] = useState(false)
  const [wineImages, setWineImages] = useState<{ id: string; url: string }[]>([{ id: 'default', url: wineImage }])
  const [isPhotoSourceOpen, setIsPhotoSourceOpen] = useState(false)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [rating, setRating] = useState(initialDraft.rating)
  const [drankDate, setDrankDate] = useState(initialDraft.drankDate)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(2026, 6, 1))
  const calendarYear = calendarMonth.getFullYear()
  const calendarMonthIndex = calendarMonth.getMonth()
  const firstDay = new Date(calendarYear, calendarMonthIndex, 1).getDay()
  const lastDate = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate()
  const calendarDays = [...Array(firstDay).fill(null), ...Array.from({ length: lastDate }, (_, index) => index + 1)]

  useEffect(() => {
    return () => {
      wineImages.forEach(({ url }) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addWineImages = (files: FileList | null) => {
    if (!files) return
    const availableCount = MAX_WINE_IMAGES - wineImages.length
    const selectedEntries = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, availableCount)
      .map((file) => ({ id: `${file.name}-${file.lastModified}-${Math.random()}`, url: URL.createObjectURL(file) }))

    setWineImages((current) => [...current, ...selectedEntries])

    if (cameraInputRef.current) cameraInputRef.current.value = ''
    if (galleryInputRef.current) galleryInputRef.current.value = ''
    setIsPhotoSourceOpen(false)
  }

  const removeWineImage = (index: number) => {
    setWineImages((current) => {
      const target = current[index]
      if (target?.url.startsWith('blob:')) URL.revokeObjectURL(target.url)
      return current.filter((_, imageIndex) => imageIndex !== index)
    })
  }

  const canGenerateImage = wineName.trim().length > 0 && wineImages.length < MAX_WINE_IMAGES && !isGeneratingImage

  // TODO: 실제 AI 이미지 생성 API가 정해지면 이 mock을 fetch 호출로 교체한다.
  // (OpenAI/Vercel AI Gateway 등 이미지 생성은 호출당 과금이라, 키가 준비되기
  // 전까지는 로딩만 흉내내고 기존 와인 사진을 결과로 넣어준다.)
  const handleGenerateImage = async () => {
    if (!canGenerateImage) return
    setIsGeneratingImage(true)
    setGenerateError('')
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setWineImages((current) => [...current, { id: `generated-${Date.now()}`, url: wineImage }])
    setIsGeneratingImage(false)
  }

  const handleSaveDraft = () => {
    const draft: DraftFields = {
      wineName,
      drankDate,
      location,
      companions,
      profileValues,
      tastingNotes,
      pairing,
      oneLineNote,
      detailNote,
      rating,
      privacy,
    }
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
      setIsDraftSaved(true)
      setTimeout(() => setIsDraftSaved(false), 2000)
    } catch {
      // 저장 공간이 없는 환경이면 조용히 무시한다.
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // 업로드/생성된 사진은 blob URL이라 새로고침하면 깨진다. 기본 이미지(정적 asset)만
    // 새로고침 후에도 안전하게 남으므로, 그 외에는 첫 장을 그대로 대표 이미지로 쓴다.
    const record: WineRecordEntry = {
      id: `record-${Date.now()}`,
      name: wineName.trim() || '이름 없는 와인',
      date: (drankDate || new Date().toISOString().slice(0, 10)).replaceAll('-', '.'),
      rating,
      review: oneLineNote.trim() || detailNote.trim(),
      image: wineImages[0]?.url ?? null,
      location,
      companions,
      pairing,
      tastingNotes,
      profileValues,
      privacy,
    }
    addRecord(record)
    localStorage.removeItem(DRAFT_STORAGE_KEY)
    navigate('/mypage', { state: { activeTab: 'wine' } })
  }

  return <main className="mx-auto h-[100dvh] w-full max-w-[430px] overflow-y-auto overscroll-y-contain bg-white pb-6 text-[#121212] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
    <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between bg-white px-5">
      <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="text-2xl text-[#831317]">‹</button>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-[-0.54px] text-[#831317]">기록하기</h1>
      <button type="button" onClick={handleSaveDraft} className="text-[13px] font-medium text-black/60">{isDraftSaved ? '저장됨 ✓' : '임시저장'}</button>
    </header>
    <form className="space-y-[17px] px-5 pt-6" onSubmit={handleSubmit}>
      <Field label="내가 마신 와인" placeholder="마틴자스 크릭 샤도네이" value={wineName} onChange={setWineName} />
      <section><h2 className="mb-2 text-sm font-bold">와인 사진</h2><div className="flex gap-2">
        {wineImages.length < MAX_WINE_IMAGES && (
          <button type="button" onClick={() => setIsPhotoSourceOpen(true)} className="flex size-[90px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#d9d9d9] bg-[#f9f7f7] text-black/20"><b className="text-[26px] font-normal leading-none">+</b><span className="text-[11px]">{wineImages.length}/3</span></button>
        )}
        {wineImages.map(({ id, url }, index) => (
          <div key={id} className="relative flex size-[90px] items-center justify-center overflow-hidden rounded-[10px] border border-[#d9d9d9] bg-[#f9f7f7]"><img src={url} alt="선택된 와인" className="h-[91px] w-[66px] object-cover" /><button type="button" aria-label="사진 삭제" onClick={() => removeWineImage(index)} className="absolute right-1 top-1 size-5 rounded-full bg-black/50 text-xs text-white">×</button></div>
        ))}
        {wineImages.length < MAX_WINE_IMAGES && (
          <button
            type="button"
            disabled={!canGenerateImage}
            onClick={handleGenerateImage}
            title={wineName.trim() ? undefined : '와인 이름을 먼저 입력해주세요'}
            className={`flex size-[90px] flex-col items-center justify-center gap-[7px] rounded-[10px] text-[13px] leading-4 text-white transition-colors ${
              canGenerateImage || isGeneratingImage ? 'bg-[#841317]' : 'cursor-not-allowed bg-[#d9a3a5]'
            }`}
          >
            <img src={aiIcon} alt="" className="h-4 w-[16px]" />
            {isGeneratingImage ? '생성 중...' : <>ai 자동<br />이미지 생성</>}
          </button>
        )}
      </div>
      {generateError && <p className="mt-2 text-xs text-[#831317]">{generateError}</p>}
      </section>
      <label className="block"><span className="mb-2 block text-sm font-bold text-black/90">마신 날짜</span><button type="button" onClick={() => setIsCalendarOpen(true)} className="relative flex h-12 w-full items-center rounded-[10px] border border-[#d6d6d6] px-[10px] text-left text-[13px]"><span className={drankDate ? 'text-black' : 'text-black/20'}>{drankDate || '날짜선택'}</span><span aria-hidden="true" className="absolute right-[14px] top-1/2 size-2.5 -translate-y-[65%] rotate-45 border-b border-r border-black/50" /></button></label>
      <Field label="장소(선택)" placeholder="장소를 검색하거나 직접 입력해주세요" value={location} onChange={setLocation} />
      <Field label="함께한 사람(선택)" placeholder="선택사항" value={companions} onChange={setCompanions} />
      <section><h2 className="mb-2 flex items-center gap-1 text-sm font-bold">와인 프로필 <button type="button" aria-label="와인 프로필 설명 보기" onClick={() => setIsProfileHelpOpen(true)} className="flex size-[16px] items-center justify-center rounded-full bg-[#831317] text-[11px] text-white">!</button></h2>
        <div className="space-y-3 rounded-[10px] border border-[#d6d6d6] px-[10px] pb-4 pt-5">{profiles.map(([name, low, mid, high]) => <div key={name} className="grid grid-cols-[30px_1fr] gap-[10px]"><label htmlFor={`profile-${name}`} className="text-xs font-medium">{name}</label><div><input id={`profile-${name}`} type="range" min="0" max="100" value={profileValues[name]} onChange={(event) => setProfileValues(values => ({ ...values, [name]: Number(event.target.value) }))} aria-label={`${name} 정도`} className="wine-profile-range block h-2 w-full cursor-pointer" style={{ background: `linear-gradient(to right, #9b171c 0%, #9b171c ${profileValues[name]}%, #e7e7e7 ${profileValues[name]}%, #e7e7e7 100%)` }} /><div className="mt-1 flex justify-between text-[10px] text-black/30"><span>{low}</span><span>{mid}</span><span>{high}</span></div></div></div>)}</div>
      </section>
      <section><h2 className="mb-2 text-sm font-bold">테이스팅 노트</h2><div className="space-y-[15px]">{(['향','풍미','여운'] as const).map(x => <input key={x} placeholder={x} value={tastingNotes[x]} onChange={(event) => setTastingNotes((current) => ({ ...current, [x]: event.target.value }))} className="h-12 w-full rounded-[10px] border border-[#d6d6d6] px-[10px] text-[13px] placeholder:text-black/20" />)}</div></section>
      <section><h2 className="mb-[10px] text-sm font-bold">평점</h2><div role="radiogroup" aria-label="와인 평점" className="flex w-[172px] justify-between">{[1,2,3,4,5].map(score => <button key={score} type="button" role="radio" aria-checked={rating === score} aria-label={`${score}점`} onClick={() => setRating(score)} className={`text-[30px] leading-7 transition-colors ${score <= rating ? 'text-[#9b171c]' : 'text-[#e1e1e1]'}`}>★</button>)}</div></section>
      <Field label="페어링(선택)" placeholder="선택사항" value={pairing} onChange={setPairing} /><Field label="한줄기록" placeholder="오늘의 와인을 한 문장을 남겨보세요." value={oneLineNote} onChange={setOneLineNote} /><Field label="상세 메모(선택)" placeholder="맛과 향, 음식과의 조합을 자유롭게 기록해주세요." tall value={detailNote} onChange={setDetailNote} />
      <fieldset><legend className="mb-3 text-sm font-bold">공개 범위</legend><div className="space-y-4">{['나만보기','친구 공개','전체 공개'].map(x => <label key={x} className={`flex items-center gap-2 text-sm ${privacy === x ? 'font-semibold text-[#831317]' : 'text-[#949494]'}`}><input type="radio" name="privacy" checked={privacy === x} onChange={() => setPrivacy(x)} className="accent-[#831317]" />{x}</label>)}</div></fieldset>
      <button type="submit" className="h-12 w-full rounded-[10px] bg-[#841317] text-[13px] font-bold text-white">기록 저장 하기</button>
    </form>
    {isProfileHelpOpen ? <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/35 px-5 py-5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden" onClick={() => setIsProfileHelpOpen(false)}>
      <section role="dialog" aria-modal="true" aria-labelledby="profile-help-title" onClick={(event) => event.stopPropagation()} className="relative max-h-[calc(100dvh-40px)] w-full max-w-[390px] overflow-y-auto rounded-[10px] bg-[#251b1b] px-6 pb-6 pt-10 text-white shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button type="button" aria-label="설명 닫기" onClick={() => setIsProfileHelpOpen(false)} className="absolute right-[14px] top-[14px] size-[18px]"><img src={profileModalClose} alt="" className="size-full" /></button>
        <h2 id="profile-help-title" className="mb-[18px] text-base font-bold">와인 프로필 이란?</h2>
        <div className="space-y-[14px] text-[13px] leading-normal">
          <p><b>바디:</b> 와인을 마셨을 때 입안에서 느껴지는 무게감이에요. 가벼운 바디는 신선하고 상쾌하게 느껴지며, 무거운 바디는 풍부하고 깊은 맛을 줍니다.</p>
          <p><b>탄닌:</b> 와인을 마셨을 때 느껴지는 떫은 느낌이나 쓴맛이에요. 탄닌이 강한 와인은 떫고 오래 지속되는 맛을 제공합니다.</p>
          <p><b>산도:</b> 와인을 마셨을 때 느껴지는 상큼한 맛이에요. 높은 산도는 입안을 개운하게, 낮은 산도는 부드럽고 둥근 맛을 줍니다.</p>
          <p><b>단맛:</b> 와인을 마셨을 때 느껴지는 달콤한 맛이에요. 드라이한 와인은 단맛이 거의 없고, 스위트 와인은 풍부한 달콤함을 느낄 수 있습니다.</p>
        </div>
      </section>
    </div> : null}
    {isCalendarOpen ? <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-3" onClick={() => setIsCalendarOpen(false)}>
      <section role="dialog" aria-modal="true" aria-label="날짜 선택" onClick={(event) => event.stopPropagation()} className="w-full max-w-[406px] rounded-[20px] bg-white px-5 pb-5 pt-4 text-[#121212] shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
        <div className="mb-4 flex items-center justify-between px-1"><strong className="text-[15px]">{calendarYear}년 {calendarMonthIndex + 1}월</strong><div className="flex gap-2"><button type="button" aria-label="이전 달" onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex - 1, 1))} className="flex size-9 items-center justify-center rounded-full bg-[#f6f3f3] text-lg text-[#831317]">‹</button><button type="button" aria-label="다음 달" onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex + 1, 1))} className="flex size-9 items-center justify-center rounded-full bg-[#f6f3f3] text-lg text-[#831317]">›</button></div></div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-[13px]">{['일','월','화','수','목','금','토'].map(day => <span key={day} className="py-1 font-medium text-black/55">{day}</span>)}{calendarDays.map((day, index) => day ? <button type="button" key={`${day}-${index}`} onClick={() => { setDrankDate(`${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`); setIsCalendarOpen(false) }} className={`mx-auto flex size-10 items-center justify-center rounded-full text-[14px] ${drankDate === `${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` ? 'bg-[#831317] font-semibold text-white' : 'hover:bg-[#f6f3f3]'}`}>{day}</button> : <span key={`empty-${index}`} className="size-10" />)}</div>
        <div className="mt-3 flex justify-between border-t border-black/10 pt-3"><button type="button" onClick={() => setDrankDate('')} className="px-2 py-1 text-[13px] text-black/45">삭제</button><button type="button" onClick={() => { const today = new Date(); setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1)); setDrankDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`); setIsCalendarOpen(false) }} className="px-2 py-1 text-[13px] font-medium text-[#831317]">오늘</button></div>
      </section>
    </div> : null}

    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={(event) => addWineImages(event.target.files)} />
    <input ref={galleryInputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(event) => addWineImages(event.target.files)} />

    {isPhotoSourceOpen ? <div className="fixed inset-0 z-60 mx-auto flex w-full max-w-[430px] items-end bg-black/35" role="dialog" aria-modal="true" aria-label="사진 첨부 방법 선택">
      <button type="button" className="absolute inset-0" aria-label="사진 첨부 메뉴 닫기" onClick={() => setIsPhotoSourceOpen(false)} />
      <div className="relative z-10 w-full rounded-t-[20px] bg-white px-5 pt-5 pb-8 shadow-2xl">
        <p className="mb-4 text-center text-sm font-bold text-[#0d0d0d]">사진 첨부</p>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="h-12 rounded-[12px] border border-[#d9d9d9] text-sm font-medium" onClick={() => cameraInputRef.current?.click()}>촬영</button>
          <button type="button" className="h-12 rounded-[12px] bg-[#831317] text-sm font-medium text-white" onClick={() => galleryInputRef.current?.click()}>앨범 선택</button>
        </div>
      </div>
    </div> : null}
  </main>
}
