import { useCallback, useState } from 'react'
import ShareActionSheet from './ShareActionSheet'

type WineShareButtonProps = {
  iconSrc: string
  wineName: string
  description: string
}

function WineShareButton({ iconSrc, wineName, description }: WineShareButtonProps) {
  const [open, setOpen] = useState(false)
  const closeModal = useCallback(() => setOpen(false), [])

  const getShareUrl = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('embed')
    return url.toString()
  }

  return (
    <>
      <button type="button" aria-label={`${wineName} 공유하기`} onClick={() => setOpen(true)} className="flex size-6 items-center justify-center">
        <img src={iconSrc} alt="" className="h-[19px] w-[17px]" />
      </button>
      <ShareActionSheet
        open={open}
        onClose={closeModal}
        title={wineName}
        description={description}
        url={getShareUrl()}
        heading="와인 공유하기"
      />
    </>
  )
}

export default WineShareButton
