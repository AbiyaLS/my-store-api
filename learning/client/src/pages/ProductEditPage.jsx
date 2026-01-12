import { useEffect, useState } from "react";
import ProductForm from "../components/form/ProductForm";
import { useParams } from "react-router-dom";

export default function ProductEditPage() {
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { productId } = useParams();

  useEffect(() => {
    console.log("fetching data of product with id", productId);

    setTimeout(() => {
      setProductData({
        productName: "S25 ultra",
        description: "Best phone of 2025",
        price: "90000",
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold"> Product Edit Page</h1>
      <div className="mt-4 border mx-2">
        {isLoading ? (
          <div>Loading form ....</div>
        ) : (
          <ProductForm type={"Update"} defaultValues={productData} />
        )}
      </div>
    </div>
  );
}
