import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import logoImg from '@/assets/images/Logo.png'

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phone: Yup.string().min(7, 'Enter a valid phone number').required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  terms: Yup.boolean().oneOf([true], 'You must agree to the Terms & Conditions'),
})

const RegisterPage = () => {
  const { register: registerUser, isRegistering } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema,
    onSubmit: async ({ name, email, password }, { setFieldError }) => {
      try {
        await registerUser({ name, email, password }, () => navigate('/dashboard'))
      } catch {
        setFieldError('email', 'Registration failed. Please try again.')
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

          <h2 className="text-center text-xl font-bold text-gray-900 mb-6">Register</h2>

          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                {...formik.getFieldProps('name')}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                {...formik.getFieldProps('phone')}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-Enter your password"
                  {...formik.getFieldProps('confirmPassword')}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                {...formik.getFieldProps('terms')}
                checked={formik.values.terms}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-amber-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree with{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms &amp; Condition
                </a>
              </label>
            </div>
            {formik.touched.terms && formik.errors.terms && (
              <p className="-mt-2 text-xs text-red-500">{formik.errors.terms}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isRegistering}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-amber-400 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-60"
            >
              {isRegistering ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Sign up
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
