import React from 'react'
import formatedDate from '../lib/utils'
import { SquarePen, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { Link } from 'react-router-dom'

export default function ProductsCard({product,setProducts}) {
// ---------------------Handle delete------------------
    const handleDelete =async(e,id)=>{
        e.preventDefault();
        try {
           await api.delete(`/product/${id}`)
           setProducts((prev)=>prev.filter((p)=>p._id !== id))
           toast.success("Delete Successfully")
        } catch (error) {
            console.log("Something went Wrong",error)
        }
    }
// -----------------------------------------------------------
  return (
    <Link to={`/${product._id}`} className=' bg-blue-300 p-2 rounded-2xl'>
      <h1 className='font-bold'>{product.name}</h1>
      <p className='text-sm '>{product.description}</p>
     <p className={product?.instock ? "text-green-600 font-semibold text-sm": "text-red-600 font-semibold text-sm" }>
     {product?.instock ? "Available" : "Out of Stock"}
    </p>
     <h1 className='text-lg font-bold'>₹{product.price}</h1>
     <span className='text-xs md:text-sm lg-text-sm'>{formatedDate(new Date(product.createdAt))}</span>
     <span className='flex justify-end gap-3 mr-2'>
        <button className='text-white'><SquarePen/></button>
        <button className='text-red-500' onClick={(e)=>handleDelete(e,product._id)}><Trash2/></button>
        </span>
    </Link>
  )
}
