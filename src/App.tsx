import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import List from './pages/List'
import Meetings from './pages/Meetings'
import QnA from './pages/QnA'
import MeetingCreate from './pages/MeetingCreate'
import QuestionWrite from './pages/QuestionWrite'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lounge/questions/new" element={<QuestionWrite />} />
        <Route path="/lounge/meetings/new" element={<MeetingCreate />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lounge" element={<List />} />
          <Route path="/lounge/qna" element={<QnA />} />
          <Route path="/lounge/meetings" element={<Meetings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
