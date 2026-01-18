  import React from 'react'
  import { Route, Routes } from 'react-router-dom'
  import Home from './Pages/Home'
  import Create from './Pages/Create'
  import Detail from './Pages/Detail'
  import Login from './Pages/Login'
  import Register from './Pages/Register'
  import Layout from './components/Layout'
  import ProtectedRoutes from './components/ProtectedRoutes'

  function App() {
    return (
      <div>
        <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
              <Route element={<Layout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/:id' element={<Detail/>}/>
          </Route>
          </Route>
          
        
        </Routes>
      </div>
    )
  }

  export default App
