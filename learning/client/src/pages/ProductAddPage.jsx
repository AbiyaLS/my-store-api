import ProductForm from "../components/form/ProductForm";

export default function ProductAddPage() {
  const defaultValues = {
    productName: "",
    description: "",
    price: "",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold"> Product Add Page</h1>
      <div className="mt-4 border mx-2">
        <ProductForm type={"Add"} defaultValues={defaultValues} />
      </div>
    </div>
  );
}
