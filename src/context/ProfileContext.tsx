import { useEffect, useState, type ReactNode } from 'react'
import {
  ProfileContext,
  loadStoredProfile,
  storeProfile,
  type ProfileInfo,
} from './profileContextValue'

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileInfo>(() => loadStoredProfile())

  useEffect(() => {
    try {
      storeProfile(profile)
    } catch {
      // 저장 공간이 없거나 접근이 막힌 환경에서는 조용히 무시한다.
    }
  }, [profile])

  const updateProfile = (next: ProfileInfo) => {
    setProfile(next)
  }

  return <ProfileContext.Provider value={{ profile, updateProfile }}>{children}</ProfileContext.Provider>
}
