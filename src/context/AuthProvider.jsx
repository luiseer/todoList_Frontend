import {useState, useEffect, createContext} from 'react';
import {useNavigate} from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
       const userAuth = async () =>{
            const token = localStorage.getItem('token');
            if(!token){
                setLoading(false)
                return 
            }

            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/user/profile', config);
                setAuth(data);
                navigate('/projects')
                
            } catch (error) {
                setAuth({});
                console.log(error);

            } finally {
                setLoading(false);
            }
       }
         userAuth();
    }, []);

    const logOutAuth = () => {
        setAuth({});
    }
    
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logOutAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext;