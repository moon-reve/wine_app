import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { chatbotBack, chatbotSend } from '../assets/chatbotAssets'
import ChatbotOrb from '../components/ChatbotOrb'
import {
  buildRecommendationAnswer,
  buildRecommendationQuestion,
  type ChatbotLocationState,
} from '../data/chatbotRecommendation'

type ConversationKind = 'winebar' | 'party' | 'white' | 'recommendation'
type ChatTurn = { id: number; question: string; kind: ConversationKind; answer: string; mapPlace?: string }

const suggestions = [
  '근처 와인바가 어디\n인지 알려줘',
  '화이트 와인에 어울\n리는 음식 추천해줘',
  '홈파티에 가져갈\n와인 추천해줘',
  '근처 와인바가 어디\n인지 알려주세요',
]

const conversationQuestions: Record<ConversationKind, string> = {
  winebar: '근처 와인바가 어디인지 알려줘',
  party: '홈파티에 가져가기에 좋은 와인은 뭐야?',
  white: '화이트 와인에 페어링하기 좋은 음식이 뭐가 있어?',
  recommendation: '선택한 조건에 맞는 와인을 추천해줘',
}

const answers: Record<ConversationKind, string> = {
  winebar: `강남역 기준으로는 여기들이 괜찮아 보여요.

1. 먼데이블루스 — 분위기 좋은 데이트
강남역에서 접근하기 좋고, 식물과 조명으로 꾸며진 감성적인 공간이에요. 와인만 가볍게 마시기보다는 파스타·스테이크 등 식사까지 함께하기 좋은 스타일입니다.

2. 와인바 피헨 — 조용하고 대화하기 좋은 곳
프라이빗하고 차분한 분위기가 특징이고, 감바스·크림 파스타·통베이컨 스테이크·멜론 하몽 등의 안주가 있어요. 소개팅이나 조용한 데이트에 가장 무난해 보여요.

3. 플랫나인 — 라이브 재즈까지
매일 라이브 재즈 공연이 열리는 다이닝바예요. 와인과 코스요리를 즐기면서 공연까지 보고 싶을 때 잘 맞아요. 공연이 있어서 완전히 조용한 곳보다는 특별한 분위기를 원하는 날 추천해요.

4. 한량블루스 — 힙하고 캐주얼한 분위기
격식을 차린 전통적인 와인바보다는 편안하고 힙한 다이닝바에 가까워요. 음식과 주류 주문이 필요하고, 와인을 가져갈 때는 잔 이용료가 별도로 안내돼 있습니다.

지금 바로 한 곳을 고른다면 조용한 대화는 피헨, 분위기와 사진은 먼데이블루스, 특별한 데이트는 플랫나인이 제일 좋아 보여요. 방문 전에는 당일 영업과 자리를 예약 페이지에서 확인하는 게 안전해요.`,
  party: `여러 사람이 함께 즐길 수 있는 대중적인 스타일을 추천드립니다.

추천 와인
1. Chardonnay
2. Cabernet Sauvignon
3. Cava

한 줄 팁
레드와 화이트를 한 병씩 준비하면 다양한 음식과 잘 어울립니다.`,
  white: `화이트 와인은 산뜻한 산미와 과일 향이 특징이라 가볍고 신선한 음식과 잘 어울립니다.

1. 새우 오일 파스타
화이트 와인의 산미가 새우의 단맛을 살려주고 오일의 풍미를 깔끔하게 정리해 줍니다.

2. 연어 카르파초
부드러운 연어와 상큼한 레몬 드레싱이 화이트 와인의 신선한 과실 향과 잘 어우러집니다.

3. 조개 술찜
조개의 감칠맛과 와인의 미네랄감이 조화를 이루어 부담 없이 즐길 수 있는 대표적인 페어링입니다.

4. 시저 샐러드
가벼운 채소와 치즈의 고소함이 화이트 와인의 깔끔한 피니시를 더욱 돋보이게 합니다.

5. 브리 치즈 플래터
부드럽고 크리미한 치즈는 화이트 와인의 산미를 한층 더 부드럽게 만들어 줍니다.

지금 바로 한 가지를 추천한다면 새우 오일 파스타와의 조합을 가장 추천드려요. 처음 즐기는 분들도 부담 없이 만족도가 높은 페어링입니다.`,
  recommendation: '원하는 음식, 분위기, 가격대를 알려주시면 조건에 잘 맞는 와인을 추천해드릴게요.',
}

