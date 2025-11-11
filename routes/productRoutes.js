import express from "express"
import { createProducts, deleteProduct, getAllProducts, getProductById, productsUpdate } from "../controller/product_controller.js"

const router = express.Router()

// create Products
router.post("/create",createProducts)
// get all products
router.get("/",getAllProducts)
// update products
router.put("/:id",productsUpdate)
// get product by id
router.get("/:id",getProductById)
// get product by id
router.delete("/:id",deleteProduct)

export default router