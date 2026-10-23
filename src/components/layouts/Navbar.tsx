import { Link, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, CircleUserRound, CircleHelp, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { clearCredentials } from '@/store/authSlice'
import { cn } from '@/utils/cn'
import { BrandLogo } from '@/components/common/BrandLogo'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate('/login')
  }

  return (
    <header className="border-b border-gray-800 bg-black">
      <nav className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <BrandLogo size="md" />

        {/* Search bar */}
        <div className="relative hidden flex-1 max-w-xl md:flex">
          <input
            type="search"
            placeholder="What would you like to learn today ?"
            className={cn(
              'w-full rounded-lg border border-gray-600 bg-white py-2 pl-4 pr-12 text-sm text-gray-700',
              'outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100',
              'placeholder:text-gray-400',
            )}
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
            aria-label="Search"
          >
            <Search size={15} strokeWidth={3.5} />
          </button>
        </div>

        {/* Desktop right items */}
        <div className="hidden items-center gap-1 md:flex ml-auto">
          {/* Support dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <CircleHelp size={16} className="text-gray-500" />
              Support
              <ChevronDown size={14} className="text-gray-500" />
            </button>
            <div className="absolute left-0 top-full z-50 mt-1 hidden w-44 rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-lg group-hover:block">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                FAQs
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Account dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <CircleUserRound size={16} className="text-gray-500" />
              Account
              <ChevronDown size={14} className="text-gray-500" />
            </button>
            <div className="absolute right-0 top-full z-50 mt-1 hidden w-40 rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-lg group-hover:block">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Start Learning */}
          <Link
            to="/register"
            className="ml-2 rounded-lg bg-yellow-400 px-5 py-2 text-sm font-semibold text-white hover:bg-yellow-500 transition-colors"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto rounded-lg p-2 text-gray-400 hover:bg-gray-800 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-200 md:hidden',
          menuOpen ? 'max-h-72' : 'max-h-0',
        )}
      >
        <div className="flex flex-col gap-1 border-t border-gray-800 px-4 py-3">
          <div className="relative mb-2">
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full rounded-full border border-gray-600 bg-white py-2 pl-3 pr-10 text-sm text-gray-700 outline-none"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-white">
              <Search size={13} />
            </button>
          </div>
          <Link
            to="/courses"
            className="rounded-lg px-3 py-2 text-white text-gray-300 hover:bg-gray-800"
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/support"
            className="rounded-lg px-3 py-2 text-white text-gray-300 hover:bg-gray-800"
            onClick={() => setMenuOpen(false)}
          >
            Support
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-yellow-600 px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Start Learning
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
