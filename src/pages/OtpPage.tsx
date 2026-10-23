import { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import logoImg from '@/assets/images/Logo.png'

const validationSchema = Yup.object({
  otp: Yup.string().length(6, 'Enter all 6 digits').required(),
})

const OtpPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string })?.email ?? ''
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema,
    onSubmit: (_values, { setSubmitting }) => {
      // TODO: verify OTP with API
      setSubmitting(false)
      navigate('/reset-password', { state: { email, otp: digits.join('') } })
    },
  })

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const updated = [...digits]
    updated[index] = value
    setDigits(updated)
    formik.setFieldValue('otp', updated.join(''))
    // Auto-advance
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const updated = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
    setDigits(updated)
    formik.setFieldValue('otp', updated.join(''))
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
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
        <h1 className="text-4xl font-bold text-white">Verification</h1>
        <p className="mt-3 text-sm text-blue-100 leading-relaxed">
          Enter the 6 digit code sent to your email
          {email && <span className="font-semibold"> {email}</span>}
        </p>
      </div>

      {/* Card */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-full max-w-sm rounded-2xl bg-white px-8 py-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={logoImg} alt="SkillBridge" className="h-10 w-auto object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter 6 Digit code</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter 6 digit code that your receive on your email.
          </p>

          <form onSubmit={formik.handleSubmit} noValidate>
            {/* OTP boxes */}
            <div className="flex items-center justify-between gap-2 mb-5" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-12 rounded-xl border-2 border-gray-200 text-center text-xl font-semibold text-gray-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            {formik.submitCount > 0 && formik.errors.otp && (
              <p className="mb-3 text-xs text-red-500 text-center">{formik.errors.otp}</p>
            )}

            {/* Resend */}
            <p className="mb-5 text-center text-sm text-gray-500">
              Email or SMS not received?{' '}
              <button
                type="button"
                className="font-semibold text-amber-500 hover:text-amber-600"
                onClick={() => {
                  // TODO: resend OTP
                }}
              >
                Resend Code
              </button>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-amber-400 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-60"
            >
              {formik.isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Continue
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

export default OtpPage
