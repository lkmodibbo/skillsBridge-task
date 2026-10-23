import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
