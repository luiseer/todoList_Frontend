import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Alert from './Alert'

const ProjectForm = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [client, setClient] = useState('')

  const params = useParams()
  const { viewAlert, alert, submitProject, project } = useProjects()

  useEffect(() => {
    if (params.id) {
      setId(project._id)
      setName(project.name)
      setDescription(project.description)
      setDeliveryDate(project.deliveryDate?.split('T')[0])
      setClient(project.client)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, description, deliveryDate, client].includes('')) {
      viewAlert({
        msg: 'All fields are required',
        error: true
      })
      return
    }

    await submitProject({
      id,
      name,
      description,
      deliveryDate,
      client
    })
    setId(null)
    setName('')
    setDescription('')
    setDeliveryDate('')
    setClient('')
  }

  const { msg } = alert

  return (
    <form className="card p-8 w-full md:w-2/3 lg:w-1/2 space-y-6"
      onSubmit={handleSubmit}>

      {msg && <Alert alert={alert} />}

      <div>
        <label className="label" htmlFor="name">Project Name</label>
        <input
          id='name'
          className="input-field"
          type="text"
          placeholder='e.g. Marketing Campaign'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="description">Description</label>
        <textarea
          id='description'
          className="input-field min-h-[100px]"
          placeholder='Describe your project...'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="date-delivery">Delivery Date</label>
        <input
          id='date-delivery'
          className="input-field"
          type="date"
          value={deliveryDate}
          onChange={e => setDeliveryDate(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="client">Client</label>
        <input
          id='client'
          className="input-field"
          type="text"
          placeholder='Client name'
          value={client}
          onChange={e => setClient(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        {id ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  )
}

export default ProjectForm
