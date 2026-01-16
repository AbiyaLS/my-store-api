import React, { useState } from 'react'
import { registerUser } from '../../lib/authApi'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const [ formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError("")
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError("")

    try {
      const data = await registerUser(formData)
    if(data){
      toast.success("Register Successfully")
      navigate("/login")
    }
    } catch (err) {
      setError(err.response?.data?.message || "Email and Password already exist")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <label>Name</label>
            <input 
            type="text"
            name='name'
            placeholder='Enter Your Name'
            value={formData.name}
            onChange={handleChange}
            className='border p-1 rounded-md mb-2'
            />
        </div>
        <div className='flex flex-col'>
            <label>Email</label>
            <input 
            type="email"
            name='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleChange}
            className='border p-1 rounded-md mb-2'
           />
        </div>
        <div className='flex flex-col'> 
            <label>Password</label>
            <input 
            type="password"
            name='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
            className='border p-1 rounded-md'
           />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        <div className='flex flex-col justify-end'>
        <button type='submit'
            className='bg-green-400 mt-2 p-1 rounded-xl'>
            Register
        </button>
        <Link 
        to={"/login"}
        className='text-sm font-semibold'
        >Already have an Account? Login</Link>
        </div>
      </form>
    </>
  )
}
