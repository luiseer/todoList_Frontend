import ProjectForm from "../components/ProjectForm"

const NewProject = () => {
  return (
    <>
      <h1 className='text-3xl font-black text-slate-900 mb-2'>New Project</h1>
      <p className='text-slate-500 mb-8'>Create a new project to start organizing your tasks</p>
      <div className='flex justify-center'>
        <ProjectForm />
      </div>
    </>
  )
}

export default NewProject
