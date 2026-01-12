import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductForm from "../components/ProductForm"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios"
import { validation } from "../lib/validation"

export default function Detail() {
  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [ error, setError] = useState({})
  

  const navigate = useNavigate()
  const { id } = useParams()

  // ---------- fetch product ----------
  const fetchData = async () => {
      try {
        const res = await api.get(`/product/${id}`)
        setProducts({
          ...res.data,
          price: String(res.data.price ?? "")
        })
      } catch {
        toast.error("Something went wrong while fetching")
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchData()
  }, [id])

 
  // ---------- save (ONCLICK) ----------
  const handleSave = async (e) => {
     e.preventDefault();

     const newErrors = validation(products);
      if (Object.keys(newErrors).length > 0) {
          setError(newErrors);
           return;
      }

    setSaving(true)
    try {
      await api.put(`/product/${id}`,{
        ...products,
          price: Number(products.price)
      })

      toast.success("Product updated successfully")
      navigate("/")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-blue-200 p-8">
      <Link
        to="/"
        className="p-2 bg-blue-300 rounded-2xl text-sm font-semibold"
      >
        Back to product
      </Link>

      <div className="flex justify-center mt-10">
        <div className="bg-blue-300 p-6 w-full">
          <h1 className="text-xl text-center font-bold mb-5">
            Product Details
          </h1>

          <ProductForm
            type="Edit"
            onSubmit={handleSave}
            products={products}
            setProducts={setProducts}
            error={error}
            setError={setError}
            
          />
 
        </div>
      </div>
    </div>
  )
}
