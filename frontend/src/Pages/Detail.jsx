import React, { useEffect, useState } from "react"
import API_URL from "../lib/constant"
import toast from "react-hot-toast"
import ProductForm from "../components/ProductForm"
import { Link, useNavigate, useParams } from "react-router"

export default function Detail() {
  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState({})

  const navigate = useNavigate()
  const { id } = useParams()

  // ---------- fetch product ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`)
        const data = await res.json()
        setProducts({
          ...data,
          price: String(data.price ?? "")
        })
      } catch {
        toast.error("Something went wrong while fetching")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // ---------- validation ----------
  const validate = () => {
    let newError = {}

    if (!products.name.trim()) newError.name = "Name is required"
    if (!products.description.trim())
      newError.description = "Description is required"
    if (!products.price.trim()) newError.price = "Price is required"

    setError(newError)
    return Object.keys(newError).length === 0
  }

  // ---------- save (ONCLICK) ----------
  const handleSave = async () => {
    console.log("button clicked")

    if (!validate()) return

    setSaving(true)
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...products,
          price: Number(products.price)
        })
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

          {/* NO FORM */}
          <ProductForm
            products={products}
            setProducts={setProducts}
            error={error}
            setError={setError}
          />

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-400 p-2 rounded-2xl mt-3 font-semibold"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
