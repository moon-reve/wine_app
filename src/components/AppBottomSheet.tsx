import { useEffect } from 'react'

type AppBottomSheetProps = {
  open: boolean
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onClose: () => void
}

export default function AppBottomSheet({
  open,
  title,
  message,
  confirmLabel = '확인',
  cancelLabel,
  onConfirm,
  onClose,
}: AppBottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="app-bottom-sheet-title">
      <button type="button" aria-label="팝업 닫기" onClick={onClose} className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      <section className="relative z-10 w-full max-w-[430px] rounded-t-[24px] bg-white px-5 pt-6 pb-[max(28px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#d9d9d9]" />
        <h2 id="app-bottom-sheet-title" className="text-center text-[18px] leading-[1.35] font-bold tracking-[-0.54px] text-[#0d0d0d]">{title}</h2>
        {message ? <p className="mt-2 text-center text-[13px] leading-[1.55] text-[#737373]">{message}</p> : null}
        <div className={`mt-6 grid gap-2.5 ${cancelLabel ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {cancelLabel ? (
            <button type="button" onClick={onClose} className="h-12 rounded-[12px] border border-[#d9d9d9] bg-white text-[15px] font-bold text-[#595959]">
              {cancelLabel}
            </button>
          ) : null}
          <button type="button" onClick={onConfirm} className="h-12 rounded-[12px] bg-[#831317] text-[15px] font-bold text-white">
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
