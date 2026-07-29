import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { shareToKakao } from '../lib/kakaoShare'

type ShareActionSheetProps = {
  open: boolean
  onClose: () => void
  title: string
  description: string
  url: string
  heading?: string
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('Copy failed')
}

function ShareActionSheet({
  open,
  onClose,
  title,
  description,
  url,
  heading = '공유하기',
}: ShareActionSheetProps) {
  const [notice, setNotice] = useState('')
  const [sharing, setSharing] = useState(false)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  useEffect(() => {
    if (!open) {
      setNotice('')
      setSharing(false)
    }
  }, [open])

  const handleCopy = async () => {
    try {
      await copyText(url)
      setNotice('링크가 복사되었습니다.')
    } catch {
      setNotice('링크를 복사하지 못했습니다.')
    }
  }

  const handleKakaoShare = async () => {
    setSharing(true)
    setNotice('')
    try {
      await shareToKakao({ title, description, url })
      onClose()
    } catch {
      setNotice('카카오톡 공유를 시작하지 못했습니다.')
    } finally {
      setSharing(false)
    }
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="share-sheet-title">
      <button type="button" aria-label="공유 팝업 닫기" onClick={onClose} className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      <section className="relative z-10 w-screen rounded-t-[24px] bg-white px-5 pt-6 pb-[max(28px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#d9d9d9]" />
        <h2 id="share-sheet-title" className="text-center text-[18px] leading-[1.35] font-bold tracking-[-0.54px] text-[#0d0d0d]">{heading}</h2>
        <p className="mt-2 truncate text-center text-[13px] leading-[1.5] text-[#737373]">{title}</p>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <button type="button" onClick={handleCopy} className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-[#d9d9d9] bg-white text-[15px] font-bold text-[#595959]">
            <span aria-hidden="true">🔗</span>
            링크 복사
          </button>
          <button type="button" disabled={sharing} onClick={handleKakaoShare} className="flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[#fee500] text-[15px] font-bold text-[#191919] disabled:opacity-60">
            <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-[#191919] text-[11px] text-[#fee500]">K</span>
            {sharing ? '연결 중...' : '카카오톡 보내기'}
          </button>
        </div>

        {notice ? <p role="status" className="mt-4 text-center text-[13px] font-medium text-[#831317]">{notice}</p> : null}
        <button type="button" onClick={onClose} className="mt-4 h-11 w-full rounded-[12px] bg-[#f2f2f2] text-[14px] font-bold text-[#595959]">닫기</button>
      </section>
    </div>,
    document.body,
  )
}

export default ShareActionSheet
