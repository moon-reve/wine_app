import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import wineSippersLogo from '../assets/splash/wine-sippers-logo.png'
import { useDesignFrameHeight } from '../utils/useDesignFrameHeight'

function Splash() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerHeight = useDesignFrameHeight()

  useEffect(() => {
    // iOS Safari doesn't reliably honor the `autoplay` attribute on a
    // React-mounted <video> — it sometimes needs an explicit play() call,
    // retried once the video actually has data to play.
    const video = videoRef.current
    if (!video) return

    // React doesn't reliably sync the `muted` JSX attribute to the DOM
    // property, and WebKit checks the property for its no-gesture
    // autoplay policy — so set it directly as well.
    video.muted = true
    const tryPlay = () => void video.play().catch(() => {})
    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    return () => video.removeEventListener('loadeddata', tryPlay)
  }, [])

  useEffect(() => {
    if (!document.querySelector('#onboarding-video-prefetch')) {
      const onboardingVideoPrefetch = document.createElement('link')
      onboardingVideoPrefetch.id = 'onboarding-video-prefetch'
      onboardingVideoPrefetch.rel = 'prefetch'
      onboardingVideoPrefetch.as = 'video'
      onboardingVideoPrefetch.href = '/videos/onboarding.mp4'
      onboardingVideoPrefetch.type = 'video/mp4'
      document.head.append(onboardingVideoPrefetch)
    }

    const transitionTimer = window.setTimeout(() => {
      navigate('/onboarding', { replace: true })
    }, 2000)

    return () => window.clearTimeout(transitionTimer)
  }, [navigate])

  return (
    <main
      className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-[#f3f0e7] text-black"
      style={{ height: `${containerHeight}px` }}
      aria-label="Wine Sippers 스플래시 화면"
      data-node-id="1546:7747"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/splash.mp4" type="video/mp4" />
      </video>

      <img
        className="pointer-events-none absolute left-1/2 top-[12.66%] z-10 h-auto w-[54.65%] max-w-[235px] -translate-x-1/2"
        src={wineSippersLogo}
        alt="Wine Sippers"
        width="235"
        height="45"
        data-node-id="1546:7748"
      />

      <div className="pointer-events-none absolute left-0 top-[85.3%] z-10 w-full text-center">
        <p
          className="m-0 font-delmon text-[20px] leading-[1.3] tracking-[-0.4px]"
          data-node-id="1546:7751"
        >
          Sip. Share. Belong
        </p>
        <p
          className="mt-[10px] mb-0 font-sans text-[16px] leading-[1.3] tracking-[-0.32px]"
          data-node-id="1546:7752"
        >
          취향을 나누고, 와인을 함께 즐겨보세요.
        </p>
      </div>
    </main>
  )
}

export default Splash
