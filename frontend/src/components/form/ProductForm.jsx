import React from 'react'

export default function ProductForm({
    type,
    onSubmit,
    products,
    setProducts,
    error,
    setError  
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col '><label>Product Name</label>
            <input 
             className='bg-blue-200 p-1.5 rounded-xl'
             type='text'
             placeholder='Enter product name'
             value={products.name}
             onChange={(e)=>{
                setProducts({...products,name:e.target.value})
                setError({...error,name:""})}}
            />
                {error.name && (
                    <p className='text-red-500 text-sm'>{error.name}</p>
                )}
        </div>
        <div className='flex flex-col'><label>Product Description</label>
            <textarea
             className='bg-blue-200 p-1.5 rounded-xl '
             type='text'
             placeholder='Enter product description'
             value={products.description}
             onChange={(e)=>{
                setProducts({...products,description:e.target.value})
                setError({...error,description:""})}}
            />
                {error.description && (
                    <p className='text-red-500 text-sm'>{error.description}</p>
                )}
        </div>

        <div className='flex flex-col'><label>Price</label>
            <input 
             className='bg-blue-200 p-1.5 rounded-xl'
             type='text'
             placeholder='Enter product price'
             value={products.price}
             onChange={(e)=>{
                setProducts({...products,price:e.target.value})
                setError({...error,price: ""})}}
            />
                
                {error.price && (
                    <p className='text-red-500 text-sm'>{error.price}</p>
                )}
        </div>
         <button 
         type='submit' 
         className='bg-blue-400 p-2 rounded-2xl mt-2 font-semibold'>
            {type === "add" ? "Create Product" : "Update Product"}
        </button>
    </form>
  )
}
