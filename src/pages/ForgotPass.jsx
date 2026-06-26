import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alert from '../components/Alert'

const ForgotPass = () => {

  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'Please enter your email address',
        error: true
      });
      return
    }
    try {
      const { data } = await clienteAxios.post('/user/forgot-password',
        { email })
      setAlert({
        msg: data.msg,
        error: false
      })
      setEmail('')

    } catch (error) {
      setAlert({
        msg: error.response?.data?.msg || error.message || 'There was an error',
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Reset password</h2>
      <p className="text-slate-500 text-sm text-center mb-8">We'll send you instructions</p>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Send instructions
        </button>
      </form>

      <div className="mt-6 space-y-3 text-center">
        <Link to="/" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Back to sign in
        </Link>
        <Link to="/register" className="block text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Don't have an account? Sign up
        </Link>
      </div>
    </>
  )
}

export default ForgotPass
