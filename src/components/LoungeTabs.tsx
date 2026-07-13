import { useNavigate } from 'react-router-dom'

type LoungeTab = '피드' | 'Q&A' | '모임'

type LoungeTabsProps = {
  activeTab: LoungeTab
}

const tabs: Array<{ label: LoungeTab; path?: string }> = [
  { label: '피드', path: '/lounge' },
  { label: 'Q&A', path: '/lounge/qna' },
  { label: '모임', path: '/lounge/meetings' },
]

function LoungeTabs({ activeTab }: LoungeTabsProps) {
  const navigate = useNavigate()

  return (
    <nav
      aria-label="라운지 카테고리"
      className="relative grid h-[34px] w-full grid-cols-3 border-b border-black/15 font-noto"
    >
      {tabs.map(({ label, path }) => {
        const active = label === activeTab

        return (
          <button
            key={label}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => path && navigate(path)}
            className={`relative pb-[11px] text-center text-base leading-[1.3] font-bold tracking-[-0.48px] ${active ? 'text-[#831317]' : 'text-[#737373]'}`}
          >
            {label}
            {active ? <span className="absolute -bottom-px left-0 h-[3px] w-full bg-[#831317]" /> : null}
          </button>
        )
      })}
    </nav>
  )
}

export default LoungeTabs
