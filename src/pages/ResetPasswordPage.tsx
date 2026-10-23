import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import logoImg from '@/assets/images/Logo.png'

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, otp } = (location.state as { email?: string; otp?: string }) ?? {}
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: async (_values, { setSubmitting }) => {
      // TODO: call reset password API with email, otp, password
      setSubmitting(false)
      navigate('/login', { state: { passwordReset: true } })
    },
  })

  // Guard — if no OTP state, redirect back
  if (!otp && !email) {
    navigate('/forgot-password')
    return null
  }

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
      <div className="text-center mt-10 mb-8 px-4">
        <h1 className="text-4xl font-bold text-white">Set New Password</h1>
        <p className="mt-3 text-sm text-blue-100 leading-relaxed">
          Your new password must be different from
          <br />
          previously used passwords
        </p>
      </div>

      {/* Card */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={logoImg} alt="SkillBridge" className="h-10 w-auto object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create a New Password</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your new password should be strong and easy to remember.
          </p>

          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4">
            {/* New Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  {...formik.getFieldProps('password')}
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 pr-10 text-sm text-gray-400 placeholder:text-gray-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re- Enter your new password"
                  {...formik.getFieldProps('confirmPassword')}
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 pr-10 text-sm text-gray-400 placeholder:text-gray-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-amber-400 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-60 mt-2"
            >
              {formik.isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Save new password
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
