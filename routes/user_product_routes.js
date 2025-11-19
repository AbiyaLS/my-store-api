import express from "express"
import { createProductForUser, getUsersProduct, getSpecifyProductByUser, getUserAndProducts, updateProductOfOwner, countProductOfUser } from "../controller/user_product_controller.js"

const router =express.Router()

// create user's product
router.post("/create",createProductForUser)
// get users product
router.get("/",getUsersProduct)

router.get("/user/:userId",getSpecifyProductByUser)

router.get("/:userId",getUserAndProducts)
// update the products of the owners
router.put("/:pid/by/:uid",updateProductOfOwner)
// count the product of user
router.get("/count/:userId",countProductOfUser)

export default router