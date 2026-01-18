import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/axios'

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
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
  return (
    <AuthContext.Provider value={ {isLoggined,isLoading } }>
        { children }
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  return useContext(AuthContext);
};