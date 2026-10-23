import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Users, Star, SlidersHorizontal } from 'lucide-react'
import { Stagger } from '@/components/common/FadeIn'
import { AnimatedPage } from '@/components/common/AnimatedPage'
import { fadeInUp } from '@/lib/animations'
import heroImg from '@/assets/images/Hero.png'
import whatWeOfferImg from '@/assets/images/whatWeOffer.png'
import { Footer } from '@/components/layouts/Footer'
import { ForYouModal } from '@/components/ui/ForYouModal'
import { SortDropdown } from '@/components/ui/SortDropdown'

// ─── Static data ─────────────────────────────────────────────────────────────

const courseCategories = [
  {
    title: 'Web Development',
    courses: 42,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'App Development',
    courses: 201,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'UI/UX Design',
    courses: 87,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Web3 & Blockchain',
    courses: 42,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Digital Marketing',
    courses: 126,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Photography',
    courses: 94,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Pest Control',
    courses: 31,
    rating: 4.3,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Data Science',
    courses: 67,
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Interior Design & Decoration',
    courses: 39,
    rating: 4.8,
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Music Production',
    courses: 27,
    rating: 4.6,
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Culinary Arts',
    courses: 33,
    rating: 4.4,
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=260&fit=crop&auto=format',
  },
  {
    title: 'Business & Finance',
    courses: 55,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=260&fit=crop&auto=format',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = () => {
  const [forYouOpen, setForYouOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortValue, setSortValue] = useState('asc')

  return (
    <AnimatedPage>
      {/* ── Hero ── */}
      <section className="bg-white pt-14 pb-4 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Headline + subtitle */}
          <div className="text-center max-w-2xl mx-auto">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-2xl font-bold text-gray-900 leading-tight"
            >
              Unlock Your Creative Power with AI-Driven Learning
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-4 text-indigo-600 text-base leading-relaxed text-base"
            >
              Master in-demand skills with expert-led courses in tech, business, design, and more.
              <br />
              Learn at your own pace with personalized AI guidance
            </motion.p>

            {/* App store badges */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-7 flex items-center justify-center gap-3"
            >
              {/* App Store */}
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-white hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-white">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-white hover:bg-gray-800 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6-2.93-2.93L3.18 23.76z"
                    fill="#EA4335"
                  />
                  <path
                    d="M20.82 10.43L17.77 8.7l-3.23 3.23 3.23 3.23 3.08-1.75c.88-.5.88-1.98-.03-2.98z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M3.18.28C2.86.1 2.48.14 2.17.35L14.54 12l2.93-2.93L3.18.28z"
                    fill="#4285F4"
                  />
                  <path
                    d="M2.17.35C1.73.64 1.5 1.1 1.5 1.67v20.66c0 .57.23 1.03.67 1.32l.01.01L14.54 12 2.17.35z"
                    fill="#34A853"
                  />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] text-white">GET IT ON</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <img
              src={heroImg}
              alt="Students learning on SkillBridge"
              className="w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* ── What We Offer image ── */}
      <section className="bg-white py-2 px-4">
        <div className="mx-auto max-w-7xl">
          <img
            src={whatWeOfferImg}
            alt="Expert Instructors, Affordable Pricing, Secure Learning, 24/7 Support"
            className="w-full object-contain"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── Course categories ── */}
      <section className="bg-white py-10 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Tab bar + Sort */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <button className="relative pb-2 text-sm font-semibold text-indigo-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-indigo-500">
                All Courses
              </button>
              <button
                className="pb-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                onClick={() => setForYouOpen(true)}
              >
                For You
              </button>
            </div>
            <div className="relative">
              <button
                className="flex w-75 items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
                onClick={() => setSortOpen((v) => !v)}
              >
                Sort by
                <SlidersHorizontal size={18} />
              </button>
              <SortDropdown
                isOpen={sortOpen}
                onClose={() => setSortOpen(false)}
                value={sortValue}
                onChange={(v) => {
                  setSortValue(v)
                  setSortOpen(false)
                }}
              />
            </div>
          </div>

          {/* Grid */}
          <Stagger className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {courseCategories.map(({ title, courses, rating, img }) => (
              <motion.div key={title} variants={fadeInUp}>
                <Link
                  to="/courses"
                  className="group block overflow-hidden rounded-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  {/* Card image */}
                  <div className="overflow-hidden rounded-lg m-2 aspect-[4/3]">
                    <img
                      src={img}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Card body */}
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Users size={13} className="text-indigo-400" />
                        {courses}&nbsp;Courses
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
                        <Star size={13} className="text-amber-400" fill="currentColor" />
                        {rating}K
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <Footer />

      <ForYouModal
        isOpen={forYouOpen}
        onClose={() => setForYouOpen(false)}
        onSave={(selected) => console.warn('Selected interests:', selected)}
      />
    </AnimatedPage>
  )
}

export default HomePage
