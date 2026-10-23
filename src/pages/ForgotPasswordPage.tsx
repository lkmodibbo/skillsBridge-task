import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import logoImg from '@/assets/images/Logo.png'

const validationSchema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
})

const ForgotPasswordPage = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // TODO: call forgot password API
      setSubmitting(false)
      navigate('/verify-otp', { state: { email: values.email } })
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
      <div className="text-center mt-10 mb-8 px-4">
        <h1 className="text-4xl font-bold text-white">Forgot Password</h1>
        <p className="mt-3 text-sm text-blue-100 leading-relaxed">
          Enter your email for the verification process, we will
          <br />
          send 6 digit code to your email or phone number
        </p>
      </div>

      {/* Card */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={logoImg} alt="SkillBridge" className="h-10 w-auto object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reset Password</h2>

          <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                {...formik.getFieldProps('email')}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-amber-400 py-2.5 text-sm font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-60"
            >
              {formik.isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Send password reset link
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

export default ForgotPasswordPage
