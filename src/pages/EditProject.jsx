import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects"
import ProjectForm from "../components/ProjectForm"

const EditProject = () => {
  const params = useParams()
  const { getProject, project, loading, deleteProject } = useProjects();

  useEffect(() => {
    getProject(params.id)
  }, [])

  const { name } = project;

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(params.id)
    }
  }

  if (loading) {
    return (
      <div className="card p-8 animate-fade-in">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-4 pt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-black text-slate-900'>Edit Project: {name}</h1>
          <p className='text-slate-500 mt-1'>Update your project details</p>
        </div>
        <button
          onClick={handleClick}
          className="btn-danger !py-2.5 !px-4 text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
      <div className='flex justify-center'>
        <ProjectForm />
      </div>
    </div>
  )
}

export default EditProject
