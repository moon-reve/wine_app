import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoungeHeader from '../components/LoungeHeader'
import LoungeTabs from '../components/LoungeTabs'
import {
  getAllLoungeQuestionDetails,
  getLoungeQuestionAnswerCount,
  getLoungeQuestionAnswerStatus,
} from '../data/loungeQuestionDetails'

function QnA() {
  const navigate = useNavigate()
  const [loungeQuestionDetails] = useState(() => getAllLoungeQuestionDetails())

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="1546:3610">
      <LoungeHeader />

      <main className="flex w-full flex-col gap-7 overflow-hidden px-5 pt-5 pb-28">
        <LoungeTabs activeTab="Q&A" />

        {loungeQuestionDetails.map((question) => {
          const answerCount = getLoungeQuestionAnswerCount(question)
          const answerStatus = getLoungeQuestionAnswerStatus(question)

          return (
            <Link
              key={question.id}
              to={`/question/${question.id}`}
              aria-label={`${question.title} 질문 상세 보기`}
              className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#831317]"
            >
              <article className="flex w-full flex-col gap-4">
                <div className="flex w-full flex-col items-start">
                  <p className={`text-xs leading-[1.2] font-medium tracking-[-0.24px] ${answerCount === 0 ? 'text-[#737373]' : 'text-[#831317]'}`}>
                    {answerStatus}
                  </p>
                  <h2 className="mt-2.5 w-full text-[17px] leading-[1.35] font-bold tracking-[-0.51px] text-[#0d0d0d]">{question.title}</h2>
                  <p className="mt-1.5 w-full text-[13px] leading-[1.45] tracking-[-0.26px] text-[#595959]">{question.summary}</p>
                  <p className="mt-5 text-[11px] leading-[1.2] tracking-[-0.22px] whitespace-nowrap text-[#737373]">
                    {question.author} · {question.time}
                  </p>
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
          className="pointer-events-auto absolute right-5 bottom-0 rounded-[28px] bg-[#831317] px-6 py-3.5 text-[15px] leading-none font-bold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          + 질문하기
        </button>
      </div>
    </div>
  )
}

export default QnA
