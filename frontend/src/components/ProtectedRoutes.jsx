import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoutes() {
    const { isLoggined,isLoading } = useAuth()

    if(isLoading){
        return <div>Loading....</div>
    }

    if(!isLoggined){
        return <Navigate to="/login" />
    }
  return (
    <div>
      <Outlet/>
    </div>
  )
}
