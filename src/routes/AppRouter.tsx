import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { Skeleton } from '@/components/ui/Skeleton'

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'))
const CoursesPage = lazy(() => import('@/pages/CoursesPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))
const OtpPage = lazy(() => import('@/pages/OtpPage'))
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'))

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Skeleton height={400} className="w-full max-w-2xl" />
  </div>
)

export const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />

        {/* Auth-only public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Route>

      {/* Protected dashboard routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)
