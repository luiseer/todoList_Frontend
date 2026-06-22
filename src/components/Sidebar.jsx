import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { auth } = useAuth()
  return (
    <aside className="md:w-72 lg:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6">
      <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">
            {auth.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{auth.name}</p>
            <p className="text-xs text-slate-500">{auth.email}</p>
          </div>
        </div>

        <Link
          to="create-project"
          className="btn-primary w-full text-center text-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Project
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
