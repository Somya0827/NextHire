import { useContext , useEffect} from "react";
import { AuthContext } from "../auth.context.jsx"
import { login, register, logout, getMe } from '../services/auth.api'

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message)
            setUser(null)
        } finally {
            setLoading(false);
        }

    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message)
            setUser(null)
        } finally {
            setLoading(false);
        }
    }


    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null)
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
       const getandSetUser = async () => {
           try {
               const data = await getMe()
               if (data && data.user) {
                   setUser(data.user)
               }
           } catch (error) {
               console.log('Failed to fetch user:', error)
               setUser(null)
           } finally {
               setLoading(false)
           }
       }
       getandSetUser()
    }, [])

    return { user, loading, handleLogin, handleLogout, handleRegister }

}