import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';
import useAdmin from '../hooks/useAdmin';

const Todo = ({ todo }) => {
  const { handleModalEditTodo, handleModalDeleteTodo, todoComplete } = useProjects();
  const { _id, name, description, deliveryDate, priority, state } = todo;

  const admin = useAdmin();

  const priorityColors = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="p-5 hover:bg-slate-50 transition-colors duration-150">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className={`font-semibold text-lg ${state ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {name}
            </h3>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-lg border ${priorityColors[priority] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
              {priority}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-1">{description}</p>
          <p className="text-xs text-slate-400">{formatDate(deliveryDate)}</p>
          {state && todo.complete?.name && (
            <p className="text-xs text-amber-600 font-medium mt-1">
              Completed by: {todo.complete.name}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
              state
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => todoComplete(_id)}
          >
            {state ? 'Complete' : 'Incomplete'}
          </button>

          {admin && (
            <>
              <button
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                onClick={() => handleModalEditTodo(todo)}
              >
                Edit
              </button>
              <button
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                onClick={() => handleModalDeleteTodo(todo)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
