import backIcon from '../assets/images/icon-chevron-forward.svg'
import hostAvatar from '../assets/images/feed-author-avatar.svg'
import meetingPhoto from '../assets/images/meeting-detail-photo.png'

type MeetingDetailProps = {
  onBack?: () => void
  onApply?: () => void
  className?: string
}

const meetingDetails = [
  { label: '일시', value: '2026년 10월 24일 (토) 19:00 - 21:30' },
  { label: '장소', value: '한남동 프라이빗 셀러' },
  { label: '인원', value: '8/12명 참여 중' },
  { label: '회비', value: '55,000원 (와인 6종 시음 포함)' },
]

const tags = ['보르도', '버티컬', '희귀 와인']

export default function MeetingDetail({ onBack, onApply, className = '' }: MeetingDetailProps) {
  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    window.history.back()
  }

  return (
    <article
      data-node-id="624:126"
      className={`mx-auto min-h-screen w-full max-w-[430px] bg-white text-[#0d0d0d] ${className}`}
    >
      <header
        data-node-id="624:127"
        className="relative flex h-[70px] w-full shrink-0 items-center justify-center"
      >
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={handleBack}
          className="absolute left-5 top-5 flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
        >
          <img src={backIcon} alt="" aria-hidden="true" className="size-6 rotate-180" />
        </button>
        <h1 className="text-[18px] leading-none font-bold tracking-[-0.54px]">모임</h1>
      </header>

      <img
        data-node-id="624:132"
        src={meetingPhoto}
        alt="와인 버티컬 테이스팅 모임"
        className="aspect-[43/26] w-full object-cover"
      />

      <div data-node-id="624:133" className="flex w-full flex-col gap-5 px-5 pt-6 pb-8">
        <div className="flex gap-2" aria-label="모임 상태">
          <span className="flex h-[21px] items-center rounded-full bg-[#831317] px-3 text-[11px] leading-none font-medium text-white">
            모집중
          </span>
          <span className="flex h-[21px] items-center rounded-full bg-[#f2eded] px-3 text-[11px] leading-none font-medium text-[#831317]">
            D-11
          </span>
        </div>

        <h2 className="w-full text-2xl leading-[1.35] font-bold tracking-[-0.72px]">
          보르도 버티컬 마스터클래스
        </h2>

        <dl className="flex w-full flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-[18px]">
          {meetingDetails.map((item) => (
            <div key={item.label} className="grid grid-cols-[52px_1fr] items-start gap-4 leading-[1.45]">
              <dt className="text-[13px] font-medium text-[#737373]">{item.label}</dt>
              <dd className="m-0 text-sm tracking-[-0.28px] text-[#0d0d0d]">{item.value}</dd>
            </div>
          ))}
        </dl>

        <section aria-label="참여 현황" className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between text-xs leading-[1.2]">
            <span className="font-medium text-[#737373]">참여 현황</span>
            <strong className="font-bold text-[#831317]">8/12</strong>
          </div>
          <div
            role="progressbar"
            aria-label="모임 참여율"
            aria-valuemin={0}
            aria-valuemax={12}
            aria-valuenow={8}
            className="h-2 w-full overflow-hidden rounded-full bg-[#e2e2e2]"
          >
            <div className="h-full w-2/3 rounded-full bg-[#831317]" />
          </div>
        </section>

        <div className="h-px w-full bg-black/12" />

        <section className="flex flex-col gap-5" aria-labelledby="meeting-introduction-title">
          <h3
            id="meeting-introduction-title"
            className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]"
          >
            모임 소개
          </h3>
          <p className="text-sm leading-[1.65] tracking-[-0.28px] text-[#595959]">
            좌안의 1990-2010 빈티지를 연대순으로 탐구합니다. 같은 샤토의 서로 다른 빈티지를 비교하며 세월이 와인에
            남기는 변화를 직접 경험해 보세요. 초심자도 환영하며, 전문 소믈리에의 해설과 함께 진행됩니다.
          </p>
          <div className="flex flex-wrap gap-1.5" aria-label="모임 태그">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex h-[20px] items-center rounded-full border border-[#d9d9d9] px-2.5 text-[11px] leading-none font-medium text-[#595959]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <div className="h-px w-full bg-black/12" />

        <section className="flex items-center gap-2.5" aria-label="모임 호스트">
          <img src={hostAvatar} alt="" className="size-11 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-0.5 leading-[1.2]">
            <p className="text-sm font-bold tracking-[-0.28px]">알렉스 소믈리에</p>
            <p className="text-xs tracking-[-0.24px] text-[#737373]">호스트 · 모임 12회 진행</p>
          </div>
        </section>

        <button
          type="button"
          onClick={onApply}
          className="flex h-[50px] w-full items-center justify-center rounded-xl bg-[#831317] text-base leading-none font-bold text-white transition-colors hover:bg-[#670e10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
        >
          참여 신청하기
        </button>
      </div>
    </article>
  )
}
