
import React , {useState} from 'react'
import axios from '../../utils/axios.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name , setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [phone, setPhone]=useState("")
  const navigate = useNavigate()
  
  const handleSignup = async (e) => {
    e.preventDefault()
    

    try {
      const userData = {
      name,
      email,
      password,
      phone
    }
    const res = await axios.post('/auth/register',userData)
    toast.success('Account created SUcessfuly')
    navigate('/login')
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    // Handle signup logic here
  }
  return (
    <section>
      <h1 className='text-3xl'>Signup</h1>
      <form onSubmit={handleSignup} className='flex flex-col gap-4 w-96'>
        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} className='border p-2 rounded' />
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border p-2 rounded' />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='border p-2 rounded' />
        <input type="text" placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} className='border p-2 rounded' />
        <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Signup</button>
      </form>
    </section>
  )
}

export default Signup
