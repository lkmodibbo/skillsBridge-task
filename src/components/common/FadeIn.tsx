import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const FadeIn = ({ children, delay = 0, className }: FadeInProps) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

interface StaggerProps {
  children: React.ReactNode
  className?: string
}

export const Stagger = ({ children, className }: StaggerProps) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
)
