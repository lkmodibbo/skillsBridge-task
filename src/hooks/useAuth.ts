import { useAppDispatch, useAppSelector } from './redux'
import { setCredentials, clearCredentials } from '@/store/authSlice'
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '@/store/api/authApi'
import type { LoginPayload, RegisterPayload } from '@/store/api/authApi'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((s) => s.auth)

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation()
  const [registerMutation, { isLoading: isRegistering }] = useRegisterMutation()
  const [logoutMutation] = useLogoutMutation()

  const login = async (payload: LoginPayload, onSuccess?: () => void) => {
    const res = await loginMutation(payload).unwrap()
    dispatch(setCredentials({ user: res.data.user, token: res.data.token }))
    onSuccess?.()
  }

  const register = async (payload: RegisterPayload, onSuccess?: () => void) => {
    const res = await registerMutation(payload).unwrap()
    dispatch(setCredentials({ user: res.data.user, token: res.data.token }))
    onSuccess?.()
  }

  const logout = async () => {
    try {
      await logoutMutation().unwrap()
    } finally {
      dispatch(clearCredentials())
    }
  }

  return { user, isAuthenticated, login, register, logout, isLoggingIn, isRegistering }
}

// Re-export for direct RTK Query usage
export { useGetMeQuery } from '@/store/api/authApi'
