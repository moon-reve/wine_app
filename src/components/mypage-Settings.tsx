import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import settingsBackIcon from '../assets/mypage/settings-back.svg'
import settingsChevronIcon from '../assets/mypage/settings-chevron.svg'
import settingsAccountIcon from '../assets/mypage/settings-account.svg'
import settingsLockIcon from '../assets/mypage/settings-lock.svg'
import settingsMailIcon from '../assets/mypage/settings-mail.svg'
import settingsWithdrawalIcon from '../assets/mypage/settings-withdrawal.svg'
import settingsBellIcon from '../assets/mypage/settings-bell.svg'
import settingsEmailReadIcon from '../assets/mypage/settings-email-read.svg'
import settingsHeartIcon from '../assets/mypage/settings-heart.svg'
import settingsChatIcon from '../assets/mypage/settings-chat.svg'
import settingsFollowingIcon from '../assets/mypage/settings-following.svg'
import settingsLanguageIcon from '../assets/mypage/settings-language.svg'
import settingsMoonIcon from '../assets/mypage/settings-moon.svg'
import settingsFontIcon from '../assets/mypage/settings-font.svg'
import settingsBlockedIcon from '../assets/mypage/settings-blocked.svg'
import settingsCallIcon from '../assets/mypage/settings-call.svg'
import settingsContractIcon from '../assets/mypage/settings-contract.svg'
import settingsPrivacyIcon from '../assets/mypage/settings-privacy.svg'

type SettingsView = 'main' | 'account' | 'password' | 'email' | 'withdrawal' | 'push' | 'language' | 'theme' | 'font' | 'blocked' | 'support' | 'terms' | 'privacy'
type ThemeMode = '시스템 설정 따름' | '라이트' | '다크'
type NotificationSettings = {
  email: boolean
  like: boolean
  comment: boolean
  following: boolean
  push: Record<'추천 와인' | '이벤트' | '할인' | '공지사항' | 'AI 추천' | '시스템 알림', boolean>
}
type IconName =
  | 'account'
  | 'lock'
  | 'mail'
  | 'emailRead'
  | 'withdrawal'
  | 'bell'
  | 'heart'
  | 'comment'
  | 'following'
  | 'globe'
  | 'moon'
  | 'font'
  | 'blocked'
  | 'phone'
  | 'terms'
  | 'privacy'

