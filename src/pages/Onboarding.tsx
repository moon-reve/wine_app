import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../assets/login/google.png'
import kakaoIcon from '../assets/login/kakao.png'
import naverIcon from '../assets/login/naver.png'
import wineSippersLogo from '../assets/onboarding/wine-sippers-logo-white.svg'
import { useDesignFrameHeight } from '../utils/useDesignFrameHeight'

const slides = [
  {
    nodeId: '1546:7756',
    video: '/videos/onboarding-01.mp4',
    title: ['Find Your', 'Wine People'],
    description: [
      '나와 같은 취향을 가진 사람들과 와인 이야기와',
      '경험을 자유롭게 나누고 더 깊은 와인 라이프를 즐겨보세요.',
    ],
  },
  {
    nodeId: '1546:7811',
    video: '/videos/onboarding-02.mp4',
    title: ['Share your', 'Taste'],
    description: [
      '당신만의 와인 경험을 나누고 다른 사람들의',
      '이야기를 통해 새로운 와인을 만나보세요.',
    ],
  },
  {
    nodeId: '1546:7770',
    video: '/videos/onboarding-03.mp4',
    title: ['Sip. Share.', 'Connect'],
    description: [
      '한 잔의 와인에서 시작된 대화가 새로운 경험과 인연으로',
      '이어지는 Viner에서 함께 즐겨보세요.',
    ],
  },
] as const

