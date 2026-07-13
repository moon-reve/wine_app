import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function AppLayout() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-107.5 bg-black pb-17 text-white">
      <Outlet />
      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-107.5">
        <BottomNav />
      </div>
    </div>
  )
}

export default AppLayout
