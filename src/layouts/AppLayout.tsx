import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import Header from '../components/Header'

function AppLayout() {
  return (
    <div className="min-h-screen bg-black pb-[68px] text-white">
      <Header />
      <Outlet />
      <BottomNav className="fixed inset-x-0 bottom-0" />
    </div>
  )
}

export default AppLayout
