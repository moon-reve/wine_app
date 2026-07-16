import questions from '../../dummy data/questions.json'
import users from '../../dummy data/users.json'

export type QuestionAnswerViewModel = {
  id: string
  userId: string
  author: string
  profileSource?: string
  content: string
  helpfulCount: number
  createdAt: string
  time: string
  accepted: boolean
}

export type QuestionViewModel = {
  id: string
  userId: string
  author: string
  profileSource?: string
  title: string
  content: string
  images: string[]
  tags: string[]
  createdAt: string
  time: string
  answers: QuestionAnswerViewModel[]
}

const usersById = new Map(users.map((user) => [user.id, user]))

export function formatQuestionTime(createdAt: string) {
  const createdTime = new Date(createdAt).getTime()
  const elapsedHours = Math.max(1, Math.floor((Date.now() - createdTime) / (1000 * 60 * 60)))

  if (elapsedHours < 24) return `${elapsedHours}시간 전`

  const elapsedDays = Math.floor(elapsedHours / 24)
  if (elapsedDays === 1) return '어제'
  if (elapsedDays < 7) return `${elapsedDays}일 전`

  const created = new Date(createdAt)
  return `${created.getMonth() + 1}월 ${created.getDate()}일`
}

export const questionItems: QuestionViewModel[] = questions.map((question) => {
  const user = usersById.get(question.userId)

  return {
    id: question.id,
    userId: question.userId,
    author: user?.nickname ?? '알 수 없는 사용자',
    profileSource: user?.profileImage || undefined,
    title: question.title,
    content: question.content,
    images: question.images,
    tags: question.tags,
    createdAt: question.createdAt,
    time: formatQuestionTime(question.createdAt),
    answers: question.answers.map((answer) => {
      const answerUser = usersById.get(answer.userId)

      return {
        id: answer.id,
        userId: answer.userId,
        author: answerUser?.nickname ?? '알 수 없는 사용자',
        profileSource: answerUser?.profileImage || undefined,
        content: answer.content,
        helpfulCount: answer.helpfulCount,
        createdAt: answer.createdAt,
        time: formatQuestionTime(answer.createdAt),
        accepted: 'isAccepted' in answer && answer.isAccepted === true,
      }
    }),
  }
})

export function getQuestionById(questionId?: string) {
  return questionItems.find((question) => question.id === questionId)
}
