import { useEffect } from 'react'

const DEFAULT_THEME_COLOR = '#831317'

// 상태표시줄이 항상 와인색으로 고정되어 있으면 화면 배경과 어긋나 보인다.
// 현재 페이지의 실제 배경색(흰/검)에 맞춰 상태표시줄 색을 같이 바꿔
// 상단 바 아래로 페이지가 자연스럽게 이어져 보이게 한다.
export function useSyncThemeColor(color: string) {
  // 색이 바뀔 때마다 적용한다. cleanup을 여기 두면 color가 바뀔 때마다
  // (같은 컴포넌트가 계속 마운트된 채로 페이지만 바뀌는 경우에도) React가
  // "이전 effect 정리 → 새 effect 실행" 순서로 처리하면서 매번 잠깐
  // DEFAULT_THEME_COLOR를 거쳐가고, 모바일 브라우저가 그 순간의 색을
  // 상태표시줄 전환 애니메이션으로 잡아 화면 위쪽에 색이 번쩍이는 원인이 된다.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return

    meta.setAttribute('content', color)
  }, [color])

  // 이 컴포넌트가 완전히 언마운트될 때만(의존성 배열이 비어 있으므로) 기본값으로 되돌린다.
  useEffect(() => {
    return () => {
      const meta = document.querySelector('meta[name="theme-color"]')
      if (!meta) return

      meta.setAttribute('content', DEFAULT_THEME_COLOR)
    }
  }, [])
}
