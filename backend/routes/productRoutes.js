import express from "express"
import {  deleteProduct, getProductById, productsUpdate, createProducts, getProducts } from "../controller/product_controller.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authMiddleware)

// create Products
router.post("/",createProducts)
// get all products
router.get("/",getProducts)
// update products
router.put("/:id",productsUpdate)
// get product by id
router.get("/:id",getProductById)
// get product by id
router.delete("/:id",deleteProduct)



export default router