function Onboarding() {
  const navigate = useNavigate()
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [isLogin, setIsLogin] = useState(false)
  const isLastSlide = activeSlide === slides.length - 1
  const containerHeight = useDesignFrameHeight()

  useEffect(() => {
    const cleanups = videoRefs.current.map((video, index) => {
      if (!video) return undefined

      // WebKit checks the DOM property when deciding whether autoplay is
      // allowed, so set it directly in addition to the JSX attribute.
      video.muted = true
      video.playbackRate = isLogin && index === activeSlide ? 0.5 : 1

      if (index !== activeSlide) {
        video.pause()
        return undefined
      }

      const tryPlay = () => void video.play().catch(() => {})
      tryPlay()
      video.addEventListener('loadeddata', tryPlay)
      return () => video.removeEventListener('loadeddata', tryPlay)
    })

    return () => cleanups.forEach((cleanup) => cleanup?.())
  }, [activeSlide, isLogin])

  const handleNext = () => {
    if (isLastSlide) {
      setIsLogin(true)
      return
    }

    setActiveSlide((slide) => slide + 1)
  }

  return (
    <main
      className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-black text-white"
      style={{ height: `${containerHeight}px` }}
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.video} className="relative h-full min-w-full overflow-hidden">
              <video
                ref={(video) => {
                  videoRefs.current[index] = video
                }}
                className="absolute left-1/2 top-1/2 h-full w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                autoPlay={index === 0}
                loop
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={(event) => {
                  event.currentTarget.playbackRate = isLogin && index === activeSlide ? 0.5 : 1
                }}
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 z-20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isLogin ? '-translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden={isLogin}
      >
        <header className="absolute inset-x-0 top-[env(safe-area-inset-top)] flex h-[70px] items-center justify-between px-5 pb-3 pt-[18px]">
          <div className="flex h-[49px] w-[110px] items-center justify-center">
            <img
              className="h-auto w-[102px]"
              src={wineSippersLogo}
              alt="Wine Sippers"
              width="102"
              height="20"
            />
          </div>
          <button
            type="button"
            className="text-[14px] font-medium leading-normal tracking-[-0.28px] text-white"
            onClick={() => setIsLogin(true)}
          >
            Skip
          </button>
        </header>

        <section className="absolute inset-x-0 bottom-[164px] overflow-hidden" aria-live="polite">
          <div
            className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
          >
            {slides.map((slide, index) => (
              <article
                key={slide.nodeId}
                className="min-w-full px-5"
                aria-hidden={index !== activeSlide}
                data-node-id={slide.nodeId}
              >
                <h1 className="m-0 font-delmon text-[48px] font-normal leading-none tracking-[-0.96px]">
                  {slide.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="mt-5 mb-0 text-[16px] leading-[1.5] tracking-[-0.32px]">
                  {slide.description.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        <button
          type="button"
          className={`absolute right-5 bottom-8 left-5 flex h-[52px] items-center justify-center rounded-full text-[16px] text-white transition-colors duration-300 ${
            isLastSlide
              ? 'border border-[#831317] bg-[#831317]'
              : 'glass-tab'
          }`}
          onClick={handleNext}
        >
          {isLastSlide ? 'Start' : 'Next'}
        </button>
      </div>

      <section
        className={`absolute inset-0 z-30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isLogin ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isLogin}
        data-node-id="1546:7784"
      >
        <div className="pointer-events-none absolute inset-0 bg-[rgba(80,80,80,0.5)] backdrop-blur-[2px]" />

        <header className="absolute inset-x-0 top-[env(safe-area-inset-top)] z-10 flex h-[70px] items-center px-5 pb-3 pt-[18px]">
          <button
            type="button"
            className="flex size-6 items-center justify-center"
            aria-label="온보딩으로 돌아가기"
            onClick={() => setIsLogin(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14.5 6.5L9 12l5.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </header>

        <p className="absolute inset-x-0 top-[12.66%] m-0 text-center font-delmon text-[28px] leading-[1.3]">
          Welcome
        </p>
        <img
          className="absolute left-1/2 top-[18.67%] h-[45px] w-[240px] -translate-x-1/2 object-contain"
          src={wineSippersLogo}
          alt="Wine Sippers"
          width="240"
          height="45"
        />

        <form
          className="absolute inset-0"
          onSubmit={(event) => {
            event.preventDefault()
            navigate('/home')
          }}
        >
          <input
            className="absolute top-[40.45%] right-5 left-5 h-[52px] rounded-full border border-white/70 bg-white/20 px-[27px] text-[16px] text-white outline-none placeholder:text-[#d7d7d7] focus:border-white"
            type="text"
            name="account"
            autoComplete="username"
            placeholder="아이디 및 이메일 입력"
            aria-label="아이디 및 이메일"
          />
          <input
            className="absolute top-[47.53%] right-5 left-5 h-[52px] rounded-full border border-white/40 bg-white/20 px-[27px] text-[16px] text-white outline-none placeholder:text-[#d7d7d7] focus:border-white"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="비밀번호 입력"
            aria-label="비밀번호"
          />
          <button
            type="submit"
            className="absolute top-[55.26%] right-5 left-5 flex h-[52px] items-center justify-center rounded-full bg-[#831317] text-[16px] text-white"
          >
            로그인
          </button>
        </form>

        <div className="absolute inset-x-0 top-[62.98%] flex items-center justify-center gap-3 text-[16px] leading-[1.3]">
          <button type="button" className="text-white">회원가입</button>
          <span aria-hidden="true">|</span>
          <button type="button" className="text-white">아이디/비밀번호 찾기</button>
        </div>

        <div className="absolute top-[84.87%] right-5 left-5 flex items-center gap-[10px]">
          <span className="h-px flex-1 bg-white" />
          <span className="text-[16px] leading-[1.3]">간편로그인</span>
          <span className="h-px flex-1 bg-white" />
        </div>

        <div className="absolute top-[89.27%] left-1/2 flex w-[250px] -translate-x-1/2 items-center justify-between">
          <button type="button" className="flex size-[50px] items-center justify-center bg-transparent" aria-label="카카오로 로그인">
            <img className="size-[50px] object-contain" src={kakaoIcon} alt="" />
          </button>
          <button type="button" className="flex size-[50px] items-center justify-center bg-transparent" aria-label="네이버로 로그인">
            <img className="size-[50px] object-contain" src={naverIcon} alt="" />
          </button>
          <button type="button" className="flex size-[50px] items-center justify-center rounded-full bg-white" aria-label="구글로 로그인">
            <img className="size-[23.214px] object-contain" src={googleIcon} alt="" />
          </button>
        </div>
      </section>
    </main>
  )
}

export default Onboarding
