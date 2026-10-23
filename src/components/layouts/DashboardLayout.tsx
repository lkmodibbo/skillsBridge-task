import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, User, Settings } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Navbar } from './Navbar'
import { TopBar } from './TopBar'

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/courses', label: 'My Courses', icon: BookOpen, end: false },
  { to: '/dashboard/profile', label: 'Profile', icon: User, end: false },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings, end: false },
]

export const DashboardLayout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <TopBar />
    <Navbar />
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  </div>
)
