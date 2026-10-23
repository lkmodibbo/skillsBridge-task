import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux'

export const PublicRoute = () => {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
