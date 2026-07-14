import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import Mypage from './pages/Mypage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lounge/questions/new" element={<QuestionWrite />} />
        <Route path="/lounge/meetings/new" element={<MeetingCreate />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/lounge" element={<Feed />} />
          <Route path="/lounge/qna" element={<QnA />} />
          <Route path="/lounge/meetings" element={<Meetings />} />
          <Route path="/mypage" element={<Mypage />} />
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
