import { useEffect, useRef, useState } from 'react'
import grapeMarker from '../assets/map/grape-marker.png'
import placeCardPhoto from '../assets/map/place-card-photo.png'
import {
  loadKakaoMaps,
  type KakaoMarkerInstance,
  type KakaoPlace,
} from '../lib/kakaoMaps'

const SORT_OPTIONS = ['인기순', '최신순', '평점순', '가격순'] as const
const DEFAULT_CENTER = { latitude: 37.5192, longitude: 127.0352 }
// 선택된 매장 카드가 화면 하단을 덮으므로, 마커를 고르면 지도를 이 비율만큼 위로 밀어
// 마커가 카드 뒤로 가려지지 않고 상단의 보이는 영역에 오도록 한다.
const CARD_CLEARANCE_RATIO = 0.3

function WineMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<KakaoMarkerInstance[]>([])
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectedPlaceRef = useRef<KakaoPlace | null>(null)
  const resumeSearchRef = useRef<() => void>(() => {})
  const [activeSort, setActiveSort] = useState<(typeof SORT_OPTIONS)[number]>(SORT_OPTIONS[0])
  const [places, setPlaces] = useState<KakaoPlace[]>([])
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
  const [mapError, setMapError] = useState('')
  const [placeImages, setPlaceImages] = useState<Record<string, string | null>>({})
  const [failedPlaceImages, setFailedPlaceImages] = useState<Record<string, boolean>>({})

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
          const options = {
            location: map.getCenter(),
            radius: 20000,
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

    fetch(`/api/place-image?v=4&url=${encodeURIComponent(selectedPlace.place_url)}`)
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
  const fetchedImage =
    selectedPlace && !failedPlaceImages[selectedPlace.id]
      ? placeImages[selectedPlace.id]
      : null
  const selectedImage = fetchedImage || placeCardPhoto

  return (
    <div
      className="relative -mx-[4.651cqw] -mt-[2px] h-[calc(100%+2px)] min-h-0 w-[calc(100%+9.302cqw)] overflow-hidden bg-[#f2f2f2]"
      data-node-id="1829:9571"
    >
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

      <div
        className="absolute inset-x-0 top-0 z-10 flex h-[66px] items-start gap-[2.558cqw] overflow-x-auto px-[6.512cqw] pt-[17px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-node-id="1829:9573"
      >
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveSort(option)}
            className={`h-8 w-16 shrink-0 rounded-full border px-4 text-center text-[12px] leading-4 font-medium tracking-[0.96px] whitespace-nowrap shadow-[0_0_2.5px_rgba(0,0,0,0.25)] ${
              activeSort === option
                ? 'border-[#831317] bg-[#831317] text-white'
                : 'border-white/50 bg-[#f9f7f6] text-[#444141]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedPlace && (
        <article
          className="wine-map-card-rise fixed bottom-[92px] left-1/2 z-40 flex w-[calc(100%_-_32px)] max-w-[361px] -translate-x-1/2 flex-col overflow-hidden rounded-[33px] bg-white p-[15px_16px_20px_18px] shadow-[0_0_6px_rgba(0,0,0,0.05)]"
          data-node-id="1829:9601"
        >
          <button
            type="button"
            aria-label="매장 정보 닫기"
            onClick={closeSelectedPlace}
            className="absolute top-3 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-black/35 text-xl leading-none text-white"
          >
            ×
          </button>
          <div className="relative aspect-[325/208] w-full shrink-0 overflow-hidden rounded-[20px]" data-node-id="1829:9612">
            <img
              key={selectedPlace.id}
              src={selectedImage}
              alt=""
              onError={() => {
                if (fetchedImage) {
                  setFailedPlaceImages((current) => ({
                    ...current,
                    [selectedPlace.id]: true,
                  }))
                }
              }}
              className={
                fetchedImage
                  ? 'absolute inset-0 size-full object-cover'
                  : 'absolute top-[-118.02%] left-[-0.05%] h-[236.06%] w-[100.1%] max-w-none object-cover'
              }
            />
            <span className="glass-tab absolute top-[11px] left-[6px] flex h-[27px] items-center justify-center rounded-full px-4 text-[12px] leading-4 font-medium tracking-[0.96px] text-white">
              Nearby
            </span>
          </div>
          <div className="mt-[15px] px-1">
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
