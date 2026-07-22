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
import WineDetailRed from './pages/Wine Detail_red'
import WineDetailWhite from './pages/Wine Detail_white'
import Magazine from './pages/Magazine'
import EventDetails from './pages/Event Details'
import Notification from './pages/Notification'
import TodaysPick from "./pages/Today'spick"
import ChallengeDetails from './pages/Challenge Details'
import MagazineDetail from './pages/magazine Detail'
import Chatbot from './pages/Chatbot'
import CameraFlow from './pages/CameraFlow'
import WineRecord from './pages/WineRecord'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'

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
        <Route path="/" element={<Splash />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/lounge/questions/new" element={<QuestionWrite />} />
        <Route path="/lounge/meetings/new" element={<MeetingCreate />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/product/chateau-margaux-2018" element={<WineDetailRed />} />
        <Route path="/product/chardonnay-2019" element={<WineDetailWhite />} />
        <Route path="/event/summer-wine-festival" element={<EventDetails />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/todays-pick" element={<TodaysPick />} />
        <Route path="/challenge/continents" element={<ChallengeDetails />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/record" element={<WineRecord />} />
        <Route path="/feed/create" element={<CameraFlow mode="feed" />} />
        <Route path="/wine-search" element={<CameraFlow mode="search" />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/lounge" element={<Feed />} />
          <Route path="/lounge/qna" element={<QnA />} />
          <Route path="/lounge/meetings" element={<Meetings />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/settings" element={<MypageSettings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/k-wine-road" element={<MagazineDetail />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
        <Route path="/question/:questionId" element={<QuestionDetail />} />
        <Route path="/meeting/:meetingId" element={<MeetingDetail />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
