import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import closeIcon from '../assets/quick-flow/close.svg'
import flashIcon from '../assets/quick-flow/flash.svg'
import settingsIcon from '../assets/quick-flow/settings.svg'
import shutterIcon from '../assets/quick-flow/shutter.svg'
import switchIcon from '../assets/quick-flow/switch.svg'
import feedCamera from '../assets/quick-flow/feed-camera.png'
import feedThumb from '../assets/quick-flow/feed-thumb.png'
import toolWine from '../assets/quick-flow/tool-wine.svg'
import toolGrid from '../assets/quick-flow/tool-grid.svg'
import toolFilter from '../assets/quick-flow/tool-filter.svg'
import { useCameraStream } from '../hooks/useCameraStream'
import { addUserFeed } from '../data/userFeeds'
import { useProfile } from '../context/ProfileContext'
import { DEMO_WINE_RECORDS, useWineRecords } from '../context/WineRecordsContext'

type FeedStep = 'intro' | 'camera' | 'edit' | 'compose'
type AspectRatio = '3:4' | '9:16' | '1:1' | 'full'

const ASPECT_RATIOS: readonly AspectRatio[] = ['3:4', '9:16', '1:1', 'full']
const ASPECT_RATIO_CSS: Record<Exclude<AspectRatio, 'full'>, string> = {
  '3:4': '3 / 4',
  '9:16': '9 / 16',
  '1:1': '1 / 1',
}

const CameraHeader = ({ onClose }: { onClose: () => void }) => <>
  <button type="button" aria-label="닫기" onClick={onClose} className="absolute left-5 top-[max(28px,env(safe-area-inset-top))] z-20 size-6"><img src={closeIcon} alt="" className="size-full" /></button>
  <img src={flashIcon} alt="플래시 끄기" className="absolute left-1/2 top-[max(28px,env(safe-area-inset-top))] z-20 h-[22px] w-[19px] -translate-x-1/2" />
  <img src={settingsIcon} alt="설정" className="absolute right-[18px] top-[max(28px,env(safe-area-inset-top))] z-20 size-6" />
</>

const Ruler = ({ editor = false }: { editor?: boolean }) => <div aria-hidden="true" className={`absolute right-[4.651cqw] z-10 w-[7.442cqw] opacity-80 ${editor ? 'top-[17.67%] h-[64.19%]' : 'top-[30.79%] h-[29.61%]'}`}><span className="absolute inset-y-0 right-0 w-1/2 bg-[repeating-linear-gradient(to_bottom,white_0_1px,transparent_1px_1.395cqw)]" /><span className="absolute right-0 top-1/2 h-px w-full bg-white" /></div>

function CaptureControls({ thumbnail, onCapture, onSwitchCamera }: { thumbnail: string; onCapture: () => void; onSwitchCamera: () => void }) {
  return <>
    <img src={thumbnail} alt="최근 사진" className="absolute top-[83.37%] left-[13.953cqw] z-20 size-[13.488cqw] rounded-[2.791cqw] border-2 border-white/90 object-cover" />
    <button type="button" aria-label="촬영" onClick={onCapture} className="absolute top-[82.53%] left-1/2 z-20 size-[16.279cqw] -translate-x-1/2"><img src={shutterIcon} alt="" className="absolute -inset-[1.163cqw] size-[18.605cqw] max-w-none" /></button>
    <button type="button" aria-label="카메라 전환" onClick={onSwitchCamera} className="absolute top-[84.01%] right-[14.419cqw] z-20 size-[12.558cqw]"><img src={switchIcon} alt="" className="size-full" /></button>
  </>
}

function RemovableChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex h-12 items-center gap-2 rounded-full border border-[#831317] bg-[#831317]/5 px-[14px] text-[13px] font-medium text-[#831317]">
      {label}
      <button type="button" aria-label={`${label} 삭제`} onClick={onRemove} className="text-black/40">
        ×
      </button>
    </span>
  )
}

