import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type WineRecordEntry = {
  id: string
  name: string
  date: string
  rating: number
  review: string
  image: string | null
  location: string
  companions: string
  pairing: string
  tastingNotes: { 향: string; 풍미: string; 여운: string }
  profileValues: Record<string, number>
  privacy: string
}

const STORAGE_KEY = 'wine-records'

function loadStoredRecords(): WineRecordEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as WineRecordEntry[]) : []
  } catch {
    return []
  }
}

type WineRecordsContextValue = {
  records: WineRecordEntry[]
  addRecord: (record: WineRecordEntry) => void
}

const WineRecordsContext = createContext<WineRecordsContextValue | null>(null)

export function WineRecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<WineRecordEntry[]>(() => loadStoredRecords())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
    } catch {
      // 저장 공간이 없거나 접근이 막힌 환경에서는 조용히 무시한다.
    }
  }, [records])

  const addRecord = (record: WineRecordEntry) => {
    setRecords((current) => [record, ...current])
  }

  return <WineRecordsContext.Provider value={{ records, addRecord }}>{children}</WineRecordsContext.Provider>
}

export function useWineRecords() {
  const context = useContext(WineRecordsContext)
  if (!context) throw new Error('useWineRecords must be used within a WineRecordsProvider')
  return context
}
