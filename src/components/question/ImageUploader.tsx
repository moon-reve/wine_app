import { useEffect, useRef, useState } from 'react'

type ImagePreview = {
  file: File
  url: string
}

const MAX_IMAGES = 3

function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const imagesRef = useRef<ImagePreview[]>([])
  const [images, setImages] = useState<ImagePreview[]>([])
  const [message, setMessage] = useState('')

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

    if (inputRef.current) inputRef.current.value = ''
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
        ref={inputRef}
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
              onClick={() => inputRef.current?.click()}
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
    </div>
  )
}

export default ImageUploader
