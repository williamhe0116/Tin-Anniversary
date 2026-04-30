import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundMusic from './BackgroundMusic'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackgroundMusic />
    </div>
  )
}
