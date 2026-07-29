import { Navigate } from 'react-router-dom'
import guideWineBackground from '../assets/web/guide-wine-background.png'
import { useDesktopViewport } from '../hooks/useDesktopViewport'

function DesktopGuide() {
  const isDesktop = useDesktopViewport()

  if (!isDesktop) return <Navigate to="/home" replace />

  return (
    <main className="relative h-dvh min-h-[720px] w-full overflow-hidden bg-black text-white">
      <img
        src={guideWineBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[1.02%] left-[10.89%] h-[97.92%] w-[97.86%] max-w-none rotate-180 object-cover select-none"
      />

      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: 'minmax(540px, 1fr) 430px minmax(32px, 23.02vw)' }}
      >
        <section className="relative z-10 min-w-0">
          <h1 className="font-delmon absolute top-[3.98%] left-[clamp(58px,4.48vw,86px)] text-[clamp(72px,5.45vw,104.609px)] leading-[1.25] font-normal tracking-[-0.01em] text-[#831417]">
            VINER
          </h1>

          <div className="absolute top-[20.46%] left-[clamp(58px,4.48vw,86px)]">
            <p className="text-[clamp(24px,1.57vw,30px)] leading-[1.25] font-bold tracking-[-0.01em] text-[#e5e5e5]">
              취향을 중심으로 연결되는 와인 커뮤니티.
            </p>
            <p className="mt-[19px] text-lg leading-[1.3] tracking-[-0.01em] text-[#c6c6c6]">
              나에게 맞는 와인을 발견하고,
              <br />
              마신 와인을 기록하며, 같은 취향의 사람들과 소통합니다.
            </p>
          </div>

          <img
            src="/favicon.svg"
            alt="Viner"
            className="absolute top-[35.65%] left-[clamp(58px,4.48vw,86px)] h-[92px] w-[93px]"
          />

          <div className="absolute top-[46.02%] left-[clamp(58px,4.48vw,86px)] flex items-center gap-[19px]">
            <span className="text-lg leading-[1.25] tracking-[-0.01em] text-[#c6c6c6]">Guide On / Off</span>
            <span
              role="switch"
              aria-checked="false"
              aria-disabled="true"
              aria-label="클릭 가이드"
              className="relative h-9 w-[69px] rounded-full bg-[#841317]"
            >
              <span className="absolute top-0.5 left-0.75 size-8 rounded-full bg-white" />
            </span>
          </div>
        </section>

        <section className="relative z-20 h-dvh min-h-[720px] w-[430px] overflow-hidden bg-[#151515] shadow-[0_0_40px_rgba(0,0,0,0.24)]">
          <iframe
            src="/home?embed=desktop"
            title="Viner 모바일 앱"
            className="block h-full w-[430px] border-0 bg-[#151515]"
          />
        </section>

        <div aria-hidden="true" />
      </div>
    </main>
  )
}

export default DesktopGuide
