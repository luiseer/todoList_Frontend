import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import CollaboratorForm from '../components/CollaboratorForm';
import Alert from '../components/Alert';

const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator, alert } = useProjects();

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loading && !project._id) {
    return (
      <div className="card p-8 animate-fade-in">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          {[1, 2].map(i => (
            <div key={i} className="h-12 bg-slate-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!project._id) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-black text-slate-900 mb-2">
        Add Collaborator
      </h1>
      <p className="text-slate-500 mb-8">
        Add a collaborator to: <span className="font-semibold text-slate-700">{project.name}</span>
      </p>

      {alert.msg && <div className="mb-6"><Alert alert={alert} /></div>}

      <div className="flex justify-center">
        <CollaboratorForm />
      </div>

      {collaborator?._id && (
        <div className="flex justify-center mt-8 animate-slide-up">
          <div className="card p-6 w-full md:w-1/2">
            <h2 className="text-center mb-6 text-lg font-bold text-slate-900">Collaborator found</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{collaborator.name}</p>
                <p className="text-sm text-slate-500">{collaborator.email}</p>
              </div>
              <button
                type='button'
                onClick={() => addCollaborator({ email: collaborator.email })}
                className="btn-primary !py-2 !px-4 text-sm"
              >
                Add to Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCollaborator;
