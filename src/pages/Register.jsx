import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import clienteAxios from '../config/clienteAxios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([name, email, password, confirmPassword].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      })
      return
    }
    if (password !== confirmPassword) {
      setAlert({
        msg: 'Passwords do not match',
        error: true
      })
      return
    }
    if (password.length < 6) {
      setAlert({
        msg: 'Password must be at least 6 characters',
        error: true
      })
      return
    }

    setAlert({})

    try {
      const { data } = await clienteAxios.post('/user', {
        name,
        email,
        password
      })
      setAlert({
        msg: data.msg,
        error: false
      })
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
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
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Create your account</h2>
      <p className="text-slate-500 text-sm text-center mb-8">Start managing your projects</p>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="input-field"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="input-field"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            className="input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="label" htmlFor="password2">Confirm password</label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat your password"
            className="input-field"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Create account
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Already have an account? Sign in
        </Link>
      </div>
    </>
  )
}

export default Register
