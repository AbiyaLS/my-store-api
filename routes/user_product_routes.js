import express from "express"
import { createProductForUser, getUsersProduct,getProductsByUser } from "../controller/user_product_controller.js"

const router =express.Router()

// create user's product
router.post("/create",createProductForUser)
// get users product
router.get("/",getUsersProduct)

router.get("/user/:userId",getProductsByUser)

export default router