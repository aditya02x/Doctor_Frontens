import React , {useState} from 'react'


const Signup = () => {
  const [name , setName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [phone, setPhone]=useState("")
  
  
  function handleSignup(e) {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      phone
    }
    console.log(userData);
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
