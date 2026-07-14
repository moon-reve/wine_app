import { Link } from 'react-router-dom'
import meets from '../../dummy data/meets.json'
import meetingImage1 from '../assets/lounge/meeting-1.png'
import meetingImage2 from '../assets/lounge/meeting-2.png'
import meetingImage3 from '../assets/lounge/meeting-3.png'
import Header from '../components/Header'
import LoungeTabs from '../components/LoungeTabs'

const meetingImages = [meetingImage1, meetingImage2, meetingImage3]

const figmaMeetings = [
  {
    statusLabel: '모집중',
    isFull: false,
    participants: 8,
    maxParticipants: 12,
    title: '보르도 버티컬 마스터클래스',
    description: '좌안의 1990-2010 빈티지를 연대순으로 탐구합니다.',
    schedule: '2026.10.24 (토) 19:00-21:30 · 한남동 프라이빗 셀러',
    tags: ['보르도', '버티컬', '희귀 와인'],
  },
  {
    statusLabel: '대기접수',
    isFull: true,
    participants: 15,
    maxParticipants: 15,
    title: '소믈리에 블라인드 테이스팅 시리즈',
    description: '공개되지 않은 6종의 와인으로 미각을 테스트합니다.',
    schedule: '2026.10.26 (월) 18:30-20:30 · 성수동 탄닌 랩',
    tags: ['교육', '블라인드 테이스팅'],
  },
  {
    statusLabel: '모집중',
    isFull: false,
    participants: 4,
    maxParticipants: 10,
    title: '샤르도네 vs 뫼르소',
    description: '테루아의 차이가 맛에 어떻게 반영되는지 심층 분석합니다.',
    schedule: '2026.11.02 (월) 20:00-22:00 · 그레이프 앤 그레인 허브',
    tags: ['버건디', '화이트 와인', '테루아'],
  },
] as const

const meetingCards = figmaMeetings.map((meeting, index) => ({
  ...meeting,
  id: meets[index]?.id ?? `figma-meeting-${index + 1}`,
  sourceThumbnail: meets[index]?.thumbnail,
  image: meetingImages[index],
  progress: (meeting.participants / meeting.maxParticipants) * 100,
}))

type MeetingCardProps = (typeof meetingCards)[number]

function MeetingCard({
  statusLabel,
  isFull,
  participants,
  maxParticipants,
  title,
  description,
  schedule,
  tags,
  sourceThumbnail,
  image,
  progress,
}: MeetingCardProps) {
  return (
    <article className="flex w-full flex-col items-start gap-3 font-noto" data-meeting-source={sourceThumbnail}>
      <img src={image} alt={title} className="h-50 w-full object-cover" />

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

      <h2 className="text-lg leading-[1.3] font-bold tracking-[-0.54px] whitespace-nowrap text-[#0d0d0d]">
        {title}
      </h2>
      <p className="w-full text-[13px] leading-[1.45] font-normal tracking-[-0.26px] text-[#595959]">
        {description}
      </p>
      <p className="w-full text-xs leading-[1.45] font-normal tracking-[-0.24px] text-[#737373]">
        {schedule}
      </p>

      <div className="flex items-start gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[25px] border border-[#d9d9d9] px-2.5 py-1 text-[11px] leading-none font-medium whitespace-nowrap text-[#595959]"
          >
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
  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="623:88">
      <Header tone="light" />

      <main className="flex w-full flex-col gap-7 overflow-hidden px-5 pt-5 pb-8">
        <div className="flex flex-col items-start gap-1.5 leading-[1.3] whitespace-nowrap">
          <h1 className="font-playfair text-[38px] font-bold tracking-[-0.76px] text-[#831317]">Meetings</h1>
          <p className="font-noto text-sm tracking-[-0.28px]">취향이 통하는 와인 모임을 찾아보세요</p>
        </div>

        <LoungeTabs activeTab="모임" />

        {meetingCards.map((meeting, index) => (
          <div key={meeting.id} className="contents">
            <Link
              to={`/meeting/${meeting.id}`}
              aria-label={`${meeting.title} 미팅 상세 보기`}
              className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#831317]"
            >
              <MeetingCard {...meeting} />
            </Link>
            {index < meetingCards.length - 1 ? <hr className="m-0 h-px w-full border-0 bg-black/12" /> : null}
          </div>
        ))}
      </main>
    </div>
  )
}

export default Meetings
