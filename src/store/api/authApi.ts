import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import type { ApiResponse } from '@/types/api'
import type { User } from '@/types/auth'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthTokenResponse {
  user: User
  token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthTokenResponse>, LoginPayload>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    register: builder.mutation<ApiResponse<AuthTokenResponse>, RegisterPayload>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => '/auth/me',
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetMeQuery } = authApi
