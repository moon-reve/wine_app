import { useEffect, useState, type ReactNode } from 'react'
import {
  WineRecordsContext,
  loadStoredRecords,
  storeRecords,
  type WineRecordEntry,
} from './wineRecordsContextValue'

export function WineRecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<WineRecordEntry[]>(() => loadStoredRecords())

  useEffect(() => {
    try {
      storeRecords(records)
    } catch {
      // 저장 공간이 없거나 접근이 막힌 환경에서는 조용히 무시한다.
    }
  }, [records])

  const addRecord = (record: WineRecordEntry) => {
    setRecords((current) => [record, ...current])
  }

  const updateRecord = (record: WineRecordEntry) => {
    setRecords((current) => {
      const hasRecord = current.some((item) => item.id === record.id)
      return hasRecord
        ? current.map((item) => item.id === record.id ? record : item)
        : [record, ...current]
    })
  }

  const deleteRecord = (id: string) => {
    setRecords((current) => current.filter((record) => record.id !== id))
  }

  return <WineRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>{children}</WineRecordsContext.Provider>
}
