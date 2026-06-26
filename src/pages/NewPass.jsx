import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alert from '../components/Alert'

const NewPass = () => {
  const [passwordUpdate, setPasswordUpdate] = useState(false)
  const [password, setPassword] = useState('')
  const [validToken, setValidToken] = useState(false)
  const [alert, setAlert] = useState({})

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const confirmToken = async () => {
      try {
        await clienteAxios(`/user/forgot-password/${token}`)
        setValidToken(true)
      } catch (error) {
        setAlert({
          msg: error.response?.data?.msg || 'Invalid or expired token',
          error: true
        })
      }
    };
    confirmToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (password.length < 6) {
      setAlert({
        msg: 'Password must be at least 6 characters',
        error: true
      })
      return
    }
    try {
      const { data } = await clienteAxios.post(`/user/forgot-password/${token}`,
        { password })

      setAlert({
        msg: data.msg,
        error: false
      })
      setPasswordUpdate(true)
      setPassword('')
    } catch (err) {
      setAlert({
        msg: err.response?.data?.msg || err.message || 'There was an error',
        error: true
      })
    }
  }

  const { msg } = alert

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Reset your password</h2>
      <p className="text-slate-500 text-sm text-center mb-8">Choose a new password</p>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      {validToken && (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="password">New password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Reset password
          </button>
        </form>
      )}

      {passwordUpdate && (
        <div className="mt-6 text-center animate-fade-in">
          <Link
            to="/"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Sign in with your new password
          </Link>
        </div>
      )}
    </>
  )
}

export default NewPass
