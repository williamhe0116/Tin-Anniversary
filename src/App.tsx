import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import TimelinePage from '@/pages/TimelinePage'
import StoryPage from '@/pages/StoryPage'
import BlessingsPage from '@/pages/BlessingsPage'
import MusicPage from '@/pages/MusicPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="story" element={<StoryPage />} />
          <Route path="blessings" element={<BlessingsPage />} />
          <Route path="music" element={<MusicPage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}

export default App
