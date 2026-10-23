// Re-export RTK Query hooks for courses — use these directly in components
export {
  useGetCoursesQuery as useCourses,
  useGetCourseQuery as useCourse,
  useEnrollCourseMutation as useEnrollCourse,
} from '@/store/api/coursesApi'
export type { CourseFilters } from '@/store/api/coursesApi'
