import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface SortOption {
  label: string
  value: string
}

const locationOptions: SortOption[] = [
  { label: 'Nigeria', value: 'ng' },
  { label: 'USA', value: 'us' },
  { label: 'Ghana', value: 'gh' },
  { label: 'United Kingdom', value: 'uk' },
]

const alphabeticOptions: SortOption[] = [
  { label: 'A - Z', value: 'asc' },
  { label: 'Z - A', value: 'desc' },
]

interface SortDropdownProps {
  isOpen: boolean
  onClose: () => void
  value: string
  onChange: (value: string) => void
}

export const SortDropdown = ({ isOpen, onClose, value, onChange }: SortDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl"
        >
          {/* Location / Proximity */}
          <p className="mb-3 text-sm font-bold text-gray-900">Location / Proximity</p>
          <div className="flex flex-col gap-3 mb-5">
            {locationOptions.map((opt) => (
              <label key={opt.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  className="h-5 w-5 cursor-pointer accent-gray-800"
                />
                <span className="text-sm text-gray-600">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Alphabetic */}
          <p className="mb-3 text-sm font-bold text-gray-900">Alphabetic</p>
          <div className="flex flex-col gap-3">
            {alphabeticOptions.map((opt) => (
              <label key={opt.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  className="h-5 w-5 cursor-pointer accent-gray-800"
                />
                <span className="text-sm text-gray-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
