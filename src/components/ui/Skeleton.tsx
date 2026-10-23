import { cn } from '@/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) => (
  <div
    className={cn(
      'animate-pulse bg-gray-200 dark:bg-gray-700',
      variant === 'circular' && 'rounded-full',
      variant === 'text' && 'rounded h-4',
      variant === 'rectangular' && 'rounded-lg',
      className,
    )}
    style={{ width, height, ...style }}
    aria-hidden="true"
    {...props}
  />
)

export const CardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
    <Skeleton height={180} className="mb-4" />
    <Skeleton variant="text" className="mb-2 w-3/4" />
    <Skeleton variant="text" className="mb-4 w-1/2" />
    <div className="flex gap-2">
      <Skeleton variant="text" className="w-16" />
      <Skeleton variant="text" className="w-16" />
    </div>
  </div>
)
