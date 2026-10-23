import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'

interface AnimatedPageProps {
  children: React.ReactNode
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => (
  <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
)
