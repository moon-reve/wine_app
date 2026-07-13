import { useState } from 'react'
import type { FormEvent } from 'react'
import ImageUploader from '../components/question/ImageUploader'
import QuestionWriteHeader from '../components/question/QuestionWriteHeader'
import TagSelector from '../components/question/TagSelector'

const FORM_ID = 'question-write-form'
const TAGS = ['빈티지확인', '가격문의', '페어링', '보관법'] as const

function QuestionWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['빈티지확인'])
  const [isComplete, setIsComplete] = useState(false)

  const canSubmit = title.trim().length > 0 && content.trim().length >= 10

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((selectedTag) => selectedTag !== tag) : [...current, tag],
    )
    setIsComplete(false)
  }

  const handleRegistrationComplete = () => {
    setIsComplete(true)

    // TODO: Q&A 리스트 페이지가 완성되면 이 위치에서 해당 경로로 이동합니다.
    // navigate('/lounge/questions')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return

    handleRegistrationComplete()
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-white text-[#0d0d0d]">
      <QuestionWriteHeader />

      <form
        id={FORM_ID}
        className="flex flex-col gap-7 px-5 pt-4 pb-8"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2.5 text-sm font-bold tracking-[-0.03em]">
          제목
          <input
            type="text"
            value={title}
            maxLength={50}
            placeholder="어떤 점이 궁금하신가요?"
            className="h-11 rounded-[10px] border border-[#d9d9d9] bg-white px-4 text-sm font-normal tracking-[-0.02em] outline-none placeholder:text-[#737373] focus:border-[#831317]"
            onChange={(event) => {
              setTitle(event.target.value)
              setIsComplete(false)
            }}
          />
        </label>

        <label className="flex flex-col gap-2.5 text-sm font-bold tracking-[-0.03em]">
          질문 내용
          <textarea
            value={content}
            maxLength={1000}
            placeholder="와인 종류, 빈티지, 테이스팅 노트 등 궁금한 내용을 상세히 적어주세요. (최소 10자)"
            className="h-42.5 resize-none rounded-[10px] border border-[#d9d9d9] bg-white px-4 py-3.75 text-sm leading-[1.55] font-normal tracking-[-0.02em] outline-none placeholder:text-[#737373] focus:border-[#831317]"
            onChange={(event) => {
              setContent(event.target.value)
              setIsComplete(false)
            }}
          />
        </label>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-sm font-bold tracking-[-0.03em]">사진 첨부 (최대 3장)</h2>
          <ImageUploader />
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="text-sm font-bold tracking-[-0.03em]">태그 설정</h2>
          <TagSelector tags={TAGS} selectedTags={selectedTags} onToggle={toggleTag} />
        </section>

        <button
          type="submit"
          disabled={!canSubmit}
          className="flex h-12.5 w-full items-center justify-center rounded-[12px] bg-[#831317] text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          질문 등록
        </button>

        {isComplete && (
          <p role="status" className="text-center text-sm font-medium text-[#831317]">
            질문이 등록되었습니다.
          </p>
        )}
      </form>
    </div>
  )
}

export default QuestionWrite
