import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const CollaboratorForm = () => {
  const [email, setEmail] = useState('');

  const { viewAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      viewAlert({
        msg: 'All fields are required',
        error: true
      });
      return;
    }
    await submitCollaborator(email);
  };

  const { msg } = alert;

  return (
    <form
      onSubmit={ handleSubmit }
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow "
    >
      { msg && <Alert alert={alert} /> }

      <div className="mb-5">
        <label
          htmlFor="email"
          className=" text-sm font-bold uppercase text-gray-700"
        >
          Email Collaborator
        </label>
        <input
          type="email"
          id="email"
          placeholder="email of user"
          className="border-2 w-full p-2 mt-3 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase 
                                  font-bold cursor-pointer transition-colors rounded-lg text-sm"
        value="Find Collaborator"
      />
    </form>
  );
};

export default CollaboratorForm;
