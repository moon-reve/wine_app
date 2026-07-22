import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import FeedDetail from './components/FeedDetail'
import MeetingDetail from './components/MeetingDetail'
import QuestionDetail from './components/QuestionDetail'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import List from './pages/List'
import Feed from './pages/Feed'
import Meetings from './pages/Meetings'
import QnA from './pages/QnA'
import MeetingCreate from './pages/MeetingCreate'
import QuestionWrite from './pages/QuestionWrite'
import ProfileSettings from './components/ProfileSettings'
import MypageSettings from './components/mypage-Settings'
import Mypage from './pages/Mypage'
import Search from './pages/Search'
import WineDetailRed from './pages/Wine Detail_red'
import WineDetailWhite from './pages/Wine Detail_white'
import Magazine from './pages/Magazine'
import EventDetails from './pages/Event Details'
import Notification from './pages/Notification'
import TodaysPick from "./pages/Today'spick"
import ChallengeDetails from './pages/Challenge Details'
import MagazineDetail from './pages/magazine Detail'

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
        <Route path="/product/chateau-margaux-2018" element={<WineDetailRed />} />
        <Route path="/product/chardonnay-2019" element={<WineDetailWhite />} />
        <Route path="/event/summer-wine-festival" element={<EventDetails />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/todays-pick" element={<TodaysPick />} />
        <Route path="/challenge/continents" element={<ChallengeDetails />} />
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
          <Route path="/magazine/k-wine-road" element={<MagazineDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/feed/:feedId" element={<FeedDetail />} />
        <Route path="/question/:questionId" element={<QuestionDetail />} />
        <Route path="/meeting/:meetingId" element={<MeetingDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
