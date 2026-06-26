import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const ProtectedRoute = () => {
  const { auth, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-start justify-center pt-20">
        <div className="card p-8 max-w-sm w-full mx-4 animate-fade-in">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-slate-200 h-12 w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!auth._id) {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="md:flex md:min-h-[calc(100vh-73px)]">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProtectedRoute
