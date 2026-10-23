export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  rating: number
  studentsCount: number
  price: number
  isFree: boolean
  tags: string[]
  createdAt: string
}
