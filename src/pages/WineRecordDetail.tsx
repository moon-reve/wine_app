import { useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import backIcon from '../assets/images/icon-chevron-forward.svg'
import { DEMO_WINE_RECORDS, useWineRecords } from '../context/wineRecordsContextValue'
import { findWineDetailByName } from '../data/wineDetailData'

const profileLabels = {
  바디: ['Light', 'Medium', 'Full'],
  탄닌: ['Smooth', 'Medium', 'Strong'],
  산도: ['Soft', 'Medium', 'Acidic'],
  단맛: ['Dry', 'Off-Dry', 'Sweet'],
} as const

const typeLabels = {
  red: '레드와인',
  white: '화이트와인',
  sparkling: '스파클링와인',
  rose: '로제와인',
} as const

const lafongFallback = {
  typeLabel: '레드와인',
  country: '프랑스',
  region: '보르도 > 마고',
  winery: 'Château Margaux',
  grapeComposition: '카베르네 소비뇽 75%, 메를로 20%, 카베르네 프랑 5%',
  vintage: '2015',
  alcohol: '14.0%',
  volume: '750ml',
}

function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[12px] leading-normal tracking-[-0.24px] text-black">
      <span className="flex size-[10px] shrink-0 items-center justify-center text-[#831317]">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-[#d9d9d9] px-3 py-1.5 text-[12px] leading-none font-medium text-[#595959]">{children}</span>
}

function splitNote(value: string) {
  return value
    .split(/[,/#·]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function ProfileRow({ label, value }: { label: keyof typeof profileLabels; value: number }) {
  const labels = profileLabels[label]
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3">
      <strong className="text-[14px] leading-[1.2] tracking-[-0.28px]">{label}</strong>
      <div className="min-w-0">
        <div className="h-2 overflow-hidden rounded-full bg-[#e4e4e4]">
          <div className="h-full rounded-full bg-[#841317]" style={{ width: `${safeValue}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[10px] leading-normal text-black/30">
          {labels.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  )
}

function EmptyRecord() {
  const navigate = useNavigate()
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 bg-white px-5 text-[#121212]">
      <p className="text-sm text-[#737373]">와인 기록을 찾을 수 없어요.</p>
      <button type="button" onClick={() => navigate('/mypage', { replace: true, state: { activeTab: 'wine' } })} className="h-11 rounded-[10px] bg-[#831317] px-6 text-sm font-bold text-white">
        와인 기록으로 돌아가기
      </button>
    </main>
  )
}

export default function WineRecordDetail() {
  const navigate = useNavigate()
  const { recordId = '' } = useParams()
  const { records } = useWineRecords()
  const [isBasicOpen, setIsBasicOpen] = useState(true)
  const record = [...records, ...DEMO_WINE_RECORDS].find((item) => item.id === recordId)
  const matchedWine = record ? findWineDetailByName(record.name) : undefined

  const basicInfo = useMemo(() => {
    if (matchedWine) {
      const region = matchedWine.region.startsWith(matchedWine.country)
        ? matchedWine.region.slice(matchedWine.country.length).trim()
        : matchedWine.region
      return {
        typeLabel: typeLabels[matchedWine.type],
        country: matchedWine.country,
        region: region || matchedWine.region,
        winery: matchedWine.winery,
        grapeComposition: matchedWine.grapeComposition,
        vintage: matchedWine.vintage,
        alcohol: `${matchedWine.alcohol.toFixed(1)}%`,
        volume: `${matchedWine.volumeMl}ml`,
      }
    }
    if (record?.id === 'demo-1') return lafongFallback
    return {
      typeLabel: '와인',
      country: '-',
      region: '-',
      winery: '-',
      grapeComposition: '-',
      vintage: record?.name.match(/\d{4}/)?.[0] ?? '-',
      alcohol: '-',
      volume: '-',
    }
  }, [matchedWine, record])

  if (!record) return <EmptyRecord />

  const catalogProfile = matchedWine
    ? {
        바디: matchedWine.tasting.body.score * 20,
        탄닌: matchedWine.tasting.tannin.score * 20,
        산도: matchedWine.tasting.acidity.score * 20,
        단맛: matchedWine.tasting.sweetness.score * 20,
      }
    : undefined
  const profileValues = Object.fromEntries(
    (Object.keys(profileLabels) as Array<keyof typeof profileLabels>).map((label) => [
      label,
      record.profileValues[label] > 0
        ? record.profileValues[label]
        : catalogProfile?.[label] ?? 0,
    ]),
  ) as Record<keyof typeof profileLabels, number>

  const tastingNotes = Object.fromEntries(
    (['향', '풍미', '여운'] as const).map((label, index) => {
      const saved = splitNote(record.tastingNotes[label])
      if (saved.length) return [label, saved]
      if (!matchedWine) return [label, []]
      if (label === '향') return [label, matchedWine.tastingNotes.slice(0, 3)]
      if (label === '풍미') return [label, matchedWine.tastingNotes.slice(3)]
      return [label, index === 2 ? [matchedWine.tasting.body.label, matchedWine.tasting.tannin.label] : []]
    }),
  ) as Record<'향' | '풍미' | '여운', string[]>

  const rating = Number(record.rating) || 0
  const stars = `${'★'.repeat(Math.round(rating))}${'☆'.repeat(Math.max(0, 5 - Math.round(rating)))}`
  const basicRows = [
    ['국가', basicInfo.country],
    ['생산지역', basicInfo.region],
    ['와이너리', basicInfo.winery],
    ['품종', basicInfo.grapeComposition],
    ['빈티지', basicInfo.vintage],
    ['도수', basicInfo.alcohol],
    ['용량', basicInfo.volume],
  ]

  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-white pb-12 font-pretendard text-[#0d0d0d]">
      <header className="grid h-[calc(70px+env(safe-area-inset-top))] w-full grid-cols-[40px_1fr_40px] items-center px-3 pt-[env(safe-area-inset-top)]">
        <button type="button" aria-label="뒤로 가기" onClick={() => navigate(-1)} className="flex size-10 items-center justify-center">
          <img src={backIcon} alt="" className="size-6 rotate-180" />
        </button>
        <h1 className="text-center text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">와인 기록</h1>
        <button type="button" onClick={() => navigate(`/record/${record.id}/edit`)} className="flex h-10 items-center justify-center text-[13px] leading-none font-medium tracking-[-0.39px] text-black/60">
          수정
        </button>
      </header>

      <section className="grid w-full grid-cols-[minmax(0,1fr)_min(38vw,160px)] grid-rows-[auto_auto] gap-x-4 gap-y-3 px-5 pt-10">
        <time className="col-start-1 row-start-1 text-[14px] tracking-[-0.28px] text-[#9e9e9e]">{record.date}</time>
        <div className="col-start-1 row-start-2 min-w-0">
          <h2 className="text-[24px] leading-[1.2] font-bold tracking-[-0.48px] whitespace-nowrap">{record.name}</h2>
          <p className="mt-2 text-[13px] leading-normal font-bold tracking-[-0.26px] text-[#831317]">{stars} {rating.toFixed(1)}</p>
          <p className="mt-3 line-clamp-2 text-[14px] leading-[1.5] tracking-[-0.28px] break-keep">{record.summary || record.review || '남겨둔 한줄 기록이 없어요.'}</p>
          <div className="mt-4 flex flex-col gap-2">
            {record.pairing ? (
              <MetaItem icon={<span aria-hidden="true">◆</span>}>{record.pairing}</MetaItem>
            ) : null}
            {record.location || record.companions ? (
              <MetaItem icon={<span aria-hidden="true">●</span>}>{[record.location, record.companions].filter(Boolean).join(' · ')}</MetaItem>
            ) : null}
            <MetaItem icon={<span aria-hidden="true">◉</span>}>{record.privacy}</MetaItem>
          </div>
        </div>
        <div className="relative col-start-2 row-start-2 w-full self-stretch overflow-hidden rounded-lg">
          {record.image ? <img src={record.image} alt={record.name} className="size-full object-cover object-center" /> : null}
        </div>
      </section>

      <div className="mx-5 mt-7 h-px bg-black/12" />

      <section className="px-5 py-8">
        <button type="button" aria-expanded={isBasicOpen} onClick={() => setIsBasicOpen((open) => !open)} className="flex w-full items-center justify-between text-left">
          <span className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">기본 정보</span>
          <img src={backIcon} alt="" className={`size-5 transition-transform ${isBasicOpen ? 'rotate-90' : ''}`} />
        </button>
        {isBasicOpen ? (
          <div>
            <p className="mt-3 text-[12px] leading-[1.2] tracking-[-0.24px] text-black/60">{basicInfo.typeLabel} &gt; {basicInfo.country} &gt; {basicInfo.region}</p>
            <div className="mt-4 flex flex-col gap-2.5 rounded-xl bg-[#f2f2f2] p-[18px] text-[14px] leading-[1.45]">
              {basicRows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[60px_minmax(0,1fr)] gap-4">
                  <span className="font-medium text-[#737373]">{label}</span>
                  <span className="min-w-0 tracking-[-0.28px] break-keep">{value}</span>
                </div>
              ))}
            </div>
            {matchedWine ? (
              <button type="button" onClick={() => navigate(`/wine_detail/${matchedWine.type}/${matchedWine.id}`)} className="mx-auto mt-4 block text-[14px] leading-none font-medium text-black/20 underline underline-offset-2">
                와인 상세보기
              </button>
            ) : null}
          </div>
        ) : null}
      </section>

      <div className="mx-5 h-px bg-black/12" />

      <section className="px-5 py-8">
        <h2 className="flex items-center gap-1 text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">
          와인 프로필
          <span className="flex size-[13px] items-center justify-center rounded-full bg-[#831317] text-[10px] leading-none text-white">!</span>
        </h2>
        <div className="mt-5 flex flex-col gap-4 rounded-[10px] px-[10px] pb-4">
          {(Object.keys(profileLabels) as Array<keyof typeof profileLabels>).map((label) => (
            <ProfileRow key={label} label={label} value={profileValues[label]} />
          ))}
        </div>
      </section>

      <div className="mx-5 h-px bg-black/12" />

      <section className="px-5 py-8">
        <h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">테이스팅 노트</h2>
        <div className="mt-4 flex flex-col gap-4">
          {(['향', '풍미', '여운'] as const).map((label) => (
            <div key={label}>
              <h3 className="text-[14px] leading-[1.2] font-bold tracking-[-0.28px]">{label}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {tastingNotes[label].length
                  ? tastingNotes[label].map((note) => <Chip key={note}>{note}</Chip>)
                  : <span className="text-[12px] text-[#aaa]">기록 없음</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-5 h-px bg-black/12" />

      <section className="px-5 py-8">
        <h2 className="text-[16px] leading-[1.3] font-bold tracking-[-0.48px]">상세 메모</h2>
        <p className="mt-3 rounded-xl bg-[#f2f2f2] p-[18px] text-[14px] leading-[1.45] font-medium tracking-[-0.28px] text-[#737373] break-keep">
          {record.detailNote || record.review || '작성한 상세 메모가 없어요.'}
        </p>
      </section>
    </main>
  )
}
