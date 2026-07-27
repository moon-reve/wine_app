export type LoungeQuestionAnswer = {
  id: string
  author: string
  time: string
  content: string
  helpfulCount: number
  accepted?: boolean
}

export type LoungeQuestionDetail = {
  id: string
  title: string
  summary: string
  author: string
  time: string
  location: string
  content: string
  tags: string[]
  answers: LoungeQuestionAnswer[]
}

export const loungeQuestionDetails: LoungeQuestionDetail[] = [
  {
    id: 'figma-question-label',
    title: '1982년산 보르도 와인 라벨 식별을 도와주실 수 있나요?',
    summary: '할아버지의 셀러에서 발견했습니다. 라벨이 약간 찢어졌지만 1982라고 선명하게 적혀 있어요.',
    author: '소믈리에_엔투지스트',
    time: '2시간 전',
    location: '프랑스 보르도',
    content:
      '어제 할아버지의 셀러에서 발견했습니다. 라벨이 약간 찢어졌지만 1982라고 선명하게 적혀 있고 생테밀리옹 지역 제품인 것 같습니다. 생산자를 찾는 데 도움을 주실 수 있을까요?',
    tags: ['1982빈티지', '보르도', '와인식별'],
    answers: [
      {
        id: 'figma-answer-wine-expert',
        author: '와인전문가88',
        time: '45분 전',
        content:
          "이건 샤토 피작과 매우 흡사해 보입니다. 그해 '1982'의 포트 스타일이 매우 독특했습니다. 메를로와 카베르네 프랑이 주로 섞인 훌륭한 빈티지입니다.",
        helpfulCount: 12,
        accepted: true,
      },
      {
        id: 'figma-answer-master-cellar',
        author: '마스터_셀러',
        time: '1시간 전',
        content:
          '와인전문가님 의견에 동의합니다. 캡슐을 확인해보세요. 오리지널이라면 샤토를 확인해주는 양각 문장이 있을 겁니다.',
        helpfulCount: 4,
      },
    ],
  },
  {
    id: 'figma-question-decanting',
    title: '디캔팅은 얼마나 오래 해야 하나요?',
    summary: '영 빈티지 카베르네 소비뇽 기준으로 궁금합니다. 너무 오래 하면 향이 날아갈까요?',
    author: '와인입문자',
    time: '4시간 전',
    location: '캘리포니아 나파 밸리',
    content:
      '영 빈티지 카베르네 소비뇽 기준으로 디캔팅 시간이 궁금합니다. 너무 오래 열어두면 향이 날아갈까 걱정되고, 짧게 하면 탄닌이 거칠게 느껴질까 봐 고민됩니다.',
    tags: ['디캔팅', '카베르네소비뇽', '와인입문'],
    answers: [],
  },
  {
    id: 'figma-question-storage',
    title: '여름철 와인 보관 온도 질문드립니다',
    summary: '셀러 없이 아파트에서 보관 중인데 괜찮을까요? 특히 화이트 와인이 걱정됩니다.',
    author: '클레어 V.',
    time: '어제',
    location: '서울',
    content:
      '셀러 없이 아파트에서 와인을 보관 중인데 여름철 실내 온도가 올라가도 괜찮을까요? 특히 화이트 와인은 온도 변화에 민감하다고 들어서 걱정됩니다.',
    tags: ['와인보관', '여름', '화이트와인'],
    answers: [
      {
        id: 'figma-answer-storage-1',
        author: '셀러가이드',
        time: '3시간 전',
        content:
          '장기 보관이라면 12~15도 정도가 좋고, 무엇보다 온도 변화가 적은 환경이 중요합니다. 직사광선과 주방 열기는 피해주세요.',
        helpfulCount: 18,
        accepted: true,
      },
      {
        id: 'figma-answer-storage-2',
        author: '와인홈바',
        time: '5시간 전',
        content:
          '셀러가 없다면 집에서 가장 서늘하고 어두운 공간을 추천합니다. 박스째 눕혀두면 빛과 흔들림을 어느 정도 줄일 수 있어요.',
        helpfulCount: 11,
      },
    ],
  },
  {
    id: 'figma-question-chardonnay',
    title: '샤르도네와 뫼르소, 어떤 차이가 있나요?',
    summary: '테루아의 차이가 실제 맛에 어떻게 반영되는지 궁금합니다.',
    author: '화이트러버',
    time: '2일 전',
    location: '부르고뉴',
    content:
      '샤르도네 품종으로 만든 와인과 뫼르소에서 생산된 화이트 와인의 차이가 궁금합니다. 테루아의 차이가 실제 맛과 향에 어떻게 반영되는지 알고 싶어요.',
    tags: ['샤르도네', '뫼르소', '테루아'],
    answers: [
      {
        id: 'figma-answer-chardonnay-1',
        author: '부르고뉴노트',
        time: '어제',
        content:
          '샤르도네는 품종 이름이고 뫼르소는 부르고뉴의 생산지입니다. 뫼르소는 같은 샤르도네라도 견과류, 버터, 미네랄감이 더 풍부하게 느껴지는 경우가 많습니다.',
        helpfulCount: 15,
        accepted: true,
      },
    ],
  },
]

export function getLoungeQuestionDetail(questionId?: string) {
  return loungeQuestionDetails.find((question) => question.id === questionId) ?? loungeQuestionDetails[0]
}

export const TEMP_ANSWER_PREFIX = 'temp-answer-'

const SESSION_ANSWER_PREFIX = 'lounge-question-temp-answers:'

function getStoredAnswerKey(questionId: string) {
  return `${SESSION_ANSWER_PREFIX}${questionId}`
}

function isStoredAnswer(value: unknown): value is LoungeQuestionAnswer {
  if (!value || typeof value !== 'object') return false

  const answer = value as Partial<LoungeQuestionAnswer>
  return (
    typeof answer.id === 'string' &&
    typeof answer.author === 'string' &&
    typeof answer.time === 'string' &&
    typeof answer.content === 'string' &&
    typeof answer.helpfulCount === 'number'
  )
}

export function readStoredAnswers(questionId: string) {
  if (typeof window === 'undefined') return []

  try {
    const storedValue = window.sessionStorage.getItem(getStoredAnswerKey(questionId))
    if (!storedValue) return []

    const parsedValue: unknown = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue.filter(isStoredAnswer) : []
  } catch {
    return []
  }
}

export function writeStoredAnswers(questionId: string, answers: LoungeQuestionAnswer[]) {
  if (typeof window === 'undefined') return

  window.sessionStorage.setItem(getStoredAnswerKey(questionId), JSON.stringify(answers))
}

export function getLoungeQuestionAnswerCount(question: LoungeQuestionDetail) {
  return question.answers.length + readStoredAnswers(question.id).filter((answer) => answer.id.startsWith(TEMP_ANSWER_PREFIX)).length
}

export function formatLoungeAnswerStatus(answerCount: number) {
  return answerCount > 0 ? `답변 ${answerCount}` : '답변 대기'
}

export function getLoungeQuestionAnswerStatus(question: LoungeQuestionDetail) {
  return formatLoungeAnswerStatus(getLoungeQuestionAnswerCount(question))
}