const shrimpOilPastaRecipe = `좋아요. 화이트 와인과 잘 어울리는 새우 오일 파스타 레시피를 알려드릴게요.

재료 (2인분)
• 스파게티면 180g
• 손질한 새우 10~12마리
• 마늘 6알
• 페페론치노 2~3개
• 올리브오일 5큰술
• 면수 1컵
• 소금과 후추 약간
• 파슬리와 레몬 약간

만드는 방법
1. 끓는 물에 소금을 넣고 스파게티면을 포장지 표기보다 1분 짧게 삶아주세요. 면수는 한 컵 남겨둡니다.

2. 팬에 올리브오일과 얇게 썬 마늘을 넣고 약불에서 천천히 향을 내주세요. 페페론치노도 함께 넣습니다.

3. 마늘이 노릇해지면 새우를 넣고 소금과 후추로 간한 뒤, 양면이 분홍색이 될 때까지 익혀주세요.

4. 삶은 면과 면수 반 컵을 넣고 빠르게 섞어 오일과 면수가 부드럽게 어우러지도록 만들어주세요. 부족하면 면수를 조금씩 추가합니다.

5. 불을 끄고 파슬리와 레몬즙을 살짝 더하면 완성입니다.

한 줄 팁
산뜻한 소비뇽 블랑이나 가벼운 샤르도네를 곁들이면 새우의 단맛과 레몬 향이 더욱 선명하게 살아납니다.`

const foodRecipes: Record<string, string> = {
  '새우 오일 파스타': shrimpOilPastaRecipe,
  '연어 카르파초': `좋아요. 화이트 와인과 잘 어울리는 연어 카르파초 레시피를 알려드릴게요.

재료 (2인분)
• 횟감용 연어 180g
• 레몬즙 2큰술
• 올리브오일 2큰술
• 케이퍼 1큰술
• 적양파와 루콜라 약간
• 소금과 후추 약간

만드는 방법
1. 차갑게 보관한 연어를 얇게 썰어 접시에 넓게 펼쳐주세요.

2. 레몬즙, 올리브오일, 소금, 후추를 섞어 드레싱을 만듭니다.

3. 연어 위에 드레싱을 고르게 뿌리고 얇게 썬 적양파, 케이퍼, 루콜라를 올려주세요.

4. 냉장고에서 5분 정도 차갑게 둔 뒤 바로 즐기면 완성입니다.

한 줄 팁
소비뇽 블랑을 곁들이면 레몬과 허브의 산뜻한 향이 연어의 풍미를 깔끔하게 살려줍니다.`,
  '조개 술찜': `좋아요. 화이트 와인과 잘 어울리는 조개 술찜 레시피를 알려드릴게요.

재료 (2인분)
• 해감한 바지락 500g
• 화이트 와인 100ml
• 마늘 5알
• 버터 1큰술
• 페페론치노 2개
• 파슬리와 후추 약간

만드는 방법
1. 팬에 버터를 녹이고 편으로 썬 마늘과 페페론치노를 약불에서 볶아주세요.

2. 바지락을 넣고 가볍게 섞은 뒤 화이트 와인을 부어줍니다.

3. 뚜껑을 덮고 중불에서 4~5분간 익혀 조개가 입을 벌리게 해주세요.

4. 후추와 파슬리를 뿌리고 국물까지 따뜻할 때 즐기면 완성입니다.

한 줄 팁
조리에 사용한 드라이 화이트 와인을 그대로 곁들이면 조개의 감칠맛과 미네랄 풍미가 자연스럽게 이어집니다.`,
  '시저 샐러드': `좋아요. 화이트 와인과 잘 어울리는 시저 샐러드 레시피를 알려드릴게요.

재료 (2인분)
• 로메인 1통
• 크루통 한 줌
• 파르미지아노 치즈 30g
• 마요네즈 2큰술
• 레몬즙 1큰술
• 다진 마늘 1/2작은술
• 올리브오일 1큰술
• 소금과 후추 약간

만드는 방법
1. 로메인을 먹기 좋은 크기로 잘라 물기를 완전히 제거해주세요.

2. 마요네즈, 레몬즙, 마늘, 올리브오일, 소금, 후추를 섞어 드레싱을 만듭니다.

3. 로메인에 드레싱을 가볍게 버무린 뒤 크루통과 치즈를 올리면 완성입니다.

한 줄 팁
산미가 선명한 샤르도네를 곁들이면 치즈의 고소함은 살리고 드레싱의 무게감은 깔끔하게 정리해줍니다.`,
  '브리 치즈 플래터': `좋아요. 화이트 와인과 잘 어울리는 브리 치즈 플래터 구성을 알려드릴게요.

재료 (2인분)
• 브리 치즈 1개
• 바게트 또는 크래커
• 청포도와 배
• 호두 또는 아몬드
• 꿀 1큰술
• 무화과 잼 약간

만드는 방법
1. 브리 치즈를 먹기 20분 전에 실온에 꺼내 부드럽게 만들어주세요.

2. 치즈를 중심에 두고 바게트, 크래커, 청포도, 얇게 썬 배를 둘러 담습니다.

3. 견과류를 빈 공간에 채우고 꿀과 무화과 잼을 작은 그릇에 곁들여주세요.

4. 치즈 위에 꿀을 아주 조금 뿌리면 완성입니다.

한 줄 팁
가벼운 샤르도네나 과실 향이 좋은 화이트 와인을 곁들이면 브리 치즈의 크리미함이 더욱 부드럽게 느껴집니다.`,
}

