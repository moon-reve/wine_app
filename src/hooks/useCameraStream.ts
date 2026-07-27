import { useCallback, useEffect, useRef, useState } from 'react'

type FacingMode = 'user' | 'environment'

export function useCameraStream(enabled: boolean, initialFacingMode: FacingMode = 'environment') {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<FacingMode>(initialFacingMode)
  const [error, setError] = useState<string | null>(null)
  const [hasStream, setHasStream] = useState(false)

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
    setFacingMode((mode) => (mode === 'environment' ? 'user' : 'environment'))
  }, [])

  const retryCamera = useCallback(() => {
    requestCamera(facingMode)
  }, [requestCamera, facingMode])

  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video || video.videoWidth === 0) return null

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [])

  return { videoRef, facingMode, switchCamera, capture, error, hasCamera: hasStream, retryCamera }
}
