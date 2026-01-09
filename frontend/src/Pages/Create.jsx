import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import API_URL from '../lib/constant'
import toast from 'react-hot-toast'
import ProductForm from '../components/ProductForm'



export default function Create() {
    const [products,setProducts] =useState([])
    const [loading, setLoading] = useState(false);
    const [error,setError] =useState({})

    const navigate =useNavigate()
// ----------------------------FORM VALIDATION----------------------
    const validate= ()=>{
        let newError={}
        if(!products.name?.trim()){
            newError.name= "Name is required"
        }
        if(!products.description?.trim()){
            newError.description= "Description is required"
        }
        if(!products.price?.trim()){
            newError.price= "Price is required"
        }
        setError(newError)
        return Object.keys(newError).length === 0
    }
  
// ------------------------------------------------------------------
    // ------------handle submit----------------------
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!validate()) return
        setLoading(true)
        try {
          await fetch(API_URL,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...products,price:Number(products.price)}),
          })  
          toast.success("Form submit successfully")
          navigate("/")
        } catch (error) {
            
        }
    }

  return (
    <div  className='min-h-screen bg-blue-200 p-8'>
        <Link to={"/"} className='p-2 bg-blue-300 rounded-2xl text-sm font-semibold'>
         Back to product
        </Link>
        <div className='flex justify-center items-center mt-10 '>
        <div className='bg-blue-300 p-6 w-full'>
        <h1 className=' text-xl text-center font-bold mb-5'>Create New Products</h1>
        <form onSubmit={handleSubmit}>
            <ProductForm 
            products={products}
            setProducts={setProducts}
            error={error}
            setError={setError} />

            <button disabled={loading} className='bg-blue-400 p-2 rounded-2xl mt-2 font-semibold'>{loading ? "Creating...": "Create Product"}</button>
        </form>
      </div>
        </div>
     
    </div>
  )
}


