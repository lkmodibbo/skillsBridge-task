import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = ({ padding = 'md', className, children, ...props }: CardProps) => (
  <div
    className={cn(
      'rounded-xl border border-gray-200 bg-white shadow-sm',
      'dark:border-gray-700 dark:bg-gray-800',
      paddingClasses[padding],
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
)

export const CardTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)}
    {...props}
  >
    {children}
  </h3>
)

export const CardContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-gray-600 dark:text-gray-400', className)} {...props}>
    {children}
  </div>
)