const followUpSuggestions: Record<ConversationKind, string[]> = {
  winebar: ['조용한 대화를 위해\n피헨을 선택할게', '분위기가 좋은\n먼데이블루스로 할게', '특별한 데이트로\n플랫나인을 선택할게'],
  party: ['Cabernet으로\n할래', 'Chardonnay로\n할래', 'Cava로\n할래'],
  white: [
    '새우 오일 파스타를\n선택할게',
    '연어 카르파초로\n선택할게',
    '조개 술찜으로\n선택할게',
    '시저 샐러드로\n선택할게',
    '브리 치즈 플래터로\n선택할게',
  ],
  recommendation: ['첫 번째 와인을\n자세히 알려줘', '세 와인의 차이를\n비교해줘', '다른 와인도\n추천해줘'],
}

const recipeFollowUps = ['레몬 풍미를 더해서\n만들게', '살짝 매콤하게\n만들게', '소비뇽 블랑과\n곁들일게']

function matchConversation(value: string): ConversationKind {
  if (value.includes('화이트') || value.includes('새우') || value.includes('연어') || value.includes('브리')) return 'white'
  if (value.includes('홈파티') || value.includes('Cabernet') || value.includes('Chardonnay') || value.includes('Cava')) return 'party'
  if (value.includes('추천') || value.includes('가격대') || value.includes('조건')) return 'recommendation'
  return 'winebar'
}

function getMapPlace(value: string) {
  if (value.includes('먼데이블루스')) return '먼데이블루스'
  if (value.includes('피헨')) return '와인바 피헨'
  if (value.includes('플랫나인')) return '플랫나인'
  return undefined
}

function getAnswer(value: string, kind: ConversationKind, mapPlace?: string) {
  if (mapPlace) return `네이버 지도에서 ${mapPlace} 열기 ↗\n\n카카오맵에서 열기 ↗`
  const selectedFood = Object.keys(foodRecipes).find((food) => value.includes(food))
  if (selectedFood) return foodRecipes[selectedFood]
  return answers[kind]
}

