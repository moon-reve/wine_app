import { useNavigate } from 'react-router-dom'
import chevronForward from '../../assets/images/icon-chevron-forward.svg'

function MeetingCreateHeader() {
  const navigate = useNavigate()

  return (
    <header className="relative z-10 grid h-[calc(70px+env(safe-area-inset-top))] w-full grid-cols-3 items-center bg-white px-5 pt-[env(safe-area-inset-top)] text-[#0d0d0d]">
      <button
        type="button"
        aria-label="뒤로가기"
        className="flex size-10 items-center justify-start"
        onClick={() => navigate(-1)}
      >
        <img src={chevronForward} alt="" className="size-6 rotate-180" aria-hidden="true" />
      </button>
      <h1 className="text-center text-lg font-bold tracking-[-0.03em] whitespace-nowrap">모임 만들기</h1>
      <div aria-hidden="true" />
    </header>
  )
}

export default MeetingCreateHeader
