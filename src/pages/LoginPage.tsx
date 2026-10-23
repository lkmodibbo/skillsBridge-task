import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import logoImg from '@/assets/images/Logo.png'

const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const LoginPage = () => {
  const { login, isLoggingIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        await login(values, () => navigate(from, { replace: true }))
      } catch {
        setFieldError('email', 'Invalid email or password')
      }
    },
  })

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col">
      {/* Go Back */}
      <div className="px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
      </div>

      {/* Heading */}
      <div className="text-center mt-8 mb-6 px-4">
        <h1 className="text-3xl font-bold text-white">Welcome to Skills Bridge</h1>
        <p className="mt-2 text-sm text-blue-100">
          Today is a new day. It&apos;s your day. Learn something new.
          <br />
          Sign in to continue your learning journey
        </p>
      </div>

      {/* Card */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src={logoImg} alt="SkillBridge" className="h-10 w-auto object-contain" />
          </div>

          <h2 className="text-center text-xl font-bold text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                {...formik.getFieldProps('email')}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...formik.getFieldProps('password')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-amber-400 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-60"
            >
              {isLoggingIn ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