function Arrow({ direction = 'right' }: { direction?: 'right' | 'left' }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <path
        d={direction === 'right' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SettingIcon({ name }: { name: IconName }) {
  const icons: Record<IconName, string> = {
    account: settingsAccountIcon,
    lock: settingsLockIcon,
    mail: settingsMailIcon,
    emailRead: settingsEmailReadIcon,
    withdrawal: settingsWithdrawalIcon,
    bell: settingsBellIcon,
    heart: settingsHeartIcon,
    comment: settingsChatIcon,
    following: settingsFollowingIcon,
    globe: settingsLanguageIcon,
    moon: settingsMoonIcon,
    font: settingsFontIcon,
    blocked: settingsBlockedIcon,
    phone: settingsCallIcon,
    terms: settingsContractIcon,
    privacy: settingsPrivacyIcon,
  }

  return <img src={icons[name]} alt="" className="size-6 max-w-none" aria-hidden="true" />
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-[14px] transition-colors ${checked ? 'bg-[#a1121a]' : 'bg-[#dfe3ea]'}`}
    >
      <span className={`absolute top-[3px] size-[22px] rounded-full bg-white shadow-sm transition-[left] ${checked ? 'left-[23px]' : 'left-[3px]'}`} />
    </button>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-[10px] text-sm leading-[normal] font-bold text-[#851317]">{children}</h2>
}

function SettingsPanel({ children }: { children: React.ReactNode }) {
  return <div className="settings-panel overflow-hidden rounded-xl bg-[#f9f7f7] px-4 pt-[15px] pb-[17px]">{children}</div>
}

type RowProps = {
  icon: IconName
  label: string
  value?: string
  onClick?: () => void
  toggle?: { checked: boolean; onChange: () => void }
  last?: boolean
}

function SettingsRow({ icon, label, value, onClick, toggle, last = false }: RowProps) {
  const content = (
    <>
      <span className="flex items-center gap-[10px]">
        <span><SettingIcon name={icon} /></span>
        <span className="text-sm leading-[normal] font-medium text-[#121212]">{label}</span>
      </span>
      {toggle ? (
        <Toggle checked={toggle.checked} onChange={toggle.onChange} label={label} />
      ) : (
        <span className="flex items-center gap-[6px] text-[#851317]">
          {value && <span className="text-xs leading-[normal] font-normal">{value}</span>}
          <img src={settingsChevronIcon} alt="" className="size-6 max-w-none" aria-hidden="true" />
        </span>
      )}
    </>
  )

  return (
    <div className={last ? 'h-6' : 'flex h-[57px] flex-col gap-4'}>
      <div className="flex h-6 w-full items-center justify-between">
        {onClick ? <button type="button" onClick={onClick} className="flex size-full items-center justify-between text-left">{content}</button> : content}
      </div>
      {!last && <div className="h-px w-full shrink-0 bg-[#e5e0e0]" />}
    </div>
  )
}

function PageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-center bg-white px-5">
      <button type="button" onClick={onBack} aria-label="뒤로가기" className="absolute left-5 flex size-6 items-center justify-center">
        <img src={settingsBackIcon} alt="" className="size-6" aria-hidden="true" />
      </button>
      <h1 className="text-lg leading-[normal] font-bold text-[#851317]">{title}</h1>
    </header>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[13px] font-bold text-[#29282b]">{label}</span>{children}</label>
}

const inputClass = 'h-[50px] w-full rounded-xl border border-[#dcd7d7] bg-white px-4 text-sm outline-none transition focus:border-[#98151b] focus:ring-2 focus:ring-[#98151b]/10'

function DetailCard({ children }: { children: React.ReactNode }) {
  return <div className="settings-panel rounded-[16px] bg-[#faf8f8] p-5">{children}</div>
}

function AccountInfo({ onBack }: { onBack: () => void }) {
  const [sns, setSns] = useState({ instagram: true, google: false })
  return (
    <>
      <PageHeader title="계정 정보" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Account</h2>
        <p className="mt-1 text-sm text-[#555]">가입 정보와 연결된 계정을 확인하세요.</p>
        <DetailCard>
          <dl className="divide-y divide-[#e5dfdf]">
            {[
              ['이메일', 'wine.sipper@gmail.com'],
              ['전화번호 (선택)', '010-1234-5678'],
              ['가입일', '2026. 07. 01'],
              ['로그인 방식', 'Kakao'],
              ['계정 상태', '정상'],
            ].map(([term, value]) => (
              <div key={term} className="flex min-h-[62px] items-center justify-between gap-4 py-3">
                <dt className="text-sm font-medium text-[#6e6e6e]">{term}</dt>
                <dd className={`text-right text-sm font-semibold ${term === '계정 상태' ? 'text-[#14804a]' : 'text-[#202024]'}`}>{value}</dd>
              </div>
            ))}
          </dl>
        </DetailCard>
        <div className="mt-3 flex gap-2" aria-label="지원 로그인 방식">
          {['Google', 'Apple', 'Kakao'].map((provider) => (
            <span key={provider} className={`flex h-9 flex-1 items-center justify-center rounded-full text-xs font-semibold ${provider === 'Kakao' ? 'bg-[#98151b] text-white' : 'border border-[#ddd6d6] bg-white text-[#6e6e6e]'}`}>
              {provider}{provider === 'Kakao' ? ' · 연결됨' : ''}
            </span>
          ))}
        </div>
        <section className="mt-8">
          <SectionTitle>SNS 연동</SectionTitle>
          <SettingsPanel>
            <SettingsRow icon="account" label="Instagram" toggle={{ checked: sns.instagram, onChange: () => setSns((v) => ({ ...v, instagram: !v.instagram })) }} />
            <SettingsRow icon="globe" label="Google" last toggle={{ checked: sns.google, onChange: () => setSns((v) => ({ ...v, google: !v.google })) }} />
          </SettingsPanel>
        </section>
      </main>
    </>
  )
}

function PasswordChange({ onBack, notify }: { onBack: () => void; notify: (message: string) => void }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const rules = useMemo(() => ({
    english: /[A-Za-z]/.test(next),
    number: /\d/.test(next),
    special: /[^A-Za-z0-9]/.test(next),
    length: next.length >= 8,
  }), [next])
  const valid = current.length > 0 && Object.values(rules).every(Boolean) && next === confirm

  return (
    <>
      <PageHeader title="비밀번호 변경" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Password</h2>
        <p className="mt-1 text-sm text-[#555]">안전한 비밀번호로 계정을 보호하세요.</p>
        <div className="mt-8 space-y-5">
          <Field label="현재 비밀번호"><input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className={inputClass} autoComplete="current-password" /></Field>
          <Field label="새 비밀번호"><input type="password" value={next} onChange={(e) => setNext(e.target.value)} className={inputClass} autoComplete="new-password" /></Field>
          <Field label="새 비밀번호 확인"><input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} autoComplete="new-password" /></Field>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#faf8f8] p-4">
          {[
            ['영문 포함', rules.english], ['숫자 포함', rules.number], ['특수문자 포함', rules.special], ['8자 이상', rules.length],
          ].map(([label, passed]) => <p key={String(label)} className={`text-[13px] ${passed ? 'font-semibold text-[#14804a]' : 'text-[#8d8888]'}`}>✓ {label}</p>)}
        </div>
        {confirm && next !== confirm && <p className="mt-3 text-xs text-[#c0262d]">새 비밀번호가 일치하지 않습니다.</p>}
        <button type="button" disabled={!valid} onClick={() => { notify('비밀번호가 변경되었습니다.'); onBack() }} className="mt-8 h-[52px] w-full rounded-xl bg-[#98151b] text-base font-bold text-white disabled:bg-[#d7bfc0]">변경</button>
      </main>
    </>
  )
}

function EmailChange({ onBack, notify }: { onBack: () => void; notify: (message: string) => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [code, setCode] = useState('')
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const verified = sent && code === '123456'

  return (
    <>
      <PageHeader title="이메일 변경" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Email</h2>
        <p className="mt-1 text-sm text-[#555]">새 이메일을 인증한 뒤 변경할 수 있습니다.</p>
        <div className="mt-8 space-y-5">
          <Field label="현재 이메일"><div className={`${inputClass} flex items-center bg-[#f7f5f5] text-[#777]`}>wine.sipper@gmail.com</div></Field>
          <Field label="새 이메일 입력">
            <div className="flex gap-2">
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSent(false); setCode('') }} className={inputClass} placeholder="example@email.com" autoComplete="email" />
              <button type="button" disabled={!emailValid} onClick={() => { setSent(true); notify('인증번호를 보냈습니다. 테스트 번호는 123456입니다.') }} className="w-[112px] shrink-0 rounded-xl border border-[#98151b] text-[13px] font-bold text-[#98151b] disabled:border-[#d8cece] disabled:text-[#aaa]">인증번호 받기</button>
            </div>
          </Field>
          <Field label="인증번호 입력"><input inputMode="numeric" maxLength={6} value={code} disabled={!sent} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} className={inputClass} placeholder="6자리 입력" /></Field>
        </div>
        {sent && <p className={`mt-3 text-xs ${verified ? 'text-[#14804a]' : 'text-[#777]'}`}>{verified ? '✓ 이메일 인증이 완료되었습니다.' : '테스트 인증번호: 123456'}</p>}
        <button type="button" disabled={!verified} onClick={() => { localStorage.setItem('wine-app-account-email', email); notify('이메일이 변경되었습니다.'); onBack() }} className="mt-8 h-[52px] w-full rounded-xl bg-[#98151b] text-base font-bold text-white disabled:bg-[#d7bfc0]">변경</button>
      </main>
    </>
  )
}

