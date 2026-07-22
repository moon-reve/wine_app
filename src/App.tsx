import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MeetingDetail from './components/MeetingDetail'
import QuestionDetail from './components/QuestionDetail'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import List from './pages/List'
import Feed from './pages/Lounge Feed'
import Meetings from './pages/Meetings'
import QnA from './pages/QnA'
import MeetingCreate from './pages/MeetingCreate'
import QuestionWrite from './pages/QuestionWrite'
import ProfileSettings from './components/ProfileSettings'
import MypageSettings from './components/mypage-Settings'
import Mypage from './pages/Mypage'
import Search from './pages/Search'
import Product from './pages/Product'
import Magazine from './pages/Magazine'
import Event from './pages/Event'
import Chatbot from './pages/Chatbot'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/lounge/questions/new" element={<QuestionWrite />} />
        <Route path="/lounge/meetings/new" element={<MeetingCreate />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/product/chateau-margaux-2018" element={<Product />} />
        <Route path="/event/summer-wine-festival" element={<Event />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/lounge" element={<Feed />} />
          <Route path="/lounge/qna" element={<QnA />} />
          <Route path="/lounge/meetings" element={<Meetings />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/settings" element={<MypageSettings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/question/:questionId" element={<QuestionDetail />} />
        <Route path="/meeting/:meetingId" element={<MeetingDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
