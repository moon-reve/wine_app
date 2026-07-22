import { useEffect, useRef, useState } from 'react'

type ImagePreview = {
  file: File
  url: string
}

const MAX_IMAGES = 3

function ImageUploader() {
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const albumInputRef = useRef<HTMLInputElement>(null)
  const imagesRef = useRef<ImagePreview[]>([])
  const [images, setImages] = useState<ImagePreview[]>([])
  const [message, setMessage] = useState('')
  const [isSourceMenuOpen, setIsSourceMenuOpen] = useState(false)

  useEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    return () => {
      imagesRef.current.forEach(({ url }) => URL.revokeObjectURL(url))
    }
  }, [])

  const addImages = (files: FileList | null) => {
    if (!files) return

    const availableCount = MAX_IMAGES - images.length
    const selectedFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))
    const acceptedFiles = selectedFiles.slice(0, availableCount)

    setImages((current) => [
      ...current,
      ...acceptedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ])
    setMessage(selectedFiles.length > availableCount ? '사진은 최대 3장까지 첨부할 수 있습니다.' : '')

    if (cameraInputRef.current) cameraInputRef.current.value = ''
    if (albumInputRef.current) albumInputRef.current.value = ''
    setIsSourceMenuOpen(false)
  }

  const removeImage = (index: number) => {
    setImages((current) => {
      const image = current[index]
      URL.revokeObjectURL(image.url)
      return current.filter((_, imageIndex) => imageIndex !== index)
    })
    setMessage('')
  }

  return (
    <div>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(event) => addImages(event.target.files)}
      />
      <input
        ref={albumInputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => addImages(event.target.files)}
      />

      <div className="flex gap-3">
        {Array.from({ length: MAX_IMAGES }, (_, index) => {
          const image = images[index]

          if (image) {
            return (
              <div
                key={`${image.file.name}-${image.file.lastModified}`}
                className="relative aspect-square w-22.5 max-w-[30%] overflow-hidden rounded-[10px] border border-[#d9d9d9]"
              >
                <img src={image.url} alt={`첨부 사진 ${index + 1}`} className="size-full object-cover" />
                <button
                  type="button"
                  aria-label={`첨부 사진 ${index + 1} 삭제`}
                  className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            )
          }

          return (
            <button
              key={index}
              type="button"
              aria-label="사진 첨부"
              disabled={images.length >= MAX_IMAGES}
              className="flex aspect-square w-22.5 max-w-[30%] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#d9d9d9] bg-[#f7f6f5] text-[#737373] disabled:cursor-default"
              onClick={() => setIsSourceMenuOpen(true)}
            >
              {index === images.length && (
                <>
                  <span className="text-[26px] leading-none font-light">+</span>
                  <span className="mt-1 text-[11px] leading-none">{images.length}/3</span>
                </>
              )}
            </button>
          )
        })}
      </div>

      {message && <p className="mt-2 text-xs text-[#831317]">{message}</p>}

      {isSourceMenuOpen ? (
        <div className="fixed inset-0 z-60 mx-auto flex w-full max-w-[430px] items-end bg-black/35" role="dialog" aria-modal="true" aria-label="사진 첨부 방법 선택">
          <button type="button" className="absolute inset-0" aria-label="사진 첨부 메뉴 닫기" onClick={() => setIsSourceMenuOpen(false)} />
          <div className="relative z-10 w-full rounded-t-[20px] bg-white px-5 pt-5 pb-8 shadow-2xl">
            <p className="mb-4 text-center text-sm font-bold text-[#0d0d0d]">사진 첨부</p>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="h-12 rounded-[12px] border border-[#d9d9d9] text-sm font-medium" onClick={() => cameraInputRef.current?.click()}>
                촬영
              </button>
              <button type="button" className="h-12 rounded-[12px] bg-[#831317] text-sm font-medium text-white" onClick={() => albumInputRef.current?.click()}>
                앨범 선택
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ImageUploader
