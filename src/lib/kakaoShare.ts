type KakaoShareSdk = {
  isInitialized: () => boolean
  init: (key: string) => void
  Share: {
    sendDefault: (settings: {
      objectType: 'text'
      text: string
      link: { mobileWebUrl: string; webUrl: string }
    }) => void
  }
}

declare global {
  interface Window {
    Kakao?: KakaoShareSdk
  }
}

let kakaoSdkPromise: Promise<KakaoShareSdk> | null = null

function loadKakaoSdk() {
  if (window.Kakao) return Promise.resolve(window.Kakao)
  if (kakaoSdkPromise) return kakaoSdkPromise

  kakaoSdkPromise = new Promise<KakaoShareSdk>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-viner-kakao-sdk]')

    const handleLoad = () => {
      if (window.Kakao) resolve(window.Kakao)
      else reject(new Error('Kakao SDK is unavailable'))
    }

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        handleLoad()
        return
      }
      existingScript.addEventListener('load', handleLoad, { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Kakao SDK load failed')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
    script.async = true
    script.dataset.vinerKakaoSdk = 'true'
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      handleLoad()
    }, { once: true })
    script.addEventListener('error', () => reject(new Error('Kakao SDK load failed')), { once: true })
    document.head.appendChild(script)
  }).catch((error) => {
    kakaoSdkPromise = null
    throw error
  })

  return kakaoSdkPromise
}

export async function shareToKakao({ title, description, url }: { title: string; description: string; url: string }) {
  const kakaoKey = (import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY ?? import.meta.env.VITE_KAKAO_MAP_KEY)?.trim()
  if (!kakaoKey) throw new Error('Kakao JavaScript key is missing')

  const kakao = await loadKakaoSdk()
  if (!kakao.isInitialized()) kakao.init(kakaoKey)
  kakao.Share.sendDefault({
    objectType: 'text',
    text: `${title}\n${description}`,
    link: { mobileWebUrl: url, webUrl: url },
  })
}
