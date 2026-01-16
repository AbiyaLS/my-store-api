import  { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductsCard from "../components/ProductsCard";
import toast from "react-hot-toast";
import api from "../lib/axios";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(2)
  const [totalPage,setTotalPage] = useState(1)
  const [search,setSearch] =useState("")
 
// ------------------------fetch Data--------------------------
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await api.get("/product",{
        params: {
          page,
          limit,
          ...(search && {search}) //only add if search exist
        }
      })
      setProducts(res.data.products);
      setTotalPage(res.data.totalPage);
      // toast.success("Data fetched");
    } catch (error) {
      console.log("Error in fetching data", error);
      toast.error("Fail to fetch data")
    }finally{
      setLoading(false)
    }
  }

    useEffect(() => {
      fetchData();
    }, [page,limit,search]);
// -------------------------------------------------------------
// -------------------------Handle Search-----------------------
const handleSearch = (text) => {
  setSearch(text)
  setPage(1)
}
// -------------------------------------------------------------
    return (
        <div className="bg-blue-200 min-h-screen pb-8">
          <Navbar onSearch={handleSearch}/>
      
          {/* Limit dropdown */}
          <div className="flex justify-center items-center mt-4">
            <select 
              className="p-2 rounded-2xl"
              value={limit}
              onChange={(e)=>{
                setLimit(Number(e.target.value))
                setPage(1)
              }}
            >
              <option value={2}>2 per page</option>
              <option value={5}>5 per page</option>
            </select>
          </div>
        {loading && <div>Loading...</div>}

          {products.length === 0 && (
            <div>No Product Available</div>
            
          )}

          { products.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6 lg:p-8">
                {products.map((p) => (
                  <ProductsCard key={p._id} product={p} setProducts={setProducts} />
                ))}
              </div>
            {/* ------------------Pagination----------------------- */}
              <div className="flex justify-center gap-4">
                <button
                className=""
                onClick={()=>setPage((prev)=>Math.max(prev -1 ,1))}
                >Prev</button>
                <span>{page}</span>
                
                  {page<totalPage && (
                    <button
                onClick={() => setPage((prev) => prev + 1)}>
                  Next </button>
                  )}
              
              </div>
            </>
          )}
        </div>
    );
  }
