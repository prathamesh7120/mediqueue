import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { loginPatient, loginDoctor } from '../api/auth'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'PATIENT',
  })

  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let response

      // Call different API based on role
      if (formData.role === 'PATIENT') {
        response = await loginPatient({
          email: formData.email,
          password: formData.password,
        })
      } else {
        response = await loginDoctor({
          email: formData.email,
          password: formData.password,
        })
      }

      const { token, email, fullName, role } = response.data.data

      // Save to context and localStorage
      login({ email, fullName, role }, token)

      toast.success(`Welcome back, ${fullName}!`)

      // Redirect based on role
      if (role === 'PATIENT') {
        navigate('/patient/dashboard')
      } else if (role === 'DOCTOR') {
        navigate('/doctor/dashboard')
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full opacity-5 blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏥</div>
            <h1 className="text-3xl font-bold text-white mb-1">
              MediQueue
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, role: 'PATIENT' })
              }
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                formData.role === 'PATIENT'
                  ? 'bg-teal-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, role: 'DOCTOR' })
              }
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                formData.role === 'DOCTOR'
                  ? 'bg-teal-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Doctor
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-slate-300 text-sm mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-slate-300 text-sm mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>

          </form>

          {/* Footer */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-teal-400 hover:text-teal-300 font-medium"
            >
              Register here
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  )
}

export default Login