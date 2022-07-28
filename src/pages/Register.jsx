import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alert from '../components/Alert'
import clienteAxios from '../config/clienteAxios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async(e) =>{
      e.preventDefault()
      if ([name, email, password, confirmPassword].includes('')) {
          setAlert({
              msg: 'todos los campos son obligatorios',
              error: true
          })
          return
      }
      if (password !== confirmPassword) {
        setAlert({
            msg: 'password must be equals',
            error: true
        })
        return
      }
      if (password.length < 6) {
        setAlert({
            msg: 'password short',
            error: true
        })
        return
      }

      setAlert({})

      //crear el usuairo en la API
      try {
          const { data } = await clienteAxios.post(`/user`,{
              name,
              email,
              password
          })
            setAlert({
                msg: data.msg,
                error: false
            })
            setName('')
            setEmail('')
            setPassword('')
            setconfirmPassword('')
      } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
      }
       
  }

  const { msg } = alert
  return (
    <>
      <h1 
          className="text-sky-600 font-black text-6xl capitalize">
          Create your account and manage your 
          <span className="text-slate-700">
              {' '}projects
          </span>
      </h1>
      {msg && <Alert alert={ alert }/>}
      <form 
        onSubmit={handleSubmit} 
        className="my-10 bg-white shadow rounded p-10"
      >
          
      <div className="my-5">
              <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="name"
                  >name</label>
              <input
                  id="name"
                  type="text"
                  placeholder="name to register"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
          </div>
          <div className="my-5">
              <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="email"
                  >email</label>
              <input
                  id="email"
                  type="email"
                  placeholder="email to register"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
          </div>
          <div className="my-5">
              <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="password"
                  >password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="password to register"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />
          </div>
          <div className="my-5">
              <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="password2"
                  > repeat password</label>
              <input
                  id="password2"
                  type="password"
                  placeholder="confirm password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={confirmPassword}
                  onChange={e => setconfirmPassword(e.target.value)}
              />
          </div>

          <input 
              type="submit"
              value="Create acount"
              className="bg-sky-700 w-full py-3 text-white uppercase font-bold 
                  rounded hover:cursor-pointer hover:bg-sky-800 mb-5" 
          />

      </form>

      <nav className='lg:flex lg:justify-between'>
          <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>
            Do you already have an account?, Sing in
          </Link>
          <Link to="/forgot-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>
              Forget my password
          </Link>
      </nav>

   </>
  )
}

export default Register