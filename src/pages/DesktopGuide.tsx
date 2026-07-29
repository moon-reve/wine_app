import { useCallback, useEffect, useRef, useState } from 'react'
import guideWineBackground from '../assets/web/guide-wine-background.png'

function DesktopGuide() {
  const [isGuideOn, setIsGuideOn] = useState(false)
  const appFrameRef = useRef<HTMLIFrameElement>(null)

  const sendGuideMode = useCallback(() => {
    appFrameRef.current?.contentWindow?.postMessage(
      { type: 'viner:guide-mode', enabled: isGuideOn },
      window.location.origin,
    )
  }, [isGuideOn])

  useEffect(() => {
    sendGuideMode()
  }, [sendGuideMode])

  return (
    <main className="relative h-dvh min-h-[720px] w-full overflow-hidden bg-black text-white">
      <img
        src={guideWineBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[11px] left-[calc(50%-751px)] h-[1057.5px] w-[1879px] max-w-none -scale-x-100 select-none"
      />

      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: 'minmax(0, 1fr) 430px clamp(0px, calc((100vw - 768px) * 0.3837), 442px)' }}
      >
        <section className="relative z-10 min-w-0">
          <h1 className="font-delmon absolute top-[3.98%] left-[clamp(34px,4.48vw,86px)] text-[104.609px] leading-[1.25] font-normal tracking-[-0.01em] text-[#831417]">
            VINER
          </h1>

          <div className="absolute top-[20.46%] right-5 left-[clamp(34px,4.48vw,86px)]">
            <p className="text-[30px] leading-[1.25] font-bold tracking-[-0.01em] text-[#e5e5e5]">
              취향을 중심으로 연결되는 와인 커뮤니티.
            </p>
            <p className="mt-[19px] text-[18px] leading-[1.3] tracking-[-0.01em] text-[#c6c6c6]">
              나에게 맞는 와인을 발견하고,
              <br />
              마신 와인을 기록하며, 같은 취향의 사람들과 소통합니다.
            </p>
          </div>

          <img
            src="/favicon.svg"
            alt="Viner"
            className="absolute top-[35.65%] left-[clamp(34px,4.48vw,86px)] h-[92px] w-[93px]"
          />

          <div className="absolute top-[46.02%] left-[clamp(34px,4.48vw,86px)] flex items-center gap-[clamp(10px,0.99vw,19px)]">
            <span className="text-[18px] leading-[1.25] tracking-[-0.01em] whitespace-nowrap text-[#c6c6c6]">Guide On / Off</span>
            <button
              type="button"
              role="switch"
              aria-checked={isGuideOn}
              aria-label="클릭 가이드"
              onClick={() => setIsGuideOn((value) => !value)}
              className={`relative h-9 w-[69px] rounded-full transition-colors ${
                isGuideOn ? 'bg-[#841317]' : 'bg-[#c7cbd1]'
              }`}
            >
              <span
                className={`absolute top-[3px] size-[30px] rounded-full bg-white transition-[left] ${
                  isGuideOn ? 'left-9' : 'left-[3px]'
                }`}
              />
            </button>
          </div>
        </section>

        <section className="relative z-20 h-dvh min-h-[720px] w-[430px] overflow-hidden bg-[#151515] shadow-[0_0_40px_rgba(0,0,0,0.24)]">
          <iframe
            ref={appFrameRef}
            src="/splash?embed=desktop"
            title="Viner 모바일 앱"
            onLoad={sendGuideMode}
            className="block h-full w-[430px] border-0 bg-[#151515]"
          />
        </section>

        <div aria-hidden="true" />
      </div>
    </main>
  )
}

export default DesktopGuide
