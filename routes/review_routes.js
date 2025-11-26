import express from "express"
import { agg_reviewsByProduct,getAll5StarReview, totalReviewsPerProduct} from "../controller/review_controller.js"

const router = express.Router()

// create review
// router.post("/create",createReview)
// get all the review of products
// router.get("/:productId",getAllProductsReview)
// get all the review of products
// router.get("/productReview/:userId",getAllReviewOfUser)
// router.post("/create-or-update",createOrUpdateReview)
router.get("/getReview/:productId",agg_reviewsByProduct)
router.get("/get/5-Star",getAll5StarReview)
router.get("/",totalReviewsPerProduct)


export default router