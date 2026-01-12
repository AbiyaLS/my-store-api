import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import ProductForm from '../components/ProductForm'
import api from '../lib/axios'
import { validation } from '../lib/validation'

export default function Create() {
    
    const [products,setProducts] =useState([])
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState({})
  
    const navigate =useNavigate()

    // ------------handle submit----------------------
    const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = validation(products);
      if (Object.keys(newErrors).length > 0) {
          setError(newErrors);
          return;
      }
      setLoading(true);
      try {
        await api.post("/product", {
          ...products,
          price: Number(products.price)
        });

        toast.success("Form submit successfully");
        navigate("/");

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };


  return (
    <div  className='min-h-screen bg-blue-200 p-8'>
        <Link to={"/"} className='p-2 bg-blue-300 rounded-2xl text-sm font-semibold'>
         Back to product
        </Link>
        <div className='flex justify-center items-center mt-10 '>
        <div className='bg-blue-300 p-6 w-full'>
        <h1 className=' text-xl text-center font-bold mb-5'>Create New Products</h1>

            <ProductForm 
            type="add"
            onSubmit = {handleSubmit}
            products={products}
            setProducts={setProducts}
            error={error}
            setError={setError} />

      </div>
        </div>
     
    </div>
  )
}


