import express from "express"
import {  deleteProduct,getAllProducts, getProductById, productsUpdate, createProducts, getProductsWithLimit } from "../controller/product_controller.js"

const router = express.Router()

// create Products
router.post("/",createProducts)
// get all products
router.get("/products",getProductsWithLimit)

router.get("/",getAllProducts)
// update products
router.put("/:id",productsUpdate)
// get product by id
router.get("/:id",getProductById)
// get product by id
router.delete("/:id",deleteProduct)



export default router