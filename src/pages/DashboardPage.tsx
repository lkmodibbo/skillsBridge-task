import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react'
import { Card, CardTitle, CardContent } from '@/components/ui/Card'
import { AnimatedPage } from '@/components/common/AnimatedPage'
import { Stagger, FadeIn } from '@/components/common/FadeIn'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useAppSelector } from '@/hooks/redux'

const stats = [
  { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-indigo-600' },
  { label: 'Certificates Earned', value: '4', icon: Award, color: 'text-violet-600' },
  { label: 'Hours Learned', value: '86', icon: Clock, color: 'text-emerald-600' },
  { label: 'Streak (days)', value: '7', icon: TrendingUp, color: 'text-amber-600' },
]

const DashboardPage = () => {
  const user = useAppSelector((s) => s.auth.user)

  return (
    <AnimatedPage>
      <FadeIn>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your learning.
        </p>
      </FadeIn>

      <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <motion.div key={label} variants={fadeInUp}>
            <Card className="flex items-center gap-4">
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-700">
                <Icon size={22} className={color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                <CardContent className="text-sm">{label}</CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <FadeIn className="mt-8">
        <Card>
          <CardTitle className="mb-4">Continue Learning</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your enrolled courses will appear here once you connect to the API.
          </p>
        </Card>
      </FadeIn>
    </AnimatedPage>
  )
}

export default DashboardPage
