import { useEffect, useState } from 'react'

const DESKTOP_QUERY = '(min-width: 1280px)'

export function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY)
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)

    setIsDesktop(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isDesktop
}
