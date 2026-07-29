import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

type FacingMode = 'user' | 'environment'
type PointerPosition = { x: number; y: number }

const MIN_ZOOM = 1
const MAX_ZOOM = 4

function pointerDistance(points: PointerPosition[]) {
  return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
}

export function useCameraStream(enabled: boolean, initialFacingMode: FacingMode = 'environment') {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const pointersRef = useRef(new Map<number, PointerPosition>())
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null)
  const [facingMode, setFacingMode] = useState<FacingMode>(initialFacingMode)
  const [error, setError] = useState<string | null>(null)
  const [hasStream, setHasStream] = useState(false)
  const [zoom, setZoom] = useState(MIN_ZOOM)

  const requestCamera = useCallback((mode: FacingMode) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('이 브라우저에서는 카메라를 사용할 수 없습니다.')
      return
    }

    navigator.mediaDevices
      // Ask for a bigger frame than the browser's low default (often
      // 640x480), but stop short of the sensor's true max — encoding a
      // 12MP+ capture to JPEG on the main thread can visibly freeze the UI
      // for a second or more on real phones. 2048 is still ~4MP, plenty
      // for a feed photo.
      .getUserMedia({ video: { facingMode: mode, width: { ideal: 2048 }, height: { ideal: 2048 } }, audio: false })
      .then((stream) => {
        streamRef.current?.getTracks().forEach((track) => track.stop())
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setError(null)
        setHasStream(true)
      })
      .catch(() => {
        setError('카메라를 사용할 수 없어요. 아래를 탭해서 권한을 허용해주세요.')
        setHasStream(false)
      })
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Calling getUserMedia automatically on mount works on Android/desktop,
    // but iOS Safari often silently refuses to show the permission prompt
    // unless the call happens inside a real user-gesture handler — so this
    // is a best-effort first try; retryCamera (wired to a tap) is the
    // reliable fallback for iOS.
    requestCamera(facingMode)

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setHasStream(false)
    }
  }, [enabled, facingMode, requestCamera])

  const switchCamera = useCallback(() => {
    setZoom(MIN_ZOOM)
    setFacingMode((mode) => (mode === 'environment' ? 'user' : 'environment'))
  }, [])

  const retryCamera = useCallback(() => {
    requestCamera(facingMode)
  }, [requestCamera, facingMode])

  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video || video.videoWidth === 0) return null

    const previewAspect = video.clientWidth / video.clientHeight
    const cameraAspect = video.videoWidth / video.videoHeight
    let coveredWidth = video.videoWidth
    let coveredHeight = video.videoHeight

    if (cameraAspect > previewAspect) {
      coveredWidth = video.videoHeight * previewAspect
    } else {
      coveredHeight = video.videoWidth / previewAspect
    }

    const sourceWidth = coveredWidth / zoom
    const sourceHeight = coveredHeight / zoom
    const sourceX = (video.videoWidth - sourceWidth) / 2
    const sourceY = (video.videoHeight - sourceHeight) / 2

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(coveredWidth)
    canvas.height = Math.round(coveredHeight)
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(
      video,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    )
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [zoom])

  const handleCameraPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') return

    event.currentTarget.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size === 2) {
      pinchStartRef.current = {
        distance: pointerDistance([...pointersRef.current.values()]),
        zoom,
      }
    }
  }, [zoom])

  const handleCameraPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointersRef.current.size !== 2 || !pinchStartRef.current) return

    const distance = pointerDistance([...pointersRef.current.values()])
    const nextZoom = pinchStartRef.current.zoom * (distance / pinchStartRef.current.distance)
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom)))
  }, [])

  const handleCameraPointerEnd = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size < 2) pinchStartRef.current = null

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  return {
    videoRef,
    facingMode,
    switchCamera,
    capture,
    error,
    hasCamera: hasStream,
    retryCamera,
    zoom,
    cameraGestureProps: {
      onPointerDown: handleCameraPointerDown,
      onPointerMove: handleCameraPointerMove,
      onPointerUp: handleCameraPointerEnd,
      onPointerCancel: handleCameraPointerEnd,
    },
  }
}
