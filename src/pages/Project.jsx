import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';
import ModalFormTodo from '../components/ModalFormTodo';
import ModalDeleteTodo from '../components/ModalDeleteTodo';
import Todo from '../components/Todo';
import Collaborator from '../components/Collaborator';
import ModalDeleteCollaborator from '../components/ModalDeleteCollaborator';
import io from 'socket.io-client';

let socket;

const Project = () => {
  const params = useParams();
  const {
    getProject,
    project,
    loading,
    handleModalTodo,
    alert,
    submitTodosProject,
    deleteTodoProject,
    updateTodoProject,
    updateStateTodoProject
  } = useProjects();

  const admin = useAdmin();

  useEffect(() => {
    getProject(params.id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL || undefined);
    socket.emit('open-project', params.id);
  }, []);

  useEffect(() => {
    socket.on('agree-todo', (newTodo) => {
      if (newTodo.project === project._id) {
        submitTodosProject(newTodo);
      }
    });
    socket.on('deleted-todo', deleteTodo => {
      if (deleteTodo.project === project._id) {
        deleteTodoProject(deleteTodo);
      }
    })
    socket.on('edited-todo', (ediTodo) => {
      if (ediTodo.project._id === project._id) {
        updateTodoProject(ediTodo);
      }
    })
    socket.on('completed-todo', (completedTodo) => {
      if (completedTodo.project._id === project._id) {
        updateStateTodoProject(completedTodo);
      }
    })
  });

  const { name } = project;
  const { msg } = alert;

  if (loading) {
    return (
      <div className="card p-8 animate-fade-in">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="space-y-3 pt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{name}</h1>
        </div>
        {admin && (
          <div className="flex items-center gap-3">
            <Link
              to={`/projects/edit/${params.id}`}
              className="btn-secondary !py-2.5 !px-4 text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </Link>
            <button
              onClick={handleModalTodo}
              className="btn-primary !py-2.5 !px-4 text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Todo
            </button>
          </div>
        )}
      </div>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Tasks
        </h2>
        <div className="card divide-y divide-slate-100 overflow-hidden">
          {project.todos?.length ? (
            project.todos?.map((todo) => <Todo key={todo._id} todo={todo} />)
          ) : (
            <div className="text-center py-12 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-slate-500 font-medium">No tasks yet</p>
              {admin && <p className="text-slate-400 text-sm mt-1">Click "New Todo" to add one</p>}
            </div>
          )}
        </div>
      </section>

      {admin && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Collaborators
            </h2>
            <Link
              to={`/projects/new-collaborator/${project._id}`}
              className="btn-primary !py-2 !px-3 text-xs flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Add
            </Link>
          </div>
          <div className="card divide-y divide-slate-100 overflow-hidden">
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator key={collaborator._id} collaborator={collaborator} />
              ))
            ) : (
              <div className="text-center py-12 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <p className="text-slate-500 font-medium">No collaborators yet</p>
                <p className="text-slate-400 text-sm mt-1">Invite people to collaborate on this project</p>
              </div>
            )}
          </div>
        </section>
      )}

      <ModalFormTodo />
      <ModalDeleteTodo />
      <ModalDeleteCollaborator />
    </div>
  );
};

export default Project;
