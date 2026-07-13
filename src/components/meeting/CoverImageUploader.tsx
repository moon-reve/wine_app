import { useEffect, useRef, useState } from 'react'

type CoverImageUploaderProps = {
  defaultImage: string
  onChange: (file: File) => void
}

function CoverImageUploader({ defaultImage, onChange }: CoverImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState(defaultImage)

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const changeImage = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)

    const nextPreviewUrl = URL.createObjectURL(file)
    previewUrlRef.current = nextPreviewUrl
    setPreviewUrl(nextPreviewUrl)
    onChange(file)
  }

  return (
    <div className="relative h-49 w-full overflow-hidden">
      <img src={previewUrl} alt="모임 커버" className="size-full object-cover" />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          changeImage(event.target.files?.[0])
          event.target.value = ''
        }}
      />
      <button
        type="button"
        className="absolute right-4 bottom-4 h-7.5 rounded-full bg-white px-5 text-[11px] font-medium text-[#851317]"
        onClick={() => inputRef.current?.click()}
      >
        이미지 변경
      </button>
    </div>
  )
}

export default CoverImageUploader
