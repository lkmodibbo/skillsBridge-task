import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { TopBar } from './TopBar'

export const MainLayout = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900">
    <TopBar />
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
)
