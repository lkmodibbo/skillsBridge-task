import { AnimatedPage } from '@/components/common/AnimatedPage'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { Card, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useGetCoursesQuery } from '@/store/api/coursesApi'
import { formatCurrency } from '@/utils/formatters'
import { BookOpen, Star } from 'lucide-react'

const CoursesPage = () => {
  const { data, isLoading, isError } = useGetCoursesQuery()

  return (
    <AnimatedPage>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Courses</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Explore our full catalog of expert-led courses.
        </p>

        {isError && (
          <p className="mt-8 text-center text-red-500">Failed to load courses. Please try again.</p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : data?.data.map((course) => (
                <Card key={course.id} padding="none" className="overflow-hidden">
                  <div className="flex h-44 items-center justify-center bg-indigo-100 dark:bg-indigo-900/30">
                    <BookOpen size={40} className="text-indigo-400" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                      {course.category}
                    </span>
                    <CardTitle className="mt-1 line-clamp-2">{course.title}</CardTitle>
                    <CardContent className="mt-1 line-clamp-2 text-sm">
                      {course.description}
                    </CardContent>
                    <div className="mt-3 flex items-center gap-1 text-sm text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span>{course.rating}</span>
                      <span className="text-gray-400">({course.studentsCount})</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {course.isFree ? 'Free' : formatCurrency(course.price)}
                      </span>
                      <Button size="sm">Enroll</Button>
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </AnimatedPage>
  )
}

export default CoursesPage
