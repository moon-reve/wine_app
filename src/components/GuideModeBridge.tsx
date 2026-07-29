import { useEffect } from 'react'

type GuideModeMessage = {
  type: 'viner:guide-mode'
  enabled: boolean
}

function GuideModeBridge() {
  useEffect(() => {
    const isEmbeddedDesktop = new URLSearchParams(window.location.search).get('embed') === 'desktop'
    if (!isEmbeddedDesktop) return

    const handleMessage = (event: MessageEvent<GuideModeMessage>) => {
      if (event.origin !== window.location.origin || event.source !== window.parent) return
      if (event.data?.type !== 'viner:guide-mode') return

      document.documentElement.toggleAttribute('data-guide-mode', event.data.enabled)
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
      document.documentElement.removeAttribute('data-guide-mode')
    }
  }, [])

  return null
}

export default GuideModeBridge
