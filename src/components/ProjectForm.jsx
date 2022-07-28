import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Alert from './Alert'

const ProjectForm = () => {
    const [id , setId] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deliverDate, setDeliverDate] = useState('')
    const [client, setClient] = useState('')

    const params = useParams()
    const { viewAlert, alert, submitProject, project } = useProjects()

    useEffect(() => {
        if (params.id) {
            setId(project._id)
            setName(project.name)
            setDescription(project.description)
            setDeliverDate(project.deliverDate?.split('T')[0])
            setClient(project.client)
        } 
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault()

        if ([name, description, deliverDate, client].includes('')) {
            viewAlert(
                {
                    msg: 'All fields are required',
                    error: true
                }
            )
            return
        }

        //data to provider
        await submitProject({
            id,
            name,
            description,
            deliverDate,
            client
        })
        setId(null)
        setName('')
        setDescription('')
        setDeliverDate('')
        setClient('')


    }

    const { msg } = alert

    return (
        <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
              onSubmit={handleSubmit}>

            {msg && <Alert alert={alert} />}

            
            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="name">
                    Project Name
                </label>
                <input
                    id='name'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    type="text"
                    placeholder='project name'
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="description">
                    Description
                </label>
                <textarea
                    id='description'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='project description'
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
            </div>


            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="date-delivery">
                    Delivery date
                </label>
                <input
                    id='date-delivery'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    type="date"
                    value={deliverDate}
                    onChange={e => setDeliverDate(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label
                    className='text-gray-700 uppercase font-bold text-sm'
                    htmlFor="client">
                    Client
                </label>
                <input
                    id='client'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    type="text"
                    placeholder='client name'
                    value={client}
                    onChange={e => setClient(e.target.value)} />
            </div>

            <input
                type="submit"
                value={id ? 'Update Project' : 'Create Project'}
                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-sky-700 transition-transform' />

        </form>
    )
}

export default ProjectForm