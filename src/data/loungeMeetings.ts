import meetingImage1 from '../assets/lounge/figma/meeting-1.webp'
import meetingImage2 from '../assets/lounge/figma/meeting-2-overlay.webp'
import meetingImage3 from '../assets/lounge/figma/meeting-3-overlay.webp'

export type LoungeMeeting = {
  id: string
  statusLabel: string
  participants: number
  maxParticipants: number
  title: string
  description: string
  schedule: string
  tags: string[]
  image: string
  imagePosition: string
  imageHeight: string
}

export const loungeMeetings: LoungeMeeting[] = [
  {
    id: 'figma-meeting-bordeaux',
    statusLabel: '모집중',
    participants: 8,
    maxParticipants: 12,
    title: '보르도 버티컬 마스터클래스',
    description: '좌안의 1990-2010 빈티지를 연대순으로 탐구합니다.',
    schedule: '2026.10.24 (토) 19:00-21:30 · 서래마을 프라이빗 다이닝',
    tags: ['보르도', '버티컬', '소규모 모임'],
    image: meetingImage1,
    imagePosition: 'center 63%',
    imageHeight: 'h-[222px]',
  },
  {
    id: 'figma-meeting-chardonnay',
    statusLabel: '모집중',
    participants: 4,
    maxParticipants: 10,
    title: '샤르도네 vs 뫼르소',
    description: '테루아의 차이가 맛에 어떻게 반영되는지 비교 분석합니다.',
    schedule: '2026.11.02 (월) 20:00-22:00 · 그레이프 앤 그레인 와인바',
    tags: ['버건디', '화이트 와인', '테루아'],
    image: meetingImage2,
    imagePosition: 'center 85%',
    imageHeight: 'h-[200px]',
  },
  {
    id: 'figma-meeting-blind-tasting',
    statusLabel: '대기접수',
    participants: 15,
    maxParticipants: 15,
    title: '소믈리에 블라인드 테이스팅 시리즈',
    description: '공개되지 않은 6종의 와인으로 미각을 테스트합니다.',
    schedule: '2026.10.26 (월) 18:30-20:30 · 성수동 와인랩',
    tags: ['교육', '블라인드 테이스팅'],
    image: meetingImage3,
    imagePosition: 'center 40%',
    imageHeight: 'h-[200px]',
  },
]

const USER_MEETINGS_STORAGE_KEY = 'wine-app-user-meetings'

function loadUserMeetings(): LoungeMeeting[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(USER_MEETINGS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LoungeMeeting[]) : []
  } catch {
    return []
  }
}

export function getUserMeetings() {
  return loadUserMeetings()
}

export function addUserMeeting(meeting: LoungeMeeting) {
  if (typeof window === 'undefined') return

  const next = [meeting, ...loadUserMeetings()]
  window.localStorage.setItem(USER_MEETINGS_STORAGE_KEY, JSON.stringify(next))
}

export function getAllLoungeMeetings() {
  return [...loadUserMeetings(), ...loungeMeetings]
}

export function getLoungeMeeting(meetingId?: string) {
  return getAllLoungeMeetings().find((meeting) => meeting.id === meetingId) ?? loungeMeetings[0]
}

const SESSION_PARTICIPANT_PREFIX = 'lounge-meeting-extra-participants:'

function getStoredParticipantKey(meetingId: string) {
  return `${SESSION_PARTICIPANT_PREFIX}${meetingId}`
}

export function readStoredExtraParticipants(meetingId: string) {
  if (typeof window === 'undefined') return 0

  try {
    const storedValue = window.sessionStorage.getItem(getStoredParticipantKey(meetingId))
    const parsedValue = Number(storedValue)
    return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : 0
  } catch {
    return 0
  }
}

export function writeStoredExtraParticipants(meetingId: string, extraParticipants: number) {
  if (typeof window === 'undefined') return

  window.sessionStorage.setItem(getStoredParticipantKey(meetingId), String(extraParticipants))
}

export function getLoungeMeetingParticipantCount(meeting: LoungeMeeting) {
  return Math.min(meeting.participants + readStoredExtraParticipants(meeting.id), meeting.maxParticipants)
}
