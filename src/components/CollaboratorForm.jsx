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
      onSubmit={handleSubmit}
      className="card p-8 w-full md:w-1/2 space-y-6"
    >
      {msg && <Alert alert={alert} />}

      <div>
        <label htmlFor="email" className="label">
          Collaborator Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="email@example.com"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Search Collaborator
      </button>
    </form>
  );
};

export default CollaboratorForm;
