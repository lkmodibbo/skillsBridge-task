export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
  courses: {
    list: '/courses',
    detail: (id: string) => `/courses/${id}`,
    enroll: (id: string) => `/courses/${id}/enroll`,
  },
  dashboard: {
    stats: '/dashboard/stats',
    activity: '/dashboard/activity',
  },
  users: {
    profile: '/users/profile',
    update: '/users/profile',
  },
} as const
