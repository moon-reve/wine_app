import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/challenge/back.svg'
import bottlesImage from '../assets/challenge/bottles.png'
import ghostBottle from '../assets/challenge/ghost-bottle.png'
import heroImage from '../assets/challenge/hero.png'
import medal1 from '../assets/challenge/medal-1.png'
import medal2 from '../assets/challenge/medal-2.png'
import medal3 from '../assets/challenge/medal-3.png'
import medal4 from '../assets/challenge/medal-4.png'
import medal5 from '../assets/challenge/medal-5.png'

const steps = [
  { title: '대륙별 와인 마시기', description: '오대륙 중 한 곳의 와인을 선택해 마셔보세요.' },
  { title: '와인 기록 남기기', description: '와인 사진과 함께 이름, 산지, 맛과 향, 느낀 점을 기록해 주세요.' },
  { title: '오대륙 완주하기', description: '다섯 대륙의 와인을 모두 기록하면 챌린지가 완료됩니다.' },
] as const

const medals = [
  { image: medal1, left: 12.558, top: 711, width: 11.596, imageLeft: -9.688, imageTop: -7.364, imageSize: 119 },
  { image: medal2, left: 29.27, top: 711, width: 11.547, imageLeft: -14.785, imageTop: -12.061, imageSize: 130 },
  { image: medal3, left: 46.398, top: 711, width: 11.617, imageLeft: -14.886, imageTop: -12.598, imageSize: 130.534 },
  { image: medal4, left: 63.83, top: 711, width: 11.795, imageLeft: -11.278, imageTop: -10.148, imageSize: 122.923 },
  { image: medal5, left: 81.905, top: 709, width: 11.797, imageLeft: -16.408, imageTop: -12.107, imageSize: 133.207 },
] as const

const initialCountdownSeconds = 8 * 24 * 60 * 60 + 14 * 60 * 60 + 12 * 60 + 2

const countdownLayout = [
  { unit: '일', center: 11.185 },
  { unit: '시간', center: 36.386 },
  { unit: '분', center: 64.216 },
  { unit: '초', center: 89.555 },
] as const

function Medal({ item }: { item: (typeof medals)[number] }) {
  return (
    <div
      className="absolute aspect-square overflow-hidden rounded-[50%]"
      style={{ left: `${item.left}%`, top: item.top, width: `${item.width}%` }}
    >
      <img
        src={item.image}
        alt=""
        className="absolute max-w-none"
        style={{ left: `${item.imageLeft}%`, top: `${item.imageTop}%`, width: `${item.imageSize}%`, height: 'auto' }}
      />
    </div>
  )
}

function StepCard({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <div className="flex w-full items-center gap-3.5 overflow-hidden rounded-xl bg-[#f2f2f2] px-4 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#831317] text-[15px] leading-none font-bold text-white">{index}</span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[3px] overflow-hidden">
        <h3 className="text-[15px] leading-[1.2] font-bold tracking-[-0.3px] whitespace-nowrap">{title}</h3>
        <p className="w-full text-[12px] leading-[1.45] font-normal tracking-[-0.24px] text-[#737373]">{description}</p>
      </div>
    </div>
  )
}

