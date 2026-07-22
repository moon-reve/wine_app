import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import meetingCover from '../assets/lounge/figma/meeting-create-cover.png'
import BottomNav from '../components/BottomNav'
import CoverImageUploader from '../components/meeting/CoverImageUploader'
import MeetingCreateHeader from '../components/meeting/MeetingCreateHeader'
import MeetingTagEditor from '../components/meeting/MeetingTagEditor'
import TimeWheelPicker from '../components/meeting/TimeWheelPicker'
import AppBottomSheet from '../components/AppBottomSheet'

const FORM_ID = 'meeting-create-form'
function formatMeetingTime(value: string) {
  const [hourText, minute = '00'] = value.split(':')
  const hour24 = Number(hourText)
  const period = hour24 >= 12 ? '오후' : '오전'
  const hour = hour24 % 12 || 12
  return `${period} ${String(hour).padStart(2, '0')}:${minute}`
}

const SUGGESTED_TAGS = ['보르도', '빈티지', '희귀와인'] as const

function MeetingCreate() {
  const navigate = useNavigate()
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [fee, setFee] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>(['보르도'])
  const [isComplete, setIsComplete] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [timePickerTarget, setTimePickerTarget] = useState<'start' | 'end' | null>(null)

  const canSubmit =
    title.trim().length > 0 &&
    date.length > 0 &&
    startTime.length > 0 &&
    endTime.length > 0 &&
    location.trim().length > 0 &&
    Number(maxParticipants) > 0 &&
    fee.length > 0 &&
    Number(fee) >= 0 &&
    description.trim().length > 0

  useEffect(() => {
    if (!isComplete) return

    const redirectTimer = window.setTimeout(() => {
      navigate('/lounge/meetings')
    }, 1200)

    return () => window.clearTimeout(redirectTimer)
  }, [isComplete, navigate])

  const handleRegistrationComplete = () => {
    setIsComplete(true)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    setIsConfirmOpen(true)

    // coverImage와 폼 상태는 향후 API 연동 시 등록 데이터로 전달합니다.
  }

  const resetCompleteState = () => setIsComplete(false)
  const inputClassName =
    'h-12 w-full rounded-[10px] border border-[#d6d6d6] bg-white px-3.75 text-[13px] text-[#121212] outline-none placeholder:text-[#949494] focus:border-[#851317]'

  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-white pb-28 text-[#121212]">
      <MeetingCreateHeader />

      <main className="px-5 pt-2.5">
        <h2 className="font-playfair-display text-[29px] leading-normal font-bold text-[#851317]">
          Make a Meeting
        </h2>
        <p className="mt-0.5 text-[13px]">취향이 통하는 와인 모임을 직접 열어보세요.</p>

        <form id={FORM_ID} className="mt-4 flex flex-col gap-3" noValidate onSubmit={handleSubmit}>
          <section className="flex flex-col gap-1.5 text-xs font-bold">
            <h3>커버 이미지</h3>
            <CoverImageUploader
              defaultImage={meetingCover}
              onChange={(file) => {
                setCoverImage(file)
                resetCompleteState()
              }}
            />
          </section>

          <label className="mt-5 flex flex-col gap-2 text-xs font-bold">
            모임 제목
            <input
              value={title}
              maxLength={60}
              className={inputClassName}
              placeholder="어떤 모임을 만들까요?"
              onChange={(event) => {
                setTitle(event.target.value)
                resetCompleteState()
              }}
            />
          </label>

          <div className="grid grid-cols-2 gap-5">
            <label className="flex min-w-0 flex-col gap-2 text-xs font-bold">
              날짜
              <input
                type="date"
                value={date}
                className={inputClassName}
                onChange={(event) => {
                  setDate(event.target.value)
                  resetCompleteState()
                }}
              />
            </label>

            <fieldset className="flex min-w-0 flex-col gap-2">
              <legend className="text-xs font-bold">시간</legend>
              <div className="mt-2 flex h-12 items-center rounded-[10px] border border-[#d6d6d6] px-2 focus-within:border-[#851317]">
                <button
                  type="button"
                  aria-label="시작 시간 선택"
                  onClick={() => setTimePickerTarget('start')}
                  className={`min-w-0 flex-1 truncate text-[12px] ${startTime ? 'text-[#121212]' : 'text-[#949494]'}`}
                >
                  {startTime ? formatMeetingTime(startTime) : '시작'}
                </button>
                <span className="px-1 text-[#949494]">–</span>
                <button
                  type="button"
                  aria-label="종료 시간 선택"
                  onClick={() => setTimePickerTarget('end')}
                  className={`min-w-0 flex-1 truncate text-[12px] ${endTime ? 'text-[#121212]' : 'text-[#949494]'}`}
                >
                  {endTime ? formatMeetingTime(endTime) : '종료'}
                </button>
              </div>
            </fieldset>
          </div>

          <label className="flex flex-col gap-2 text-xs font-bold">
            장소
            <input
              value={location}
              className={inputClassName}
              placeholder="장소를 검색하거나 직접 입력하세요"
              onChange={(event) => {
                setLocation(event.target.value)
                resetCompleteState()
              }}
            />
          </label>

          <div className="grid grid-cols-2 gap-5">
            <label className="flex min-w-0 flex-col gap-2 text-xs font-bold">
              모집 인원
              <input
                type="number"
                min="1"
                value={maxParticipants}
                className={inputClassName}
                placeholder="최대 10명"
                onChange={(event) => {
                  setMaxParticipants(event.target.value)
                  resetCompleteState()
                }}
              />
            </label>

            <label className="flex min-w-0 flex-col gap-2 text-xs font-bold">
              참가비
              <input
                type="number"
                min="0"
                value={fee}
                className={inputClassName}
                placeholder="₩ 55,000"
                onChange={(event) => {
                  setFee(event.target.value)
                  resetCompleteState()
                }}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-xs font-bold">
            모임 소개
            <textarea
              value={description}
              maxLength={1200}
              className="h-36.5 resize-none rounded-[10px] border border-[#d6d6d6] bg-white px-3.75 py-4 text-[13px] leading-normal font-normal text-[#121212] outline-none placeholder:text-[#949494] focus:border-[#851317]"
              placeholder="테이스팅 주제, 제공 와인, 준비물과 진행 방식을 상세히 알려주세요."
              onChange={(event) => {
                setDescription(event.target.value)
                resetCompleteState()
              }}
            />
          </label>

          <section className="mt-1 flex flex-col gap-2.5">
            <h3 className="text-xs font-bold">태그 설정</h3>
            <MeetingTagEditor selectedTags={tags} suggestedTags={SUGGESTED_TAGS} onChange={setTags} />
          </section>

          <aside className="mt-3 rounded-[12px] bg-[#f9f7f7] px-4 py-3.75">
            <h3 className="text-xs font-bold text-[#851317]">호스트 안내</h3>
            <p className="mt-2 text-xs text-[#6e6e6e]">일정과 장소가 확정되었는지 한 번 더 확인해 주세요.</p>
          </aside>

          <button
            type="submit"
            disabled={!canSubmit || isComplete}
            className="mt-4 h-14 w-full rounded-[12px] bg-[#851317] text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            모임 등록
          </button>

          {isComplete && (
            <p role="status" className="text-center text-sm font-medium text-[#851317]">
              모임이 등록되었습니다.
            </p>
          )}

          <p className="text-center text-xs text-[#6e6e6e]">
            등록 후에도 모임 정보와 모집 상태를 수정할 수 있습니다.
          </p>
        </form>
      </main>

      <BottomNav activeItem="라운지" />
      <TimeWheelPicker
        open={timePickerTarget !== null}
        title={timePickerTarget === 'end' ? '종료 시간 선택' : '시작 시간 선택'}
        value={timePickerTarget === 'end' ? endTime : startTime}
        onClose={() => setTimePickerTarget(null)}
        onChange={(value) => {
          if (timePickerTarget === 'end') setEndTime(value)
          else setStartTime(value)
          resetCompleteState()
        }}
      />
      <AppBottomSheet
        open={isConfirmOpen}
        title="모임을 등록하시겠습니까?"
        message="입력한 일정과 장소를 한 번 더 확인해 주세요."
        confirmLabel="등록"
        cancelLabel="취소"
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false)
          void coverImage
          handleRegistrationComplete()
        }}
      />
    </div>
  )
}

export default MeetingCreate
