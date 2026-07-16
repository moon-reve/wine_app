import { useMemo, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import backIcon from '../assets/images/icon-chevron-forward.svg'
import questionAuthorAvatar from '../assets/images/feed-author-avatar.svg'
import answerAuthorAvatar from '../assets/images/feed-comment-avatar.svg'
import { getQuestionById, type QuestionAnswerViewModel } from '../data/questionData'

type SortMode = 'latest' | 'popular'

type QuestionDetailProps = {
  onBack?: () => void
  onFollow?: () => void
  onSubmitAnswer?: (answer: string) => void
  onHelpful?: (answerId: string) => void
  className?: string
}

function QuestionDetailContent({
  questionId,
  onBack,
  onFollow,
  onSubmitAnswer,
  onHelpful,
  className = '',
}: QuestionDetailProps & { questionId?: string }) {
  const question = getQuestionById(questionId)
  const [answer, setAnswer] = useState('')
  const [answerItems, setAnswerItems] = useState<QuestionAnswerViewModel[]>(question?.answers ?? [])
  const [sortMode, setSortMode] = useState<SortMode>('latest')
  const [following, setFollowing] = useState(false)

  const answerCount = answerItems.length
  const sortedAnswers = useMemo(() => {
    return [...answerItems].sort((a, b) => {
      const createdAtDifference = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

      if (sortMode === 'popular') {
        return b.helpfulCount - a.helpfulCount || createdAtDifference
      }

      return createdAtDifference
    })
  }, [answerItems, sortMode])

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    window.history.back()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = answer.trim()
    if (!value) return

    setAnswerItems((currentAnswers) => [
      {
        id: `answer_${Date.now()}`,
        userId: 'current_user',
        author: '나',
        profileSource: undefined,
        time: '방금 전',
        content: value,
        helpfulCount: 0,
        createdAt: new Date().toISOString(),
        accepted: false,
      },
      ...currentAnswers,
    ])
    onSubmitAnswer?.(value)
    setAnswer('')
  }

  const handleHelpful = (answerId: string) => {
    setAnswerItems((currentAnswers) =>
      currentAnswers.map((item) =>
        item.id === answerId ? { ...item, helpfulCount: item.helpfulCount + 1 } : item,
      ),
    )
    onHelpful?.(answerId)
  }

  const toggleSortMode = () => {
    setSortMode((currentMode) => (currentMode === 'latest' ? 'popular' : 'latest'))
  }

  const handleFollow = () => {
    setFollowing(!following)
    onFollow?.()
  }

  if (!question) {
    return (
      <main className={`mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center gap-4 bg-white px-5 text-[#0d0d0d] ${className}`}>
        <p className="text-base font-bold">질문을 찾을 수 없어요.</p>
        <button type="button" onClick={handleBack} className="rounded-full bg-[#831317] px-4 py-2 text-sm font-medium text-white">
          뒤로 가기
        </button>
      </main>
    )
  }

  return (
    <article
      data-node-id="622:88"
      className={`mx-auto min-h-screen w-full max-w-[430px] bg-white text-[#0d0d0d] ${className}`}
    >
      <header
        data-node-id="622:89"
        className="relative flex h-[70px] w-full shrink-0 items-center justify-center"
      >
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={handleBack}
          className="absolute left-5 top-5 flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
        >
          <img src={backIcon} alt="" aria-hidden="true" className="size-6 rotate-180" />
        </button>
        <h1 className="text-[18px] leading-none font-bold tracking-[-0.54px]">Q&amp;A</h1>
      </header>

      <div data-node-id="622:94" className="flex w-full flex-col gap-5 px-5 pt-3 pb-8">
        <span className="flex h-6 w-fit items-center rounded-full bg-[#831317] px-3 text-xs leading-none font-medium text-white">
          답변 {answerCount}
        </span>

        <h2 className="w-full text-[22px] leading-[1.4] font-bold tracking-[-0.66px]">
          {question.title}
        </h2>

        <section className="flex w-full items-center gap-2.5" aria-label="질문 작성자 정보">
          <img src={questionAuthorAvatar} data-original-src={question.profileSource} alt="" className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-0.5 leading-[1.2]">
            <p className="text-sm font-bold tracking-[-0.28px]">{question.author}</p>
            <p className="text-xs tracking-[-0.24px] text-[#737373]">{question.time}</p>
          </div>
          <button
            type="button"
            aria-pressed={following}
            onClick={handleFollow}
            className={`ml-auto flex h-[30px] shrink-0 items-center justify-center rounded-full border border-[#831317] px-[11px] text-xs leading-none font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317] ${
              following
                ? 'bg-[#831317] text-white hover:bg-[#670e10]'
                : 'bg-white text-[#831317] hover:bg-[#831317] hover:text-white'
            }`}
          >
            {following ? '팔로잉' : '팔로우'}
          </button>
        </section>

        <p className="text-sm leading-[1.6] tracking-[-0.28px] text-[#595959]">{question.content}</p>

        <div className="flex flex-wrap gap-2" aria-label="질문 태그">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="flex h-6 items-center rounded-full bg-[#831317] px-3 text-xs leading-none font-medium text-white"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="h-px w-full bg-black/12" />

        <section aria-labelledby="question-answers-title" className="flex flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <h3 id="question-answers-title" className="text-[17px] leading-[1.3] font-bold tracking-[-0.51px]">
              답변 {answerCount}
            </h3>
            <button
              type="button"
              onClick={toggleSortMode}
              aria-label={sortMode === 'latest' ? '인기순으로 정렬' : '최신순으로 정렬'}
              className="text-xs leading-none tracking-[-0.24px] text-[#737373] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
            >
              {sortMode === 'latest' ? '최신순' : '인기순'}
            </button>
          </div>

          <div className="flex flex-col gap-5" aria-live="polite">
            {sortedAnswers.map((item) => (
              <article key={item.id} className="flex w-full flex-col gap-2.5 rounded-xl bg-[#f9f7f6] p-4">
                <div className="flex min-w-0 items-center gap-2">
                  <img src={answerAuthorAvatar} data-original-src={item.profileSource} alt="" className="size-[30px] shrink-0 rounded-full" />
                  <p className="shrink-0 text-[13px] leading-[1.2] font-bold tracking-[-0.26px]">{item.author}</p>
                  <time className="shrink-0 text-[11px] leading-[1.2] tracking-[-0.22px] text-[#737373]">
                    {item.time}
                  </time>
                  {item.accepted && (
                    <span className="flex h-[18px] shrink-0 items-center rounded-full border border-[#831317] bg-white px-2.5 text-[10px] leading-none font-medium text-[#831317]">
                      채택
                    </span>
                  )}
                </div>

                <p className="text-[13px] leading-[1.55] tracking-[-0.26px] text-[#595959]">{item.content}</p>

                <button
                  type="button"
                  onClick={() => handleHelpful(item.id)}
                  className="w-fit text-xs leading-[1.2] font-medium text-[#831317] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
                >
                  도움돼요 {item.helpfulCount}
                </button>
              </article>
            ))}
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-[46px] w-full items-center gap-2.5 rounded-full bg-[#f6f5f4] px-[18px] py-3.5"
        >
          <label htmlFor="question-answer" className="sr-only">
            답변 입력
          </label>
          <input
            id="question-answer"
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="전문 지식을 공유해 주세요..."
            className="min-w-0 flex-1 bg-transparent text-[13px] leading-none tracking-[-0.26px] text-[#0d0d0d] outline-none placeholder:text-[#737373]"
          />
          <button
            type="submit"
            className="shrink-0 text-[13px] leading-none font-bold tracking-[-0.26px] text-[#831317] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831317]"
          >
            등록
          </button>
        </form>
      </div>
    </article>
  )
}

export default function QuestionDetail(props: QuestionDetailProps) {
  const { questionId } = useParams()
  return <QuestionDetailContent key={questionId} questionId={questionId} {...props} />
}
