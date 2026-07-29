import { createContext, useContext } from 'react'
import defaultProfilePhoto from '../assets/mypage/figma-profile-photo.webp'

export const DEFAULT_PROFILE_IMAGE = defaultProfilePhoto

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
  image: DEFAULT_PROFILE_IMAGE,
}

const STORAGE_KEY = 'wine-app-profile-settings'

function resolveStoredProfileImage(image: unknown) {
  if (typeof image !== 'string' || !image) return DEFAULT_PROFILE_IMAGE

  const isTemporaryImage = image.startsWith('blob:')
  const isBundledDefaultImage =
    image.includes('/figma-profile-photo') ||
    image.includes('/mypage-avatar')

  return isTemporaryImage || isBundledDefaultImage
    ? DEFAULT_PROFILE_IMAGE
    : image
}

export function loadStoredProfile(): ProfileInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILE
    const storedProfile = JSON.parse(raw) as Partial<ProfileInfo>

    return {
      ...DEFAULT_PROFILE,
      ...storedProfile,
      image: resolveStoredProfileImage(storedProfile.image),
    }
  } catch {
    return DEFAULT_PROFILE
  }
}

export function storeProfile(profile: ProfileInfo) {
  const storedProfile: Partial<ProfileInfo> = { ...profile }

  if (profile.image === DEFAULT_PROFILE_IMAGE) {
    delete storedProfile.image
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedProfile))
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
