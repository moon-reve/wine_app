import { useHasUnreadNotifications } from '../state/notificationSession'

type NotificationBellIconProps = {
  tone?: 'dark' | 'light' | 'wine'
  className?: string
}

export default function NotificationBellIcon({ tone = 'dark', className }: NotificationBellIconProps) {
  const hasUnreadNotifications = useHasUnreadNotifications()
  const stroke = tone === 'dark' ? '#ffffff' : tone === 'wine' ? '#831317' : '#0d0d0d'
  const dotFill = tone === 'dark' ? '#4e000e' : stroke

  return (
    <svg className={className} viewBox="0 0 27 27" fill="none" aria-hidden="true">
      <path
        d="M20.25 9C20.25 7.20979 19.5388 5.4929 18.273 4.22703C17.0071 2.96116 15.2902 2.25 13.5 2.25C11.7098 2.25 9.9929 2.96116 8.72703 4.22703C7.46116 5.4929 6.75 7.20979 6.75 9C6.75 16.875 3.375 19.125 3.375 19.125H23.625C23.625 19.125 20.25 16.875 20.25 9Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4472 23.625C15.2494 23.966 14.9655 24.249 14.6239 24.4457C14.2824 24.6425 13.8951 24.746 13.5009 24.746C13.1068 24.746 12.7195 24.6425 12.3779 24.4457C12.0364 24.249 11.7525 23.966 11.5547 23.625"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hasUnreadNotifications && (
        <circle cx="19" cy="4" r="3.25" fill={dotFill} stroke={stroke} strokeWidth="0.5" />
      )}
    </svg>
  )
}
