import { useCallback, useEffect, useRef, useState } from 'react'

type FacingMode = 'user' | 'environment'

export function useCameraStream(enabled: boolean, initialFacingMode: FacingMode = 'environment') {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<FacingMode>(initialFacingMode)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!enabled) return
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('이 브라우저에서는 카메라를 사용할 수 없습니다.')
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError('카메라를 사용할 수 없어요. 권한을 확인해주세요.')
      })

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [enabled, facingMode])

  const switchCamera = useCallback(() => {
    setFacingMode((mode) => (mode === 'environment' ? 'user' : 'environment'))
  }, [])

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

  return { videoRef, facingMode, switchCamera, capture, error, hasCamera: !error }
}
