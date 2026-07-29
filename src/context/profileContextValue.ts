import { createContext, useContext } from 'react'
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

export function loadStoredProfile(): ProfileInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILE
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<ProfileInfo>) }
  } catch {
    return DEFAULT_PROFILE
  }
}

export function storeProfile(profile: ProfileInfo) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

type ProfileContextValue = {
  profile: ProfileInfo
  updateProfile: (profile: ProfileInfo) => void
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfile must be used within a ProfileProvider')
  return context
}
