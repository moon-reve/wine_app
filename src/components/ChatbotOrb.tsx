import chatbotOrbFrame1 from '../assets/images/chatbot-orb-frame-1.png'
import chatbotOrbFrame2 from '../assets/images/chatbot-orb-frame-2.png'
import chatbotOrbFrame3 from '../assets/images/chatbot-orb-frame-3.png'
import chatbotOrbFrame4 from '../assets/images/chatbot-orb-frame-4.png'
import chatbotOrbFrame5 from '../assets/images/chatbot-orb-frame-5.png'

const chatbotOrbFrames = [
  chatbotOrbFrame1,
  chatbotOrbFrame2,
  chatbotOrbFrame3,
  chatbotOrbFrame4,
  chatbotOrbFrame5,
]

type ChatbotOrbProps = {
  size: number
  dataNodeId?: string
  edgeSweep?: boolean
  spinFrames?: boolean
}

export default function ChatbotOrb({
  size,
  dataNodeId,
  edgeSweep = false,
  spinFrames = false,
}: ChatbotOrbProps) {
  return (
    <span
      className="relative block rounded-full"
      style={{ width: size, height: size }}
      data-node-id={dataNodeId}
    >
      <span className="absolute inset-0 isolate overflow-hidden rounded-full">
        {chatbotOrbFrames.map((frame, index) => (
          <img
            key={frame}
            src={frame}
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`chatbot-orb-frame chatbot-orb-frame-${index + 1} absolute inset-0 size-full object-cover ${
              spinFrames ? 'is-spinning' : ''
            }`}
          />
        ))}
      </span>
      {edgeSweep && <span aria-hidden="true" className="chatbot-edge-sweep" />}
    </span>
  )
}
