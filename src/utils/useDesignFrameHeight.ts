import { useEffect, useState } from 'react'

const DESIGN_WIDTH = 430
const DESIGN_HEIGHT = 932

function computeHeight() {
  const zoom = Math.min(1, window.innerWidth / DESIGN_WIDTH)
  // Below the design width the page is zoomed out to fit, so filling the
  // real viewport height keeps the frame edge-to-edge on phones. At or above
  // the design width (desktop/web) the frame is capped at the design height
  // instead of stretching to the browser window's height — otherwise a wide,
  // short window forces full-bleed video/image backgrounds into a squatter
  // box than they were authored for, cropping their top and bottom.
  return zoom < 1 ? window.innerHeight / zoom : DESIGN_HEIGHT
}

export function useDesignFrameHeight() {
  const [height, setHeight] = useState(computeHeight)

  useEffect(() => {
    const update = () => setHeight(computeHeight())

    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    // iOS reports a stale window.innerHeight for a moment right after a
    // home-screen PWA launches (before its chrome/safe areas settle), and
    // never fires `resize` once it corrects itself — so re-measure a few
    // times just after mount to pick up the corrected value.
    window.visualViewport?.addEventListener('resize', update)
    const settleTimers = [50, 300, 1000].map((delay) => window.setTimeout(update, delay))

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.visualViewport?.removeEventListener('resize', update)
      settleTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return height
}
