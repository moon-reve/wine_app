import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MeetingDetail from './pages/MeetingDetail'
import QuestionDetail from './pages/QuestionDetail'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import List from './pages/List'
import Feed from './pages/LoungeFeed'
import Meetings from './pages/Meetings'
import QnA from './pages/QnA'
import MeetingCreate from './pages/MeetingCreate'
import QuestionWrite from './pages/QuestionWrite'
import ProfileSettings from './pages/ProfileSettings'
import MypageSettings from './pages/MypageSettings'
import Mypage from './pages/Mypage'
import MyFeed from './pages/MyFeed'
import FeedEdit from './pages/FeedEdit'
import Search from './pages/Search'
import WineDetailRed from './pages/WineDetailRed'
import WineDetailWhite from './pages/WineDetailWhite'
import WineDetailRose from './pages/WineDetailRose'
import WineDetailSparkling from './pages/WineDetailSparkling'
import Magazine from './pages/Magazine'
import EventDetails from './pages/EventDetails'
import Notification from './pages/Notification'
import TodaysPick from './pages/TodaysPick'
import ChallengeDetails from './pages/ChallengeDetails'
import MagazineDetail from './pages/MagazineDetail'
import Chatbot from './pages/Chatbot'
import CameraFlow from './pages/CameraFlow'
import WineRecord from './pages/WineRecord'
import WineRecordDetail from './pages/WineRecordDetail'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import DesktopGuide from './pages/DesktopGuide'
import { useDesktopViewport } from './hooks/useDesktopViewport'
import { LikedWinesProvider } from './context/LikedWinesContext'
import { WineRecordsProvider } from './context/WineRecordsContext'
import { ProfileProvider } from './context/ProfileContext'
import { FeedLikesProvider } from './context/FeedLikesContext'
import GuideModeBridge from './components/GuideModeBridge'
import PullToRefresh from './components/PullToRefresh'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppRoutes() {
  const location = useLocation()
  const isDesktop = useDesktopViewport()
  const isEmbeddedDesktop = new URLSearchParams(location.search).get('embed') === 'desktop'

  if (isDesktop && !isEmbeddedDesktop) {
    return location.pathname === '/' ? <DesktopGuide /> : <Navigate to="/" replace />
  }

  return (
    <>
      <GuideModeBridge />
      <PullToRefresh />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/guide" element={<Navigate to="/" replace />} />
        <Route path="/lounge/questions/new" element={<QuestionWrite />} />
        <Route path="/lounge/meetings/new" element={<MeetingCreate />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/event/summer-wine-festival" element={<EventDetails />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/todays-pick" element={<TodaysPick />} />
        <Route path="/challenge/continents" element={<ChallengeDetails />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/record" element={<WineRecord />} />
        <Route path="/record/:recordId/edit" element={<WineRecord />} />
        <Route path="/record/:recordId" element={<WineRecordDetail />} />
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
          <Route path="/product/chateau-margaux-2018" element={<WineDetailRed />} />
          <Route path="/product/chardonnay-2019" element={<WineDetailWhite />} />
          <Route path="/product/pasqua-sweet-rose" element={<WineDetailRose />} />
          <Route path="/product/red/:wineId" element={<WineDetailRed />} />
          <Route path="/product/white/:wineId" element={<WineDetailWhite />} />
          <Route path="/product/rose/:wineId" element={<WineDetailRose />} />
          <Route path="/wine_detail/red/:wineId" element={<WineDetailRed />} />
          <Route path="/wine_detail/white/:wineId" element={<WineDetailWhite />} />
          <Route path="/wine_detail/rose/:wineId" element={<WineDetailRose />} />
          <Route path="/wine_detail/sparkling/:wineId" element={<WineDetailSparkling />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
        <Route path="/mypage/feed" element={<MyFeed />} />
        <Route path="/mypage/feed/:feedId/edit" element={<FeedEdit />} />
        <Route path="/question/:questionId" element={<QuestionDetail />} />
        <Route path="/meeting/:meetingId" element={<MeetingDetail />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LikedWinesProvider>
      <WineRecordsProvider>
      <ProfileProvider>
      <FeedLikesProvider>
        <AppRoutes />
      </FeedLikesProvider>
      </ProfileProvider>
      </WineRecordsProvider>
      </LikedWinesProvider>
    </BrowserRouter>
  )
}

export default App
