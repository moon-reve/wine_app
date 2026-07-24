import { useEffect, useRef, useState } from 'react'
import grapeMarker from '../assets/map/grape-marker.png'
import placeCardPhoto from '../assets/map/place-card-photo.png'

const SORT_OPTIONS = ['인기순', '최신순', '평점순', '가격순']
const DEFAULT_CENTER = { latitude: 37.5192, longitude: 127.0352 }
// 선택된 매장 카드가 화면 하단을 덮으므로, 마커를 고르면 지도를 이 비율만큼 위로 밀어
// 마커가 카드 뒤로 가려지지 않고 상단의 보이는 영역에 오도록 한다.
const CARD_CLEARANCE_RATIO = 0.3

type KakaoPlace = {
  id: string
  place_name: string
  address_name: string
  road_address_name: string
  phone: string
  place_url: string
  x: string
  y: string
}

type KakaoLatLng = object
type KakaoMapInstance = {
  getCenter: () => KakaoLatLng
  setCenter: (position: KakaoLatLng) => void
  panBy: (dx: number, dy: number) => void
  relayout: () => void
}
type KakaoMarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void
}

type KakaoMapsApi = {
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

function loadKakaoMaps(appKey: string) {
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

function WineMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<KakaoMarkerInstance[]>([])
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectedPlaceRef = useRef<KakaoPlace | null>(null)
  const resumeSearchRef = useRef<() => void>(() => {})
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS[0])
  const [places, setPlaces] = useState<KakaoPlace[]>([])
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
  const [mapError, setMapError] = useState('')
  const [placeImages, setPlaceImages] = useState<Record<string, string | null>>({})

  useEffect(() => {
    const container = mapContainerRef.current
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY?.trim()

    if (!container) return
    if (!appKey) {
      setMapError('카카오 지도 키가 설정되지 않았습니다.')
      return
    }

    let disposed = false

    void loadKakaoMaps(appKey)
      .then((kakaoMaps) => {
        if (disposed) return

        const defaultPosition = new kakaoMaps.LatLng(DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude)
        const map = new kakaoMaps.Map(container, { center: defaultPosition, level: 6 })
        const placeService = new kakaoMaps.services.Places()
        const markerImage = new kakaoMaps.MarkerImage(
          grapeMarker,
          new kakaoMaps.Size(31, 38),
          { offset: new kakaoMaps.Point(15.5, 38) },
        )

        const clearMarkers = () => {
          markersRef.current.forEach((marker) => marker.setMap(null))
          markersRef.current = []
        }

        const focusPlace = (place: KakaoPlace) => {
          // 카드가 이미 열려 있으면 지도는 그대로 두고 카드 내용만 바꾼다.
          // 마커를 바꿔 누를 때마다 매번 슬라이드가 다시 올라오면 눈이 아프다.
          const wasAlreadyOpen = selectedPlaceRef.current !== null
          selectedPlaceRef.current = place
          setSelectedPlace(place)

          if (!wasAlreadyOpen) {
            map.setCenter(new kakaoMaps.LatLng(Number(place.y), Number(place.x)))
            map.panBy(0, container.clientHeight * CARD_CLEARANCE_RATIO)
          }
        }

        const showPlaces = (results: KakaoPlace[]) => {
          if (disposed) return
          // 카드가 열려 있는 동안 마커 목록을 갈아치우면, 방금 선택한 장소가 새
          // 검색 결과(가까운 7곳)에서 빠져 카드가 곧바로 닫혀버릴 수 있다.
          if (selectedPlaceRef.current) return

          const visiblePlaces = results.slice(0, 7)
          clearMarkers()
          setPlaces(visiblePlaces)

          markersRef.current = visiblePlaces.map((place) => {
            const marker = new kakaoMaps.Marker({
              map,
              position: new kakaoMaps.LatLng(Number(place.y), Number(place.x)),
              image: markerImage,
            })
            kakaoMaps.event.addListener(marker, 'click', () => focusPlace(place))
            return marker
          })
        }

        const searchNearbyWinePlaces = () => {
          if (selectedPlaceRef.current) return

          const options = {
            location: map.getCenter(),
            radius: 10000,
            sort: kakaoMaps.services.SortBy.DISTANCE,
          }

          placeService.keywordSearch('와인샵', (wineShops, status) => {
            if (status === kakaoMaps.services.Status.OK) {
              showPlaces(wineShops)
              return
            }

            if (status === kakaoMaps.services.Status.ZERO_RESULT) {
              placeService.keywordSearch('와인바', (wineBars, wineBarStatus) => {
                if (wineBarStatus === kakaoMaps.services.Status.OK) showPlaces(wineBars)
                else showPlaces([])
              }, options)
            }
          }, options)
        }

        kakaoMaps.event.addListener(map, 'idle', () => {
          if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
          searchTimerRef.current = setTimeout(searchNearbyWinePlaces, 350)
        })

        resumeSearchRef.current = searchNearbyWinePlaces
        searchNearbyWinePlaces()

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              if (disposed) return
              map.setCenter(new kakaoMaps.LatLng(coords.latitude, coords.longitude))
            },
            () => undefined,
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 },
          )
        }
      })
      .catch((error: unknown) => {
        if (!disposed) setMapError(error instanceof Error ? error.message : '지도를 불러오지 못했습니다.')
      })

    return () => {
      disposed = true
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
      markersRef.current.forEach((marker) => marker.setMap(null))
      markersRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!selectedPlace || selectedPlace.id in placeImages) return

    let cancelled = false
    const placeId = selectedPlace.id

    fetch(`/api/place-image?url=${encodeURIComponent(selectedPlace.place_url)}`)
      .then((response) => (response.ok ? response.json() : { image: null }))
      .then((data: { image: string | null }) => {
        if (!cancelled) setPlaceImages((current) => ({ ...current, [placeId]: data.image }))
      })
      .catch(() => {
        if (!cancelled) setPlaceImages((current) => ({ ...current, [placeId]: null }))
      })

    return () => {
      cancelled = true
    }
  }, [selectedPlace, placeImages])

  const closeSelectedPlace = () => {
    selectedPlaceRef.current = null
    setSelectedPlace(null)
    resumeSearchRef.current()
  }

  const selectedAddress = selectedPlace?.road_address_name || selectedPlace?.address_name
  const fetchedImage = selectedPlace && placeImages[selectedPlace.id]
  const selectedImage = fetchedImage || placeCardPhoto

  return (
    <div className="relative -mx-5 h-full min-h-0 w-[calc(100%+40px)] overflow-hidden bg-[#f3f1ed]" data-node-id="1546:4174">
      <div ref={mapContainerRef} aria-label="주변 와인 매장 지도" className="absolute inset-0 size-full" />

      {mapError && (
        <div role="alert" className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm leading-6 text-[#737373]">
          {mapError}
        </div>
      )}

      {!mapError && places.length === 0 && (
        <div className="pointer-events-none absolute top-[78px] left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs text-[#737373] shadow-sm">
          주변 와인 매장을 찾고 있어요
        </div>
      )}

      <div className="absolute top-0 right-[41px] left-7 z-10 flex h-[66px] items-center gap-[11px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-node-id="1546:4204">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            className={`shrink-0 rounded-full border px-[16px] py-[8px] text-[12px] leading-4 font-medium tracking-[0.96px] whitespace-nowrap shadow-[0_0_2.5px_rgba(0,0,0,0.25)] ${
              activeSort === option ? 'border-[#831317] bg-[#831317] text-white' : 'border-white/50 bg-[#f9f7f6] text-[#444141]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedPlace && (
        <article className="wine-map-card-rise fixed bottom-[92px] left-1/2 z-40 h-[342px] w-[calc(100%-69px)] max-w-[361px] overflow-hidden rounded-[33px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.05)]" data-node-id="1546:4233">
          <button type="button" aria-label="매장 정보 닫기" onClick={closeSelectedPlace} className="absolute top-3 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/35 text-xl leading-none text-white">
            ×
          </button>
          <div className="absolute top-[15px] right-4 left-[18px] h-[208px] overflow-hidden rounded-[20px]" data-node-id="1546:4244">
            <img
              src={selectedImage}
              alt=""
              className={
                fetchedImage
                  ? 'absolute inset-0 size-full object-cover'
                  : 'absolute top-[-118.02%] left-[-0.05%] h-[236.06%] w-[100.1%] max-w-none object-cover'
              }
            />
            <span className="absolute top-[11px] left-[6px] flex h-[27px] items-center justify-center rounded-full bg-[#e1dfdb]/10 px-4 text-[12px] leading-4 font-medium tracking-[0.96px] text-white backdrop-blur-[2px]">
              Nearby
            </span>
          </div>
          <div className="absolute top-[238px] right-[22px] left-[22px]">
            <a href={selectedPlace.place_url} target="_blank" rel="noreferrer" className="block truncate text-[20px] leading-[25px] font-semibold text-[#1e1b18]">
              {selectedPlace.place_name}
            </a>
            <p className="mt-1 line-clamp-2 text-[14px] leading-5 text-black">{selectedAddress}</p>
            <div className="mt-3 flex items-center gap-2">
              <a href={selectedPlace.place_url} target="_blank" rel="noreferrer" className="rounded-full bg-[#831317] px-3 py-1 text-[11px] leading-4 tracking-[0.96px] text-white">
                지도 상세보기
              </a>
              {selectedPlace.phone && <span className="truncate text-[11px] text-[#737373]">{selectedPlace.phone}</span>}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}

export default WineMap
