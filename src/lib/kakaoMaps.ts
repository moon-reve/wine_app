export type KakaoPlace = {
  id: string
  place_name: string
  category_name: string
  address_name: string
  road_address_name: string
  phone: string
  place_url: string
  distance: string
  x: string
  y: string
}

export type KakaoLatLng = object
export type KakaoMapInstance = {
  getCenter: () => KakaoLatLng
  setCenter: (position: KakaoLatLng) => void
  panBy: (dx: number, dy: number) => void
  relayout: () => void
}

export type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void
}

export type KakaoMapsApi = {
  load: (callback: () => void) => void
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMapInstance
  Marker: new (options: { map: KakaoMapInstance; position: KakaoLatLng; image: object }) => KakaoMarkerInstance
  MarkerImage: new (src: string, size: object, options: { offset: object }) => object
  Size: new (width: number, height: number) => object
  Point: new (x: number, y: number) => object
  event: {
    addListener: (target: object, eventName: string, callback: () => void) => void
  }
  services: {
    Places: new () => {
      keywordSearch: (
        keyword: string,
        callback: (places: KakaoPlace[], status: string) => void,
        options: { location: KakaoLatLng; radius: number; sort: string },
      ) => void
    }
    Status: { OK: string; ZERO_RESULT: string }
    SortBy: { DISTANCE: string }
  }
}

declare global {
  interface Window {
    kakao?: { maps: KakaoMapsApi }
  }
}

let kakaoMapsPromise: Promise<KakaoMapsApi> | null = null

export function loadKakaoMaps(appKey: string) {
  if (window.kakao?.maps) {
    return new Promise<KakaoMapsApi>((resolve) => window.kakao?.maps.load(() => resolve(window.kakao!.maps)))
  }

  if (kakaoMapsPromise) return kakaoMapsPromise

  kakaoMapsPromise = new Promise<KakaoMapsApi>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`
    script.async = true
    script.onload = () => {
      if (!window.kakao?.maps) {
        reject(new Error('카카오 지도 SDK를 불러오지 못했습니다.'))
        return
      }
      window.kakao.maps.load(() => resolve(window.kakao!.maps))
    }
    script.onerror = () => reject(new Error('카카오 지도 네트워크 연결에 실패했습니다.'))
    document.head.appendChild(script)
  })

  return kakaoMapsPromise
}
