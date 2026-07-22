import { Link, useNavigate } from 'react-router-dom'
import arrowForwardIcon from '../../icon/Arrow.svg'
import LoungeHeader from '../components/LoungeHeader'
import LoungeTabs from '../components/LoungeTabs'

const questionCards = [
  {
    id: 'figma-question-label',
    answerStatus: '답변 3',
    isWaiting: false,
    title: '1982년산 보르도 와인 라벨 식별을 도와주실 수 있나요?',
    content: '할아버지의 셀러에서 발견했습니다. 라벨이 약간 찢어졌지만 1982라고 선명하게 적혀 있어요.',
    author: '소믈리에_엔투지스트',
    time: '2시간 전',
  },
  {
    id: 'figma-question-decanting',
    answerStatus: '답변 대기',
    isWaiting: true,
    title: '디캔팅은 얼마나 오래 해야 하나요?',
    content: '영 빈티지 카베르네 소비뇽 기준으로 궁금합니다. 너무 오래 하면 향이 날아갈까요?',
    author: '와인입문자',
    time: '4시간 전',
  },
  {
    id: 'figma-question-storage',
    answerStatus: '답변 5',
    isWaiting: false,
    title: '여름철 와인 보관 온도 질문드립니다',
    content: '셀러 없이 아파트에서 보관 중인데 괜찮을까요? 특히 화이트 와인이 걱정됩니다.',
    author: '클레어 V.',
    time: '어제',
  },
  {
    id: 'figma-question-chardonnay',
    answerStatus: '답변 1',
    isWaiting: false,
    title: '샤르도네와 뫼르소, 어떤 차이가 있나요?',
    content: '테루아의 차이가 실제 맛에 어떻게 반영되는지 궁금합니다.',
    author: '화이트러버',
    time: '2일 전',
  },
] as const

function QnA() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-white text-[#0d0d0d]" data-node-id="1546:3610">
      <LoungeHeader />

      <main className="flex w-full flex-col gap-7 overflow-hidden px-5 pt-5 pb-28">
        <h1 className="font-playfair text-[32px] leading-[1.3] tracking-[-0.64px] text-[#831317]">QnA</h1>
        <LoungeTabs activeTab="Q&A" />

        {questionCards.map((question) => (
          <Link
            key={question.id}
            to={`/question/${question.id}`}
            aria-label={`${question.title} 질문 상세 보기`}
            className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#831317]"
          >
            <article className="flex w-full flex-col gap-4 font-noto">
              <div className="flex w-full items-center gap-3">
                <div className="flex w-[calc(100%_-_50px)] max-w-[340px] shrink-0 flex-col items-start gap-1.5">
                  <p className={`text-xs leading-[1.2] font-medium tracking-[-0.24px] ${question.isWaiting ? 'text-[#737373]' : 'text-[#831317]'}`}>
                    {question.answerStatus}
                  </p>
                  <h2 className="w-full text-[17px] leading-[1.35] font-bold tracking-[-0.51px] text-[#0d0d0d]">{question.title}</h2>
                  <p className="w-full text-[13px] leading-[1.45] tracking-[-0.26px] text-[#595959]">{question.content}</p>
                  <p className="text-[11px] leading-[1.2] tracking-[-0.22px] whitespace-nowrap text-[#737373]">
                    {question.author} · {question.time}
                  </p>
                </div>
                <span aria-hidden="true" className="h-px min-w-px flex-1" />
                <img src={arrowForwardIcon} alt="" aria-hidden="true" className="size-4 shrink-0" />
              </div>
              <hr className="m-0 h-px w-full border-0 bg-black/12" />
            </article>
          </Link>
        ))}
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
