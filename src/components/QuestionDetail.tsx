import { useMemo, useState, type FormEvent } from 'react'
import backIcon from '../assets/images/icon-chevron-forward.svg'
import questionAuthorAvatar from '../assets/lounge/figma/question-author.svg'
import answerAuthorAvatar from '../assets/lounge/figma/question-answer.svg'

type SortMode = 'latest' | 'popular'

type QuestionAnswer = {
  id: string
  author: string
  time: string
  content: string
  helpfulCount: number
  order: number
  accepted: boolean
}

type QuestionDetailProps = {
  onBack?: () => void
  onFollow?: () => void
  onSubmitAnswer?: (answer: string) => void
  onHelpful?: (answerId: string) => void
  className?: string
}

const figmaQuestion = {
  title: '1982년산 보르도 와인 라벨 식별을 도와주실 수 있나요?',
  author: '소믈리에_엔투지스트',
  meta: '2시간 전 · 프랑스 보르도',
  content:
    '어제 할아버지의 셀러에서 발견했습니다. 라벨이 약간 찢어졌지만 1982라고 선명하게 적혀 있고 생테밀리옹 지역 제품인 것 같습니다. 생산자를 찾는 데 도움을 주실 수 있을까요?',
  tags: ['1982빈티지', '보르도', '와인식별'],
} as const

const figmaAnswers: QuestionAnswer[] = [
  {
    id: 'figma-answer-wine-expert',
    author: '와인전문가88',
    time: '45분 전',
    content:
      "이건 샤토 피작과 매우 흡사해 보입니다. 그해 '1982'의 폰트 스타일이 매우 독특했습니다. 메를로와 카베르네 프랑이 주로 섞인 훌륭한 빈티지입니다.",
    helpfulCount: 12,
    order: 2,
    accepted: true,
  },
  {
    id: 'figma-answer-master-cellar',
    author: '마스터_셀러',
    time: '1시간 전',
    content:
      '와인전문가님 의견에 동의합니다. 캡슐을 확인해보세요. 오리지널이라면 샤토를 확인해주는 양각 문장이 있을 겁니다.',
    helpfulCount: 4,
    order: 1,
    accepted: false,
  },
]

