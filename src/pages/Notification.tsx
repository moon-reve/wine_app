import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/notification-back.svg'
import bellIcon from '../assets/notification-bell.svg'
import likeAvatar from '../assets/notification-like-avatar.svg'
import personIcon from '../assets/notification-person.svg'
import {
  getReadNotificationIds,
  markAllNotificationsRead,
  markNotificationRead,
  useNotificationSessionVersion,
} from '../state/notificationSession'

type NotificationItem = {
  id: string
  category: string
  time: string
  message: string
  detail?: string
  icon: 'bell' | 'like' | 'qa' | 'meeting' | 'magazine'
  accentDetail?: boolean
}

const todayNotifications: NotificationItem[] = [
  {
    id: 'notification-feed-comment',
    category: '피드',
    time: '5분 전',
    message: '내 게시글에 댓글이 달렸습니다.',
    detail: '"저도 이 와인 정말 좋아해요."',
    icon: 'bell',
  },
  {
    id: 'notification-feed-like',
    category: '좋아요',
    time: '20분 전',
    message: '민지가 회원님의 게시글을 좋아합니다.',
    icon: 'like',
  },
]

const weeklyNotifications: NotificationItem[] = [
  {
    id: 'notification-qna-answer',
    category: 'Q&A',
    time: '2일 전',
    message: '질문에 새로운 답변이 등록되었습니다.',
    detail: '"입문자라면 Yellow Tail Shiraz를 추천드립니다."',
    icon: 'qa',
  },
  {
    id: 'notification-meeting-confirmed',
    category: '모임',
    time: '3일 전',
    message: "'와인 입문자 시음회' 참여가 확정되었습니다.",
    icon: 'meeting',
  },
  {
    id: 'notification-magazine-published',
    category: '매거진',
    time: '2026.07.01',
    message: '새로운 매거진이 등록되었습니다.',
    detail: "'여름에 마시기 좋은 화이트 와인'",
    icon: 'magazine',
    accentDetail: true,
  },
]

const allNotifications = [...todayNotifications, ...weeklyNotifications]

function NotificationIcon({ type, isRead }: { type: NotificationItem['icon']; isRead: boolean }) {
  if (type === 'like') {
    return <img src={likeAvatar} alt="" className={`size-11 shrink-0 ${isRead ? 'grayscale-[35%] opacity-70' : ''}`} />
  }

  if (type === 'meeting') {
    return (
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${isRead ? 'bg-[#aaa]' : 'bg-[#831317]'}`}>
        <img src={personIcon} alt="" className="size-5" />
      </span>
    )
  }

  if (type === 'bell') {
    return (
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${isRead ? 'bg-white/55' : 'bg-[#f9f7f6]'}`}>
        <img src={bellIcon} alt="" className={`size-5 ${isRead ? 'grayscale opacity-60' : ''}`} />
      </span>
    )
  }

  return (
    <span className={`font-playfair-sc flex size-11 shrink-0 items-center justify-center rounded-full text-[18px] leading-none font-bold ${isRead ? 'bg-white/55 text-[#737373]' : 'bg-[#f9f7f6] text-[#831317]'}`}>
      {type === 'qa' ? 'Q' : 'M'}
    </span>
  )
}

function NotificationCard({ item, isRead, onRead }: { item: NotificationItem; isRead: boolean; onRead: () => void }) {
  return (
    <button
      type="button"
      aria-label={`${item.category} 알림${isRead ? ', 읽음' : ', 읽지 않음'}`}
      onClick={onRead}
      className={`flex w-full items-start gap-3 overflow-hidden rounded-xl p-4 text-left transition-colors ${isRead ? 'bg-[#eeeeee]' : 'bg-[#f9f7f6]'}`}
    >
      <NotificationIcon type={item.icon} isRead={isRead} />
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex w-full items-center leading-[1.2]">
          <span className={`shrink-0 text-[12px] font-medium ${isRead ? 'text-[#737373]' : 'text-[#831317]'}`}>{item.category}</span>
          <span className="flex-1" />
          <time className="shrink-0 text-[11px] font-normal text-[#737373]">{item.time}</time>
        </div>
        <p className={`mt-1.5 w-[302px] text-[14px] leading-[1.5] font-normal tracking-[-0.28px] ${isRead ? 'text-[#595959]' : 'text-[#0d0d0d]'}`}>
          {item.message}
        </p>
        {item.detail && (
          <p className={`mt-1.5 w-[302px] text-[13px] leading-[1.45] tracking-[-0.26px] ${item.accentDetail && !isRead ? 'font-medium text-[#831317]' : 'font-normal text-[#737373]'}`}>
            {item.detail}
          </p>
        )}
      </div>
    </button>
  )
}

function NotificationSection({
  title,
  items,
  readNotificationIds,
  onRead,
  noto = false,
}: {
  title: string
  items: NotificationItem[]
  readNotificationIds: Set<string>
  onRead: (id: string) => void
  noto?: boolean
}) {
  return (
    <section className="flex w-full flex-col gap-3 overflow-hidden">
      <h2 className={`${noto ? 'font-noto' : ''} text-[15px] leading-[1.3] font-bold tracking-[-0.45px] text-[#0d0d0d]`}>{title}</h2>
      {items.map((item) => (
        <NotificationCard
          key={item.id}
          item={item}
          isRead={readNotificationIds.has(item.id)}
          onRead={() => onRead(item.id)}
        />
      ))}
    </section>
  )
}

function Notification() {
  const navigate = useNavigate()
  useNotificationSessionVersion()
  const readNotificationIds = getReadNotificationIds()
  const isAllRead = allNotifications.every((item) => readNotificationIds.has(item.id))

  const markAsRead = (id: string) => {
    markNotificationRead(id)
  }

  const markAllAsRead = () => {
    markAllNotificationsRead()
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-white text-[#0d0d0d]" data-node-id="1546:5601">
      <header className="relative h-17.5 w-full overflow-hidden bg-white" data-node-id="1546:5602">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="absolute top-5 left-4.5 flex size-6 items-center justify-center">
          <img src={backIcon} alt="" className="size-6 rotate-180" />
        </button>
        <h1 className="absolute top-6.5 left-1/2 -translate-x-1/2 text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">알림</h1>
        <button
          type="button"
          disabled={isAllRead}
          onClick={markAllAsRead}
          className={`absolute top-[28.5px] right-6 text-[13px] leading-none font-bold ${isAllRead ? 'text-[#aaa]' : 'text-[#831317]'}`}
        >
          모두 읽음
        </button>
      </header>

      <main className="flex w-full flex-col gap-7 overflow-hidden px-5 pt-4 pb-8">
        <NotificationSection title="오늘" items={todayNotifications} readNotificationIds={readNotificationIds} onRead={markAsRead} />
        <NotificationSection title="이번 주" items={weeklyNotifications} readNotificationIds={readNotificationIds} onRead={markAsRead} noto />
      </main>
    </div>
  )
}

export default Notification
