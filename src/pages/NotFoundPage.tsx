import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { AnimatedPage } from '@/components/common/AnimatedPage'

const NotFoundPage = () => (
  <AnimatedPage>
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button className="mt-8">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  </AnimatedPage>
)

export default NotFoundPage
