import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdnmin';
import ModalFormTodo from '../components/ModalFormTodo';
import ModalDeleteTodo from '../components/ModalDeleteTodo';
import Todo from '../components/Todo';
import Collaborator from '../components/Collaborator';
import ModalDeleteCollborator from '../components/ModalDeleteCollaborator';
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
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('open-project', params.id);
  }, []);

  useEffect(() => {
    socket.on('agree-todo', (newTodo) => {
      if (newTodo.proyect === project._id) {
        submitTodosProject(newTodo);
      }
    });
    socket.on('deleted-todo', deleteTodo =>{
      if (deleteTodo.proyect === project._id) {
        deleteTodoProject(deleteTodo);
      }
    })
    socket.on('edited-todo', (ediTodo) =>{
      if (ediTodo.proyect._id === project._id) {
        updateTodoProject(ediTodo);
      }
    })
    socket.on('completed-todo',(completedTodo)=>{
      if (completedTodo.proyect._id === project._id) {
        updateStateTodoProject(completedTodo);
      }
    })
  });

  const { name } = project;

  const { msg } = alert;

  return loading ? (
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
  ) : (
    <>
      <h1 className="font-black text-4xl">{name}</h1>
      {admin && (
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <Link className="uppercase" to={`/projects/edit/${params.id}`}>
              Edit
            </Link>
          </div>
        </div>
      )}

      {admin && (
        <button
          onClick={handleModalTodo}
          type="button"
          className="text-sm px-5 py-3 w-full mt-3 md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          New Todo
        </button>
      )}

      <p className="font-bold text-xl mt-10">Todos of Project</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {project.todos?.length ? (
          project.todos?.map((todo) => <Todo key={todo._id} todo={todo} />)
        ) : (
          <p className="text-center my-5 p-10">Not todos in this project</p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl ">Collaborators</p>
            <div className="flex items-center gap-2 text-gray-400 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <Link
                className="uppercase font-bold"
                to={`/projects/new-collaborator/${project._id}`}
              >
                {' '}
                Add
              </Link>
            </div>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                Not collaborators in this project
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormTodo />
      <ModalDeleteTodo />
      <ModalDeleteCollborator />
    </>
  );
};

export default Project;
