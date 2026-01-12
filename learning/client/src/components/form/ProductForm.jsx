import { useState } from "react";
import { addProduct, editProduct } from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

// type : "Add" | "Update";

export default function ProductForm({ type, defaultValues }) {
  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState({
    productName: "",
    description: "",
    price: "",
  });

  const { productId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let data;

    if (type === "Add") {
      data = await addProduct(formData);
    } else {
      data = await editProduct(productId, formData);
    }

    if (data) {
      if (type === "Add") {
        navigate("/");
      } else {
        toast("Product updated successfully");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-y-4">
      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="border"
        />
      </div>

      <div>
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border"
        />
      </div>

      <div>
        <label>Product Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border"
        />
      </div>

      <button type="submit">
        {type === "Add" ? "Add Product" : "Update Product"}
      </button>
    </form>
  );
}
