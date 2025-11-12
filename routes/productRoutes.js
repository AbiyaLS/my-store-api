// import express from "express"
// import {  deleteProduct,getAllProducts,  getProductsByMinPrice, getProductById, productsUpdate, getProductByCategory, searchProductByName, getNameAndPrice, getSortedPagination, createProducts } from "../controller/product_controller.js"

// const router = express.Router()

// // create Products
// router.post("/",createProducts)
// // get all products
// router.get("/",getAllProducts)
// // update products
// router.put("/:id",productsUpdate)
// // get product by id
// router.get("/:id",getProductById)
// // get product by id
// router.delete("/:id",deleteProduct)
// // get product with price greter than priceMIn
// router.get("/get/filter",getProductsByMinPrice)
// // get product with specific category
// router.get("/get/category",getProductByCategory)
// // get product by searching name
// router.get("/get/search",searchProductByName)
// // get all the details name and price
// router.get("/get/summary",getNameAndPrice)
// // get sort and pagination
// router.get("/get/pagination",getSortedPagination)
// export default router