import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'
import profilePhoto from '../assets/mypage/figma-profile-photo.png'
import backIcon from '../assets/mypage/profile-back.svg'
import selectArrowIcon from '../assets/mypage/profile-select-arrow.svg'
import toggleKnobIcon from '../assets/mypage/profile-toggle-knob.svg'

const STORAGE_KEY = 'wine-app-profile-settings'

function ProfileSettings() {
  const navigate = useNavigate()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState('Sora Choi')
  const [styles, setStyles] = useState('#레드와인  #소비뇽  #과일안주러버')
  const [bio, setBio] = useState('“Good wine, Good mood”')
  const [region, setRegion] = useState('서울특별시 강남구')
  const [isPublic, setIsPublic] = useState(true)
  const [image, setImage] = useState(profilePhoto)

  const handleSave = () => {
    let previous: Record<string, unknown> = {}
    try {
      previous = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, unknown>
    } catch {
      previous = {}
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...previous,
      nickname,
      bio,
      region,
      wineStyles: styles.split(/\s+/).filter(Boolean),
      isPublic,
      visibility: isPublic ? 'public' : 'private',
    }))
    navigate('/mypage')
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setImage(URL.createObjectURL(file))
  }

  const handleNavigation = (label: string) => {
    if (label === '홈') navigate('/home')
    if (label === '리스트') navigate('/list')
    if (label === '라운지') navigate('/lounge')
    if (label === 'MY') navigate('/mypage')
  }

  return (
    <div className="relative mx-auto min-h-[1013px] w-full max-w-[430px] bg-white pb-[120px] text-[#121212]" data-node-id="1546:4956">
      <header className="flex h-14 w-full items-center justify-between px-5" data-node-id="1546:4957">
        <button type="button" aria-label="뒤로가기" onClick={() => navigate(-1)} className="flex size-6 items-center justify-center">
          <img src={backIcon} alt="" className="size-6" aria-hidden="true" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg leading-[normal] font-bold whitespace-nowrap text-[#831317]">프로필 수정</h1>
        <button type="button" onClick={handleSave} className="text-[13px] leading-[normal] font-medium whitespace-nowrap text-black/60">저장</button>
      </header>

      <main className="px-5">
        <section className="mt-[26px]">
          <h2 className="font-playfair-display text-[32px] leading-[normal] font-normal whitespace-nowrap text-[#851317]">Profile Settings</h2>
          <p className="mt-[5px] text-sm leading-[normal] font-normal tracking-[-0.28px] whitespace-nowrap">나를 표현하는 프로필과 와인 취향을 관리하세요.</p>
        </section>

        <section className="mt-[31px] flex flex-col items-center">
          <div className="relative h-[99px] w-[97px] overflow-hidden rounded-[50px]" data-node-id="1546:5037">
            <img src={image} alt="프로필 사진" className="absolute top-[0.47%] left-[-6.93%] h-[146.46%] w-[119.59%] max-w-none" />
          </div>
          <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          <button type="button" onClick={() => photoInputRef.current?.click()} className="mt-3 text-xs leading-[normal] font-medium tracking-[-0.24px] text-[#851317]">프로필 사진 변경</button>
        </section>

        <div className="mt-[56px] flex flex-col gap-[26px]">
          <div className="flex flex-col gap-5">
            <Field label="닉네임">
              <div className="relative h-[50px] rounded-[10px] border border-[#d6d6d6] bg-white">
                <input value={nickname} maxLength={20} onChange={(event) => setNickname(event.target.value)} className="h-full w-full rounded-[10px] bg-transparent px-4 pr-16 text-base leading-[normal] font-bold tracking-[-0.32px] outline-none" />
                <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs leading-[normal] tracking-[-0.24px] text-[#949494]">10/20</span>
              </div>
            </Field>

            <Field label="관심 스타일">
              <div className="relative h-[50px] rounded-[10px] border border-[#d6d6d6] bg-white">
                <input value={styles} maxLength={40} onChange={(event) => setStyles(event.target.value)} className="h-full w-full rounded-[10px] bg-transparent px-[15px] pr-16 text-xs leading-[normal] font-normal tracking-[-0.24px] text-black/20 outline-none" />
                <span className="absolute top-1/2 right-[15px] -translate-y-1/2 text-xs leading-[normal] tracking-[-0.24px] text-[#949494]">{styles.length}/40</span>
              </div>
            </Field>

            <Field label="한 줄 소개">
              <div className="relative h-[82px] rounded-[10px] border border-[#d6d6d6] bg-white">
                <textarea value={bio} maxLength={40} onChange={(event) => setBio(event.target.value)} className="h-full w-full resize-none rounded-[10px] bg-transparent p-[15px] pr-16 text-sm leading-[normal] font-normal tracking-[-0.28px] text-black outline-none" />
                <span className="absolute right-[15px] bottom-[15px] text-xs leading-[normal] tracking-[-0.24px] text-[#949494]">{bio.length}/40</span>
              </div>
            </Field>

            <Field label="지역">
              <button type="button" onClick={() => setRegion((current) => current === '서울특별시 강남구' ? '서울특별시 성동구' : '서울특별시 강남구')} className="relative flex h-[50px] w-full items-center rounded-[10px] border border-[#d6d6d6] bg-white px-[15px] text-left text-sm leading-[normal] tracking-[-0.28px]">
                {region}
                <img src={selectArrowIcon} alt="" className="absolute top-[13px] right-[15px] size-6" aria-hidden="true" />
              </button>
            </Field>
          </div>

          <section className="flex flex-col gap-[10px]">
            <h3 className="text-xs leading-[normal] font-bold tracking-[-0.24px]">공개 설정</h3>
            <div className="flex h-[82px] items-center justify-between rounded-xl bg-[#f9f7f7] px-4">
              <div className="flex flex-col gap-2">
                <strong className="text-[13px] leading-[normal] font-bold tracking-[-0.26px]">내 프로필 공개</strong>
                <p className="text-xs leading-[normal] font-normal tracking-[-0.24px] text-[#6e6e6e]">다른 사용자가 내 프로필과 기록을 볼 수 있습니다.</p>
              </div>
              <button type="button" role="switch" aria-checked={isPublic} onClick={() => setIsPublic((value) => !value)} className={`relative h-7 w-12 shrink-0 rounded-[14px] ${isPublic ? 'bg-[#831317]' : 'bg-[#d6d6d6]'}`}>
                <img src={toggleKnobIcon} alt="" className={`absolute top-[3px] size-[22px] transition-[left] ${isPublic ? 'left-[23px]' : 'left-[3px]'}`} aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </main>

      <BottomNav activeItem="홈" onItemClick={handleNavigation} />
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-[10px]">
      <span className="text-sm leading-[normal] font-bold tracking-[-0.28px]">{label}</span>
      {children}
    </label>
  )
}

export default ProfileSettings
