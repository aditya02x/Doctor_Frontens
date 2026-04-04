import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axios.js'
import { toast } from 'react-toastify'


const Login = () => {
  const [email , setEmail] =useState("")
  const [password,setPassword] =useState("")
  const {login} =useAuth()
  const navigate = useNavigate()

  const handeSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('/auth/login',{email,password})
      login(res.data.user , res.data.token)
      toast.success('Login successful')
      if(res.data.user.role === 'patient') navigate('/patient/dashboard')
else if(res.data.user.role === 'doctor') navigate('/doctor/dashboard')
else if(res.data.user.role === 'admin') navigate('/admin/dashboard')
      
    } catch (error) {
       toast.error(error.response.data.message)
    }
  }

  return (
    <section className='h-screen w-full'>
      <h1 className='text-5xl justify-center items-center'>Login page</h1>
      <form action="" onSubmit={handeSubmit}>
        <input type="email " value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />

        <button type='submit' >Login</button>
        

      </form>
    </section>
  )
}

export default Login
