import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alert from '../components/Alert'

const ForgotPass = () => {

    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || email < 6) {
            setAlert({
                msg: 'Please enter your email address',
                error: true
            });
            return
        }
        try {
            const { data } = await clienteAxios.post(`/user/forgot-password`,
                {
                    email
                })
            setAlert({
                msg: data.msg,
                error: false
            })
            setEmail('')
            
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
                Get your access back so don't lose your
                <span className="text-slate-700">
                    {' '}projects
                </span>
            </h1>
            {msg && <Alert alert={alert} />}
            <form
                className="my-10 bg-white shadow rounded p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email register"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="send instructions"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold 
                rounded hover:cursor-pointer hover:bg-sky-800 mb-5"
                />

            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Do you already have an account?, Sing in
                </Link>
                <Link to="/register" className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    You do not have an account?, Sing up
                </Link>
            </nav>

        </>
    )
}

export default ForgotPass