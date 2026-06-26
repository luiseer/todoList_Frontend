import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black gradient-text">UpTask</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your projects in real time</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
