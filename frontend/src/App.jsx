import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Detail from './Pages/Detail'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/:id' element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App
