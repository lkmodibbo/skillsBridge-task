import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const categories = [
  'Photography',
  'App Development',
  'Digital Marketing',
  'Web3 & Blockchain',
  'Interior Design & Decoration',
  'Music Production',
  'Business & Finance',
  'Others',
]

interface ForYouModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (selected: string[]) => void
}

export const ForYouModal = ({ isOpen, onClose, onSave }: ForYouModalProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (cat: string) => {
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const handleSave = () => {
    if (selected.length === 0) return
    onSave(selected)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="for-you-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h2 id="for-you-title" className="text-2xl font-bold text-gray-900">
                For you
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-1">
              Choose the courses that best suit what you are interested in
            </p>
            <p className="text-sm text-gray-500 mb-6">Select at least one.</p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat) => {
                const active = selected.includes(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggle(cat)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-gray-300 bg-white text-gray-800 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Save button */}
            <div className="flex justify-center">
              <button
                onClick={handleSave}
                disabled={selected.length === 0}
                className="rounded-xl bg-amber-400 px-10 py-3 text-sm font-bold text-white hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
