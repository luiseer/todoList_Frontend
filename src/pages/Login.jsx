import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/user/login', {
        email,
        password
      });

      setAlert({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/projects');
    } catch (error) {
      setAlert({
        msg: error.response?.data?.msg || error.message || 'There was an error',
        error: true
      });
    }
  };
  const { msg } = alert;

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Welcome back</h2>
      <p className="text-slate-500 text-sm text-center mb-8">Sign in to your account</p>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      <form onSubmit={handleSubmit} className="space-y-5">
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
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Sign in
        </button>
      </form>

      <div className="mt-6 space-y-3 text-center">
        <Link to="register" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Don't have an account? Sign up
        </Link>
        <Link to="forgot-password" className="block text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Forgot your password?
        </Link>
      </div>
    </>
  );
};

export default Login;
