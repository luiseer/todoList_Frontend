import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
    const { auth } = useAuth()
  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 py-10 p-4'>
        <p className='text-xl font-bold '>Hello, {auth.name}</p>
        <Link 
            className='bg-sky-600 p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg '
            to='create-project'>New Project
        </Link>
    </aside>
  )
}

export default Sidebar