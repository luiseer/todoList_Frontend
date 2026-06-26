import useProjects from "../hooks/useProjects";

const Collaborator = ({ collaborator }) => {
  const { handleModalDeleteCollaborator } = useProjects();
  const { name, email } = collaborator;

  return (
    <div className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors duration-150">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center text-sky-700 font-bold text-sm">
          {name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
      </div>
      <button
        onClick={() => handleModalDeleteCollaborator(collaborator)}
        className="px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        type="button"
      >
        Remove
      </button>
    </div>
  )
}

export default Collaborator
