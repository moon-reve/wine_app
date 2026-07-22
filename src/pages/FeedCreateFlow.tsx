import { useState } from 'react'
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

type FeedStep = 'intro' | 'camera' | 'edit' | 'compose'

const CameraHeader = ({ onClose }: { onClose: () => void }) => <>
  <button type="button" aria-label="닫기" onClick={onClose} className="absolute left-5 top-7 z-20 size-6"><img src={closeIcon} alt="" className="size-full" /></button>
  <img src={flashIcon} alt="플래시 끄기" className="absolute left-1/2 top-7 z-20 h-[22px] w-[19px] -translate-x-1/2" />
  <img src={settingsIcon} alt="설정" className="absolute right-[18px] top-7 z-20 size-6" />
</>

const Ruler = ({ editor = false }: { editor?: boolean }) => <div aria-hidden="true" className={`absolute right-[4.651cqw] z-10 w-[7.442cqw] opacity-80 ${editor ? 'top-[17.67%] h-[64.19%]' : 'top-[30.79%] h-[29.61%]'}`}><span className="absolute inset-y-0 right-0 w-1/2 bg-[repeating-linear-gradient(to_bottom,white_0_1px,transparent_1px_1.395cqw)]" /><span className="absolute right-0 top-1/2 h-px w-full bg-white" /></div>

function CaptureControls({ onCapture }: { onCapture: () => void }) {
  return <>
    <img src={feedThumb} alt="최근 사진" className="absolute top-[83.37%] left-[13.953cqw] z-20 size-[13.488cqw] rounded-[2.791cqw] border-2 border-white/90 object-cover" />
    <button type="button" aria-label="촬영" onClick={onCapture} className="absolute top-[82.53%] left-1/2 z-20 size-[16.279cqw] -translate-x-1/2"><img src={shutterIcon} alt="" className="absolute -inset-[1.163cqw] size-[18.605cqw] max-w-none" /></button>
    <button type="button" aria-label="카메라 전환" className="absolute top-[84.01%] right-[14.419cqw] z-20 size-[12.558cqw]"><img src={switchIcon} alt="" className="size-full" /></button>
  </>
}

