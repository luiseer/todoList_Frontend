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

  const fillDemo = () => {
    setEmail('test@test.com');
    setPassword('123456');
  };

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

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Demo
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Test credentials</p>
            <p className="mt-1 truncate text-sm text-slate-600">
              <span className="font-medium text-slate-800">Email:</span> test@test.com
            </p>
            <p className="truncate text-sm text-slate-600">
              <span className="font-medium text-slate-800">Password:</span> 123456
            </p>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            className="shrink-0 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-sm"
          >
            Auto-fill
          </button>
        </div>
      </div>

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
