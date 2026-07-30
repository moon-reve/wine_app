import { useEffect } from 'react'

type ContentActionSheetProps = {
  open: boolean
  title: string
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export default function ContentActionSheet({
  open,
  title,
  onEdit,
  onDelete,
  onClose,
}: ContentActionSheetProps) {
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
    <div className="fixed inset-0 z-100 flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="content-action-sheet-title">
      <button type="button" aria-label="메뉴 닫기" onClick={onClose} className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      <section className="relative z-10 w-screen rounded-t-[24px] bg-white px-5 pt-6 pb-[max(28px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#d9d9d9]" />
        <h2 id="content-action-sheet-title" className="text-center text-[18px] leading-[1.35] font-bold tracking-[-0.54px] text-[#0d0d0d]">{title}</h2>
        <div className="mt-6 flex flex-col gap-2.5">
          <button type="button" onClick={onEdit} className="h-12 rounded-[12px] bg-[#831317] text-[15px] font-bold text-white">
            수정하기
          </button>
          <button type="button" onClick={onDelete} className="h-12 rounded-[12px] border border-[#831317] bg-white text-[15px] font-bold text-[#831317]">
            삭제하기
          </button>
          <button type="button" onClick={onClose} className="h-12 rounded-[12px] bg-[#f2f2f2] text-[15px] font-bold text-[#595959]">
            취소
          </button>
        </div>
      </section>
    </div>
  )
}