function ChallengeDetails() {
  const navigate = useNavigate()
  const [remainingSeconds, setRemainingSeconds] = useState(initialCountdownSeconds)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const countdownValues = [
    Math.floor(remainingSeconds / (24 * 60 * 60)),
    Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60)),
    Math.floor((remainingSeconds % (60 * 60)) / 60),
    remainingSeconds % 60,
  ].map((value) => value.toString().padStart(2, '0'))

  return (
    <div className="mx-auto h-dvh w-full max-w-107.5 overflow-x-hidden overflow-y-auto bg-white pt-[env(safe-area-inset-top)] text-[#0d0d0d]" data-node-id="1542:1678">
      <div className="relative w-full">
      <header className="absolute inset-x-0 top-0 z-10 h-17.5 w-full overflow-hidden bg-white">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-4.5 flex size-6 items-center justify-center">
          <img src={backIcon} alt="" className="size-6 rotate-180" />
        </button>
        <h1 className="absolute top-6.5 left-1/2 -translate-x-1/2 text-[18px] leading-none font-bold tracking-[-0.54px] whitespace-nowrap text-[#831317]">챌린지</h1>
      </header>

      <section className="absolute top-17.5 left-0 h-[319px] w-full overflow-hidden" aria-label="오대륙 와인 챌린지">
        <img src={heroImage} alt="다섯 종류의 와인잔과 와인병" className="absolute top-[0.25px] left-0 h-auto w-full max-w-none" />
        <span
          className="absolute top-[15px] left-5 rounded-[25px] bg-black/40 px-3 py-[5px] text-[12px] leading-none font-medium tracking-[-0.24px] text-white backdrop-blur-[4px]"
          style={{
            boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.55), inset -1px -1px 1px rgba(0,0,0,0.22), 0 2px 4px rgba(0,0,0,0.12)',
          }}
          data-node-id="1542:1681"
        >
          참여중
        </span>
      </section>

      <section className="absolute top-[440px] right-5 left-5 flex flex-col items-start gap-1.5 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <h2 className="text-[22px] leading-[1.3] font-bold tracking-[-0.66px] whitespace-nowrap">오대륙 와인 마셔보기</h2>
          <span className="rounded-[25px] bg-[#831317] px-3 py-[5px] text-[12px] leading-none font-medium tracking-[-0.24px] text-white">참여중</span>
        </div>
        <p className="w-full text-[14px] leading-[1.45] font-normal tracking-[-0.28px] text-[#737373]">대륙별 와인을 경험하고 나만의 와인 취향 찾기</p>
      </section>

      <section className="absolute inset-x-0 top-0 h-[768px] overflow-hidden" aria-label="대륙별 진행 현황">
        <div className="absolute top-[527px] left-[6.279%] h-[220px] w-[13.953%] overflow-hidden">
          <img src={bottlesImage} alt="유럽 와인" className="absolute top-[-25px] left-[-157.167%] h-auto w-[301.167%] max-w-none" />
        </div>
        <div className="absolute top-[529px] left-[24.619%] h-[218px] w-[13.256%] overflow-hidden">
          <img src={bottlesImage} alt="북미 와인" className="absolute top-[-25px] left-[-46.14%] h-auto w-[317.018%] max-w-none" />
        </div>
        {[{ left: 41.281, top: 532 }, { left: 58.481, top: 531 }, { left: 76.091, top: 530 }].map((position, index) => (
          <img key={position.left} src={ghostBottle} alt={`${index + 3}번째 미완료 대륙`} className="absolute h-auto w-[15.116%] object-bottom opacity-45" style={{ left: `${position.left}%`, top: position.top }} />
        ))}
        {medals.map((item) => <Medal key={item.left} item={item} />)}
      </section>

      <main className="px-5 pt-[800px] pb-[30px]">
        <section className="flex w-full flex-col items-start gap-2 overflow-hidden rounded-xl bg-[#f2f2f2] p-[18px]">
          <h2 className="text-[12px] leading-[1.2] font-normal tracking-[-0.24px] text-[#831317]">INTRODUCTION</h2>
          <p className="w-full text-[14px] leading-[1.6] font-normal tracking-[-0.28px] text-[#595959]">
            이번 주 챌린지는 <strong className="font-bold">오대륙 와인 마셔보기</strong>입니다. 유럽, 북미, 남미, 오세아니아, 아프리카를 대표하는 와인을 경험하며 산지마다 다른 매력과 풍미를 느껴보세요.
          </p>
        </section>
        <div className="mt-6 h-px w-full bg-black/12" />

        <section className="mt-9 flex w-full flex-col items-start gap-3">
          <h2 className="font-noto text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">참여 방법</h2>
          {steps.map((step, index) => <StepCard key={step.title} index={index + 1} {...step} />)}
        </section>

        <section className="mt-[26px] flex w-full flex-col items-start gap-2.5 overflow-hidden rounded-xl bg-[#831317] p-5 text-white">
          <p className="text-[12px] leading-[1.2] font-normal tracking-[-0.24px] text-[#e5cccc]">REWARD</p>
          <h2 className="text-[18px] leading-[1.25] font-bold tracking-[-0.36px]">오대륙 와인 탐험가 배지</h2>
          <p className="w-full text-[13px] leading-[1.55] font-normal tracking-[-0.26px] text-[#f2e5e5]">
            오대륙 와인을 모두 기록하면 한정판 디지털 배지와 함께 코르크 10개가 지급됩니다.
          </p>
        </section>

        <aside className="mt-7 flex w-full items-stretch gap-3">
          <span className="w-[3px] shrink-0 bg-[#831317]" />
          <p className="min-w-0 flex-1 text-[12px] leading-[1.55] font-normal tracking-[-0.24px] text-[#737373]">
            * 챌린지 기간 동안 대륙별 와인을 자유롭게 기록할 수 있습니다.<br /> 완주 여부는 기록한 와인 산지를 기준으로 집계됩니다.
          </p>
        </aside>

        <div className="mt-6 flex w-full items-center gap-6">
          <p className="shrink-0 text-[15px] leading-[1.2] font-bold tracking-[-0.3px]">종료까지</p>
          <section className="relative h-17.5 min-w-0 flex-1 rounded-xl border border-[#831317] bg-[#f2f2f2]" aria-label="챌린지 종료 카운트다운">
            {countdownLayout.map((item, index) => (
              <div key={item.unit} className="absolute top-2.5 -translate-x-1/2 text-center text-[#831317]" style={{ left: `${item.center}%` }}>
                <p className="text-[25px] leading-none font-normal tracking-[-0.5px]">{countdownValues[index]}</p>
                <p className="mt-2.5 text-[12px] leading-none font-normal tracking-[-0.24px]">{item.unit}</p>
              </div>
            ))}
            {[22.414, 50.313, 78.213].map((left) => <span key={left} className="absolute top-[25px] text-[15px] leading-none text-[#831317]" style={{ left: `${left}%` }}>: </span>)}
          </section>
        </div>

        <button type="button" disabled className="mt-6 flex w-full items-center justify-center overflow-hidden rounded-xl bg-black/20 py-[17px] text-[16px] leading-none font-bold text-white disabled:cursor-default">
          챌린지 완료
        </button>
      </main>
      </div>
    </div>
  )
}

export default ChallengeDetails
