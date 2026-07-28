import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import defaultProfilePhoto from '../assets/mypage/figma-profile-photo.png'

export type ProfileInfo = {
  nickname: string
  bio: string
  region: string
  wineStyles: string[]
  isPublic: boolean
  image: string
}

const DEFAULT_PROFILE: ProfileInfo = {
  nickname: 'Sora Choi',
  bio: '“Good wine, Good mood”',
  region: '서울특별시 강남구',
  wineStyles: ['#레드와인', '#소비뇽', '#과일안주러버'],
  isPublic: true,
  image: defaultProfilePhoto,
}

const STORAGE_KEY = 'wine-app-profile-settings'

function loadStoredProfile(): ProfileInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILE
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<ProfileInfo>) }
  } catch {
    return DEFAULT_PROFILE
  }
}

type ProfileContextValue = {
  profile: ProfileInfo
  updateProfile: (profile: ProfileInfo) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileInfo>(() => loadStoredProfile())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // 저장 공간이 없거나 접근이 막힌 환경에서는 조용히 무시한다.
    }
  }, [profile])

  const updateProfile = (next: ProfileInfo) => {
    setProfile(next)
  }

  return <ProfileContext.Provider value={{ profile, updateProfile }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfile must be used within a ProfileProvider')
  return context
}
