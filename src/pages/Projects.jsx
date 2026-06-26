import useProjects from "../hooks/useProjects"
import PreviewProject from "../components/PreviewProject"
import Alert from "../components/Alert"

const Projects = () => {
  const { projects, alert } = useProjects()
  const { msg } = alert

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">My Projects</h1>
          <p className="text-slate-500 mt-1">Manage and track all your projects</p>
        </div>
      </div>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      <div className="card divide-y divide-slate-100 overflow-hidden">
        {projects?.length > 0 ? (
          projects?.map(project => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <div className="text-center py-16 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <p className="text-slate-500 font-medium">No projects yet</p>
            <p className="text-slate-400 text-sm mt-1">Create your first project to get started</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Projects
