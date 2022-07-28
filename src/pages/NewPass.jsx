import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alert from '../components/Alert'

const NewPass = () => {
    const [passwordUpdate, setPasswordUpdate] = useState(false)
    const [password, setPassword] = useState('')
    const [validToken, setValidToken] = useState(false)
    const [alert, setAlert] = useState({})

    const params = useParams()
    const { token } = params



    useEffect(() => {
        const confirmToken = async () => {
            try {
                //TODO: move to client axios
                await clienteAxios(`/user/forgot-password/${token}`)
                setValidToken(true)
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        };
        confirmToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        if (password.length < 6) {
            setAlert({
                msg: 'Password must be at least 6 characters',
                error: true
            })
            return
        }
        try {
            const { data } = await clienteAxios.post(`/user/forgot-password/${token}`,
                {
                    password
                })
         
            setAlert({
                msg: data.msg,
                error: false
            })
            setPasswordUpdate(true)
            setPassword('')
        } catch (err) {
            setAlert({
                msg: err.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert

    return (
        <>
            <h1
                className="text-sky-600 font-black text-6xl capitalize">
                Reset your password and do not lose access to your
                <span className="text-slate-700">
                    {' '}projects
                </span>
            </h1>

            {msg && <Alert alert={alert} />}

            {
                validToken && (
                    <form
                        className="my-10 bg-white shadow rounded p-10"
                        onSubmit={handleSubmit}
                    >

                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                                htmlFor="password"
                            >New password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="new password to register"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Reset Password"
                            className="bg-sky-700 w-full py-3 text-white uppercase font-bold 
                    rounded hover:cursor-pointer hover:bg-sky-800 mb-5"
                        />

                    </form>
                )
            }

            {passwordUpdate && (
                <Link
                    to="/"
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                >
                    Sing in
                </Link>
            )}

        </>
    )
}

export default NewPass
