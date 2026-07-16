import { Link, useNavigate } from 'react-router-dom'
import arrowForwardIcon from '../../icon/Arrow.svg'
import Header from '../components/Header'
import LoungeTabs from '../components/LoungeTabs'
import { questionItems } from '../data/questionData'

const questionCards = questionItems.slice(0, 4)

function QnA() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="619:50">
      <Header tone="light" />

      <main className="flex w-full flex-col gap-7 overflow-hidden px-5 pt-5 pb-28">
        <div className="flex flex-col items-start gap-1.5 leading-[1.3] whitespace-nowrap">
          <h1 className="font-playfair text-[38px] font-bold tracking-[-0.76px] text-[#831317]">QnA</h1>
          <p className="font-noto text-sm tracking-[-0.28px]">와인 고수들에게 무엇이든 물어보세요</p>
        </div>

        <LoungeTabs activeTab="Q&A" />

        {questionCards.map((question) => {
          const answerCount = question.answers.length
          const isWaiting = answerCount === 0
          const answerStatus = isWaiting ? '답변 대기' : `답변 ${answerCount}`

          return (
            <Link
              key={question.id}
              to={`/question/${question.id}`}
              aria-label={`${question.title} 질문 상세 보기`}
              className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#831317]"
            >
              <article className="flex w-full flex-col gap-4 font-noto">
              <div className="flex w-full items-center gap-3">
                <div className="flex w-[calc(100%_-_50px)] max-w-[340px] shrink-0 flex-col items-start gap-1.5">
                  <p
                    className={`text-xs leading-[1.2] font-medium tracking-[-0.24px] ${isWaiting ? 'text-[#737373]' : 'text-[#831317]'}`}
                  >
                    {answerStatus}
                  </p>
                  <h2 className="w-full text-[17px] leading-[1.35] font-bold tracking-[-0.51px] text-[#0d0d0d]">
                    {question.title}
                  </h2>
                  <p className="w-full text-[13px] leading-[1.45] font-normal tracking-[-0.26px] text-[#595959]">
                    {question.content}
                  </p>
                  <p className="text-[11px] leading-[1.2] font-normal tracking-[-0.22px] whitespace-nowrap text-[#737373]">
                    {question.author} · {question.time}
                  </p>
                </div>

                <span aria-hidden="true" className="h-px min-w-px flex-1" />
                <img src={arrowForwardIcon} alt="" aria-hidden="true" className="size-4 shrink-0" />
              </div>

              <hr className="m-0 h-px w-full border-0 bg-black/12" />
              </article>
            </Link>
          )
        })}
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-28 z-40 mx-auto w-full max-w-107.5">
        <button
          type="button"
          onClick={() => navigate('/lounge/questions/new')}
          className="pointer-events-auto absolute right-5 bottom-0 rounded-[28px] bg-[#831317] px-6 py-3.5 font-noto text-[15px] leading-none font-bold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          + 질문하기
        </button>
      </div>
    </div>
  )
}

export default QnA
