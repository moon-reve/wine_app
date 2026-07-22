import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNav, { type QuickAction } from '../components/BottomNav'

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false)
  const isLounge = location.pathname.startsWith('/lounge')
  const isList = location.pathname.startsWith('/list')
  const isMypage = location.pathname.startsWith('/mypage')
  const isSearch = location.pathname.startsWith('/search')
  const isLightPage = isLounge || isList || isMypage || isSearch
  const activeItem = isMypage ? 'MY' : isLounge ? '라운지' : isList ? '리스트' : '홈'

  const handleNavItemClick = (label: string) => {
    setIsQuickMenuOpen(false)
    if (label === '홈') navigate('/')
    if (label === '리스트') navigate('/list')
    if (label === '라운지') navigate('/lounge')
    if (label === 'MY') navigate('/mypage')
  }

  const handleQuickActionClick = (action: QuickAction) => {
    setIsQuickMenuOpen(false)

    if (action === '기록') navigate('/record')
    if (action === '피드') navigate('/feed/create')
    if (action === '찾기') navigate('/wine-search')
  }

  useEffect(() => {
    if (!isQuickMenuOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsQuickMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isQuickMenuOpen])

  return (
    <div className={`mx-auto min-h-screen w-full max-w-107.5 pb-20 ${isLightPage ? 'bg-white text-[#0d0d0d]' : 'bg-black text-white'}`}>
      <Outlet />
      {isQuickMenuOpen ? (
        <button
          type="button"
          aria-label="빠른 메뉴 닫기"
          data-node-id="1599:1232"
          className="fixed inset-y-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-black/30 backdrop-blur-[5px]"
          onClick={() => setIsQuickMenuOpen(false)}
        />
      ) : null}
      <BottomNav
        activeItem={activeItem}
        expanded={isQuickMenuOpen}
        onAddClick={() => setIsQuickMenuOpen((open) => !open)}
        onItemClick={handleNavItemClick}
        onQuickActionClick={handleQuickActionClick}
        onChatbotOpen={() => {
          setIsQuickMenuOpen(false)
          navigate('/chatbot')
        }}
      />
    </div>
  )
}

export default AppLayout