export default function QuestionDetail({
  onBack,
  onFollow,
  onSubmitAnswer,
  onHelpful,
  className = '',
}: QuestionDetailProps) {
  const [answer, setAnswer] = useState('')
  const [answerItems, setAnswerItems] = useState<QuestionAnswer[]>(figmaAnswers)
  const [sortMode, setSortMode] = useState<SortMode>('latest')
  const [following, setFollowing] = useState(false)

  const sortedAnswers = useMemo(() => {
    return [...answerItems].sort((a, b) => {
      if (sortMode === 'popular') return b.helpfulCount - a.helpfulCount || b.order - a.order
      return b.order - a.order
    })
  }, [answerItems, sortMode])

  const displayAnswerCount = 3 + Math.max(0, answerItems.length - figmaAnswers.length)

  const handleBack = () => {
    if (onBack) return onBack()
    window.history.back()
  }

  const handleFollow = () => {
    setFollowing((current) => !current)
    onFollow?.()
  }

  const handleHelpful = (answerId: string) => {
    setAnswerItems((items) =>
      items.map((item) => (item.id === answerId ? { ...item, helpfulCount: item.helpfulCount + 1 } : item)),
    )
    onHelpful?.(answerId)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = answer.trim()
    if (!value) return

    setAnswerItems((items) => [
      {
        id: `answer-${Date.now()}`,
        author: '나',
        time: '방금 전',
        content: value,
        helpfulCount: 0,
        order: Date.now(),
        accepted: false,
      },
      ...items,
    ])
    setAnswer('')
    onSubmitAnswer?.(value)
  }

  return (
    <article data-node-id="1546:3725" className={`mx-auto min-h-screen w-full max-w-[430px] bg-white text-[#0d0d0d] ${className}`}>
      <header className="relative flex h-[70px] w-full shrink-0 items-center justify-center">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={handleBack}
          className="absolute top-5 left-5 flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
        >
          <img src={backIcon} alt="" aria-hidden="true" className="size-6 rotate-180" />
        </button>
        <h1 className="text-[18px] leading-none font-bold tracking-[-0.54px] text-[#831317]">Q&amp;A</h1>
      </header>

      <div className="flex w-full flex-col gap-5 px-5 pt-3 pb-8">
        <span className="flex h-6 w-fit items-center rounded-full bg-[#831317] px-3 text-xs leading-none font-medium text-white">
          답변 {displayAnswerCount}
        </span>

        <h2 className="w-full text-[22px] leading-[1.4] font-bold tracking-[-0.66px]">{figmaQuestion.title}</h2>

        <section className="flex w-full items-center gap-2.5" aria-label="질문 작성자 정보">
          <img src={questionAuthorAvatar} alt="" className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-0.5 leading-[1.2]">
            <p className="text-sm font-bold tracking-[-0.28px]">{figmaQuestion.author}</p>
            <p className="text-xs tracking-[-0.24px] text-[#737373]">{figmaQuestion.meta}</p>
          </div>
          <button
            type="button"
            aria-pressed={following}
            onClick={handleFollow}
            className={`ml-auto flex h-[30px] shrink-0 items-center justify-center rounded-full border border-[#831317] px-[11px] text-xs leading-none font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${following ? 'bg-[#831317] text-white' : 'bg-white text-[#831317]'}`}
          >
            {following ? '팔로잉' : '팔로우'}
          </button>
        </section>

        <p className="text-sm leading-[1.6] tracking-[-0.28px] text-[#595959]">{figmaQuestion.content}</p>

        <div className="flex flex-wrap gap-2" aria-label="질문 태그">
          {figmaQuestion.tags.map((tag) => (
            <span key={tag} className="flex h-6 items-center rounded-full bg-[#831317] px-3 text-xs leading-none font-medium text-white">
              #{tag}
            </span>
          ))}
        </div>

        <div className="h-px w-full bg-black/12" />

        <section aria-labelledby="question-answers-title" className="flex flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <h3 id="question-answers-title" className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">
              답변 {displayAnswerCount}
            </h3>
            <button
              type="button"
              onClick={() => setSortMode((mode) => (mode === 'latest' ? 'popular' : 'latest'))}
              className="text-xs leading-none tracking-[-0.24px] text-[#737373] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
            >
              {sortMode === 'latest' ? '최신순' : '인기순'}
            </button>
          </div>

          <div className="flex flex-col gap-5" aria-live="polite">
            {sortedAnswers.map((item) => (
              <article key={item.id} className="flex w-full flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-4">
                <div className="flex min-w-0 items-center gap-2">
                  <img src={answerAuthorAvatar} alt="" className="size-[30px] shrink-0 rounded-full" />
                  <p className="shrink-0 text-[13px] leading-[1.2] font-bold tracking-[-0.26px]">{item.author}</p>
                  <time className="shrink-0 text-[11px] leading-[1.2] tracking-[-0.22px] text-[#737373]">{item.time}</time>
                  {item.accepted ? (
                    <span className="flex h-[18px] shrink-0 items-center rounded-full border border-[#831317] bg-white px-2.5 text-[10px] leading-none font-medium text-[#831317]">채택</span>
                  ) : null}
                </div>
                <p className="text-[13px] leading-[1.55] tracking-[-0.26px] text-[#595959]">{item.content}</p>
                <button
                  type="button"
                  onClick={() => handleHelpful(item.id)}
                  className="w-fit text-xs leading-[1.2] font-medium text-[#831317] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
                >
                  도움됐어요 {item.helpfulCount}
                </button>
              </article>
            ))}
          </div>
        </section>

        <form onSubmit={handleSubmit} className="flex min-h-[46px] w-full items-center gap-2.5 rounded-full bg-[#f6f5f4] px-[18px] py-3.5">
          <label htmlFor="question-answer" className="sr-only">답변 입력</label>
          <input
            id="question-answer"
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="전문 지식을 공유해 주세요..."
            className="min-w-0 flex-1 bg-transparent text-[13px] leading-none tracking-[-0.26px] text-[#0d0d0d] outline-none placeholder:text-[#737373]"
          />
          <button type="submit" className="shrink-0 text-[13px] leading-none font-bold tracking-[-0.26px] text-[#831317] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]">
            등록
          </button>
        </form>
      </div>
    </article>
  )
}
