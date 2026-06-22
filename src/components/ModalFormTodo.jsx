import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';
import { useParams } from 'react-router-dom';

const PRIORITIES = ['low', 'medium', 'high'];

const ModalFormTodo = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [priority, setPriority] = useState('');

  const params = useParams();
  const { modalFormTodo, handleModalTodo, viewAlert, alert, submitTodo, todo } = useProjects();

  useEffect(() => {
    if (todo?._id) {
      setId(todo._id);
      setName(todo.name);
      setDescription(todo.description);
      setDeliveryDate(todo.deliveryDate?.split('T')[0]);
      setPriority(todo.priority);
      return;
    }
    setId('');
    setName('');
    setDescription('');
    setDeliveryDate('');
    setPriority('');
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deliveryDate, priority].includes('')) {
      viewAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }
    await submitTodo({
      id,
      name,
      description,
      deliveryDate,
      priority,
      project: params.id
    });
    setId('');
    setName('');
    setDescription('');
    setDeliveryDate('');
    setPriority('');
  };

  const { msg } = alert;

  return (
    <Transition.Root show={modalFormTodo} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={handleModalTodo}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-2xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8">
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  className="rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
                  onClick={handleModalTodo}
                >
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <Dialog.Title as="h3" className="text-xl font-bold text-slate-900 mb-6">
                {id ? 'Edit Task' : 'New Task'}
              </Dialog.Title>

              {msg && <div className="mb-6"><Alert alert={alert} /></div>}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="label">Task Name</label>
                  <input type="text" id="name" placeholder="e.g. Design homepage" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="description" className="label">Description</label>
                  <textarea id="description" placeholder="Describe the task..." className="input-field min-h-[80px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="date-delivery" className="label">Delivery Date</label>
                  <input type="date" id="date-delivery" className="input-field" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="priority" className="label">Priority</label>
                  <select id="priority" className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="">Select priority</option>
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handleModalTodo} className="btn-secondary flex-1">Cancel</button>
                  <button type="submit" className="btn-primary flex-1">
                    {id ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormTodo;