function ChipTextInput({
  placeholder,
  onAdd,
  onCancel,
}: {
  placeholder: string
  onAdd: (value: string) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState('')
  return (
    <span className="flex h-12 items-center gap-2 rounded-full border border-[#831317] bg-white px-[14px]">
      <input
        autoFocus
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          event.preventDefault()
          if (value.trim()) onAdd(value.trim())
          setValue('')
        }}
        placeholder={placeholder}
        className="w-24 text-[13px] outline-none placeholder:text-black/30"
      />
      <button
        type="button"
        aria-label="추가"
        onClick={() => {
          if (value.trim()) onAdd(value.trim())
          setValue('')
        }}
        className="text-sm font-bold text-[#831317]"
      >
        추가
      </button>
      <button type="button" aria-label="취소" onClick={onCancel} className="text-sm text-black/40">
        ×
      </button>
    </span>
  )
}

function FeedComposer({ photo, onBack }: { photo: string; onBack: () => void }) {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { records } = useWineRecords()
  const [privacy, setPrivacy] = useState('나만보기')
  const [comments, setComments] = useState(true)
  const [content, setContent] = useState('')
  const [wineTags, setWineTags] = useState<string[]>([])
  const [personTags, setPersonTags] = useState<string[]>([])
  const [hashtags, setHashtags] = useState<string[]>([])
  const [locationTag, setLocationTag] = useState('')
  const [openInput, setOpenInput] = useState<'wine' | 'person' | 'hashtag' | 'location' | null>(null)
  const [isWinePickerOpen, setIsWinePickerOpen] = useState(false)

  const wineChoices = [...records, ...DEMO_WINE_RECORDS]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!content.trim()) return

    addUserFeed({
      id: `user-feed-${Date.now()}`,
      author: profile.nickname,
      time: '방금 전',
      avatar: profile.image,
      images: [photo],
      imagePosition: 'center',
      content: content.trim(),
      tags: [...wineTags, ...personTags, ...hashtags, ...(locationTag ? [locationTag] : [])],
    })
    navigate('/lounge')
  }

  return <main className="mx-auto min-h-screen w-full max-w-[430px] bg-white pb-6 text-[#121212] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <header className="relative h-[calc(70px+env(safe-area-inset-top))] w-full bg-white">
      <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] flex h-[70px] items-center justify-between px-5">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="text-2xl text-[#831317]">‹</button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-[#831317]">새 피드</h1>
        <button type="button" className="text-[13px] text-black/60">임시저장</button>
      </div>
    </header>
    <form className="space-y-6 px-5 pt-[11px]" onSubmit={handleSubmit}>
      <section><h2 className="mb-[10px] text-sm font-bold">사진 첨부</h2><div className="flex gap-3"><img src={photo} alt="첨부된 사진" className="size-[90px] rounded-[10px] object-cover" /><button type="button" className="size-[90px] rounded-[10px] border border-dashed border-[#d9d9d9] bg-[#f2f2f2] text-[26px] text-[#737373]">+</button></div></section>
      <label className="block"><span className="mb-[10px] block text-sm font-bold">피드 내용</span><textarea value={content} onChange={(event) => setContent(event.target.value)} className="h-[130px] w-full resize-none rounded-[10px] border border-[#d6d6d6] px-[10px] py-4 text-[13px] outline-[#831317] placeholder:text-black/20" placeholder="오늘 마신 와인과 순간을 공유해보세요." /></label>
      <section>
        <h2 className="mb-[10px] text-sm font-bold">와인 태그</h2>
        <div className="flex flex-wrap gap-2">
          {wineTags.map((tag) => (
            <RemovableChip key={tag} label={tag} onRemove={() => setWineTags((current) => current.filter((item) => item !== tag))} />
          ))}
          {openInput === 'wine' ? (
            <ChipTextInput
              placeholder="와인 이름"
              onCancel={() => setOpenInput(null)}
              onAdd={(value) => {
                setWineTags((current) => [...current, value])
                setOpenInput(null)
              }}
            />
          ) : (
            <button type="button" onClick={() => setOpenInput('wine')} className="h-12 rounded-full border border-dashed border-[#d6d6d6] px-[10px] text-[13px] text-[#595959]">와인추가</button>
          )}
          <button type="button" onClick={() => setIsWinePickerOpen(true)} className="h-12 rounded-full border border-dashed border-[#d6d6d6] px-[10px] text-[13px] text-[#595959]">내 기록에서 가져오기</button>
        </div>
      </section>
      <section>
        <h2 className="mb-[10px] text-sm font-bold">사람 태그</h2>
        <div className="flex flex-wrap gap-2">
          {personTags.map((tag) => (
            <RemovableChip key={tag} label={tag} onRemove={() => setPersonTags((current) => current.filter((item) => item !== tag))} />
          ))}
          {openInput === 'person' ? (
            <ChipTextInput
              placeholder="이름"
              onCancel={() => setOpenInput(null)}
              onAdd={(value) => {
                setPersonTags((current) => [...current, value])
                setOpenInput(null)
              }}
            />
          ) : (
            <button type="button" onClick={() => setOpenInput('person')} className="h-12 rounded-full border border-dashed border-[#d6d6d6] px-[10px] text-[13px] text-[#595959]">이름</button>
          )}
        </div>
      </section>
      <section>
        <h2 className="mb-[10px] text-sm font-bold">해시태그</h2>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <RemovableChip key={tag} label={`#${tag}`} onRemove={() => setHashtags((current) => current.filter((item) => item !== tag))} />
          ))}
          {openInput === 'hashtag' ? (
            <ChipTextInput
              placeholder="해시태그"
              onCancel={() => setOpenInput(null)}
              onAdd={(value) => {
                setHashtags((current) => [...current, value.replace(/^#+/, '')])
                setOpenInput(null)
              }}
            />
          ) : (
            <button type="button" onClick={() => setOpenInput('hashtag')} className="h-12 rounded-full border border-dashed border-[#d6d6d6] px-[10px] text-[13px] text-[#595959]">#</button>
          )}
        </div>
      </section>
      <section>
        <h2 className="mb-[10px] text-sm font-bold">위치</h2>
        <div className="flex flex-wrap gap-2">
          {locationTag ? (
            <RemovableChip label={locationTag} onRemove={() => setLocationTag('')} />
          ) : openInput === 'location' ? (
            <ChipTextInput
              placeholder="위치"
              onCancel={() => setOpenInput(null)}
              onAdd={(value) => {
                setLocationTag(value)
                setOpenInput(null)
              }}
            />
          ) : (
            <button type="button" onClick={() => setOpenInput('location')} className="h-12 rounded-full border border-dashed border-[#d6d6d6] px-[10px] text-[13px] text-[#595959]">위치 추가</button>
          )}
        </div>
      </section>
      <fieldset><legend className="mb-4 text-sm font-bold">공개 범위</legend><div className="space-y-4">{['나만보기','전체 공개','팔로워 공개'].map(x => <label key={x} className={`flex items-center gap-2 text-sm ${privacy === x ? 'font-semibold text-[#831317]' : 'text-[#949494]'}`}><input type="radio" checked={privacy === x} onChange={() => setPrivacy(x)} className="size-5 accent-[#831317]" />{x}</label>)}</div></fieldset>
      <div className="flex items-center justify-between"><b className="text-sm">댓글 허용</b><button type="button" aria-pressed={comments} onClick={() => setComments(v => !v)} className={`relative h-7 w-12 rounded-full ${comments ? 'bg-[#831317]' : 'bg-[#bbb]'}`}><span className={`absolute top-[3px] size-[22px] rounded-full bg-white transition-transform ${comments ? 'left-[23px]' : 'left-[3px]'}`} /></button></div>
      <button type="submit" className="h-12 w-full rounded-[10px] bg-[#831317] text-[13px] font-bold text-white">게시 하기</button>
    </form>

    {isWinePickerOpen ? (
      <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-3" onClick={() => setIsWinePickerOpen(false)}>
        <section role="dialog" aria-modal="true" aria-label="내 기록에서 와인 가져오기" onClick={(event) => event.stopPropagation()} className="w-full max-w-[406px] rounded-[20px] bg-white px-5 pb-5 pt-4 text-[#121212] shadow-[0_16px_50px_rgba(0,0,0,0.22)]">
          <strong className="mb-3 block text-[15px]">내 기록에서 가져오기</strong>
          {wineChoices.length === 0 ? (
            <p className="py-6 text-center text-sm text-black/40">저장된 와인 기록이 없어요.</p>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto">
              {wineChoices.map((wine) => (
                <li key={wine.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setWineTags((current) => (current.includes(wine.name) ? current : [...current, wine.name]))
                      setIsWinePickerOpen(false)
                    }}
                    className="flex h-11 w-full items-center rounded-[10px] px-2 text-left text-sm hover:bg-[#f2f2f2]"
                  >
                    {wine.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    ) : null}
  </main>
}

export default function FeedCreateFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState<FeedStep>('intro')
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1')
  const { videoRef, facingMode, switchCamera, capture, hasCamera, retryCamera } = useCameraStream(step === 'intro' || step === 'camera')

  if (step === 'compose') return <FeedComposer photo={capturedPhoto ?? feedCamera} onBack={() => setStep('edit')} />

  if (step === 'edit') return <main className="@container relative mx-auto h-dvh-zoomed w-full max-w-[430px] overflow-hidden bg-[#170d0d] text-white">
    <button type="button" aria-label="보정 화면 닫기" onClick={() => setStep('camera')} className="absolute left-5 top-[max(28px,env(safe-area-inset-top))] z-20 size-6"><img src={closeIcon} alt="" className="size-full" /></button>
    <button type="button" onClick={() => setStep('compose')} className="absolute right-[18px] top-[max(28px,env(safe-area-inset-top))] z-20 flex h-6 items-center text-[3.488cqw] font-medium">다음</button>
    <div className="absolute top-[calc(21.5px+env(safe-area-inset-top))] left-1/2 flex h-[37px] w-[37.442cqw] -translate-x-1/2 items-center justify-around rounded-full border border-white/20 bg-[#d9d9d9]/20 text-[2.791cqw]">
      {ASPECT_RATIOS.map((ratio) => (
        <button
          key={ratio}
          type="button"
          onClick={() => setAspectRatio(ratio)}
          className={aspectRatio === ratio ? 'font-bold text-white' : 'text-white/50'}
        >
          {ratio === 'full' ? 'Full' : ratio}
        </button>
      ))}
    </div>
    <div className="absolute inset-x-0 top-[22.64%] h-[46.14%] overflow-hidden">
      <div className="flex size-full items-center justify-center">
        <img
          src={capturedPhoto ?? feedCamera}
          alt="보정할 피드 사진"
          className={aspectRatio === 'full' ? 'max-h-full max-w-full object-contain' : 'h-full object-cover'}
          style={aspectRatio === 'full' ? undefined : { aspectRatio: ASPECT_RATIO_CSS[aspectRatio] }}
        />
      </div>
      <div className="absolute left-[4.651cqw] top-[25.81%] flex h-[48%] flex-col justify-between">{[[toolWine,'와인라벨'],[toolGrid,'레이아웃']].map(([icon,label]) => <button type="button" key={label} className="flex items-center gap-[2.093cqw] text-[2.791cqw] text-white/80"><img src={icon} alt="" className="size-[6.047cqw]" />{label}</button>)}<button type="button" className="flex items-center gap-[2.093cqw] text-[2.791cqw] text-white/80"><span className="w-[6.047cqw] text-[5.116cqw] font-light">Aa</span>텍스트 추가</button><button type="button" className="flex items-center gap-[2.093cqw] text-[2.791cqw] text-white/80"><img src={toolFilter} alt="" className="h-[6.047cqw] w-[6.512cqw]" />필터</button></div><Ruler editor />
    </div>
    <div className="absolute inset-x-0 top-[86.05%] bottom-0 rounded-t-[5.814cqw] border-t border-white/30 bg-[#831317]/10" />
    <img src={capturedPhoto ?? feedThumb} alt="선택한 사진" className="absolute top-[83.37%] left-[13.953cqw] z-20 size-[13.488cqw] rounded-[2.791cqw] border-2 border-white/90 object-cover" />
    <button type="button" aria-label="사진 추가" onClick={() => setStep('camera')} className="absolute top-[82.53%] left-1/2 z-20 size-[16.279cqw] -translate-x-1/2"><img src={shutterIcon} alt="" className="absolute -inset-[1.163cqw] size-[18.605cqw] max-w-none" /></button>
    <button type="button" aria-label="필터" className="absolute top-[84.01%] right-[14.419cqw] z-20 size-[12.558cqw] rounded-full border border-white bg-[#2b2021]/90"><img src={toolFilter} alt="" className="absolute left-1/2 top-1/2 h-[6.047cqw] w-[6.512cqw] -translate-x-[calc(50%+1px)] -translate-y-[calc(50%+1px)]" /></button>
    <div className="absolute top-[94.96%] left-1/2 z-20 flex -translate-x-1/2 gap-[2.791cqw] text-[3.488cqw]"><span className="text-white/30">찾기</span><b className="font-medium">피드</b></div>
  </main>

  const intro = step === 'intro'
  return <main className="@container relative mx-auto h-dvh-zoomed w-full max-w-[430px] overflow-hidden bg-black text-white">
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className={`absolute inset-0 size-full object-cover ${hasCamera ? '' : 'hidden'} ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
    />
    {!hasCamera && (
      <button type="button" onClick={retryCamera} className="absolute inset-0 size-full">
        <img src={feedCamera} alt="" className="absolute inset-0 size-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 px-10 text-center text-sm font-medium text-white">탭해서 카메라 켜기</span>
      </button>
    )}
    <CameraHeader onClose={() => { if (intro) navigate(-1); else setStep('intro') }} />{!intro ? <Ruler /> : null}
    {intro ? <section className="absolute inset-x-0 top-[59.44%] bottom-0 rounded-t-[5.814cqw] border-t border-white/50 bg-[#831317]/10 backdrop-blur-[16px]">
      <div className="absolute left-1/2 top-[10.58%] flex w-[61.86%] -translate-x-1/2 text-[min(15px,1.61dvh)] font-medium"><button type="button" onClick={() => navigate('/wine-search')} className="w-1/2 text-center text-white/50">찾기</button><span className="w-1/2 text-center">피드</span></div>
      <div className="absolute left-1/2 top-[19.31%] h-px w-[61.86%] -translate-x-1/2 bg-white/30"><span className="ml-auto block h-px w-1/2 bg-[#831317]" /></div>
      <p className="absolute top-[27.78%] w-full text-center text-[min(15px,1.61dvh)] font-medium leading-[1.47] text-white/80">와인 사진, 플레이팅, 분위기 사진을<br />자유롭게 촬영해보세요.</p><p className="absolute top-[42.33%] w-full text-center text-[min(12px,1.29dvh)] text-white/50">기억하고 싶은 순간을 자유롭게 기록해보세요.</p>
    </section> : <><div className="absolute inset-x-0 top-[86.05%] bottom-0 rounded-t-[5.814cqw] border-t border-white/40 bg-[#831317]/10 backdrop-blur-[12px]" /><div className="absolute top-[94.96%] left-1/2 z-20 flex -translate-x-1/2 gap-[2.791cqw] text-[3.488cqw]"><button type="button" onClick={() => navigate('/wine-search')} className="text-white/30">찾기</button><b className="font-medium">피드</b></div></>}
    <CaptureControls
      thumbnail={capturedPhoto ?? feedThumb}
      onSwitchCamera={switchCamera}
      onCapture={() => {
        const photo = capture()
        if (photo) setCapturedPhoto(photo)
        setAspectRatio('1:1')
        setStep('edit')
      }}
    />
  </main>
}
