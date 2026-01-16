import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../../lib/authApi'
import toast from 'react-hot-toast';


export default function LoginForm() {
   const [ formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

 const navigate =useNavigate()
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
      const data = await loginUser(formData)
    if(data){
      toast.success("Login Successfully")
      navigate("/")
    }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password")
    }

    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <label>Email</label>
            <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter email'
            className='border p-1 rounded-md mb-2'
           />
          
        </div>
        <div className='flex flex-col'> 
            <label>Password</label>
            <input 
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='border p-1 rounded-md'
           />
            {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        </div>
        <div className='flex flex-col'>
          <button type='submit' className='p-1 bg-green-400 mt-2 rounded-xl'>Login</button>
           <Link 
            to={"/register"}
            className='text-sm font-semibold'
          >
            Not Registered? Register
          </Link>
        </div>
        
      </form>
    </>
  )
}