function Withdrawal({ onBack, notify, onComplete }: { onBack: () => void; notify: (message: string) => void; onComplete: () => void }) {
  const [checked, setChecked] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const [confirming, setConfirming] = useState(false)
  const notices = ['작성한 리뷰는 삭제됩니다.', '댓글이 삭제됩니다.', '좋아요가 삭제됩니다.', '북마크가 삭제됩니다.', '팔로워 정보가 삭제됩니다.']
  const canWithdraw = checked && confirmationText.trim() === '탈퇴하기'

  return (
    <>
      <PageHeader title="계정 탈퇴" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Delete Account</h2>
        <p className="mt-1 text-sm text-[#555]">탈퇴 후에는 계정과 활동 기록을 복구할 수 없습니다.</p>
        <section className="mt-8 rounded-[16px] border border-[#eed9da] bg-[#fff8f8] p-5">
          <h3 className="text-base font-bold text-[#98151b]">탈퇴 전 확인</h3>
          <ul className="mt-4 space-y-4">
            {notices.map((notice) => <li key={notice} className="flex gap-3 text-sm text-[#464246]"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#98151b]" />{notice}</li>)}
          </ul>
        </section>
        <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-[#faf8f8] p-4 text-sm font-medium">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="size-5 accent-[#98151b]" />
          위 내용을 확인했습니다.
        </label>
        <Field label="계속하려면 ‘탈퇴하기’를 입력해 주세요.">
          <input
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            className={`${inputClass} mt-5`}
            placeholder="탈퇴하기"
            autoComplete="off"
          />
        </Field>
        {confirmationText && confirmationText.trim() !== '탈퇴하기' && <p className="mt-2 text-xs text-[#c0262d]">‘탈퇴하기’를 정확히 입력해 주세요.</p>}
        <button type="button" disabled={!canWithdraw} onClick={() => setConfirming(true)} className="mt-8 h-[52px] w-full rounded-xl bg-[#98151b] text-base font-bold text-white disabled:bg-[#d7bfc0]">탈퇴하기</button>
      </main>
      {confirming && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6" role="dialog" aria-modal="true" aria-labelledby="withdraw-title">
          <div className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center shadow-xl">
            <h3 id="withdraw-title" className="text-lg font-bold">정말 탈퇴하시겠습니까?</h3>
            <p className="mt-2 text-sm leading-6 text-[#6e6e6e]">모든 계정 정보와 활동 기록이 삭제됩니다.</p>
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setConfirming(false)} className="h-12 flex-1 rounded-xl bg-[#f1eeee] font-semibold">취소</button>
              <button type="button" onClick={() => { localStorage.removeItem('wine-app-profile-settings'); notify('계정 탈퇴가 완료되었습니다.'); onComplete() }} className="h-12 flex-1 rounded-xl bg-[#98151b] font-semibold text-white">탈퇴</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PushSettings({ values, onChange, onBack }: { values: NotificationSettings['push']; onChange: (values: NotificationSettings['push']) => void; onBack: () => void }) {
  const options = Object.keys(values) as (keyof NotificationSettings['push'])[]

  return (
    <>
      <PageHeader title="푸시 알림" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Push Notifications</h2>
        <p className="mt-1 text-sm text-[#555]">받고 싶은 푸시 알림을 선택하세요.</p>
        <section className="mt-8">
          <SettingsPanel>
            {options.map((option, index) => (
              <div key={option} className={`flex h-[61px] items-center justify-between ${index === options.length - 1 ? '' : 'border-b border-[#e5dfdf]'}`}>
                <span className="flex items-center gap-4">
                  <span className="text-[#202024]"><SettingIcon name="bell" /></span>
                  <span className="text-[15px] font-medium text-[#29282b]">{option}</span>
                </span>
                <Toggle
                  checked={values[option]}
                  onChange={() => onChange({ ...values, [option]: !values[option] })}
                  label={`${option} 푸시 알림`}
                />
              </div>
            ))}
          </SettingsPanel>
        </section>
      </main>
    </>
  )
}

function ChoiceSettings<T extends string>({ title, englishTitle, description, options, value, onChange, onBack }: {
  title: string
  englishTitle: string
  description: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  onBack: () => void
}) {
  return (
    <>
      <PageHeader title={title} onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">{englishTitle}</h2>
        <p className="mt-1 text-sm text-[#555]">{description}</p>
        <section className="mt-8">
          <SettingsPanel>
            {options.map((option, index) => {
              const selected = value === option
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange(option)}
                  className={`flex h-[61px] w-full items-center justify-between ${index === options.length - 1 ? '' : 'border-b border-[#e5dfdf]'}`}
                >
                  <span className="text-[15px] font-medium text-[#29282b]">{option}</span>
                  <span className={`flex size-6 items-center justify-center rounded-full border-2 ${selected ? 'border-[#98151b]' : 'border-[#bbb]'}`}>
                    {selected && <span className="size-3 rounded-full bg-[#98151b]" />}
                  </span>
                </button>
              )
            })}
          </SettingsPanel>
        </section>
      </main>
    </>
  )
}

function BlockedUsers({ onBack, notify }: { onBack: () => void; notify: (message: string) => void }) {
  const [query, setQuery] = useState('')
  const [blockedUsers, setBlockedUsers] = useState(['홍길동', '김와인', '이소믈리에'])
  const userDirectory = ['홍길동', '김와인', '이소믈리에', '박포도', '최샴페인', '정내추럴', '한레드', '윤화이트', '서와인바', '오소믈리에']
  const normalizedQuery = query.trim().toLowerCase()
  const matchedUsers = normalizedQuery
    ? userDirectory.filter((user) => user.toLowerCase().includes(normalizedQuery))
    : []
  const visibleUsers = normalizedQuery
    ? matchedUsers.length > 0 ? matchedUsers : [query.trim()]
    : blockedUsers

  return (
    <>
      <PageHeader title="차단한 사용자" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Blocked Users</h2>
        <p className="mt-1 text-sm text-[#555]">차단한 사용자를 검색하고 차단을 해제할 수 있습니다.</p>
        <label className="relative mt-7 block">
          <span className="sr-only">차단한 사용자 검색</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} className={`${inputClass} pl-11`} placeholder="이름 검색" />
          <svg viewBox="0 0 24 24" className="absolute left-4 top-[13px] size-6 text-[#777]" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </label>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-[#777]">차단 중 {blockedUsers.length}명</span>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="h-9 rounded-lg border border-[#98151b] px-3 text-xs font-bold text-[#98151b]"
          >
            차단한 사용자 목록 전체 보기
          </button>
        </div>
        <section className="mt-5">
          <SettingsPanel>
            {visibleUsers.length > 0 ? visibleUsers.map((user, index) => {
              const isBlocked = blockedUsers.includes(user)
              return (
              <div key={user} className={`flex h-[68px] items-center justify-between ${index === visibleUsers.length - 1 ? '' : 'border-b border-[#e5dfdf]'}`}>
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#eadcdd] text-sm font-bold text-[#98151b]">{user.slice(0, 1)}</span>
                  <span>
                    <span className="block text-[15px] font-semibold text-[#29282b]">{user}</span>
                    {normalizedQuery && <span className={`mt-0.5 block text-[11px] ${isBlocked ? 'text-[#98151b]' : 'text-[#888]'}`}>{isBlocked ? '차단된 사용자' : '검색 결과'}</span>}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (isBlocked) {
                      setBlockedUsers((value) => value.filter((name) => name !== user))
                      notify(`${user}님의 차단을 해제했습니다.`)
                    } else {
                      setBlockedUsers((value) => [...value, user])
                      notify(`${user}님을 차단했습니다.`)
                    }
                  }}
                  className={`h-9 rounded-lg px-3 text-xs font-bold ${isBlocked ? 'border border-[#98151b] text-[#98151b]' : 'bg-[#98151b] text-white'}`}
                >
                  {isBlocked ? '차단 해제' : '차단하기'}
                </button>
              </div>
            )}) : <p className="py-10 text-center text-sm text-[#777]">검색 결과가 없습니다.</p>}
          </SettingsPanel>
        </section>
      </main>
    </>
  )
}

function SupportCenter({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('')
  const items = [
    {
      title: 'FAQ',
      intro: '자주 묻는 질문을 빠르게 확인해 보세요.',
      details: [
        '1. 비밀번호를 잊었어요. — 로그인 화면의 비밀번호 찾기에서 본인 인증 후 재설정할 수 있습니다.',
        '2. 프로필 정보는 어디서 수정하나요? — MY의 프로필 설정에서 닉네임, 소개, 사진과 와인 취향을 수정할 수 있습니다.',
        '3. 이메일 주소를 변경하고 싶어요. — 설정의 이메일 변경에서 새 이메일 인증 후 변경할 수 있습니다.',
        '4. 알림을 끄고 싶어요. — 설정의 알림 메뉴에서 이메일, 좋아요, 댓글, 팔로잉 알림을 각각 끌 수 있습니다.',
        '5. 원하는 와인을 어떻게 찾나요? — 리스트 화면의 검색창에 와인명, 생산자 또는 품종을 입력해 검색할 수 있습니다.',
        '6. 추천 와인은 어떤 기준으로 나오나요? — 저장한 취향, 선호 스타일, 가격대와 활동 기록을 바탕으로 추천합니다.',
        '7. 관심 있는 와인을 저장하고 싶어요. — 와인 상세 화면의 좋아요 또는 북마크 버튼으로 저장할 수 있습니다.',
        '8. 부적절한 게시물이나 사용자를 신고하고 싶어요. — 해당 게시물 또는 프로필의 더보기 메뉴에서 신고할 수 있습니다.',
        '9. 차단한 사용자를 다시 해제할 수 있나요? — 설정의 차단한 사용자 화면에서 검색 후 차단 해제를 누르면 됩니다.',
        '10. 계정을 탈퇴하면 기록은 어떻게 되나요? — 리뷰, 댓글, 좋아요, 북마크와 팔로워 정보가 삭제되며 복구할 수 없습니다.',
      ],
    },
    {
      title: '문의하기',
      intro: '서비스 이용과 계정에 관한 문의를 남겨 주세요.',
      details: [
        '문의 유형: 계정, 프로필, 와인 정보, 커뮤니티, 결제 및 기타',
        '문의 내용과 함께 문제가 발생한 화면을 알려 주시면 더 빠르게 확인할 수 있습니다.',
        '접수된 문의는 영업일 기준 1–2일 이내에 답변드립니다.',
      ],
      kakao: true,
    },
    {
      title: '버그 신고',
      intro: '오류를 발견했다면 아래 정보를 함께 보내 주세요.',
      details: [
        '사용 중인 기기와 운영체제 버전',
        '문제가 발생한 화면과 실행한 순서',
        '오류 화면 캡처 또는 동영상',
        '같은 문제가 반복되는지 여부',
      ],
    },
    {
      title: '의견 보내기',
      intro: 'Wine Sippers에 추가되었으면 하는 기능이나 개선 의견을 알려 주세요.',
      details: [
        '원하는 와인 추천 또는 검색 기능',
        '커뮤니티와 모임 기능 개선 의견',
        '사용하면서 불편했던 화면이나 동작',
        '새롭게 보고 싶은 콘텐츠와 서비스',
      ],
    },
    {
      title: '운영시간',
      intro: '고객센터 운영시간을 안내합니다.',
      details: [
        '평일: 오전 10:00–오후 6:00',
        '점심시간: 오후 12:30–1:30',
        '토요일, 일요일 및 공휴일: 휴무',
        '운영시간 외 문의는 다음 영업일에 순서대로 답변드립니다.',
      ],
    },
    {
      title: '이메일 문의',
      intro: '이메일로 자세한 문의 내용을 보내 주세요.',
      details: ['수신 주소: help@winesippers.kr', '문의 제목과 답변받을 이메일 주소를 함께 적어 주세요.'],
      email: true,
    },
  ] as const

  return (
    <>
      <PageHeader title="고객센터" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Help Center</h2>
        <p className="mt-1 text-sm text-[#555]">도움이 필요한 항목을 선택하세요.</p>
        <section className="mt-8">
          <SettingsPanel>
            {items.map((item, index) => (
              <div key={item.title} className={index === items.length - 1 ? '' : 'border-b border-[#e5dfdf]'}>
                <button type="button" onClick={() => setSelected((value) => value === item.title ? '' : item.title)} className="flex h-[61px] w-full items-center justify-between text-left">
                  <span className="text-[15px] font-medium text-[#29282b]">{item.title}</span>
                  <span className={`text-[#98151b] transition-transform ${selected === item.title ? 'rotate-90' : ''}`}><Arrow /></span>
                </button>
                {selected === item.title && (
                  <div className="pb-6 pr-3">
                    <p className="-mt-1 text-sm leading-6 text-[#666]">{item.intro}</p>
                    <ul className="mt-4 space-y-3">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-2.5 text-sm leading-6 text-[#666]">
                          <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#98151b]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    {'email' in item && item.email && (
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=help%40winesippers.kr&su=Wine%20Sippers%20%EB%AC%B8%EC%9D%98"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-[#98151b] text-sm font-bold text-white"
                      >
                        Gmail로 이메일 보내기
                      </a>
                    )}
                    {'kakao' in item && item.kakao && (
                      <a
                        href="https://pf.kakao.com/?lang=ko"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-[#fee500] text-sm font-bold text-[#191919]"
                      >
                        카카오톡 채널로 문의하기
                      </a>
                    )}
                    <p className="mt-4 text-[11px] text-[#999]">※ 화면 확인을 위한 예시 내용입니다.</p>
                  </div>
                )}
              </div>
            ))}
          </SettingsPanel>
        </section>
      </main>
    </>
  )
}

function TermsPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('')
  const terms = [
    {
      title: '서비스 이용약관',
      intro: 'Wine Sippers의 서비스 이용 조건과 회원의 권리·의무를 안내합니다.',
      details: [
        '회원은 정확한 정보를 사용하여 계정을 생성하고 자신의 계정을 안전하게 관리해야 합니다.',
        '다른 사용자의 권리를 침해하거나 서비스 운영을 방해하는 행위는 제한될 수 있습니다.',
        '서비스 기능은 운영상 필요에 따라 변경될 수 있으며 중요한 변경은 사전에 안내합니다.',
        '약관을 위반한 계정은 경고, 이용 제한 또는 탈퇴 조치가 적용될 수 있습니다.',
      ],
    },
    {
      title: '커뮤니티 운영정책',
      intro: '모두가 편안하게 와인 경험을 공유할 수 있도록 다음 기준을 적용합니다.',
      details: [
        '욕설, 혐오 표현, 괴롭힘, 위협 또는 타인을 모욕하는 게시물은 허용되지 않습니다.',
        '타인의 사진과 개인정보를 동의 없이 게시하지 않아야 합니다.',
        '반복적인 광고, 도배, 허위 정보 및 상업적 홍보 게시물은 삭제될 수 있습니다.',
        '정책 위반 콘텐츠는 신고할 수 있으며 검토 결과에 따라 콘텐츠 삭제 또는 계정 제한이 진행됩니다.',
      ],
    },
    {
      title: '위치정보 이용약관',
      intro: '사용자가 동의한 경우 주변 와인바와 지역 기반 정보를 제공하기 위해 위치정보를 이용합니다.',
      details: [
        '위치정보 제공은 선택 사항이며 기기 설정에서 언제든 허용 또는 해제할 수 있습니다.',
        '현재 위치는 주변 장소 검색과 지역 맞춤 추천 목적으로만 사용합니다.',
        '사용자의 동의 없이 위치정보를 제3자에게 제공하지 않습니다.',
        '위치정보 이용 기록은 관련 법령과 내부 정책에 따라 필요한 기간 동안만 보관합니다.',
      ],
    },
    {
      title: '청소년 보호정책',
      intro: '청소년을 유해한 정보와 부적절한 주류 관련 활동으로부터 보호하기 위한 정책입니다.',
      details: [
        '주류 구매 또는 음주를 권유하는 기능은 법정 연령 확인이 필요한 사용자에게만 제공됩니다.',
        '청소년에게 부적절한 콘텐츠는 노출을 제한하거나 별도의 안내를 표시할 수 있습니다.',
        '청소년 대상 불법 판매, 구매 대행 또는 음주 조장 콘텐츠는 즉시 삭제됩니다.',
        '유해 콘텐츠 신고는 고객센터에서 접수하며 확인 후 신속하게 조치합니다.',
      ],
    },
  ] as const
  return (
    <>
      <PageHeader title="이용약관" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Terms</h2>
        <p className="mt-1 text-sm text-[#555]">서비스 이용에 필요한 정책을 확인하세요.</p>
        <section className="mt-8">
          <SettingsPanel>
            {terms.map((term, index) => (
              <div key={term.title} className={index === terms.length - 1 ? '' : 'border-b border-[#e5dfdf]'}>
                <button type="button" onClick={() => setSelected((value) => value === term.title ? '' : term.title)} className="flex h-[61px] w-full items-center justify-between text-left">
                  <span className="text-[15px] font-medium text-[#29282b]">{term.title}</span>
                  <span className={`text-[#98151b] transition-transform ${selected === term.title ? 'rotate-90' : ''}`}><Arrow /></span>
                </button>
                {selected === term.title && (
                  <div className="pb-6 pr-3">
                    <p className="-mt-1 text-sm leading-6 text-[#666]">{term.intro}</p>
                    <ul className="mt-4 space-y-3">
                      {term.details.map((detail) => (
                        <li key={detail} className="flex gap-2.5 text-sm leading-6 text-[#666]">
                          <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#98151b]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[11px] text-[#999]">※ 화면 확인을 위한 예시 내용입니다.</p>
                  </div>
                )}
              </div>
            ))}
          </SettingsPanel>
        </section>
      </main>
    </>
  )
}

function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  const sections = [
    ['1. 수집하는 개인정보', '서비스는 회원가입과 서비스 제공을 위해 이메일, 닉네임, 프로필 정보 및 이용 기록을 수집할 수 있습니다. 선택 정보는 사용자가 직접 입력한 경우에만 처리합니다.'],
    ['2. 개인정보의 이용 목적', '회원 식별, 서비스 제공, 고객 문의 처리, 서비스 품질 개선, 부정 이용 방지 및 맞춤형 와인 추천을 위해 정보를 이용합니다.'],
    ['3. 개인정보의 보유 기간', '회원 탈퇴 시 개인정보를 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 정보는 정해진 기간 동안 안전하게 보관합니다.'],
    ['4. 개인정보의 제3자 제공', '사용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 법령에 근거가 있거나 사용자가 사전에 동의한 경우에는 예외로 합니다.'],
    ['5. 이용자의 권리', '사용자는 언제든 자신의 개인정보를 조회·수정하거나 처리 정지 및 삭제를 요청할 수 있습니다. 설정 또는 고객센터를 통해 요청할 수 있습니다.'],
    ['6. 안전성 확보 조치', '개인정보 접근 권한 관리, 암호화, 접속 기록 보관 등 개인정보 보호를 위한 기술적·관리적 조치를 적용합니다.'],
    ['7. 문의처', '개인정보 관련 문의는 help@winesippers.kr로 보내 주세요. 확인 후 신속하게 답변드리겠습니다.'],
  ] as const
  return (
    <>
      <PageHeader title="개인정보 처리방침" onBack={onBack} />
      <main className="px-5 pb-32 pt-7">
        <h2 className="font-playfair-display text-[30px] font-bold text-[#98151b]">Privacy Policy</h2>
        <p className="mt-2 text-xs font-medium text-[#8b8585]">최종 수정일 2026. 07. 14</p>
        <article className="settings-panel mt-7 max-h-[620px] overflow-y-auto rounded-[16px] bg-[#faf8f8] p-5 [scrollbar-color:#98151b_transparent]">
          <h3 className="text-lg font-bold text-[#202024]">개인정보 처리방침</h3>
          <p className="mt-3 text-sm leading-6 text-[#5e5959]">Wine Sippers는 사용자의 개인정보를 소중히 여기며 관련 법령을 준수합니다.</p>
          <div className="mt-7 space-y-7">
            {sections.map(([title, content]) => <section key={title}><h4 className="text-[15px] font-bold text-[#98151b]">{title}</h4><p className="mt-2 text-sm leading-6 text-[#5e5959]">{content}</p></section>)}
          </div>
        </article>
      </main>
    </>
  )
}

type MainSettingsProps = {
  setView: (view: SettingsView) => void
  onBack: () => void
  notify: (message: string) => void
  notifications: NotificationSettings
  setNotifications: React.Dispatch<React.SetStateAction<NotificationSettings>>
  language: string
  theme: ThemeMode
  fontSize: string
  onLogout: () => void
}

function MainSettings({ setView, onBack, notify, notifications, setNotifications, language, theme, fontSize, onLogout }: MainSettingsProps) {
  const [showLogout, setShowLogout] = useState(false)
  const toggleNotification = (key: 'email' | 'like' | 'comment' | 'following') => setNotifications((value) => ({ ...value, [key]: !value[key] }))

  return (
    <>
      <PageHeader title="설정" onBack={onBack} />
      <main className="px-5 pb-[120px] pt-[26px]">
        <section>
          <h2 className="font-playfair-display text-[32px] leading-[normal] font-normal text-[#851317]">Settings</h2>
          <p className="mt-[5px] text-sm leading-[normal] font-normal text-[#121212]">계정과 알림, 앱 사용 환경을 관리하세요.</p>
        </section>

        <section className="mt-[37px]">
          <SectionTitle>계정</SectionTitle>
          <SettingsPanel>
            <SettingsRow icon="account" label="계정 정보" onClick={() => setView('account')} />
            <SettingsRow icon="lock" label="비밀번호 변경" onClick={() => setView('password')} />
            <SettingsRow icon="mail" label="이메일 변경" onClick={() => setView('email')} />
            <SettingsRow icon="withdrawal" label="계정 탈퇴" onClick={() => setView('withdrawal')} last />
          </SettingsPanel>
        </section>

        <section className="mt-[38px]">
          <SectionTitle>알림</SectionTitle>
          <SettingsPanel>
            <SettingsRow icon="bell" label="푸시 알림" onClick={() => setView('push')} />
            <SettingsRow icon="emailRead" label="이메일 알림" toggle={{ checked: notifications.email, onChange: () => toggleNotification('email') }} />
            <SettingsRow icon="heart" label="좋아요 알림" toggle={{ checked: notifications.like, onChange: () => toggleNotification('like') }} />
            <SettingsRow icon="comment" label="댓글 알림" toggle={{ checked: notifications.comment, onChange: () => toggleNotification('comment') }} />
            <SettingsRow icon="following" label="팔로잉 알림" last toggle={{ checked: notifications.following, onChange: () => toggleNotification('following') }} />
          </SettingsPanel>
        </section>

        <section className="mt-[38px]">
          <SectionTitle>개인 설정</SectionTitle>
          <SettingsPanel>
            <SettingsRow icon="globe" label="언어 설정" value={language} onClick={() => setView('language')} />
            <SettingsRow icon="moon" label="다크 모드" toggle={{ checked: theme === '다크', onChange: () => setView('theme') }} />
            <SettingsRow icon="font" label="글자 크기" value={fontSize} onClick={() => setView('font')} last />
          </SettingsPanel>
        </section>

        <section className="mt-[38px]">
          <SectionTitle>기타</SectionTitle>
          <SettingsPanel>
            <SettingsRow icon="blocked" label="차단한 사용자" onClick={() => setView('blocked')} />
            <SettingsRow icon="phone" label="고객센터" onClick={() => setView('support')} />
            <SettingsRow icon="terms" label="이용약관" onClick={() => setView('terms')} />
            <SettingsRow icon="privacy" label="개인정보 처리방침" onClick={() => setView('privacy')} last />
          </SettingsPanel>
        </section>

        <button type="button" onClick={() => setShowLogout(true)} className="mt-[25px] h-[52px] w-full text-sm leading-[normal] font-medium text-[#828282]">로그아웃</button>
      </main>
      {showLogout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6" role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className="w-full max-w-sm rounded-[20px] bg-white p-6 text-center text-[#202024] shadow-xl">
            <h3 id="logout-title" className="text-lg font-bold">로그아웃 하시겠습니까?</h3>
            <p className="mt-2 text-sm text-[#6e6e6e]">언제든 다시 로그인할 수 있습니다.</p>
            <div className="mt-6 flex gap-2">
              <button type="button" onClick={() => setShowLogout(false)} className="h-12 flex-1 rounded-xl bg-[#f1eeee] font-semibold text-[#29282b]">취소</button>
              <button type="button" onClick={() => { setShowLogout(false); notify('로그아웃되었습니다.'); onLogout() }} className="h-12 flex-1 rounded-xl bg-[#98151b] font-semibold text-white">로그아웃</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function MypageSettings() {
  const navigate = useNavigate()
  const [view, setView] = useState<SettingsView>('main')
  const [toast, setToast] = useState('')
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    like: true,
    comment: true,
    following: false,
    push: { '추천 와인': true, '이벤트': true, '할인': false, '공지사항': true, 'AI 추천': true, '시스템 알림': true },
  })
  const [language, setLanguage] = useState('한국어')
  const [theme, setTheme] = useState<ThemeMode>('라이트')
  const [fontSize, setFontSize] = useState('보통')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const goBack = () => view === 'main' ? navigate(-1) : setView('main')

  const systemIsDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = theme === '다크' || (theme === '시스템 설정 따름' && systemIsDark)

  return (
    <div
      className={`settings-shell min-h-screen w-full bg-white text-[#202024] ${dark ? 'settings-dark' : ''}`}
      data-font-size={fontSize}
      data-node-id={view === 'main' ? '1546:5054' : 'settings-detail'}
    >
      {view === 'main' && <MainSettings setView={setView} onBack={goBack} notify={notify} notifications={notifications} setNotifications={setNotifications} language={language} theme={theme} fontSize={fontSize} onLogout={() => navigate('/')} />}
      {view === 'account' && <AccountInfo onBack={goBack} />}
      {view === 'password' && <PasswordChange onBack={goBack} notify={notify} />}
      {view === 'email' && <EmailChange onBack={goBack} notify={notify} />}
      {view === 'withdrawal' && <Withdrawal onBack={goBack} notify={notify} onComplete={() => navigate('/')} />}
      {view === 'push' && <PushSettings values={notifications.push} onChange={(push) => setNotifications((value) => ({ ...value, push }))} onBack={goBack} />}
      {view === 'language' && <ChoiceSettings title="언어 설정" englishTitle="Language" description="앱에서 사용할 언어를 선택하세요." options={['한국어', 'English', '日本語', '中文'] as const} value={language} onChange={(value) => { setLanguage(value); notify(`${value}(으)로 설정했습니다.`) }} onBack={goBack} />}
      {view === 'theme' && <ChoiceSettings title="다크 모드" englishTitle="Appearance" description="화면에 적용할 테마를 선택하세요." options={['시스템 설정 따름', '라이트', '다크'] as const} value={theme} onChange={(value) => { setTheme(value); notify('화면 테마를 변경했습니다.') }} onBack={goBack} />}
      {view === 'font' && <ChoiceSettings title="글자 크기" englishTitle="Text Size" description="읽기 편한 글자 크기를 선택하세요." options={['아주 작게', '작게', '보통', '크게', '아주 크게', '큰글씨'] as const} value={fontSize} onChange={(value) => { setFontSize(value); notify(`${value}로 설정했습니다.`) }} onBack={goBack} />}
      {view === 'blocked' && <BlockedUsers onBack={goBack} notify={notify} />}
      {view === 'support' && <SupportCenter onBack={goBack} />}
      {view === 'terms' && <TermsPage onBack={goBack} />}
      {view === 'privacy' && <PrivacyPolicy onBack={goBack} />}
      {toast && <div role="status" className="fixed right-5 bottom-28 left-5 z-[120] mx-auto max-w-[390px] rounded-xl bg-[#202024] px-4 py-3 text-center text-sm font-medium text-white shadow-lg">{toast}</div>}
    </div>
  )
}
