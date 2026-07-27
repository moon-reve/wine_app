import { Link, useNavigate } from 'react-router-dom'
import LoungeHeader from '../components/LoungeHeader'
import LoungeTabs from '../components/LoungeTabs'
import { getLoungeMeetingParticipantCount, loungeMeetings, type LoungeMeeting } from '../data/loungeMeetings'

type MeetingCardProps = LoungeMeeting & {
  isFull: boolean
}

function MeetingCard({
  statusLabel,
  isFull,
  participants,
  maxParticipants,
  title,
  description,
  schedule,
  tags,
  image,
  imagePosition,
  imageHeight,
}: MeetingCardProps) {
  const progress = (participants / maxParticipants) * 100

  return (
    <article className="flex w-full flex-col items-start gap-3 font-noto">
      <img src={image} alt={title} className={`${imageHeight} w-full object-cover`} style={{ objectPosition: imagePosition }} />

      <div className="flex w-full items-center gap-2">
        <span
          className={`rounded-[25px] px-3 py-[5px] text-[11px] leading-none font-medium whitespace-nowrap ${isFull ? 'bg-[#ebebeb] text-[#737373]' : 'bg-[#831317] text-white'}`}
        >
          {statusLabel}
        </span>
        <span aria-hidden="true" className="h-px min-w-px flex-1" />
        <span className="text-xs leading-none font-medium whitespace-nowrap text-[#737373]">
          {participants}/{maxParticipants}명
        </span>
      </div>

      <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px] text-[#0d0d0d]">{title}</h2>
      <p className="w-full text-[13px] leading-[1.45] tracking-[-0.26px] text-[#595959]">{description}</p>
      <p className="w-full text-xs leading-[1.45] tracking-[-0.24px] text-[#737373]">{schedule}</p>

      <div className="flex flex-wrap items-start gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="rounded-[25px] border border-[#d9d9d9] px-2.5 py-1 text-[11px] leading-none font-medium whitespace-nowrap text-[#595959]">
            {tag}
          </span>
        ))}
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-[64px] bg-[#e2e2e2]">
        <div className="h-full rounded-[64px] bg-[#831317]" style={{ width: `${progress}%` }} />
      </div>
    </article>
  )
}

function Meetings() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="1546:3506">
      <LoungeHeader />

      <main className="flex w-full flex-col gap-7 overflow-hidden px-5 pt-5 pb-28">
        <LoungeTabs activeTab="모임" />

        {loungeMeetings.map((meeting, index) => {
          const participants = getLoungeMeetingParticipantCount(meeting)
          const isFull = participants >= meeting.maxParticipants
          const statusLabel = isFull && meeting.statusLabel === '모집중' ? '마감' : meeting.statusLabel

          return (
            <div key={meeting.id} className="contents">
              <Link
                to={`/meeting/${meeting.id}`}
                aria-label={`${meeting.title} 모임 상세 보기`}
                className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#831317]"
              >
                <MeetingCard {...meeting} participants={participants} isFull={isFull} statusLabel={statusLabel} />
              </Link>
              {index < loungeMeetings.length - 1 ? <hr className="m-0 h-px w-full border-0 bg-black/12" /> : null}
            </div>
          )
        })}
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-28 z-40 mx-auto w-full max-w-107.5">
        <button
          type="button"
          onClick={() => navigate('/lounge/meetings/new')}
          className="pointer-events-auto absolute right-5 bottom-0 rounded-[28px] bg-[#831317] px-6 py-3.5 text-[15px] leading-none font-bold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          모임 만들기
        </button>
      </div>
    </div>
  )
}

export default Meetings
