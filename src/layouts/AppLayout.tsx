import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="min-h-screen">
      {/* Header는 이 위치에 연결합니다. */}
      <Outlet />
      {/* BottomNav는 이 위치에 연결합니다. */}
    </div>
  )
}

export default AppLayout
