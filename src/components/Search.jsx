import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useProjects from '../hooks/useProjects'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Search = () => {
  const [search, setSearch] = useState('')
  const { handleSearch, searcher, projects } = useProjects()

  const filterProjects = search === '' ? [] : projects.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Transition.Root show={searcher} as={Fragment} afterLeave={() => setSearch('')}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-20" onClose={handleSearch}>
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

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(project) => (window.location = `/projects/${project._id}`)}
          >
            <div className="relative">
              <Combobox.Input
                className="h-14 w-full border-0 bg-transparent pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:ring-0 text-sm"
                placeholder="Search projects..."
                onChange={e => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {filterProjects.length > 0 && (
              <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-slate-800">
                {filterProjects.map(project => (
                  <Combobox.Option
                    key={project._id}
                    value={project}
                    className={({ active }) => classNames(
                      'cursor-pointer select-none px-5 py-3 transition-colors',
                      active ? 'bg-indigo-50 text-indigo-700' : ''
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span className="font-medium">{project.name}</span>
                    </div>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {search && filterProjects.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-slate-500">No projects found</p>
                <p className="text-slate-400 text-xs mt-1">Try a different search term</p>
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default Search
