import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatbotBack, chatbotSend } from '../assets/chatbotAssets'
import ChatbotOrb from '../components/ChatbotOrb'

const suggestions = [
  '근처 와인바가 어디\n인지 알려줘',
  '화이트 와인에 어울\n리는 와인 추천해줘',
  '홈파티에 가져갈\n와인 추천해줘',
  '근처 와인바가 어디\n인지 알려주세요',
]

export default function Chatbot() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
  }

  const handleBack = () => navigate(-1)

  return (
    <main
      className="relative mx-auto h-[100dvh] min-h-[700px] w-full max-w-[430px] overflow-hidden bg-white text-black"
      data-node-id="1546:3232"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[417px] bottom-0"
        style={{
          background:
            'radial-gradient(ellipse 118px 515px at 50% 0%, rgba(255,255,255,0) 0%, rgba(187,136,158,0.2) 50%, rgba(152,76,109,0.3) 75%, rgba(118,16,60,0.4) 100%)',
        }}
      />

      <header className="absolute inset-x-0 top-0 z-10 h-[70px]">
        <button
          type="button"
          aria-label="뒤로 가기"
          data-node-id="1546:3235"
          onClick={handleBack}
          className="absolute top-2.5 left-2 flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <img src={chatbotBack} alt="" aria-hidden="true" className="size-6" />
        </button>
        <h1 className="absolute inset-x-0 top-[24px] text-center text-lg leading-none font-bold tracking-[-0.54px]">
          AI 챗봇
        </h1>
        <button
          type="button"
          className="absolute top-[26px] right-6 text-[13px] leading-none font-bold text-black/50"
        >
          이전 채팅
        </button>
      </header>

      <div className="absolute top-[255px] left-1/2 -translate-x-1/2" data-node-id="1546:3266">
          <ChatbotOrb size={141} spinFrames edgeSweep />
      </div>

      <p className="absolute inset-x-0 top-[417px] text-center text-2xl leading-normal font-semibold tracking-[-0.48px]">
        안녕하세요. Sora Choi님
      </p>
      <p className="absolute inset-x-0 top-[457px] text-center text-[40px] leading-normal tracking-[-0.8px]">
        무엇이 궁금하신가요?
      </p>

      <div className="absolute right-0 bottom-[119px] left-5 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setMessage(suggestion.replace('\n', ' '))}
            className="h-[57px] w-[126px] shrink-0 whitespace-pre-line rounded-xl bg-white/10 px-3 text-left text-sm leading-[1.3] tracking-[-0.28px] text-black/80"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="absolute right-5 bottom-[53px] left-5 h-[52px] rounded-[26px] border border-white/80 bg-white/10"
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-label="챗봇에게 메시지 보내기"
          placeholder="궁금한 내용을 작성해 주세요"
          className="h-full w-full rounded-[26px] bg-transparent pr-[58px] pl-5 text-[13px] tracking-[-0.26px] text-black outline-none placeholder:text-black/20"
        />
        <button
          type="submit"
          aria-label="메시지 보내기"
          className="absolute top-1.5 right-2 size-[38px]"
        >
          <img src={chatbotSend} alt="" aria-hidden="true" className="size-[38px]" />
        </button>
      </form>
    </main>
  )
}
