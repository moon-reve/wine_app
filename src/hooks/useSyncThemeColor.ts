import { useEffect } from 'react'

const DEFAULT_THEME_COLOR = '#841317'

// 상태표시줄이 항상 와인색으로 고정되어 있으면 화면 배경과 어긋나 보인다.
// 현재 페이지의 실제 배경색(흰/검)에 맞춰 상태표시줄 색을 같이 바꿔
// 상단 바 아래로 페이지가 자연스럽게 이어져 보이게 한다.
export function useSyncThemeColor(color: string) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) return

    meta.setAttribute('content', color)

    return () => {
      meta.setAttribute('content', DEFAULT_THEME_COLOR)
    }
  }, [color])
}
