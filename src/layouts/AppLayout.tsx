import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLounge = location.pathname.startsWith('/lounge')
  const isList = location.pathname.startsWith('/list')
  const isMypage = location.pathname.startsWith('/mypage')
  const isSearch = location.pathname.startsWith('/search')
  const isLightPage = isLounge || isList || isMypage || isSearch
  const activeItem = isMypage ? 'MY' : isLounge ? '라운지' : isList ? '리스트' : '홈'

  const handleNavItemClick = (label: string) => {
    if (label === '홈') navigate('/')
    if (label === '리스트') navigate('/list')
    if (label === '라운지') navigate('/lounge')
    if (label === 'MY') navigate('/mypage')
  }

  return (
    <div className={`mx-auto min-h-screen w-full max-w-107.5 pb-17 ${isLightPage ? 'bg-white text-[#0d0d0d]' : 'bg-black text-white'}`}>
      <Outlet />
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-107.5">
        <BottomNav activeItem={activeItem} onItemClick={handleNavItemClick} />
      </div>
    </div>
  )
}

export default AppLayout
