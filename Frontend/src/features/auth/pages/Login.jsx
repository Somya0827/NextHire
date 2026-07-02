import React, { useState } from 'react'
import '../auth.form.scss'
import {useNavigate,Link} from 'react-router'
import {useAuth} from '../hooks/useAuth'
import Loader from '../components/Loader'

const Login = () => {

  const {loading,handleLogin} = useAuth();

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({email,password})
    
    navigate("/")
  }

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email" 
            id="email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Enter email address" />

          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Enter password " />

          </div>
          <button className='button primary-button'>Login</button>
        </form>

        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>

      </div>
    </main>
  )
}

export default Login
