import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdnmin';

const Todo = ({ todo }) => {
  const { handleModalEditTodo, handleModalDeleteTodo, todoComplete } = useProjects();

  const { _id, name, description, deliveryDate, priority, state, } = todo;

  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex gap-2 justify-between items-center">
      <div className='flex flex-col items-start '>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{formatDate(deliveryDate)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
        {state && <p className='text-xs bg-orange-600 uppercase rounded-lg p-0.5 text-white '>Complete by:  {todo.complete.name}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <div>
            <button
              className="bg-indigo-600 px-4 py-3 hover:bg-indigo-800 text-white w-full uppercase font-bold text-sm rounded-lg"
              onClick={() => handleModalEditTodo(todo)}
            >
              Edit
            </button>
          </div>
        )}

  

        <button
          className={`${state ? 'bg-sky-600 ' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => todoComplete(_id)}
        >
          {state ? 'Complete' : 'Incomplete'}
        </button>

        {admin && (
          <div>
            <button
              className={"bg-red-600 px-4 py-3 hover:bg-red-800 text-white w-full uppercase font-bold text-sm rounded-lg"}
              onClick={() => handleModalDeleteTodo(todo)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
