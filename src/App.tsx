import { useState } from 'react'

const wines = [
  '프랑스 산뜻한 레드 블렌드',
  '이탈리아 상큼한 소비뇽 블랑',
  '스페인 부드러운 로제',
]

function App() {
  const [recommendation, setRecommendation] = useState('아직 추천이 없습니다.')

  const recommendWine = () => {
    const wine = wines[Math.floor(Math.random() * wines.length)]
    setRecommendation(`오늘의 추천: ${wine}`)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-stone-950 via-rose-950 to-stone-900 px-6 text-white">
      <section className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-amber-300 uppercase">
          Find your taste
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Wine App</h1>
        <p className="mt-4 text-stone-300">오늘의 취향에 어울리는 와인을 만나보세요.</p>
        <button
          type="button"
          className="mt-8 rounded-full bg-amber-300 px-6 py-3 font-bold text-rose-950 transition hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          onClick={recommendWine}
        >
          와인 추천 받기
        </button>
        <p className="mt-6 rounded-2xl bg-white/10 p-4 text-stone-100" aria-live="polite">
          {recommendation}
        </p>
      </section>
    </main>
  )
}

export default App
