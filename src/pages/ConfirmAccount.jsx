import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [userConfirm, setUserConfirm] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/user/confirm/${id}`;
        const { data } = await clienteAxios.get(url);
        setAlert({
          msg: data.msg,
          error: false
        });
        setUserConfirm(true);
      } catch (error) {
        setAlert({
          msg: error.response?.data?.msg || error.message || 'There was an error',
          error: true
        });
      }
    };

    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Confirm your account</h2>
      <p className="text-slate-500 text-sm text-center mb-8">Almost there!</p>

      {msg && <div className="mb-6"><Alert alert={alert} /></div>}

      {userConfirm && (
        <div className="mt-4 text-center animate-fade-in">
          <Link
            to="/"
            className="btn-primary inline-block"
          >
            Sign in
          </Link>
        </div>
      )}
    </>
  );
};

export default ConfirmAccount;
