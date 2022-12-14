const Alert = ({ alert }) => {
  
  return (
    <div
      className={`${
        alert.error ? 'from-red-400 to-red-600' : 'from-sky-600 to-sky-400'
      } bg-gradient-to-br text-center 
        p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
