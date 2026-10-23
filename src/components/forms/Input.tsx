import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors',
              'placeholder:text-gray-400',
              'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600',
              leftIcon ? 'pl-10' : undefined,
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