function MapLinks({ place }: { place: string }) {
  const query = encodeURIComponent(`${place} 강남역`)
  return (
    <div className="space-y-7 py-1 text-[16px] leading-[1.55] tracking-[-0.32px]">
      <a href={`https://map.naver.com/p/search/${query}`} target="_blank" rel="noreferrer" className="block w-fit border-b-2 border-dotted border-black pb-0.5">
        네이버 지도에서 {place} 열기 ↗
      </a>
      <a href={`https://map.kakao.com/link/search/${query}`} target="_blank" rel="noreferrer" className="block w-fit border-b-2 border-dotted border-black pb-0.5">
        카카오맵에서 열기 ↗
      </a>
    </div>
  )
}

export default function Chatbot() {
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState('')
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [visibleAnswer, setVisibleAnswer] = useState('')
  const [responseId, setResponseId] = useState(0)
  const conversationScrollRef = useRef<HTMLDivElement>(null)
  const initialRecommendationHandledRef = useRef(false)
  const latestTurn = turns.at(-1)
  const locationState = location.state as ChatbotLocationState | null

  useEffect(() => {
    const request = locationState?.recommendationRequest
    if (!request || initialRecommendationHandledRef.current) return

    initialRecommendationHandledRef.current = true
    setTurns([
      {
        id: 1,
        question: buildRecommendationQuestion(request),
        kind: 'recommendation',
        answer: buildRecommendationAnswer(request),
      },
    ])
    setResponseId(1)
  }, [locationState?.recommendationRequest])

  useEffect(() => {
    if (!latestTurn) {
      setVisibleAnswer('')
      return
    }

    const answer = latestTurn.answer
    let index = 0
    setVisibleAnswer('')
    const timer = window.setInterval(() => {
      index = Math.min(index + 2, answer.length)
      setVisibleAnswer(answer.slice(0, index))
      if (index >= answer.length) window.clearInterval(timer)
    }, 16)

    return () => window.clearInterval(timer)
  }, [latestTurn, responseId])

  useEffect(() => {
    const scrollArea = conversationScrollRef.current
    if (!scrollArea || !visibleAnswer) return
    scrollArea.scrollTop = scrollArea.scrollHeight
  }, [visibleAnswer])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = message.trim()
    if (!value) return
    const kind = matchConversation(value)
    const mapPlace = getMapPlace(value)
    setTurns((current) => [...current, { id: responseId + 1, question: value, kind, mapPlace, answer: getAnswer(value, kind, mapPlace) }])
    setResponseId((current) => current + 1)
    setMessage('')
  }

  const handleBack = () => {
    const from = locationState?.from
    navigate(from && from !== '/chatbot' ? from : '/home', { replace: true })
  }

  const chooseSuggestion = (suggestion: string) => {
    setMessage(suggestion.replace('\n', ' '))
  }

  return (
    <main className="@container relative mx-auto h-[100dvh] min-h-[700px] w-full max-w-[430px] overflow-hidden bg-white text-black" data-node-id="1546:3232">
      <div aria-hidden="true" className="absolute inset-x-0 top-[44.742%] bottom-0" style={{ background: 'radial-gradient(ellipse 274.767cqw 100% at 50% 0%, rgba(255,255,255,0) 0%, rgba(187,136,158,0.2) 50%, rgba(152,76,109,0.3) 75%, rgba(118,16,60,0.4) 100%)' }} />

      <header className="absolute inset-x-0 top-0 z-30 h-[70px] bg-white/90 backdrop-blur-sm">
        <button type="button" aria-label="뒤로 가기" onClick={handleBack} className="absolute top-2 left-2 z-30 flex size-12 cursor-pointer touch-manipulation items-center justify-center rounded-full">
          <img src={chatbotBack} alt="" aria-hidden="true" className="size-6" />
        </button>
        <h1 className="pointer-events-none absolute inset-x-0 top-[24px] text-center text-lg leading-none font-bold tracking-[-0.54px]">AI 챗봇</h1>
        <button type="button" className="absolute top-[26px] right-6 text-[13px] leading-none font-bold text-black/50">이전 채팅</button>
      </header>

      <div
        ref={conversationScrollRef}
        className={`absolute inset-x-0 top-[70px] bottom-0 z-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${turns.length ? 'overflow-y-auto pb-[180px]' : 'overflow-hidden'}`}
      >
        <section className="relative min-h-[calc(100dvh-70px)]" aria-label="챗봇 시작 화면">
          <div className="absolute top-[185px] left-1/2 -translate-x-1/2"><ChatbotOrb size={141} spinFrames edgeSweep /></div>
          <p className="absolute inset-x-0 top-[347px] text-center text-2xl leading-normal font-semibold tracking-[-0.48px]">안녕하세요. Sora Choi님</p>
          <p className="absolute inset-x-0 top-[387px] text-center text-[40px] leading-normal tracking-[-0.8px]">무엇이 궁금하신가요?</p>
          <div className="absolute right-0 bottom-[119px] left-5 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => chooseSuggestion(suggestion)} className="h-[57px] w-[126px] shrink-0 whitespace-pre-line rounded-xl bg-white/10 px-3 text-left text-sm leading-[1.3] tracking-[-0.28px] text-black/80">{suggestion}</button>
            ))}
          </div>
        </section>

        {turns.length > 0 && <p className="px-5 text-center text-[14px] leading-[23px] tracking-[-0.28px] text-black/50">2026. 07. 21</p>}
        <div className="px-5">
          {turns.map((turn, index) => {
            const isLatest = index === turns.length - 1
            const shownAnswer = isLatest ? visibleAnswer : turn.answer
            const isComplete = !isLatest || shownAnswer.length === turn.answer.length
            return (
              <section key={turn.id} className="pt-6">
                <div className="flex justify-end">
                  <p className="max-w-[84%] rounded-[29px] bg-[#acacac]/15 px-5 py-3.5 text-[16px] leading-[1.3] tracking-[-0.32px]">{turn.question || conversationQuestions[turn.kind]}</p>
                </div>
                <article className="mt-8 min-h-6 pb-5 text-[16px] leading-[1.55] tracking-[-0.32px] whitespace-pre-wrap">
                  {turn.mapPlace && isComplete ? <MapLinks place={turn.mapPlace} /> : shownAnswer}
                  {!isComplete && <span aria-hidden="true" className="ml-0.5 inline-block h-[1.15em] w-[2px] animate-pulse bg-black align-[-0.18em]" />}
                </article>
                {isComplete && <div className="mb-5 flex gap-5 text-[12px] text-black/50"><button type="button">▣ 복사</button><button type="button">↗ 공유</button></div>}
                {isLatest && isComplete && !turn.mapPlace && (
                  <div className="-mr-5 mb-3 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {(Object.values(foodRecipes).includes(turn.answer) ? recipeFollowUps : followUpSuggestions[turn.kind]).map((suggestion) => (
                      <button key={suggestion} type="button" onClick={() => chooseSuggestion(suggestion)} className="h-[57px] w-[146px] shrink-0 whitespace-pre-line rounded-xl border border-white/60 bg-white/15 px-3 text-left text-sm leading-[1.3] tracking-[-0.28px] text-black/80 backdrop-blur-sm">{suggestion}</button>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="absolute right-5 bottom-[53px] left-5 z-20 h-[52px] rounded-[26px] border border-white/80 bg-white/20 backdrop-blur-sm">
        <input value={message} onChange={(event) => setMessage(event.target.value)} aria-label="챗봇에게 메시지 보내기" placeholder="궁금한 내용을 작성해 주세요" className="h-full w-full rounded-[26px] bg-transparent pr-[58px] pl-5 text-[13px] tracking-[-0.26px] text-black outline-none placeholder:text-black/20" />
        <button type="submit" aria-label="메시지 보내기" className="absolute top-1.5 right-2 size-[38px]"><img src={chatbotSend} alt="" aria-hidden="true" className="size-[38px]" /></button>
      </form>
    </main>
  )
}
