import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProject = ({ project }) => {
  const { auth } = useAuth()
  const { name, _id, client, creator } = project

  return (
    <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors duration-150">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 truncate">{name}</p>
          <p className="text-sm text-slate-500 truncate">{client}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {auth._id !== creator && (
          <span className="px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg">
            Collaborator
          </span>
        )}
        <Link
          to={`${_id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View →
        </Link>
      </div>
    </div>
  )
}

export default PreviewProject
