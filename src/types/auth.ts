export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'student' | 'instructor' | 'admin'
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
