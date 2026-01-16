import React from 'react'
import RegisterForm from '../components/form/RegisterForm'

export default function Login() {
  return (
    <div className='bg-blue-200 min-h-screen p-10'>
        <div className='flex  flex-col justify-center items-center '>
            <div className='mt-10 bg-blue-300 w-full p-10'>
            <h1 className='text-xl font-bold mb-4 text-center'>Register Form</h1>
      <RegisterForm/>
      </div>
        </div>
        
    </div>
  )
}
