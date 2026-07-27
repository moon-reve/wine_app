import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import backIcon from '../assets/images/icon-chevron-forward.svg'
import questionAuthorAvatar from '../assets/lounge/figma/question-author.svg'
import answerAuthorAvatar from '../assets/lounge/figma/question-answer.svg'
import {
  TEMP_ANSWER_PREFIX,
  formatLoungeAnswerStatus,
  getLoungeQuestionDetail,
  readStoredAnswers,
  writeStoredAnswers,
  type LoungeQuestionAnswer,
} from '../data/loungeQuestionDetails'

type SortMode = 'latest' | 'popular'

type QuestionDetailProps = {
  onBack?: () => void
  onFollow?: () => void
  onSubmitAnswer?: (answer: string) => void
  onHelpful?: (answerId: string) => void
  className?: string
}

export default function QuestionDetail({
  onBack,
  onFollow,
  onSubmitAnswer,
  onHelpful,
  className = '',
}: QuestionDetailProps) {
  const { questionId } = useParams()
  const question = getLoungeQuestionDetail(questionId)
  const [answer, setAnswer] = useState('')
  const [answerItems, setAnswerItems] = useState<LoungeQuestionAnswer[]>(() => [
    ...readStoredAnswers(question.id),
    ...question.answers,
  ])
  const [sortMode, setSortMode] = useState<SortMode>('latest')
  const [following, setFollowing] = useState(false)

  const sortedAnswers = useMemo(() => {
    return [...answerItems].sort((a, b) => {
      if (sortMode === 'popular') return b.helpfulCount - a.helpfulCount
      return 0
    })
  }, [answerItems, sortMode])

  const displayAnswerCount = answerItems.length
  const displayAnswerStatus = formatLoungeAnswerStatus(displayAnswerCount)

  useEffect(() => {
    setAnswer('')
    setAnswerItems([...readStoredAnswers(question.id), ...question.answers])
    setSortMode('latest')
    setFollowing(false)
  }, [question])

  const handleBack = () => {
    if (onBack) return onBack()
    window.history.back()
  }

  const handleFollow = () => {
    setFollowing((current) => !current)
    onFollow?.()
  }

  const handleHelpful = (answerId: string) => {
    setAnswerItems((items) => {
      const nextItems = items.map((item) => (item.id === answerId ? { ...item, helpfulCount: item.helpfulCount + 1 } : item))
      writeStoredAnswers(question.id, nextItems.filter((item) => item.id.startsWith(TEMP_ANSWER_PREFIX)))
      return nextItems
    })
    onHelpful?.(answerId)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = answer.trim()
    if (!value) return

    const nextAnswer = {
        id: `${TEMP_ANSWER_PREFIX}${Date.now()}`,
        author: '나',
        time: '방금 전',
        content: value,
        helpfulCount: 0,
      }

    setAnswerItems((items) => {
      const nextItems = [nextAnswer, ...items]
      writeStoredAnswers(question.id, nextItems.filter((item) => item.id.startsWith(TEMP_ANSWER_PREFIX)))
      return nextItems
    })
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
          {displayAnswerStatus}
        </span>

        <h2 className="w-full text-[22px] leading-[1.4] font-bold tracking-[-0.66px]">{question.title}</h2>

        <section className="flex w-full items-center gap-2.5" aria-label="질문 작성자 정보">
          <img src={questionAuthorAvatar} alt="" className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-0.5 leading-[1.2]">
            <p className="text-sm font-bold tracking-[-0.28px]">{question.author}</p>
            <p className="text-xs tracking-[-0.24px] text-[#737373]">
              {question.time} · {question.location}
            </p>
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

        <p className="text-sm leading-[1.6] tracking-[-0.28px] text-[#595959]">{question.content}</p>

        <div className="flex flex-wrap gap-2" aria-label="질문 태그">
          {question.tags.map((tag) => (
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
              <article key={item.id} className="flex w-full flex-col gap-2.5 rounded-xl bg-[#f2f2f2] p-4">
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

        <form onSubmit={handleSubmit} className="flex min-h-[46px] w-full items-center gap-2.5 rounded-full bg-[#f2f2f2] px-[18px] py-3.5">
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
