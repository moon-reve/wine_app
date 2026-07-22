import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import closeIcon from '../assets/quick-flow/close.svg'
import flashIcon from '../assets/quick-flow/flash.svg'
import settingsIcon from '../assets/quick-flow/settings.svg'
import shutterIcon from '../assets/quick-flow/shutter.svg'
import switchIcon from '../assets/quick-flow/switch.svg'
import scanFrame from '../assets/quick-flow/scan-frame.svg'
import feedCamera from '../assets/quick-flow/feed-camera.png'
import feedThumb from '../assets/quick-flow/feed-thumb.png'
import searchCamera from '../assets/quick-flow/search-camera.png'
import searchThumb from '../assets/quick-flow/search-thumb.png'
import searchResultWine from '../assets/quick-flow/search-result-wine.png'
import FeedCreateFlow from './FeedCreateFlow'

type CameraFlowProps = { mode: 'feed' | 'search' }

export default function CameraFlow({ mode }: CameraFlowProps) {
  const navigate = useNavigate()
  const isSearch = mode === 'search'
  const [isSearching, setIsSearching] = useState(false)
  const [isResult, setIsResult] = useState(false)

  useEffect(() => {
    if (!isSearching || !isSearch) return
    const timer = window.setTimeout(() => setIsResult(true), 3000)
    return () => window.clearTimeout(timer)
  }, [isSearch, isSearching])

  if (!isSearch) return <FeedCreateFlow />

  if (isResult) {
    return (
      <main className="@container relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-black text-white">
        <img src={searchCamera} alt="" className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] object-cover blur-[6px]" />
        <div className="absolute inset-0 bg-black/20" />
        <button type="button" aria-label="인식 결과 닫기" onClick={() => { setIsResult(false); setIsSearching(false) }} className="absolute left-5 top-7 z-20 size-6"><img src={closeIcon} alt="" className="size-full" /></button>
        <img src={flashIcon} alt="플래시 끄기" className="absolute left-1/2 top-7 z-20 h-[22px] w-[19px] -translate-x-1/2" />
        <img src={settingsIcon} alt="설정" className="absolute right-[18px] top-7 z-20 size-6" />

        <section className="absolute inset-x-0 bottom-0 top-[12.02%] overflow-y-auto rounded-t-[25px] border-t border-white/50 bg-[#831317]/10 px-5 pb-[30px] [scrollbar-width:none] backdrop-blur-[18px] [&::-webkit-scrollbar]:hidden">
          <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between px-5 pt-[22px]">
            <span className="flex h-[25px] items-center gap-1.5 rounded-full bg-[#831317]/90 px-3 text-xs font-medium">✦ 인식 완료</span>
            <button type="button" className="h-[25px] rounded-full bg-white/10 px-2 text-xs font-medium">♥ 리스트 저장</button>
          </div>
          <div className="relative mx-auto mt-10 h-[278px] w-[236px]">
            <img src={scanFrame} alt="인식된 와인" className="absolute inset-0 size-full" />
            <img src={searchResultWine} alt="마틴자스 크릭 샤도네이" className="absolute inset-0 size-full object-contain" />
          </div>
          <div className="mt-11 text-center">
            <h1 className="text-[22px] font-bold leading-normal">마틴자스 크릭 샤도네이</h1>
            <p className="font-delmon text-base text-[#d9a05b]">Matansas Creek Chardonnay</p>
            <div className="mt-5 flex items-center justify-center gap-2 text-[13px] text-white/75"><span>USA · Sonoma</span><span className="text-white/35">|</span><span>White Wine</span><span className="text-white/35">|</span><span>Chardonnay</span></div>
            <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#d9a05b]/40 bg-white/[0.06] px-[14px] py-2 text-[13px]">인식 정확도 <b className="text-[15px] text-[#d9a05b]">96%</b></div>
          </div>
          <div className="mt-6 border-t border-white/20 pt-[22px] text-sm leading-normal text-white/75">
            <p>마탄자스 크릭은 1977년 설립된 소노마 카운티의 와이너리로, 소비뇽 블랑과 메를로로 명성을 쌓았습니다. 이 샤르도네는 알렉산더 밸리 포도를 중심으로 양조하며, 구운 사과와 브리오슈 향이 특징입니다. 복숭아와 배 풍미에 은은한 바닐라가 더해져 ...</p>
            <button type="button" className="mt-1.5 text-xs text-white/50 underline">더보기</button>
          </div>
          <button type="button" onClick={() => navigate('/record')} className="mt-[22px] h-[52px] w-full rounded-full border border-white/30 bg-white/[0.08] text-base font-bold text-white">와인 기록하기</button>
          <button type="button" className="mt-[10px] h-[52px] w-full rounded-full border border-white/30 bg-white/[0.08] text-base font-bold text-white">AI에게 물어보기</button>
        </section>
      </main>
    )
  }

  return (
    <main className="@container relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-black text-white">
      <img
        src={isSearch ? searchCamera : feedCamera}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/[0.04]" />

      {isSearching ? <div role="status" aria-label="와인 분석 중" className="absolute left-1/2 top-[36.375%] z-30 size-[min(56px,6dvh)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[min(5px,0.54dvh)] border-white/25 border-t-white animate-spin" /> : null}

      <button type="button" aria-label="닫기" onClick={() => { if (isSearching) setIsSearching(false); else navigate('/') }} className="absolute left-5 top-7 z-10 size-6">
        <img src={closeIcon} alt="" className="size-full" />
      </button>
      <img src={flashIcon} alt="플래시 끄기" className="absolute left-1/2 top-7 z-10 h-[22px] w-[19px] -translate-x-1/2" />
      <img src={settingsIcon} alt="설정" className="absolute right-[18px] top-7 z-10 size-6" />

      {isSearch ? <img src={scanFrame} alt="와인 라벨 인식 영역" className="absolute left-1/2 top-[21.46%] z-10 h-[29.83%] w-[54.884cqw] -translate-x-1/2" /> : (
        <div aria-hidden="true" className="absolute right-5 top-[30.8%] h-[29.6%] w-8 bg-[repeating-linear-gradient(to_bottom,white_0_1px,transparent_1px_6px)] opacity-80 after:absolute after:right-0 after:top-1/2 after:h-px after:w-8 after:bg-white" />
      )}

      <section className={`absolute inset-x-0 bottom-0 h-[40.56%] rounded-t-[25px] border-t border-white/50 ${isSearch ? 'bg-[#831317]/10 backdrop-blur-[18px]' : 'bg-[#831317]/10 backdrop-blur-[16px]'}`}>
        {isSearch && isSearching ? (
          <div className="absolute left-1/2 top-[17.99%] flex -translate-x-1/2 flex-col items-center gap-[min(10px,1.07dvh)] whitespace-nowrap text-center">
            <p className="text-[min(24px,2.58dvh)] font-bold leading-normal">와인을 찾고 있어요</p>
            <p className="text-[min(14px,1.5dvh)] leading-normal text-white/75">라벨과 와인 정보를 분석하는 중입니다.</p>
            <p className="text-[min(13px,1.39dvh)] leading-normal text-[#d9a05b]">생산지와 품종을 확인하고 있어요.</p>
          </div>
        ) : isSearch ? (
          <>
            <div className="absolute left-1/2 top-[10.58%] flex w-[61.86%] -translate-x-1/2 text-[min(15px,1.61dvh)] font-medium">
              <span className="w-1/2 text-center">찾기</span><button type="button" onClick={() => navigate('/feed/create')} className="w-1/2 text-center text-white/50">피드</button>
            </div>
            <div className="absolute left-1/2 top-[19.31%] h-px w-[61.86%] -translate-x-1/2 bg-white/30"><span className="block h-px w-1/2 bg-[#9c171d]" /></div>
            <p className="absolute top-[31.48%] w-full text-center text-[min(15px,1.61dvh)] font-medium leading-[1.47] text-white/80">라벨을 프레임 안에 맞춰주세요.<br />AI가 자동으로 와인을 분석합니다.</p>
          </>
        ) : (
          <div className="absolute bottom-[25px] left-1/2 flex -translate-x-1/2 gap-3 text-[15px] font-medium"><span className="text-white/30">찾기</span><span>피드</span></div>
        )}

      </section>

        {!isSearching ? <img src={isSearch ? searchThumb : feedThumb} alt="최근 사진" className="absolute top-[83.37%] left-[13.953cqw] z-20 size-[13.488cqw] rounded-[2.791cqw] border-2 border-white/90 object-cover" /> : null}
        <button type="button" aria-label={isSearching ? '와인 분석 중' : '촬영'} onClick={() => { if (isSearch) setIsSearching(true) }} className="absolute top-[82.53%] left-1/2 z-20 size-[16.279cqw] -translate-x-1/2">
          <img src={shutterIcon} alt="" className="absolute -inset-[7.14%] size-[114.28%] max-w-none" />
        </button>
        {!isSearching ? <button type="button" aria-label="카메라 전환" className="absolute top-[84.01%] right-[14.419cqw] z-20 size-[12.558cqw]">
          <img src={switchIcon} alt="" className="size-full" />
        </button> : null}
    </main>
  )
}
