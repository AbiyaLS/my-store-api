import { Search } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'

export default function Navbar({onSearch}) {
  const [ searchText, setSearchText ] = useState("")

  const handleSearch = () => {
    if(!searchText.trim()) return

    onSearch(searchText.trim())
  }

  return (
    <div className='h-20 bg-blue-300 flex items-center justify-between p-4 md:p-6 lg:p-8'>
        <Link to={"/create"} className='bg-blue-400 p-2 rounded-full text-sm font-semibold'>Create Product</Link>
        <div className=' flex justify-between items-center gap-4 bg-blue-400 rounded-2xl p-0.5'>
          <input 
          className=' p-1 bg-white rounded-l-2xl px-4 '
          type="text" 
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}/>
          <button
          className='pr-2'
          onClick={handleSearch}
          ><Search/></button>
        
        </div>
    </div>
  )
}
