import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../lib/axios'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    const [ isLoggined, setIsLoggined ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(()=>{
      checkAuth()
    },[])

    const checkAuth = async () => {
        try {
            await api.get('auth/me')
            setIsLoggined(true)
        } catch (error) {
            setIsLoggined(false)
        } finally{
            setIsLoading(false)
        }
    }
    if(isLoading){
        return <div>Loading....</div>
    }

    if(!isLoggined){
        return <Navigate to="/login"/>
    }
  return (
    <div>
      <Outlet/>
    </div>
  )
}
