import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import CollaboratorForm from '../components/CollaboratorForm';
import Alert from '../components/Alert';

const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator} = useProjects();

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if(!project._id) return 'Loading...';

  if (!project?._id) return <Alert alert={alert}/>

  return loading ? (
    <>
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-48 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
    
      <h1 className="text-4xl font-black">
        Add Collaborator to: {project.name}
      </h1>
      <div className=" mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
      {loading ?     <div className="mt-48 border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div> : collaborator?._id && 
        <div className='flex justify-center mt-10'>
          <div className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'>
            <h2 className='text-center mb-10 text-2xl font-bold'>Resultado</h2>
            <div className='flex justify-between items-center'>
              <p>Collaborator: {collaborator.name}</p>
              <button
                type='button'
                onClick={() => addCollaborator({
                  email: collaborator.email,
                })}
                className='bg-slate-500 hover:bg-slate-600 px-5 py-2 rounded-lg uppercase font-bold text-white text-sm' 
                >Add to Project</button>
            </div>
          </div>
        </div>}
    </>
  );
};

export default NewCollaborator;