function FeedComposer({ onBack }: { onBack: () => void }) {
  const [privacy, setPrivacy] = useState('나만보기')
  const [comments, setComments] = useState(true)
  const chips = [['와인 태그', ['와인추가', '내 기록에서 가져오기']], ['사람 태그', ['이름']], ['해시태그', ['#']], ['위치', ['위치 추가']]] as const
  return <main className="mx-auto min-h-screen w-full max-w-[430px] bg-white pb-6 text-[#121212] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between bg-white px-5"><button type="button" onClick={onBack} aria-label="뒤로 가기" className="text-2xl text-[#831317]">‹</button><h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-[#831317]">새 피드</h1><button type="button" className="text-[13px] text-black/60">임시저장</button></header>
    <form className="space-y-6 px-5 pt-[11px]" onSubmit={(e) => e.preventDefault()}>
      <section><h2 className="mb-[10px] text-sm font-bold">사진 첨부</h2><div className="flex gap-3"><img src={feedCamera} alt="첨부된 사진" className="size-[90px] rounded-[10px] object-cover" /><button type="button" className="size-[90px] rounded-[10px] border border-dashed border-[#d9d9d9] bg-[#f7f6f5] text-[26px] text-[#737373]">+</button></div></section>
      <label className="block"><span className="mb-[10px] block text-sm font-bold">피드 내용</span><textarea className="h-[130px] w-full resize-none rounded-[10px] border border-[#d6d6d6] px-[10px] py-4 text-[13px] outline-[#831317] placeholder:text-black/20" placeholder="오늘 마신 와인과 순간을 공유해보세요." /></label>
      {chips.map(([title, items]) => <section key={title}><h2 className="mb-[10px] text-sm font-bold">{title}</h2><div className="flex gap-2">{items.map(item => <button type="button" key={item} className="h-12 rounded-full border border-dashed border-[#d6d6d6] px-[10px] text-[13px] text-black/20">{item}</button>)}</div></section>)}
      <fieldset><legend className="mb-4 text-sm font-bold">공개 범위</legend><div className="space-y-4">{['나만보기','전체 공개','팔로워 공개'].map(x => <label key={x} className={`flex items-center gap-2 text-sm ${privacy === x ? 'font-semibold text-[#831317]' : 'text-[#949494]'}`}><input type="radio" checked={privacy === x} onChange={() => setPrivacy(x)} className="size-5 accent-[#831317]" />{x}</label>)}</div></fieldset>
      <div className="flex items-center justify-between"><b className="text-sm">댓글 허용</b><button type="button" aria-pressed={comments} onClick={() => setComments(v => !v)} className={`relative h-7 w-12 rounded-full ${comments ? 'bg-[#831317]' : 'bg-[#bbb]'}`}><span className={`absolute top-[3px] size-[22px] rounded-full bg-white transition-transform ${comments ? 'left-[23px]' : 'left-[3px]'}`} /></button></div>
      <button type="submit" className="h-12 w-full rounded-[10px] bg-[#841317] text-[13px] font-bold text-white">게시 하기</button>
    </form>
  </main>
}

export default function FeedCreateFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState<FeedStep>('intro')
  if (step === 'compose') return <FeedComposer onBack={() => setStep('edit')} />

  if (step === 'edit') return <main className="@container relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-[#170d0d] text-white">
    <button type="button" aria-label="보정 화면 닫기" onClick={() => setStep('camera')} className="absolute left-5 top-7 z-20 size-6"><img src={closeIcon} alt="" className="size-full" /></button>
    <button type="button" onClick={() => setStep('compose')} className="absolute right-[18px] top-7 z-20 flex h-6 items-center text-[3.488cqw] font-medium">다음</button>
    <div className="absolute left-1/2 top-[21.5px] flex h-[37px] w-[37.442cqw] -translate-x-1/2 items-center justify-around rounded-full border border-white/20 bg-[#d9d9d9]/20 text-[2.791cqw]"><span className="text-white/50">3:4</span><span className="text-white/50">9:16</span><b>1:1</b><span className="text-white/50">Full</span></div>
    <div className="absolute inset-x-0 top-[22.64%] h-[46.14%] overflow-hidden"><img src={feedCamera} alt="보정할 피드 사진" className="size-full object-cover" />
      <div className="absolute left-[4.651cqw] top-[25.81%] flex h-[48%] flex-col justify-between">{[[toolWine,'와인라벨'],[toolGrid,'레이아웃']].map(([icon,label]) => <button type="button" key={label} className="flex items-center gap-[2.093cqw] text-[2.791cqw] text-white/80"><img src={icon} alt="" className="size-[6.047cqw]" />{label}</button>)}<button type="button" className="flex items-center gap-[2.093cqw] text-[2.791cqw] text-white/80"><span className="w-[6.047cqw] text-[5.116cqw] font-light">Aa</span>텍스트 추가</button><button type="button" className="flex items-center gap-[2.093cqw] text-[2.791cqw] text-white/80"><img src={toolFilter} alt="" className="h-[6.047cqw] w-[6.512cqw]" />필터</button></div><Ruler editor />
    </div>
    <div className="absolute inset-x-0 top-[86.05%] bottom-0 rounded-t-[5.814cqw] border-t border-white/30 bg-[#831317]/10" />
    <img src={feedThumb} alt="선택한 사진" className="absolute top-[83.37%] left-[13.953cqw] z-20 size-[13.488cqw] rounded-[2.791cqw] border-2 border-white/90 object-cover" />
    <button type="button" aria-label="사진 추가" className="absolute top-[82.53%] left-1/2 z-20 size-[16.279cqw] -translate-x-1/2"><img src={shutterIcon} alt="" className="absolute -inset-[1.163cqw] size-[18.605cqw] max-w-none" /></button>
    <button type="button" aria-label="필터" className="absolute top-[84.01%] right-[14.419cqw] z-20 size-[12.558cqw] rounded-full border border-white bg-[#2b2021]/90"><img src={toolFilter} alt="" className="absolute left-1/2 top-1/2 h-[6.047cqw] w-[6.512cqw] -translate-x-[calc(50%+1px)] -translate-y-[calc(50%+1px)]" /></button>
    <div className="absolute top-[94.96%] left-1/2 z-20 flex -translate-x-1/2 gap-[2.791cqw] text-[3.488cqw]"><span className="text-white/30">찾기</span><b className="font-medium">피드</b></div>
  </main>

  const intro = step === 'intro'
  return <main className="@container relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-black text-white">
    <img src={feedCamera} alt="" className="absolute inset-0 size-full object-cover" /><CameraHeader onClose={() => { if (intro) navigate('/'); else setStep('intro') }} />{!intro ? <Ruler /> : null}
    {intro ? <section className="absolute inset-x-0 top-[59.44%] bottom-0 rounded-t-[5.814cqw] border-t border-white/50 bg-[#831317]/10 backdrop-blur-[16px]">
      <div className="absolute left-1/2 top-[10.58%] flex w-[61.86%] -translate-x-1/2 text-[min(15px,1.61dvh)] font-medium"><button type="button" onClick={() => navigate('/wine-search')} className="w-1/2 text-center text-white/50">찾기</button><span className="w-1/2 text-center">피드</span></div>
      <div className="absolute left-1/2 top-[19.31%] h-px w-[61.86%] -translate-x-1/2 bg-white/30"><span className="ml-auto block h-px w-1/2 bg-[#9c171d]" /></div>
      <p className="absolute top-[27.78%] w-full text-center text-[min(15px,1.61dvh)] font-medium leading-[1.47] text-white/80">와인 사진, 플레이팅, 분위기 사진을<br />자유롭게 촬영해보세요.</p><p className="absolute top-[42.33%] w-full text-center text-[min(12px,1.29dvh)] text-white/50">기억하고 싶은 순간을 자유롭게 기록해보세요.</p>
    </section> : <><div className="absolute inset-x-0 top-[86.05%] bottom-0 rounded-t-[5.814cqw] border-t border-white/40 bg-[#831317]/10 backdrop-blur-[12px]" /><div className="absolute top-[94.96%] left-1/2 z-20 flex -translate-x-1/2 gap-[2.791cqw] text-[3.488cqw]"><button type="button" onClick={() => navigate('/wine-search')} className="text-white/30">찾기</button><b className="font-medium">피드</b></div></>}
    <CaptureControls onCapture={() => setStep(intro ? 'camera' : 'edit')} />
  </main>
}
