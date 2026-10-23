import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import type { ApiResponse, PaginatedResponse } from '@/types/api'
import type { Course } from '@/types/course'

export interface CourseFilters {
  page?: number
  limit?: number
  category?: string
  level?: string
  search?: string
}

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery,
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourses: builder.query<PaginatedResponse<Course>, CourseFilters | void>({
      query: (filters) => ({ url: '/courses', params: filters ?? {} }),
      providesTags: ['Course'],
    }),
    getCourse: builder.query<ApiResponse<Course>, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
    enrollCourse: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/courses/${id}/enroll`, method: 'POST' }),
      invalidatesTags: ['Course'],
    }),
  }),
})

export const { useGetCoursesQuery, useGetCourseQuery, useEnrollCourseMutation } = coursesApi
